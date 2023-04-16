import { StyleSheet, Text, ScrollView } from 'react-native'
import React from 'react'
import CustomText from '../../components/Elements/CustomText'

const Settings = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CustomText textValue={'Coming soon, no me dan las manos.'}/>
    </ScrollView>
  )
}

export default Settings

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    }
})