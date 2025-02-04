import React, { Fragment, useContext, useEffect } from 'react'

import { GlobalContext } from '../../context/TestState'

/*
Personal Content: ​It shows the user’s personal information, alongside a 
rounded avatar of 150px of diameter with a coloured border.
*/

const UserInfo = () => {
  const { defaultUser, userInfo, getUser } = useContext(GlobalContext)

  useEffect(() => {
    getUser(defaultUser)
    // eslint-disable-next-line
  }, [])

  return(
    <Fragment>

      <div className='user-info-container'>
        <div style={{ marginBottom: '5px' }}>
          <label htmlFor='other-user'>Search another user, by his/her GitHub username: </label>
          <input type='text' id='other-user' name='other-user' autoFocus size='30'
                placeholder='Enter a GitHub username here...' 
                onKeyDown={(event) => event.keyCode === 13 && getUser(document.getElementById('other-user').value)} 
          />  {/* Enter keyCode: 13 */}
        </div>
        <div style={{ marginBottom: '30px' }}>
          <button className='button' onClick={() => getUser(document.getElementById('other-user').value)}>Search</button>
        </div>

        <div className='relative'>
          <img src={userInfo.avatarUrl} alt='avatar' className='avatar' />
          <div className='absolute'>
            <h2 style={{ paddingBottom: '8px' }}>User information</h2>
            <p>Name: {userInfo.name === null ? 'Unavailable' : userInfo.name}</p>
            <p>Username: {userInfo.login === null ? 'Unavailable' : userInfo.login}</p>
            <p>Location: {userInfo.location === null ? 'Unavailable' : userInfo.location}</p>
            <p>Hireable: {userInfo.hireable === true ? 'Yes' : 'No'}</p>
            <p style={{ lineHeight: '1.6' }}>Bio: {userInfo.bio === null ? 'Unavailable' : userInfo.bio}</p>
          </div>
        </div>
      </div>

    </Fragment>
  )
}

export default UserInfo
