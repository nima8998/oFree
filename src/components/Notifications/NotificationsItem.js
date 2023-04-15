import { StyleSheet, View } from 'react-native'

import React from 'react'
import CustomText from '../Elements/CustomText'

const NotificationsItem = ({
    data
}) => {
  return (
    <View style={styles.container}>
        <CustomText textValue={data.message}/>
    </View>
  )
}

export default NotificationsItem

const styles = StyleSheet.create({
    container:{
        borderWidth: 1,
        borderColor: "#dadada",
        paddingVertical: 20,
        paddingHorizontal: "10%",
        width: "100%"
    }
})