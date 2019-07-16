// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import CustomerView from './CustomerView';
import { customerList } from './CustomerState';

export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    {
      customerList,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.customerList();
    },
  }),
  withState('searchText', 'setSearchText', ''),
)(CustomerView);
