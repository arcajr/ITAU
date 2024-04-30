import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SectionList,
  RefreshControl,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import EarthquakeService from '../services/EarthquakeService';
import { LATITUDE_DELTA, LONGITUDE_DELTA } from '../utils/constants';
import EarthquakeDetail from '../components/EarthquakeDetail';
import moment from 'moment';
import EarthquakeSectionList from '../components/EarthquakeSectionList';
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
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Fecha Inicio:</Text>
            <TextInput
              style={styles.filterInput}
              value={startDate.format('YYYY-MM-DD')}
              onChangeText={(text) => setStartDate(moment(text, 'YYYY-MM-DD'))}
            />
          </View>
          <View style={styles.filterRow}>
            <Text style={styles.filterLabel}>Fecha Termino:</Text>
            <TextInput
              style={styles.filterInput}
              value={endDate.format('YYYY-MM-DD')}
              onChangeText={(text) => setEndDate(moment(text, 'YYYY-MM-DD'))}
            />
          </View>
          <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
            <Text style={styles.filterButtonText}>Filtrar</Text>
          </TouchableOpacity>
        </View>
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
        <SectionList
          sections={sections}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          renderItem={({ item }) => (
            <EarthquakeItem earthquake={item} onPress={() => handleMarkerPress(item)} />
          )}
          keyExtractor={(item) => item.properties.code}
          getItemLayout={(data, index) => ({
            length: 80,
            offset: 80 * index,
            index,
          })}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
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
    },
    filterButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    map: {
      flex: 1,
      borderRadius: 5,
      overflow: 'hidden',
      marginBottom: 10,
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
  });
  
  export default EarthquakeScreen;