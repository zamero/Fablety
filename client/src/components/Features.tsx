export default function Features() {
  return (
    <>
      <section className="flex justify-center bg-background">
        <section className="flex justify-center px-0 sm:px-5">
          <div className="w-full md:max-w-4xl">
            <div className="flex flex-col items-center my-20 md:flex-row">
              <div className="flex flex-col items-start justify-center order-1 max-w-md pr-0 md:pr-16">
                <div className="flex h-auto my-3 justify-self-start">
                  <div className="w-1 mr-5 bg-primary/30"></div>
                  <h2 className="py-3 mx-auto text-xl text-neutral-900 font-semibold  md:mx-0">
                    Tailored Tales, Endless Wonder
                  </h2>
                </div>
                <p className="px-5 text-neutral-900 text-md md:px-0">
                  Each story is as unique as your child, with the power to
                  transport them to{" "}
                  <span className="text-accent">far-off lands</span>, stirring
                  their imagination with every word.{" "}
                  <span className="text-accent">Personalize</span> the
                  experience, and watch their smiles light up the room. 🚀
                </p>
              </div>
              <div className="object-cover w-7/12 h-full transition duration-300 shadow-lg rounded-xl md:order-2 sm:w-1/2 shadow-primary/60 hover:shadow-primary/75">
                <img
                  loading="lazy"
                  className="rounded-xl "
                  src="https://res.cloudinary.com/dibqwzlrh/image/upload/v1696879986/inyvrdnwj2ebv2hmvuy7.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="flex justify-center bg-background">
        <section className="flex justify-center px-0 sm:px-5">
          <div className="w-full md:max-w-4xl">
            <div className="flex flex-col items-center my-20 md:flex-row">
              <div className="object-cover w-7/12 h-full transition duration-300 shadow-lg rounded-xl md:order-1 sm:w-1/2 shadow-amber-200/20 hover:shadow-amber-200/75">
                <img
                  loading="lazy"
                  className="rounded-xl "
                  src="https://res.cloudinary.com/dibqwzlrh/image/upload/v1696879986/hplw4eihcirefjlt1gwm.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col items-start justify-center order-1 max-w-md pr-0 md:pl-16">
                <div className="flex h-auto my-3 justify-self-start">
                  <div className="order-1 w-1 ml-5 bg-primary/30"></div>
                  <h2 className="py-3 mx-auto text-xl text-neutral-900 font-semibold  md:mx-0">
                    Artistry in Every{" "}
                    <span className="text-accent">Illustration</span>
                  </h2>
                </div>
                <p className="px-5 text-neutral-900  text-md md:px-0">
                  <span className="text-accent">Our stories</span> are brought
                  to life by AI, ensuring that every adventure is as visually
                  captivating as it is delightful to read. Let the illustrations
                  carry your child away to a{" "}
                  <span className="text-accent">world of wonder</span>.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
      <section className="flex justify-center bg-background">
        <section className="flex justify-center px-0 sm:px-5">
          <div className="w-full md:max-w-4xl">
            <div className="flex flex-col items-center my-20 md:flex-row">
              <div className="flex flex-col items-start justify-center order-1 max-w-md pr-0 md:pr-16">
                <div className="flex h-auto my-3 justify-self-start">
                  <div className="w-1 mr-5 bg-primary/30"></div>
                  <h2 className="py-3 mx-auto text-xl text-neutral-900 font-semibold  md:mx-0">
                    Family Bonding Through Storytelling
                  </h2>
                </div>
                <p className="px-5 text-neutral-900 text-md md:px-0">
                  Gather around and let the stories weave a tapestry of{" "}
                  <span className="text-accent">togetherness</span>. Our
                  platform encourages family{" "}
                  <span className="text-accent">bonding</span> as you embark on
                  adventures together, one page at a time. 👨‍👩‍👧‍👦
                </p>
              </div>
              <div className="object-cover w-7/12 h-full transition duration-300 shadow-lg rounded-xl md:order-2 sm:w-1/2 shadow-blue-500/20 hover:shadow-blue-500/75">
                <img
                  loading="lazy"
                  className="rounded-xl "
                  src="https://res.cloudinary.com/dibqwzlrh/image/upload/v1696879986/fb8arpibizonof2j6eoq.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  )
}
