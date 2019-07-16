/* eslint-disable import/no-unresolved */
import React from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import { colors, fonts } from '../../styles';

import HomeScreen from '../home/HomeViewContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import ManageScreen from '../manage/ManageViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';

import ServicesScreen from '../services/ServicesViewContainer';
import LeadsScreen from '../leads/LeadsViewContainer';
const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');


const headerBackground = require('../../../assets/images/topBarBg.png');

const styles = StyleSheet.create({
  tabBarItemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    paddingHorizontal: 10,
  },
  tabBarIcon: {
    width: 23,
    height: 23,
  },
  tabBarIconFocused: {
    tintColor: colors.primary,
  },
  headerContainer: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
  },
  headerCaption: {
    fontFamily: fonts.primaryRegular,
    color: colors.white,
    fontSize: 18,
  },
});

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Reminders: {
      screen: CalendarScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={headerBackground} />
            <Text style={styles.headerCaption}>Reminders</Text>
          </View>
        ),
      },
    },
    Service: {
      screen: ServicesScreen,
      navigationOptions: {
        headerTitle:"Services"
      }
    },
    Leads: {
      screen: LeadsScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={headerBackground} />
            <Text style={styles.headerCaption}>Leads</Text>
          </View>
        ),
      },
    },
    Manage: {
      screen: ManageScreen,
      navigationOptions: {
        header: (
          <View style={styles.headerContainer}>
            <Image style={styles.headerImage} source={headerBackground} />
            <Text style={styles.headerCaption}>Manage</Text>
          </View>
        )
      },
    },
    // Settings: {
    //   screen: ComponentsScreen,
    //   navigationOptions: {
    //     header: (
    //       <View style={styles.headerContainer}>
    //         <Image style={styles.headerImage} source={headerBackground} />
    //         <Text style={styles.headerCaption}>Components</Text>
    //       </View>
    //     ),
    //   },
    // },
    },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/prop-types
      
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconSource;
        switch (routeName) {
          case 'Home':
            iconSource = iconHome;
            break;
          case 'Reminders':
            iconSource = iconCalendar;
            break;
          case 'Service':
            iconSource = iconGrids;
            break;
          case 'Leads':
            iconSource = iconGrids;
            break;
          case 'Manage':
            iconSource = iconPages;
            break;
          case 'Settings':
            iconSource = iconComponents;
            break;
          default:
            iconSource = iconComponents;
        }
        return (
          <View style={styles.tabBarItemContainer}>
            <Image
              resizeMode="contain"
              source={iconSource}
              style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
            />
          </View>
        );
      },
      
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: colors.white,
        borderTopWidth: 0.5,
        borderTopColor: '#d6d6d6',
      },
      labelStyle: {
        color: colors.grey,
      },
    },
    navigationOptions: ({ navigation }) => ((navigation.state.routes[navigation.state.index].key == 'Service')?{   
      headerTitle: "Services",
      headerRight: (
       
        <View style={{ flexDirection: 'row' }}>
          
           <TouchableOpacity
             onPress={() => navigation.navigate('ServiceAdd')}
             style={{
               paddingRight: 10,
             }}
           >
             <Image
               source={require('../../../assets/images/icons/plus.png')}
               resizeMode="contain"
               style={{
                 width: 30,
                 height: 20,
               }}
             />
           </TouchableOpacity>
         </View>
      )}:(navigation.state.routes[navigation.state.index].key == 'Leads')?{   
        headerTitle: "Leads",
        headerRight: (
         
          <View style={{ flexDirection: 'row' }}>
            
             <TouchableOpacity
               onPress={() => navigation.navigate('LeadAdd')}
               style={{
                 paddingRight: 10,
               }}
             >
               <Image
                 source={require('../../../assets/images/icons/plus.png')}
                 resizeMode="contain"
                 style={{
                   width: 30,
                   height: 20,
                 }}
               />
             </TouchableOpacity>
           </View>
        )}:{}),
    
  }
);
