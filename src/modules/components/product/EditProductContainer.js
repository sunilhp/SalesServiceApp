import React from 'react'
import axios from 'axios'
import c from './../../../../Constants'
import Toast from 'react-native-simple-toast'

import EditProduct from './EditProduct'

import SyncStorage from 'sync-storage';

class EditProductContainer extends React.Component {

    constructor(props) {
        super(props)
        let id = '', name = '', description = '', type = {}

        //if formtype is update then you need to pass the product
        if (props.product) {
            id = props.product.id
            name = props.product.name,
            description = props.product.description,
            type = props.product.type
        }

        this.state = {
            id, name, description, type,
            
            //product types, from network
            types: [],

            //form messages
            message: '',
            state: -1, // 0 or 1 (1 means success, 0 means error)
        }
    }

    componentDidMount() {
        this.getProductTypes()
    }


    onChange = (name, value) => {
        this.setState({ [name]: value })
    }


    getProductTypes = async () => {
        try {
            const res =  await axios.post(`${c.API}/product_type/get`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}})
            if (res.data.success) { this.setState({ types: res.data.data })}
        } catch (e) {}
    }

    /**
     * product related functions
     */
    addProduct = async () => {
        const product = {
            name: this.state.name,
            description: this.state.description,
            type_id: this.state.type
        }
        try {
            const res = await axios.post(`${c.API}/products`, product)
            if (res.data.success) this.setState({ name: '', description: '', type: '', message: 'Product added successfully', state: 1})
            else this.setState({ message: res.data.message, state: 0})
        } catch (e) {
            console.warn(e)
            this.setState({ message: 'something went wrong', state: 0})
        }
    }

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
        return <EditProduct
            formtype={this.props.formtype}

            //product fields
            name={this.state.name}
            description={this.state.description}
            type={this.state.type}

            types={this.state.types}
            
            //form message
            message={this.state.message}
            state={this.state.state}

            //functions
            onChange={this.onChange}
            addProduct={this.addProduct}
            updateProduct={this.updateProduct}
        />
    }
}

export default EditProductContainer