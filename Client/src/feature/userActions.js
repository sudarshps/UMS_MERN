export const login = (user) => ({
    type:'login',
    payload:user
})


export const logout = () => ({
    type:'logout'
})



export const updatedUser = (user) => ({
    type:'update_user',
    payload:user
})

