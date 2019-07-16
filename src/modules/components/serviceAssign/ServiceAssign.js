// add,edit and delete service
//pass service

// this view in totally pending


import React from 'react'
import {View, Text, TextInput, Button, Picker, StyleSheet, Platform, DatePickerIOS,Dimensions} from 'react-native'
import Dropdown from './../../../common/Dropdown';
import { CustomPicker } from 'react-native-custom-picker';
import { DatePickerDialog } from 'react-native-datepicker-dialog'

 
import moment from 'moment';


const ServiceAssign = (props) => {
    let renderButton
    let onClick
    
    if (props.formtype == 'add' && props.role == "service") {
        renderButton = renderServiceButton
        onClick = props.assignService
    }
    else if (props.formtype =='add' && props.role == "leads") {
        renderButton = renderLeadButton
        onClick = props.assignLead
    }
     else {
        renderButton = () => null
        onClick = () => {}
    }
    // else if (props.formtype == 'update') {
    //     renderButton = renderUpdateButton
    //     onClick = props.updateProduct
    // } else {
    //     renderButton = () => null
    // }

    return (
        <View>
            <Text style={styles.textStyle} >remark</Text>
            <TextInput
                style={styles.textInput}
                id='remark'
                value={props.remark}
                onChangeText={(text) => props.onChange('remark', text)}
                placeholder="Remark"
            />
            <Text style={styles.textStyle} >Status</Text>
            <CustomPicker 
                options={renderServiceStatus(props.job_status)}
                //value={{label: props.job_status.name ,value: props.job_status.id }}
                
                getLabel={(item) => item.label}
                onValueChange={(value, i) => {
                    props.onChange('selectedServiceStatus', { id: value.value, name: value.label })
                }}
             />
            <Text style={styles.textStyle} >Executive</Text>
             <CustomPicker 
                options={renderExecutiveInfo(props.assigned_to)}
                //value={{label: props.assigned_to.name ,value: props.assigned_to.id }}
                
                getLabel={(item) => item.label}
                onValueChange={(value, i) => {
                    props.onChange('selectedExecutive', { id: value.value, name: value.label })
                }}
             />
            <Text style={styles.textStyle} >Appointment time</Text>
            <DatePickerIOS
                date={props.appointment_time}
                minuteInterval={10}
                onDateChange={(date)=>{
                    props.onChange('appointmentTime',date)
                }}
                />
            {renderButton(onClick)}
        </View>
    )
}

const renderServiceButton = (onClick) => {
    return <Button title='Add' style={styles.buttonsStyle}  onPress={onClick} />
}

const renderLeadButton = (onClick) => {
    return <Button title='Add' style={styles.buttonsStyle}  onPress={onClick} />
}  


const renderUpdateButton = (onClick) => {
    return <Button title='Update' style={styles.buttonsStyle} onPress={onClick} />
}

const renderFormMessage = (message, state) => {
    message ? <Text style={{color: state === 1 ? 'green' : 'red'}}>{message}</Text> : null
}

const renderExecutiveInfo = (executiveInfoList) => {
    return executiveInfoList.map(it => {
        return {value: it.id,label :it.name}
    }) 
}

const renderServiceStatus = (serviceStatusList) => {
    return serviceStatusList.map(it => {
        return {value: it.id,label :it.name}
    }) 
}

export default ServiceAssign


const styles = StyleSheet.create({
   
    textInput: {
      alignSelf: 'stretch',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      padding:2,
      height:30,
      width:Dimensions.get('window').width-65,
      fontSize:16
    },
    textStyle:{
        marginTop:20,
        height:30,
        width: Dimensions.get('window').width-60,
        fontSize:17
    },
    buttonsStyle:{
        borderWidth:1,
        borderColor:'black',
        padding:4,
        backgroundColor:'green'
    }
  });