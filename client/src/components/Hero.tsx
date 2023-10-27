import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import "../assets/stable-diffusion-xl.jpeg"
const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
]

export default function Hero() {
  return (
    <div className="lg:py-28 bg-background">
      <div className="relative bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-background sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <Popover>
              <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

              <Transition
                as={Fragment}
                enter="duration-150 ease-out"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="duration-100 ease-in"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Popover.Panel
                  focus
                  className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
                >
                  <div className="rounded-lg shadow-md bg-background ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="px-5 pt-4 flex items-center justify-between">
                      <div>
                        <img
                          loading="lazy"
                          className="h-8 w-auto"
                          src="https://res.cloudinary.com/dibqwzlrh/image/upload/v1696879986/tsdgmxuqbuvefbopotio.jpg"
                          alt=""
                        />
                      </div>
                      <div className="-mr-2">
                        <Popover.Button className="bg-background rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                          <span className="sr-only">Close main menu</span>
                          {/* <XIcon className="h-6 w-6" aria-hidden="true" /> */}
                        </Popover.Button>
                      </div>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                    <a
                      href="#"
                      className="block w-full px-5 py-3 text-center font-medium text-secondary bg-gray-50 hover:bg-gray-100"
                    >
                      Log in
                    </a>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-semibold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline leading-normal">
                    Stories as Unique as
                  </span>{" "}
                  <span className="block text-secondary xl:inline">
                    Your Child📖
                  </span>
                </h1>
                <p className="mt-3 text-base text-neutral-900 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  With just a name, mood, gender, and genre, watch in awe as a
                  personalized story unfolds with the power of AI, bringing joy
                  and wonder to your child's world. It's not just a story; it's
                  a magical journey crafted exclusively for them. 📜
                </p>
                <div className="mt-10 sm:mt-10 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md">
                    <a
                      href="#"
                      className="items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-secondary hover:bg-blue-700 md:py-4 md:text-lg md:px-8"
                    >
                      Get started
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute hidden lg:block pl-10 lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            loading="lazy"
            className="h-56 rounded-l-3xl w-full object-cover  sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="https://i.ibb.co/gPvNBWc/stable-diffusion-xl.jpg"
            alt=""
          />
        </div>
      </div>
    </div>
  )
}
