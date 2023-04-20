import { StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-chart-kit'
import Colors from '../../Constants/Colors';
import CustomText from '../Elements/CustomText';

const StatisticsChart = ({
  title
}) => {
  const data = {
    labels: ["D", "L", "M", "X", "J", "V", "S"],
    datasets: [
      {
        data: [5, 8, 6, 7, 8, 5, 4]
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: "#dadada",
    backgroundGradientTo: "#dadada",
    backgroundGradientToOpacity: 0.5,
    color: () => `${Colors.primaryViolet}`,
    labelColor: () => `#8f8f8f`,
    strokeWidth: 2, // optional, default 3
    barPercentage: .5,
    useShadowColorFromDataset: false, // optional
    withInnerLines: false,
    showBarTops: false,
    decimalPlaces: 0,
    barRadius: 3
  };

  return (
    <View style={styles.container}>
      <CustomText textValue={title} otherStyles={styles.title} fontType={'medium'}/>
      <BarChart
        data={data}
        height={170}
        width={Dimensions.get('window').width - 50}
        chartConfig={chartConfig}
        withInnerLines={false}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  )
}

export default StatisticsChart

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dadada",
    borderRadius: 10,
    padding: 5
  },
  title:{
    color: Colors.primaryBlue,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryBlue,
    marginHorizontal: 15,
    marginTop: 5
  }
})