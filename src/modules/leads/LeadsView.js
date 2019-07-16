import React from 'react'
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from 'react-native'
import { colors, fonts } from '../../styles'
import { RadioGroup, GridRow } from '../../common'
import { withNavigation } from 'react-navigation';

class LeadsScreen extends React.Component{
  constructor(props) {
    super(props)
  }

  _getRenderLeadItemFunction = () => [this.RenderRow,this.RenderRow,this.RenderRow, this.RenderRow, this.RenderRow][this.props.tabIndex];
  
  _openArticle = lead => {
    this.props.navigation.navigate({
      routeName: 'LeadDetail',
      params: { 
        title: lead.name,
        id: lead.id,
        message: lead.message,
        city: lead.city+' '+lead.state,
        ...lead },
    });
  };


  RenderRow = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.itemThreeContainer}
      onPress={() => this._openArticle(item)}>
      <View style={styles.itemThreeSubContainer}>
        <View style={styles.itemThreeContent}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.itemThreeBrand}>{item.name}</Text>
          </View>
          <View>
            <Text style={styles.itemThreeTitle}>{item.phone}, {item.email}</Text> 
            <Text style={styles.itemThreeSubtitle} numberOfLines={1}>{item.message}</Text>
          </View>
        </View>
      </View>
      <View style={styles.itemThreeHr} />
    </TouchableOpacity>
  );

  render() {

    // const groupedData = this.props.messagesList;
     let groupedData =
       this.props.tabIndex === 0 ? this.props.leads.unassignedLeads : this.props.tabIndex === 1 ? this.props.leads.newLeads : this.props.tabIndex === 2 ? this.props.leads.inProgressLeads : this.props.tabIndex === 3 ? this.props.leads.deadLeads : this.props.tabIndex === 4 ? this.props.leads.dealDoneLeads : this.props.leads.completedLeads;
      
    
    return (
      
      <View style={styles.container}>
        <View style={{ height: 50 }}>
          <RadioGroup
            selectedIndex={this.props.tabIndex}
            items={this.props.tabs}
            onChange={this.props.changeTabIndex}
            underline
          />
        </View>
        <FlatList
          keyExtractor={item =>
            item.id
              ? `${this.props.tabIndex}-${item.id}`
              : `${item[0] && item[0].id}`
          }
          style={{ backgroundColor: colors.white, paddingHorizontal: 10 }}
          data={groupedData}
          extraData={this.props}
          onRefresh={this.props.getLeads}
          refreshing={this.props.isRefreshing}
          renderItem={this._getRenderLeadItemFunction()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    paddingBottom: 10,
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
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
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
    flexDirection: 'row',
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
    justifyContent: 'flex-start',
    
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
    justifyContent: 'flex-end',
   // marginRight: 25
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
});


export default withNavigation(LeadsScreen);