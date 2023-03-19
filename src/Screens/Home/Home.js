import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import { ButtonActions } from '../../components';
import CustomText from '../../components/Elements/CustomText';

const Home = ({
  navigation
}) => {
  return (
    <View style={styles.container}>
      <CustomText textValue={"Home View"}/>
      {/* <ButtonActions navigation={navigation}/> */}
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 20,
        flex: 1,
    }
})