import Cookies from 'js-cookie';


const inititalState = {
    isLoggedIn: !!Cookies.get('token'),
    user: JSON.parse(localStorage.getItem('userDetails')) || null
}


const userReducer = (state = inititalState,action) => {
    switch (action.type) {
        case 'login':
            return{
                ...state,
                isLoggedIn:true,
                user:action.payload
            };
            case 'logout':
                return{
                    ...state,
                    isLoggedIn:false,
                    user:null,
                }

            case 'update_user':
      const updatedUser = {
        ...state.user,
        ...action.payload,
      };
      localStorage.setItem('userDetails', JSON.stringify(updatedUser));
      return {
        ...state,
        user: updatedUser,
      };
    
        default:
            return state;
    }
}


export default userReducer