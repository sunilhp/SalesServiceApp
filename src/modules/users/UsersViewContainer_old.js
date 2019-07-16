// @flow
import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';

import UsersView from './UsersView';
import { loadUsersList } from './UsersState';
export default compose(
  connect(
    state => ({
      messagesList: state.chat.messagesList,
      messagesListLoading: state.chat.messagesListLoading,
    }),
    {
      loadUsersList,
    },
  ),
  lifecycle({
    componentDidMount() {
      this.props.loadUsersList();
    },
  }),
  withState('searchText', 'setSearchText', ''),
)(UsersView);