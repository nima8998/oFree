import { StyleSheet, FlatList, View} from 'react-native'
import React from 'react'
import TaskItem from './TaskItem'

const TasksList = ({
    projects,
    selectCurrentProject
}) => {


  return (
    <View>
      <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => 
            <TaskItem 
              projectInfo={item} 
              selectCurrentProject={selectCurrentProject}
            />
          }
        style={styles.container}
      />

    </View>
  )
}

export default TasksList

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    }
})