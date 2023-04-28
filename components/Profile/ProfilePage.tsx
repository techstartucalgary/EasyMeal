import React, { useState, useRef } from 'react';
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
  Modal,
  Dimensions,
  TextInput,
  Animated,
  Easing,
} from 'react-native';

import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
  MaterialIcons,
} from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';
import { useNavigation } from '@react-navigation/native';
import { useDailyGoals, useUpdateDailyGoals } from 'services/dailyGoals';
import { useWeeklyGoals } from 'services/weeklyGoals';
import { useProfile } from 'services/Profile';
import DetailedCookingGoal from './DetailedCookingGoal';
import Settings from './Settings';

import { goals } from './test-profile';

const ProfilePage = () => {
  const [notificationsAvailable, setNotificationsAvailable] = useState(true);
  const slidePosition = useRef(new Animated.Value(0)).current;
  const [badgesVisible, setBadgesVisible] = useState(true);
  const navigation = useNavigation();

  const [editDietVisible, setEditDietVisible] = useState(false);
  const [editCaloricGoal, setEditCaloricGoal] = useState(goals.caloric);
  const [editCarbGoal, setEditCarbGoal] = useState(goals.carb);
  const [editProteinGoal, setEditProteinGoal] = useState(goals.protein);
  const [editFatGoal, setEditFatGoal] = useState(goals.fat);

  const [editCarbGrams, setEditCarbGrams] = useState(0);
  const [editProteinGrams, setEditProteinGrams] = useState(0);
  const [editFatGrams, setEditFatGrams] = useState(0);

  const { weeklyGoal, progress } = useWeeklyGoals();

  const {
    dailyGoal,
    isLoading: getDailyIsLoading,
    // getDailyGoals,
    date,
    caloriesProgress,
    proteinProgress,
    carbsProgress,
    fatProgress,
  } = useDailyGoals();
  const { updateDailyGoal, isLoading: setDailyIsLoading } =
    useUpdateDailyGoals();
  const { profile, isLoading: profileIsLoading, getProfile } = useProfile();

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

  const slideProfilePage = (slideLeft: boolean) => {
    if (slideLeft) {
      Animated.timing(slidePosition, {
        toValue: -1 * Dimensions.get('window').width,
        easing: Easing.cubic,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slidePosition, {
        toValue: 0,
        easing: Easing.cubic,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  const updateEditMacroGrams = (
    type: string,
    updatedGoals: {
      caloric: string;
      carbs: string;
      protein: string;
      fat: string;
    },
  ) => {
    if (type === 'carbs' || type === 'all') {
      setEditCarbGrams(
        Math.floor(
          ((parseInt(updatedGoals.carbs.slice(0, -1), 10) / 100.0) *
            parseInt(updatedGoals.caloric, 10)) /
            4,
        ),
      );
    }
    if (type === 'protein' || type === 'all') {
      setEditProteinGrams(
        Math.floor(
          ((parseInt(updatedGoals.protein.slice(0, -1), 10) / 100.0) *
            parseInt(updatedGoals.caloric, 10)) /
            4,
        ),
      );
    }
    if (type === 'fat' || type === 'all') {
      setEditFatGrams(
        Math.floor(
          ((parseInt(updatedGoals.fat.slice(0, -1), 10) / 100.0) *
            parseInt(updatedGoals.caloric, 10)) /
            9,
        ),
      );
    }
  };

  const updateEditDiet = () => {
    if (dailyGoal) {
      const prevCaloric = dailyGoal[date].calories.goal;
      const prevCarb = Math.floor(
        ((dailyGoal[date].carbs.goal * 4) / prevCaloric) * 100,
      );
      const prevProtein = Math.floor(
        ((dailyGoal[date].protein.goal * 4) / prevCaloric) * 100,
      );
      const prevFat = Math.floor(
        ((dailyGoal[date].fat.goal * 9) / prevCaloric) * 100,
      );

      setEditCaloricGoal(`${prevCaloric}`);
      setEditCarbGoal(`${prevCarb}%`);
      setEditProteinGoal(`${prevProtein}%`);
      setEditFatGoal(`${prevFat}%`);

      updateEditMacroGrams('all', {
        caloric: `${prevCaloric}`,
        carbs: `${prevCarb}%`,
        protein: `${prevProtein}%`,
        fat: `${prevFat}%`,
      });
    }
  };

  const saveDietChanges = async () => {
    let carbPercentage = 0;

    if (editCarbGoal.length >= 0 && editCarbGoal.slice(-1) === '%') {
      carbPercentage = parseInt(editCarbGoal.slice(0, -1), 10);
    } else if (editCarbGoal.length >= 0) {
      carbPercentage = parseInt(editCarbGoal, 10);
    }

    let proteinPercentage = 0;

    if (editProteinGoal.length >= 0 && editProteinGoal.slice(-1) === '%') {
      proteinPercentage = parseInt(editProteinGoal.slice(0, -1), 10);
    } else if (editProteinGoal.length >= 0) {
      proteinPercentage = parseInt(editProteinGoal, 10);
    }

    let fatPercentage = 0;

    if (editFatGoal.length >= 0 && editFatGoal.slice(-1) === '%') {
      fatPercentage = parseInt(editFatGoal.slice(0, -1), 10);
    } else if (editFatGoal.length >= 0) {
      fatPercentage = parseInt(editFatGoal, 10);
    }

    if (carbPercentage + proteinPercentage + fatPercentage !== 100) {
      return;
    }

    let newCaloricGoal = '0';

    if (editCaloricGoal.length > 0) {
      newCaloricGoal = editCaloricGoal;
    } else {
      setEditCaloricGoal(newCaloricGoal);
    }

    /*
    const newDiet = dailyGoal;

    newDiet.calories.goal = editCaloricGoal;
    newDiet.carbs.goal =
      ((carbPercentage / 100.0) * parseInt(editCaloricGoal, 10)) / 4;
    newDiet.protein.goal =
      ((proteinPercentage / 100.0) * parseInt(editCaloricGoal, 10)) / 4;
    newDiet.fat.goal =
      ((fatPercentage / 100.0) * parseInt(editCaloricGoal, 10)) / 9;
    */

    if (dailyGoal) {
      await updateDailyGoal({
        ...dailyGoal,
        [date]: {
          ...dailyGoal[date],
          calories: {
            ...dailyGoal[date].calories,
            goal: parseInt(newCaloricGoal, 10),
          },
          carbs: {
            ...dailyGoal[date].carbs,
            goal: Math.floor(
              ((carbPercentage / 100.0) * parseInt(newCaloricGoal, 10)) / 4,
            ),
          },
          fat: {
            ...dailyGoal[date].fat,
            goal: Math.floor(
              ((fatPercentage / 100.0) * parseInt(newCaloricGoal, 10)) / 9,
            ),
          },
          protein: {
            ...dailyGoal[date].protein,
            goal: Math.floor(
              ((proteinPercentage / 100.0) * parseInt(newCaloricGoal, 10)) / 4,
            ),
          },
        },
      });
    }

    // await getDailyGoals();

    updateEditDiet();
  };

  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: [{ translateX: slidePosition }],
      }}
    >
      <SafeAreaView style={styles.profilePageContainer}>
        {editDietVisible && <View style={styles.backgroundDim} />}
        <View style={styles.profilePageHeader}>
          <Text style={styles.header1Text}>Profile</Text>
          <View style={[styles.flexRow, styles.alignCenter]}>
            <Pressable
              onPress={() => setNotificationsAvailable(!notificationsAvailable)}
              style={styles.circleButtonL}
            >
              <MaterialCommunityIcons
                name={
                  notificationsAvailable ? 'bell-badge-outline' : 'bell-outline'
                }
                size={20}
                color="#273B4A"
              />
            </Pressable>
            <Pressable
              style={styles.circleButtonL}
              onPress={() => {
                navigation.navigate('Settings' as never);
              }}
            >
              <Ionicons name="settings-sharp" size={20} color="#273B4A" />
            </Pressable>
          </View>
        </View>
        <View
          style={[
            styles.profileSectionContainer,
            styles.flexRow,
            styles.alignCenter,
          ]}
        >
          <Image
            source={require('../../assets/images/emoji-sparkles.png')}
            style={styles.savingsImage}
          />
          <Text style={styles.savingsText}>
            You <Text style={styles.boldText}>saved $215</Text> this month by
            cooking at home!
          </Text>
        </View>
        <Text style={styles.header2Text}>Your Progress</Text>

        <ScrollView horizontal={false} style={styles.progressScrollContainer}>
          <View
            style={[
              styles.profileSectionContainer,
              styles.profileSectionPadding,
              styles.sectionTopMargin1,
            ]}
          >
            <View style={styles.featuredBadgeContainer}>
              <View style={styles.featuredBadgeProgressCircle}>
                <CircularProgressBase
                  value={40}
                  radius={38}
                  activeStrokeColor="#6536F9"
                  inActiveStrokeColor="#E0E0E0"
                  activeStrokeWidth={4}
                  inActiveStrokeWidth={4}
                >
                  <Image
                    source={require('../../assets/temp-images/testbadge03.png')}
                    resizeMode="center"
                    style={styles.featuredBadgeImage}
                  />
                </CircularProgressBase>
              </View>

              <View style={[styles.flexColumn, styles.sectionRightMargin3]}>
                <Text
                  style={[
                    styles.sectionHeader1,
                    styles.featuredBadgeTextMargin,
                  ]}
                >
                  Pro in the kitchen
                </Text>
                <Text
                  style={[
                    styles.featuredBadgeProgressText,
                    styles.featuredBadgeTextMargin,
                  ]}
                >
                  Cook 3 more meals to earn this badge!
                </Text>
              </View>
            </View>

            <View style={styles.sectionArrowIcon}>
              <Feather
                name="chevron-right"
                size={20}
                color="#6536F9"
                onPress={() => {
                  setBadgesVisible(true);
                  slideProfilePage(true);
                }}
              />
            </View>
          </View>
          <View
            style={[
              styles.profileSectionContainer,
              styles.profileSectionPadding,
            ]}
          >
            <View style={[styles.flexRow, styles.alignCenter]}>
              <Image
                source={require('../../assets/images/emoji-bullseye.png')}
                style={styles.smallEmoji}
              />
              <Text style={styles.sectionHeader1}>
                Your weekly Goal{' '}
                <Text style={styles.sectionSubHeader1}>
                  (Level {profile?.level || 0})
                </Text>
              </Text>
            </View>
            <View
              style={[
                styles.flexRow,
                styles.alignCenter,
                styles.justifySpaceBetween,
                styles.sectionTopMargin1,
                styles.sectionRightMargin1,
              ]}
            >
              <Text style={styles.sectionHeader2}>{progress}% complete</Text>
              <Text style={styles.sectionHeader3}>
                Cook{' '}
                <Text style={styles.sectionHeader2}>{weeklyGoal?.goal}</Text>{' '}
                times/ week
              </Text>
            </View>

            <View
              style={[
                styles.progressBar,
                styles.sectionTopMargin2,
                styles.sectionRightMargin1,
              ]}
            >
              <View
                style={[
                  styles.progressBarFilled,
                  { backgroundColor: '#74CF82', width: `${progress}%` },
                ]}
              />
            </View>

            <Text style={[styles.sectionSubHeader2, styles.sectionTopMargin1]}>
              Complete your goal to reach Level {(profile?.level || 0) + 1}!
            </Text>
            <View style={styles.sectionArrowIcon}>
              <Feather
                name="chevron-right"
                size={20}
                color="#6536F9"
                onPress={() => {
                  setBadgesVisible(false);
                  slideProfilePage(true);
                }}
              />
            </View>
          </View>

          <View
            style={[
              styles.profileSectionContainer,
              styles.profileSectionPadding,
            ]}
          >
            <View style={[styles.flexRow, styles.justifySpaceBetween]}>
              <Text style={styles.sectionHeader1}>Daily diet goals</Text>
              <Pressable
                onPress={() => {
                  // getDailyGoals();
                  // console.log(dailyGoal);
                  updateEditDiet();
                  setEditDietVisible((prevVal) => !prevVal);
                  // let tmp = dailyGoal;
                  // tmp['calories'].count = 1200;
                  // updateDailyGoal(tmp);

                  // console.log(dailyGoal['calories'].count);
                }}
                style={styles.editDietButton}
              >
                <FontAwesome5 name="pen" size={12} color="black" />
              </Pressable>
            </View>

            <View
              style={[
                styles.flexRow,
                styles.alignCenter,
                styles.sectionTopMargin2,
                styles.sectionRightMargin2,
              ]}
            >
              <Image
                source={require('../../assets/images/emoji-fire.png')}
                style={[styles.smallEmoji]}
              />
              <View style={[styles.flexColumn, styles.flexFill]}>
                <View
                  style={[
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifySpaceBetween,
                    styles.sectionRightMargin2,
                  ]}
                >
                  <Text style={styles.sectionHeader2}>Calories</Text>
                  <View>
                    <Text style={styles.sectionSubHeader3}>
                      {dailyGoal
                        ? Math.floor(dailyGoal[date].calories.count)
                        : 0}{' '}
                      / {dailyGoal ? dailyGoal[date].calories.goal : 0} CAL
                    </Text>
                  </View>
                </View>
                <View style={[styles.progressBar, styles.sectionTopMargin2]}>
                  <View
                    style={[
                      styles.progressBarFilled,
                      {
                        backgroundColor: '#74CF82',
                        width: `${caloriesProgress}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                styles.flexRow,
                styles.alignCenter,
                styles.sectionTopMargin1,
                styles.sectionRightMargin2,
              ]}
            >
              <Image
                source={require('../../assets/images/emoji-poultryleg.png')}
                style={[styles.smallEmoji]}
              />
              <View style={[styles.flexColumn, styles.flexFill]}>
                <View
                  style={[
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifySpaceBetween,
                    styles.sectionRightMargin2,
                  ]}
                >
                  <Text style={styles.sectionHeader2}>Protein</Text>
                  <View>
                    <Text style={styles.sectionSubHeader3}>
                      {dailyGoal
                        ? Math.floor(dailyGoal[date].protein.count)
                        : 0}{' '}
                      / {dailyGoal ? dailyGoal[date].protein.goal : 0} G
                    </Text>
                  </View>
                </View>
                <View style={[styles.progressBar, styles.sectionTopMargin2]}>
                  <View
                    style={[
                      styles.progressBarFilled,
                      {
                        backgroundColor: '#C05CC2',
                        width: `${proteinProgress}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                styles.flexRow,
                styles.alignCenter,
                styles.sectionTopMargin1,
                styles.sectionRightMargin2,
              ]}
            >
              <Image
                source={require('../../assets/images/emoji-bread.png')}
                style={[styles.smallEmoji]}
              />
              <View style={[styles.flexColumn, styles.flexFill]}>
                <View
                  style={[
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifySpaceBetween,
                    styles.sectionRightMargin2,
                  ]}
                >
                  <Text style={styles.sectionHeader2}>Carbs</Text>
                  <View>
                    <Text style={styles.sectionSubHeader3}>
                      {dailyGoal ? Math.floor(dailyGoal[date].carbs.count) : 0}{' '}
                      / {dailyGoal ? dailyGoal[date].carbs.goal : 0} G
                    </Text>
                  </View>
                </View>
                <View style={[styles.progressBar, styles.sectionTopMargin2]}>
                  <View
                    style={[
                      styles.progressBarFilled,
                      {
                        backgroundColor: '#E3B428',
                        width: `${carbsProgress}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>

            <View
              style={[
                styles.flexRow,
                styles.alignCenter,
                styles.sectionTopMargin1,
                styles.sectionRightMargin2,
              ]}
            >
              <Image
                source={require('../../assets/images/emoji-avocado.png')}
                style={[styles.smallEmoji]}
              />
              <View style={[styles.flexColumn, styles.flexFill]}>
                <View
                  style={[
                    styles.flexRow,
                    styles.alignCenter,
                    styles.justifySpaceBetween,
                    styles.sectionRightMargin2,
                  ]}
                >
                  <Text style={styles.sectionHeader2}>Fat</Text>
                  <View>
                    <Text style={styles.sectionSubHeader3}>
                      {dailyGoal ? Math.floor(dailyGoal[date].fat.count) : 0} /{' '}
                      {dailyGoal ? dailyGoal[date].fat.goal : 0} G
                    </Text>
                  </View>
                </View>
                <View style={[styles.progressBar, styles.sectionTopMargin2]}>
                  <View
                    style={[
                      styles.progressBarFilled,
                      { backgroundColor: '#39C3B3', width: `${fatProgress}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          visible={editDietVisible}
          transparent
          onRequestClose={() => {
            setEditDietVisible((prevValue) => !prevValue);
          }}
        >
          <View style={styles.editDietContainer}>
            <View style={styles.editDietHeader}>
              <MaterialIcons
                name="arrow-back-ios"
                size={24}
                color="black"
                style={styles.closeEditDietButton}
                onPress={() => setEditDietVisible((prevVal) => !prevVal)}
              />
              <Text style={styles.editDietHeaderText}>Edit diet goal</Text>
            </View>

            <View
              style={[
                styles.rowSpaceBetween,
                styles.sectionHorizontalMargin,
                styles.editDietTopMargin2,
              ]}
            >
              <Text style={styles.editDietText1}>Caloric Goal</Text>
              <TextInput
                keyboardType="numeric"
                maxLength={6}
                placeholder="e.g. 1500"
                value={editCaloricGoal}
                onChangeText={(text) => {
                  setEditCaloricGoal(() => text.replace(/\D/g, ''));
                  updateEditMacroGrams('all', {
                    caloric: text.replace(/\D/g, ''),
                    carbs: editCarbGoal,
                    protein: editProteinGoal,
                    fat: editFatGoal,
                  });
                }}
                onBlur={() => {
                  if (editCaloricGoal.length <= 0) {
                    setEditCaloricGoal('0');
                  }
                }}
                style={styles.sectionTextInput}
              />
            </View>

            <Text
              style={[
                styles.sectionHorizontalMargin,
                styles.editDietTopMargin3,
                styles.editDietText1,
              ]}
            >
              Macros
            </Text>

            <View
              style={[
                styles.rowSpaceBetween,
                styles.sectionHorizontalMargin,
                styles.editDietTopMargin4,
              ]}
            >
              <Text style={styles.editDietText2}>
                Carbohydrates{' '}
                <Text style={styles.editDietText3}>{editCarbGrams} g</Text>
              </Text>
              <TextInput
                keyboardType="numeric"
                maxLength={3}
                placeholder="e.g. 30%"
                value={editCarbGoal}
                onChangeText={(text) => {
                  setEditCarbGoal(text.replace(/\D/g, ''));
                }}
                onFocus={() => {
                  setEditCarbGoal((prevText) => prevText.slice(0, -1));
                }}
                onBlur={() => {
                  let newVal = '0%';

                  if (editCarbGoal.length <= 0) {
                    setEditCarbGoal(newVal);
                  } else {
                    setEditCarbGoal((prevText) => {
                      newVal = `${prevText}%`;
                      return newVal;
                    });
                  }

                  updateEditMacroGrams('carbs', {
                    caloric: editCaloricGoal,
                    carbs: newVal,
                    protein: editProteinGoal,
                    fat: editFatGoal,
                  });
                }}
                style={styles.sectionTextInput}
              />
            </View>

            <View
              style={[
                styles.rowSpaceBetween,
                styles.sectionHorizontalMargin,
                styles.editDietTopMargin4,
              ]}
            >
              <Text style={styles.editDietText2}>
                Protein{' '}
                <Text style={styles.editDietText3}>{editProteinGrams} g</Text>
              </Text>
              <TextInput
                keyboardType="numeric"
                maxLength={3}
                placeholder="e.g. 30%"
                value={editProteinGoal}
                onChangeText={(text) => {
                  setEditProteinGoal(text.replace(/\D/g, ''));
                }}
                onFocus={() => {
                  setEditProteinGoal((prevText) => prevText.slice(0, -1));
                }}
                onBlur={() => {
                  let newVal = '0%';

                  if (editProteinGoal.length <= 0) {
                    setEditProteinGoal(newVal);
                  } else {
                    setEditProteinGoal((prevText) => {
                      newVal = `${prevText}%`;
                      return newVal;
                    });
                  }

                  updateEditMacroGrams('protein', {
                    caloric: editCaloricGoal,
                    carbs: editCarbGoal,
                    protein: newVal,
                    fat: editFatGoal,
                  });
                }}
                style={styles.sectionTextInput}
              />
            </View>

            <View
              style={[
                styles.rowSpaceBetween,
                styles.sectionHorizontalMargin,
                styles.editDietTopMargin4,
              ]}
            >
              <Text style={styles.editDietText2}>
                Fat <Text style={styles.editDietText3}>{editFatGrams} g</Text>
              </Text>
              <TextInput
                keyboardType="numeric"
                maxLength={3}
                placeholder="e.g. 30%"
                value={editFatGoal}
                onChangeText={(text) => {
                  setEditFatGoal(text.replace(/\D/g, ''));
                }}
                onFocus={() => {
                  setEditFatGoal((prevText) => prevText.slice(0, -1));
                }}
                onBlur={() => {
                  let newVal = '0%';

                  if (editFatGoal.length <= 0) {
                    setEditFatGoal(newVal);
                  } else {
                    setEditFatGoal((prevText) => {
                      newVal = `${prevText}%`;
                      return newVal;
                    });
                  }

                  updateEditMacroGrams('fat', {
                    caloric: editCaloricGoal,
                    carbs: editCarbGoal,
                    protein: editProteinGoal,
                    fat: newVal,
                  });
                }}
                style={styles.sectionTextInput}
              />
            </View>

            <View
              style={[
                styles.rowSpaceBetween,
                styles.sectionHorizontalMargin,
                styles.editDietTopMargin1,
              ]}
            >
              <Pressable
                onPress={() => {
                  setEditDietVisible((prevVal) => !prevVal);
                  updateEditDiet();
                }}
                style={styles.sectionButtonLight}
              >
                <Text style={styles.sectionButtonLightText}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  saveDietChanges();
                  setEditDietVisible((prevVal) => !prevVal);
                }}
                style={styles.sectionButtonDark}
              >
                <Text style={styles.sectionButtonDarkText}>Save Changes</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
      <DetailedCookingGoal
        animateFunction={slideProfilePage}
        badgesPageVisible={badgesVisible}
      />
    </Animated.View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
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
  circleButtonL: {
    marginLeft: 20,
    width: 36,
    height: 36,
    borderRadius: 18,

    backgroundColor: '#E3E3E3',

    alignItems: 'center',
    justifyContent: 'center',
  },
  closeEditDietButton: {
    position: 'absolute',
    top: 4,
    left: 40,
  },
  editDietButton: {
    height: 24,
    width: 24,
    borderRadius: 12,

    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editDietContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 0,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
  },
  editDietHeader: {
    marginTop: 24,

    flexDirection: 'row',
    justifyContent: 'center',
  },
  editDietHeaderText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#353535',
  },
  editDietText1: {
    fontFamily: 'Inter-Bold',
    fontSize: 17,
    color: '#5D6066',
  },
  editDietText2: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#323131',
  },
  editDietText3: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#737373',
  },
  editDietTopMargin1: {
    marginTop: 56,
  },
  editDietTopMargin2: {
    marginTop: 44,
  },
  editDietTopMargin3: {
    marginTop: 36,
  },
  editDietTopMargin4: {
    marginTop: 20,
  },
  featuredBadgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  featuredBadgeImage: {
    height: 48,
    width: 48,
  },
  featuredBadgeProgressCircle: {
    marginRight: 24,
  },
  featuredBadgeProgressText: {
    marginTop: 4,

    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: '#797979',
  },
  featuredBadgeTextMargin: {
    marginRight: 0,

    flexWrap: 'wrap',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexFill: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  header1Text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 28,
    color: '#33363F',
  },
  header2Text: {
    marginLeft: 28,
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#33363F',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  profilePageContainer: {
    maxWidth: Dimensions.get('screen').width,
    width: Dimensions.get('screen').width,
    backgroundColor: '#F8F8F8',
  },
  profilePageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    paddingTop: 12,
    marginBottom: 20,
    marginLeft: 24,
    marginRight: 24,
  },
  profileSectionContainer: {
    marginBottom: 20,
    marginHorizontal: 16,
    borderRadius: 22,

    backgroundColor: '#FFFFFF',

    shadowColor: '#5A6CEA',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.07,
    shadowRadius: 13.16,

    elevation: 20,
  },
  profileSectionPadding: {
    paddingVertical: 20,
    paddingHorizontal: 32,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
  },
  progressBarFilled: {
    height: 8,
    borderRadius: 4,
  },
  progressScrollContainer: {
    flex: 1,
    marginTop: 4,
    marginBottom: 64,
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savingsImage: {
    height: 56,
    width: 56,
    marginLeft: 20,
    marginVertical: 16,
  },
  savingsText: {
    flex: 1,
    flexWrap: 'wrap',
    marginVertical: 0,
    marginHorizontal: 24,

    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#474747',
  },
  sectionArrowIcon: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    color: '#474747',
  },
  sectionHeader2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    color: '#000000',
  },
  sectionHeader3: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#000000',
  },
  sectionHorizontalMargin: {
    marginHorizontal: 24,
  },
  sectionTextInput: {
    flex: 1,
    marginLeft: 20,
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
    marginTop: 12,
  },
  sectionTopMargin2: {
    marginTop: 8,
  },
  sectionRightMargin1: {
    marginRight: 40,
  },
  sectionRightMargin2: {
    marginRight: 8,
  },
  sectionRightMargin3: {
    marginRight: 24,
    flexShrink: 1,
  },
  sectionSubHeader1: {
    fontFamily: 'Inter-SemiBold',
    color: '#717171',
  },
  sectionSubHeader2: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#B3B3B3',
  },
  sectionSubHeader3: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 9,
    color: '#747474',
  },
  smallEmoji: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
});
