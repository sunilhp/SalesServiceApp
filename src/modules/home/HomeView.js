import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import { fonts, colors } from './../../styles';
import { Button} from '../../common';
import SyncStorage from 'sync-storage';
import { StackActions ,NavigationActions } from 'react-navigation'
import axios from 'axios';
import C from "../../../Constants";

const allIcon = require('../../../assets/images/service/service-all.png');
const newIcon = require('../../../assets/images/service/service-new.png');
const urgentIcon = require('../../../assets/images/service/service-urgent.png');
const pendingIcon = require('../../../assets/images/service/service-pending.png');
const inprogressIcon = require('../../../assets/images/service/service-inprogress.png');
const completeIcon = require('../../../assets/images/service/service-complete.png');
const hotIcon = require('../../../assets/images/service/leads-hot.png');
const coldIcon = require('../../../assets/images/service/leads-cold.png');
const deadIcon = require('../../../assets/images/service/leads-dead.png');

class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);

    var token = SyncStorage.get('LOGIN_DETAILS');
    if(token == null || token == undefined)
    {
      const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Auth'})
      ]
      })
      this.props.navigation.dispatch(resetAction)
    }
    else
    {
      this.getServiceCount();
      this.getLeadCount();
    }

    let serviceCount ={},leadCount={};
    this.state = {
      serviceCount,leadCount
    } 

  }

  componentWillMount(){
    // this.getServiceCount();
    // this.getLeadCount();
  }
 
  getServiceCount = async () => {
    try {
      
        const res =  await axios.get(`${C.API}/services/count`);
        if (res.data.success) { 
          this.setState({ serviceCount: res.data.data });
        }
    } catch (e) {
      console.warn("service count error ",e.message)
    }
  }
  getLeadCount = async () => {
    try {
        const res =  await axios.get(`${C.API}/leads/count`);
        if (res.data.success) { 
          this.setState({ leadCount: res.data.data })
      }
    } catch (e) {
      console.warn("lead count error ",e.message)
    }
  }

  

  render() {
    return(  <ScrollView
    style={styles.container}
    contentContainerStyle={{ paddingBottom: 20 }}
    >
    <View style={styles.componentsSection}>
      <Text style={styles.componentSectionHeader}>Services Jobs</Text>
      <View style={styles.row}>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Service', params: { tabIndex: 0}})} 
    style={styles.item}>
      <Image
      resizeMode="contain"
      source={allIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>All</Text>
      <Text style={styles.itemCount}>{this.state.serviceCount.total}</Text>
    </TouchableOpacity>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Service', params: { tabIndex: 1}})}
    style={styles.item}
    >
      <Image
      resizeMode="contain"
      source={newIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>New</Text>
      <Text style={styles.itemCount}>{this.state.serviceCount.new}</Text>
    </TouchableOpacity>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Service', params: { tabIndex: 0}})}
    style={styles.item}
    ramesh="1">
    <Image
    resizeMode="contain"
    source={urgentIcon}
    style={styles.itemImage}
    />
    <Text style={styles.itemText}>Unassigned</Text>
    <Text style={styles.itemCount}>{this.state.serviceCount.unassigned}</Text>
    </TouchableOpacity>
    </View>
      <View style={styles.row}>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Service', params: { tabIndex: 3}})}
    style={styles.item}>
    <Image
    resizeMode="contain"
    source={pendingIcon}
    style={styles.itemImage}
    />
    <Text style={styles.itemText}>Pending</Text>
    <Text style={styles.itemCount}>{this.state.serviceCount.pending}</Text>
    </TouchableOpacity>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Service', params: { tabIndex: 2}})}
    style={styles.item}
    >
    <Image
    resizeMode="contain"
    source={inprogressIcon}
    style={styles.itemImage}
    />
    <Text style={styles.itemText}>In Progress</Text>
    <Text style={styles.itemCount}>{this.state.serviceCount.progress}</Text>
    </TouchableOpacity>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Service', params: { tabIndex: 4}})}
    style={styles.item}
    >
    <Image
    resizeMode="contain"
    source={completeIcon}
    style={styles.itemImage}
    />
    <Text style={styles.itemText} style={{ fontSize: 10, color: 'green' }}>Completed</Text>
    <Text style={styles.itemCount}>{this.state.serviceCount.completed}</Text>
    </TouchableOpacity>
    </View>
    </View>
    <View style={styles.componentsSection}>
      <Text style={styles.componentSectionHeader}>Sales Leads</Text>
      <View style={styles.row}>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Leads',params: { tabIndex: 0} })}
    style={styles.item}>
      <Image
      resizeMode="contain"
      source={allIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>All</Text>
      <Text style={styles.itemCount}>{this.state.leadCount.total}</Text>
    </TouchableOpacity>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Leads',params: { tabIndex: 1} })}
    style={styles.item}
    >
      <Image
      resizeMode="contain"
      source={newIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>New</Text>
      <Text style={styles.itemCount}>{this.state.leadCount.new}</Text>
    </TouchableOpacity>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Leads',params: { tabIndex: 0} })}
    style={styles.item}
    >
    <Image
    resizeMode="contain"
    source={hotIcon}
    style={styles.itemImage}
    />
    <Text style={styles.itemText}>Unassigned</Text>
    <Text style={styles.itemCount}>{this.state.leadCount.unassigned}</Text>
    </TouchableOpacity>
    </View>
      <View style={styles.row}>
        <TouchableOpacity
     onPress={() => this.props.navigation.navigate({ routeName: 'Leads',params: { tabIndex: 3} })}
    style={styles.item}>
    <Image
    resizeMode="contain"
    source={coldIcon}
    style={styles.itemImage}
    />
    <Text style={styles.itemText}>Dead</Text>
    <Text style={styles.itemCount}>{this.state.leadCount.dead}</Text>
    </TouchableOpacity>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Leads',params: { tabIndex: 4} })}
    style={styles.item}
    >
    <Image
    resizeMode="contain"
    source={deadIcon}
    style={styles.itemImage}
    />
    <Text style={styles.itemText}>Deal Done</Text>
    <Text style={styles.itemCount}>{this.state.leadCount.deal_done}</Text>
    </TouchableOpacity>
        <TouchableOpacity
    onPress={() => this.props.navigation.navigate({ routeName: 'Leads',params: { tabIndex: 5} })}
    style={styles.item}
    >
    <Image
    resizeMode="contain"
    source={completeIcon}
    style={styles.itemImage}
    />
    <Text style={styles.itemText}>Complete</Text>
    <Text style={styles.itemCount}>{this.state.leadCount.completed}</Text>
    </TouchableOpacity>
    </View>
    <View style={styles.row}>
      <TouchableOpacity
       onPress={() => this.props.navigation.navigate({ routeName: 'Leads',params: { tabIndex: 2} })}
      style={styles.item}
      >
      <Image
      resizeMode="contain"
      source={hotIcon}
      style={styles.itemImage}
      />
      <Text style={styles.itemText}>In Progress</Text>
      <Text style={styles.itemCount}>{this.state.leadCount.progress}</Text>
      </TouchableOpacity>
    </View>

    </View>      
  </ScrollView>
    
    );//let loginData = <Text> Please log in First</Text>
    // return (
    //   <View>
    //             {SyncStorage.get('LOGIN_DETAILS') ? homeData : loginData}
    //   </View>
    // );
  }
}

export default HomeScreen;


const styles = StyleSheet.create({
  componentSectionHeader: {
    fontFamily: fonts.primaryRegular,
    color: '#686868',
    fontSize: 20,
    marginBottom: 10,
    paddingHorizontal: 15,
    
    
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
    paddingBottom: 20,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 100,
    paddingVertical: 10,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 5,
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

  }
});