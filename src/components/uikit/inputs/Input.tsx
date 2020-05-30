import React from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { Nullable } from 'src/utils/types';

const styles = StyleSheet.create({
  container: {
    minWidth: 200,
    marginBottom: 10,
  },
  input: {
    minHeight: 40,
    paddingBottom: 3,
    borderBottomWidth: 1,
    minWidth: 150,
    textAlign: 'center',
    fontSize: 18,
  },
  error: {
    position: 'absolute',
    top: '100%',
    color: 'crimson',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'center',
  },
});

export type Props = { error: Nullable<string>; containerStyle?: ViewStyle } & TextInputProps;

const Input: React.FC<Props> = ({ error, containerStyle, style, ...props }) => {
  const styleContainer = { ...styles.container, ...containerStyle };
  const styleInput = { ...styles.input, borderBottomColor: error ? 'crimson' : 'grey', ...(style as object) };

  return (
    <View style={styleContainer}>
      <TextInput placeholderTextColor="grey" style={styleInput} {...props} />
      <Text numberOfLines={1} style={styles.error}>
        {error}
      </Text>
    </View>
  );
};

export default Input;
