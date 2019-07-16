import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants'
import ServicesView from './ServicesView';

class ServicesViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { services: {}, isRefreshing: false, tabIndex: 0 }
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getServices();
            if(this.props.navigation.state.params)
              this.setState({tabIndex:this.props.navigation.state.params.tabIndex})
        })
    }


    getServices = () => this.setState({ isRefreshing: true }, this._getServices)

    _getServices() {
      fetch(`${C.API}/services/get`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Authorization':'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
          'Content-Type': 'application/json',
        }//,
        //body: JSON.stringify(""),
        })
        .then((response) => response.json())
        .then(this._parseResponse)
        .catch(err => {console.warn("error is "+err) })
        .done();
    }

    _parseResponse = (response) => {
        const unassigned_service_data = [], new_service_data = [], progress_service_data =[], pending_service_data = [],completed_service_data = [];

        let serviceresp = response.data;
    for(let i=0;i<serviceresp.length;i++)
    { 
       var tmp = {};
       tmp.id = serviceresp[i].id; 
       tmp.priority = serviceresp[i].priority;
       tmp.priorityId = serviceresp[i].priorityId;
       tmp.images = serviceresp[i].service_images;
       tmp.createdOn =serviceresp[i].created_on;
       tmp.message1 = serviceresp[i].message;
       tmp.serviceType = serviceresp[i].service_type.name;
       tmp.serviceTypeId = serviceresp[i].service_type.id;
       tmp.productId = serviceresp[i].product.id;
       tmp.product = serviceresp[i].product.name;
       tmp.productTypeId = serviceresp[i].product_type.id;
       tmp.productType = serviceresp[i].product_type.name;
       tmp.productDescription = serviceresp[i].description;
       tmp.customerId = serviceresp[i].customer.id;
       tmp.customerName = serviceresp[i].customer.name;
       tmp.customerCity = serviceresp[i].customer.city;
       tmp.customeservicereSptate = serviceresp[i].customer.state;
       tmp.customerEmail = serviceresp[i].customer.email;
       tmp.customerPhone = serviceresp[i].customer.phone;
       tmp.customerAddress = serviceresp[i].customer.address;
       tmp.customerZipcode = serviceresp[i].customer.zipcode;
       
       if(serviceresp[i].state == "Unassigned")
       unassigned_service_data.push(tmp);
       if(serviceresp[i].state == "New")
        new_service_data.push(tmp);
       if(serviceresp[i].state == "In Progress")
        progress_service_data.push(tmp);
       if(serviceresp[i].state == "Pending")
        pending_service_data.push(tmp);
       if(serviceresp[i].state == "Completed")
        completed_service_data.push(tmp);
    }
        const services = { unassigned_service_data, new_service_data, progress_service_data, pending_service_data, completed_service_data }
        this.setState({ services, isRefreshing: false })
    }


    changeTabIndex = (index) => {
        this.setState({ tabIndex: index })
    }


    render() {
        if (this.state.isLoading) 
            return null
        return <ServicesView
            services={this.state.services} 
            isRefreshing={this.state.isRefreshing}
            tabIndex={this.state.tabIndex} 
            tabs={['Unassigned','New', 'In Progress','Pending', 'Completed' ]} 
            changeTabIndex={this.changeTabIndex}
            getServices={this.getServices}
            />
    }
}

export default ServicesViewContainer