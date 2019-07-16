
import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants'
import RolesView from './RolesView';

class RolesViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { roles: [], isRefreshing: false}
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getRoles();
        })
    }


    getRoles = () => this.setState({ isRefreshing: true }, this._getRoles)

    _getRoles() {
      
      fetch(`${C.API}/user_roles/get`, {
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
         tmp.time = rs[i].created_on;
 
         tmp.name = rs[i].name;
         tmp.city = rs[i].city;
         tmp.state = rs[i].state;
         
         messagesList.push(tmp);
      }
        const roles = messagesList;
        this.setState({ roles, isRefreshing: false })
    }

    render() {
        if (this.state.isLoading) 
            return null
        return <RolesView
            roles={this.state.roles} 
            isRefreshing={this.state.isRefreshing}
            getRoles={this.getRoles}
            />
    }
}

export default RolesViewContainer

