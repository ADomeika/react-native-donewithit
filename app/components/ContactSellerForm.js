import React from 'react';
import { StyleSheet, Text, View, Keyboard, Alert } from 'react-native';
import * as Yup from 'yup';
import { Notifications } from 'expo';

import messagesApi from '../api/messages';
import { AppForm, AppFormField, SubmitButton } from './forms';

const validationSchema = Yup.object().shape({
  message: Yup.string().required().label('Message'),
});

export default function ContactSellerForm({ listing }) {
  const handleSubmit = async ({ message }, { resetForm }) => {
    Keyboard.dismiss();

    const result = await messagesApi.send(message, listing.id);

    if (!result.ok) {
      console.log('error', result);
      return Alert.alert('Error', 'Could not send message to seller');
    }

    resetForm();

    Notifications.presentLocalNotificationAsync({
      title: 'Awesome!',
      body: 'Your message was sent to the seller',
    });
  };

  return (
    <AppForm
      initialValues={{ message: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      <AppFormField name='message' placeholder='Is this still available?' />
      <SubmitButton title='Send' />
    </AppForm>
  );
}

const styles = StyleSheet.create({});
