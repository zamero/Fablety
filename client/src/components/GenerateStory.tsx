import React, { useState } from "react"
import Footer from "../components/Footer"
import BookForm, { BookFormData } from "./BookForm"

const GenerateStory: React.FC = () => {
  const [response, setResponse] = useState("")
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  const [mood, setMood] = useState("")
  const [genre, setGenre] = useState("")

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

      // navigate("/my-stories")
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
