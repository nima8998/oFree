import React from 'react'
import {  StyleSheet, ScrollView } from 'react-native'
import { ButtonActions, ProjectsList, ProjectsNavbar,  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {getProjects} from '../../Store/Actions/projects.action';

const Projects = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const projects = useSelector(({projects})=>projects.list)

  React.useEffect(()=>{
    dispatch(getProjects())
  },[])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <ProjectsNavbar navigation={navigation}/>
        <ProjectsList data={projects} navigation={navigation}/>
        <ButtonActions navigation={navigation}/>
      </>
    </ScrollView>
  )
}

export default Projects

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})