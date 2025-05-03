import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import Browse from "./pages/browse";
import Layout from "./components/layout";
// import { MovieContextProvider } from "./components/context";
import { UserProviderContext, useAuth,  } from "./common/auth";
import Login from "./pages/login";
// import React, { useEffect } from "react";
import Register from "./pages/register";
import Profile from "./components/profiles";
import ProfileContext from "./components/profileContext";

export function Loader(){
  return(
    <section className="grid place-items-center w-screen h-screen">
    <svg className="animate-spin h-1/5 w-1/5 text-netflixRed" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  </section>
  )
}


const ProtectedRoute = ({children}:{children:React.ReactElement})=>{
  
  const {user, loading} = useAuth()
  // const navigate = useNavigate()

  // state={{ from: location }} replace

   if (!user && !loading) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
 
}

function ErrorRoute(){
  return(
    <section className="grid place-items-center gap-2 p-4">
      <h1 className=" text-4xl">The page you are looking for doesn't exit</h1>
      <p>kindly click <Link to="/browse" className=" text-netflixRed hover:underline"> here </Link> to see other available links </p>

    </section>
  )
}

function AppRouter() {
  const { loading} = useAuth()
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={
        <ProtectedRoute>
          <Outlet />
         </ProtectedRoute>    
      }
      errorElement={<ErrorRoute/>}
      >
        <Route index element={<Profile edit={false} />}/>
        <Route path="ManageProfiles" element={<Profile edit={true} />}/>

        <Route path="browse" element={<Layout />}>
          <Route index element={<Browse />} />
        </Route>
        <Route path="latest" element={<Layout />}>
          <Route index element={<h1>This is for latest movies</h1>} />
        </Route>
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </>
    ),
    
  );
  return loading ? <Loader/> : <RouterProvider router={router} />;
}
  {/* <MovieContextProvider> */}
    {/* </MovieContextProvider> */}
function App() {
  return (
    <UserProviderContext>
      <ProfileContext>
      <AppRouter />
      </ProfileContext>
    </UserProviderContext>
  )
}
export default App;
