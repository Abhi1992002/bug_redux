import { createSlice } from "@reduxjs/toolkit";

let projectId = 0 ;

const projectSlice = createSlice({
    name:"projects",
    initialState:[],
    reducers : {
        projectAdded : (project , action)=>{
            project.push(
                {
                    id:++projectId,
                    name : action.payload.name
                }
            )
        }
    } 
})

export const {projectAdded} = projectSlice.actions;

export default projectSlice.reducer;
