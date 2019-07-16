import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants'
import ProductView from './ProductView';

class ProductViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { product: [], isRefreshing: false}
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getProducts();
        })
    }


    getProducts = () => this.setState({ isRefreshing: true }, this._getProducts)

    _getProducts() {
      
      fetch(`${C.API}/products/get`, {
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
         tmp.email = rs[i].email;
         tmp.phone = rs[i].phone;
         tmp.address = rs[i].address;
         tmp.zipcode = rs[i].zipcode;
         tmp.status = rs[i].status;
         messagesList.push(tmp);
      }
        const product = messagesList;
        this.setState({ product, isRefreshing: false })
    }

    render() {
        if (this.state.isLoading) 
            return null
        return <ProductView
            product={this.state.product} 
            isRefreshing={this.state.isRefreshing}
            getProducts={this.getProducts}
            />
    }
}

export default ProductViewContainer
