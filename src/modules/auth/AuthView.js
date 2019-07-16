import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Keyboard,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

import { fonts, colors } from '../../styles';
import { TextInput, Button } from '../../common';
import axios from 'axios';
import C from '../../../Constants';
import SimpleToast from 'react-native-simple-toast';
import Toast from 'react-native-simple-toast';
import SyncStorage from 'sync-storage';
import { StackActions ,NavigationActions } from 'react-navigation'

const FORM_STATES = {
  LOGIN: 0,
  REGISTER: 1,
};



export default class AuthScreen extends React.Component {
  
  constructor(props){
    super(props);
  }

  state = {
    anim: new Animated.Value(0),

    // Current visible form
    formState: FORM_STATES.LOGIN,
    isKeyboardVisible: false,
  };

  componentWillMount() {

    this.setState({username:"sunil@webhopers.in",password:"1234"})

    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
  }

  componentDidMount() {
    Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: true });
  }

  _keyboardDidHide() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ isKeyboardVisible: false });
  }

  fadeIn(delay, from = 0) {
    const { anim } = this.state;
    return {
      opacity: anim.interpolate({
        inputRange: [delay, Math.min(delay + 500, 3000)],
        outputRange: [0, 1],
        extrapolate: 'clamp',
      }),
      transform: [
        {
          translateY: anim.interpolate({
            inputRange: [delay, Math.min(delay + 500, 3000)],
            outputRange: [from, 0],
            extrapolate: 'clamp',
          }),
        },
      ],
    };
  }

  async userlogin()
{
  var id = this.state.username;
  var password = this.state.password;
  try{
    const res = await axios.post(`${C.API}/users/login`,{email:id,password:password})
    if(res.data.success)
    {
      
      if(res.data.data.user.role == "admin")
      {
        SyncStorage.set('LOGIN_DETAILS',res.data.data.token);
        
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main'})
          ]
          })
          this.props.navigation.dispatch(resetAction)

        //this.props.navigation.navigate({ routeName: 'Home' });
      }
      else
      {
        Toast.show("Only admin can Log in")
      }
    }
    else
    {
      Toast.show("Invalid Credentials")
    }
  }
  catch(e){
    Toast.show("Invalid Credentials")
  }
}
  render() {
    const isRegister = this.state.formState === FORM_STATES.REGISTER;
    
    return (
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={[styles.section, { paddingTop: 30 }]}>
            <Animated.Image
              resizeMode="contain"
              style={[
                styles.logo,
                this.state.isKeyboardVisible && { height: 90 },
                this.fadeIn(0),
              ]}
              source={require('../../../assets/images/white-logo.png')}
            />
          </View>

          <Animated.View
            style={[styles.section, styles.middle, this.fadeIn(700, -20)]}
          >
            
            <TextInput
              placeholder="Username"
              style={styles.textInput}
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.username}
              onChangeText={(username) => this.setState({ username}) }
            />

            <TextInput
              placeholder="Password"
              secureTextEntry
              style={styles.textInput}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password}) }
            />

            <Animated.View
              style={[styles.section, styles.bottom, this.fadeIn(700, -20)]}
            >
              <Button
                secondary
                rounded
                style={{ alignSelf: 'stretch', marginBottom: 10 }}
                caption={
                  this.state.formState ='Login'
                }
                onPress={() => this.userlogin()}
              />

            </Animated.View>
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
  },
  backgroundImage: {
    flex: 1,
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  middle: {
    flex: 2,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
  },
  bottom: {
    flex: 1,
    alignSelf: 'stretch',
    paddingBottom: Platform.OS === 'android' ? 30 : 0,
  },
  last: {
    justifyContent: 'flex-end',
  },
  textInput: {
    alignSelf: 'stretch',
    marginTop: 20,
  },
  logo: {
    height: 150,
  },
  socialLoginContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    marginTop: 15,
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
  },
  socialButtonCenter: {
    marginLeft: 10,
    marginRight: 10,
  },
});
