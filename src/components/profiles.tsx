import React, { ButtonHTMLAttributes, useState } from 'react'
import PencilIcon  from '@heroicons/react/24/outline/PencilIcon';
import PlusCircleIcon  from '@heroicons/react/24/outline/PlusCircleIcon';
import { useNavigate } from 'react-router-dom';
import Modal from './modal';
import { UseDispatch, UseProfile } from './profileContext';
import { DispatchType, userProfile } from '../common/utils';

  
type profileProps = {
    edit: boolean
}

type profileCardProps = {
    edit?: boolean;
    editorClick: (profile:userProfile)=> void;
    profileClick: (profile:userProfile)=> void;
    profile:userProfile

}

type profileButtonTypes = {
    profilebuttontype: "primary" | "secondary";
    children: string;
    
}

export default function Profile({edit}: profileProps) {
    const [currentProfile, setCurrentProfile] = useState<userProfile>()
    const [isOpen, setIsOpen] = useState(false)
    const profiles = UseProfile()
    const dispatch = UseDispatch() as React.Dispatch<DispatchType>
    const navigate  = useNavigate()

    // function submitForm(event:any){
    //     event.preventDefault()
    //      const {value} = event.target[0]
    //     // const {value} = event.target.profile
    //     console.log(value);
    //     const newProfile: userProfile ={
    //         name: value,
    //         imageURl: currentProfile?.imageURl as string,
    //         id: ""

    //     }
    //     if(currentProfile?.id){
    //         dispatch({type: "edit", payload: newProfile})
    //     }else{
    //         dispatch({type: "add", payload: newProfile})
            
    //     }
    //     setIsOpen(false)
        


    // }
    function profileButtonClick(){
        navigate("/ManageProfiles")
    }

    function cancelProfileSave(){
        onClose(false)
        navigate("/")
    }

    function addProfile(){
        const newProfile: userProfile = {
            name: "",
            id: "",
            imageURl : `/src/assets/netflix-profile${(  profiles?.profile.length ?? 0) + 1}.png`
        
        }
        // console.log((profiles?.profile.length ?? 0) + 1)
        // console.log(crypto.randomUUID())
        setCurrentProfile(newProfile)
        setIsOpen(true)
    }

    function handleSave(profile:userProfile){
        const ActionType: DispatchType ={
            type: profile.id ? "edit" : "add",
            payload: profile
        }
        dispatch(ActionType)
        setIsOpen(false)
    }

    function handleProfileClick(profile:userProfile){
        dispatch({type: "current", payload: profile})
        navigate("/browse")
    }

    function handleDelteProfile(profile:userProfile){
        dispatch({type: "delete", payload:profile})
        setIsOpen(false)
        navigate("/")
    }

    function openEditor(profile:userProfile){
        // const editProfile = profiles?.profile.find((profile)=> profile.id === id)
        console.log(profile)
        setCurrentProfile(profile) 
        setIsOpen(true)
    }

    function profileSecondaryClick(){
        navigate("/")
    }

    function onClose(value: boolean) {
        setIsOpen(value);
    }
    
  return (
  
    <section className='bg-dark h-screen grid place-items-center mt-4 py-10'>
        
        <section className='flex flex-col gap-6 items-center '>
        <h1 className=' text-5xl mb-3'>{!edit ? "Who's watching?": "Manage Profiles:"}</h1>
        <section className=' flex gap-5 text-zinc-600 mb-10'>
        {profiles?.profile.map((profile)=>(
           
             <ProfileCard profileClick={handleProfileClick} profile={profile} key={profile.id} edit={edit} editorClick={openEditor}/>
        ))}
        {/* <AddProfile addProfile={addProfile} />  */}
        {(profiles?.profile.length ?? 0) < 3 ?<AddProfile addProfile={addProfile} /> : null}
        </section>
        { currentProfile ? <EditorProfile deletedProfile={handleDelteProfile} cancelProfileSave = {cancelProfileSave} onSave={handleSave} profile={currentProfile} isOpen={isOpen} title='' onClose={onClose} /> : null}
        {!edit ? <ProfileButton onClick={profileButtonClick} profilebuttontype = "primary">Manage Profiles</ProfileButton>:
        <ProfileButton  onClick={profileSecondaryClick} profilebuttontype = "secondary" >Done</ProfileButton>}
        </section>
    </section>
  )
}

