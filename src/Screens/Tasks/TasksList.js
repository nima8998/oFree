import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ButtonActions, List, ProjectsNavbar } from '../../components';
import CustomText from '../../components/Elements/CustomText';
import { useCommonContext } from '../../Context/CommonContextProvider'

const TasksList = ({
  navigation
}) => {
  const {projects} = useCommonContext();
  return (
    <View style={styles.container}>
      <ProjectsNavbar navigation={navigation}/>
      <CustomText textValue={"TasksList"}/>
      <List data={projects}/>
      <ButtonActions navigation={navigation}/>
    </View>
  )
}

export default TasksList

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
    }
})