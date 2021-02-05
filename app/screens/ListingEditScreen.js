import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import * as Yup from 'yup';

import {
  AppForm,
  AppFormField,
  AppFormPicker,
  SubmitButton,
} from '../components/forms';
import Screen from '../components/Screen';
import CategoryPickerItem from '../components/CategoryPickerItem';
import FormImagePicker from '../components/forms/FormImagePicker';
import listingsApi from '../api/listings';
import useLocation from '../hooks/useLocation';
import UploadScreen from './UploadScreen';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  images: Yup.array().min(1, 'Please select at least 1 image.'),
  title: Yup.string().required().min(1).label('Title'),
  price: Yup.number().required().min(1).max(10000).label('Price'),
  description: Yup.string().label('Description'),
  category: Yup.object().required().nullable().label('Category'),
});

const categories = [
  { label: 'Furniture', value: 1, backgroundColor: 'red', icon: 'apps' },
  { label: 'Clothing', value: 2, backgroundColor: 'green', icon: 'email' },
  { label: 'Cameras', value: 3, backgroundColor: 'blue', icon: 'lock' },
];

export default function ListingEditScreen() {
  const { user } = useAuth();
  const location = useLocation();
  const [uploadScreenVisible, setUploadScreenVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadScreenVisible(true);
    const result = await listingsApi.addListing(
      user,
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadScreenVisible(false);
      return alert('Could not save listing');
    }

    resetForm();
  };

  return (
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadScreenVisible(false)}
        progress={progress}
        visible={uploadScreenVisible}
      />
      <ScrollView>
        <AppForm
          initialValues={{
            images: [],
            title: '',
            price: '',
            description: '',
            category: null,
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <FormImagePicker name='images' />

          <AppFormField maxLength={255} name='title' placeholder='Title' />

          <AppFormField
            keyboardType='numeric'
            maxLength={8}
            name='price'
            placeholder='Price'
            width={120}
          />

          <AppFormPicker
            items={categories}
            name='category'
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder='Category'
            width='50%'
          />

          <AppFormField
            maxLength={255}
            multiline
            name='description'
            numberOfLines={3}
            placeholder='Description'
          />

          <SubmitButton title='Post' />
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
});
