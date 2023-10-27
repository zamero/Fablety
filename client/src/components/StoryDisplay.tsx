import { useState } from "react"

interface FlipbookProps {
  storyText: {
    [page: string]: string
  } | null
  storyImg: string[] | null
}

const StoryDisplay: React.FC<FlipbookProps> = ({ storyText, storyImg }) => {
  const [currentPage, setCurrentPage] = useState(0)

  const goToNextPage = () => {
    if (currentPage < (storyText ? Object.keys(storyText).length - 1 : 0)) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const pageKeys = storyText ? Object.keys(storyText) : []

  return (
    <div className="flex items-center bg-primary/10 m-0 sm:m-4 rounded-xl md:m-8 lg:m-16 justify-center">
      <div className="flex p-0 sm:p-4 items-center justify-start">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 0}
          className="sm:text-white text-secondary sm:bg-black/50 rounded-2xl p-0 sm:px-4 sm:pb-1 text-4xl sm:text-3xl"
        >
          &lsaquo;
        </button>
      </div>
      <div className="flex items-center flex-col sm:justify-between sm:flex-row md:flex-row lg:flex-row ">
        <div className="w-full sm:w-1/2 order-1 sm:order-2">
          <img
            loading="lazy"
            src={storyImg && storyImg[currentPage] ? storyImg[currentPage] : ""}
            alt={`Page ${currentPage + 1}`}
            className="block w-full sm:rounded-r-xl"
          />
        </div>
        <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 p-4 max-w-xl order-2 sm:order-1">
          <p className="text-xl lg:text-xl xl:text-3xl">
            {storyText &&
              pageKeys[currentPage] &&
              storyText[pageKeys[currentPage]]}
          </p>
        </div>
      </div>
      <div className="flex p-0 sm:p-4 items-center justify-end sm:absolute right-0">
        <button
          onClick={goToNextPage}
          disabled={currentPage === pageKeys.length - 1}
          className="sm:text-white text-secondary sm:bg-black/50 rounded-2xl p-0 sm:px-4 sm:pb-1 text-4xl sm:text-3xl"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  )
}

export default StoryDisplay
