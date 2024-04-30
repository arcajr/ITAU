import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AuthService from '../services/AuthService';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await AuthService.login(email, password);
      navigation.navigate('EarthquakeScreen');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  
};

export default Login;