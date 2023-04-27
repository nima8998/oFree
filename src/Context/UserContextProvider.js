import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { createUserDataLocal, getUserLocalData } from "../../db";
import { getTasks } from "../Store/Actions/tasks.action";

export let UserContext = React.createContext();
export const useUserContext = () => React.useContext(UserContext);

export let UserContextProvider = ({ children }) => {
  const [hasLocalData, setHasLocalData] = React.useState(false);
  const [loggedUser, setLoggedUser] = React.useState(false);
  const [refreshData, setRefreshData] = React.useState(false);
  const dispatch = useDispatch();
  const { currentUser, userId } = useSelector(({ auth }) => auth)

  // cuando se loguea el usuario, verifico que tenga datos registrados en SQLite, así no vuelvo a insertar un registro nuevo en la tabla.
  // esto se debe a que un usuario puede tener más de una cuenta.

  React.useEffect(() => {
    dispatch(getTasks(userId))
    if (loggedUser) {
      getUserLocalData(userId, 'id')
        .then(res => {
          if (res) {
            setHasLocalData(true);
          }
        })
        .catch(error => {
          console.log("error caught at user's local data consulting SQLite: (user context: 25) ", error)
        })
    }

  }, [loggedUser])

  React.useEffect(() => {
    if (!hasLocalData && currentUser) {
      createUserDataLocal(userId, currentUser.email)
        .then(res => {
          setHasLocalData(true);
          console.log("user's local data created successfully.", res)
        })
        .catch(error => {
          console.log("Error caught at the user data creation. (user context:38)", error)
        })
    }
  }, [hasLocalData, currentUser])

  // useEffect que escucha a un state, que modifico desde las screens que necesito que despache y actualice el listado de tareas.
  React.useEffect(()=>{
    dispatch(getTasks(userId))
  },[refreshData])

  return (
    <UserContext.Provider
      value={{
        loggedUser, setLoggedUser,
        refreshData, setRefreshData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};