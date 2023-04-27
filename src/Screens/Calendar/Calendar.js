import { StyleSheet, ScrollView, RefreshControl, View } from 'react-native'
import React from 'react'
import { CustomCalendar, CustomText } from '../../components'
import { useSelector } from 'react-redux'
import Colors from '../../Constants/Colors'
import { getMarkedDots } from '../../Utils/getMarkedDots'
import { useDispatch } from 'react-redux'
import { updateTaskById } from '../../Store/Actions/tasks.action'
import { Checkbox } from 'native-base';
import { useUserContext } from '../../Context/UserContextProvider'
import { useCommonContext } from '../../Context/CommonContextProvider'

const Calendar = () => {
  const dispatch = useDispatch();
  const tasksList = useSelector(({ tasks }) => tasks.list);
  const {refreshData, setRefreshData} = useUserContext();
  const { setIsModalVisible, setResultData } = useCommonContext();
  const [refreshing, setRefreshing] = React.useState(false);
  const [markedDots, setMarkedDots] = React.useState();

  const [tasksFromSelectedDay, setTasksFromSelectedDay] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState();

  // seteo las marcas para el calendario, donde se muestran las tareas pendientes en el dia correspondiente 
  React.useEffect(() => {
    refreshing && setRefreshData(!refreshData)
    const marks = getMarkedDots(tasksList);
    setMarkedDots(marks)
  }, [refreshing, tasksList])

  // formateo la fecha seleccionada, para filtrar entre la lista de tareas y setearlo en un estado, donde se mapea debajo del calendario
  const handleSelectDate = (date) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    const newDateFormat = newDate.toLocaleDateString();

    const tasksFromSelectedDate = tasksList.filter(({ taskDate, taskDone }) => taskDate === newDateFormat && !taskDone);
    setTasksFromSelectedDay(tasksFromSelectedDate);
    setSelectedDate(newDateFormat)
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  })

  const handleTaskStatus = (taskId, value) => {
    const newTaskData = {
      taskDone: value
    }
    dispatch(updateTaskById(newTaskData, taskId))
    .then(data => {
      setResultData(data.message)
      setIsModalVisible(true);
    })
    .catch(error => {
      setResultData(error.message)
      setIsModalVisible(true);
    })
    .finally(() => {
      onRefresh();
      setSelectedDate('');
      setTimeout(() => {
        setIsModalVisible(false);
      }, 1500)
    })
  }

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <CustomCalendar
          markedDates={markedDots}
          handleSelectDate={handleSelectDate}
        />
      </ScrollView>
        {
          tasksFromSelectedDay?.length > 0 && selectedDate !== '' &&
          <View style={styles.containerselectedDate}>
            <View style={styles.containerselectedDateHeader}>
              <CustomText textValue='Tareas' style={styles.containerSelectedDateTitle} />
            </View>
            <ScrollView contentContainerStyle={styles.containerTasks}>
              {
                tasksFromSelectedDay.map(({ taskDescription, id, taskDone }) => (
                  <View style={styles.taskItem} key={id}>
                    <CustomText textValue={taskDescription} />
                    <Checkbox
                      value={taskDone}
                      isChecked={taskDone}
                      color={Colors.primaryBlue}
                      accessibilityLabel="Tasks status"
                      size="sm"
                      onChange={(state) => handleTaskStatus(id, state)}
                    />
                  </View>
                ))
              }
            </ScrollView>
          </View>
        }
    </View>
  )
}

export default Calendar

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 4,
  },
  containerselectedDate: {
    flex: 9,
    marginTop: -10,
  },
  containerselectedDateHeader: {
    marginHorizontal: 25,
    borderBottomColor: Colors.primaryBlue,
    borderBottomWidth: 1
  },
  containerSelectedDateTitle: {
    color: Colors.primaryBlue,
    fontSize: 20
  },
  containerTasks: {
    position:"relative",
    alignItems: 'center',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: "85%"
  }
})