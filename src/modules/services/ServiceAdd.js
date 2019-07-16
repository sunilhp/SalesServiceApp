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

export default class serviceAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
      let serviceIndex=0, message = "", ProductName="",ProductId="", ProductInfo = [],CustomerName="",CustomerId="", CustomerInfo = [],PriorityName="",PriorityId="", Priority =[], ServiceTypeId="", ServiceTypeName = "", ServiceType =[],ProductTypeName="", ProductTypeId="",ProductType=[];
      
      this.getPriority();
      this.getProductInfo();
      this.getProductType();
      this.getCustomerInfo();
      this.getServiceType();
    }
   
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
    serviceIndex:0,
    message:"",
    ProductName:"",
    ProductId:"",
    ProductInfo:[],
    CustomerName:"",
    CustomerId:"",
    CustomerInfo: [],
    PriorityName:"",
    PriorityId:"",
    Priority :[],
    ProductTypeName:"",
    ProductTypeId:"",
    ProductType :[],
    ServiceTypeName:"",
    ServiceTypeId:"",
    ServiceType :[]
  };

componentWillMount() {
  if(this.props.navigation.state.params)
  {
    this.setState({
      ProductId : this.props.navigation.state.params.ProductId,
      ProductName:this.props.navigation.state.params.ProductName,
      CustomerId : this.props.navigation.state.params.CustomerId,
      CustomerName: this.props.navigation.state.params.CustomerName,
      ProductTypeId : this.props.navigation.state.params.ProductTypeId,
      ProductTypeName: this.props.navigation.state.params.ProductTypeName,
      ServiceTypeId : this.props.navigation.state.params.ServiceTypeId,
      ServiceTypeName: this.props.navigation.state.params.ServiceTypeName,
      PriorityName: this.props.navigation.state.params.PriorityName,
      PriorityId: this.props.navigation.state.params.PriorityId,
      message : this.props.navigation.state.params.message
    });
  }
}
    
