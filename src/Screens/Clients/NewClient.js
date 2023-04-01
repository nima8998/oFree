import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { CustomButton, CustomInput, CustomTextarea, ModalMessage, CustomDropdown } from '../../components'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useCommonContext } from '../../Context/CommonContextProvider';
import Colors from '../../Constants/Colors';
import { createClient, getClientById, updateClient } from '../../Store/Actions/clients.action';

const states = [
  {id: "1", name: "Activo"},
  {id: "2", name: "Inactivo"}
]

const NewClient = ({
  route
}) => {
  const dispatch = useDispatch();
  const {setIsModalVisible, isModalVisible} = useCommonContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [reusltData, setReusltData] = React.useState();
  // seteo selectedClient con el selector, si el parametro id me llega por el parametro de la ruta, 
  // seteo al currentClient con el valor del selector. Esto es para evitar que, al agregar un nuevo cliente,
  // me base en el valor y aguardado del store.
  const selectedClient = useSelector(({clients})=>clients.selectedClient);
  const [currentClient, setCurrentClient] = React.useState();
  
  // inputs del cliente
  const [name, setName] = React.useState(currentClient?.name);
  const [phone, setPhone] = React.useState(currentClient?.phone);
  const [mail, setMail] = React.useState(currentClient?.mail);
  const [description, setDescription] = React.useState(currentClient?.description);
  const [clientState, setClientState] = React.useState(currentClient?.clientState);
  

  React.useEffect(()=>{
    if (route.params?.id){
      dispatch(getClientById(route.params.id))
      setCurrentClient(selectedClient)
    }
  },[])


  const saveNewClient = async () =>{
    setIsLoading(true);
    const client = {
      name,
      phone,
      mail,
      clientState,
      description,
    };

    // TODO: Si no hay un currentClient, significa que es un nuevo cliente. De lo contrario, habrá que hacer un update en la db
    !currentClient ?
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
      :
      dispatch(updateClient(currentClient.id, client))
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
          defaultValue={currentClient?.name}
        />
        
        <CustomInput
          placeholder="Teléfono"
          action={(tel) => setPhone(tel)}
          otherStyles={styles.inputs}
          defaultValue={currentClient?.phone}
          keyboardType='phone-pad'
        />
        
        <CustomInput
          placeholder="Mail"
          action={(Mail) => setMail(Mail)}
          otherStyles={styles.inputs}
          defaultValue={currentClient?.mail}
        />
        
        <CustomDropdown 
          data={states} 
          action={setClientState} 
          defaultValue={currentClient?.clientState.toString()}
          placeholder="Estado"
        />
        
        <CustomTextarea 
          placeholder="Detalles del cliente"
          action={(desc)=>setDescription(desc)}
          defaultValue={currentClient?.description}
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