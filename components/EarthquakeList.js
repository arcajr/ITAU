import React, { useState } from 'react';
import { FlatList, ActivityIndicator, Text } from 'react-native';
import EarthquakeItem from './EarthquakeItem';

const EarthquakeList = ({ earthquakes, onLoadMore }) => {
  const [loading, setLoading] = useState(false);

  const handleLoadMore = () => {
    setLoading(true);
    onLoadMore();
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return null;
  };

  const renderItem = ({ item }) => {
    return <EarthquakeItem earthquake={item} onPress={() => console.log(item)} />;
  };

  return (
    <FlatList
      data={earthquakes}
      renderItem={renderItem}
      keyExtractor={(item) => item.properties.code}
      ListFooterComponent={renderFooter}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
    />
  );
};

export default EarthquakeList;