/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { HomePageBackground } from "../components/HomePage/HomePageBackground";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotty</title>
      </Head>
      <main className="w-full h-screen">
        <HomePageBackground />
        <div className="flex w-full h-full justify-center flex-col absolute">
          <img
            src="/images/logo.svg"
            alt="logo"
            className="h-36"
            draggable={false}
          />
          <h2 className="text-xl text-center font-semibold select-text">
            Find best spots for your next film scenes or photos.
          </h2>
        </div>
      </main>
    </>
  );
};

export default HomePage;
