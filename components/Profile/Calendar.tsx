import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Calendar } from 'react-native-calendars';
import { useDailyGoals } from 'services/dailyGoals';

const CalendarSection = () => {
  const { markedDates } = useDailyGoals();

  return (
    <View style={styles.calendarSectionContainer}>
      <Calendar enableSwipeMonths markedDates={markedDates} />
    </View>
  );
};

export default CalendarSection;

const styles = StyleSheet.create({
  calendarSectionContainer: {
    marginTop: 16,
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
