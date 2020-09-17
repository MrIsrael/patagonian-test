export default (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        userInfo: { ...state.userInfo, ...{ avatarUrl: action.payload.avatar_url, name: action.payload.name,
                                            login: action.payload.login, location: action.payload.location, 
                                            hireable: action.payload.hireable, bio: action.payload.bio } }
      }
    case 'TO_ARRAY':
      return {
        ...state,
        products: action.payload.map( pair => Object.entries( pair[1] ) )
      }
    default:
      return state
  }
}
