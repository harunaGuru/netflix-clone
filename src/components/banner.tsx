import { useEffect, useRef, useState } from "react";
import { MovieResponse, MovieResult, fecthApi } from "../common/api";
import { ENDPOINTS } from "../common/endpoints";
import { createImageURl } from "../common/utils";
import PlayIcon from "@heroicons/react/24/solid/PlayIcon";
import InfoIcon from "@heroicons/react/24/outline/InformationCircleIcon";
import { VideoResponse, VideoResult } from "./movie-card";
import  YouTube, { YouTubeEvent, YouTubeProps }  from 'react-youtube';
import { Loader } from "../App";


const opts: YouTubeProps["opts"] = {
  width: document.body.clientWidth,
   height: "720",
  playerVars: {
    autoplay: 1,
    playsinline: 1,
    controls: 0,
    // autohide: 1,
    // origin=
}};


export default function Banner() {
  const [randonMovie, setRandonMovie] = useState<MovieResult>();
  const [videoInfo, setVideoInfo] = useState<VideoResult>()
  const [hidePost, setHidePost] = useState(false);
   const wascalled = useRef(false)

 
  function onstateChange(event:YouTubeEvent<number>){
    if(event.data === 0){
      //finished playing
      setHidePost(false)
      
    }else if(event.data === 1){
      //start playing
      setHidePost(true)
      
    }

  }
  
  function getRandomMovies(total: number): number {
    const result = Math.floor(Math.random() * (total - 1));
    // console.log(result)
    return result;
  }
  
  async function getPopularMovies() {
    const result = await fecthApi<MovieResponse<MovieResult[]>>(
      ENDPOINTS.POPULAR_MOVIES,
    );
    const response = result.results.filter((res) => res.backdrop_path);
    const filteredresult = response[getRandomMovies(response.length)];
    console.log(filteredresult)
    setRandonMovie(filteredresult);
    const videoinfo = await getPopularVideo(filteredresult.id.toString() )
    console.log({videoinfo})
    setVideoInfo(videoinfo[0])
      setTimeout(() => {
        setHidePost(true)
      }, 1200);
  
  
    // console.log(randonMovie);
  }

  async function getPopularVideo(id: string) {
    
    const response = await fecthApi<VideoResponse<VideoResult[]>>(
      ENDPOINTS.VIDEOS.replace("{movie_id}", id),
    );
    // console.log({response});
    return response?.results.filter(res=> res.site.toLowerCase() === "youtube");
  }





useEffect(() => {
  if(wascalled.current) return
  wascalled.current = true
   getPopularMovies();
}, []);


  return randonMovie ?   (
    <section className= "relative mb-5 aspect-video h-[720px] w-full">
      <img
        src={createImageURl(randonMovie?.backdrop_path ?? "", 0, "original")}
        alt={randonMovie?.title}
        className={`${
          hidePost ? "invisible h-0" : "visible h-full"
        } w-full`}
      />
      {videoInfo ?  <YouTube onStateChange={onstateChange} id="banner-video" videoId={videoInfo?.key} opts={opts} className={hidePost ? " h-full visible -mt-[58px]  z-[5]" : " h-0 invisible"}/> : null}
      {!hidePost ? <section className="absolute left-0 top-0 z-[1]  h-full w-full bg-dark/70 "></section>: null}
      <article className=" absolute top-[305px] z-[1] ml-12 w-[500px]">
        <h1 className=" line-clamp-2 text-7xl font-bold uppercase">
          {randonMovie?.title}
        </h1>
        <section className="mt-3 line-clamp-3">
          {randonMovie?.overview}
        </section>
        <section className="mt-3 flex gap-2 ">
          <button className="flex h-10 w-[110px] items-center justify-center rounded-sm bg-white  text-black">
            <PlayIcon className="h-8 w-8" />
            <h1 className=" text-base font-bold">Play</h1>
          </button>
          <button className="flex h-10 w-[120px] items-center justify-center rounded-sm bg-gray-400  text-white">
            <InfoIcon className="h-8 w-8" />
            <h1 className=" text-base font-bold ">More Info</h1>
          </button>
        </section>
      </article>
    </section>
  ): <Loader/>
}
