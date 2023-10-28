import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import BookForm, { BookFormData } from "./BookForm"
import axios from "axios"

const GenerateStory: React.FC = () => {
  const [response, setResponse] = useState("")
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [mood, setMood] = useState("")
  const [genre, setGenre] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (formData: BookFormData): Promise<void> => {
    try {
      const { name, gender, mood, genre } = formData
      const response = await fetch(
        `${import.meta.env.VITE_AWS_LAMBDA}create/${localStorage.getItem(
          "userId"
        )}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            gender,
            mood,
            genre,
          }),
        }
      )

      const data = await response.json()
      setResponse(data.message)

      setName("")
      setGender("")
      setMood("")
      setGenre("")

      const userId = localStorage.getItem("userId")
      const latestBookIndexResponse = await axios.get(
        `/latest-book-index/${userId}`
      )

      // Use the latest book index to route to another page after a specific timer
      const latestBookIndex = latestBookIndexResponse.data.latestBookIndex
      const delayInSeconds = 150 // Adjust the delay as needed (e.g., 5 seconds)

      setTimeout(() => {
        const url = `/view-latest-book/${userId}/${latestBookIndex}`
        navigate(url) // Use navigate to route to the specified URL
      }, delayInSeconds * 1000) // Convert seconds to milliseconds
    } catch (error) {
      console.error(error)
      setResponse("An error occurred. Please try again.")
    }
  }

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setName(event.target.value)
  }

  const handleGenderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setGender(event.target.value)
  }
  const handleMoodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setMood(event.target.value)
  }
  const handleGenreChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setGenre(event.target.value)
  }

  return (
    <>
      {/* ... */}
      <BookForm
        name={name}
        gender={gender}
        mood={mood}
        genre={genre}
        onNameChange={handleNameChange}
        onGenderChange={handleGenderChange}
        onMoodChange={handleMoodChange}
        onGenreChange={handleGenreChange}
        onSubmit={handleSubmit}
      />

      {response && <p>{response}</p>}
      <Footer />
    </>
  )
}

export default GenerateStory
