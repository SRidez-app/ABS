// pages/index.tsx
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Ayubzai Business Solutions</title>
        <meta name="description" content="Smart Solutions for Modern Businesses" />
      </Head>

      <main className="min-h-screen bg-gray-900 text-white font-sans">
        <section className="flex flex-col items-center justify-center text-center py-32 px-6">
          <h1 className="text-5xl font-bold mb-6">Ayubzai Business Solutions</h1>
          <p className="text-xl mb-8">Smart Solutions for Modern Businesses</p>
          <a
            href="#contact"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition"
          >
            Book a Free Consultation
          </a>
        </section>

        <section className="bg-gray-800 py-20 px-6" id="about">
          <h2 className="text-3xl font-semibold mb-4 text-center">About Us</h2>
          <p className="max-w-2xl mx-auto text-center text-gray-300">
            We help small businesses and startups build digital products, optimize operations,
            and scale with confidence. Whether you're just starting out or growing fast, we’re here to help.
          </p>
        </section>

        <section className="bg-gray-900 py-20 px-6" id="contact">
          <h2 className="text-3xl font-semibold mb-4 text-center">Get in Touch</h2>
          <p className="text-center text-gray-300 mb-6">
            Email us at <a href="mailto:hello@ayubzaibusinesssolutions.com" className="text-blue-400 underline">hello@ayubzaibusinesssolutions.com</a>
          </p>
        </section>
      </main>
    </>
  );
}
