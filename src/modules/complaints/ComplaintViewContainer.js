
import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants'
import ComplaintView from './ComplaintView';

class ComplaintViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { complaints: [], isRefreshing: false}
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getComplaints();
        })
    }


    getComplaints = () => this.setState({ isRefreshing: true }, this._getComplaints)

    _getComplaints() {
      
      fetch(`${C.API}/complaints/get`, {
        method: 'GET',
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
         tmp.created_on = rs[i].created_on;
         tmp.name = rs[i].name;
         tmp.email = rs[i].email;
         tmp.phone = rs[i].phone;
         tmp.message = rs[i].message;
         
         messagesList.push(tmp);
      }
        const complaints = messagesList;
        this.setState({ complaints, isRefreshing: false })
    }

    render() {
        if (this.state.isLoading) 
            return null
        return <ComplaintView
            complaints={this.state.complaints} 
            isRefreshing={this.state.isRefreshing}
            getComplaints={this.getComplaints}
            />
    }
}

export default ComplaintViewContainer
