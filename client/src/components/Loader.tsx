import "./Loader.scss" // Ensure you import your SCSS file

const Loader = () => {
  return (
    <div className="body">
      <div className="book">
        <div className="book__page">
          <div className="book__page__fill"></div>
          <div className="book__page__fill"></div>
          <div className="book__page__fill"></div>
          <div className="book__page__fill"></div>
          <div className="book__page__fill"></div>
        </div>
      </div>
    </div>
  )
}

export default Loader
