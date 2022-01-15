//  Setup Data Layer( Track The Basket )
import React, { createContext, useReducer,useContext} from "react";
// createContext = Create the data layer
// useReducer = Manupulate the Data layer by logic
// useContext = Then Use it everywhere in component

// (1) This Is Data Layer StateContext
export const StateContext = createContext();

// (2) Build a Provider and manipulate StateContext 
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

// (3) Final StateContext used for Component use 
export const useStateValue = () => useContext(StateContext);