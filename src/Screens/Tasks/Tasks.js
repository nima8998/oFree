import React from 'react'
import {  StyleSheet, View } from 'react-native'
import { ButtonActions, ProjectsNavbar, TasksList } from '../../components';


const Tasks = () => {
  return (
    <View style={styles.container}>
      <ProjectsNavbar/>
      <TasksList />
      <ButtonActions/>
    </View>
  )
}

export default Tasks

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})