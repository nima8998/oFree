import React from 'react'
import {Home,  Projects,  NewTask,  Users} from '../../Screens'
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
        {/* <Stack.Screen 
          name="NewTask"
          component={NewTask} 
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
        /> */}
    </Stack.Navigator>
  )
}

export default HomeNavigation
