import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const TaskItem = ({
    projectInfo,
    selectCurrentProject
}) => {
  return (
    <Pressable style={styles.item} onPress={()=>selectCurrentProject(projectInfo)}>
      <Text style={styles.itemText}>
        {projectInfo.name}
      </Text>
    </Pressable>
  )
}

export default TaskItem

const styles = StyleSheet.create({
    item:{
        width: 200,
        backgroundColor: '#dadada',
        borderRadius: 5,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems:  "center",
        padding: 10
    },
    itemText:{
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
    }
})