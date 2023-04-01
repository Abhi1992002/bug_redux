// we create store from scratch

// we create a createStore function like a store function

// previously we send createStore a reducer
function createStore(reducer){
    var state;
    // store initial current internal state
    // we we paas store directly in return , then anyone can change it directly , hence we paas it in getState
    // we made state a private property here because we are not directly exposing it

    var listners = [];
    
    function getState(){
       return state; 
    }

    // when we do store.subscribe and send a call back function => i get that call back function as listner and i add it into listners array and whenecer someone dispactch some action it call those function inside listners array
    function subscribe(listner){
      // when we subscribe , we send our listner to listners array
      listners.push(listner);
    }

    function dispatch(action){
        // Call reducer to get the new state
        // here we are not adding validatatio to check type property in action
          state =  reducer(state,action)
        //Notify the subscriber if user is subscribed
         for(var i = 0; i < listners.length; i++){
              listners[i]();
         }
    }

    

return{
    subscribe,
   getState,
   dispatch
}
}

export default createStore();