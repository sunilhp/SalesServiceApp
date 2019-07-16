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
  Dimensions,
} from 'react-native';
import c from '../../../Constants';
import { TextInput, Button } from '../../common';
import { colors, fonts } from '../../styles';
import {RadioGroup,RadioButton} from 'react-native-flexi-radio-button'
import Toast from 'react-native-simple-toast';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import { CustomPicker } from 'react-native-custom-picker';
import FormData from "form-data";


export default class ComplaintAddScreen extends React.Component {
 
  constructor(props) {

      super(props);
      let serviceIndex=0,  
      CustomerId="",
      CustomerName="",
      CustomerEmail="",
      CustomerPhone="",
      CustomerCity="",
      CustomerState="",
      CustomerAddress="",
      CustomerZipcode="",
      CustomerPassword="", 
      message = "",comlaintDate="", ProductName="",ProductId="", ProductInfo = [],PriorityName="",PriorityId="", Priority =[], ServiceTypeId="", ServiceTypeName = "", ServiceType =[],ProductTypeName="", ProductTypeId="",ProductType=[];
  }
   
  state = {
    anim: new Animated.Value(0),
    // Current visible form
    isKeyboardVisible: false,
    CustomerId:"",
    CustomerName:"",
    CustomerEmail:"",
    CustomerPhone:"",
    CustomerCity:"",
    CustomerState:"",
    CustomerAddress:"",
    CustomerZipcode:"",
    CustomerPassword:"", 
    message:"",
    phone:"",
    comlaintDate:"",
    ProductName:"",
    ProductId:"",
    ProductInfo:[],
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

//fetching customer info from Network
getCustomerInfo = async (ph,uname,uemail) => {
  let messagesList = [];
  let tmpres;
  let phonenumber ={};
  if(ph != " " || ph !="") phonenumber = {phone:ph}
  await fetch(`${c.API}/customers/get`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(phonenumber),
    })
    .then((response) => response.json())
    .then((responseJson) => { 
      tmpres = responseJson;
      rs = tmpres.data;
      if(rs.length>0){
        this.setState({ 
          CustomerId:rs[0].id,
          CustomerName:rs[0].name,
          CustomerEmail:rs[0].email,
          CustomerPhone:rs[0].phone,
          CustomerCity:rs[0].city,
          CustomerState:rs[0].state,
          CustomerAddress:rs[0].address,
          CustomerZipcode:rs[0].zipcode,
          CustomerPassword:"Password is Hidden",
        });
      }
      else{
        this.setState({ 
          CustomerName:uname,
          CustomerEmail:uemail,
          CustomerPhone:ph+""
        });
      }
    })
    .catch(err => {console.warn("error : ",err) })
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


componentWillMount() {
  if(this.props.navigation.state.params)
  {
    this.setState({
      name:this.props.navigation.state.params.name,
      email:this.props.navigation.state.params.email,
      phone:this.props.navigation.state.params.phone,
      comlaintDate:this.props.navigation.state.params.created_on,
      message : this.props.navigation.state.params.message
    });
  } 
  this.getPriority();
  this.getProductInfo();
  this.getProductType();
  this.getCustomerInfo(this.props.navigation.state.params.phone,this.props.navigation.state.params.name,this.props.navigation.state.params.email,);
  this.getServiceType();  
}

  async submitForm(){ 

  if(this.state.CustomerId =="")
  {
    if(this.state.CustomerName == "" || this.state.CustomerName == " ") return Toast.show("Please Fill Customer Name.");
    if(this.state.CustomerEmail == "" || this.state.CustomerEmail == " ") return Toast.show("Please Fill Customer Email.");
    if(this.state.CustomerPhone == "" || this.state.CustomerPhone == " ") return Toast.show("Please Fill Customer Phone.");
    if(this.state.CustomerAddress == "" || this.state.CustomerAddress == " ") return Toast.show("Please Fill Customer Address.");
    if(this.state.CustomerCity == "" || this.state.CustomerCity == " ") return Toast.show("Please Fill Customer City.");
    if(this.state.CustomerState == "" || this.state.CustomerState == " ") return Toast.show("Please Fill Customer State.");
    if(this.state.CustomerZipcode == "" || this.state.CustomerZipcode == " ") return Toast.show("Please Fill Customer Zipcode.");
    if(this.state.CustomerPassword == "" || this.state.CustomerPassword == " ") return Toast.show("Please Fill Customer Password.");

    let user = {
      name:  this.state.CustomerName,
      email:  this.state.CustomerEmail,
      phone:  this.state.CustomerPhone,
      address:  this.state.CustomerAddress,
      password:  this.state.CustomerPassword,
      city:  this.state.CustomerCity,
      state:  this.state.CustomerState,
      zipcode:  this.state.CustomerZipcode,
      status: true
  };

  fetch(`${c.API}/customers`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson.success)
          {
            this.setState({CustomerId:responseJson.data._id});
          }
          else
          {
            Toast.show("Error While adding Customer!!!");
          }
      })
      .catch(err => {
        Toast.show("Something went wrong while adding Customer...");
      })
      .done();
  }
  if(this.state.ProductId == "" || this.state.ProductId == " ") return Toast.show("Please Choose Product Name");
  if(this.state.ProductTypeId == "" || this.state.ProductTypeId == " ") return Toast.show("Please Choose Product Type");
  if(this.state.ServiceTypeId == "" || this.state.ServiceTypeId == " ") return Toast.show("Please Choose Service Type");
  if(this.state.PriorityId == "" || this.state.PriorityId == " ") return Toast.show("Please Choose Priority");

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
        
