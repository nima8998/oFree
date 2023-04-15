import React from 'react'
import {Workday} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from '../../Constants/Colors'
import MenuItem from '../Navbar/MenuItem'

const Stack = createNativeStackNavigator();

const WorkdayNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Workday" screenOptions={{
        headerTitleStyle: {
          color: "#fff",
          fontSize: 22,
        },
      }}>
        <Stack.Screen 
          name="Workday"
          component={Workday} 
          options={() => ({
            title: 'Mi jornada laboral',
            headerStyle: {
              backgroundColor: Colors.secondaryViolet
            },
            headerLeft: ()=><MenuItem/>
          })}
        />
    </Stack.Navigator>
  )
}

export default WorkdayNavigation
