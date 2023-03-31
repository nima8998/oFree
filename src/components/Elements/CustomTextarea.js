import { StyleSheet, TextInput } from 'react-native'
import React from 'react'

const CustomTextarea = ({
    placeholder,
    value,
    action,
    otherStyles,
    defaultValue,
    lines = 4
}) => {
  return (
    <TextInput
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChangeText={(text) => action(text)}
        style={[styles.textarea, otherStyles]}
        multiline={true}
        numberOfLines={lines}
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
    }
})