// import React from "react";
import { useEffect, useState } from "react";
import NetflixLogo from "../assets/Netflix_Logo_RGB.png";
import { NavLink } from "react-router-dom";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import SearchBar from "./searchBar";
import ProfileMenu from "./profileMenu";

export default function Header() {
  const [setFixed, setsetFixed] = useState(false)
  
  function isActiveLInk({ isActive }: { isActive: boolean }) {
    return isActive ? "text-white font-semi-bold" : "";
  }

  function onWindowScroll(){
    if(window.scrollY > 20){
      setsetFixed(true)
      console.log(setFixed)
    }else{
      setsetFixed(false)
    }

  }

  useEffect(() => {
    window.addEventListener("scroll", onWindowScroll)

  
    return () => {
    window.removeEventListener("scroll", onWindowScroll)
      
    }
  },[onscroll] )
  
  return (
    <header className={`${
      setFixed ? "bg-black fixed" : "bg-transparent relative "
    } z-[10] w-full transition-colors pl-4  duration-700 delay-75 ease-in-out pr-11`}>
      <nav className="grid grid-cols-[180px_auto_auto] items-center gap-2">
        <section className=" h-14">
          <img src={NetflixLogo} alt="logo" className=" h-full w-full object-contain" />
        </section>
        <section>
          <ul className="flex items-center gap-4 text-sm">
            <li className=" font-bold text-gray-600 hover:text-gray-400">
              <NavLink to="/browse" className={isActiveLInk}>
                Home
              </NavLink>
            </li>
            <li className=" font-normal text-gray-100 hover:text-gray-400">
              <NavLink to="/browse/genre" className={isActiveLInk}>
                Tv Shows
              </NavLink>
            </li>
            <li className="font-normal text-gray-100  hover:text-gray-400">
              <NavLink to="/browse/genre/movies" className={isActiveLInk}>
                Movies
              </NavLink>
            </li>
            <li className="font-normal text-gray-100 hover:text-gray-400">
              <NavLink to="/latest" className={isActiveLInk}>
                News & Popular
              </NavLink>
            </li>
            {/* <li className="font-normal text-gray-100  hover:text-gray-400">
              <NavLink to="/browse/genre/movies" className={isActiveLInk}>
                My List
              </NavLink>
            </li>
            <li className="font-normal text-gray-100  hover:text-gray-400">
              <NavLink to="/browse/genre/movies" className={isActiveLInk}>
                Browse by Languages
              </NavLink>
            </li> */}
          </ul>
        </section>
        <section className="flex justify-self-end ">
          <section className="flex gap-4 items-center justify-center">
            <SearchBar/>
            <button className=" h-6 w-6">
            <BellIcon className=" h-full w-full"/>
            </button>
            <ProfileMenu/>
          </section>
          </section>
      </nav>
    </header>
  );
}
