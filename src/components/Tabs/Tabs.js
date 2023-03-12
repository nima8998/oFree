import { Pressable, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'
import { Octicons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import CustomText from '../Elements/CustomText';
import { useCommonContext } from '../../Context/CommonContextProvider';

const Tabs = () => {
  const {isTutorialActive} = useCommonContext();
  
  return (
    <SafeAreaView style={[styles.container, {display: isTutorialActive ? "none" : "flex"}]}>
      <Pressable style={styles.tab} >
        <Octicons name="home" size={20} color="white" />
        <CustomText textValue={"Inicio"} otherStyles={styles.tabText}/>
      </Pressable>
      <Pressable style={styles.tab}>
        <Ionicons name="newspaper-outline" size={20} color="white" />
        <CustomText textValue={"Proyectos"} otherStyles={styles.tabText}/>
      </Pressable>
      <Pressable style={styles.tab}>
        <FontAwesome5 name="calendar-alt" size={20} color="white" />
        <CustomText textValue={"Calendario"} otherStyles={styles.tabText}/>
      </Pressable>
      <Pressable style={styles.tab}>
        <FontAwesome name="line-chart" size={20} color="white" />
        <CustomText textValue={"Estadisticas"} otherStyles={styles.tabText}/>
      </Pressable>
    </SafeAreaView>
  )
}

export default Tabs

const styles = StyleSheet.create({
  container:{
    height: 60,
    backgroundColor: Colors.primaryBlue,
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopEndRadius: 12,
    borderTopStartRadius: 12,
  },
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  tabText:{
    color: "#fff",
    fontSize: 10,
    textTransform: 'uppercase'
  }
})