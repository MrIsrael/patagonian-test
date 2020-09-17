export default (state, action) => {
  switch (action.type) {
    case 'GET_USER':
      return {
        ...state,
        userInfo: { ...state.userInfo, ...{ avatarUrl: action.payload.avatar_url, name: action.payload.name,
                                            login: action.payload.login, location: action.payload.location, 
                                            hireable: action.payload.hireable, bio: action.payload.bio } }
      }
    default:
      return state
  }
}
