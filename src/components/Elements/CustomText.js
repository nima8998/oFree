import { Text } from 'react-native'
import React from 'react'

const CustomText = ({
    textValue,
    fontType,
    otherStyles,
}) => {

  return (
      <Text 
        style={[{
          fontFamily: 
            fontType === "regular" ?
            "Montserrat-Regular" :
            fontType === "semibold" ?
            "Montserrat-SemiBold" :
            fontType === "medium" ?
            "Montserrat-Medium" :
            "Montserrat-Regular"
        }, otherStyles]}
      >
        {textValue}
      </Text>
  )
}

export default CustomText