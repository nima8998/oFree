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
    Montserrat: require("../../Font/Montserrat-Regular.ttf"),
    MontserratSemiBold: require("../../Font/MontserratSemiBold.ttf"),
    MontserratMedium: require("../../Font/Montserrat-Medium.ttf")
  })

  // if(!loading) return <AppLoading/>
  React.useEffect(()=>{
    if(loading) SplashScreen.hideAsync();
  },[loading])

  return (
      <Text style={[{
        fontFamily: 
          fontType === "regular" ?
          "Monteserrat" :
          fontType === "semibold" ?
          "MontserratSemiBold" :
          fontType === "medium" ?
          "MontserratMedium" :
          "Montserrat"
      }, otherStyles]}>
        {textValue}
      </Text>
  )
}

export default CustomText