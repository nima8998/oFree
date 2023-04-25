import React from 'react'
import { Calendar } from 'react-native-calendars';

function CustomCalendar(
  {
    handleSelectDate,
    ...markedDots
  }
) {
  return (
    <Calendar
      markingType='multi-dot'
      markedDates={markedDots['markedDates']}
      onDayPress={({dateString})=>handleSelectDate(dateString)}
    />
  );
}

export default CustomCalendar;
