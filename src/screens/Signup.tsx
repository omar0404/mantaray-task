import React, {useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../reducers/store';
import {signup} from '../actions/user';
import Toast from 'react-native-toast-message';

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [values, setValues] = useState({name: '', email: '', password: ''});

  const handleChange = (key: 'name' | 'email' | 'password', value: string) => {
    setValues(pre => ({...pre, [key]: value}));
  };

  const validate = (_values: {
    name: string;
    email: string;
    password: string;
  }) => {
    let isValid = true;
    const errors: {name: string; email: string; password: string} = {
      name: '',
      email: '',
      password: '',
    };
    if (!_values.name.length) {
      isValid = false;
      errors.name = 'Name is required';
    }
    if (!_values.email.length) {
      isValid = false;
      errors.email = 'Email is required';
    }
    if (!_values?.password?.length) {
      isValid = false;
      errors.password = 'password is required';
    }
    return isValid ? null : errors;
  };
  const onSubmit = () => {
    const errors = validate(values);
    if (errors) {
      Toast.show({
        type: 'error',
        text1: Object.values(errors).find(err => err),
      });
    } else {
      dispatch(signup(values));
    }
  };

  return (
    <View style={style.container}>
      <Text style={style.label}>name</Text>
      <TextInput
        style={style.field}
        multiline
        placeholder="Name"
        value={values.name}
        onChangeText={value => handleChange('name', value)}
      />
      <Text style={style.label}>Email</Text>
      <TextInput
        style={style.field}
        multiline
        placeholder="Email"
        value={values.email}
        onChangeText={value => handleChange('email', value)}
      />
      <Text style={style.label}>Password</Text>

      <TextInput
        style={style.field}
        placeholder="Password"
        value={values.password}
        secureTextEntry
        onChangeText={value => handleChange('password', value)}
      />
      <TouchableOpacity style={style.button} onPress={onSubmit}>
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
