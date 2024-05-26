import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans text-gray-900 antialiased">
      <Head>
        <title>Agro</title>
        <meta name="description" content="Agro" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="bg-white p-6 flex justify-between items-center shadow-md fixed top-0 w-full">
        <a href="/" className="block">
          <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
        </a>
        <h1 className="text-4xl text-black pl-32">Agro</h1>
        <div className="flex gap-4">
          <a href="#section1" className="text-black hover:text-gray-500 text-xl">Home</a>
          <a href="#section2" className="text-black hover:text-gray-500 text-xl">AI Predictions</a>
          <a href="#section3" className="text-black hover:text-gray-500 text-xl">Sensor</a>
          <a href="#section4" className="text-black hover:text-gray-500 text-xl">Contact Us</a>
        </div>
      </nav>

      <main className="mt-24  w-full">
        <section id="section1" className="mb-4 bg-white flex w-full">
          <div className="w-1/2 p-4">
            <h1 className="text-[3vw] font-bold mb-2">Welcome</h1>
            <p className="text-[2vw]">
            Struggling with water waste and suboptimal yields? <br></br>Our AI-powered soil moisture monitoring system delivers real-time insights, enabling precision irrigation and maximized crop health.<br></br><strong>Grow smarter, save water, thrive</strong>.
            </p>
            <button className="mt-4 bg-green-500 text-black px-4 py-2 rounded">Learn More</button>
          </div>
          <div className="w-1/2 bg-green-700">
            <img src="https://png.pngtree.com/png-clipart/20200701/original/pngtree-agriculture-cartoon-farmer-farming-png-image_5411312.jpg" alt="Image 1" className="w-full h-auto object-cover" />
          </div>
        </section>

        <section id="section2" className="mb-4 bg-black text-white flex">
          <div className="w-1/2">
            <img src="https://png.pngtree.com/png-vector/20231215/ourlarge/pngtree-autumn-fall-harvest-farmers-picking-oranges-busy-farming-harvest-agriculture-png-image_11362741.png" alt="Image 2" className="w-full h-full object-cover" />
          </div>
          <div className="w-1/2 p-4">
            <h1 className="text-[3vw] font-bold mb-2">AI Predictions</h1>
            <p className="text-[2vw]">No more guesswork!<br></br> Our AI whips through soil moisture data with decision trees, predicting <strong>perfect irrigation and crop health.</strong> <br></br>Past & present sensor readings fuel its insights, guiding pro-active water management for precision farming.</p>
            {/* <button className="mt-4 bg-green-300 text-black px-4 py-2 rounded">Dive In</button> */}
            <Link href="/ai">
              <button className="mt-4 bg-green-500 text-black text-[1.5vw] px-4 py-2 rounded">Dive In</button>
            </Link>          
          </div>


        </section>

        <section id="section3" className="mb-4 bg-white flex">
          <div className="w-1/2 p-4">
            <h1 className="text-5xl font-bold mb-2">Sensor</h1>
            <p className="text-[2vw]">Our cutting-edge sensor technology brings a new dawn to farming,<br>
</br> offering unparalleled precision and insight into soil moisture levels. Picture this: as the sun rises over lush green fields, <br></br>our sensors are already hard at work, delicately measuring the very essence of soil vitality. <br></br>For farmers, this means empowerment like never before – <strong>no more guesswork, no more uncertainty.</strong> With our sensors, they unlock the secret language of the land, understanding its needs with a clarity that transforms their approach to cultivation. From the smallest seedling to the tallest crop, every plant receives exactly what it requires, thanks to our sensor&apos;s unmatched accuracy and reliability. Join us in embracing a future where farming isn&apos;t just about growing crops; it&apos;s about nurturing a sustainable, bountiful harvest for generations to come.</p>
          <div className ="py-16">
          <p className="text-lg text-gray-700 leading-relaxed text-center p-5 bg-gray-200 border border-gray-300 rounded shadow-md">We extend our heartfelt gratitude to the University of Agricultural Sciences, GKVK (Gandhi Krishi Vignana Kendra) Bangalore, for their invaluable support and collaboration in the development of our innovative sensor technology. Their expertise, guidance, and resources have been instrumental in helping us realize our vision of creating a groundbreaking solution for soil moisture monitoring in agriculture. With their unwavering commitment to agricultural research and education, GKVK has played a pivotal role in empowering farmers and advancing sustainable farming practices. We are deeply grateful for their partnership and look forward to continuing our journey of innovation and impact together.</p>
          </div>
          </div>

          <div className="w-1/2">
            <Image src="/sensor.jpeg" alt="Image 3" className="w-full object-contain"
              width  ={500}
              height ={50}
            />
          </div>
        </section>

        <section id="section4" className="mb-4 bg-black text-white flex">
          <div className="w-1/2 p-4">
          <img src="/image4.png" alt="Image 4" className="w-full h-full object-cover" />

          </div>
          <div className="w-1/2">
          <h1 className="text-2xl font-bold mb-2">Contact US</h1>
            <p className="text-[2vw]">
                
                  Lokesh Sv: +9199999999
                  <br></br>Manish Y : +9199999999
                  <br></br>Likith S : +9199999999
                  <br></br>Akshith Chowdary: +919490123000
                
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-white p-6 text-center text-black shadow-md">
        <p>Agro © 2024 by BIT</p>
      </footer>
    </div>
  )
}