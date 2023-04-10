import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) =>{
  switch(action.type){
    case INPUT_CHANGE:
      return{
        ...state,
        value: action.value,
        isValid: action.isValid
      }
      case INPUT_BLUR:
        return {
          ...state,
          touched: true
        }
    default:
      return state;
  }
}

// keyboardTyp:
//  "email-address"
//  "phone-pad"
//  "numeric"
//  "visible-password"
const CustomInput = ({
  initialValue,
  initiallyValid,
  onInputChange,
  id,
  required,
  email,
  min,
  max,
  minLength,
  label,
  errorText,
  placeholder,
  textContentType,
  type,
  enable = true,
  inputRightIcon = null,
  keyboardType = "defualt",
  ...restProps
}) => {
  const [inputState, inputDispatch] = React.useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid,
    touched: true
  })

  React.useEffect(()=>{
    if(inputState.touched){
      onInputChange(id, inputState.value, inputState.isValid)
    }
  },[inputState, onInputChange])

  const textChangeHandler = text =>{
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;

    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
        isValid = false;
    }
    if (min != null && +text < min) {
        isValid = false;
    }
    if (max != null && +text > max) {
        isValid = false;
    }
    if (minLength != null && text.length < minLength) {
        isValid = false;
    }
    inputDispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  }

  const lostFocusHandler = () => {
    inputDispatch({ type: INPUT_BLUR });
  }

  return (
    <>
      <TextInput
          {...restProps}
          value={inputState.value}
          onChangeText={textChangeHandler}
          onBlur={lostFocusHandler}
          placeholder={placeholder}
          style={[styles.input, restProps.otherStyles, !enable && styles.disabledInpupt]}
          keyboardType={keyboardType}
          secureTextEntry={type === 'password' && true}
          editable={enable}
      />
      <View style={styles.inputIcon}>
        {inputRightIcon}
      </View>
    </>
  )
}

export default CustomInput

const styles = StyleSheet.create({
    input:{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 14,
        textAlign: 'center',
    },
    inputIcon:{
      position: 'absolute'
    },
    disabledInpupt:{
      opacity: .5
    }
})