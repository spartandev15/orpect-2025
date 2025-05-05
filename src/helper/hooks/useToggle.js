import { useCallback, useState } from "react"

const useToggle = (initialValue=false)=>{
 const [state, setState] = useState(initialValue);
    
  const toggle = useCallback(()=>{
   setState((state) => !state)  
     },[])

// const customToggle = useCallback((value) => {
//     setState(value);
//   }, []);

  return [state,toggle]
}

export default useToggle;


