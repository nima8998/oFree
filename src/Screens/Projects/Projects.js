import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ButtonActions, ProjectsList } from '../../components';
import CustomText from '../../components/Elements/CustomText';
import { useCommonContext } from '../../Context/CommonContextProvider';

const Projects = () => {
  return (
    <View style={styles.container}>
      <ProjectsList/>
      <ButtonActions />
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