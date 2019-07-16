import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants'
import LeadsView from './LeadsView'

class LeadsViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { leads: {}, isRefreshing: false, tabIndex: 0 }
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getLeads();
            if(this.props.navigation.state.params)
              this.setState({tabIndex:this.props.navigation.state.params.tabIndex})
        })
    }


    getLeads = () => this.setState({ isRefreshing: true }, this._getLeads)
    

    _getLeads() {
        fetch(`${C.API}/leads/get`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Authorization':'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
              'Content-Type': 'application/json',
            }
        })
        .then((response) => response.json())
        .then(this._parseResponse)
        .catch(err => {console.warn("error is "+err) })
        .done();
    }

    _parseResponse = (response) => {
        const unassignedLeads = [], newLeads = [], inProgressLeads = [], deadLeads = [], dealDoneLeads = [], completedLeads = []
        let rs = response.data
        for(let i=0; i < rs.length; i++) { 
            let tmp = {};
            tmp.id = rs[i].id; 
            tmp.status = rs[i].status;
            tmp.createdOn = rs[i].created_on;
            tmp.message = rs[i].message;
            tmp.name = rs[i].name;
            tmp.city = rs[i].city;
            tmp.state = rs[i].state;
            tmp.address = rs[i].address;
            tmp.email = rs[i].email;
            tmp.phone = rs[i].phone;
            
            if (rs[i].status == "Unassigned")
                unassignedLeads.push(tmp)
            if (rs[i].status == "New")
                newLeads.push(tmp)
            if (rs[i].status == "In-Progress")
                inProgressLeads.push(tmp)
            if (rs[i].status == "Deal-Done")
                dealDoneLeads.push(tmp)
            if (rs[i].status == "Dead")
                deadLeads.push(tmp)
            if (rs[i].status == "Completed")
                completedLeads.push(tmp)
        }
        const leads = { unassignedLeads, newLeads, inProgressLeads, deadLeads, dealDoneLeads, completedLeads }
        this.setState({ leads, isRefreshing: false })
    }


    changeTabIndex = (index) => {
        this.setState({ tabIndex: index })
    }


    render() {
        if (this.state.isLoading) 
            return null
        return <LeadsView 
            leads={this.state.leads} 
            isRefreshing={this.state.isRefreshing}
            tabIndex={this.state.tabIndex} 
            tabs={['Unassigned','New', 'In Progress','Dead', 'Deal Done' ,'Completed' ]} 
            changeTabIndex={this.changeTabIndex}
            getLeads={this.getLeads}
            />
    }
}

export default LeadsViewContainer