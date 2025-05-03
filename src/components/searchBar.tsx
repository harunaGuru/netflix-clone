import  {  useEffect, useRef, useState } from 'react'
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";


export default function SearchBar(){
    const [isOPen, setIsOPen] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    function onCLick(event:any){
        event.stopPropagation()
        if(isOPen){
            inputRef.current?.focus()
        }
        setIsOPen(!isOPen)
    }
    function closeIsOpen(event: globalThis.MouseEvent){ 
        if((event.target as HTMLInputElement).id !== "searchText"){
            setIsOPen(false)
        }
    }

    useEffect(() => {
        if(isOPen){
           
            window.addEventListener("click", closeIsOpen)
            return () => {
            window.addEventListener("click", closeIsOpen)

            // window.removeEventListener("click", closeIsOpen)
              
            }
        }
    }, [isOPen])
    

    return (
      <section className='flex w-[300px] justify-end items-center overflow-hidden' >
         <button onClick={onCLick} className={`${!isOPen ? "h-6" : "h-0"} w-6`}>
              <MagnifyingGlassIcon style={{strokeWidth:".12rem"}} className=" h-full w-full"/>
        </button>
        <section className={`${isOPen ? "w-full p-1 visible animate-rtl" : "w-0 invisible"}  justify-end border border-white  flex  bg-dark items-center gap-2`}>
        <button  className="h-6 w-6">
              <MagnifyingGlassIcon style={{strokeWidth:".12rem"}} className=" h-full w-full"/>
        </button>
        <input ref={inputRef} type="text" name="searchText" id="searchText"  className=" w-full outline-none bg-gray-900 text-white" placeholder="Tiles, people, genres"/>
        </section>
       
      </section>
    )
}



