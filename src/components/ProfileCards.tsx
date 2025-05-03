// import React, { useReducer, useState } from 'react'

// const LOCAL_STORAGE_KEY = "profiles"

// type profileCard ={
//     name: string;
//     imageURl: string;
//     id: number
// }

// type savedProfileCard ={
//     name: string;
//     imageURl: string;
//     id: string;
//     selectedCard: boolean
// }

// const firstProfile = {
//     name: "haruna",
//     image: "har",
//     id: Math.random(),
//     selectedId: false
// }

// export default function ProfileCards() {
//     const [initialProfile, setInitialProfile] = useState<savedProfileCard[]>([])
//     const [state, dispatch] = useReducer(profileReducer, initialProfile)

//     function getItemsFromLocalStorage(){
//         const profileArray = new Map()
//         const items = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) as string) as savedProfileCard;
//          profileArray.set(items.id, items)
//          return profileArray
//     }

//     function updateItems(){
//         const itemsMap = getItemsFromLocalStorage();

//     }
//   return (
//     <div>ProfileCards</div>
//   )
// }
