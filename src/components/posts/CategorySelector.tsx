import React, { useCallback, useState } from 'react';
import { Picker, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import Btn, { BtnTypes } from 'src/components/uikit/btns/Btn';
import { getCategories } from 'src/store/posts/selectors';
import Category from 'src/models/Category';

const styles = StyleSheet.create({
  wrapperSelected: {
    flexDirection: 'row',
    paddingVertical: 25,
  },
  labelCategory: {
    color: 'grey',
    marginRight: 10,
  },
  selectedCategory: {
    fontWeight: '600',
  },
  modal: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  picker: {
    marginBottom: 50,
    height: 220,
    width: '100%',
    justifyContent: 'center',
  },
});

type Props = {
  onSelect(value: number): void;
};

const CategorySelector: React.FC<Props> = ({ onSelect }) => {
  const [isEdit, setIsEdit] = useState(false);
  const categories = useSelector(getCategories);
  const [pickedCategoryId, setPickedCategoryId] = useState<number>(categories[0].id);
  const [selectedCategory, setSelectedCategory] = useState<Nullable<Category>>(null);

  // const selectedCategory = categories.find(category => category.id === selectedCategoryId);

  const changeHandler = useCallback(
    categoryId => {
      setPickedCategoryId(categoryId);
    },
    [setPickedCategoryId]
  );

  const showModalHandler = useCallback(() => {
    setIsEdit(true);
  }, [setIsEdit]);

  const closeModalHandler = useCallback(() => {
    setIsEdit(false);
  }, [setIsEdit]);

  const selectHandler = useCallback(() => {
    setIsEdit(false);
    const category = categories.find(category => category.id === pickedCategoryId);

    if (category) {
      setSelectedCategory(category);
      onSelect(category.id);
    }
  }, [setIsEdit, pickedCategoryId, onSelect, categories]);

  return (
    <View>
      <TouchableOpacity onPress={showModalHandler} style={styles.wrapperSelected}>
        {selectedCategory ? (
          <>
            <Text style={styles.labelCategory}>Category:</Text>
            <Text style={styles.selectedCategory}>{selectedCategory.title}</Text>
          </>
        ) : (
          <Text style={styles.labelCategory}>Click here to select the category for you post</Text>
        )}
      </TouchableOpacity>

      <Modal isVisible={isEdit} onBackdropPress={closeModalHandler}>
        <View style={styles.modal}>
          <Picker selectedValue={pickedCategoryId} onValueChange={changeHandler} style={styles.picker}>
            {categories.map(category => (
              <Picker.Item label={category.title} value={category.id} key={category.id} />
            ))}
          </Picker>
          <Btn type={BtnTypes.PRIMARY} onPress={selectHandler}>
            Select
          </Btn>
        </View>
      </Modal>
    </View>
  );
};

export default CategorySelector;
