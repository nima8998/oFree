import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Calendar } from 'react-native-calendars';

function CustomCalendar() {
  return (
      <Calendar
        markingType='multi-dot'
      />
  );
}

export default CustomCalendar;
