import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigation from './TabNavigation';
import WorkdayNavigation from './WorkdayNavigation';
import RemindersNavigation from './RemindersNavigation';
import SettingsNavigation from './SettingsNavigation.js';
import AboutNavigation from './AboutNavigation.js';
import CustomDrawerHeader from '../Drawer/CustomDrawerHeader';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props=><CustomDrawerHeader {...props}/>}
    >
      <Drawer.Screen name="Inicio" component={TabNavigation}/>
      <Drawer.Screen name="Mi jornada laboral" component={WorkdayNavigation}/>
      <Drawer.Screen name="Recordatorios" component={RemindersNavigation}/>
      <Drawer.Screen name="Preferencias" component={SettingsNavigation}/>
      <Drawer.Screen name="Acerca de" component={AboutNavigation}/>
    </Drawer.Navigator>
  );
}

export default DrawerNavigation