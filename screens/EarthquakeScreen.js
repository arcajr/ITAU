import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  SectionList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import moment from 'moment';
import EarthquakeService from '../services/EarthquakeService';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../utils/constants';
import EarthquakeItem from '../components/EarthquakeItem';

const EarthquakeScreen = ({ navigation }) => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const [filteredEarthquakes, setFilteredEarthquakes] = useState([]);
  const [startDate, setStartDate] = useState(moment().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(moment());
  const [page, setPage] = useState(1);
  const limit = 20;

  useEffect(() => {
    fetchEarthquakes();
  }, [page]);

  const fetchEarthquakes = async () => {
    try {
      const response = await EarthquakeService.getEarthquakes(limit, page);
      setEarthquakes(response.features);
      setFilteredEarthquakes(response.features);
      setRegion({
        latitude: response.features[0].geometry.coordinates[1],
        longitude: response.features[0].geometry.coordinates[0],
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      });
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleFilterPress = () => {
    setFilteredEarthquakes(
      earthquakes.filter(
        (eq) =>
          moment(eq.properties.time) >= startDate &&
          moment(eq.properties.time) <= endDate
      )
    );
  };

  const handleMarkerPress = (eq) => {
    navigation.navigate('EarthquakeDetail', { earthquake: eq });
  };

  const handleEarthquakePress = (eq) => {
    navigation.navigate('EarthquakeDetail', { earthquake: eq });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const groupByLetter = (data) => {
    const initialValue = { A: [] };
    return data.reduce((acc, item) => {
      const key = item.properties.place[0].toUpperCase();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, initialValue);
  };

  const groupedEarthquakes = groupByLetter(filteredEarthquakes);
  const sections = Object.entries(groupedEarthquakes).map(([key, data]) => ({ title: key, data }));

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>FechaInicio:</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="YYYY-MM-DD"
            value={startDate.format('YYYY-MM-DD')}
            onChangeText={(text) => setStartDate(moment(text, 'YYYY-MM-DD'))}
          />
        </View>
        <View style={styles.filterRow}>
          <Text style={styles.filterLabel}>Fecha Termino:</Text>
          <TextInput
            style={styles.filterInput}
            placeholder="YYYY-MM-DD"
            value={endDate.format('YYYY-MM-DD')}
            onChangeText={(text) => setEndDate(moment(text, 'YYYY-MM-DD'))}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={region}>
          {filteredEarthquakes.map((eq) => (
            <Marker
              key={eq.properties.code}
              coordinate={{
                latitude: eq.geometry.coordinates[1],
                longitude: eq.geometry.coordinates[0],
              }}
              onPress={() => handleMarkerPress(eq)}
           />
          ))}
        </MapView>
      </View>
      <View style={styles.listContainer}>
        <SectionList
          sections={sections}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.earthquakeItem}
              onPress={() => handleEarthquakePress(item)}
            >
              <View style={styles.earthquakeInfo}>
                <Text style={styles.earthquakeTitle}>{item.properties.place}</Text>
                <Text style={styles.earthquakeDetail}>
                  {moment(item.properties.time).format('lll')}
                </Text>
                <Text style={styles.earthquakeDetail}>
                  Magnitud: {item.properties.mag}
                </Text>
              </View>
              <View style={styles.earthquakeButton}>
                <TouchableOpacity
                  style={styles.detailButton}
                  onPress={() => handleEarthquakePress(item)}
                >
                  <Text style={styles.detailButtonText}>Ver detalle</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.properties.code}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  filterContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    width: 100,
    fontWeight: 'bold',
  },
  filterInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 0.6,
    marginBottom: 10,
  },
  map: {
    flex: 1,
    borderRadius: 5,
    overflow: 'hidden',
  },
  listContainer: {
    flex: 0.4,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginTop: 10,
  },
  earthquakeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  earthquakeInfo: {
    flex: 1,
  },
  earthquakeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  earthquakeDetail: {
    fontSize: 14,
    marginTop: 5,
  },
  earthquakeButton: {
    width: 100,
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  detailButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default EarthquakeScreen;