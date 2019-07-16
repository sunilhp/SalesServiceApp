import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants'
import ServiceTypeView from './ServiceTypeView';

class ServiceTypeViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { serviceType: [], isRefreshing: false}
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getServiceTypes();
        })
    }


    getServiceTypes = () => this.setState({ isRefreshing: true }, this._getServiceTypes)

    _getServiceTypes() {
      
    fetch(`${C.API}/service_type/get`, {
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
        const serviceType = messagesList;
        this.setState({ serviceType, isRefreshing: false })
    }

    render() {
        if (this.state.isLoading) 
            return null
        return <ServiceTypeView
            serviceType={this.state.serviceType} 
            isRefreshing={this.state.isRefreshing}
            getServiceTypes={this.getServiceTypes}
            />
    }
}

export default ServiceTypeViewContainer
