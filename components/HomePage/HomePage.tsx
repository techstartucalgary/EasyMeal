import { Text, StyleSheet, View, SafeAreaView } from 'react-native';
import React, { Component } from 'react';

export default class HomePage extends Component {
  render() {
    return (
      <SafeAreaView style={styles.homeContainer}>
        <View style={styles.hContainer}>
          <Text style={styles.h1text}>Hi Sal,</Text>
          <Text style={styles.h2text}>Welcome Back</Text>
        </View>
        <View style={styles.goalWrapper}>
          <Text style={styles.goalHText}>Your Weekly Goal</Text>
          <Text style={styles.progressText}>70% complete</Text>
          <Text style={styles.statusText}>
            You’ve cooked <Text style={styles.greenStatusText}>3 times</Text>{' '}
            this week. You can do this!
          </Text>
        </View>
        <Text style={styles.favouritesHText}>Favourites</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  hContainer: {
    paddingBottom: 20,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 27,
    paddingRight: 27,
    paddingTop: 30,
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
  },
  statusText: {
    color: '#222222',
    fontWeight: '400',
    fontSize: 18,
    paddingBottom: 50,
  },
  greenStatusText: {
    color: '#0E8921',
  },
  favouritesHText: {
    color: '#222222',
    fontWeight: '600',
    fontSize: 20,
    marginBottom: 15,
  },
});
