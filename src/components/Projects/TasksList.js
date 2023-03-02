import { StyleSheet, FlatList, View} from 'react-native'
import React from 'react'
import TaskItem from './TaskItem'
import { useCommonContext } from '../../Context/CommonContextProvider'

const TasksList = () => {

  const {projects} = useCommonContext();

  return (
    <View>
      <FlatList
          data={projects}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => 
            <TaskItem 
              projectInfo={item} 
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