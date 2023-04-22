import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars';

function CustomCalendar(
  markedDots
) {
  return (
    <Calendar
      markingType='multi-dot'
      markedDates={markedDots['markedDates']}
    />
  );
}

export default CustomCalendar;
