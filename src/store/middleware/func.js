const func = ({dispatch , getState}) => next => action => {

    //if action is function then call it otherwise go to next middleare or reducer
    if(typeof action === 'function') action(dispatch , getState)
    else next(action)
    
}

export default func