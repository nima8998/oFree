import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createUserDataLocal, getUserLocalData } from "../../db";

export let UserContext = React.createContext();
export const useUserContext = () => React.useContext(UserContext);

export let UserContextProvider = ({ children }) => {
  const [hasLocalData, setHasLocalData] = React.useState(false);
  const [loggedUser, setLoggedUser] = React.useState(false);

	const {  currentUser, userId } = useSelector(({ auth }) => auth)
  
	React.useEffect(() => {
    if(loggedUser){
      getUserLocalData(userId, 'id')
        .then(res=>{
          const result = res.rows._array;
          if(result.length > 0){
            setHasLocalData(true);
          }
        })
        .catch(error=>{
          console.log("error caught at user's local data consulting SQLite: (user context: 25) ", error)
        })
    }

	}, [loggedUser])

  React.useEffect(() => {
    if(!hasLocalData && currentUser){
      createUserDataLocal(userId, currentUser.email)
        .then(res=>{
          setHasLocalData(true);
          console.log("user's local data created successfully.", res)
        })
        .catch(error=>{
          console.log("Error caught at the user data creation. (user context:38)", error)
        })
    }
	}, [hasLocalData, currentUser])

	return (
		<UserContext.Provider
			value={{
        loggedUser, setLoggedUser,
      }}
		>
			{children}
		</UserContext.Provider>
	);
};