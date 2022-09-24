/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotty</title>
      </Head>
      <main className="w-full h-screen">
        <div className="absolute w-full h-full">
          <img
            src="/images/background.png"
            className="w-full h-full object-cover"
            alt="background image"
          />
        </div>
        <div className="flex w-full h-full justify-center flex-col gap-3 absolute">
          <h1 className="text-8xl font-extrabold text-center">Spotty</h1>
          <h2 className="text-xl text-center">
            Find best spots for your next film scenes or photos.
          </h2>
        </div>
      </main>
    </>
  );
};

export default HomePage;
