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
  products: [],
  initGalleryIndexes: [],
  newAddedPics: []
}

// Context creation
export const GlobalContext = createContext(initialState)

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(TestReducer, initialState)


  // Action / Get User
  const getUser = async (username) => {
    const res = await axios.get(`https://api.github.com/users/${username}`)
    console.log('Obteniendo datos de usuario...')

    dispatch({
      type: 'GET_USER',
      payload: res.data
    })
  }


  // Action / Create array from JSON file
  function convertToArray(obj) {
    const arr = Object.entries(obj)
    console.log('Obteniendo lista de productos...')

    dispatch({
      type: 'TO_ARRAY',
      payload: arr
    })
  }


  // Action / Check if gallery data already exists in LocalStorage; otherwise, initialize it
  function checkLocalStorage() {
    console.log('Verificando si hay datos preexistentes en LocalStorage...')
    let hardcodedPics = JSON.parse(localStorage.getItem('hardcodedPics'))
    let uploadedPics = JSON.parse(localStorage.getItem('uploadedPics'))

    if(localStorage.getItem('hardcodedPics') === null) { hardcodedPics = [0,1,2,3,4,5,6,7] }
    if(localStorage.getItem('uploadedPics') === null) { uploadedPics = [] }

    localStorage.setItem('hardcodedPics', JSON.stringify(hardcodedPics))
    localStorage.setItem('uploadedPics', JSON.stringify(uploadedPics))

    // console.log('initGalleryIndexes:', hardcodedPics)
    // console.log('newAddedPics:', uploadedPics)

    dispatch({
      type: 'CHECK_LOCAL_STORAGE',
      hardcodedPics: hardcodedPics,
      uploadedPics: uploadedPics
    })
  }


  // Action / Delete image from gallery, and make change persistent to LocalStorage
  function deleteImage(index, arr, target) {
    let hardcodedPics, uploadedPics

    arr.splice(index, 1)
    target === 'hardcodedPics' ? hardcodedPics = arr : hardcodedPics = state.initGalleryIndexes
    target === 'uploadedPics' ? uploadedPics = arr : uploadedPics = state.newAddedPics
    localStorage.setItem(target, JSON.stringify(arr))
    console.log('Imagen borrada con éxito.')

    dispatch({
      type: 'UPDATE_GALLERY_ARRAY',
      hardcodedPics: hardcodedPics,
      uploadedPics: uploadedPics
    })
  }


  // Action / Get data from new uploaded image
  function grabImage(newImage) {
    // console.log(newImage.files)
    const fileInfo = new FileReader()
    fileInfo.addEventListener('load', () => { addToGallery(fileInfo.result, state.newAddedPics) })
    fileInfo.readAsDataURL(newImage.files[0])   // returns fileInfo.result to addEventListener
  }


  // Action / Add new uploaded image to LocalStorage and GlobalState
  function addToGallery(imageData, arr) {
    arr.push(imageData)
    localStorage.setItem('uploadedPics', JSON.stringify(arr))
    console.log('Nueva imagen cargada con éxito.')

    dispatch({
      type: 'UPDATE_GALLERY_ARRAY',
      hardcodedPics: state.initGalleryIndexes,
      uploadedPics: arr
    })
  }


  return (
    <GlobalContext.Provider 
      value={{
        defaultUser: state.defaultUser,
        userInfo: state.userInfo,
        products: state.products,
        initGalleryIndexes: state.initGalleryIndexes,
        newAddedPics: state.newAddedPics,
        getUser,
        convertToArray,
        checkLocalStorage,
        grabImage,
        deleteImage,
      }}
    >
      { children }
    </GlobalContext.Provider>
  )
}
