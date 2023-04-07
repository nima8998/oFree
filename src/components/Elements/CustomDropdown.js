import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Select } from "native-base";

const DROPDOWN_CHANGE = "DROPDOWN_CHANGE";
const DROPDOWN_CLOSED = "DROPDOWN_CLOSED";

const dropdownReducer = (state, action) =>{
  switch(action.type){
    case DROPDOWN_CHANGE:
      return{
        ...state,
        value: action.value,
        isValid: action.isValid
      }
      case DROPDOWN_CLOSED:
        return {
          ...state,
          closed: true
        }
    default:
      return state;
  }
}


const CustomDropdown = ({
    data,
    initialValue,
    initiallyValid,
    onDropdownChange,
    id,
    required,
    placeholder = "",
}) => {
  const [dropdownState, dropdownDispatch] = React.useReducer(dropdownReducer, {
    value: initialValue ? initialValue : "",
    isValid: initiallyValid,
    closed: false
  })

  React.useEffect(()=>{
    if(dropdownState.closed){
      onDropdownChange(id, dropdownState.value, dropdownState.isValid)
    }
  },[dropdownState, onDropdownChange])

  const dropdownChangeHandler = text =>{
    let isValid = true;
    if (required && text.trim().length === 0) {
      isValid = false;
    }
    dropdownDispatch({ type: DROPDOWN_CHANGE, value: text, isValid: isValid });
  }

  const closedDropdownHandler = () => {
    dropdownDispatch({ type: DROPDOWN_CLOSED });
  }

  return (
    <View style={styles.dropdown}>
      <Select 
        selectedValue={dropdownState.value} 
        minWidth="200" 
        accessibilityLabel={placeholder} 
        placeholder={data.length > 0 ? placeholder : "No hay registros"} 
        onValueChange={dropdownChangeHandler}
        onOpen={closedDropdownHandler}
      >
        {
          data.length > 0 &&
          data.map(({id, name})=>(<Select.Item key={id} label={name} value={name} />))
        }
      </Select>
  </View>
  )
}

export default CustomDropdown

const styles = StyleSheet.create({
  dropdown:{
    marginTop: 20,
  },
  dropdownContent: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 3,
    maxHeight: 150,
    width: "38%",
  },
  dropdownItem: {
    color: '#000',
    fontSize: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 4,
    borderRadius: 3,
  }
})