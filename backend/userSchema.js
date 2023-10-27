const mongoose = require("mongoose");

const storyPageSchema = mongoose.Schema({
    page: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const usersSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        required: false
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: false
    },
    // subscription: {
    //     default: 'Trial',
    //     type: String,
    //     required: false
    // },
    // stripeCustomer: {
    //     default: 'null',
    //     type: String,
    //     required: false
    // },
    // calls: {
    //     default: 0,
    //     type: Number,
    //     required: false
    // },
    Book: [
        {   
            name: {
                type: String,
                required: true
            },
            gender: {
                type: String,
                required: true,
            },
            mood: {
                type: String,
                required: true
            },
            genre: {
                type: String,
                required: true
            },
            story: [storyPageSchema],
            StableDiffusionPrompts: [
                {
                    page: {
                        type: Number,
                        required: true
                    },
                    prompt: {
                        type: String,
                        required: true
                    }
                }
            ],
            hostedImageUrls: [String],
        }
    ]
});

// Export model
module.exports = mongoose.model("User", usersSchema);