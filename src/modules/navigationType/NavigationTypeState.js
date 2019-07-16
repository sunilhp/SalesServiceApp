// @flow
type NavigationTypeStateType = {};

type ActionType = {
  type: string,
  payload?: any,
};

export const initialState: NavigationTypeStateType = {};

export const ACTION = 'NavigationTypeState/ACTION';

export function actionCreator(): ActionType {
  return {
    type: ACTION,
  };
}

export default function NavigationTypeStateReducer(state: NavigationTypeStateType = initialState, action: ActionType): NavigationTypeStateType {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
}
