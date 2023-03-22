import React from 'react'
import {Calendar} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenOptionsNavbar from '../../Constants/ScreenOptionsNavbar'
import Colors from '../../Constants/Colors'

const Stack = createNativeStackNavigator();

const CalendarNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Calendar" screenOptions={{
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
          name="Calendar"
          component={Calendar} 
          options={ScreenOptionsNavbar}
        />
    </Stack.Navigator>
  )
}

export default CalendarNavigation
