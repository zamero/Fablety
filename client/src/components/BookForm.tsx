import axios from "axios"
import React, { useState } from "react"
import StoryDisplay from "./StoryDisplay" // Make sure to import StoryDisplay from the correct file path
import Loader from "./Loader" // Import the Loader component

export interface BookFormData {
  name: string
  gender: string
  mood: string
  genre: string
}

interface BookFormProps {
  name: string
  gender: string
  mood: string
  genre: string
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onGenderChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onMoodChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onGenreChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSubmit: (formData: BookFormData) => Promise<void>
}

const BookForm: React.FC<BookFormProps> = ({
  name,
  gender,
  mood,
  genre,
  onNameChange,
  onGenderChange,
  onMoodChange,
  onGenreChange,
  onSubmit,
}) => {
  const [generatedStory, setGeneratedStory] = useState<string | null>(null)
  const [generatedStoryImg, setGeneratedStoryImg] = useState<string | null>(
    null
  )
  const [formSubmitted, setFormSubmitted] = useState(false)

  const fetchGeneratedStory = async (formData: BookFormData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_AWS_LAMBDA}create-story/${localStorage.getItem(
          "userId"
        )}`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      console.log(response.data)
      setGeneratedStoryImg(response.data.hostedImageUrls)
      setGeneratedStory(response.data.story)
    } catch (error) {
      console.error(error)
      // Handle error, e.g., show an error message to the user
    }
  }

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault()

    try {
      await onSubmit({
        name: name.trim(),
        gender: gender.trim(),
        mood: mood.trim(),
        genre: genre.trim(),
      })

      setFormSubmitted(true) // Set the form submission status
      await fetchGeneratedStory({
        name: name.trim(),
        gender: gender.trim(),
        mood: mood.trim(),
        genre: genre.trim(),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {formSubmitted ? (
        generatedStory ? (
          <StoryDisplay
            storyText={generatedStory}
            storyImg={generatedStoryImg}
          />
        ) : (
          <Loader />
        )
      ) : (
        <div className="flex justify-center scale-75 -translate-y-12 mb-20">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-950 rounded-xl shadow-lg p-10"
            >
              <h2 className="text-xl text-violet-500 font-semibold mb-5 mt-8 uppercase text-center">
                Create Book
              </h2>

              <div className="mb-5">
                <label
                  htmlFor="name"
                  className="block text-gray-100 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input
                  className="bg-neutral-800 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder=""
                  required
                  onChange={onNameChange}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="gender"
                  className="block text-gray-100 text-sm font-bold mb-2"
                >
                  Gender
                </label>
                <input
                  className="bg-neutral-800 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  id="gender"
                  type="text"
                  placeholder=""
                  required
                  onChange={onGenderChange}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="gender"
                  className="block text-gray-100 text-sm font-bold mb-2"
                >
                  Mood
                </label>
                <input
                  className="bg-neutral-800 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  id="gender"
                  type="text"
                  placeholder=""
                  required
                  onChange={onMoodChange}
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="gender"
                  className="block text-gray-100 text-sm font-bold mb-2"
                >
                  Genre
                </label>
                <input
                  className="bg-neutral-800 shadow appearance-none rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline"
                  id="gender"
                  type="text"
                  placeholder=""
                  required
                  onChange={onGenreChange}
                />
              </div>

              <button
                type="submit"
                className="bg-violet-600 hover.bg-violet-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default BookForm
