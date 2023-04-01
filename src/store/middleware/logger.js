   //action => action which is dispatches 
   //next => reference to next middlware or reducer(if no next middleware)
   //we use currying in this
    
   //Add this in configure store

const logger = param => store => next => action =>{

 console.log("logging", param)
 return next(action)

}

export default logger;