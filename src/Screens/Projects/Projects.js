import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ButtonActions, List, ProjectsNavbar } from '../../components';
import CustomText from '../../components/Elements/CustomText';
import { useCommonContext } from '../../Context/CommonContextProvider'

const Projects = ({
  navigation
}) => {
  const {projects} = useCommonContext();
  return (
    <View style={styles.container}>
      <ProjectsNavbar navigation={navigation}/>
      <CustomText textValue={"projects view"}/>
      <List data={projects}/>
      <ButtonActions navigation={navigation}/>
    </View>
  )
}

export default Projects

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
    }
})