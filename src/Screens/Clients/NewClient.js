import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { CustomButton, CustomInput, CustomTextarea, ModalMessage, CustomDropdown } from '../../components'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useCommonContext } from '../../Context/CommonContextProvider';
import Colors from '../../Constants/Colors';
import { createClient, getClientById } from '../../Store/Actions/clients.action';

const states = [
  {id: 1, value: "Activo"},
  {id: 2, value: "Inactivo"}
]

const NewClient = ({
  route
}) => {
  const dispatch = useDispatch();
  const clientsList = useSelector(({clients})=>clients.list);
  const {setIsModalVisible, isModalVisible} = useCommonContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [reusltData, setReusltData] = React.useState();
  
  // inputs del cliente
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [mail, setMail] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [clientState, setClientState] = React.useState('');
  
  // seteo selectedClient con el selector, si el parametro id me llega por el parametro de la ruta, 
  // seteo al currentClient con el valor del selector. Esto es para evitar que, al agregar un nuevo cliente,
  // me base en el valor y aguardado del store.
  const selectedClient = useSelector(({clients})=>clients.selectedClient);
  const [currentClient, setCurrentClient] = React.useState();
  React.useEffect(()=>{
    if (route.params?.id){
      dispatch(getClientById(route.params.id))
      setCurrentClient(selectedClient)
    }
  },[route.params])


  const saveNewClient = async () =>{
    setIsLoading(true);
    const client = {
      id: clientsList.length + 1,
      name,
      phone,
      mail,
      clientState,
      description,
    };
    
    dispatch(createClient(client))
      .then((res)=>{
        setReusltData(res.message)
        setIsModalVisible(true);
      })
      .catch((error)=>{
        setReusltData(error.message)
        setIsModalVisible(true);
      })
      .finally(()=>{
        setTimeout(()=>{
            setIsModalVisible(false);
        }, 2000)
        setIsLoading(false);
      })
  }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomInput
          placeholder="Name"
          action={(name) => setName(name)}
          otherStyles={styles.inputs}
          value={currentClient?.name}
        />
        
        <CustomInput
          placeholder="Teléfono"
          action={(tel) => setPhone(tel)}
          otherStyles={styles.inputs}
          value={currentClient?.phone}
        />
        
        <CustomInput
          placeholder="Mail"
          action={(Mail) => setMail(Mail)}
          otherStyles={styles.inputs}
          value={currentClient?.mail}
        />
        
        <CustomDropdown data={states} value={!currentClient ? clientState : currentClient.clientState} action={setClientState} placeholder="Estado"/>
        
        <CustomTextarea 
          placeholder="Detalles del cliente"
          action={(desc)=>setDescription(desc)}
          value={currentClient?.description}
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