import React from 'react'
import {  StyleSheet, View } from 'react-native'
import { ButtonActions, ProjectsList, ProjectsNavbar,  } from '../../components';


const Projects = () => {
  return (
    <View style={styles.container}>
      <ProjectsNavbar/>
      <ProjectsList/>
      <ButtonActions/>
    </View>
  )
}

export default Projects

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})