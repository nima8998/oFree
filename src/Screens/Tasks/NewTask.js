import { StyleSheet, View, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButton, CustomInput, ModalMessage, CustomDropdown, CustomTextarea } from '../../components'
import CustomText from '../../components/Elements/CustomText';
import Colors from '../../Constants/Colors';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { createTask } from '../../Store/Actions/tasks.action';
import { getClients } from '../../Store/Actions/clients.action';
import { useCommonContext } from '../../Context/CommonContextProvider';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getProjects } from '../../Store/Actions/projects.action';
import { useNavigation } from '@react-navigation/native';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
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

const NewTask = () => {
  const { setIsModalVisible, isModalVisible } = useCommonContext();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const clientsList = useSelector(({ clients }) => clients.list);
  const list = useSelector(({ projects }) => projects.list);
  const {userId} = useSelector(({auth})=>auth)
  
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [date, setDate] = React.useState();
  
  const [reusltData, setReusltData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const [formState, dispatchFormState] = React.useReducer(formReducer, {
    inputValues: {
      taskName: "",
      taskClient: "",
      taskDescription: "",
      taskProject: "",
    },
    inputValidities: {
      taskName: false,
      taskClient: false,
      taskDescription: false,
      taskProject: false,
    }
  })

  const handleDate = (event) =>{
    const selectedTimestamp = event.nativeEvent.timestamp
    setShowDatePicker(false);
    setDate(new Date(selectedTimestamp));
  }

  const handleInputChange = React.useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])


  React.useEffect(() => {
    dispatch(getClients())
    dispatch(getProjects())
  }, [])



  const addTask = () => {
    const newTask = {
      taskName: formState.inputValues.taskName,
      taskClient: formState.inputValues.taskClient,
      taskDate: date.toLocaleDateString(),
      taskDescription: formState.inputValues.taskDescription,
      taskProject: formState.inputValues.taskProject,
      taskDone: false,
      userOwner: userId,
    }

    dispatch(createTask(newTask, formState.inputValues.taskProject))
      .then((res) => {
        setReusltData(res.message)
        setIsModalVisible(true);
      })
      .catch((error) => {
        setReusltData(error.message)
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


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <View style={styles.body}>

          <CustomInput
            placeholder="Nombre de la tarea"
            onInputChange={handleInputChange}
            otherStyles={styles.inputs}
            id="taskName"
            initialValue={formState.inputValues.taskName}
            initiallyValid={formState.inputValidities.taskName}
          />

          <CustomDropdown
            data={clientsList}
            onDropdownChange={handleInputChange}
            placeholder="Seleccionar cliente"
            id="taskClient"
            initialValue={formState.inputValues.taskClient}
            initiallyValid={formState.inputValidities.taskClient}
          />

          <CustomDropdown
            data={list}
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
            onPress={addTask}
            text="GUARDAR"
          />
        </View>

        {isModalVisible && <ModalMessage data={reusltData} />}
        {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default NewTask

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
    marginVertical: 25
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