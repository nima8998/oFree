import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({
    text,
    onPress,
    propStyle
}) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.8}
        style={styles.buttonStyle}
        onPress={onPress}
    >
        <Text style={[styles.textStyle, propStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: "#fff",
        paddingHorizontal: 25,
        paddingVertical: 8,
        borderRadius: 3,
        backgroundColor: '#dadada',
        margin: 2,
    },
    textStyle: {
        fontSize: 10,
        fontWeight:  'bold',
    }
})