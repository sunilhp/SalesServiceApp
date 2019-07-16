import React from 'react';

// import AuthScreen from '../containers/AuthScreen';
import AuthScreen from '../auth/AuthViewContainer';
import AppNavigator from './RootNavigation';

export default function NavigatorView() {
  // if (authState.isLoggedIn || authState.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;

  return <AppNavigator />;
}
