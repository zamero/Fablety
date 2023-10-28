require("dotenv").config();
const express = require("express")
const serverless = require("serverless-http")
const cors = require("cors")
const app = express()
const { create, read } = require("./userCRUD")
const User = require("./userSchema")
const axios = require('axios');
const cloudinary = require('cloudinary').v2;

const mongoose = require("mongoose");
const dbURI = process.env.SERVER_URI;
mongoose.connect(dbURI, { useNewUrlParser: true})
const db = mongoose.connection
db.on("error", (err) => {
    console.error(`err: ${err}`);
  }); // if connected
  db.on("connected", () => {
    console.log("Connected to database");
  });
const engineId = 'stable-diffusion-xl-1024-v1-0';
const apiHost = process.env.API_HOST || 'https://api.stability.ai';
const StableapiKey = process.env.STABILITY_API_KEY;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const PORT = 4000;

app.use(cors(
    { origin: "https://fablety.vercel.app",
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true
    }
    ));

    app.use(express.json({limit: '50mb'}));

    app.get('/latest-book-index/:userId', async (req, res) => {
      try {
          const userId = req.params.userId;
  
          // Find the user by their ID
          const user = await User.findById(userId);
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          if (user.Book.length === 0) {
              return res.status(404).json({ message: 'No books found for the user' });
          }
  
          const latestBookIndex = user.Book.length - 1;
  
          res.status(200).json({ latestBookIndex });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  });

    app.put("/promoteadmin/:adminId/:userId", async (req, res) => {
      try {
        const { adminId, userId } = req.params;
    
        const adminUser = await User.findOne({ _id: adminId });
    
        if (!adminUser) {
          res.status(404).json({
            message: "Admin not found",
          });
          return;
        }
    
        if (!adminUser.isAdmin) {
          res.status(403).json({
            message: "Unauthorized: Only admins can promote users to admins",
          });
          return;
        }
    
        const userToPromote = await User.findOne({ _id: userId });
    
        if (!userToPromote) {
          res.status(404).json({
            message: "User not found",
          });
          return;
        }
    
        userToPromote.isAdmin = true;
        await userToPromote.save();
    
        res.status(200).json({
          message: "User promoted to admin successfully",
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    });
    

    app.get("/getallusers/:id", async (req, res) => {
      try {
        const { id } = req.params;
    
        const requestingUser = await User.findOne({ _id: id });
        if (!requestingUser || !requestingUser.isAdmin) {
          res.status(403).json({
            message: "Unauthorized: Only admins can access this data.",
          });
          return;
        }
    
        const users = await User.find({}, { email: 1, sub: 1, _id: 1, isAdmin: 1 });
    
        res.status(200).json({
          message: "Users retrieved successfully",
          users,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    });
    

    app.delete("/deleteuser/:adminId/:userId", async (req, res) => {
      try {
        const { adminId, userId } = req.params;

        const adminUser = await User.findOne({ _id: adminId });
    
        if (!adminUser) {
          res.status(404).json({
            message: "Admin not found",
          });
          return;
        }
    
        if (!adminUser.isAdmin) {
          res.status(403).json({
            message: "Unauthorized: Only admins can delete users",
          });
          return;
        }
    
        // Find and delete the user by their ID
        const userToDelete = await User.findOne({ _id: userId });
    
        if (!userToDelete) {
          res.status(404).json({
            message: "User not found",
          });
          return;
        }
    
        // Use deleteOne to remove the user
        await User.deleteOne({ _id: userId });
    
        res.status(200).json({
          message: "User deleted successfully",
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    });

    app.get("/checkadmin/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
          res.status(404).json({
            message: "User not found",
          });
          return;
        }
    
        if (user.isAdmin) {
          res.status(200).json({
            isAdmin: true,
          });
        } else {
          res.status(200).json({
            isAdmin: false,
          });
        }
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    });

    app.post("/createuser", async (req, res) => {
        // Check if req.body is empty
        if (!Object.keys(req.body).length) {
          res.status(400).json({
            message: "Request body cannot be empty",
          });
          return;
        }
      
        const { email, sub } = req.body;
      
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          res.status(409).json({
            message: "User with the provided email already exists",
          });
          return;
        }
      
        if (email === "undefined") {
          res.status(409).json({
            message: "Something went wong",
          });
          return;
        }
      
        const book = await create({ email, sub });
      
        if (book.error) {
          res.status(500).json({
            message: book.error,
          });
        } else {
          res.status(201).json({
            message: "New book record created",
          });
        }
      });

      app.get("/getid/:sub/", async (req, res) => {
        try {
          const { sub } = req.params;
          const user = await User.findOne({ sub: sub });
      
          if (!user) {
            res.status(404).json({
              message: "User not found",
            });
            return;
          }
      
          const userId = user._id;
      
          res.status(200).json({
            userId,
          });
        } catch (error) {
          res.status(500).json({
            message: error.message,
          });
        }
      });

      app.get("/stories/:id", async (req, res) => {
        const books = await read();
        const { id } = req.params;
        const user = await User.findOne(
          { _id: req.params.id },
        );
        if (user.error) {
          res.status(500).json({
            message: error.message,
            books: books.data,
          });
        }
        else {
          res.status(200).json({
            message: "success",
            books: user.Book,
          });
        }
      });

      app.put("/create/:id", async (req, res) => {
        try {
          const { name, gender, mood, genre } = req.body;
          const user = await User.updateOne(
            { _id: req.params.id },
            { $push: { Book: { name, gender, mood, genre } } }
          );
          if (user.nModified === 0) {
            throw new Error("User not found");
          }
          res.status(200).json({
            message: "Story added to user",
          });
        } catch (error) {
          res.status(500).json({
            message: error.message,
          });
        }
      });

      app.post('/create-story/:id', async (req, res) => {
        try {
            const { name, gender, mood, genre } = req.body;
            const id = req.params.id;
            const user = await User.findOne({ _id: id });
    
            if (!user) {
                throw new Error("User not found");
            }
    
            // Get the latest index in the Book array
            const latestIndex = user.Book.length - 1;
    
            if (latestIndex < 0) {
                throw new Error("No books found for the user");
            }
    
            const book = user.Book[latestIndex];
    
            let gptPrompt = `I'm going to give you a kid's name, gender, mood, and genre for a small story. The story should have 5 pages, and each page should be a maximum of 200 characters long. The story should conclude at the 5th page and be in the storytelling style of Roald Dahl. Here are the parameters: name = ${book.name}, gender = ${book.gender}, mood = ${book.mood}, genre = ${book.genre}. I want you to always give this story in a JSON format like this: {
              "Page1": "",
              "Page2": "",
              "Page3": "",
              "Page4": "",
              "Page5": ""
            }
            Never prompt anything but the json and story`;
    
            const apiKey = process.env.OPENAI_API_KEY;
    
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    "model": "gpt-3.5-turbo-0613",
                    "messages": [
                        {
                            "role": "user",
                            "content": `${gptPrompt}`
                        }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        "OpenAI-Organization": "org-5l5Gk68z2cUziB1qLBYPugOq"
                    },
                }
            );
            const storyText = JSON.parse(response.data.choices[0].message.content);
            console.log(storyText)
            // Update the user's document in the database with the generated story
            user.Book[latestIndex].name = name;
            user.Book[latestIndex].gender = gender;
            user.Book[latestIndex].mood = mood;
            user.Book[latestIndex].genre = genre;
    
            const PageOne = storyText.Page1;
            const PageTwo = storyText.Page2;
            const PageThree = storyText.Page3;
            const PageFour = storyText.Page4;
            const PageFive = storyText.Page5;
    
            // Store each page as a separate entry
            const pages = Object.keys(storyText).map((pageKey, pageIndex) => {
                return {
                    page: pageIndex + 1,
                    content: storyText[pageKey],
                };
            });
            
            user.Book[latestIndex].story = pages;
    
            let GetStableDiffusionPrompt = `Generate an image prompt for an AI art bot. Create 5 image prompts that I can use with the MidJourney AI art bot. I will give you a kid's story and 5 pages out of it, and then you generate the image prompts based on the following format:
            MidJourney Prompt Format Style: Children book illustration by Cory Loftis of [subject or topic], [action or activity], [lighting],
            Example Image Prompt: "Children book illustration by Cory Loftis of a magnificent dragon, posed in a majestic stance, intricate scales and wings details for coloring" Here is the 5 story bits: page1 = "${PageOne}" page2 = "${PageTwo}" page3 = "${PageThree}" page4 = "${PageFour}" page5 = "${PageFive}" the prompts should never describe how young or small the kid is. give me the prompts in this JSON format {
              "Prompt1": "",
              "Prompt2": "",
              "Prompt3": "",
              "Prompt4": "",
              "Prompt5": ""
            }
            Never prompt anything but the json and never have a prompt contain "young boy" "small" "child" or anything to incinuate that the kid is a kid`;
    
            const StableResponse = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                    "model": "gpt-3.5-turbo-0613",
                    "messages": [
                        {
                            "role": "user",
                            "content": `${GetStableDiffusionPrompt}`
                        }
                    ]
                },
                {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        "OpenAI-Organization": "org-5l5Gk68z2cUziB1qLBYPugOq"
                    },
                }
            );
    
            const StableDiffusionPrompts = JSON.parse(StableResponse.data.choices[0].message.content);
            // Store each prompt as a separate entry
            const promptArray = Object.keys(StableDiffusionPrompts).map((promptKey, promptIndex) => {
                return {
                    page: promptIndex + 1,
                    prompt: StableDiffusionPrompts[promptKey],
                };
            });

            // Update the user's document in the database with the generated prompts
            user.Book[latestIndex].StableDiffusionPrompts = promptArray;
            const imgHostingApiKey = process.env.CLOUDINARY_API_KEY;
            const hostedImageUrls = [];
            const prompts = Object.values(StableDiffusionPrompts);
            console.log(prompts)
            for (const textPrompt of prompts) {
              const response = await axios.post(
                `${apiHost}/v1/generation/${engineId}/text-to-image`,
                {
                  text_prompts: [
                    {
                      text: textPrompt,
                      weight: 1
                    },
                    {
                      text: "jigsaw puzzle arabesque abstract surrealism sculpture transgressive neoplasticism lowbrow tachisme fauvism dada frame border ugly tiling watermark signature beginner amateur disfigured deformed distorted",
                      weight: -1
                    },
                  ],
                  cfg_scale: req.body.cfg_scale || 7,
                  height: req.body.height || 1024,
                  width: req.body.width || 1024,
                  steps: req.body.steps || 30,
                  samples: req.body.samples || 1,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${StableapiKey}`,
                  },
                }
              );
        
              if (response.status !== 200) {
                const errorMessage = `Non-200 response: ${response.data}`;
                throw new Error(errorMessage);
              }
        
              const base64Data = response.data.artifacts[0].base64; // Make sure the image data is in 'image'
              const cloudinaryImageUrl = await hostImage(base64Data);
              hostedImageUrls.push(cloudinaryImageUrl);
            }
            user.Book[latestIndex].hostedImageUrls = hostedImageUrls;
            await user.save();
            
            res.status(200).json({
              message: "Story added to the user's book",
              story: storyText,
              StableDiffusionPrompts: promptArray,
              hostedImageUrls,  // Add generated image URLs to the response
          });
      } catch (error) {
          res.status(500).json({
              message: error.message,
          });
      }
  });
    
  app.post('/generate-images', async (req, res) => {
    try {
      const textPrompts = [
        `children book illustration by Cory Loftis of a cheerful girl named Felicia, standing in a garden at dawn, the rising sun illuminating her bright eyes and warming the scene`,
        `children book illustration by Cory Loftis of a glowing and pulsating pebble floating mid-air, reflecting light onto Felicia's excited face, high contrast between the pebble's radiance and the garden's morning shade`,
      ];
  
      const imgHostingApiKey = process.env.CLOUDINARY_API_KEY; // Replace with your actual API key
      const hostedImageUrls = [];
  
      for (const textPrompt of textPrompts) {
        const response = await axios.post(
          `${apiHost}/v1/generation/${engineId}/text-to-image`,
          {
            text_prompts: [
              {
                text: textPrompt,
                weight: 1
              },
              {
                text: "jigsaw puzzle arabesque abstract surrealism sculpture transgressive neoplasticism lowbrow tachisme fauvism dada frame border ugly tiling watermark signature beginner amateur disfigured deformed distorted",
                weight: -1
              },
            ],
            cfg_scale: req.body.cfg_scale || 7,
            height: req.body.height || 1024,
            width: req.body.width || 1024,
            steps: req.body.steps || 30,
            samples: req.body.samples || 1,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${StableapiKey}`,
            },
          }
        );
  
        if (response.status !== 200) {
          const errorMessage = `Non-200 response: ${response.data}`;
          throw new Error(errorMessage);
        }
  
        const base64Data = response.data.artifacts[0].base64; // Make sure the image data is in 'image'
        const cloudinaryImageUrl = await hostImage(base64Data);
        hostedImageUrls.push(cloudinaryImageUrl);
      }
  
      res.status(200).json({ message: 'Images generated and hosted successfully', hostedImageUrls });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while generating and hosting the images' });
    }
  });
  
  async function hostImage(base64Data) {
    try {
      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Data}`, {
        folder: 'dream', // Optional: Change to your desired folder
      });
  
      // Return the result which contains the URL of the uploaded image
      console.log("IMG URL ADDED")
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  }
  
  app.post('/upload-image', async (req, res) => {
    try {
      const { base64Data } = req.body;
  
      if (!base64Data) {
        return res.status(400).json({ message: 'Missing base64Data in request body' });
      }
  
      // Upload the image to Cloudinary using the hostImage function
      const imageUrl = await hostImage(base64Data);
  
      res.status(200).json({ imageUrl });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Image upload failed' });
    }
  });

    app.get("/getone/:id/:index", async (req, res) => {
      try {
        const { id, index } = req.params;
        const user = await User.findOne({ _id: id });
        if (!user) {
          throw new Error("User not found");
        }
        const book = user.Book[index];
        res.status(200).json({
          message: "Character retrieved",
          book,
        });
      } catch (error) {
        res.status(500).json({
          message: error.message,
        });
      }
    });

    app.get("/hello"), async (res) => {
      res.status(500).json({ message: "hello" });
    }

    module.exports.handler = serverless(app)
    
    // async function hostImage(base64Data, imgHostingApiKey) {
    //   const formData = new FormData();
    //   formData.append('image', base64Data);
    
    //   return axios.post('https://api.imgbb.com/1/upload', formData, {
    //     params: {
    //       key: imgHostingApiKey,
    //     },
    //     headers: {
    //       ...formData.getHeaders(),
    //     },
    //   });
    // }
    
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
//   });
