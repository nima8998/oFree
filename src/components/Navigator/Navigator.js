import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import DrawerNavigation from './DrawerNavigation'
import { useSelector } from 'react-redux';
import { Login, Tutorial } from '../../Screens';
import {useCommonContext} from '../../Context/CommonContextProvider';

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
