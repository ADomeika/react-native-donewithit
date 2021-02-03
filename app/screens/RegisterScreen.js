import React, { useState } from 'react';
import { StyleSheet, Image, ActivityIndicator } from 'react-native';
import * as Yup from 'yup';

import usersApi from '../api/users';
import Screen from '../components/Screen';
import {
  AppForm,
  AppFormField,
  SubmitButton,
  ErrorMessage,
} from '../components/forms';
import useApi from '../hooks/useApi';
import Overlay from '../components/Overlay';
import useAuth from '../auth/useAuth';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(4).label('Password'),
});

export default function RegisterScreen() {
  const registerApi = useApi(usersApi.register);
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (userInfo) => {
    const result = await registerApi.request(userInfo);

    if (!result.ok) {
      if (result.data) setError(result.data.error);
      else {
        setError('An unexpected error occurred.');
        console.log(result);
      }
      return;
    }

    setError(null);

    login(result.data);
  };

  return (
    <>
      {registerApi.loading && (
        <Overlay>
          <ActivityIndicator size='large' animating />
        </Overlay>
      )}
      <Screen style={styles.container}>
        <Image source={require('../assets/logo-red.png')} style={styles.logo} />

        <AppForm
          initialValues={{ name: '', email: '', password: '' }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='account'
            name='name'
            placeholder='Name'
            textContentType='name'
          />

          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            name='email'
            placeholder='Email'
            textContentType='emailAddress'
          />

          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            name='password'
            placeholder='Password'
            secureTextEntry
            textContentType='password'
          />

          <SubmitButton title='Register' />
        </AppForm>
      </Screen>
    </>
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
