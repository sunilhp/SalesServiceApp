import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants'
import UsersView from './UsersView';

class UserViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { users: [], isRefreshing: false}
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getUsers();
        })
    }


    getUsers = () => this.setState({ isRefreshing: true }, this._getUsers)

    _getUsers() {
      
      fetch(`${C.API}/users/get`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
            'Content-Type': 'application/json',
        },
       // body: JSON.stringify(""),
        })
        .then((response) => response.json())
        .then(this._parseResponse)
        .catch(err => {console.warn("error is "+err) })
        .done();
    }

    _parseResponse = (response) => {
      let messagesList = [];
      let rs = response.data;
      for(i=0;i<rs.length;i++)
      {
         var tmp = {};
         tmp.id = rs[i].id;   
         tmp.name = rs[i].name;
         tmp.address = rs[i].address;
         tmp.dob = rs[i].dob;
         tmp.doj = rs[i].doj;
         tmp.email = rs[i].email;
         tmp.phone = rs[i].phone;
         tmp.status = rs[i].status;
         tmp.createdOn = rs[i].created_on;
         tmp.roleName = rs[i].role.name;
         tmp.roleId = rs[i].role.role_id;
         messagesList.push(tmp);
      }
        const users = messagesList;
        this.setState({ users, isRefreshing: false })
    }
    setSearchText = (val) => {
        this.setState({searchText :val})
    }
    render() {
        if (this.state.isLoading) 
            return null
        return <UsersView
            users={this.state.users} 
            isRefreshing={this.state.isRefreshing}
            getUsers={this.getUsers}
            searchText = {this.state.searchText}
            setSearchText = {this.setSearchText}
            />
    }
}

export default UserViewContainer
