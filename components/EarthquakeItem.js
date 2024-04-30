import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EarthquakeItem = ({ earthquake, onPress }) => {
  const { properties } = earthquake;

  return (
    <View style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{properties.title}</Text>
      <Text style={styles.magnitude}>{properties.mag}</Text>
      <Text style={styles.date}>{new Date(properties.time).toLocaleDateString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  magnitude: {
    fontSize: 14,
    color: 'gray',
  },
  date: {
    fontSize: 12,
    color: 'gray',
  },
});

export default EarthquakeItem;