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
  ScrollView,
} from 'react-native';
import C from '../../../Constants';
import { TextInput, Button } from '../../common';
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button'
import Toast from 'react-native-simple-toast'
import { StackNavigator } from 'react-navigation';

export default class customerAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
  }
   
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
    email : '',
    name  : '',
    phone : '',
    password   : '',
    address :'',
    city :'',
    ustate:'',
    zipcode:'',
    result:'',
    cstate: true,
    customersIndex:0,
    nameError : false,
    emailError: false,
    phoneError: false,
    stateError: false,
    addressError: false,
    cityError: false,
    passwordError: false,
    zipcodeError: false
  };

static navigatioOptions = ({navigation}) => {
  return{ title: "Edit Customer" }
}

  onSelect(index, value){
    this.setState({
        cstate : value
    })
}

navtitle =()=>{
  this.props.navigation.setParams({
        title:"Update Customer"

     })
}
  componentWillMount() {
this.navtitle();
    if(this.props.navigation.state.params)
    {
        if(this.props.navigation.state.params.status == true)
        {
            this.setState({ customersIndex :0});
        }
        else
        {
            this.setState({ customersIndex : 1});
        }
        this.setState({
            email : this.props.navigation.state.params.email,
            name : this.props.navigation.state.params.name,
            phone : this.props.navigation.state.params.phone,
           // password : this.props.navigation.state.params.password,
            address : this.props.navigation.state.params.address,
            city : this.props.navigation.state.params.city,
            ustate : this.props.navigation.state.params.state,
            zipcode : this.props.navigation.state.params.zipcode,
            cstate : this.props.navigation.state.params.status
        });
    }
    else
        this.setState({ customersIndex :0});
    
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
   // Animated.timing(this.state.anim, { toValue: 3000, duration: 3000 }).start();
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

  submitForm(){ 
    if(this.props.navigation.state.params)
    {
        var pwd = "";
        if(this.state.password == "")
            pwd = this.props.navigation.state.params.password;
        else
            pwd = this.state.password;
        let user = {
            id: this.props.navigation.state.params.id,
            name:  this.state.name,
            email:  this.state.email,
            phone:  this.state.phone,
            address:  this.state.address,
            password:  pwd,
            city:  this.state.city,
            state:  this.state.ustate,
            zipcode:  this.state.zipcode,
            status: this.state.cstate
        };
    
        fetch(`${C.API}/customers/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .then((response) => response.json())
            .then((responseJson) => {
        
                if(!responseJson.status){

                    if(responseJson.message.name){
                        this.setState({ nameError: true });
                    }
                    if(responseJson.message.city){
                        this.setState({ cityError: true });
                    }
                    if(responseJson.message.state){
                        this.setState({ stateError: true });
                    }
                    if(responseJson.message.email){
                        this.setState({ emailError: true });
                    }
                    if(responseJson.message.password){
                        this.setState({ passwordError: true });
                    }
                    if(responseJson.message.phone){
                        this.setState({ phoneError: true });
                    }
                    if(responseJson.message.address){
                        this.setState({ addressError: true });
                    }
                    if(responseJson.message.zipcode){
                        this.setState({ zipcodeError: true });
                    }
                }
                    Toast.show("Customer Updated")
                    this.setState({email : ''});
                    this.setState({name  : ''});
                    this.setState({phone : ''});
                    this.setState({password   : ''});
                    this.setState({address :''});
                    this.setState({city :''});
                    this.setState({ustate:''});
                    this.setState({zipcode:''});
            })
            .catch(err => {console.warn(err) })
            .done();
            // this.props.navigation.navigate({
            //     routeName: 'Customer',
               
            //   })
            this.props.navigation.goBack();
    }
    else
    {
        let user = {
            name:  this.state.name,
            email:  this.state.email,
            phone:  this.state.phone,
            address:  this.state.address,
            password:  this.state.password,
            city:  this.state.city,
            state:  this.state.ustate,
            zipcode:  this.state.zipcode,
            status: this.state.cstate
        };
    
        fetch(`${C.API}/customers`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .then((response) => response.json())
            .then((responseJson) => {
        
                if(!responseJson.status){

                    if(responseJson.message.name){
                        this.setState({ nameError: true });
                    }
                    if(responseJson.message.city){
                        this.setState({ cityError: true });
                    }
                    if(responseJson.message.state){
                        this.setState({ stateError: true });
                    }
                    if(responseJson.message.email){
                        this.setState({ emailError: true });
                    }
                    if(responseJson.message.password){
                        this.setState({ passwordError: true });
                    }
                    if(responseJson.message.phone){
                        this.setState({ phoneError: true });
                    }
                    if(responseJson.message.address){
                        this.setState({ addressError: true });
                    }
                    if(responseJson.message.zipcode){
                        this.setState({ zipcodeError: true });
                    }
                }
                if(responseJson.success)
                {
                    Toast.show("Customer added")
                    this.setState({email : ''});
                    this.setState({name  : ''});
                    this.setState({phone : ''});
                    this.setState({password   : ''});
                    this.setState({address :''});
                    this.setState({city :''});
                    this.setState({ustate:''});
                    this.setState({zipcode:''});
                    this.props.navigation.goBack();
                }
                else
                {
                    console.warn(responseJson)
                    if(responseJson.message == "E-mail already exists")
                    {
                      Toast.show(responseJson.message);
                    }
                    else if(responseJson.message.email != "required")
                    {
                      Toast.show(responseJson.message.email.message)
                    }
                  
                    //Toast.show("Email already Exists")
                }
            })
            .catch(err => {console.warn(err) })
            .done();
            // this.props.navigation.navigate({
            //     routeName: 'Customer',
               
            //   })
           
        }
  }

  loginUser(email, password){ /* email and password based authentication with Deployd */
    fetch(`${API}/users/login`, {
      method: 'POST',
      headers: Headers,
      body: JSON.stringify({username: email, password: password})
    })
    .then(response => response.json())
    .then(data => this.getUserInfo(data.id))
    .catch(err => {})
    .done();
  }
   

  render() {
    
    return (
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
      <ScrollView style={styles.container} bounces={false}>
         <Animated.View
            // style={[styles.section, styles.middle, this.fadeIn(700, -20)]}
          >
        
            <TextInput
              autoCapitalize="none"
              keyboardType="email-address"
              maxLength={150}
              onChangeText={(email) => this.setState({ email , emailError:false})}
              onSubmitEditing={() => this.email.focus()}
              placeholder="Email address"
              returnKeyType="next"
              style={[styles.textInput, this.state.emailError? styles.error:null]}
              value={this.state.email}
              autoCorrect={false}
              
            />
            <TextInput
              autoCapitalize="none"
              maxLength={20}
              onChangeText={(password) => this.setState({ password , passwordError:false})}
              onSubmitEditing={() => this.password.focus()}
              placeholder="Password"
              returnKeyType="next"
              secureTextEntry={true}
              style={[styles.textInput, this.state.passwordError? styles.error:null]}
              autoCorrect={false}
              value={this.state.password}
            />
            <TextInput
              maxLength={50}
              onChangeText={(name) => this.setState({ name , nameError:false})}
              onSubmitEditing={() => this.name.focus()}
              placeholder="Name"
              returnKeyType="next"
              style={[styles.textInput, this.state.nameError? styles.error:null]}
              autoCorrect={false}
              value={this.state.name}
            />
            <TextInput
              maxLength={20}
              onChangeText={(phone) => this.setState({ phone , phoneError:false})}
              placeholder="Phone"
              returnKeyType="next"
              style={[styles.textInput, this.state.phoneError? styles.error:null]}
              autoCorrect={false}
              value={this.state.phone}
            />
            <TextInput
              maxLength={20}
              onChangeText={(city) => this.setState({ city , cityError:false})}
              placeholder="City"
              returnKeyType="next"
              style={[styles.textInput, this.state.cityError? styles.error:null]}
              autoCorrect={false}
              value={this.state.city}
            />
            <TextInput
              maxLength={20}
              onChangeText={(ustate) => this.setState({ ustate, stateError:false })}
              placeholder="State"
              returnKeyType="next"
              style={[styles.textInput, this.state.stateError? styles.error:null]}
              autoCorrect={false}
              value={this.state.ustate}
            />
            <TextInput
              maxLength={200}
              onChangeText={(address) => this.setState({ address , addressError:false})}
              placeholder="Address"
              returnKeyType="next"
              style={[styles.textInput, this.state.addressError? styles.error:null]}
              autoCorrect={false}
              value={this.state.address}
            />


            <TextInput
              maxLength={20}
              onChangeText={(zipcode) => this.setState({ zipcode , zipcodeError:false})}
              placeholder="zipcode"
              returnKeyType="next"
              style={[styles.textInput, this.state.zipcodeError? styles.error:null]}
              autoCorrect={false}
              value={this.state.zipcode}
            />
            <RadioGroup
                size={24}
                thickness={2}
                color='#9575b2'
                highlightColor='#ccc8b9'
                selectedIndex={this.state.customersIndex}
                onSelect = {(index, value) => this.onSelect(index, value)}
            >
                <RadioButton value='true'> 
                    <Text>Active</Text>
                </RadioButton>
                <RadioButton value='false' color='red'>
                    <Text>Inactive</Text>
                </RadioButton>
            </RadioGroup>
              <Button
                secondary
                rounded
                style={{ alignSelf: 'stretch', marginBottom: 10, marginTop: 40 }}
                caption={ 'Save'}
                onPress={() => this.submitForm()}
              />
              <Text>
              {this.state.result}
              </Text>
          </Animated.View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'space-around',
    // paddingHorizontal: 30,
    flex: 1,
    padding: 20,
   
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
  error:{
      borderBottomColor: 'red',
      borderBottomWidth: 1,
  }
});
