import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const TEXTAREA_CHANGE = "TEXTAREA_CHANGE";
const TEXTAREA_BLUR = "TEXTAREA_BLUR";

const textAreaReducer = (state, action) =>{
  switch(action.type){
    case TEXTAREA_CHANGE:
      return{
        ...state,
        value: action.value,
        isValid: action.isValid
      }
      case TEXTAREA_BLUR:
        return {
          ...state,
          touched: true
        }
    default:
      return state;
  }
}

const CustomTextarea = ({
    placeholder,
    onTextareaChange,
    otherStyles,
    initialValue,
    initiallyValid,
    id,
    required,
    min,
    max,
    minLength,
    ...restProps
}) => {
  const [textareaState, textareaDispatch] = React.useReducer(textAreaReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid,
    touched: false
  })

  React.useEffect(()=>{
    if(textareaState.touched){
      onTextareaChange(id, textareaState.value, textareaState.isValid)
    }
  },[textareaState, onTextareaChange])


  const textChangeHandler = text =>{
    let isValid = true;

    if (required && text.trim().length === 0) {
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
    textareaDispatch({ type: TEXTAREA_CHANGE, value: text, isValid: isValid });
  }

  const lostFocusHandler = () => {
    textareaDispatch({ type: TEXTAREA_BLUR });
  }

  return (
    <TextInput
        {...restProps}
        placeholder={placeholder}
        value={textareaState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        style={[styles.textarea, otherStyles]}
        multiline={true}
    />
  )
}

export default CustomTextarea

const styles = StyleSheet.create({
    textarea:{
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        fontSize: 14,
        textAlign: 'center',
        width: "65%",
        textAlignVertical: "top",
        marginVertical: 10,
        minHeight: 150
    }
})