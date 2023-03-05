import { StyleSheet, Text, SafeAreaView, Platform, StatusBar } from 'react-native';
import React from 'react';
import Colors from '../Constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CustomText from '../Elements/CustomText'

const Navbar = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Entypo name="menu" size={25} color="white" />
      <CustomText textValue={"ofree"} fontType={"semibold"} otherStyles={{color: "#fff", fontSize: 25}} />
      <Ionicons name="notifications" size={20} color="white" />
    </SafeAreaView>
  )
}

export default Navbar

const styles = StyleSheet.create({
    container:{
        height: 90,
        width: '100%',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: Colors.primaryBlue,
        flexDirection: 'row',
        justifyContent: 'space-between',
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
    }
})