import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { useAuth } from '../common/auth';
import {savedProfile, DispatchType} from "../common/utils"
import reducer from '../common/reducer';
const LOCAL_STORAGE_KEY = "profile"

type storedProfile = Map<string, savedProfile>;


const UserProfileContext = createContext<savedProfile | null>(null)
const UserDispatchContext = createContext<React.Dispatch<DispatchType> | null>(null)


export default function ProfileContext({children}: {children: React.ReactElement}) {
    const {user} = useAuth()
    const userProfile: savedProfile =  findProfile(user?.email as string) as savedProfile
    const [state, dispatch] = useReducer(reducer, userProfile)

    useEffect(()=>{
        if(user?.email){
            if(state){
                const localProfile = getProfile()
                localProfile.set(user?.email as string, state)
                updateProfile(localProfile)

            }else{
                return dispatch({type: "load", payload:userProfile})
            }
        }
    },[user?.email, state])
    
  return (
   <UserProfileContext.Provider value={state}>
    <UserDispatchContext.Provider value={dispatch}>
        {children}
    </UserDispatchContext.Provider>
   </UserProfileContext.Provider>
  )
}

function getProfile(): storedProfile{
    return new Map(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) ?? "[]"))
}

function findProfile(id:string){
    const storeProfile = getProfile();
     return id ?  storeProfile.get(id) ?? null : null
}

function updateProfile(profile:storedProfile){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(Array.from(profile)))
}

export const UseProfile = ()=> useContext(UserProfileContext);
export const UseDispatch = ()=> useContext(UserDispatchContext)