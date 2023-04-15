import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import CustomDrawerHeader from '../Drawer/CustomDrawerHeader';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props=><CustomDrawerHeader {...props}/>}
    >
      <Drawer.Screen name="Inicio" component={TabNavigation} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation