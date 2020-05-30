import { Formik, FormikConfig, useFormikContext } from 'formik';
import React, { useCallback } from 'react';
import { Modal, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import CategorySelector from 'src/components/posts/CategorySelector';
import Btn, { BtnTypes } from 'src/components/uikit/btns/Btn';
import FormInput from 'src/components/uikit/inputs/FormInput';
import categories from 'src/data/categories';
import { createPost } from 'src/store/posts/thunks';
import { AppDispatch } from 'src/store/types';
import { ValuesType } from 'utility-types';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'seashell',
    flex: 1,
    alignItems: 'center',
  },
  title: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    width: '90%',
    alignItems: 'center',
  },
  inputContainer: {
    width: 300,
  },
  input: {
    textAlign: 'left',
  },
  btnCreate: {
    marginBottom: 10,
  },
});

type FormValues = {
  title: string;
  content: string;
  category: Nullable<number>;
};

const initialValues: FormValues = {
  title: '',
  content: '',
  category: null,
};

const formikConfig = {
  initialValues,
  validationSchema: yup.object<FormValues>({
    title: yup.string().required(),
    content: yup.string().required(),
    category: yup.number().required(),
  }),
};

const Form: React.FC = () => {
  const { submitForm, isValid, isSubmitting, setFieldValue } = useFormikContext<FormValues>();

  const categoryHandler = useCallback(
    (value: number) => {
      setFieldValue('category', value);
    },
    [setFieldValue]
  );

  return (
    <View style={styles.form}>
      <FormInput name="title" placeholder="Title" multiline={true} containerStyle={styles.inputContainer} style={styles.input} />
      <FormInput name="content" placeholder="Post content" multiline={true} containerStyle={styles.inputContainer} style={styles.input} />
      <CategorySelector onSelect={categoryHandler} />
      <Btn type={BtnTypes.PRIMARY} onPress={submitForm} isLoading={isSubmitting} isDisabled={!isValid} style={styles.btnCreate}>
        Create!
      </Btn>
    </View>
  );
};

type Props = {
  isVisible: boolean;
  onClose(): void;
};

const CreateModal: React.FC<Props> = ({ isVisible, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const submitHandler: ValuesType<Pick<FormikConfig<FormValues>, 'onSubmit'>> = useCallback(
    async ({ title, content, category }) => {
      if (!category) throw new Error('Nullable error! Something went wrong with validation!');
      await dispatch(createPost(title, content, category));
      onClose();
    },
    [dispatch, onClose]
  );

  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>New Post!</Text>
        <Formik {...formikConfig} onSubmit={submitHandler}>
          <Form />
        </Formik>
        <Btn type={BtnTypes.CANCEL} onPress={onClose}>
          Cancel
        </Btn>
      </SafeAreaView>
    </Modal>
  );
};

export default CreateModal;
