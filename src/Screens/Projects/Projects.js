import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ButtonActions, ProjectsList } from '../../components';
import CustomText from '../../components/Elements/CustomText';

const Projects = ({
  navigation,
  route
}) => {
  return (
    <View style={styles.container}>
      <CustomText textValue={"Project view"}/>
      <ProjectsList/>
      <ButtonActions navigation={navigation} route={route}/>
    </View>
  )
}

export default Projects

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 20,
        flex: 1,
    }
})