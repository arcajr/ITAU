import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

const EarthquakeSectionList = ({ sections, keyExtractor, renderItem, refreshControl }) => {
  return (
    <SectionList
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={() => <View style={styles.listHeader} />}
      refreshControl={refreshControl}
      stickySectionHeadersEnabled
    />
  );
};

const styles = StyleSheet.create({
  listHeader: {
    height: 20,
    paddingHorizontal: 10
  },
});

export default EarthquakeSectionList;