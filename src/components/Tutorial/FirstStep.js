import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function FirstStep() {
  return (
    <View>
      <Text style={styles.fontStyle}>
        Con Ofree podés organizar tu semana y repartir en ella todas las tareas de tus proyectos.
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