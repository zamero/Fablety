function Footer() {
  return (
    <div>
      <footer className=" rounded-lg shadow bg-primary/10 m-4">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a href="#" className="flex items-center mb-4 sm:mb-0">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-neutral-900">
                <span className="text-primary/70">Fablety</span>
              </span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-neutral-900 sm:mb-0 ">
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6 ">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="mr-4 hover:underline md:mr-6">
                  Privacy Policy
                </a>
              </li>

              {/* <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li> */}
            </ul>
          </div>
          <hr className="my-6 border-primary/10  lg:my-8" />
          <span className="block text-sm text-neutral-900 sm:text-center ">
            © 2023{" "}
            <a href="#" className="hover:underline">
              Fablety™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Footer