//fetching customer info from Network
getCustomerInfo = async () => {
  let messagesList = [];
  let tmpres;
  await fetch(`${c.API}/customers/get`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
        'Content-Type': 'application/json',
    },
    })
    .then((response) => response.json())
    .then((responseJson) => { 
      tmpres = responseJson;
      rs = tmpres.data;
      for(i=0;i<rs.length;i++)
      {
         var tmp = {};
         tmp.id = rs[i].id;
         tmp.name = rs[i].name;
         messagesList.push(tmp);
      }
      this.setState({ CustomerInfo:messagesList });
    })
    .catch(err => {console.warn(err) })
    .done();

}
//fetching product info from Network
getProductInfo = async () => {
  try {
      const res =  await axios.post(`${c.API}/products/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ ProductInfo:res.data.data })}
  } catch (e) {console.warn("Product fetching error",e.message)}
}
//fetching priority info from Network
getPriority = async () => {
  try {
      const res =  await axios.post(`${c.API}/service_priority/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ Priority:res.data.data })}
  } catch (e) {console.warn("Priority fetching error",e.message)}
}
//fetching ProductType info from Network
getProductType = async () => {
  try {
      const res =  await axios.post(`${c.API}/product_type/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ ProductType:res.data.data })}
  } catch (e) {console.warn("ProductType fetching error",e.message)}
}
//fetching ServiceType info from Network
getServiceType = async () => {
  try {
      const res =  await axios.post(`${c.API}/service_type/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      if (res.data.success) { this.setState({ ServiceType:res.data.data })}
  } catch (e) {console.warn("ServiceType fetching error",e.message)}
}

  submitForm(){ 
    if(this.props.navigation.state.params)
    { 
      if(this.state.ProductId == "") Toast.show("Please Choose Product Name!!");
      else if(this.state.CustomerId == "") Toast.show("Please Choose Customer Name!!");
      else if(this.state.ProductTypeId == "") Toast.show("Please Choose Product Type!!");
      else if(this.state.ServiceTypeId == "") Toast.show("Please Choose Service Type!!");
      else if(this.state.message == "") Toast.show("Please Fill Message!!");
      else{
        service = new FormData();
        service.append("id",this.props.navigation.state.params.id);
        service.append("product_id",this.state.ProductId);
        service.append("customer_id",this.state.CustomerId);
        service.append("product_type",this.state.ProductTypeId);
        service.append("service_type",this.state.ServiceTypeId);
        service.append("priority_id",this.state.PriorityId);
        service.append("message",this.state.message);
        fetch(`${c.API}/services/update`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization':'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body:service,
        })
        .then((response) => response.json())
        .then((responseJson) => {
          if(responseJson.success)
          {
              Toast.show("Service Updated")
              this.props.navigation.goBack();
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
      if(this.state.ProductId == "") Toast.show("Please Choose Product Name!!");
      else if(this.state.CustomerId == "") Toast.show("Please Choose Customer Name!!");
      else if(this.state.ProductTypeId == "") Toast.show("Please Choose Product Type!!");
      else if(this.state.ServiceTypeId == "") Toast.show("Please Choose Service Type!!");
      else if(this.state.PriorityId == "") Toast.show("Please Set Priority!!");
      else if(this.state.message == "") Toast.show("Please Fill Message!!");
      else{
        service = new FormData();
        service.append("product_id",this.state.ProductId);
        service.append("customer_id",this.state.CustomerId);
        service.append("product_type",this.state.ProductTypeId);
        service.append("service_type",this.state.ServiceTypeId);
        service.append("priority_id",this.state.PriorityId);
        service.append("message",this.state.message);
        fetch(`${c.API}/services`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Authorization':'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body:service,
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.success)
            {
                Toast.show("Service added")
                this.props.navigation.goBack();
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
              onChangeText={(message) => this.setState({ message})}
             // onSubmitEditing={() => this.message.focus()}
              placeholder="Message"
              returnKeyType="next"
             // style={[styles.textInput, this.state.messageError? styles.error:null]}
              autoCorrect={false}
              value={this.state.message}
            />
            <Text>Product Name </Text>
            <CustomPicker 
              options={renderProductInfo(this.state.ProductInfo)}
              value={(this.state.ProductInfo)?{label: this.state.ProductName ,value: this.state.ProductId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                if(value != null) 
                {
                  this.state.ProductId = value.value;
                  this.state.ProductName = value.label; 
                }
                else
                {
                  this.state.ProductId = "";
                  this.state.ProductName = ""; 
                }
              }}
            />

            <Text>Customer Name </Text>
            <CustomPicker 
              options={renderCustomer(this.state.CustomerInfo)}
              value={(this.state.CustomerInfo)?{label: this.state.CustomerName ,value: this.state.CustomerId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                if(value != null){
                  this.state.CustomerId = value.value;
                  this.state.CustomerName = value.label;
                }
                else{
                  this.state.CustomerId = "";
                  this.state.CustomerName = "";
                }
              }}
            />

            <Text>Priority  </Text>
            <CustomPicker 
              options={renderPriority(this.state.Priority)}
              value={(this.state.Priority)?{label: this.state.PriorityName ,value: this.state.PriorityId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                if(value != null){
                this.state.PriorityId = value.value;
                this.state.PriorityName = value.label;
                }
                else{
                  this.state.PriorityId = "";
                  this.state.PriorityName = "";
                }
              }}
            />

            <Text>Product Type  </Text>
            <CustomPicker 
              options={renderProductType(this.state.ProductType)}
              value={(this.state.ProductType)?{label: this.state.ProductTypeName ,value: this.state.ProductTypeId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                if(value != null){
                this.state.ProductTypeId = value.value;
                this.state.ProductTypeName = value.label;
                }
                else{
                  this.state.ProductTypeId = "";
                this.state.ProductTypeName ="";
                }
              }}
            />

            <Text>Service Type  </Text>
            <CustomPicker 
              options={renderServiceType(this.state.ServiceType)}
              value={(this.state.ServiceType)?{label: this.state.ServiceTypeName ,value: this.state.ServiceTypeId }:{}}
              getLabel={(item) => item.label}
              onValueChange={(value, i) => {
                if(value != null){
                this.state.ServiceTypeId = value.value;
                this.state.ServiceTypeName = value.label;
                }
                else{
                  this.state.ServiceTypeId = "";
                this.state.ServiceTypeName = "";
                }
              }}
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

const renderProductInfo = (ProductInfo) => {
  return ProductInfo.map(it => {
      return {value: it.id,label :it.name}
  }) 
}
const renderPriority = (Priority) => {
  return Priority.map(it => {
      return {value: it.id,label :it.name}
  }) 
}
const renderProductType = (ProductType) => {
  return ProductType.map(it => {
      return {value: it.id,label :it.name}
  }) 
}
const renderServiceType = (ServiceType) => {
  return ServiceType.map(it => {
      return {value: it.id,label :it.name}
  }) 
}
const renderCustomer = (Priority) => {
  return Priority.map(it => {
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
