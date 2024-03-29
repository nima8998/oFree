import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator } from 'react-native'
import { CustomButton, CustomInput, CustomTextarea, CustomDropdown } from '../../components'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useCommonContext } from '../../Context/CommonContextProvider';
import Colors from '../../Constants/Colors';
import { createClient } from '../../Store/Actions/clients.action';
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

const NewClient = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {userId} = useSelector(({auth})=>auth)

  const [formState, dispatchFormState] = React.useReducer(formReducer, {
    inputValues: {
      name: "",
      phone: "",
      mail: "",
      description: "",
      clientState: 1
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

  React.useEffect(()=>{
    if(formState.inputValues.name === '')
      setIsDisabledBtn(true);
    else
      setIsDisabledBtn(false);
  },[formState.inputValues.name])

  const saveNewClient = async () => {
    setIsLoading(true);
    const client = {
      name: formState.inputValues.name,
      phone: formState.inputValues.phone,
      mail: formState.inputValues.mail,
      clientState: formState.inputValues.clientState,
      description: formState.inputValues.description,
      userOwner: userId,
    };

    dispatch(createClient(client))
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
        }, 2000)
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
          email={true}
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

        <CustomButton type='primary' text="GUARDAR" onPress={saveNewClient} disabled={isDisabledBtn}/>
        {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue} />}
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