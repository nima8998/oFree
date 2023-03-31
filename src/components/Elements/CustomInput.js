import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({
    placeholder,
    value,
    action,
    otherStyles,
    defaultValue,
    required = false,
    keyboardType = 'default'
}) => {
  // keyboardTyp:
  //  "email-address"
  //  "phone-pad"
  //  "numeric"
  return (
    <TextInput
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChangeText={(text) => action(text)}
        style={[styles.input, otherStyles]}
        keyboardType={keyboardType}
    />
  )
}

export default CustomInput

const styles = StyleSheet.create({
    input:{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 14,
        textAlign: 'center',
        width: "65%"
    }
})