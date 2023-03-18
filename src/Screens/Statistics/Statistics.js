import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../../components/Elements/CustomText'
import { ButtonActions } from '../../components'

const Statistics = ({
  navigation
}) => {
  return (
    <View style={styles.container}>
      <CustomText textValue={"Statistics View"}/>
    </View>
  )
}

export default Statistics

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 20,
        flex: 1,
    }
})