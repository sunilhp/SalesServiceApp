// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import AuthView from './AuthView';

export default compose(
    withState('isLoggin', 'setIsLoggin', true),
    connect()
    )(AuthView);
