import { Keyboard, Pressable, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import CustomText from '../../components/Elements/CustomText'
import React from 'react'
import { CustomButton, CustomInput, CustomTextarea, ModalMessage } from '../../components'
import DateTimePicker from '@react-native-community/datetimepicker';
import { useCommonContext } from '../../Context/CommonContextProvider';
import { Select } from "native-base";
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../components/Constants/Colors';

const clients = [
  {id: "1", name: "Client 1"},
  {id: "2", name: "Client 2"},
  {id: "3", name: "Client 3"},
  {id: "4", name: "Client 4"},
  {id: "5", name: "Client 5"},
]

const Tasks = () => {
  const {addNewTask, tasksList, setIsModalVisible, isModalVisible} = useCommonContext();
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [taskName, setTaskName] = React.useState('');
  const [date, setDate] = React.useState();
  const [client, setClient] = React.useState();
  const [description, setDescription] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [reusltData, setReusltData] = React.useState();

  const handleDate = (event) =>{
    const selectedTimestamp = event.nativeEvent.timestamp
    setShowDatePicker(false);
    setDate(new Date(selectedTimestamp));
  }

  const saveNewTask = async () =>{
    setIsLoading(true);
    const taskToSave = {
      taskID: tasksList.length + 1,
      taskName,
      date,
      clientID: client,
      description
    };
    await addNewTask(taskToSave)
      .then((data)=>{
        setReusltData(data);
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1000);
      })
      .catch((error)=>{throw error})
      .finally(setIsLoading(false))
  }

  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
      <View style={styles.container} >
        <CustomInput 
          placeholder={"Nombre de la tarea"} 
          action={setTaskName}
        />

        <Pressable style={styles.datepicker} onPress={()=>setShowDatePicker(true)}>
          <CustomText textValue={!date ? "Fecha de entrega" : date.toLocaleDateString()}/>
          <View >
            <FontAwesome5 name="calendar-alt" size={24} color="black"/>
          </View>
        </Pressable>

        {
          showDatePicker && <DateTimePicker mode="date" value={!date ? new Date() : date} id="date" onChange={handleDate}/>
        }
        
        <View style={styles.dropdown}>
          <Select selectedValue={client} 
            minWidth="200" 
            accessibilityLabel="Seleccionar cliente" 
            placeholder="Seleccionar cliente" 
            mt={1} 
            onValueChange={itemValue => setClient(itemValue)}
          >
            {
              clients.map(({id, name})=>(<Select.Item key={id} label={name} value={id}/>))
            }
          </Select>
        </View>

        <CustomTextarea 
          placeholder={"Descripción"}
          action={setDescription}
        />

        <CustomButton text={"GUARDAR"} onPress={saveNewTask}/>

        {isModalVisible && <ModalMessage data={reusltData}/>}
        {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue}/>}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Tasks

const styles = StyleSheet.create({
  container: {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      marginTop: 20,
      flex: 1,
  },
  dropdown:{
    marginTop: 20,
  },
  dropdownContent: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 3,
    maxHeight: 150,
    width: "38%",
  },
  dropdownItem: {
    color: '#000',
    fontSize: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 4,
    borderRadius: 3,
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
  }
})