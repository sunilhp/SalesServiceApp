import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import { colors, fonts } from '../../styles';

const chartIcon = require('../../../assets/images/pages/chart.png');
const calendarIcon = require('../../../assets/images/pages/calendar.png');
const chatIcon = require('../../../assets/images/pages/chat.png');
const galleryIcon = require('../../../assets/images/pages/gallery.png');
const profileIcon = require('../../../assets/images/pages/profile.png');

export default function ManageScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
            onPress={() => props.navigation.navigate({ routeName: 'Customer' })}
            style={styles.item}
          >
          <Image
            resizeMode="contain"
            source={chartIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Customers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Users' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={galleryIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'ServiceType' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={profileIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Service Type</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>

        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'ProductType' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={chatIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Product Type</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Products' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={calendarIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Roles' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={profileIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Roles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
            onPress={() => props.navigation.navigate({ routeName: 'Track' })}
            style={styles.item}
          >
          <Image
            resizeMode="contain"
            source={chartIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Track</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.row}>
        <TouchableOpacity
            onPress={() => props.navigation.navigate({ routeName: 'Complaint' })}
            style={styles.item}
          >
          <Image
            resizeMode="contain"
            source={chartIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Complaints</Text>
        </TouchableOpacity>
      </View>
     
{/* 

      <View style={styles.row}>

        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Services' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={chatIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Calendar' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={calendarIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Machines</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Auth' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={profileIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>

        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Charts' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={chatIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Calendar' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={calendarIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Machines</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate({ routeName: 'Auth' })}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={profileIcon}
            style={styles.itemImage}
          />
          <Text style={styles.itemText}>Login</Text>
        </TouchableOpacity>
      </View>
    
     */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
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
});
