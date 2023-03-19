import React from 'react'
import {Projects, NewTask, Calendar} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const animationConfig = {
  animation: "none"
}

const CalendarNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Calendar" screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen 
          name="Calendar"
          component={Calendar} 
          options={animationConfig}
        />
        <Stack.Screen 
          name="NewTask"
          component={NewTask} 
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

export default CalendarNavigation
