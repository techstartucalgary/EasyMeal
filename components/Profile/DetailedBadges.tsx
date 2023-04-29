import React, { PropsWithChildren } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Pressable,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import { CircularProgressBase } from 'react-native-circular-progress-indicator';

import { testBadges } from './test-profile';

type DetailedBadgesProps = PropsWithChildren<{
  animateFunction: (slideLeft: boolean) => void;
}>;

const DetailedBadges: React.FC<DetailedBadgesProps> = ({ animateFunction }) => (
  <SafeAreaView style={styles.profilePageContainer}>
    <View style={styles.profilePageHeader}>
      <Pressable
        onPress={() => animateFunction(false)}
        style={styles.profileButton}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        <Text style={styles.profileButtonText}>Profile</Text>
      </Pressable>
      <Text style={styles.headerText}>Your badges</Text>
    </View>
    <FlatList
      data={testBadges.badges}
      keyExtractor={(item: any) => item.id}
      renderItem={({ item }) => (
        <View style={styles.badgeContainer}>
          <CircularProgressBase
            value={(item.currProgress / item.completedProgress) * 100}
            radius={56}
            activeStrokeColor="#6536F9"
            inActiveStrokeColor="#E0E0E0"
            activeStrokeWidth={6}
            inActiveStrokeWidth={6}
          >
            <Image
              source={item.image}
              resizeMode="center"
              style={styles.badgeImage}
            />
          </CircularProgressBase>
          <Text style={styles.badgeTitle}>{item.title}</Text>
          {item.currProgress !== 0 &&
            item.currProgress !== item.completedProgress && (
              <Text style={styles.badgeProgressText}>
                {item.currProgress}/{item.completedProgress} completed
              </Text>
            )}
          <Text style={styles.badgeDescription}>{item.description}</Text>
        </View>
      )}
      numColumns={2}
      initialNumToRender={20}
      style={styles.badgeListContainer}
    />
  </SafeAreaView>
);

export default DetailedBadges;

const styles = StyleSheet.create({
  badgeContainer: {
    flex: 1,
    marginBottom: 40,
    marginHorizontal: 16,

    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  badgeDescription: {
    marginTop: 4,

    textAlign: 'center',

    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    color: '#797979',
  },
  badgeImage: {
    height: 72,
    width: 72,
  },
  badgeListContainer: {
    marginVertical: 28,
    marginHorizontal: 20,
  },
  badgeProgressText: {
    marginTop: 4,

    textAlign: 'center',

    fontFamily: 'Inter-Bold',
    fontSize: 12,
    color: '#6536F9',
  },
  badgeTitle: {
    marginTop: 12,

    textAlign: 'center',

    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#474747',
  },
  headerText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#33363F',
    lineHeight: 20,
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
});
