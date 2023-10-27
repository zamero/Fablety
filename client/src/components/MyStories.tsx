import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import BookShelf from "./BookShelf"

function MyStories() {
  const [userData, setUserData] = useState<any[]>([])

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_AWS_LAMBDA}stories/${localStorage.getItem(
        "userId"
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUserData(data.books)
      })
  }, [])

  return (
    <>
      <section className="flex justify-center mx-3">
        <div className="flex flex-col w-3xl justify-center">
          <div className="my-12"></div>
          <div className="flex flex-col mb-2 md:w-72">
            <Link to="/create">
              <button
                role="button"
                className="bg-secondary hover:bg-secondary/80 rounded-md py-2 px-4 font-semibold text-slate-100 uppercase cursor-pointer"
              >
                Generate Story
              </button>
            </Link>
          </div>
          <BookShelf books={userData}></BookShelf>
        </div>
      </section>
    </>
  )
}
export default MyStories
