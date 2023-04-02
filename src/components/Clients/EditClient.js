import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { CustomButton, CustomInput, CustomTextarea, ModalMessage, CustomDropdown } from '..'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useCommonContext } from '../../Context/CommonContextProvider';
import Colors from '../../Constants/Colors';
import { updateClient } from '../../Store/Actions/clients.action';
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

const states = [
  { id: "1", name: "Activo" },
  { id: "2", name: "Inactivo" }
]

const EditClient = ({
  client
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [formState, dispatchFormState] = React.useReducer(formReducer, {
    inputValues: {
      name: client.name,
      phone: client.phone,
      mail: client.mail,
      description: client.description,
      clientState: client.clientState
    },
    inputValidities: {
      name: false,
      phone: false,
      mail: false,
      description: false,
      clientState: false,
    }
  })


  const { setIsModalVisible, isModalVisible } = useCommonContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [resultData, setResultData] = React.useState();

  const handleInputChange = React.useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
    })
  }, [dispatchFormState])

  const handleUpdateClient = async () => {
    setIsLoading(true);
    const updatedClient = {
      name: formState.inputValues.name,
      phone: formState.inputValues.phone,
      mail: formState.inputValues.mail,
      clientState: formState.inputValues.clientState,
      description: formState.inputValues.description,
    };
    
    dispatch(updateClient(updatedClient, client.id))
      .then((res) => {
        setResultData(res.message)
        setIsModalVisible(true);
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      })
      .catch((error) => {
        setResultData(error.message)
        setIsModalVisible(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsModalVisible(false);
        }, 2000)
        setIsLoading(false);
      })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomInput
          placeholder="Name"
          id="name"
          onInputChange={handleInputChange}
          otherStyles={styles.inputs}
          initialValue={formState.inputValues.name}
          initiallyValid={formState.inputValidities.name}
        />

        <CustomInput
          placeholder="Teléfono"
          id="phone"
          onInputChange={handleInputChange}
          otherStyles={styles.inputs}
          initialValue={formState.inputValues.phone}
          initiallyValid={formState.inputValidities.phone}
          keyboardType='phone-pad'
        />

        <CustomInput
          placeholder="Mail"
          id="mail"
          onInputChange={handleInputChange}
          otherStyles={styles.inputs}
          initialValue={formState.inputValues.mail}
          initiallyValid={formState.inputValidities.mail}
          keyboardType='email-address'
        />

        <CustomDropdown
          data={states}
          id="clientState"
          onDropdownChange={handleInputChange}
          initialValue={formState.inputValues.clientState}
          initiallyValid={formState.inputValidities.clientState}
          placeholder="Estado"
        />

        <CustomTextarea
          placeholder="Detalles del cliente"
          id="description"
          onTextareaChange={handleInputChange}
          initialValue={formState.inputValues.description}
          initiallyValid={formState.inputValidities.description}
        />

        <CustomButton type='primary' text="GUARDAR" onPress={handleUpdateClient} />
        {isModalVisible && <ModalMessage data={resultData} />}
        {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EditClient

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