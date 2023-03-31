import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import TabNavigation from './TabNavigation'
import { useSelector } from 'react-redux';
import { Login } from '../../Screens';

const Navigator = () => {
  const isAuth = useSelector(({auth})=>auth.userId);
  return (
    <NavigationContainer>
      {/* {!isAuth ? <Login/> : <TabNavigation/>} */}
      <TabNavigation/>
    </NavigationContainer>
  )
}

export default Navigator
