import { StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import TasksListItem from './TasksListItem'
import CustomText from '../Elements/CustomText'
import { updateTaskById } from '../../Store/Actions/tasks.action'
import { useDispatch, useSelector } from 'react-redux';
import { useUserContext } from '../../Context/UserContextProvider'
import { useCommonContext } from '../../Context/CommonContextProvider'
import ModalMessage from '../Modal/ModalMessage'

const TasksList = () => {
  const { refreshData, setRefreshData } = useUserContext();
  const dispatch = useDispatch();
  const tasksList = useSelector(({ tasks }) => tasks.list)
  const [refreshing, setRefreshing] = React.useState(false);
  const { setIsModalVisible, isModalVisible } = useCommonContext();
  const [reusltData, setReusltData] = React.useState();

  const onRefresh = () => {
    setRefreshing(true);
    setRefreshData(!refreshData)
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }

  const handleTaskStatus = (taskId, value) => {
    const newTaskData = {
      taskDone: value
    }
    dispatch(updateTaskById(newTaskData, taskId))
      .then(data => {
        setReusltData(data.message)
        setIsModalVisible(true);
      })
      .catch(error => {
        setReusltData(error.message)
        setIsModalVisible(true);
      })
      .finally(() => {
        onRefresh();
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1500)
      })
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {
        tasksList.length > 0 ?
          tasksList.map((item, index) => <TasksListItem data={item} key={index} handleTaskStatus={handleTaskStatus} />) :
          <CustomText textValue={"No hay tareas creadas"} />
      }
      {isModalVisible && <ModalMessage data={reusltData} />}
    </ScrollView>
  )
}

export default TasksList

const styles = StyleSheet.create({
  container: {
    width: "90%",
    paddingHorizontal: 35,
    paddingTop: 20,
  },
})