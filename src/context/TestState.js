import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import TestReducer from './TestReducer'

import initialGallery from '../info/gallery'

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
  products: [],
  galleryArray: initialGallery
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


  // Action / Add new uploaded image to LocalStorage
  function grabImage(newImage) {
    // console.log(newImage.files)
    const fileInfo = new FileReader()

    fileInfo.addEventListener('load', () => { 
      localStorage.setItem('newImage', fileInfo.result)
      addToGallery(fileInfo.result)
      console.log('Agregada nueva imagen al LocalStorage con éxito')
    })

    fileInfo.readAsDataURL(newImage.files[0])
  }


  // Action / Add new uploaded image to gallery
  function addToGallery(data) {
    const newData = ('"' + data + '"').toString()       // HAY PROBLEMAS CON ESTE DATO OBTENIDO
    console.log(newData)

    dispatch({
      type: 'UPDATE_GALLERY_ARRAY',
      payload: data
    })
  }


  // Action / Check if gallery data already exists in LocalStorage
  function checkLocalStorage(arr) {
    let gallery = localStorage.getItem('imageGallery')

    if(gallery === null) {
      localStorage.setItem('imageGallery', JSON.stringify(arr))
    } else {
      dispatch({
        type: 'RETRIEVE_LOCAL_STORAGE',
        payload: JSON.parse(gallery)
      })
      console.log('Datos de LocalStorage traidos exitosamente al GlobalState')
    }
  }


  return (
    <GlobalContext.Provider 
      value={{
        defaultUser: state.defaultUser,
        userInfo: state.userInfo,
        products: state.products,
        galleryArray: state.galleryArray,
        getUser,
        convertToArray,
        grabImage,
        checkLocalStorage,
      }}
    >
      { children }
    </GlobalContext.Provider>
  )
}
