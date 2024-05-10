import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const UserContext=createContext({});

export function UserContextProvider({children}){
    const[user,setUser]=useState(null);
    const [ready,setReady]=useState(false);
        useEffect(()=>{
        if(!user){
            const {data}= axios.get('http://localhost:4000/profile').then(({data,ready})=>{
                setUser(data);
                setReady(true);
            });
            
            
        }
        
    },[]);
    return(
        <UserContext.Provider value={{user,setUser,ready,setReady}} >
            {children}
        </UserContext.Provider>
    );
}

//      const[user,setUser]=useState(null);

//     useEffect(()=>{
//         if(!user){
//             axios.get('/profile');
//         }
//     },[]);
//     return(
//         <UserContext.Provider value={{user,setUser}}>
//             {children}
//         </UserContext.Provider>
//     )
// }