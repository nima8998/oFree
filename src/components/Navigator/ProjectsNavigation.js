import React from 'react'
import {Projects, NewTask, NewClient, NewProject, ClientsList, TasksList} from '../../Screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Colors from '../../Constants/Colors';
import ScreenOptionsNavbar from '../../Constants/ScreenOptionsNavbar'

const Stack = createNativeStackNavigator();

const ProjectsNavigation = () => {
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
        options={ScreenOptionsNavbar}
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

      <Stack.Screen 
        name="ClientsList"
        component={ClientsList}
        options={ScreenOptionsNavbar}
      />
      <Stack.Screen 
        name="TasksList"
        component={TasksList}
        options={ScreenOptionsNavbar}
      />
    </Stack.Navigator>
  )
}

export default ProjectsNavigation
