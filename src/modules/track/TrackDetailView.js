import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome';
import C from '../../../Constants';

import { colors, fonts } from '../../styles';
import { Dropdown, Button, TextInput } from '../../common';
import { Text, Title, Caption } from '../../common/StyledText';
import Header from './Header';
import SyncStorage from 'sync-storage';

class TrackHistory extends React.Component {

  constructor(props) {

    super(props);
 // let parameters = this.props.navigation.state.params;
}
  state = { 
    jobdetails:[]
   }

//fetching history from network
//pass id in params
  async componentDidMount() {
    let jobdetails = [];
    try
    {      
      let jobdetails =  await axios.get(`${C.API}/track/executives`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      jobdetails = jobdetails.data.data;
      this.setState({ jobdetails:jobdetails});
    }
    catch(error)
    {
      console.warn("ERROR IS ",error);
    }
    
  }


  //service history 
  renderServiceHistoryInformation = () => {
    const jobdetails = this.state.jobdetails;
    console.warn(jobdetails)
    return jobdetails.map((it, i) => {
      return (
        <TouchableOpacity
          style={styles.itemTwoContainer}
          onPress={() =>
            this.props.navigation.navigate({
              routeName: 'TrackExecutive',
              params: {
                ...it,
              },
            })
          }
        > 
        <View style={{width:Dimensions.get('window').width-50,flex: 1,
        borderColor: colors.primaryLight,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom:15,
        padding:10,
        alignItems:'center',}}>
        <Text style={styles.itemTwoSubTitle}>Job Status: {it.job} and status: {it.status}</Text>
        <Text style={styles.itemTwoSubTitle}>Address: {it.address.address}, {it.address.city},  {it.address.state}</Text>

        <Text style={styles.itemTwoSubTitle}>{it.address.name}</Text>
        <Text style={styles.itemTwoSubTitle}>{it.address.city},  {it.address.email}</Text>
        </View>
        </TouchableOpacity>
      )
    })
  }



  render() {
    const itemParams = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* Service history view */}
        <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>Active Executives</Text>
        <View style={styles.row}>
          {this.renderServiceHistoryInformation()}
        </View>
      </View>
        
      </ScrollView>
        );
  }
}

export default TrackHistory;

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