import { Pressable, StyleSheet, View } from 'react-native'
import CustomText from '../Elements/CustomText'
import Colors from '../../Constants/Colors'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'

const ProjectsNavbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.navbar}>
      <Pressable style={[
          styles.navbarItem, 
          route.name === "Projects" && styles.activeLink,
        ]} 
        onPress={()=>navigation.navigate('Projects')}
      >
        <CustomText
          otherStyles={styles.navbarItemsText}
          textValue={"Proyectos"}
        />
      </Pressable>
      <Pressable style={[
          styles.navbarItem, 
          route.name === "Clients" && styles.activeLink,
        ]} 
        onPress={()=>navigation.navigate('Clients')}
      >
        <CustomText
          otherStyles={styles.navbarItemsText}
          textValue={"Clientes"}
        />
      </Pressable>
      <Pressable style={[
          styles.navbarItem, 
          route.name === "Tasks" && styles.activeLink,
        ]} 
        onPress={()=>navigation.navigate('Tasks')}
      >
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
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15
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
  activeLink:{
    borderBottomWidth: 3,
    borderBottomColor: "#fff"
  }
})