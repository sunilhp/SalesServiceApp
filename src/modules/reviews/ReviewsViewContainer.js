// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ReviewsView from './ReviewsView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(ReviewsView);
