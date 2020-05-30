import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    shadowColor: 'grey',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
});

const Card: React.FC = props => <View style={styles.container}>{props.children}</View>;

export default Card;
