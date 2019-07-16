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
import SyncStorage from 'sync-storage';
import { CustomPicker } from 'react-native-custom-picker';
import axios from 'axios';

export default class productAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
  }
   
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
    type_id :'',
    productsIndex:0,
    name:'',
    description:'',
    images:'',
    active:'',
    productTypes : [],
    typeId:'',
    typeuserRolesName:'',

    // email : '',
    // name  : '',
    // phone : '',
    // password   : '',
    // address :'',
    // city :'',
    // ustate:'',
    // zipcode:'',
    // result:'',
    // cstate: true,
    // customersIndex:0,
    // nameError : false,
    // emailError: false,
    // phoneError: false,
    // stateError: false,
    // addressError: false,
    // cityError: false,
    // passwordError: false,
    // zipcodeError: false
  };

static navigatioOptions = ({navigation}) => {
  return{ title: "Edit Product" }
}

  onSelect(index, value){
    this.setState({
        cstate : value
    })
}

navtitle =()=>{
  this.props.navigation.setParams({
        title:"Update Product"

     })
}
  componentWillMount() {
this.navtitle();
    if(this.props.navigation.state.params)
    {
        if(this.props.navigation.state.params.status == true)
        {
            this.setState({ productsIndex :0});
        }
        else
        {
            this.setState({ productsIndex : 1});
        }
        this.setState({
          type_id : this.props.navigation.state.params.type_id,
          name : this.props.navigation.state.params.name,
          description : this.props.navigation.state.params.description,
          images : this.props.navigation.state.params.images,
          active : this.props.navigation.state.params.active,
          typeId: this.props.navigation.state.typeId,
          typeName: this.props.navigation.state.typeName,
          //status: this.state.parameters.status,
        });
    }
    else
        this.setState({ productsIndex :0});

        this.getProductTypes();
    
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

  //fetching user roles from API
  getProductTypes = async () => {
    try {
        const res =  await axios.post(`${C.API}/product_type/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
        if (res.data.success) { this.setState({ productTypes: res.data.data })}
    } catch (e) {console.warn(e.message)}
  }
  
  submitForm(){ 
    if(this.props.navigation.state.params)
    {

        let product = {
            id: this.props.navigation.state.params.id,
            name:  this.state.name,
            type_id : this.state.type_id,
            description : this.state.description,
            images : this.state.images,
            active : this.state.active,
            typeId: this.state.typeId,
            typeName: this.state.typeName
        };
    
        fetch(`${C.API}/products/update`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
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
                    Toast.show("Product Updated")
                    
                    this.setState({name: ''});
                    this.setState({type_id: ''});
                    this.setState({description: ''});
                    this.setState({images:''});
                    this.setState({active:''});
                    this.setState({typeId:''});
                    this.setState({typeName:''});
                   
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
        let product = {
            name:  this.state.name,
            type_id : this.state.type_id,
            description : this.state.description,
            images : this.state.images,
            active : this.state.active,
            typeId: this.state.typeId,
            typeName: this.state.typeName
        };
    
        fetch(`${C.API}/products`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
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
                    Toast.show("Product added")
                   
                    this.setState({name: ''});
                    this.setState({type_id: ''});
                    this.setState({description: ''});
                    this.setState({images: ''});
                    this.setState({active:''});
                    this.setState({typeId:''});
                    this.setState({typeName:''});
                   
                    this.props.navigation.goBack();
                }
                else
                {
                    console.warn(responseJson)
                    // if(responseJson.message == "E-mail already exists")
                    // {
                    //   Toast.show(responseJson.message);
                    // }
                    // else if(responseJson.message.email != "required")
                    // {
                    //   Toast.show(responseJson.message.email.message)
                    // }
                  
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
              maxLength={50}
              onChangeText={(name) => this.setState({ name , nameError:false})}
              onSubmitEditing={() => this.name.focus()}
              placeholder="Name"
              returnKeyType="next"
              style={[styles.textInput, this.state.nameError? styles.error:null]}
              autoCorrect={false}
              value={this.state.name}
            />
            <Text style={styles.textLabel}>Product Type</Text>
            <CustomPicker 
              options={renderProductType(this.state.productTypes)}
             
              value={(this.state.parameters)?{label: this.state.typeName ,value: this.state.typeId }:{}}
              
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                this.state.typeId = value.value;
                this.state.typeName = value.label;
                 // props.onChange('selectedServiceStatus', { id: value.value, name: value.label })
              }}
            />
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder="Description"
              returnKeyType="next"
              style={[styles.textInput, this.state.nameError? styles.error:null]}
              autoCorrect={false}
              onChangeText={(text) => this.setState({description})}
              value={this.state.description}/>
            <Text style={styles.textLabel}>Status</Text>  
            <RadioGroup
                size={24}
                thickness={2}
                color='#9575b2'
                highlightColor='#ccc8b9'
                selectedIndex={this.state.productsIndex}
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
const renderProductType = (userRolesList) => {
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
