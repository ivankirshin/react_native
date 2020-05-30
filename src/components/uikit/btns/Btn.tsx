import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    shadowRadius: 5,
  },
});

export enum BtnTypes {
  PRIMARY,
  SECONDARY,
  CANCEL,
  DISABLED,
}

const backgroundColors = new Map<BtnTypes, string>([
  [BtnTypes.PRIMARY, 'papayawhip'],
  [BtnTypes.SECONDARY, 'rgba(255,182,193, 0.15)'],
  [BtnTypes.CANCEL, 'rgba(0,191,255, 0.05)'],
  [BtnTypes.DISABLED, 'rgba(240,248,255, 0.3)'],
]);

const textColors = new Map<BtnTypes, string>([
  [BtnTypes.PRIMARY, 'grey'],
  [BtnTypes.SECONDARY, 'lightcoral'],
  [BtnTypes.CANCEL, 'dodgerblue'],
  [BtnTypes.DISABLED, 'dodgerblue'],
]);

type Props = {
  type: BtnTypes;
  onPress(): void;
  isDisabled?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
};

const Btn: React.FC<Props> = ({ children, onPress, style = {}, type, isDisabled, isLoading = false }) => {
  const _isDisabled = isDisabled || isLoading;

  return (
    <TouchableOpacity onPress={onPress} disabled={_isDisabled}>
      <View
        style={{
          ...styles.container,
          backgroundColor: backgroundColors.get(_isDisabled ? BtnTypes.DISABLED : type),
          ...style,
        }}
      >
        <Text
          style={{
            ...styles.text,
            color: textColors.get(type),
          }}
        >
          {isLoading ? 'loading...' : children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Btn;
