import React, { Key, useState } from "react"
import "./Bookshelf.css"
import { Link } from "react-router-dom"

interface Book {
  genre: any
  mood: any
  _id: Key | null | undefined
  name: string
  author: string
  title: string
  description: string[]
  image: string
  info: string
}

interface BookShelfProps {
  books: Book[]
}

const BookShelf: React.FC<BookShelfProps> = ({ books }) => {
  const [activeBook, setActiveBook] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleBookClick = (index: number) => {
    setActiveBook(index)
  }

  const handleMouseLeave = () => {
    setActiveBook(null)
  }

  const filteredBooks = books.filter((book) =>
    `${book.name}´s ${book.mood} ${book.genre}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto">
      <div className="relative flex items-center max-w-xl pb-16">
        <input
          type="text"
          placeholder="Search books"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow-sm focus:ring-secondary-500 focus:border-secondring-secondary-500 block w-full pr-12 sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <ul className="bk-list place-items-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-0 justify-center items-center">
        {filteredBooks.map((book: any, index: number) => (
          <Link to={`/book/${index}`} key={index}>
            <li
              className=""
              onMouseEnter={() => handleBookClick(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className={`bk-book book-3 ${
                  activeBook === index ? "rotate-right" : ""
                }`}
              >
                <div className="bk-front">
                  <div className="bk-cover ">
                    <img
                      loading="lazy"
                      className="object-cover h-full"
                      src={book.hostedImageUrls[3]}
                      alt=""
                    />
                    <h2 className="text-lg font-semibold">
                      <span className="bg-black/20 text-2xl rounded-xl text-center">{`${book.name}´s ${book.mood} ${book.genre}`}</span>
                    </h2>
                  </div>
                </div>
                <div className="bk-back">
                  <p>{book.info}</p>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default BookShelf
