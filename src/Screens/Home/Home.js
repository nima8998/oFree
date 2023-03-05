import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ButtonActions } from '../../components';
import CustomText from '../../components/Elements/CustomText';

const Home = () => {
  return (
    <View style={styles.container}>
      <CustomText textValue={"Home View"}/>
      <ButtonActions />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 20,
        flex: 1,
    }
})