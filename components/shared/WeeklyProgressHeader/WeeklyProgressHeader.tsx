import React, { FC } from 'react';
import { Image, Pressable, Text, View, StyleSheet } from 'react-native';

import { Feather, FontAwesome5 } from '@expo/vector-icons';

import { useWeekRange, useWeeklyGoals } from 'services/weeklyGoals';
import { useProfile } from 'services/Profile';
import { useDailyGoals } from 'services/dailyGoals';
import { WeeklyProgressHeaderProps } from './types';

const WeeklyProgressHeader: FC<WeeklyProgressHeaderProps> = ({
  setEditGoalVisible,
}) => {
  const { weeklyGoal, progress } = useWeeklyGoals();
  const { profile } = useProfile();
  const { dailyGoal } = useDailyGoals();
  const { weekDaysArray } = useWeekRange();

  return (
    <View style={styles.profileSectionContainer}>
      <View
        style={[
          styles.rowSpaceBetween,
          styles.sectionHorizontalMargin,
          styles.sectionTopMargin3,
        ]}
      >
        <View style={styles.flexRow}>
          <Image
            source={require('../../../assets/images/emoji-bullseye.png')}
            style={styles.mediumEmoji}
          />
          <Text style={styles.sectionHeader1}>
            Currently at{' '}
            <Text style={styles.boldText}>Level {profile?.level || 0}</Text>
          </Text>
        </View>
        <Pressable
          onPress={() => setEditGoalVisible((prevValue) => !prevValue)}
          style={styles.editGoalButton}
        >
          <FontAwesome5 name="pen" size={14} color="black" />
        </Pressable>
      </View>
      <View
        style={[
          styles.rowSpaceBetween,
          styles.sectionHorizontalMargin,
          styles.sectionTopMargin2,
        ]}
      >
        <Text style={styles.sectionText1}>{progress}% complete</Text>
        <Text style={styles.sectionText2}>
          Cook <Text style={styles.sectionText1}>{weeklyGoal?.goal}</Text>{' '}
          times/ week
        </Text>
      </View>
      <View
        style={[
          styles.progressBar,
          styles.sectionHorizontalMargin,
          styles.sectionTopMargin4,
        ]}
      >
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress > 100 ? 100 : progress}%`,
              backgroundColor: '#74CF82',
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.rowSpaceBetween,
          styles.sectionHorizontalMargin,
          styles.sectionTopMargin1,
        ]}
      >
        {weekDaysArray.map((goal) => (
          <View key={goal.title} style={styles.flexColumn}>
            <Text style={styles.goalText}>{goal.title}</Text>
            {dailyGoal && dailyGoal[goal.value]?.completed ? (
              <View style={styles.goalCompleted}>
                <Feather name="check" size={20} color="#FFFFFF" />
              </View>
            ) : (
              <View style={styles.goalNotCompleted}>
                <Feather name="plus" size={20} color="#757678" />
              </View>
            )}
          </View>
        ))}
      </View>

      <Text
        style={[
          styles.sectionSubHeader1,
          styles.sectionHorizontalMargin,
          styles.sectionTopMargin2,
          styles.sectionBottomMargin1,
        ]}
      >
        Complete your goal to reach Level {(profile?.level || 0) + 1}!
      </Text>
    </View>
  );
};

export default WeeklyProgressHeader;

const styles = StyleSheet.create({
  boldText: {
    fontFamily: 'Inter-Bold',
  },
  editGoalButton: {
    height: 32,
    width: 32,

    backgroundColor: '#E3E3E3',
    borderRadius: 16,

    alignItems: 'center',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  goalCompleted: {
    height: 32,
    width: 32,
    marginTop: 2,

    backgroundColor: '#74CF82',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  goalNotCompleted: {
    height: 32,
    width: 32,
    marginTop: 2,

    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,

    alignItems: 'center',
    justifyContent: 'center',
  },
  goalText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
    color: '#6D6D6D',
  },
  mediumEmoji: {
    height: 32,
    width: 32,
    marginRight: 12,
  },
  profileSectionContainer: {
    marginTop: 16,
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
  progressBar: {
    height: 8,

    backgroundColor: '#D9D9D9',
    borderRadius: 4,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionBottomMargin1: {
    marginBottom: 20,
  },
  sectionHeader1: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#474747',
  },
  sectionHorizontalMargin: {
    marginHorizontal: 24,
  },
  sectionText1: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#000000',
  },
  sectionText2: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#000000',
  },
  sectionTopMargin1: {
    marginTop: 28,
  },
  sectionTopMargin2: {
    marginTop: 20,
  },
  sectionTopMargin3: {
    marginTop: 16,
  },
  sectionTopMargin4: {
    marginTop: 4,
  },
  sectionSubHeader1: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#808080',
  },
});
