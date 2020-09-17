import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import TestReducer from './TestReducer'

// Initial state
const initialState = {
  defaultUser: 'mrisrael',
  userInfo: {
    avatarUrl: '',
    name: '',
    login: '',
    location: '',
    hireable: '',
    bio: ''
  },
  products: []
}

// Context creation
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TestReducer, initialState)

  // Action / Get User
  const getUser = async (username) => {
    const res = await axios.get(`https://api.github.com/users/${username}`)

    dispatch({
      type: 'GET_USER',
      payload: res.data
    })
  }

  // Action / Create array from JSON file
  function convertToArray(obj) {
    const arr = Object.entries(obj)

    dispatch({
      type: 'TO_ARRAY',
      payload: arr
    })
  }

  return (
    <GlobalContext.Provider 
      value={{
        defaultUser: state.defaultUser,
        userInfo: state.userInfo,
        products: state.products,
        getUser,
        convertToArray,
      }}
    >
      { children }
    </GlobalContext.Provider>
  )
}
