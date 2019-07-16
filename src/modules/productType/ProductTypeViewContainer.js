import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants';
import ProductTypeView from './ProductTypeView';

class ProductTypesViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { productTypes: [], isRefreshing: false}
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getProductTypes();
        })
    }


    getProductTypes = () => this.setState({ isRefreshing: true }, this._getProductTypes)

    _getProductTypes() {
      
      fetch(`${C.API}/product_type/get`, {
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
         tmp.description = rs[i].description;
         messagesList.push(tmp);
      }
        const productTypes = messagesList;
        this.setState({ productTypes, isRefreshing: false })
    }

    render() {
        if (this.state.isLoading) 
            return null
        return <ProductTypeView
            productTypes={this.state.productTypes} 
            isRefreshing={this.state.isRefreshing}
            getProductTypes={this.getProductTypes}
            />
    }
}

export default ProductTypesViewContainer
