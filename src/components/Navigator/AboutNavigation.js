import React from 'react'
import {Workday} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from '../../Constants/Colors'
import MenuItem from '../Navbar/MenuItem'

const Stack = createNativeStackNavigator();

const AboutNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="About" screenOptions={{
        headerTitleStyle: {
          color: "#fff",
          fontSize: 22,
        },
      }}>
        <Stack.Screen 
          name="About"
          component={Workday} 
          options={() => ({
            title: 'Acerca de',
            headerStyle: {
              backgroundColor: Colors.secondaryViolet
            },
            headerLeft: ()=><MenuItem/>
          })}
        />
    </Stack.Navigator>
  )
}

export default AboutNavigation
