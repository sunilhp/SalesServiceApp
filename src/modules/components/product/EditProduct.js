// add,edit and delete product
//pass product
//pass type props {'add', 'update'}

import React from 'react'
import {View, Text, TextInput, Button, Picker, StyleSheet, Platform} from 'react-native'
import Dropdown from './../../../common/Dropdown';
import { CustomPicker } from 'react-native-custom-picker';


const EditProduct = (props) => {
    let renderButton
    let onClick
    if (props.formtype == 'add') {
        renderButton = renderAddButton
        onClick = props.addProduct
    } else if (props.formtype == 'update') {
        renderButton = renderUpdateButton
        onClick = props.updateProduct
    } else {
        renderButton = () => null
    }

    return (
        <View>
            <Text style={styles.textStyle} >Name</Text>
            <TextInput
                style={styles.textInput}
                id='name'
                value={props.name}
                onChangeText={(text) => props.onChange('name', text)}
                placeholder="Product Name"
            />
            <Text style={styles.textStyle} >Description</Text>
            <TextInput
                style={styles.textInput}
                name='description'
                value={props.description}
                onChangeText={(text) => props.onChange('description', text)}
                placeholder="Product Description"
            />
            <Text style={styles.textStyle} >Type</Text>
             <CustomPicker 
                options={renderProductTypes(props.types)}
                value={{label: props.type.name ,value: props.type.id }}
                
                getLabel={(item) => item.label}
                onValueChange={(value, i) => {
                    props.onChange('type', { id: value.value, name: value.label })
                }}
             />
             
            {renderButton(onClick)}
            {renderFormMessage(props.message, props.state)}
        </View>
    )
}

const renderAddButton = (onClick) => {
    return <Button title='Add' style={styles.buttonsStyle}  onPress={onClick} />
}

const renderUpdateButton = (onClick) => {
    return <Button title='Update' style={styles.buttonsStyle} onPress={onClick} />
}

const renderFormMessage = (message, state) => {
    message ? <Text style={{color: state === 1 ? 'green' : 'red'}}>{message}</Text> : null
}

const renderProductTypes = (types) => {
    return types.map(it => {
        return {value: it.id,label :it.name}
    }) 
}

export default EditProduct


const styles = StyleSheet.create({
   
    textInput: {
      alignSelf: 'stretch',
      borderBottomColor: 'black',
      borderBottomWidth: 1,
      padding:2,
      height:30,
      fontSize:16
    },
    textStyle:{
        marginTop:20,
        height:30,
        fontSize:17
    },
    buttonsStyle:{
        borderWidth:1,
        borderColor:'black',
        padding:4,
        backgroundColor:'green'
    }
  });