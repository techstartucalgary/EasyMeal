import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Calendar, CalendarUtils } from 'react-native-calendars';

const CalendarSection = () => (
  <View style={styles.calendarSectionContainer}>
    <Calendar
      enableSwipeMonths
      markedDates={{
        '2023-04-16': {
          selected: true,
          selectedColor: '#6536F9',
          disableTouchEvent: true,
        },
        '2023-04-17': {
          selected: true,
          selectedColor: '#6536F9',
          disableTouchEvent: true,
        },
      }}
    />
  </View>
);

export default CalendarSection;

const styles = StyleSheet.create({
  calendarSectionContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,

    shadowColor: '#5A6CEA',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    shadowRadius: 13.16,

    elevation: 20,

    flexDirection: 'column',
  },
});