function ProfileCard({edit, editorClick, profile, profileClick}: profileCardProps){
    
    function editClick(){
        // event.stopPropagation()
        editorClick(profile)
    }
   function profileClicked(){
    profileClick(profile)
   }
    return( 
     
                 <section key={profile.id} className='relative flex flex-col gap-2  justify-center items-center text-gray-400 ' >
                 <button onClick={profileClicked} className='flex flex-col gap-2 justify-center items-center  hover:text-white hover:border-gray-400 hover:cursor-pointer'>
                 <section className='w-32 h-32'>
                 <img src={profile.imageURl} alt={profile.id} className='w-full h-full rounded-md hover:border-[3px] '/>
                 </section>
                 <h2 className='flex justify-center text-base'>{profile.name}</h2>
                 </button>
                 {edit ? <section className='absolute top-0 left-0 w-full h-32 bg-black/50 -z[1]'></section>: null}
                 {edit ? <button onClick={editClick} className='absolute inset-0 grid place-items-center '>
                 <PencilIcon style={{strokeWidth: ".15rem"}} className='h-6 w-6 text-white ' />
              </button> : null}
                 </section>
       
    )
}

function AddProfile({addProfile}: {addProfile:()=>void}){

    return(
        <button onClick={addProfile} className='flex flex-col gap-2 justify-center items-center text-gray-400  hover:text-white hover ' >
                    <section className='w-32 h-32 grid place-items-center  rounded-md hover:bg-white/90'>
                    <PlusCircleIcon style={{strokeWidth:"1px"}} className=' h-20 w-20 fill-gray-400/50 ' />
                    </section>
                <h2 className='flex justify-center text-base'>Add Profile</h2>
                </button>
    )
}

function ProfileButton (props : profileButtonTypes & ButtonHTMLAttributes<HTMLButtonElement>){
    return(
         <button {...props} className={props?.profilebuttontype === "primary" ? 'border border-gray-500 text-gray-500  px-5 py-1 mt-8 hover:text-white hover:border-[1px] hover:border-gray-300 ' : 
         'border border-gray-500 bg-white font-medium text-gray-500  px-5 py-1 mt-8 hover:bg-netflixRed'  } >
            {props.children}
            </button> 
        
    )
}

function EditorProfile({
    isOpen,
    title,
    onClose,
    profile,
    onSave,
    cancelProfileSave,
    deletedProfile
    }:{
    isOpen: boolean;
    onClose: (value: boolean) => void;
    title: string;
    profile: userProfile;
    onSave?: (profile: userProfile)=> void;
    cancelProfileSave: ()=>void;
    deletedProfile: (profile:userProfile)=>void;
    // children: React.ReactElement;
    
    }){
        function submitForm(event:React.FormEvent){
            event.preventDefault()
            const {profileName} = event.target as typeof event.target & {
                profileName: { value: string };
              };
              if(onSave){
                  const savedProfile: userProfile = {
                    name: profileName.value,
                    imageURl: profile.imageURl,
                    id: profile?.id ? profile.id : ""
                  }
                  onSave(savedProfile)
              }
          
        }
        function deleteProfile(){
            deletedProfile(profile)
        }
    return(
        <Modal isOpen={isOpen} title={title} onClose={onClose} >
            <section  className='h-screen w-screen bg-dark '>
                <form  onSubmit={submitForm} className=' mt-20 w-[50vw] mx-auto  flex flex-col'>
                <h1 className=' text-5xl mb-1'>{profile?.id ? "Edit Profile" : "Add Profile"}</h1>
                <section className='flex border-t border-b py-5 gap-4'>
                    <section className=' aspect-square h-24'>
                        <img src={profile?.imageURl} alt="profile-image" className=' h-full w-full rounded-sm'/>
                    </section>
                    <section className='flex flex-col gap-4 w-full'>
                        <input type="text" defaultValue={profile?.name} name='profileName' id='profileName' className='w-full p-1 px-2 bg-gray-400 outline-none ' />
                        
                    </section>

                </section>
                <section className='flex gap-3'>
                            <ProfileButton type='submit' profilebuttontype='secondary'> Save</ProfileButton>
                            <ProfileButton type='button' onClick={cancelProfileSave} profilebuttontype='primary'>Cancel</ProfileButton>
                            <ProfileButton type='button' onClick={deleteProfile} profilebuttontype='primary'>Delete Profile</ProfileButton>
                        </section>
                </form>
            </section>
        </Modal>

    )
}