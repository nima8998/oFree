import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function FirstStep() {
  return (
    <View>
      <Text style={styles.fontStyle}>
      ¡Podés configurar los avisos del día para no saltearte comidas ni trabajar de más!
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fontStyle:{
    fontSize: 18,
    textAlign: "center",
    color: "#304FFE",
    paddingHorizontal: 25
  }
})