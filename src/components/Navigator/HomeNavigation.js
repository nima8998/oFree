import React from 'react'
import {Home} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ScreenOptionsNavbar from '../../Constants/ScreenOptionsNavbar'
import Colors from '../../Constants/Colors'
import { Profile, Notifications } from '../../Screens';

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{
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
          name="Home"
          component={Home} 
          options={ScreenOptionsNavbar}
        />
        <Stack.Screen 
          name="Profile"
          component={Profile} 
          options={() => ({
            title: 'Perfil',
            headerStyle: {
              backgroundColor: Colors.secondaryViolet
            }
          })}
        />
        <Stack.Screen 
          name="Notifications"
          component={Notifications} 
          options={() => ({
            title: 'Notificaciones',
            headerStyle: {
              backgroundColor: Colors.secondaryViolet
            }
          })}
        />
    </Stack.Navigator>
  )
}

export default HomeNavigation
