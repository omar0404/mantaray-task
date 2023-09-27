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
import {signup} from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik<{name: string; email: string; password: string}>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: values => {
      dispatch(signup(values));
    },
    validateOnMount: true,
    validateOnChange: true,
    validate: values => {
      let isValid = true;
      const errors: {name: string; email: string; password: string} = {
        name: '',
        email: '',
        password: '',
      };
      if (!values.name.length) {
        isValid = false;
        errors.email = 'Name is required';
      }
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
      <Text style={style.label}>Name</Text>
      <TextInput
        style={style.field}
        multiline
        placeholder="Name"
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
      />
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
        <Text>Signup</Text>
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
export default Signup;
