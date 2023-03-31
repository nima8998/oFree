import { Pressable, StyleSheet, View } from 'react-native'
import CustomText from '../Elements/CustomText'
import Colors from '../../Constants/Colors'
import React from 'react'

const ProjectsNavbar = ({
  navigation
}) => {
  return (
    <View style={styles.navbar}>
      <Pressable style={[styles.navbarItem, {borderBottomStartRadius: 10}]} onPress={()=>navigation.navigate('Projects')}>
        <CustomText
          otherStyles={styles.navbarItemsText}
          textValue={"Proyectos"}
        />
      </Pressable>
      <Pressable style={styles.navbarItem} onPress={()=>navigation.navigate('Clients')}>
        <CustomText
          otherStyles={styles.navbarItemsText}
          textValue={"Clientes"}
        />
      </Pressable>
      <Pressable style={[styles.navbarItem, {borderBottomEndRadius: 10}]} onPress={()=>navigation.navigate('Tasks')}>
        <CustomText
          otherStyles={styles.navbarItemsText}r
          textValue={"Entregas"}
        />
        </Pressable>
    </View>
  )
}

export default ProjectsNavbar

const styles = StyleSheet.create({    
  navbar:{
    flexDirection:  'row',
    justifyContent: 'space-around',
    width: "100%",
    backgroundColor: Colors.primaryBlue,
  },
  navbarItem:{
    flex: 1,
    width: "100%"
  },
  navbarItemsText:{
    color: "#fff",
    textAlign: 'center',
    padding: 10
  },
  firstItem:{
    borderBottomStartRadius: 10,
  },
  lastItem:{
    borderBottomEndRadius: 10,
  }
})