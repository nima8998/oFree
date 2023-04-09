import { StyleSheet, TouchableWithoutFeedback, View, Pressable } from 'react-native'
import { CustomButton, CustomInput } from '../../components'
import React from 'react'
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp, login } from '../../Store/Actions/auth.action';
import { Input } from 'native-base';
import { Feather } from '@expo/vector-icons';

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

const Login = () => {
  const dispatch = useDispatch();
  const [show, setShow] = React.useState(false);

  const [formState, dispatchFormState] = React.useReducer(formReducer, {
    inputValues: {
      user: "",
      password: "",
    },
    inputValidities: {
      user: false,
      password: false,
    }
  })

  const handleInputChange = React.useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  const handleSignUp = () => {
    if (formState.inputValues.user === '' && formState.inputValues.password === '') return
    dispatch(signUp(formState.inputValues.user, formState.inputValues.password))
  }

  const handleLogin = () => {
    if (formState.inputValues.user === '' && formState.inputValues.password === '') return
    dispatch(login(formState.inputValues.user, formState.inputValues.password))
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomInput
          otherStyles={styles.inputs}
          placeholder={"Email"}
          onInputChange={handleInputChange}
          id='user'
          initialValue={formState.inputValues.user}
          initiallyValid={formState.inputValidities.user}
        />
        <View style={styles.inputGroup}>
          <CustomInput
            otherStyles={styles.inputs}
            placeholder={"Contraseña"}
            onInputChange={handleInputChange}
            id='password'
            initialValue={formState.inputValues.password}
            initiallyValid={formState.inputValidities.password}
            type={!show && 'password'}
            inputRightIcon={
              <Pressable onPress={() => setShow(!show)}>
                <Feather name={show ? "eye" : "eye-off"} size={22} color="black" />
              </Pressable>
            }
          />
        </View>
        <View style={styles.containerFooter}>
          <CustomButton text={'INGRESAR'} type='primary' onPress={handleLogin} />
          <CustomButton text={'REGISTRARSE'} type='secondary' onPress={handleSignUp} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFooter: {
    marginTop: 25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs: {
    marginVertical: 10,
    width: "65%"
  },
  inputGroup:{
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})