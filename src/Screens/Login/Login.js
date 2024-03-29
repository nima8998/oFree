import { StyleSheet, TouchableWithoutFeedback, View, Pressable } from 'react-native'
import { CustomButton, CustomInput } from '../../components'
import React from 'react'
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp, login } from '../../Store/Actions/auth.action';
import { Feather } from '@expo/vector-icons';
import { useUserContext } from '../../Context/UserContextProvider';

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
  const {setLoggedUser} = useUserContext();
  const [isDisabledBtn, setIsDisabledBtn] = React.useState();

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

  React.useEffect(()=>{
    if(formState.inputValues.password === '' || formState.inputValues.user === ''){
      setIsDisabledBtn(true)
    }else{
      setIsDisabledBtn(false)
    }
  },[formState.inputValues.password, formState.inputValues.user])

  const handleInputChange = React.useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  const handleSignUp = () => {
    dispatch(signUp(formState.inputValues.user, formState.inputValues.password))
      .then(_=>{
        setLoggedUser(true)
      })
      .catch(err=>console.log(err))
  }

  const handleLogin = () => {
    dispatch(login(formState.inputValues.user, formState.inputValues.password))
      .then(_=>{
        setLoggedUser(true)
      })
      .catch(err=>console.log(err))
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <CustomInput
          otherStyles={styles.inputs}
          placeholder={"Email *"}
          onInputChange={handleInputChange}
          id='user'
          initialValue={formState.inputValues.user}
          initiallyValid={formState.inputValidities.user}
          email={true}
          required={true}
          errorValue={"Email incorrecto"}
        />
        <View style={styles.inputGroup}>
          <CustomInput
            otherStyles={styles.inputs}
            placeholder={"Contraseña *"}
            onInputChange={handleInputChange}
            id='password'
            initialValue={formState.inputValues.password}
            initiallyValid={formState.inputValidities.password}
            required={true}
            minLength={6}
            errorValue={"Clave invalida, mínimo 6 caracteres"}
            type={!show && 'password'}
            inputRightIcon={
              <Pressable onPress={() => setShow(!show)}>
                <Feather name={show ? "eye" : "eye-off"} size={22} color="black" />
              </Pressable>
            }
          />
        </View>
        <View style={styles.containerFooter}>
          <CustomButton text={'INGRESAR'} type='primary' onPress={handleLogin} disabled={isDisabledBtn}/>
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