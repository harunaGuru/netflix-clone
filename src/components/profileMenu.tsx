import  { useEffect, useRef, useState } from 'react'
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import PencilIcon from "@heroicons/react/24/outline/PencilIcon";
import UserIcon from "@heroicons/react/24/outline/UserIcon";
import QuestionMarkCircleIcon from "@heroicons/react/24/outline/QuestionMarkCircleIcon";
import IdentificationIcon from "@heroicons/react/24/outline/IdentificationIcon";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../common/auth';
import { UseDispatch, UseProfile } from './profileContext';

import { DispatchType, userProfile } from '../common/utils';


export default function ProfileMenu() {
    const [showdDropdown, setshowdDropdown] = useState(false)
    const profileRef = useRef<HTMLSelectElement>(null)
    const profiles = UseProfile()
    const dispatch = UseDispatch()  as React.Dispatch<DispatchType>
    const currentProfile = profiles?.profile.find((profile)=> profile.id === profiles.savedProfileId)
    const otherProfiles = profiles?.profile.filter((profile)=> profile.id !== currentProfile?.id)
    console.log({otherProfiles});
    console.log({currentProfile})
    let timeout:NodeJS.Timeout;
    const {signOutUser} = useAuth()
    const navigate = useNavigate()

    function logOut(){
      signOutUser()
      navigate("/login")
    }

    function profileClick(profile: userProfile){
      dispatch({type: "current", payload:profile})
      window.location.reload()
    }

    function onMouseEnter(){
        if(timeout){
            clearTimeout(timeout);
            setshowdDropdown(true)
        }
    }
    function onMouseLeave(){
      timeout = setTimeout(()=>{
        setshowdDropdown(false)
      },100 )
    }

    useEffect(() => {
      profileRef.current?.addEventListener("mouseenter", onMouseEnter)
      profileRef.current?.addEventListener("mouseleave", onMouseLeave)

    
      return () => {
        profileRef.current?.removeEventListener("mouseEnter", onMouseEnter)
        profileRef.current?.removeEventListener("mouseleave", onMouseLeave)

      }
    }, [profileRef.current])
    
  return (
    <section ref={profileRef} className='relative flex gap-3 items-center'>
        <button className='w-7 h-7'>
            <img src={currentProfile?.imageURl} alt="profile-card" className='h-full w-full rounded-md'  />
        </button>
        <ChevronDownIcon style={{strokeWidth:".2rem"}} className={ `${showdDropdown ? "rotate-180 transition-all duration-200 ease-in-out": ""} h-4 w-4`}/>
        <ul className={` ${showdDropdown ? "w-[200px] visible z-[2]" : " w-0 invisible"} border border-gray-500 text-sm pl-2 flex flex-col gap-2 text-gray-100 pt-2 pb-2 absolute  bg-black right-0 top-10`}>
          {otherProfiles?.map((profile)=>(
            <button onClick={()=>profileClick(profile)} key={profile.id} className="flex gap-2 items-center mt-2 hover:underline">
              <section  className='h-6 w-6'>
                <img src={profile.imageURl} alt={profile.name}  className='h-full w-full rounded-md'/>
              </section>
              <li className=' capitalize'>{profile.name}</li>
            </button>
          ))}
            <NavLink to="/ManageProfiles" className="flex gap-4 items-center hover:underline">
                <PencilIcon className=' h-5 w-5'/>
            <li >Manage Profile</li>
            </NavLink>
            <Link to="/transfer-profile" className="flex gap-4 items-center hover:underline">
                <IdentificationIcon className=' h-5 w-5' />
            <li >Transfer Profile</li>
            </Link>
            <NavLink to="/manage-account" className="flex gap-4 items-center hover:underline">
                <UserIcon className=' h-5 w-5' />
            <li>Account</li>
            </NavLink>
            <NavLink to="/help-center" className="flex gap-4 items-center hover:underline">
                <QuestionMarkCircleIcon className=' h-5 w-5' />
            <li>Help Center</li>
            </NavLink>
            <button onClick={logOut}  className=" hover:underline flex items-center justify-center -ml-2 px-2  border-t-gray-500 border-t-[1px]">
            <li className='pt-2 pb-2'>Sign out of Netflix</li>
            </button>

        </ul>
    </section>
  )
}
