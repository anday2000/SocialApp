import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from 'react-native';
import TextButton from '../../components/TextButton';
import { window, wsize, hsize } from '../../entities/constants';
import Logo from '../../components/Logo';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Entypo } from '@expo/vector-icons';
import { AuthContext } from '../../services/context/AuthContext';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);

  return (
    <>
      <Logo />
      <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
          <Input
            placeholder="Phone Number, username or email"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <Button
            title="Login"
            onPress={() => authContext.login(email, password)}
            style={{ backgroundColor: '#52BDEB', marginTop: wsize(5) }}
            titleStyle={{ color: 'white' }}
          />
          <View style={styles.getHelpContainer}>
            <Text style={styles.getHelpText}>Forgot your login details? </Text>
            <TextButton>Get help signing in</TextButton>
          </View>
          <View style={{ marginTop: hsize(24), alignItems: 'center' }}>
            <Text
              style={{
                color: '#939094',
                fontSize: wsize(18),
                fontWeight: '500',
              }}>
              or
            </Text>
          </View>
          <TouchableOpacity style={styles.getHelpContainer}>
            <Entypo name="facebook" size={wsize(28)} color="#4267B2" />
            <Text
              style={{
                alignSelf: 'center',
                marginLeft: wsize(8),
                fontSize: wsize(18),
                fontWeight: 'bold',
                color: '#52BDEB',
              }}>
              Log In With Facebook
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.getHelpText}>Don't have an account?</Text>
          <TextButton onPress={() => navigation.navigate('SignupFirst')}>
            Sign up
          </TextButton>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mainContainer: {
    marginTop: hsize(54),
    justifyContent: 'center',
  },
  getHelpContainer: {
    marginTop: hsize(10),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  getHelpText: {
    color: '#939094',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    height: hsize(79),
    width: '100%',
    borderColor: '#DADBDA',
  },
});

export default LoginScreen;
