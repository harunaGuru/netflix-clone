import React  from 'react'
import NetflixLogo from "../assets/Netflix_Logo_RGB.png";
import {  useAuth } from '../common/auth';
import { useNavigate } from 'react-router-dom';
import {
  Link
} from "react-router-dom";



export default  function Register() {
  const {signUp} = useAuth()
  const navigate = useNavigate()
 async function formSubmit(event: React.SyntheticEvent){
    event.preventDefault()
    const {email, password} = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    await signUp(email.value, password.value)
    navigate("/browse")
  }
  return (
    <>
    <header className='relative w-56'>
        <img src={NetflixLogo} alt="Netflx Logo" className='w-full h-full z-[1]' />
    </header>
    <section className=' absolute min-h-screen w-full -z-[1] top-0 bg-[url("/src/assets/Netflix-backgroundImage.jpg")] bg-cover'></section>
    <section className='absolute inset-0 bg-gradient-to-bl from-black/70 to-black/50'></section>
  
    <form onSubmit={formSubmit}  className='relative h-[70vh] bg-black/75 w-[450px] mx-auto p-16 pt-16'>
      <h2 className=' text-3xl  font-semibold mb-5'>Sign Up</h2>
      <section className='flex flex-col gap-4'>
      <input type="email" name="email" id="email" className='w-full p-3  rounded-md bg-zinc-500 outline-none' placeholder='Email or phone number'/>
      <input type="password" name="password" id="password" className='w-full p-3 rounded-md bg-zinc-500 outline-none' placeholder='Password'/>
      <button type="submit" className='w-full p-3 text-lg mt-4 font-semibold rounded-md bg-netflixRed outline-none'>Sign Up</button>
      <p className='text-end flex-end'>Already have an account? click <Link to="/login" className=" text-netflixRed hover:underline"> here </Link> to login </p>
      </section>
    </form>
    </>
  )
}

