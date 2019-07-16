// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import TrackDetailView from './TrackDetailView';

export default compose(
  connect(),
  withState('selectedSizeIndex', 'setSelectedSizeIndex', -1),
  withState('selectedQuantityIndex', 'setSelectedQuantityIndex', -1),
)(TrackDetailView);
