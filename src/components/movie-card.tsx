// import React from 'react'
// @ts-nocheck
import { useEffect, useRef, useState } from "react";
import { createImageURl } from "../common/utils";
import Modal from "./modal";
import YouTube, { YouTubeProps } from "react-youtube";
import { fecthApi } from "../common/api";
import PlusCircle from "@heroicons/react/24/outline/PlusIcon";
import Play from "@heroicons/react/24/solid/PlayCircleIcon";
import ChevronDown from "@heroicons/react/24/outline/ChevronDownIcon";
import LikeIcon from "@heroicons/react/24/outline/HandThumbUpIcon";

import { ENDPOINTS } from "../common/endpoints";
// import { useMOvieContext } from "./context";

// const CARDwIDTH = 200;
type movieProp = {
  id: number;
  title: string;
  poster_path: string | null;
};

const opts: YouTubeProps["opts"] = {
  width: "300",
  height: "280",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
    playsinline: 1,
    controls: 0,
    autohide: 1,
    // origin=
}};

export type VideoResponse<T> = {
  id: number;
  results: T;
  [k: string]: unknown;
};

export type VideoResult = {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  published_at: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
  [k: string]: unknown;
};

export type position = {
  top: number;
  left: number;
};
export default function MovieCard({ id, title, poster_path }: movieProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [videoInfo, setVideoInfo] = useState<VideoResult>();
  const movieRef = useRef<HTMLSelectElement>(null);
  const [value, setValue] = useState<position | null>(null);
  const [hidePost, setHidePost] = useState(false);
  // let timeOut:NodeJS.Timeout;

  // const { setMovieWrap , setCardInfo} = useMOvieContext();
  // console.log({data})
  async function onMouseEnter() {
    const [result] = await fetchPopularVideos();
    const { top, left } = movieRef.current?.getBoundingClientRect() ?? {};
  
    const totalTop = (top ?? 0) - 100;
    let totalLeft = (left ?? 0) - 100;
    const totalWidth = totalLeft + 300;
    if (totalWidth > document.body.clientWidth) {
      totalLeft = totalLeft - (totalWidth - document.body.clientWidth);
    }
    if (totalLeft < 0) {
      totalLeft = left as number;
    }

    // console.log(top, left, totalLeft, totalTop);
    setValue({ left: totalLeft, top: totalTop });
    // setMovieWrap({ left: totalLeft, top: totalTop });
    
    // console.log(result);
    setVideoInfo(result);
    // if (!hidePost) {
    
     
      setTimeout(() => {
        setIsOpen(true);
      }, 400);
    
   
    // }
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (videoInfo?.key) {
      setTimeout(() => {
        setHidePost(true);
      }, 900);

      if (!isOpen) {
        setHidePost(false);
      }
    }
  }, [videoInfo?.key, isOpen]);

  async function fetchPopularVideos() {
    const response = await fecthApi<VideoResponse<VideoResult[]>>(
      ENDPOINTS.VIDEOS.replace("{movie_id}", id.toString()),
    );
    // console.log(response.results[0]);
    return response.results.filter(
      (res) => res.site.toLowerCase() === "youtube",
    );
  }
  // function onMouseLeave(){
  //   timeOut = setTimeout(()=>{
  //     setIsOpen(false)
  //   },200)
  // }

  function onClose(value: boolean) {
    setIsOpen(value);
  }
  useEffect(() => {
    movieRef.current?.addEventListener("mouseenter", onMouseEnter )
    // movieRef.current?.addEventListener("mouseleave", onMouseLeave)

    return () => {
      movieRef.current?.removeEventListener("mouseenter", onMouseEnter);
      // movieRef.current?.removeEventListener("mouseleave", onMouseLeave)

    };
  },[]);

  return (
    <>
      <section
        ref={movieRef}
        key={id}
        className="aspect-square flex-none overflow-hidden rounded-md "
      >
        <img
          src={createImageURl(poster_path, 200)}
          alt={title}
          loading="lazy"
          className="h-full w-full"
        />
      </section>
      <Modal
        isOpen={isOpen}
        title=""
        onClose={onClose}
        closeModal={closeModal}
        value={value}
      >
        <section className=" aspect-square transition-[height] duration-500 ease-in">
          <img
            src={createImageURl(poster_path, 300)}
            alt={title}
            className={`${
              hidePost ? "invisible h-0" : "visible h-full"
            } w-full`}
          />
          <YouTube
            videoId={videoInfo?.key}
            opts={opts}
            className={!hidePost ? "invisible h-0" : "visible h-full"}
          />
          <section className="flex items-center justify-between p-6">
            <ul className="flex items-center justify-evenly gap-4">
              <li className="h-10 w-10">
                <button className="h-full w-full">
                  <Play />
                </button>
              </li>
              <li className=" h-8 w-8 rounded-full border-2 border-gray-500 hover:border-white">
                <button className="h-full w-full">
                  <PlusCircle />
                </button>
              </li>
              <li className="h-8 w-8 rounded-full border-2 border-gray-500 hover:border-white">
                <button className=" h-full w-full">
                  <LikeIcon />
                </button>
              </li>
            </ul>
            <ul className="flex items-center justify-self-end ">
              <li className="h-8 w-8 rounded-full border-2 border-gray-500 hover:border-white">
                <button className=" h-full w-full">
                  <ChevronDown />
                </button>
              </li>
            </ul>
          </section>
        </section>
      </Modal>
    </>
  );
}
