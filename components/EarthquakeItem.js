import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

const EarthquakeItem = ({ earthquake, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.row}>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>
          {moment(earthquake.properties.time).format('YYYY-MM-DD HH:mm:ss')}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Magnitud:</Text>
        <Text style={styles.value}>{earthquake.properties.mag}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Ubicación:</Text>
        <Text style={styles.value}>{earthquake.properties.place}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Profundidad:</Text>
        <Text style={styles.value}>{earthquake.properties.depth} km</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  label: {
    width: 100,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
});

export default EarthquakeItem;