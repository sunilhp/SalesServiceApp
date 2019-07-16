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
import c from '../../../Constants';
import { TextInput, Button } from '../../common';
import Toast from 'react-native-simple-toast'
import { StackNavigator } from 'react-navigation';
import axios from 'axios';
import SyncStorage from 'sync-storage';
import { CustomPicker } from 'react-native-custom-picker';
import FormData from "form-data";

export default class leadAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
      let name="",email="",phone="",city="",state="",address="",message="";
    }
   
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
    name:"",
    email:"",
    phone:"",
    city:"",
    state:"",
    address:"",
    message:""
  };
  
componentWillMount() {
  if(this.props.navigation.state.params)
  {
    this.setState({
    name : this.props.navigation.state.params.name,
    email:this.props.navigation.state.params.email,
    phone : this.props.navigation.state.params.phone,
    city: this.props.navigation.state.params.city,
    state : this.props.navigation.state.params.state,
    address: this.props.navigation.state.params.address,
    message : this.props.navigation.state.params.message
    });
  }
}
    
  submitForm(){ 
    if(this.props.navigation.state.params)
    { 
      if(this.state.name == "") Toast.show("Please Fill Name!!");
      else if(this.state.email == "") Toast.show("Please Fill Email");
      else if(this.state.city == "") Toast.show("Please Fill City");
      else if(this.state.state == "") Toast.show("Please Fill State");
      else if(this.state.address == "") Toast.show("Please Fill Address");
      else if(this.state.phone == "") Toast.show("Please Fill Phone no");
      else if(this.state.message == "") Toast.show("Please Fill Message");
      else{
        let lead = {
          id:this.props.navigation.state.params.id,
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          city: this.state.city,
          state: this.state.state,
          address: this.state.address,
          message: this.state.message
        }
        fetch(`${c.API}/leads/update`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization':'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(lead),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.success)
          {
              Toast.show("Lead Updated")
              //this.props.navigation.goBack();
              this.props.navigation.navigate({
                routeName: 'Leads',
                params: { 
                  refreshState:1
                }
              });
          }
          else
          {
            Toast.show(responseJson)
          }
        })
        .catch(err => {console.warn(err) })
        .done();
    }
  }
    else
    {
      if(this.state.name == "") Toast.show("Please Fill Name!!");
      else if(this.state.email == "") Toast.show("Please Fill Email");
      else if(this.state.city == "") Toast.show("Please Fill City");
      else if(this.state.state == "") Toast.show("Please Fill State");
      else if(this.state.address == "") Toast.show("Please Fill Address");
      else if(this.state.phone == "") Toast.show("Please Fill Phone no");
      else if(this.state.message == "") Toast.show("Please Fill Message");
      else{
        let lead = {
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          city: this.state.city,
          state: this.state.state,
          address: this.state.address,
          message: this.state.message
        }
        
         fetch(`${c.API}/leads`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'Bearer '+SyncStorage.get('LOGIN_DETAILS')
          },
          body:JSON.stringify(lead),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            //console.warn(responseJson);
            if(responseJson.success)
            {
                Toast.show("Lead added");
                this.props.navigation.navigate({
                  routeName: 'Leads',

                });
            }
            else
            {
              Toast.show(responseJson)
            }
          })
          .catch(err => {console.warn("error is ",err) })
          .done();
      }
    }
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
              onChangeText={(name) => this.setState({ name})}
              placeholder="Name"
              returnKeyType="next"
              autoCorrect={false}
              value={this.state.name}
            />
            <TextInput
              maxLength={50}
              onChangeText={(email) => this.setState({ email})}
              placeholder="Email"
              returnKeyType="next"
              autoCorrect={false}
              value={this.state.email}
            />
            <TextInput
              maxLength={50}
              onChangeText={(phone) => this.setState({ phone})}
              placeholder="Phone"
              returnKeyType="next"
              autoCorrect={false}
              value={this.state.phone}
            />
            <TextInput
              maxLength={50}
              onChangeText={(city) => this.setState({ city})}
              placeholder="City"
              returnKeyType="next"
              autoCorrect={false}
              value={this.state.city}
            />
            <TextInput
              maxLength={50}
              onChangeText={(state) => this.setState({ state})}
              placeholder="State"
              returnKeyType="next"
              autoCorrect={false}
              value={this.state.state}
            />
            <TextInput
              maxLength={50}
              onChangeText={(address) => this.setState({ address})}
              placeholder="Address"
              returnKeyType="next"
              autoCorrect={false}
              value={this.state.address}
            />
            <TextInput
              maxLength={50}
              onChangeText={(message) => this.setState({ message})}
              placeholder="Message"
              returnKeyType="next"
              autoCorrect={false}
              value={this.state.message}
            />
            
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
