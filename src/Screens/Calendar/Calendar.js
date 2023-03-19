import { StyleSheet, View } from 'react-native'
import React from 'react'
import CustomText from '../../components/Elements/CustomText'
// import { ButtonActions } from '../../components'

const Calendar = ({
  navigation
}) => {
  return (
    <View style={styles.container}>
      <CustomText textValue={"Calendar View"}/>
      {/* <ButtonActions navigation={navigation} /> */}
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 20,
      flex: 1,
  }
})