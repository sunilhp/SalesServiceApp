// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import ProductTypeView from './ProductTypeView';
import { productTypeList } from './ProductTypeState';

export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    {
      productTypeList,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.productTypeList();
    },
  }),
  withState('searchText', 'setSearchText', ''),
)(ProductTypeView);
