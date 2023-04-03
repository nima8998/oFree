import { StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import ProjectsListItem from './ProjectsListItem'
import CustomText from '../Elements/CustomText'

const ProjectsList = ({
  data,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        {
          data ?
          data.map((item, index)=><ProjectsListItem data={item} key={index}/>) :
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