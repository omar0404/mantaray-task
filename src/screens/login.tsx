import React from 'react';
import {useFormik} from 'formik';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../reducers/store';
import {login} from '../reducers/user';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/home-navigation';

const Login = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Login'>) => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik<{email: string; password: string}>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      dispatch(login(values));
    },
    validateOnMount: true,
    validateOnChange: true,
    validate: values => {
      let isValid = true;
      const errors: {email: string; password: string} = {
        email: '',
        password: '',
      };
      if (!values.email.length) {
        isValid = false;
        errors.email = 'Email is required';
      }
      if ((values?.password?.length || 0) < 4) {
        isValid = false;
        errors.password = 'password is required';
      }
      return isValid ? {} : errors;
    },
  });
  return (
    <View style={style.container}>
      <Text style={style.label}>Email</Text>
      <TextInput
        style={style.field}
        multiline
        placeholder="Email"
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
      />
      <Text style={style.label}>Password</Text>

      <TextInput
        style={style.field}
        placeholder="Password"
        value={formik.values.password}
        secureTextEntry
        onChangeText={formik.handleChange('password')}
      />
      <TouchableOpacity
        style={style.button}
        disabled={!formik.isValid}
        onPress={formik.submitForm}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.hyperlinkWrapper}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={style.hyperlink}>Don't have an account ? Signup</Text>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
  },
  hyperlinkWrapper: {
    alignItems: 'center',
    marginTop: 20,
  },
  hyperlink: {
    color: 'black',
  },
  field: {
    backgroundColor: 'white',
    marginTop: 10,
    padding: 10,
    borderRadius: 3,
    minHeight: 50,
  },
  label: {
    marginTop: 30,
    fontWeight: 'bold',
  },
});
export default Login;
