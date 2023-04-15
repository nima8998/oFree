import { StyleSheet, ScrollView, RefreshControl} from 'react-native'
import React from 'react'
import ProjectsListItem from './ProjectsListItem'
import CustomText from '../Elements/CustomText'
import { useDispatch, useSelector } from 'react-redux';
import {getProjects} from '../../Store/Actions/projects.action';
import onRefresh from '../../Utils/refresh'

const ProjectsList = () => {
  const dispatch = useDispatch();
  const projects = useSelector(({projects})=>projects.list)
  const {userId} = useSelector(({auth})=>auth);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(()=>{
    dispatch(getProjects(userId))
  },[refreshing])

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh(setRefreshing, 500)}/>
      }  
    >
        {
          projects.length > 0 ?
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