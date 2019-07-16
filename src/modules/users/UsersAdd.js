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
  DatePickerIOS,
} from 'react-native';
import C from '../../../Constants';
import { TextInput, Button } from '../../common';
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button'
import Toast from 'react-native-simple-toast';
import SyncStorage from 'sync-storage';
import { CustomPicker } from 'react-native-custom-picker';
import axios from 'axios'


export default class usersAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
   // let parameters = this.props.navigation.state.params;
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
    usersIndex:0,
    nameError : false,
    emailError: false,
    phoneError: false,
    stateError: false,
    addressError: false,
    cityError: false,
    passwordError: false,
    zipcodeError: false,
    userRoles : [],
    userRoleId:'',
    userRoleName:'',
    dob: new Date(),
    doj: new Date(),
    parameters: this.props.navigation.state.params
  };

static navigatioOptions = ({navigation}) => {
  return{ title: "Edit Users" }
}

  onSelect(index, value){
    this.setState({
        cstate : value
    })
}

navtitle =()=>{
  this.props.navigation.setParams({
        title:"Update Users"

     })
}
  componentWillMount() {
    this.navtitle();

    if(this.state.parameters)
    {
      if(this.state.parameters.status == true)
      {
          this.setState({ usersIndex :0});
      }
      else
      {
          this.setState({ usersIndex : 1});
      }
      this.setState({
        name: this.state.parameters.name,
        email: this.state.parameters.email,
        phone: this.state.parameters.phone,
        address: this.state.parameters.address,
        password: this.state.parameters.password, 
        dob: this.state.parameters.dob,
        doj:this.state.parameters.doj,
        role_id:this.state.parameters.roleId,
        status: this.state.parameters.status,

        userRoleId:this.state.parameters.roleId,
        userRoleName:this.state.parameters.roleName
      });
    }
    else
      this.setState({ usersIndex :0});
    //calling function to fetch user roles
    this.getUserRoles();

    this.keyboardDidShowListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidShow', ios: 'keyboardWillShow' }),
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      Platform.select({ android: 'keyboardDidHide', ios: 'keyboardWillHide' }),
      this._keyboardDidHide.bind(this),
    );
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
//fetching user roles from API
  getUserRoles = async () => {
    try {
        const res =  await axios.post(`${C.API}/user_roles/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
        if (res.data.success) { this.setState({ userRoles: res.data.data })}
    } catch (e) {console.warn(e.message)}
}

  submitForm(){ 
    if(this.state.parameters){
        var pwd = "";
        if(this.state.password == "")
            pwd = this.state.parameters.password;
        else
            pwd = this.state.password;
        let user = {
            id: this.state.parameters.id,
            name:  this.state.name,
            email:  this.state.email,
            phone:  this.state.phone,
            address:  this.state.address,
            password:  pwd, 
            dob: this.state.dob,
            doj:this.state.doj,
            role_id:this.state.userRoleId,
            status: this.state.cstate
        };
        
        fetch(`${C.API}/users/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .then((response) => response.json())
            .then((responseJson) => {
        
                if(!responseJson.status){

                    // if(responseJson.message.name){
                    //     this.setState({ nameError: true });
                    // }
                    // if(responseJson.message.city){
                    //     this.setState({ cityError: true });
                    // }
                    // if(responseJson.message.state){
                    //     this.setState({ stateError: true });
                    // }
                    // if(responseJson.message.email){
                    //     this.setState({ emailError: true });
                    // }
                    // if(responseJson.message.password){
                    //     this.setState({ passwordError: true });
                    // }
                    // if(responseJson.message.phone){
                    //     this.setState({ phoneError: true });
                    // }
                    // if(responseJson.message.address){
                    //     this.setState({ addressError: true });
                    // }
                    // if(responseJson.message.zipcode){
                    //     this.setState({ zipcodeError: true });
                    // }
                    Toast.show("User Updated")
                }
                else
                  Toast.show("Something Went Wrong")
                    // this.setState({email : ''});
                    // this.setState({name  : ''});
                    // this.setState({phone : ''});
                    // this.setState({password   : ''});
                    // this.setState({address :''});
                    // this.setState({city :''});
                    // this.setState({ustate:''});
                    // this.setState({zipcode:''});
            })
            .catch(err => {console.warn(err) })
            .done();
            // this.props.navigation.navigate({
            //     routeName: 'Customer',
               
            //   })
            this.props.navigation.goBack();
    }
    else{
      if (this.state.name  == "" || this.state.email == "" || this.state.phone == "" || this.state.address == "" || this.state.password == "" || this.state.doj == "")
        Toast.show("Please Fill all the Fields !!")
      else {
        let user = {
            name:  this.state.name,
            email:  this.state.email,
            phone:  this.state.phone,
            address:  this.state.address,
            password:  this.state.password, 
            dob: this.state.dob,
            doj:this.state.doj,
            role_id:this.state.userRoleId,
            status: this.state.cstate
        };
        fetch(`${C.API}/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
            })
            .then((response) => response.json())
            .then((responseJson) => {
        
                // if(!responseJson.status){

                //     if(responseJson.message.name){
                //         this.setState({ nameError: true });
                //     }
                //     if(responseJson.message.city){
                //         this.setState({ cityError: true });
                //     }
                //     if(responseJson.message.state){
                //         this.setState({ stateError: true });
                //     }
                //     if(responseJson.message.email){
                //         this.setState({ emailError: true });
                //     }
                //     if(responseJson.message.password){
                //         this.setState({ passwordError: true });
                //     }
                //     if(responseJson.message.phone){
                //         this.setState({ phoneError: true });
                //     }
                //     if(responseJson.message.address){
                //         this.setState({ addressError: true });
                //     }
                //     if(responseJson.message.zipcode){
                //         this.setState({ zipcodeError: true });
                //     }
                // }
                if(responseJson.success)
                {
                    Toast.show("User added")
                    // this.setState({email : ''});
                    // this.setState({name  : ''});
                    // this.setState({phone : ''});
                    // this.setState({password   : ''});
                    // this.setState({address :''});
                    // this.setState({city :''});
                    // this.setState({ustate:''});
                    // this.setState({zipcode:''});
                    this.props.navigation.goBack();
                }
                else
                {
                    
                    if(responseJson.message == "E-mail already exists")
                    {
                      Toast.show(responseJson.message);
                    }
                    else if(responseJson.message.email != "required")
                    {
                      Toast.show(responseJson.message.email.message)
                    }
                    else
                    {
                      Toast.show("Please Fill all the fields First!!");
                    }
                }
            })
            .catch(err => {console.warn(err) })
            .done();
      }    
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
              maxLength={20}
              onChangeText={(phone) => this.setState({ phone , phoneError:false})}
              placeholder="Phone"
              returnKeyType="next"
              style={[styles.textInput, this.state.phoneError? styles.error:null]}
              autoCorrect={false}
              value={this.state.phone}
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
            <Text style={styles.textLabel}>User Role</Text>
            <CustomPicker style={{color:'white'}}
              options={renderUserRoles(this.state.userRoles)}
              value={(this.state.parameters)?{label: this.state.userRoleName ,value: this.state.userRoleId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.userRoleId = value.value;
                this.state.userRoleName = value.label;
                 // props.onChange('selectedServiceStatus', { id: value.value, name: value.label })
              }}
            />
            <Text style={styles.textLabel}>Date of Birth</Text>
            <DatePickerIOS
              date={new Date(this.state.dob)}
              mode = "date"
             // minuteInterval={10}
              onDateChange={(date)=>{
                this.state.dob = date;
                 // props.onChange('appointmentTime',date)
              }}
            />
            <Text style={styles.textLabel}> Date of Joining</Text>
            <DatePickerIOS
              date={new Date(this.state.doj)}
              minuteInterval={10}
              mode="date"
              onDateChange={(date)=>{
                this.state.doj = date;
                 // props.onChange('appointmentTime',date)
              }}
            />


            <RadioGroup
                size={24}
                thickness={2}
                color='#9575b2'
                highlightColor='#ccc8b9'
                selectedIndex={this.state.usersIndex}
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

const renderUserRoles = (userRolesList) => {
  return userRolesList.map(it => {
      return {value: it.id,label :it.name}
  }) 
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
  textLabel: {
    alignSelf: 'stretch',
    marginTop: 20,
    color: '#fff'
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
