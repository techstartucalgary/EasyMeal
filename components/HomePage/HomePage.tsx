import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuthContext } from 'contexts/AuthContext';
import { useFavorites } from 'services/favorites';

const HomePage = () => {
  const { currentUser } = useAuthContext();

  useFavorites();

  return (
    <View style={styles.homeContainer}>
      <View style={styles.hContainer}>
        <Text style={styles.h1text}>
          Hi {currentUser?.displayName || currentUser?.email},
        </Text>
        <Text style={styles.h2text}>Welcome Back</Text>
      </View>
      <View style={styles.goalWrapper}>
        <Text style={styles.goalHText}>Your Weekly Goal</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>60% complete</Text>
          <Text style={styles.statusText}>
            <Text style={styles.timesText}>5</Text> times/ week
          </Text>
        </View>
        <Progress.Bar
          width={340}
          progress={0.6}
          color="#74CF82"
          unfilledColor="#D9D9D9"
          borderWidth={0}
          height={10}
          borderRadius={100}
        />
        <Text style={styles.motivateText}>You got this!</Text>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
          <View style={styles.icon}>
            <Icon name="add" size={30} color="#757678" />
          </View>
        </View>
      </View>
      <Text style={styles.favouritesHText}>Favourites</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  hContainer: {
    paddingBottom: 20,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 60,
    paddingBottom: 30,
  },
  h1text: {
    color: '#535353',
    fontWeight: '700',
    fontSize: 20,
  },
  h2text: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 24,
  },
  goalWrapper: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goalHText: {
    color: '#222222',
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 15,
  },
  progressText: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 5,
  },
  statusText: {
    color: '#222222',
    fontWeight: '400',
    fontSize: 18,
  },
  timesText: {
    fontWeight: '600',
  },
  motivateText: {
    fontWeight: '400',
    fontSize: 18,
    color: '#151515',
    marginTop: 20,
    marginBottom: 20,
  },
  favouritesHText: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 15,
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 0,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default HomePage;
