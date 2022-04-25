const initialUserState = {
        user_Login:false,
        error:"",
        userdata:{}
}
// customers:{
//     loading:'',
//     data:[],
//     error:{},
// },
// products:{},
// bills:{}

const userReduers = (state = initialUserState,action) =>{
switch(action.type){
    case "LOGIN_ERROR":{
        return {...state,error:action.payload}
    }
    case "IS_LOGIN":{
        return{...state,user_Login:action.payload}
    }
    case 'USER_DATA':{
    return{...state,userdata:{...action.payload}}
    }
    default:{
        return {...state}
        }
    }
}
export default userReduers; 