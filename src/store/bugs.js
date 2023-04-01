import {createSlice } from "@reduxjs/toolkit"
import {createSelector } from 'reselect'
import {apiCallBegan} from './api'
import moment from 'moment'

//Slice

const slice = createSlice({
    name : "bugs",
    //you can give empty array but this method is good for some scenario
    initialState : {
         list:[],
         loading:false, //when user taking data for server , we make it true and show loading on ui
         lastFetch : null , //timestamp of the last item we call server to get the list of books , it is important for caching , suppose we call server 10sec before so now we do not need to call it again

    },
    reducers:{
        //actions => action handlers
        //here we do not need to create a reducers , action type , we done it using only createSlice only 
        //internally createslice calls 2 function => one is createAction and second is createReducer

        bugAdded : (bugs , action) => {
            bugs.list.push(
                action.payload
            )
        },                                                                                                                                                                                                                                   
            bugResolved : (bugs , action) => {
            const index = bugs.list.findIndex(bug => bug.id === action.payload.id)
            bugs.list[index].resolved = true 
        },

        bugAssignedToUser : (bugs , action) => {
            //we have 2 things an id of and id of user
            const {id :bugId , userId } = action.payload

            const index = bugs.list.findIndex(bug => bug.id === bugId)

            bugs.list[index].userId = userId;
        },
        bugRecieved:(bugs,action)=>{
            //action.payload have the bugs we recieved from the server
             bugs.list =  action.payload
             bugs.loading = false
             bugs.lastFetch =  Date.now()
        },
        bugsRequested:(bugs , action)=>{
            bugs.loading = true;
        },
        bugsRequestedFailed:(bugs , action)=>{
            bugs.loading = false;
        }


    }
})


export const {bugAdded , bugResolved , bugAssignedToUser , bugRecieved , bugsRequested , bugsRequestedFailed} = slice.actions;
export default slice.reducer

//Action Creators
const url = "/bugs"

export const loadBugs = () => (dispatch , getState) => {
    const {lastFetch} = getState().entites.bugs;

    //when we call moment we get the current date time
 const diffInMinutes =   moment().diff(moment(lastFetch) ,'minutes') //it find differce between current time and last time

 if(diffInMinutes < 10) return

//we return it because if we don't return it loadbugs do not get any object
   return  dispatch(apiCallBegan({
        url,
        onStart: bugsRequested.type,
        onSuccess : bugRecieved.type,
        onError : bugsRequestedFailed.type
}))
   
}

export const addBug = bug => apiCallBegan({
    url,
    method: 'POST',
    data:bug,
    onSuccess : bugAdded.type
})

export const resolvedBug = id => apiCallBegan({
    // Patch => to update one or more properties
    url:url+'/'+id,
    method:'patch',
    data:{resolved : true},
    onSuccess : bugResolved.type
})

export const assignBugToUser = (bugId , userId) => apiCallBegan({
    url : url + '/' + bugId,
    method:'patch',
    data : {userId},
    onSuccess : bugAssignedToUser.type
})

// export const getunresolvedBugs = state => state.entites.bugs.filter(bug => !bug.resolved)

export const getunresolvedBugs =  createSelector(
    state => state.entites.bugs, // it take state and return bugs , and output of this function passed to result function(bugs)
    bugs => bugs.list.filter(bug => !bug.resolved) //and from all those bugs we take out bugs who are unresolved , suppose if this result not change , result function do not do this again , result function give us list form cache
)

//we give him userId an dby this we find what bugs are assigned to him
export const getBugsByUser = userId =>  createSelector(
    state => state.entites.bugs,
    bugs => bugs.list.filter(bug => bug.userId === userId )
)