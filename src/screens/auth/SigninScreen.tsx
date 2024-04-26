import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../../components/Container';
import SectionComponents from '../../components/SectionComponents';
import TextComponents from '../../components/TextComponents';
import {colors} from '../../constants/colors';
import TitleComponents from '../../components/TitleComponents';
import {fontFamilies} from '../../constants/fontFamilies';
import InputComponents from '../../components/InputComponents';
import {Lock, Sms} from 'iconsax-react-native';
import ButtonComponent from '../../components/ButtonComponents';
import SpaceComponents from '../../components/SpaceComponents';
import {globalStyles} from '../../styles/globalStyles';
import auth from '@react-native-firebase/auth';

const SignInScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (email || password) {
      setErrorText('');
    }
  }, [email, password]);

  const handleSignInWithEmail = async () => {
    if (!email || !password) {
      setErrorText('PLease enter your email and password!!!');
    } else {
      setErrorText('');
      setIsLoading(true);
      await auth()
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          // save user
          setIsLoading(false);
        })
        .catch((err: any) => {
          setIsLoading(false);
          setErrorText(err.message);
        });
    }
  };

  return (
    <Container>
      <SectionComponents styles={{justifyContent: 'center', flex: 1}}>
        <TitleComponents
          text="Sign In"
          flex={0}
          size={32}
          font={fontFamilies.bold}
          styles={{textTransform: 'uppercase', textAlign: 'center'}}
        />

        <View style={{marginVertical: 20}}>
          <InputComponents
            value={email}
            onChange={val => setEmail(val)}
            prefix={<Sms size={20} color={colors.desc} />}
            placeholder="Email"
            title="Email"
            allowClear
          />
          <InputComponents
            value={password}
            onChange={val => setPassword(val)}
            prefix={<Lock size={20} color={colors.desc} />}
            placeholder="Password"
            title="Password"
            isPassword
          />
          {errorText && (
            <TextComponents text={errorText} color="coral" flex={0} />
          )}
        </View>

        <ButtonComponent
          isLoading={isLoading}
          text="Sign in"
          onPress={handleSignInWithEmail}
        />
        <SpaceComponents height={20} />
        <Text style={[globalStyles.text, {textAlign: 'center'}]}>
          You already have an account?{' '}
          <Text
            style={{color: 'coral'}}
            onPress={() => navigation.navigate('LoginScreen')}>
            {' '}
            Log in
          </Text>
        </Text>
      </SectionComponents>
    </Container>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