          Toast.show("Service added");


          fetch(`${c.API}/complaints/delete`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"Id":this.props.navigation.state.params.id}),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.success)
                {
                  this.props.navigation.goBack();
                }
                else
                {
                  Toast.show("Error While Disabling Complaint!!!");
                }
            })
            .catch(err => {
              Toast.show("Something went wrong while Disabling Complaint...");
            })
            .done();
      }
      else
      {
        Toast.show(responseJson)
      }
    })
    .catch(err => {console.warn(err) })
    .done();
       
           
  }

  render() {
    
    return (
     
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* Complaint information view */}
        
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end',}}>
            <Text style={styles.componentSectionHeader}>Complaint Information</Text>
            <Button
                    style={{width:120,padding:0,height:25}}
                    primary
                    bordered
                    caption="Edit"
                    onPress={() =>
                      this.props.navigation.navigate({
                        routeName: 'LeadAdd',
                        params: {
                          id: itemParams.id,
                          name : itemParams.name,
                          email:itemParams.email,
                          phone : itemParams.phone,
                          city: itemParams.city,
                          state : itemParams.state,
                          address: itemParams.address,
                          message : itemParams.message
                        },
                      })
                      }
                />
          </View>
          <View style={styles.row}>
          <TouchableOpacity style={styles.itemTwoContainer}>
            <View>
              <Text style={styles.itemTwoPrice}>Name : {this.state.name}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.itemTwoSubTitle}>{this.state.comlaintDate}</Text>
                <View style={styles.itemThreeMetaContainer}>
                  <Text style={styles.itemTwoSubTitle}>{this.state.phone}</Text>
                </View>
              </View>
              <Text style={styles.itemTwoSubTitle}>Email : {this.state.email}</Text>
              <Text style={styles.itemTwoSubTitle}>message : {this.state.message}</Text>
            </View>    
          </TouchableOpacity>
          </View>
        </View>

        {/* Customer info View */}
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent:'center',}}>
            <Text style={styles.componentSectionHeader}> Customer Information </Text> 
          </View> 
          <View style={styles.row}>
            <TouchableOpacity > 
          
            <TextInput
            style={styles.fieldStyles}
            maxLength={50}
            onChangeText={(CustomerName) => this.setState({ CustomerName})}
            placeholder="Name"
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.CustomerName}
           />
           <TextInput
            style={styles.fieldStyles}
            maxLength={50}
            onChangeText={(CustomerEmail) => this.setState({ CustomerEmail})}
            placeholder="Email"
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.CustomerEmail}
           />
           <TextInput
            style={styles.fieldStyles}
            maxLength={50}
            onChangeText={(CustomerPhone) => this.setState({ CustomerPhone})}
            placeholder="Phone"
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.CustomerPhone}
           />
           <TextInput
            style={styles.fieldStyles}
            maxLength={50}
            onChangeText={(CustomerAddress) => this.setState({ CustomerAddress})}
            placeholder="Address"
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.CustomerAddress}
           />
           <TextInput
            style={styles.fieldStyles}
            maxLength={50}
            onChangeText={(CustomerCity) => this.setState({ CustomerCity})}
            placeholder="City"
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.CustomerCity}
           />
           <TextInput
            style={styles.fieldStyles}
            maxLength={50}
            onChangeText={(CustomerState) => this.setState({ CustomerState})}
            placeholder="State"
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.CustomerState}
           />
           <TextInput
            style={styles.fieldStyles}
            maxLength={50}
            onChangeText={(CustomerZipcode) => this.setState({ CustomerZipcode})}
            placeholder="Zipcode"
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.CustomerZipcode}
           />
           <TextInput
            style={styles.fieldStyles}
            maxLength={50}
            onChangeText={(CustomerPassword) => this.setState({ CustomerPassword})}
            placeholder="Password"
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.CustomerPassword}
           />
          </TouchableOpacity>
          </View>
        </View>
      

        {/* product Name view */}
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            <Text style={styles.componentSectionHeader}>Product Name</Text>
          </View>
          <View style={styles.row}>
              <CustomPicker 
              style={styles.customPickerStyle}
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
          </View>
        </View>

        {/* product type view */}
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            <Text style={styles.componentSectionHeader}>Product Type</Text>
          </View>
          <View style={styles.row}>
              <CustomPicker 
              style={styles.customPickerStyle}
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
            </View>    
        </View>

        {/* Service Type view */}
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            <Text style={styles.componentSectionHeader}>Service Type</Text>
          </View>
          <View style={styles.row}>
            <CustomPicker 
              style={styles.customPickerStyle}
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
            </View> 
        </View>

        {/* Priority view */}
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            <Text style={styles.componentSectionHeader}>Priority</Text>
          </View>
          <View style={styles.row}>
            <CustomPicker 
              style={styles.customPickerStyle}
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
            </View> 
        </View>

        {/* Message view */}
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent: 'center',}}>
            <Text style={styles.componentSectionHeader}>Service Message</Text>
          </View>
          <View style={styles.row}>
          <TextInput
            style={styles.fieldStyles}
            onChangeText={(message) => this.setState({ message})}
            placeholderTextColor="#000"
            returnKeyType="next"
            autoCorrect={false}
            value={this.state.message}
           />
          </View> 
        </View>

        <Button
              secondary
              rounded
              style={{ alignSelf: 'center', marginBottom: 10, marginTop: 40 }}
              caption={ 'Save'}
              onPress={() => this.submitForm()}
            />
        
      </ScrollView>
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


