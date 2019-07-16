// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import ProductView from './ProductView';
import { productList } from './ProductState';

export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    {
      productList,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.productList();
    },
  }),
  withState('searchText', 'setSearchText', ''),
)(ProductView);
