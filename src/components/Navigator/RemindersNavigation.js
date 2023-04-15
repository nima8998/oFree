import React from 'react'
import {Workday} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from '../../Constants/Colors'
import MenuItem from '../Navbar/MenuItem'

const Stack = createNativeStackNavigator();

const RemindersNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Reminders" screenOptions={{
        headerTitleStyle: {
          color: "#fff",
          fontSize: 22,
        },
      }}>
        <Stack.Screen 
          name="Reminders"
          component={Workday} 
          options={() => ({
            title: 'Recordatorios',
            headerStyle: {
              backgroundColor: Colors.secondaryViolet
            },
            headerLeft: ()=><MenuItem/>
          })}
        />
    </Stack.Navigator>
  )
}

export default RemindersNavigation
