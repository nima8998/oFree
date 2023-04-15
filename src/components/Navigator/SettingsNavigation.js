import React from 'react'
import {Workday} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from '../../Constants/Colors'
import MenuItem from '../Navbar/MenuItem'

const Stack = createNativeStackNavigator();

const SettingNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Settings" screenOptions={{
        headerTitleStyle: {
          color: "#fff",
          fontSize: 22,
        },
      }}>
        <Stack.Screen 
          name="Settings"
          component={Workday} 
          options={() => ({
            title: 'Preferencias',
            headerStyle: {
              backgroundColor: Colors.secondaryViolet
            },
            headerLeft: ()=><MenuItem/>
          })}
        />
    </Stack.Navigator>
  )
}

export default SettingNavigation
