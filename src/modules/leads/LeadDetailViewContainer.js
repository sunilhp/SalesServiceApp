// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import LeadDetailView from './LeadDetailView';

export default compose(
  connect(),
  withState('selectedSizeIndex', 'setSelectedSizeIndex', -1),
  withState('selectedQuantityIndex', 'setSelectedQuantityIndex', -1),
)(LeadDetailView);
