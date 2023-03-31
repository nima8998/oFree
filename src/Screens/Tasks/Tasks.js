import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { ButtonActions, CustomText, ProjectsNavbar } from '../../components';

const Tasks = ({
  navigation
}) => {
  // const {projects} = useCommonContext();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <ProjectsNavbar navigation={navigation}/>
        <CustomText textValue={"Tasks view"}/>
        <ButtonActions navigation={navigation}/>
      </>
    </ScrollView>
  )
}

export default Tasks

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})