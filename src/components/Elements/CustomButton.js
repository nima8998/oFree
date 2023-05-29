import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import CustomText from './CustomText'

const CustomButton = ({
    text,
    onPress,
    otherStyles,
    textPropsStyle,
    disabled,
    type = "primary"
}) => {
  return (
    <TouchableOpacity 
        activeOpacity={0.8}
        style={[
            styles.baseStyle,
            otherStyles,
            disabled && styles.disabledBtn,
            type === "secondary" && styles.secondaryButton,
            type === "warning" && styles.warningButton,
        ]}
        onPress={!disabled ? onPress : null}
        disabled={disabled}
    >
        <CustomText 
            otherStyles={[
                styles.baseStyleButton, 
                textPropsStyle, 
                type === "secondary" && styles.secondaryText,
                type === "warning" && styles.baseStyleButton,
            ]} 
            textValue={text}/>
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
        color: Colors.primaryBlue
    },
    warningButton:{
        backgroundColor: Colors.primaryViolet,
    },
    baseStyleButton: {
        fontSize: 10,
        fontWeight:  'bold',
        color: "#fff",
        letterSpacing: 1
    },
    secondaryText:{
        color: Colors.primaryBlue,
    },
    disabledBtn:{
        backgroundColor: Colors.secondaryBlue
    }
})