import { StyleSheet, ScrollView, View} from 'react-native'
import React from 'react'
import ProjectsListItem from './ProjectsListItem'

const ProjectsList = ({
  data,
  navigation
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        {
          data.map((item, index)=><ProjectsListItem data={item} key={index} navigation={navigation}/>)
        }
    </ScrollView>
  )
}

export default ProjectsList

const styles = StyleSheet.create({
  container:{
    width: "100%",
    paddingHorizontal: 35,
    paddingTop: 20,
  },
})