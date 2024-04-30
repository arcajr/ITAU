import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

const EarthquakeDetail = ({ route }) => {
  const { earthquake } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Terremoto</Text>
      <Text style={styles.label}>Fecha:</Text>
      <Text style={styles.value}>{moment(earthquake.properties.time).format('YYYY-MM-DD HH:mm:ss')}</Text>
      <Text style={styles.label}>Magnitud:</Text>
      <Text style={styles.value}>{earthquake.properties.mag}</Text>
      <Text style={styles.label}>Ubicación:</Text>
      <Text style={styles.value}>{earthquake.properties.place}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default EarthquakeDetail;