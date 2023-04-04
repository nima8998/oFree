import React from 'react'
import { Projects, NewTask, NewClient, NewProject, Clients, Tasks, EditProjectContainer, EditClientContainer, EditTaskContainer } from '../../Screens'
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
      headerStyle: {
        backgroundColor: Colors.primaryBlue
      }
    }}>

      {/* PROJECTS */}
      <Stack.Screen
        name="Projects"
        component={Projects}
        options={ScreenOptionsNavbar}
      />
      <Stack.Screen
        name="NewProject"
        component={NewProject}
        options={{
          title: "Nuevo proyecto",
          headerStyle: {
            backgroundColor: Colors.secondaryViolet
          }
        }}
      />
      <Stack.Screen
        name="EditProjectContainer"
        component={EditProjectContainer}
        options={({ route }) => ({
          title: `Editar: ${route.params.name}`,
          headerStyle: {
            backgroundColor: Colors.secondaryViolet
          }
        })}
      />

      {/* CLIENTS */}
      <Stack.Screen
        name="Clients"
        component={Clients}
        options={ScreenOptionsNavbar}
      />
      <Stack.Screen
        name="NewClient"
        component={NewClient}
        options={{
          title: "Nuevo cliente",
          headerStyle: {
            backgroundColor: Colors.secondaryViolet
          }
        }}
      />
      <Stack.Screen
        name="EditClientContainer"
        component={EditClientContainer}
        options={({ route }) => ({
          title: `Editar: ${route.params.name}`,
          headerStyle: {
            backgroundColor: Colors.secondaryViolet
          }
        })}
      />
      {/* TASKS */}
      <Stack.Screen
        name="Tasks"
        component={Tasks}
        options={ScreenOptionsNavbar}
      />
      <Stack.Screen
        name="NewTask"
        component={NewTask}
        options={{
          title: "Nueva tarea",
          headerStyle: {
            backgroundColor: Colors.secondaryViolet
          }
        }}
      />
      <Stack.Screen
        name="EditTaskContainer"
        component={EditTaskContainer}
        options={({ route }) => ({
          title: `Editar: ${route.params.name}`,
          headerStyle: {
            backgroundColor: Colors.secondaryViolet
          }
        })}
      />
    </Stack.Navigator>
  )
}

export default ProjectsNavigation
