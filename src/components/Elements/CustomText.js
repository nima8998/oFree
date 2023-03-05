import { Text } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'

const CustomText = ({
    textValue,
    fontType,
    otherStyles
}) => {
  const [loading] = useFonts({
    "Montserrat-Regular": require("../../Font/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("../../Font/Montserrat-SemiBold.ttf"),
    "Montserrat-Medium": require("../../Font/Montserrat-Medium.ttf")
  })

  React.useEffect(()=>{
    if(loading) SplashScreen.hideAsync();
  },[loading])

  if(!loading) {return null}

  return (
      <Text style={[{
        fontFamily: 
          fontType === "regular" ?
          "Montserrat-Regular" :
          fontType === "semibold" ?
          "Montserrat-SemiBold" :
          fontType === "medium" ?
          "Montserrat-Medium" :
          "Montserrat-Regular"
      }, otherStyles]}>
        {textValue}
      </Text>
  )
}

export default CustomText