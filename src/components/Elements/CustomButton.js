import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../Constants/Colors'
import CustomText from './CustomText'

const CustomButton = ({
    text,
    onPress,
    buttonPropsStyle,
    textPropsStyle,
    type = "primary"
}) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.8}
        style={[styles.baseStyle, buttonPropsStyle, type !== "primary" && styles.secondaryButton]}
        onPress={onPress}
    >
        <CustomText otherStyles={[styles.textStyle, textPropsStyle, type !== "primary" && styles.secondaryText]} textValue={text}/>
    </TouchableOpacity>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    baseStyle: {
        backgroundColor: Colors.primaryBlue,
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 3,
        margin: 2
    },
    secondaryButton: {
        backgroundColor: "#fff",
    },
    textStyle: {
        fontSize: 10,
        fontWeight:  'bold',
        color: "#fff",
        letterSpacing: 1
    },
    secondaryText:{
        color: Colors.primaryBlue,
    }
})