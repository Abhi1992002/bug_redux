import configureStore from "./store/conigureStore"
import {bugAdded , bugResolved , getunresolvedBugs , bugAssignedToUser , getBugsByUser} from "./store/bugs.js"
import  {projectAdded} from "./store/projects.js"
import * as actions from "./store/api"
import { addingUser } from "./store/users"
import {loadBugs} from "./store/bugs.js"
import { addBug , resolvedBug , assignBugToUser} from "./store/bugs.js"

const store = configureStore()

// store.subscribe(()=>{
//     console.log("Subscribed")
// })

store.dispatch(loadBugs())


// store.dispatch(addBug({description:"!"}))

setTimeout(() => {
    store.dispatch(assignBugToUser(1,4))
}, 2000);




// store.dispatch((dispatch , getState)=>{
//      // call an api
//   //promise => resolved => displatch() something
//     dispatch({type:'bugRecieved',bugs:[1,2,3]})
//     console.log(getState)
//   //promise => reject => dispatch() something else

// })

// store.dispatch({
//     type:"error",
//     payload:{message  :"An error occurred"}
// })

// store.dispatch(projectAdded({name : "Project-1"}))
// store.dispatch(projectAdded({name : "Project-2"}))
// store.dispatch(projectAdded({name : "Project-3"}))

// store.dispatch(bugAdded({description : "bug 1"}))
// store.dispatch(bugAdded({description : "bug 2"}))
// store.dispatch(bugAdded({description : "bug 3"}))

// store.dispatch(bugAssignedToUser({bugId:1 , userId:2}))

// store.dispatch(bugResolved({id : 1}))
// store.dispatch(bugResolved({ id : 3}))

// store.dispatch(addingUser({name:"abhimanyu"}))
// store.dispatch(addingUser({name:"suman"}))
// store.dispatch(addingUser({name:"pooja"}))

// const unresolvedBugs = getunresolvedBugs(store.getState());
// const usersBug = getBugsByUser(2)(store.getState())

// console.log(unresolvedBugs)
// console.log(usersBug)