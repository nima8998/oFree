import { StyleSheet, View } from 'react-native'
import CustomText from '../../components/Elements/CustomText'
import React from 'react'

const NewClient = () => {
  return (
    <View style={styles.container}>
      <CustomText textValue={"Clients view"}/>
    </View>
  )
}

export default NewClient

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 20,
        flex: 1,
    }
  })