import React, { createContext, useContext, useEffect, useState } from 'react'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, User, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_wTimPxENX7X_w_k7tw58hfdlEObWJJM",
  authDomain: "netflix-recap.firebaseapp.com",
  projectId: "netflix-recap",
  storageBucket: "netflix-recap.appspot.com",
  messagingSenderId: "267307834723",
  appId: "1:267307834723:web:9a78e75ea1f65ce96d4756"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export type AuthContextType = ReturnType <typeof UserProviderAuth>

const UserContext = createContext<AuthContextType | null >(null)

export function UserProviderContext ({children}:{children: React.ReactElement| React.ReactElement[]}){
  const auth = UserProviderAuth()
  return(
    <UserContext.Provider value={auth}>
     {children}
    </UserContext.Provider>
  )
}

export const useAuth = () => useContext(UserContext) ?? {} as AuthContextType


 function UserProviderAuth() {
  const [user, setUser] = useState<User | null>(auth.currentUser)
  // const enrolledUser = auth.currentUser
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const subscribe = onAuthStateChanged(auth, (user)=>{
      setLoading(false)
      setUser(user)
      // if(user){
      //   setUser(user)
      // }else{
      //   setUser(null)
      // }
      return ()=> subscribe()
    })
  
  
  }, [])
  

 

  const signUp = (email:string, password:string)=>{
    createUserWithEmailAndPassword(auth, email, password).then(({user})=>{
      // setUser(user)
      return user
    })
  }

  const signIn = (email:string, password:string)=>{
    signInWithEmailAndPassword(auth, email, password).then(({user})=>{
      // setUser(user)
      return user
    })
  }
  const signOutUser =()=>signOut(auth)
    // .then(()=>setUser(null))
  
  return {signUp, signOutUser, signIn, user, loading }
}
