import { DispatchType, savedProfile, userProfile } from './utils'



export default function reducer(state : savedProfile, action: DispatchType) {
  const {type, payload} = action;
  switch(type){
    case "add" :{
      const newProfile: userProfile ={
        id: crypto.randomUUID(),
        name: payload.name as string,
        imageURl: payload.imageURl as string
      }
      console.log(newProfile)
      const storedProfile = [...(state?.profile ?? []), newProfile]
      const updatedProfile: savedProfile = {profile: storedProfile, savedProfileId: state?.savedProfileId}
      return updatedProfile;
    }

    case "edit" :{
      const editIndex = state.profile?.findIndex((profile)=> profile.id === payload.id) ?? -1;
      if(editIndex > -1  && state){
        const updatedState = {...state}
        updatedState?.profile.splice(editIndex, 1, {...updatedState.profile[editIndex], name: payload.name as string})
        return updatedState;
      }
      break
    }
      
    case "delete":{
      if(state){
        const updatedProfile = {...state}
        updatedProfile.profile = updatedProfile?.profile.filter(profile=> profile.id !== payload.id)
        return updatedProfile
      }
      break
    }
    case "current":{
      if(state){
        const updatedState: savedProfile = {...state, savedProfileId:payload.id as string}
        return updatedState
      }
      break
    }
    case "load":{
      return payload
      
   } 
  }
  return state
  
}
