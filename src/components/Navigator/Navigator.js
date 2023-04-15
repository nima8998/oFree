import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import DrawerNavigation from './DrawerNavigation'
import { useSelector } from 'react-redux';
import { Login } from '../../Screens';

const Navigator = () => {
  const {userId} = useSelector(({auth})=>auth);
  return (
    <NavigationContainer>
      {!userId ? <Login/> : <DrawerNavigation/>}
    </NavigationContainer>
  )
}

export default Navigator
