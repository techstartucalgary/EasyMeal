import React, { useState, useRef, useEffect } from 'react';
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
  Animated,
  Easing,
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
import { useNavigation } from '@react-navigation/native';
import { useDailyGoals, useUpdateDailyGoals } from 'services/dailyGoals';
import DetailedCookingGoal from './DetailedCookingGoal';
import Settings from './Settings';

import { goals } from './test-profile';

const ProfilePage = () => {
  const [notificationsAvailable, setNotificationsAvailable] = useState(true);
  const slidePosition = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const [editDietVisible, setEditDietVisible] = useState(false);
  const [editCaloricGoal, setEditCaloricGoal] = useState(goals.caloric);
  const [editCarbGoal, setEditCarbGoal] = useState(goals.carb);
  const [editProteinGoal, setEditProteinGoal] = useState(goals.protein);
  const [editFatGoal, setEditFatGoal] = useState(goals.fat);

  const [editCarbGrams, setEditCarbGrams] = useState(0);
  const [editProteinGrams, setEditProteinGrams] = useState(0);
  const [editFatGrams, setEditFatGrams] = useState(0);

  const {
    dailyGoal,
    isLoading: getDailyIsLoading,
    getDailyGoals,
    date,
  } = useDailyGoals();
  const { updateDailyGoal, isLoading: setDailyIsLoading } =
    useUpdateDailyGoals();

  // console.log(dailyGoal);

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

  const updateEditMacroGrams = (type: string) => {
    if (type === 'carbs' || type === 'all') {
      setEditCarbGrams(
        Math.floor(
          ((parseInt(editCarbGoal.slice(0, -1), 10) / 100.0) *
            parseInt(editCaloricGoal, 10)) /
            4,
        ),
      );
    }
    if (type === 'protein' || type === 'all') {
      setEditProteinGrams(
        Math.floor(
          ((parseInt(editProteinGoal.slice(0, -1), 10) / 100.0) *
            parseInt(editCaloricGoal, 10)) /
            4,
        ),
      );
    }
    if (type === 'fat' || type === 'all') {
      setEditFatGrams(
        Math.floor(
          ((parseInt(editFatGoal.slice(0, -1), 10) / 100.0) *
            parseInt(editCaloricGoal, 10)) /
            9,
        ),
      );
    }
  };

  const updateEditDiet = () => {
    const prevCaloric = dailyGoal.calories.goal;
    const prevCarb = Math.floor(
      ((dailyGoal.carbs.goal * 4) / prevCaloric) * 100,
    );
    const prevProtein = Math.floor(
      ((dailyGoal.protein.goal * 4) / prevCaloric) * 100,
    );
    const prevFat = Math.floor(((dailyGoal.fat.goal * 9) / prevCaloric) * 100);

    setEditCaloricGoal(prevCaloric);
    setEditCarbGoal(`${prevCarb}%`);
    setEditProteinGoal(`${prevProtein}%`);
    setEditFatGoal(`${prevFat}%`);

    updateEditMacroGrams('all');
  };

  const saveDietChanges = () => {
    let carbPercentage = 0;

    if (editCarbGoal.length >= 0 && editCarbGoal.slice(-1) === '%') {
      carbPercentage = parseInt(editCarbGoal.slice(0, -1));
    } else if (editCarbGoal.length >= 0) {
      carbPercentage = parseInt(editCarbGoal);
    }

    let proteinPercentage = 0;

    if (editProteinGoal.length >= 0 && editProteinGoal.slice(-1) === '%') {
      proteinPercentage = parseInt(editProteinGoal.slice(0, -1));
    } else if (editProteinGoal.length >= 0) {
      proteinPercentage = parseInt(editProteinGoal);
    }

    let fatPercentage = 0;

    if (editFatGoal.length >= 0 && editFatGoal.slice(-1) === '%') {
      fatPercentage = parseInt(editFatGoal.slice(0, -1));
    } else if (editFatGoal.length >= 0) {
      fatPercentage = parseInt(editFatGoal);
    }

    if (carbPercentage + proteinPercentage + fatPercentage != 100) {
      return;
    }

    if (editCaloricGoal.length <= 0) {
      setEditCaloricGoal('0');
    }

    const newDiet = dailyGoal;

    newDiet.calories.goal = editCaloricGoal;
    newDiet.carbs.goal =
      ((carbPercentage / 100.0) * parseInt(editCaloricGoal, 10)) / 4;
    newDiet.protein.goal =
      ((proteinPercentage / 100.0) * parseInt(editCaloricGoal, 10)) / 4;
    newDiet.fat.goal =
      ((fatPercentage / 100.0) * parseInt(editCaloricGoal, 10)) / 9;

    if (dailyGoal) {
      updateDailyGoal({
        ...dailyGoal,
        [date]: {
          ...dailyGoal[date],
          calories: {
            ...dailyGoal[date].calories,
            goal: 0,
          },
          carbs: {
            ...dailyGoal[date].carbs,
            goal: 0,
          },
          fat: {
            ...dailyGoal[date].fat,
            goal: 0,
          },
          protein: {
            ...dailyGoal[date].protein,
            goal: 0,
          },
        },
      });
    }

    getDailyGoals();

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
        <View
          style={[styles.profileSectionContainer, styles.profileSectionPadding]}
        >
          <View style={[styles.flexRow, styles.alignCenter]}>
            <Image
              source={require('../../assets/images/emoji-bullseye.png')}
              style={styles.smallEmoji}
            />
            <Text style={styles.sectionHeader1}>
              Your weekly Goal{' '}
              <Text style={styles.sectionSubHeader1}>(Level 3)</Text>
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
            <Text style={styles.sectionHeader2}>60% complete</Text>
            <Text style={styles.sectionHeader3}>
              Cook <Text style={styles.sectionHeader2}>5</Text> times/ week
            </Text>
          </View>
          <View style={styles.sectionArrowIcon}>
            <Feather
              name="chevron-right"
              size={20}
              color="#6536F9"
              onPress={() => slideProfilePage(true)}
            />
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
                { backgroundColor: '#74CF82', width: '50%' },
              ]}
            />
          </View>
          <Text style={[styles.sectionSubHeader2, styles.sectionTopMargin1]}>
            Complete your goal to reach Level 4!
          </Text>
        </View>
        <View
          style={[styles.profileSectionContainer, styles.profileSectionPadding]}
        >
          <View style={[styles.flexRow, styles.justifySpaceBetween]}>
            <Text style={styles.sectionHeader1}>Daily diet goals</Text>
            <Pressable
              onPress={() => {
                // getDailyGoals();
                // console.log(dailyGoal);
                // updateEditDiet();
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
                  <Text style={styles.sectionSubHeader3}>1200 / 1500 CAL</Text>
                </View>
              </View>
              <View style={[styles.progressBar, styles.sectionTopMargin2]}>
                <View
                  style={[
                    styles.progressBarFilled,
                    { backgroundColor: '#74CF82', width: '80%' },
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
                  <Text style={styles.sectionSubHeader3}>81 / 125 CAL</Text>
                </View>
              </View>
              <View style={[styles.progressBar, styles.sectionTopMargin2]}>
                <View
                  style={[
                    styles.progressBarFilled,
                    { backgroundColor: '#C05CC2', width: '68%' },
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
                  <Text style={styles.sectionSubHeader3}>66 / 150 CAL</Text>
                </View>
              </View>
              <View style={[styles.progressBar, styles.sectionTopMargin2]}>
                <View
                  style={[
                    styles.progressBarFilled,
                    { backgroundColor: '#E3B428', width: '44%' },
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
                  <Text style={styles.sectionSubHeader3}>24 / 56 CAL</Text>
                </View>
              </View>
              <View style={[styles.progressBar, styles.sectionTopMargin2]}>
                <View
                  style={[
                    styles.progressBarFilled,
                    { backgroundColor: '#39C3B3', width: '43%' },
                  ]}
                />
              </View>
            </View>
          </View>
        </View>

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
                  setEditCaloricGoal(text.replace(/\D/g, ''));
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
                Carbohydrates <Text style={styles.editDietText3}>113 g</Text>
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
                  if (editCarbGoal.length <= 0) {
                    setEditCarbGoal('0%');
                  } else {
                    setEditCarbGoal((prevText) => `${prevText}%`);
                  }
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
                Protein <Text style={styles.editDietText3}>150 g</Text>
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
                  if (editProteinGoal.length <= 0) {
                    setEditProteinGoal('0%');
                  } else {
                    setEditProteinGoal((prevText) => `${prevText}%`);
                  }
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
                Fat <Text style={styles.editDietText3}>50 g</Text>
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
                  if (editFatGoal.length <= 0) {
                    setEditFatGoal('0%');
                  } else {
                    setEditFatGoal((prevText) => `${prevText}%`);
                  }
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
      <DetailedCookingGoal animateFunction={slideProfilePage} />
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
    marginTop: 44,
    marginLeft: 28,

    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#33363F',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  profilePageContainer: {
    height: Dimensions.get('screen').height,
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
    marginLeft: 24,
    marginRight: 24,
  },
  profileSectionContainer: {
    marginTop: 28,
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
    marginRight: 64,
  },
  sectionRightMargin2: {
    marginRight: 8,
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
