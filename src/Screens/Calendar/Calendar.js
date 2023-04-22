import { StyleSheet, ScrollView, RefreshControl, View, Alert } from 'react-native'
import React from 'react'
import { CustomCalendar, CustomText } from '../../components'
import { useSelector } from 'react-redux'
import Colors from '../../Constants/Colors'
import { getMarkedDots } from '../../Utils/getMarkedDots'
import { useDispatch } from 'react-redux'
import { getTasks } from '../../Store/Actions/tasks.action'
import { updateTaskById } from '../../Store/Actions/tasks.action'
import { Checkbox } from 'native-base';

const Calendar = () => {
  const dispatch = useDispatch();
  const tasksList = useSelector(({ tasks }) => tasks.list);
  const { userId } = useSelector(({ auth }) => auth);
  const [refreshing, setRefreshing] = React.useState(false);
  const [markedDots, setMarkedDots] = React.useState();

  const [tasksFromSelectedDay, setTasksFromSelectedDay] = React.useState();
  const [selectedDate, setSelectedDate] = React.useState();

  React.useEffect(() => {
    dispatch(getTasks(userId))
  }, [])


  React.useEffect(() => {
    if (tasksList && refreshing) {
      const marks = getMarkedDots(tasksList);
      setMarkedDots(marks)
    }
  }, [refreshing, tasksList])

  const handleSelectDate = (date) => {
    const newDate = new Date(date);
    newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());
    const newDateFormat = newDate.toLocaleDateString();

    const tasksFromSelectedDate = tasksList.filter(({ taskDate, taskDone }) => taskDate === newDateFormat && !taskDone);
    setTasksFromSelectedDay(tasksFromSelectedDate);
    setSelectedDate(newDateFormat)
    console.log(tasksFromSelectedDate)
  }

  const onRefresh = React.useCallback(()=>{
    dispatch(getTasks(userId))
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
        alert('', data?.message, [
          {
            text: 'OK',
            style: "destructive",
          }
        ])
        if(data?.status) {
          onRefresh();
          setSelectedDate('');
        };
      })
      .catch(err => console.log(err))
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <CustomCalendar
        markedDates={markedDots}
        handleSelectDate={handleSelectDate}
      />
      {
        tasksFromSelectedDay?.length > 0 && selectedDate !== '' &&
        <View style={styles.containerselectedDate}>
          <View style={styles.containerselectedDateHeader}>
            <CustomText textValue='Tareas' style={styles.containerSelectedDateTitle} />
          </View>
          <View style={{}}>
            {
              tasksFromSelectedDay.map(({ taskDescription, id, taskDone }) => (
                <View key={id} style={styles.taskItem}>
                  <CustomText textValue={taskDescription}  />
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

          </View>
        </View>
      }
    </ScrollView>
  )
}

export default Calendar

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerselectedDate: {
    flex: 1,
  },
  containerselectedDateHeader: {
    marginVertical: 15,
    marginHorizontal: 25, 
    borderBottomColor:  Colors.primaryBlue, 
    borderBottomWidth: 1
  },
  containerSelectedDateTitle:{
    color: Colors.primaryBlue,
    fontSize: 20
  },
  taskItem:{
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
    width: "85%"
  }
})