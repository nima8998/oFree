import React from 'react'
import {Statistics} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from '../../Constants/Colors';
import ScreenOptionsNavbar from '../../Constants/ScreenOptionsNavbar';

const Stack = createNativeStackNavigator();

const StatisticsNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Statistics" screenOptions={{
      title: "oFree",
      headerTitleStyle: {
        color: "#fff",
        fontSize: 22,
      },
      headerStyle:{
        backgroundColor: Colors.primaryBlue
      }
    }}>
        <Stack.Screen 
          name="Statistics"
          component={Statistics} 
          options={ScreenOptionsNavbar}
        />
    </Stack.Navigator>
  )
}

export default StatisticsNavigation
