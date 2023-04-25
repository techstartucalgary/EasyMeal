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
  ScrollView,
  FlatList,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';

import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Autocomplete from 'react-native-autocomplete-input';

import { useUpdateWeeklyGoals, useWeeklyGoals } from 'services/weeklyGoals';
import { weeklyGoals, goals } from './test-profile';
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
  const [editGoalValue, setEditGoalValue] = useState(goals.cooking);

  // useWeeklyGoals();
  useUpdateWeeklyGoals();

  const [fontsLoaded] = useFonts({
    'Inter-Bold': require('../../assets/fonts/Inter-Bold.ttf'),
    'Inter-SemiBold': require('../../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Medium': require('../../assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
    'Inter-ExtraLight': require('../../assets/fonts/Inter-ExtraLight.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  if (badgesPageVisible) {
    return <DetailedBadges animateFunction={animateFunction} />;
  } else {
    return (
      <SafeAreaView style={styles.profilePageContainer}>
        {editGoalVisible && <View style={styles.backgroundDim} />}
        <View>
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
                  source={require('../../assets/images/emoji-bullseye.png')}
                  style={styles.mediumEmoji}
                />
                <Text style={styles.sectionHeader1}>
                  Currently at <Text style={styles.boldText}>Level 3</Text>
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
              <Text style={styles.sectionText1}>60% complete</Text>
              <Text style={styles.sectionText2}>
                Cook <Text style={styles.sectionText1}>5</Text> times/ week
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
                  { width: '50%', backgroundColor: '#74CF82' },
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
              {weeklyGoals.map((goal) => (
                <View key={goal.title} style={styles.flexColumn}>
                  <Text style={styles.goalText}>{goal.title}</Text>
                  {goal.completed ? (
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
              Complete your goal to reach Level 4!
            </Text>
          </View>
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
                  <Text style={styles.sectionHeader2}>
                    Previous Achievements
                  </Text>
                  <Text style={styles.sectionSubHeader2}>Days cooked</Text>
                </View>
              </View>
            </View>
            <CalendarSection />
          </View>
        </View>

        <Modal
          animationType="slide"
          visible={editGoalVisible}
          transparent
          onRequestClose={() => {
            setEditGoalVisible((prevValue) => !prevValue);
          }}
        >
          <View style={styles.editGoalContainer}>
            <View style={styles.editGoalHeader}>
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color="black"
                style={styles.closeEditGoalButton}
                onPress={() => setEditGoalVisible((prevVal) => !prevVal)}
              />
              <Text style={styles.editGoalHeaderText}>Edit cooking goal</Text>
            </View>

            <View
              style={[
                styles.rowSpaceBetween,
                styles.sectionHorizontalMargin,
                styles.sectionVerticalMargin1,
              ]}
            >
              <Text style={styles.editGoalText}>
                How many times do you want to home cook per week?
              </Text>
              <TextInput
                keyboardType="numeric"
                maxLength={1}
                placeholder="e.g. 7"
                defaultValue={goals.cooking}
                value={editGoalValue}
                onChangeText={(text) => {
                  setEditGoalValue(text.replace(/\D/g, ''));
                }}
                style={styles.sectionTextInput}
              />
            </View>

            <View
              style={[styles.rowSpaceBetween, styles.sectionHorizontalMargin]}
            >
              <Pressable
                onPress={() => {
                  setEditGoalVisible((prevVal) => !prevVal);
                  setEditGoalValue(goals.cooking);
                }}
                style={styles.sectionButtonLight}
              >
                <Text style={styles.sectionButtonLightText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setEditGoalVisible((prevVal) => !prevVal);
                }}
                style={styles.sectionButtonDark}
              >
                <Text style={styles.sectionButtonDarkText}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
};

export default DetailedCookingGoal;

const styles = StyleSheet.create({
  backgroundDim: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: Dimensions.get('screen').height,
    zIndex: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  boldText: {
    fontFamily: 'Inter-Bold',
  },
  closeEditGoalButton: {
    position: 'absolute',
    top: 4,
    left: 40,
  },
  editGoalButton: {
    height: 32,
    width: 32,

    backgroundColor: '#E3E3E3',
    borderRadius: 16,

    alignItems: 'center',
    justifyContent: 'center',
  },
  editGoalContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
  },
  editGoalHeader: {
    marginTop: 24,

    flexDirection: 'row',
    justifyContent: 'center',
  },
  editGoalHeaderText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#353535',
  },
  editGoalText: {
    flex: 1,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#5D6066',
  },
  editGoalTopMargin1: {
    marginTop: 48,
  },
  editGoalTopMargin2: {
    marginTop: 72,
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
  profilePageHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    paddingTop: 16,
    marginLeft: 16,
    marginRight: 16,
  },
  profileSectionContainer: {
    marginTop: 16,
    marginHorizontal: 16,

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
  sectionButtonDark: {
    flex: 1,
    marginLeft: 16,
    height: 56,

    borderRadius: 28,
    backgroundColor: '#6536F9',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionButtonDarkText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  sectionButtonLight: {
    flex: 1,
    height: 56,

    borderRadius: 28,
    backgroundColor: '#EEE5FF',

    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  sectionButtonLightText: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#6536F9',
  },
  sectionHeader1: {
    fontFamily: 'Inter-Medium',
    fontSize: 20,
    color: '#474747',
  },
  sectionHeader2: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
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
  sectionTextInput: {
    flex: 1,
    marginLeft: 36,
    paddingRight: 16,
    height: 32,
    maxWidth: 120,
    width: 120,

    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D0DBEA',
    borderStyle: 'solid',

    textAlign: 'right',
    fontFamily: 'Inter-Medium',
    color: '#3D3D40',
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
  sectionVerticalMargin1: {
    marginTop: 52,
    marginBottom: 80,
  },
  sectionSubHeader1: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#808080',
  },
  sectionSubHeader2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#A7A7A7',
    marginRight: 'auto',
  },
});
