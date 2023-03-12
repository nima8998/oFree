import { StyleSheet, View, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../Elements/CustomText'
import {useCommonContext} from '../../Context/CommonContextProvider'


const Navbar = () => {
  const {isTutorialActive} = useCommonContext();

  return (
    <SafeAreaView style={[styles.container, {display: isTutorialActive ? "none" : 'flex'}]}>
      <View style={styles.nav}>
        <Entypo name="menu" size={25} color="white" />
        <CustomText textValue={"ofree"} fontType={"semibold"} otherStyles={{color: "#fff", fontSize: 25}} />
        <Ionicons name="notifications" size={20} color="white" />
      </View>
      {/* <View style={styles.projectContainer}>
        <CustomText textValue="proyectos" otherStyles={styles.projectOptions} />
        <CustomText textValue="clientes" otherStyles={styles.projectOptions} />
        <CustomText textValue="entregas" otherStyles={styles.projectOptions} />
      </View> */}
    </SafeAreaView>
  )
}

export default Navbar

const styles = StyleSheet.create({
    container:{
        height: 100,
        width: '100%',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.primaryBlue,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomEndRadius: 12,
        borderBottomStartRadius: 12,
        paddingHorizontal: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        
        elevation: 12,
    },
    nav:{
      flexDirection: "row", 
      justifyContent: 'space-between', 
      width: "100%"
    },
    projectContainer:{
      flexDirection:  'row',
      justifyContent: 'space-around',
      width: "100%"
    },
    projectOptions:{
      color: "#fff",
      textTransform: "uppercase",
      fontSize: 11,
      padding: 5
    }
})