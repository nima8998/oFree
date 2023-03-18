import React from 'react'
import {Home,  Projects,  Tasks,  Users} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const animationConfig = {
  animation: "none"
}

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen 
          name="Home"
          component={Home} 
          options={animationConfig}
        />
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
        <Stack.Screen 
          name="Users"
          component={Users} 
          options={animationConfig}
        />
    </Stack.Navigator>
  )
}

export default HomeNavigation
