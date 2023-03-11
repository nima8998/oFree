import { StyleSheet, View } from 'react-native'
import CustomText from '../../components/Elements/CustomText'
import React from 'react'
import { ButtonActions } from '../../components'

const Tasks = ({
  navigation
}) => {
  return (
    <View style={styles.container}>
      <CustomText textValue="Tasks view" />
      <ButtonActions navigation={navigation}/>
    </View>
  )
}

export default Tasks

const styles = StyleSheet.create({
  container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 20,
      flex: 1,
  }
})