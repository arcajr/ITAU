import React from 'react';
import { SectionList, StyleSheet, View } from 'react-native';

const EarthquakeSectionList = ({ sections, keyExtractor, renderItem, refreshControl }) => {
  return (
    <SectionList
      sections={sections}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListHeaderComponent={() => <View style={styles.listHeader} />}
      ListFooterComponent={() => <View style={styles.listFooter} />}
      refreshControl={refreshControl}
      contentContainerStyle={styles.listContent}
    />
  );
};

const styles = StyleSheet.create({
  listHeader: {
    height: 10,
  },
  listFooter: {
    height: 10,
  },
  listContent: {
    paddingHorizontal: 10,
  },
});

export default EarthquakeSectionList;