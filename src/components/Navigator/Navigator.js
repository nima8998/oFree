import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import TabNavigation from './TabNavigation'
import DrawerNavigation from './DrawerNavigation'
import { useSelector } from 'react-redux';
import { Login } from '../../Screens';

const Navigator = () => {
  const isAuth = useSelector(({auth})=>auth.userId);
  return (
    <NavigationContainer>
      {!isAuth ? <Login/> : <DrawerNavigation/>}
      {/* <DrawerNavigation/> */}
    </NavigationContainer>
  )
}

export default Navigator
