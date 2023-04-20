import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from '../Elements/CustomText'
import Colors from '../../Constants/Colors'

const StatisticsBox = ({
  count,
  title
}) => {
  return (
    <View style={styles.container}>
      <CustomText
        textValue={count}
        otherStyles={styles.countText}
        fontType={'medium'}
      />
      <CustomText
        textValue={title}
        otherStyles={styles.titleText}
        fontType={'medium'}
      />
    </View>
  )
}

export default StatisticsBox

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: "#dadada",
    padding: 15,
    borderRadius: 5,
    width: 130,
    marginHorizontal: 5,

    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 6,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    
    elevation: 3,
  },
  countText:{
    color: Colors.primaryViolet,
    fontSize: 22,
  },
  titleText:{
    textAlign: "justify",
    color: Colors.primaryBlue,
    fontSize: 12,
    marginLeft: 5
  }
})