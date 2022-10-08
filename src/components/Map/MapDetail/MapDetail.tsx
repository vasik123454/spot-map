/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import ReactDOM from "react-dom";
import { MapDetailBody } from "./MapDetailBody";
import { GrFormClose } from "react-icons/gr";
import { MarkerRecordType } from "../../../types/MarkerRecordType";
import { trpc } from "../../../utils/trpc";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { getImageUrl } from "../../../utils/getImageUrl";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

export const MapDetail: React.FC<{
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  opened: boolean;
  clicked: boolean;
  marker: MarkerRecordType;
}> = ({ setOpened, opened, clicked, marker }) => {
  const creator = trpc.useQuery(["user.getOneById", { id: marker.creator }]);
  const images = trpc.useQuery(["image.getAllById", { id: marker.images }]);

  const [currentImage, setCurrentImage] = useState(0);

  if (creator.status === "loading") return null;

  if (images.status === "loading") return null;

  if (!clicked) return null;

  return ReactDOM.createPortal(
    <>
      <MapDetailBody opened={opened}>
        <div className="w-full h-full flex p-3 flex-col">
          <button
            onClick={() => {
              setOpened(false);
            }}
            className="rounded-full w-11 h-11 hover:bg-zinc-100 active:bg-zinc-200 transition-all ml-auto flex items-center justify-center"
          >
            <GrFormClose size={30} />
          </button>
          <div className="w-full h-full flex px-10 flex-col">
            <div className="ml-auto mb-5 flex items-center gap-3">
              <h3 className="font-semibold text-lg">
                {creator.data?.name === ""
                  ? creator.data.email.split("@")[0]
                  : creator.data?.name}
              </h3>
              <img
                src={
                  creator.data?.avatarUrl === ""
                    ? "/images/undraw_pic_profile.svg"
                    : creator.data?.avatarUrl
                }
                className="w-12 h-12 rounded-full border-2"
                alt="profile img"
              />
            </div>
            <div className="w-full h-full flex pr-5">
              <div className="w-full h-full flex">
                <div className="w-full flex mb-auto">
                  <div
                    className="overflow-hidden w-full h-full items-center justify-center"
                    style={{
                      display: "grid",
                    }}
                  >
                    <div
                      className="flex justify-center items-center"
                      style={{
                        width: "500px",
                        gridColumn: "1 / -1",
                        gridRow: "1 / -1",
                      }}
                    >
                      <img
                        src={
                          images.data &&
                          getImageUrl(
                            images.data?.["@collectionId"],
                            images.data?.id,
                            images.data?.images[currentImage] as string
                          )
                        }
                        alt="imported img"
                        className="rounded-lg w-full h-full max-w-full max-h-full"
                      />
                    </div>

                    <div
                      className="w-full flex justify-between px-2"
                      style={{
                        gridColumn: "1 / -1",
                        gridRow: "1 / -1",
                      }}
                    >
                      <button
                        onClick={() => {
                          if (currentImage === 0) return;

                          setCurrentImage((prevState) => prevState - 1);
                        }}
                        className="bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center hover:bg-zinc-200 active:bg-zinc-300 border-2 border-zinc-300 transition-all"
                      >
                        <BiArrowToLeft color="black" size={20} />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            currentImage ===
                            (images.data?.images.length as number) - 1
                          )
                            return;

                          setCurrentImage((prevState) => prevState + 1);
                        }}
                        className="bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center hover:bg-zinc-200 active:bg-zinc-300 border-2 border-zinc-300 transition-all"
                      >
                        <BiArrowToRight color="black" size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col px-7 pb-7">
                <div className="w-full flex flex-col gap-5 rounded-lg border-2 bg-zinc-100 shadow-lg border-zinc-300 p-8">
                  <h2 className="font-bold text-4xl">{marker.title}</h2>
                  <h3 className="font-semibold text-lg">
                    {marker.description}
                  </h3>
                  <div className="grid w-full grid-cols-2 gap-3">
                    {marker.hashtags.map((hashtag, index) => {
                      return (
                        <div
                          key={index}
                          className="flex justify-end w-full h-12 relative"
                        >
                          <input
                            className="w-full h-full border-2 border-zinc-300 rounded-full px-5 outline-none font-semibold focus-visible:border-zinc-400 transition-all pr-12"
                            placeholder="#place"
                            value={hashtag}
                            disabled
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="w-full flex">
                    <AiOutlineStar size={26} />
                    <AiOutlineStar size={26} />
                    <AiOutlineStar size={26} />
                    <AiOutlineStar size={26} />
                    <AiOutlineStar size={26} />
                    <h3 className="ml-3 font-medium">Total votes: 1000</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MapDetailBody>
    </>,
    document.querySelector("body") as Element
  );
};
