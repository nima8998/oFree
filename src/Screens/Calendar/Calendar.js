import { StyleSheet, ScrollView, RefreshControl, View, Alert } from 'react-native'
import React from 'react'
import { CustomCalendar, CustomText } from '../../components'
import { useSelector } from 'react-redux'
import Colors from '../../Constants/Colors'
import { getMarkedDots } from '../../Utils/getMarkedDots'
import { useDispatch } from 'react-redux'
import { updateTaskById } from '../../Store/Actions/tasks.action'
import { Checkbox } from 'native-base';
import { useUserContext } from '../../Context/UserContextProvider'

const Calendar = () => {
  const dispatch = useDispatch();
  const tasksList = useSelector(({ tasks }) => tasks.list);
  const {refreshData, setRefreshData} = useUserContext();
  const [refreshing, setRefreshing] = React.useState(false);
  const [markedDots, setMarkedDots] = React.useState();

  const [tasksFromSelectedDay, setTasksFromSelectedDay] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState();

  React.useEffect(() => {
    refreshing && setRefreshData(!refreshData)
    const marks = getMarkedDots(tasksList);
    setMarkedDots(marks)
  }, [refreshing, tasksList])

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
      Alert.alert('', 'Tarea actualizada.', [
        {
          text: 'OK',
          style: "destructive",
        }
      ])
    })
    .catch(err => console.log(err))
    onRefresh();
    setSelectedDate('');
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