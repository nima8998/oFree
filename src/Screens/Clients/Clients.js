import React from 'react'
import {  StyleSheet, View } from 'react-native'
import { ButtonActions, ClientsList, ProjectsNavbar,  } from '../../components';

const Clients = () => {
  return (
    <View style={styles.container}>
      <ProjectsNavbar/>
      <ClientsList/>
      <ButtonActions/>
    </View>
  )
}

export default Clients

const styles = StyleSheet.create({
  container: {
        flex: 1,
    }
})