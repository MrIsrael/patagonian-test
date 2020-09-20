import React, { Fragment, useContext, useEffect } from 'react'
import { initGalleryPics } from '../../info/initGalleryPics'

import { GlobalContext } from '../../context/TestState'

/*
Image Gallery:​ It contains a gallery of images inside a grid, in which each image has a 
clickable option to delete it. It should also include an option to add images to the 
gallery (a simple ​<input type="file">​ is enough).
The gallery’s data should be persistent. That means, if we close the browser, it should 
show the same information that it had before. You can use local text/jsonfiles, services 
like ​Firestore​, ​volatile.wtf,​ or similar.
*/
 
const Gallery = () => {
  const { initGalleryIndexes, newAddedPics, checkLocalStorage, deleteImage, grabImage } = useContext(GlobalContext)

  useEffect(() => {
    checkLocalStorage()
    // eslint-disable-next-line
  }, [])

  return(
    <Fragment>

      <div className='user-info-container' style={{ marginBottom: '5px' }}>
        <label htmlFor='add-image'>Add a new image to gallery: </label>
        <input type='file' id='new-image' 
               onChange={() => grabImage(document.getElementById('new-image'))} />
      </div>

      <div className='product-grid-container' style={ gridContainerStyle }>
      
        <div className="product-grid-container-header" style={{ backgroundColor: 'purple' }}>
          Image Gallery
        </div>

        {initGalleryIndexes.map((imageNum, index) => <div className='gallery-item-container' key={index}>
            <img src={initGalleryPics(imageNum)} alt='gallery-item' className='gallery-item' />
            <div className='gallery-button'>
              <button className='button' onClick={() => deleteImage(index, initGalleryIndexes, 'hardcodedPics')}>Delete</button>
            </div>
          </div>
        )}

        {newAddedPics.map((imageData, index) => <div className='gallery-item-container' key={index}>
            <img src={imageData} alt='gallery-item' className='gallery-item' />
            <div className='gallery-button'>
              <button className='button' onClick={() => deleteImage(index, newAddedPics, 'uploadedPics')}>Delete</button>
            </div>
          </div>
        )}

      </div>

    </Fragment>
  )
}

// Styles for gallery grid container
const gridContainerStyle = {
  backgroundColor: 'white', 
  border: '3px solid gray',
  marginBottom: '10px'
}

export default Gallery
