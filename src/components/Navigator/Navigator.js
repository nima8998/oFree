import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import DrawerNavigation from './DrawerNavigation'
import { useSelector } from 'react-redux';
import { Login, Tutorial } from '../../Screens';
import {useCommonContext} from '../../Context/CommonContextProvider';

// con renderizado condicional, validando que no haya userId de firebase y el tutorial no esté registrado o sea true, se ve el tutorial/onboarding.
// si no tene tuto (porque lo salteó) y tampoco hay userId, se pide login
// sino, el drawerNavigation con el home como initialRoute.

const Navigator = () => {
  const {showTutorial} = useCommonContext();
  const {userId} = useSelector(({auth}) => auth);

  return (
    <NavigationContainer>
      {
        !userId && (showTutorial === undefined || showTutorial) ? <Tutorial/> : 
        (!showTutorial && !userId) ? <Login/> :
        (userId) && <DrawerNavigation/>
      }
    </NavigationContainer>
  )
}

export default Navigator
