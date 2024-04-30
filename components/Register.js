import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AuthService from '../services/AuthService';

const Register = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await AuthService.register(email, name, lastName, password);
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  
};

export default Register;