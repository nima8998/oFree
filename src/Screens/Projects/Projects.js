import React from 'react'
import {  StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { ButtonActions, ProjectsList, ProjectsNavbar,  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import {getProjects} from '../../Store/Actions/projects.action';

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector(({projects})=>projects.list)
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(()=>{
    dispatch(getProjects())
  },[refreshing])

  const onRefresh = React.useCallback(()=>{
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  })

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }  
    >
      <>
        <ProjectsNavbar/>
        <ProjectsList data={projects} />
        <ButtonActions/>
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