import React from 'react'
import axios from 'axios'
import c from './../../../../Constants'
import Toast from 'react-native-simple-toast'

import ServiceAssign from './ServiceAssign'
import SyncStorage from 'sync-storage';
import { StackNavigator } from 'react-navigation';
import { withNavigation } from 'react-navigation';

class ServiceAssignContainer extends React.Component {

    constructor(props) {
        super(props)
        let  serviceID = '', executiveInfo = [],saleExecutiveInfo=[],selectedExecutive ={}, serviceStatus = [],leadsStatus=[], selectedServiceStatus ={}, remark = '', appointmentTime = null;

        //if formtype is update then you need to pass the product
        // if (props.service) {
        //     serviceID = props.service.id,
        //     executiveInfo = props.service.executiveInfo,
        //     serviceStatus = props.service.serviceStatus,
        //     remark = props.service.remark,
        //     appointmentTime = props.service.appointmentTime
        // }
        if(props.serviceID)
        {
            serviceID  = props.serviceID;
        }

        this.state = {
            //executiveInfo has array object of all executive
            //serviceStatus has array object of services
           
            serviceID ,executiveInfo ,saleExecutiveInfo, serviceStatus ,leadsStatus, remark ,
             appointmentTime: new Date() ,
            state: -1, // 0 or 1 (1 means success, 0 means error)
        }
    }

    componentDidMount() {
        if(this.props.role == "service"){
            this.getExecutivesDetails()
            this.getStatuses();
        }
        else
        {
            this.getsalesExecutivesDetails();
            this.getleadsStatuses();
        }
    }

    onChange = (name, value) => {
        this.setState({ [name]: value })
    }

    getExecutivesDetails = async () => {
        try {
            const res =  await axios.post(`${c.API}/users/get`,{role_id:c.EXECUTIVE_ROLE_ID},{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
            if (res.data.success) { this.setState({ executiveInfo: res.data.data })}
        } catch (e) {console.warn("user error",e.message)}
    }
    getStatuses = async () => {
        try {
            const res =  await axios.post(`${c.API}/service_status/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
            if (res.data.success) { this.setState({ serviceStatus: res.data.data })}
        } catch (e) {console.warn(e.message)}
    }

    getsalesExecutivesDetails = async () => {
        try {
            const res =  await axios.post(`${c.API}/users/get`,{role_id:c.SUPPORT_EXECUTIVE_ROLE_ID},{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
            if (res.data.success) { this.setState({ saleExecutiveInfo: res.data.data })}
        } catch (e) {console.warn("user error",e.message)}
    }
    getleadsStatuses = async () => {
        try {
            const res =  await axios.post(`${c.API}/lead_status/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}});
            if (res.data.success) { this.setState({ leadsStatus: res.data.data })}
        } catch (e) {console.warn(e.message)}
    }

    /**
     * Service assign related functions
     */
    assignService = async () => {
        const service = {
            service_id: this.state.serviceID,
            assigned_to: this.state.selectedExecutive.id,
            admin_remark: this.state.remark,
            appointment_time: this.state.appointmentTime,
            job_status: this.state.selectedServiceStatus.id
        }
        try {
            const res = await axios.post(`${c.API}/service_details`, service,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}})
            if (res.data.success) 
            {
                Toast.show("Service Assigned Successfully!");
                this.props.navigation.goBack();
            }
            else
                Toast.show("Something went wrong!!");
        } catch (e) {
            Toast.show("Something went wrong!")
        }
    }

    assignLead = async () => {
        const lead = {
            lead_id: this.state.serviceID,
            assigned_to: this.state.selectedExecutive.id,
            admin_remark: this.state.remark,
            appointment_time: this.state.appointmentTime,
            lead_status: this.state.selectedServiceStatus.id
        }
        try {
            const res = await axios.post(`${c.API}/leads_details`, lead,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}})
            if (res.data.success) 
            {
                Toast.show("Lead Assigned Successfully!");
                this.props.navigation.goBack();
            }
            else
                Toast.show("Something went wrong!!");
        } catch (e) {
            console.warn("Something went wrong!!")
        }
    }

    //to be done
    updateProduct = async () => {
        const product = {
            id: this.state.id,
            name: this.state.name,
            description: this.state.description,
            type_id: this.state.type.id
        }
        try {
            const res = await axios.post(`${c.API}/products/update`, product)
            if (res.data.success){
                Toast.show("Product Updated")
                this.setState({ message: 'Product updates successfully', state: 1})
            }
            else{
                this.setState({ message: res.data.message, state: 0})
            }
        } catch (e) {
            this.setState({ message: 'something went wrong', state: 0})
        }
    }

    render() {
        
        let assignedTo = "";
        let jobStatus = "";

        if(this.props.role == "service"){
            assignedTo = this.state.executiveInfo;
            jobStatus = this.state.serviceStatus;
        }
        else {
            assignedTo = this.state.saleExecutiveInfo;
            jobStatus = this.state.leadsStatus;
        }
        return <ServiceAssign
            formtype={this.props.formtype}
            role={this.props.role}
            serviceID = {this.props.serviceID}
            //service fields
            
            service_id = {this.state.serviceID}
            assigned_to = {assignedTo}
            admin_remark = {this.state.remark}
            appointment_time = {this.state.appointmentTime}
            job_status = {jobStatus}
            
            state={this.state.state}

            //functions
            onChange={this.onChange}
            assignService={this.assignService}
            assignLead = {this.assignLead}
            //updateProduct={this.updateProduct}
        />
    }
}

//export default ServiceAssignContainer
export default withNavigation(ServiceAssignContainer);