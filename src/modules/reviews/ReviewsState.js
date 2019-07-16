// @flow
type ReviewsStateType = {};

type ActionType = {
  type: string,
  payload?: any,
};

export const initialState: ReviewsStateType = {};

export const ACTION = 'ReviewsState/ACTION';

export function actionCreator(): ActionType {
  return {
    type: ACTION,
  };
}

export default function ReviewsStateReducer(state: ReviewsStateType = initialState, action: ActionType): ReviewsStateType {
  switch (action.type) {
    case ACTION:
      return {
        ...state,
      };
    default:
      return state;
  }
}
