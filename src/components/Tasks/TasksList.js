import { StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import TasksListItem from './TasksListItem'
import CustomText from '../Elements/CustomText'

const TasksList = ({
  data,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        {
          data ?
          data.map((item, index)=><TasksListItem data={item} key={index}/>) :
          <CustomText textValue={"No hay tareas creadas"}/>
        }
    </ScrollView>
  )
}

export default TasksList

const styles = StyleSheet.create({
  container:{
    width: "90%",
    paddingHorizontal: 35,
    paddingTop: 20,
  },
})