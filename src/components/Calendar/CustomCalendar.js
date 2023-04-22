import React from 'react'
import { Calendar } from 'react-native-calendars';

function CustomCalendar(
  {
    handleSelectDate,
    styles,
    ...markedDots
  }
) {
  return (
    <Calendar
      markingType='multi-dot'
      markedDates={markedDots['markedDates']}
      onDayPress={({dateString})=>handleSelectDate(dateString)}
      style={styles}
    />
  );
}

export default CustomCalendar;
