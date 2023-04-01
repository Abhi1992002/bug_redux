import {addBug , getunresolvedBugs , resolvedBug , loadBugs} from "../bugs"
import configureStore from "../conigureStore"
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

describe("bugsSlice" , () => {

    //common thing that every test require 
    let fakeAxios;
    let store;

    //beforeEach function execute before each test
    beforeEach(() => {
         fakeAxios = new MockAdapter(axios)
         store = configureStore()
    })

    //helper function 
    const bugsSlice = () => store.getState().entites.bugs

    const createState = () => ({
        entites:{
            bugs:{
                list:[]
            }
        }
    })

    it("should add the bug to store if it is saved to the server", async()=>{

        // we use 
        //Arrange => contain all initialization code

        const bug = {description  :'a'}
        const savedBug = {...bug , id : 1}
        fakeAxios.onPost('/bugs').reply(200 , savedBug)

        //Act => code for triggering an action
        await store.dispatch(addBug(bug))

        //Assert => contains expectation code
        expect(bugsSlice().list).toContainEqual(savedBug)

    
    })

    it("should not add the bug to store if it is not saved to the server", async()=>{

        // we use 
        //Arrange => contain all initialization code

        const bug = {description  :'a'}
        fakeAxios.onPost('/bugs').reply(500)

        //Act => code for triggering an action
        await store.dispatch(addBug(bug))

        //Assert => contains expectation code
        expect(bugsSlice().list).toHaveLength(0)

    
    })

    describe("selectors" , ()=>{

        it("getUnresolvedBugs" ,()=>{
      //Arrange      
      const state = createState()
      state.entites.bugs.list =  [{id:1 , resolved : true},{id:2},{id:3},]

      //Act
      const result =  getunresolvedBugs(
          state
       )
       
      //Assert
       expect(result).toHaveLength(2)

        })
    })

    it("should mark the bug resolved if it is saved to server" ,async()=>{

     //Arrange
     const bug = {description  :'a' , id:1 }
     const savedBug = {...bug,resolved : true}
     fakeAxios.onPatch('/bugs/1').reply(200,savedBug)
     fakeAxios.onPost('bugs').reply(200 , {id:1})
     //Act

     //we need to add id : 1 to the bug because initially it is empty array 
     await store.dispatch(addBug({id:1}))
     await store.dispatch(resolvedBug(1))

     //Assert
     expect(bugsSlice().list[0].resolved).toBe(true)


    })
    it("should not mark the bug resolved if it is not saved to server" ,async()=>{

     //Arrange
     const bug = {description  :'a' , id:1 }
     
     fakeAxios.onPatch('/bugs/1').reply(500)
     fakeAxios.onPost('bugs').reply(200 , {id:1})
     //Act

     //we need to add id : 1 to the bug because initially it is empty array 
     await store.dispatch(addBug({id:1}))
     await store.dispatch(resolvedBug(1))

     //Assert
     expect(bugsSlice().list[0].resolved).not.toBe(true)

    })

    describe('loadingBugs',()=>{
        describe("if the bugs exists in the cache",()=>{
            it("should come from the cache or should not be coem from server" , async() => {
                fakeAxios.onGet("/bugs").reply(200 , [{
                    id:1,
                }])

            // to check it we need to dispatch the request twice   
              await store.dispatch(loadBugs())
              await store.dispatch(loadBugs())

            // fakeAxios.history.get => returns a array  
              expect(fakeAxios.history.get.length).toBe(1)
            })
        })
        describe("if the bugs do not exists in the cache",()=>{

          it("should be fetched from the server",async()=>{
            fakeAxios.onGet("/bugs").reply(200 ,[{id:1,}])

            await store.dispatch(loadBugs())

            expect(bugsSlice().list).toHaveLength(1)
          })

            describe("loading indicator",()=>{
                it("should be true while fetching",()=>{
                //    fakeAxios.onGet('/bugs').reply(200,[{id:1}])  
                   fakeAxios.onGet('/bugs').reply(()=>{
                    //With the help of this code we can run code before callng api

                    //means loading should be true if we are waiting for request
                   expect(bugsSlice().loading).toBe(true); 
                  

                    return [200,[{id:1}]]
                   })  

                 store.dispatch(loadBugs())


                })

                it("should be false after Bugs are fetched",async()=>{
                   fakeAxios.onGet('/bugs').reply(200,[{id:1}])  
               

                   await store.dispatch(loadBugs())

                   expect(bugsSlice().loading).toBe(false)

                })
                it("should be false if the server fails",async()=>{
                   fakeAxios.onGet('/bugs').reply(500)  

                   await store.dispatch(loadBugs())

                   expect(bugsSlice().loading).toBe(false)

                })
            })
        })
    })

})