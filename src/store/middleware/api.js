import axios from 'axios'
import * as actions from "../api"

const api = ({dispatch , getState}) => next => async action => {
    
    if(action.type !== actions.apiCallBegan.type) return next(action) 
    
    //when i call api , i dispatch an action , so what happen is that a new action dispatch and i swallow my "apiCallBegan" action , so we need to padd apiCallBegan action to action that dispatch after callig api

    

    // i am using axios to call api , firstly install it using npm i axios

    const {url , method , data , onSuccess , onError , onStart} = action.payload
    
    if(onStart) dispatch({type : onStart})

    next(action)

    try {
        const response =  await axios.request({
            baseURL: 'http://localhost:9001/api',
            url,
            method,
            data
        })
        // it return a promise 
        
        //general 
        dispatch(actions.apiCallSuccess(response.data))

        //specific
        if(onSuccess) dispatch({type : onSuccess , payload : response.data})
        
    } catch (error) {
        //general
        dispatch(actions.apiCallFailed(error.message))

        //specific
        //  if(onError) dispatch({type : onError , payload : error})
         if(onError) dispatch({type : onError})
        

    }

 
  

}

export default api