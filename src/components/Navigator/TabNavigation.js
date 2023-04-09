import { StyleSheet, View } from 'react-native';

import React from 'react'
import CustomText from '../Elements/CustomText';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '../../Constants/Colors';
import HomeNavigation from './HomeNavigation';
import ProjectsNavigation from './ProjectsNavigation';
import CalendarNavigation from './CalendarNavigation';
import StatisticsNavigation from './StatisticsNavigation';

 
const Tab = createBottomTabNavigator();

const TabNavigation = () => {

  return (
    <Tab.Navigator initialRouteName='HomeTab' screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.container,
        tabBarHideOnKeyboard: true,
    }}>
      <Tab.Screen name="HomeTab" component={HomeNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tab, styles.firstTab, {backgroundColor: focused && Colors.activeTab}]}>
              <Octicons name="home" size={20} color="white" />
              <CustomText textValue={"Inicio"} otherStyles={styles.tabText} />
            </View>
          )
        }}/>
      <Tab.Screen name="ProjectsTab" component={ProjectsNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tab, {backgroundColor: focused && Colors.activeTab}]}>
              <Ionicons name="newspaper-outline" size={20} color="white" />
              <CustomText textValue={"Proyectos"} otherStyles={styles.tabText}/>
            </View>
          )
        }}/>
      <Tab.Screen name="CalendarTab" component={CalendarNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tab, {backgroundColor: focused && Colors.activeTab}]}>
              <FontAwesome5 name="calendar-alt" size={20} color="white" />
              <CustomText textValue={"Calendario"} otherStyles={styles.tabText}/>
            </View>
          )
        }}/>
      <Tab.Screen name="StatisticsTab" component={StatisticsNavigation}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tab, styles.lastTab, {backgroundColor: focused && Colors.activeTab}]}>
              <FontAwesome name="line-chart" size={20} color="white" />
              <CustomText textValue={"Estadisticas"} otherStyles={styles.tabText}/>
            </View>
          )
        }}/>
    </Tab.Navigator>
  )
}

export default TabNavigation

const styles = StyleSheet.create({
  container:{
    backgroundColor: Colors.primaryBlue,
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
    // flexDirection:  'row',
    // justifyContent: 'center',
  },
  tab: {
    flex: 1,
    width: "100%",
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstTab:{
    borderTopStartRadius: 10,
  },
  lastTab:{
    borderTopEndRadius: 10,
  },
  tabText:{
    color: "#fff",
    fontSize: 10,
    textTransform: 'uppercase',

  }
})