import { isEven } from "./math";

// we can also define group using describe()
describe("isEven",()=>{
    it("Should return true if given an even number" , ()=>{
       
    
        const result = isEven(2);
    
        expect(result).toEqual(true)
    })
    
    it("Should return false if given an odd number" , ()=>{
    
        const result = isEven(1);
    
     
        expect(result).toEqual(false)
    })
})

