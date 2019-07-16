import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';

import { colors } from '../../styles';
import { TextInput } from '../../common';
import { Text, Caption, Title } from '../../common/StyledText';
import { withNavigation } from 'react-navigation';

function RolesScreen(props) {
 
  const _renderItem = ({ item }) => (

      <View style={styles.messageItem}>
        <View style={{ flex: 1, paddingLeft: 15 }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Title color={colors.darkGray}>{item.name}</Title>
            <Caption color={colors.lightGray}>{item.time}</Caption>
          </View>
        </View>
      </View>
  );

  const _renderNoItemsComponent = () => (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>No Roles</Text>
    </View>
  );

  const _keyExtractor = item => `${item.id}`;

  let filteredMessages = props.roles;
  if (props.searchText) {
    filteredMessages = props.roles.filter(
      message => (message.name.toLowerCase().indexOf(props.searchText.toLowerCase()) !== -1)
    );
  }

  return (
    
    <View style={styles.container}>
      
      <FlatList
        style={{ backgroundColor: colors.white }} 
        refreshing={props.isRefreshing}
        onRefresh={props.getRoles}
        ListEmptyComponent={_renderNoItemsComponent}
        data={filteredMessages}
        keyExtractor={_keyExtractor}
        renderItem={_renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  onlineBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3CD4A4',
    position: 'absolute',
    right: 0,
    bottom: -5,
  },
  messageItem: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 15,
  },
});

export default withNavigation(RolesScreen);