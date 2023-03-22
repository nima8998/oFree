import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { CustomButton, CustomInput, CustomTextarea, ModalMessage, CustomDropdown } from '../../components'
import React from 'react'
import { useSelector } from 'react-redux';
import { useCommonContext } from '../../Context/CommonContextProvider';
const states = [
  {id: 1, value: "Activo"},
  {id: 2, value: "Inactivo"}
]

const NewClient = () => {
  const clientsList = useSelector(({clientsList})=>clientsList.clientsList);
  const {addNewTask,  setIsModalVisible, isModalVisible} = useCommonContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [reusltData, setReusltData] = React.useState();

  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [clientState, setClientState] = React.useState('');

  const saveNewClient = async () =>{
    setIsLoading(true);
    const clientToSave = {
      clientId: clientsList.length + 1,
      name,
      phone,
      mail,
      clientState,
      description,
    };
    await addNewTask(clientToSave)
      .then((data)=>{
        setReusltData(data);
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1000);
      })
      .catch((error)=>{throw error})
      .finally(setIsLoading(false))
  }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomInput
          placeholder="Name"
          action={(name) => setName(name)}
          otherStyles={styles.inputs}
        />
        
        <CustomInput
          placeholder="Teléfono"
          action={(tel) => setPhone(tel)}
          otherStyles={styles.inputs}
        />
        
        <CustomInput
          placeholder="Mail"
          action={(Mail) => setMail(Mail)}
          otherStyles={styles.inputs}
        />
        
        <CustomDropdown data={states} value={clientState} action={setClientState} placeholder="Estado"/>
        
        <CustomTextarea 
          placeholder="Detalles del cliente"
          action={(desc)=>setDescription(desc)}
        />

        <CustomButton type='primary' text="GUARDAR" onPress={saveNewClient}/>
        {isModalVisible && <ModalMessage data={reusltData}/>}
        {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue}/>}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default NewClient

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 20,
        flex: 1,
    },
    inputs: {
      width: "65%",
      textAlign: 'center',
      marginVertical: 10,
    },
  })