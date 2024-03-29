import { StyleSheet, View, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButton, CustomInput, CustomDropdown, CustomTextarea } from '../../components'
import CustomText from '../../components/Elements/CustomText';
import Colors from '../../Constants/Colors';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { getClients } from '../../Store/Actions/clients.action';
import { useCommonContext } from '../../Context/CommonContextProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getProjects } from '../../Store/Actions/projects.action';
import { useNavigation } from '@react-navigation/native';
import { deleteTaskById, updateTaskById } from '../../Store/Actions/tasks.action';

const formReducer = (state, action) => {
  if (action.type === "FORM_INPUT_UPDATE") {
    const inputValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const inputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let formIsValid = true;
    for (const key in inputValidities) {
      formIsValid = formIsValid && inputValidities[key];
    }
    return {
      formIsValid,
      inputValidities,
      inputValues
    }
  }
  return state;
}

const EditTask = ({task}) => {
  const { setIsModalVisible, setResultData } = useCommonContext();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const clientsList = useSelector(({ clients }) => clients.list);
  const projectsList = useSelector(({ projects }) => projects.list);
  const {userId} = useSelector(({auth})=>auth);
  
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [date, setDate] = React.useState();
  const [isDisabledBtn, setIsDisabledBtn] = React.useState();
  
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [formState, dispatchFormState] = React.useReducer(formReducer, {
    inputValues: {
      taskName: task.taskName,
      // taskClient: task.taskClient,
      taskDescription: task.taskDescription,
      taskProject: task.taskProject,
      taskDone: task.taskDone,
    },
    inputValidities: {
      taskName: false,
      // taskClient: false,
      taskDescription: false,
      taskProject: false,
      taskDone: false,
    }
  })

  const handleDate = (event) =>{
    const selectedTimestamp = event.nativeEvent.timestamp
    setShowDatePicker(false);
    setDate(new Date(selectedTimestamp));
  }

  const handleInputChange = React.useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: "FORM_INPUT_UPDATE",
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])


  React.useEffect(() => {
    dispatch(getClients(userId))
    dispatch(getProjects(userId))
    setDate(new Date(task.taskDate))
  }, [])

  React.useEffect(()=>{
    if(formState.inputValues.taskName === '')
      setIsDisabledBtn(true);
    else
      setIsDisabledBtn(false);
  },[formState.inputValues.taskName])

  const addTask = () => {
    const taskUpdated = {
      taskName: formState.inputValues.taskName,
      // taskClient: formState.inputValues.taskClient,
      taskDate: date.toLocaleDateString(),
      taskDescription: formState.inputValues.taskDescription,
      taskProject: formState.inputValues.taskProject,
      taskDone: formState.inputValues.taskDone,
    }

    dispatch(updateTaskById(taskUpdated, task.id))
      .then((res) => {
        setResultData(res.message)
        setIsModalVisible(true);
      })
      .catch((error) => {
        setResultData(error.message)
        setIsModalVisible(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsModalVisible(false);
          navigation.goBack();
        }, 1500)
        setIsLoading(false);
      })
    }

    const deleteTask = () => {
      const { id } = task;
  
      dispatch(deleteTaskById(id))
        .then((res) => {
          setResultData(res.message)
          setIsModalVisible(true);
          setTimeout(() => {
            navigation.goBack();
          }, 1500)
        })
        .catch((error) => {
          setResultData(error.message)
          setIsModalVisible(true);
        })
        .finally(() => {
          setTimeout(() => {
            setIsModalVisible(false);
          }, 1500)
          setIsLoading(false);
  
        })
    }
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <View style={styles.body}>

          <CustomInput
            placeholder="Nombre de la tarea *"
            onInputChange={handleInputChange}
            otherStyles={styles.inputs}
            id="taskName"
            initialValue={formState.inputValues.taskName}
            initiallyValid={formState.inputValidities.taskName}
            required={true}
            errorValue="Ingrese el nombre de la tarea."
          />

          {/* <CustomDropdown
            data={clientsList}
            onDropdownChange={handleInputChange}
            placeholder="Seleccionar cliente"
            id="taskClient"
            initialValue={formState.inputValues.taskClient}
            initiallyValid={formState.inputValidities.taskClient}
          /> */}

          <CustomDropdown
            data={projectsList}
            onDropdownChange={handleInputChange}
            placeholder="Seleccionar proyecto"
            id="taskProject"
            initialValue={formState.inputValues.taskProject}
            initiallyValid={formState.inputValidities.taskProject}
          />

        <Pressable style={styles.datepicker} onPress={()=>setShowDatePicker(true)}>
          <CustomText textValue={!date ? "Fecha de entrega" : date.toLocaleDateString()}/>
          <View >
            <MaterialCommunityIcons name="calendar-month-outline" size={20} color="grey" />
          </View>
        </Pressable>

        {
          showDatePicker && <DateTimePicker mode="date" value={!date ? new Date() : date} id="date" onChange={handleDate}/>
        }

        <CustomTextarea
          placeholder="Detalles de la tarea"
          id="taskDescription"
          onTextareaChange={handleInputChange}
          initialValue={formState.inputValues.taskDescription}
          initiallyValid={formState.inputValidities.taskDescription}
        />


        </View>
        <View style={styles.footer}>
          <CustomButton
            onPress={deleteTask}
            text="ELIMINAR"
            disabled={isDisabledBtn}
            type='warning'
          />
          <CustomButton
            onPress={addTask}
            text="GUARDAR"
            disabled={isDisabledBtn}
          />
        </View> 

        {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EditTask

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    width: "100%"
  },
  body: {
    marginVertical: 15,
    width: "100%",
    alignItems: 'center'
  },
  eventType: {
    flexDirection: 'row',
    width: "50%",
    justifyContent: 'space-around',
  },
  inputs: {
    width: "65%",
    textAlign: 'center',
    marginVertical: 10,
  },
  labels: {
    borderBottomWidth: 2,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  activeLabel: {
    color: Colors.primaryBlue,
    borderBottomColor: Colors.primaryBlue
  },
  footer: {
    marginVertical: 50,
    flexDirection: 'row',
  },
  colorPicker: {
    flexDirection: 'row',
    marginVertical: 15,
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
  },
  colorItem: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    borderColor: Colors.secondaryBlue
  },
  datepicker:{
    flexDirection: 'row',
    justifyContent:  'space-around',
    alignItems: 'center',
    padding: 5,
    width: "65%",
    marginTop: 20,
    borderBottomWidth: 1,
    borderColor: '#dadada' 
  },
})