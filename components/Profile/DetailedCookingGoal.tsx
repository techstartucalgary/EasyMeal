import React, { useState, PropsWithChildren } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import WeeklyProgressHeader from 'components/shared/WeeklyProgressHeader/WeeklyProgressHeader';
import EditWeeklyGoalModal from 'components/shared/EditWeeklyGoalModal/EditWeeklyGoalModal';
import DetailedBadges from './DetailedBadges';
import CalendarSection from './Calendar';

type DetailedCookingGoalProps = PropsWithChildren<{
  animateFunction: (slideLeft: boolean) => void;
  badgesPageVisible: boolean;
}>;

const DetailedCookingGoal: React.FC<DetailedCookingGoalProps> = ({
  animateFunction,
  badgesPageVisible,
}) => {
  const [editGoalVisible, setEditGoalVisible] = useState(false);

  if (badgesPageVisible) {
    return <DetailedBadges animateFunction={animateFunction} />;
  }
  return (
    <SafeAreaView style={styles.profilePageContainer}>
      <View style={styles.pageContainer}>
        {editGoalVisible && <View style={styles.backgroundDim} />}
        <View style={styles.profilePageHeader}>
          <Pressable
            onPress={() => animateFunction(false)}
            style={styles.profileButton}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
            <Text style={styles.profileButtonText}>Profile</Text>
          </Pressable>
          <Text style={styles.headerText}>Your weekly goal</Text>
        </View>
        <WeeklyProgressHeader setEditGoalVisible={setEditGoalVisible} />
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
                source={require('../../assets/images/emoji-medal.png')}
                style={styles.mediumEmoji}
              />
              <View style={styles.flexColumn}>
                <Text style={styles.sectionHeader2}>Previous Achievements</Text>
                <Text style={styles.sectionSubHeader2}>Days cooked</Text>
              </View>
            </View>
          </View>
          <CalendarSection />
        </View>
        <EditWeeklyGoalModal
          editGoalVisible={editGoalVisible}
          setEditGoalVisible={setEditGoalVisible}
        />
      </View>
    </SafeAreaView>
  );
};

export default DetailedCookingGoal;

const styles = StyleSheet.create({
  backgroundDim: {
    position: 'absolute',
    left: 0,
    top: 0,
    maxWidth: Dimensions.get('screen').width,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#33363F',
    lineHeight: 20,
  },
  mediumEmoji: {
    height: 32,
    width: 32,
    marginRight: 12,
  },
  profileButton: {
    position: 'absolute',
    top: 12,
    left: 0,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileButtonText: {
    marginLeft: 0,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#000000',
  },
  profilePageContainer: {
    height: Dimensions.get('screen').height,
    maxWidth: Dimensions.get('screen').width,
    width: Dimensions.get('screen').width,
    backgroundColor: '#F8F8F8',
  },
  pageContainer: { paddingHorizontal: 16 },
  profilePageHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    paddingTop: 16,
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
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeader2: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#474747',
  },
  sectionHorizontalMargin: {
    marginHorizontal: 24,
  },
  sectionTopMargin3: {
    marginTop: 16,
  },
  sectionSubHeader2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A7A7A7',
    marginRight: 'auto',
  },
});
