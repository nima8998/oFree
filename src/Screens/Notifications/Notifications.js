import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import NotificationsContainer from '../../components/Notifications/NotificationsContainer'

const Notifications = () => {
  return (
    <View style={styles.container}>
      <NotificationsContainer/>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center'
    }
})