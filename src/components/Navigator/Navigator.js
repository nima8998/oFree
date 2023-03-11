import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Tutorial from '../../Screens/Tutorial/Tutorial';
import Home from '../../Screens/Home/Home';
import Projects from '../../Screens/Projects/Projects';
import Tasks from '../../Screens/Tasks/Tasks';
import Users from '../../Screens/Users/Users';


const Stack = createNativeStackNavigator();

const animationConfig = {
  animation: "none"
}

const Navigator = () => {

  return (
    <NavigationContainer>

        <Stack.Navigator initialRouteName={"Tutorial"} screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen 
              name="Tutorial"
              component={Tutorial} 
              options={animationConfig}
            />
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
    </NavigationContainer>
  )
}

export default Navigator
