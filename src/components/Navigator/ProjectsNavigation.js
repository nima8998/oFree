import React from 'react'
import {Projects, Tasks} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const animationConfig = {
  animation: "none"
}

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Projects" screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen 
          name="Tasks"
          component={Tasks} 
          options={animationConfig}
        />
        <Stack.Screen 
          name="Projects"
          component={Projects} 
          options={animationConfig}
        />
    </Stack.Navigator>
  )
}

export default HomeNavigation
