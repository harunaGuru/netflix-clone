//@ts-nocheck
import React, { createContext, useContext, useState } from 'react'



const MovieContext = createContext()
 function MovieContextProvider({ children }) {
     const [moviewrap, setMovieWrap] = useState(null)
     const [cardInfo, setcardInfo] = useState(null)
    return (
        <MovieContext.Provider value={ {moviewrap, setMovieWrap, setcardInfo}}>
            {children}
      </MovieContext.Provider>
  )
}

const useMOvieContext = ()=> useContext(MovieContext)
export {MovieContext , MovieContextProvider, useMOvieContext, }