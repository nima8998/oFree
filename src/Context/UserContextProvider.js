import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createUserDataLocal } from "../../db";

export let UserContext = React.createContext();
export const useUserContext = () => React.useContext(UserContext);

export let UserContextProvider = ({ children }) => {
	const [hasLocalData, setHasLocalData] = React.useState(false);

  const dispatch = useDispatch();
	const {userIdExternalDB, currentUser, token} = useSelector(({auth})=>auth)

	const executeLocalDataCreation = () =>{
		// if (!hasLocalData){
		// 	createUserDataLocal(currentUser.email, userIdExternalDB)
    //     .then(_=>{

    //       setHasLocalData(true)
    //     })
    //     .catch(err=>console.log(err))
		// }
	}
	
	return (
		<UserContext.Provider
			value={{
        executeLocalDataCreation
      }}
		>
			{children}
		</UserContext.Provider>
	);
};