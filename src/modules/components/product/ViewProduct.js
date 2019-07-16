//responsible for  view product
//pass product as props

import React from 'react';
import { colors, fonts } from '../../../styles';
import {
    View,
    Text,
    StyleSheet
  } from 'react-native';

const ViewProduct = (props) => {
    const product = props.product
    return product ? renderProduct(product) : renderNoProduct()
}

renderProduct = (product) => {
    return (
        <View style={styles.componentsSection}>
            <Text style={styles.itemTwoTitle}>{product.name}</Text>
            <Text style={styles.itemTwoSubTitle}>{product.type.name }</Text>
            <Text style={styles.itemTwoDescription}>{product.description}</Text>
        </View>
    )
}

// {id:itemParams.productId, name: itemParams.product, description: itemParams.productDescription, productType: itemParams.productType,productTypeId:itemParams.productTypeId}

renderNoProduct = () => {
    return (
        <Text>No Product Found</Text>
    )
}

export default ViewProduct;

const styles = StyleSheet.create({
    componentsSection: {
        backgroundColor: colors.white,
        padding: 5,
        margin: 10,
        borderRadius: 5,
        paddingBottom: 20,
    },
    itemTwoTitle: {
      color: colors.black,
      fontFamily: fonts.primaryBold,
      fontSize: 20,
    },
    itemTwoSubTitle: {
      color: colors.black,
      fontFamily: fonts.primaryRegular,
      fontSize: 15,
      marginVertical: 5,
    },
    itemTwoDescription: {
      color: colors.black,
      fontFamily: fonts.primaryBold,
      fontSize: 20,
    },
   
  });