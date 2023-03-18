import React from 'react'
import {Statistics} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

const animationConfig = {
  animation: "none"
}

const StatisticsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Statistics" screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen 
          name="Statistics"
          component={Statistics} 
          options={animationConfig}
        />
    </Stack.Navigator>
  )
}

export default StatisticsNavigation
