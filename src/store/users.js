import { createSlice } from "@reduxjs/toolkit";

let loadid = 0;
const userSlice = createSlice({
    name:"user",
    initialState:[],
    reducers:{
        addingUser : (users , action)=>{
              users.push({
                id:++loadid,
                name: action.payload.name,
              })
        } 
    }
})

export const {addingUser} = userSlice.actions;
export default userSlice.reducer