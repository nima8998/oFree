import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Workday = () => {
  return (
    <View style={styles.container}>
      <Text>Coming soon, no me dan las manos.</Text>
    </View>
  )
}

export default Workday

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})