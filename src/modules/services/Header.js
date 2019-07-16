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
import { colors, fonts } from '../../styles';
import { Dropdown, Button, TextInput } from '../../common';
import { Text, Title, Caption } from '../../common/StyledText';

//it requires three props => heading,onclick caption, child view
const Header =(props)=>{
    return (
        <View style={styles.componentsSection}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end',}}>
                <Text style={styles.componentSectionHeader}> {props.heading} </Text> 
                <Button
                    style={{width:120,padding:0,height:25}}
                    primary
                    bordered
                    caption={props.btntext} //button caption
                    onPress={props.onButtonClick}
                />
            </View>

            <View style={styles.row}>
                {props.children}
            </View>
        </View>
    )
}

export default Header;

const styles = StyleSheet.create({
    componentSectionHeader: {
      fontFamily: fonts.primaryRegular,
      color: '#686868',
      fontSize: 20,
      textAlign:"center",
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