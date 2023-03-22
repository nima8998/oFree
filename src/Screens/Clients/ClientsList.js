import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ButtonActions, List, ProjectsNavbar } from '../../components';
import CustomText from '../../components/Elements/CustomText';
import { useSelector } from 'react-redux';

const Projects = ({
  navigation
}) => {
  const clientsList = useSelector(({clientsList})=>clientsList.clientsList);
  return (
    <View style={styles.container}>
      <ProjectsNavbar navigation={navigation}/>
      <CustomText textValue={"Clients list view"}/>
      <List data={clientsList}/>
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