const styles = StyleSheet.create({
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
    textAlign:"center",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  textStyletop: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 15,
    textAlign:"left",
  },
  container: {
    flex: 1,
    backgroundColor: colors.bluish,
    paddingTop: 10,
  },
  componentsSection: {
    backgroundColor: colors.white,
    padding: 5,
    margin: 10,
    borderRadius: 5,
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
   // marginRight: 25
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom:15,
    padding:10,
    alignItems:'center',
  },
  itemText: {
    color: colors.primary,
    fontFamily: fonts.primary,
  },
  itemImage: {
    height: 35,
  },
  itemCount: {
    fontSize: 12,
    backgroundColor: colors.white,
    padding: 5,
    borderRadius: 5,
    color:'red',

  },


  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  customPickerStyle:{
    flex: 1,
    width: Dimensions.get('window').width - 50,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: colors.black,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  remarkTitle: {
    color: colors.black,
    fontFamily: fonts.primaryBold,
    fontSize: 17,
  },
  itemTwoSubTitle: {
    color: colors.black,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  fieldStyles:{
    color: colors.black,
    paddingLeft:4,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
    alignSelf: 'stretch',
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
    width: Dimensions.get('window').width -50,
  },
  
  itemTwoPrice: {
    color: colors.black,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },


  
  componentsSection: {
    backgroundColor: colors.white,
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  
  carouselContainer: {
        marginVertical:0,
        paddingHorizontal: 0,
      },
});
