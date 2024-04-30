import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import MapView, { Marker } from 'react-native-maps';

const EarthquakeDetail = ({ route, navigation }) => {
  const { earthquake } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Detalle del sismo</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.label}>Lugar:</Text>
        <Text style={styles.value}>{earthquake.properties.place}</Text>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.value}>
          {moment(earthquake.properties.time).format('lll')}
        </Text>
        <Text style={styles.label}>Magnitud:</Text>
        <Text style={styles.value}>{earthquake.properties.mag}</Text>
        <Text style={styles.label}>Profundidad:</Text>
        <Text style={styles.value}>
          {earthquake.properties.depth} km
        </Text>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            region={{
              latitude: earthquake.geometry.coordinates[0], // Corrige el orden de las coordenadas
              longitude: earthquake.geometry.coordinates[1], // Corrige el orden de las coordenadas
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: earthquake.geometry.coordinates[0], // Corrige el orden de las coordenadas
                longitude: earthquake.geometry.coordinates[1], // Corrige el orden de las coordenadas
              }}
            />
          </MapView>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  info: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginTop: 5,
  },
  mapContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  map: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
});

export default EarthquakeDetail;