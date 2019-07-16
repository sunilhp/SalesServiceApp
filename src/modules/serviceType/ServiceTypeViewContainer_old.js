// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import ServiceTypeView from './ServiceTypeView';
import { serviceTypeList } from './ServiceTypeState';

export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    {
      serviceTypeList,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.serviceTypeList();
    },
  }),
  withState('searchText', 'setSearchText', ''),
)(ServiceTypeView);
