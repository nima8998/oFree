import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { CustomButton, CustomInput, CustomTextarea, CustomDropdown } from '..'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useCommonContext } from '../../Context/CommonContextProvider';
import Colors from '../../Constants/Colors';
import { deleteClientById, updateClient } from '../../Store/Actions/clients.action';
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


  const { setIsModalVisible, setResultData } = useCommonContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = React.useState();

  const handleInputChange = React.useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  React.useEffect(() => {
    if (formState.inputValues.name === '')
      setIsDisabledBtn(true);
    else
      setIsDisabledBtn(false);
  }, [formState.inputValues.name])

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
        }, 1500);
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

  const deleteClient = () => {
    const { id } = client;

    dispatch(deleteClientById(id))
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
        <CustomInput
          placeholder="Nombre del cliente *"
          id="name"
          onInputChange={handleInputChange}
          otherStyles={styles.inputs}
          initialValue={formState.inputValues.name}
          initiallyValid={formState.inputValidities.name}
          required={true}
          errorValue="Ingrese un nombre."
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

        <View style={styles.footer}>
          <CustomButton
            onPress={deleteClient}
            text="ELIMINAR"
            disabled={isDisabledBtn}
            type='warning'
          />
          <CustomButton
            onPress={updateClient}
            text="GUARDAR"
            disabled={isDisabledBtn}
          />
        </View>        
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
  footer: {
    marginVertical: 50,
    flexDirection: 'row',
  },
})