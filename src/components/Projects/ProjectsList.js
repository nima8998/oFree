import { StyleSheet, ScrollView, RefreshControl} from 'react-native'
import React from 'react'
import ProjectsListItem from './ProjectsListItem'
import CustomText from '../Elements/CustomText'
import { useDispatch, useSelector } from 'react-redux';
import {getProjects} from '../../Store/Actions/projects.action';

const ProjectsList = () => {
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
        {
          projects ?
          projects.map((item, index)=><ProjectsListItem data={item} key={index}/>) :
          <CustomText textValue={"No hay proyectos creados"}/>
        }
    </ScrollView>
  )
}

export default ProjectsList

const styles = StyleSheet.create({
  container:{
    width: "90%",
    paddingHorizontal: 35,
    paddingTop: 20,
  },
})