import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomInput = ({
    placeholder,
    value,
    action,
    otherStyles
}) => {
  return (
    <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => action(text)}
        style={[styles.input, otherStyles]}
    />
  )
}

export default CustomInput

const styles = StyleSheet.create({
    input:{
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        fontSize: 14,
    }
})