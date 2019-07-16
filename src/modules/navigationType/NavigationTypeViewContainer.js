// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import NavigationTypeView from './NavigationTypeView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(NavigationTypeView);
