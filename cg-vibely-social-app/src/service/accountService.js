export const getAccessToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user ? user.accessToken : null;
}

export const getRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user ? user.refreshToken : null;
}

export const getStoredUserData = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user){
        return user
    }
    return {}
}