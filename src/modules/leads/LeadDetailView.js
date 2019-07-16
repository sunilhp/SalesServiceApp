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
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';
import C from '../../../Constants';

import { colors, fonts } from '../../styles';
import { Dropdown, Button, TextInput } from '../../common';
import { Text, Title, Caption } from '../../common/StyledText';

import ViewProduct from '../components/product/ViewProduct'
import EditProduct from '../components/product/EditProductContainer'
import Header from './Header';
import { CustomPicker } from 'react-native-custom-picker';
import ServiceAssign from '../components/serviceAssign/ServiceAssignContainer';
import SyncStorage from 'sync-storage';

class LeadHistory extends React.Component {
  state = { 
    history: [],
    executives:[],
    lead_statuses:[],
    isProductEditEnable : false,
   }

//fetching history from network
//pass id in params
  async componentDidMount() {
    let historyres = [];
    let executives =[];
    let lead_status = [];

    try
    {      
      let historyresp =  await axios.get(`${C.API}/leads/history/${this.props.navigation.state.params.id}`);
      historyres = historyresp.data.data;

      // let executivesresp =  await axios.post(`${C.API}/users/get`,{role_id:C.EXECUTIVE_ROLE_ID},{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
      // executives = executivesresp.data.data;

      // let lead_statusresp =  await axios.post(`${C.API}/lead_status/get`);
      // lead_status = lead_statusresp.data.data;
    }
    catch(error)
    {
      //console.warn(error);
    }
    this.setState(
      { 
        history: historyres,
        // executives:executives,
        // lead_statuses:lead_status
      }
    );

  }

// service history images formatter
  // renderServiceHistoryCarousel = (images) => {
  //   const formattedhistoryimages = [];
  //   for(i=0;i<images.length;i++)
  //   {
  //     images[i] = images[i].replace(/\\/g,"/");
  //     dd = {uri : images[i] };
  //     formattedhistoryimages.push( dd);
  //   }
  //   return (
  //     <View style={styles.carouselContainer}>
  //       <Carousel
  //         autoplay
  //         sliderWidth={Dimensions.get('window').width}
  //         itemWidth={Dimensions.get('window').width}
  //         renderItem={({ item }) => (
  //           <Image
  //             resizeMode="contain"
  //             style={{ height: 250, width: Dimensions.get('window').width }}
  //             source={item}
  //           />
  //         )}
  //         data={formattedhistoryimages}
  //       />
  //     </View> 
  //   );
  // }

  //Lead history 
  renderLeadHistoryInformation = () => {
    const history = this.state.history;
    return history.map((it, i) => {
      return (
        <View style={{width:Dimensions.get('window').width-50,flex: 1,
        borderColor: colors.primaryLight,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom:15,
        padding:10,
        alignItems:'center',}}>
          <Text style={styles.itemTwoSubTitle}>{it.name}</Text>
          <Text style={styles.itemTwoSubTitle}>{it.phone},  {it.email}</Text>
          <Text style={styles.remarkTitle}>Remark : {it.remark}</Text>
          {/* {this.renderServiceHistoryCarousel(it.images)} */}
        </View>
      )
    })
  }


  //view to be shown in product area
  // renderProductView = (product) =>{
  //     if(this.state.isProductEditEnable) 
  //       return <EditProduct formtype='update' product={product}/> 
  //     else 
  //       return <ViewProduct product={product} />
  // }

  render() {
    const itemParams = this.props.navigation.state.params;
    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* Lead information view */}
        
        <View style={styles.componentsSection}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end',}}>
          <Text style={styles.componentSectionHeader}>Lead Information</Text>
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
          <TouchableOpacity key={itemParams.id} style={styles.itemTwoContainer}>
            <View>
              <Text style={styles.itemTwoPrice}>Name : {itemParams.name}</Text>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.itemTwoSubTitle}>Date : {itemParams.createdOn}</Text>
                <View style={styles.itemThreeMetaContainer}>
                  <Text style={styles.itemTwoSubTitle}>Status : {itemParams.status}</Text>
                </View>
              </View>
              <Text style={styles.itemTwoSubTitle}>Message : {itemParams.message}</Text>
              <Text style={styles.itemTwoSubTitle}>Phone : {itemParams.phone}</Text>
              <Text style={styles.itemTwoSubTitle}>Email : {itemParams.email}</Text>
              <Text style={styles.itemTwoSubTitle}>Address : {itemParams.address}, {itemParams.city}, {itemParams.state}</Text>
            </View>    
          </TouchableOpacity>
          </View>
        </View>

        {/* Service assigned to executive View */}
        <View style={styles.componentsSection}>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end',}}>
            <Text style={styles.componentSectionHeader}> Assign service </Text> 
          </View> 
          <View style={styles.row}>
            <TouchableOpacity key={itemParams.id} > 
          
              <ServiceAssign formtype="add" role="leads" serviceID={this.props.navigation.state.params.id} />

            </TouchableOpacity>
          </View>
        </View>

        {/* Lead history view */}
        <View style={styles.componentsSection}>
        <Text style={styles.componentSectionHeader}>History</Text>
        <View style={styles.row}>
        <TouchableOpacity key={itemParams.id} style={styles.itemTwoContainer} > 
          <View>
            {this.renderLeadHistoryInformation()}
          </View>
        </TouchableOpacity>
      </View>
      </View>
        
      </ScrollView>
        );
  }
}

export default LeadHistory;

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

// const renderServiceStatuses = (statuses) => {
//     return statuses.map(it => {
//         return {value: it.id,label :it.name}
//     }) 
// }
// const renderExecutive = (executives) => {
//   //console.warn(executives);
//   return executives.map(it => {
//       return {value: it.id,label :it.name}
//   }) 
// }