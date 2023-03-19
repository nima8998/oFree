import React from 'react'
import {Projects, NewTask, NewClient, NewProject} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../Constants/Colors';

const Stack = createNativeStackNavigator();


const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Projects" screenOptions={{
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
        name="Projects"
        component={Projects}
        options={{
          headerLeft: () =>(
            <Entypo name="menu" size={24} color="white" />
          ),
          headerRight: () =>(
            <Ionicons name="notifications-sharp" size={24} color="white" />
          )
        }}
      />
      <Stack.Screen 
        name="NewTask"
        component={NewTask}
        options={{
          title: "Nueva tarea"
        }}
      />
      <Stack.Screen 
        name="NewClient"
        component={NewClient}
        options={{
          title: "Nuevo cliente"
        }}
      />
      <Stack.Screen 
        name="NewProject"
        component={NewProject}
        options={{
          title: "Nuevo proyecto"
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeNavigation
