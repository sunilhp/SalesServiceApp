import C from '../../../Constants';
import SyncStorage from 'sync-storage';

// Initial state
const initialState = {
  messagesList: [],
  messages: {},
  messagesListLoading: false,
};

// Actions
const MESSAGES_LIST_START_LOADING = 'ChatState/MESSAGES_LIST_START_LOADING';
const MESSAGES_LIST_LOADED = 'ChatState/MESSAGES_LIST_LOADED';
const MESSAGES_LOADED = 'ChatState/MESSAGES_LOADED';
const MESSAGE_SENT = 'ChatState/MESSAGE_SENT';

// Action creators
function startMessagesListLoading() {
  return {
    type: MESSAGES_LIST_START_LOADING,
  };
}

function loadedMessagesList(messagesList) {
  return {
    type: MESSAGES_LIST_LOADED,
    messagesList,
  };
}

 export function  rolesList() {
  return dispatch => {
    dispatch(startMessagesListLoading());
    // TODO: Load messages list here

    let messagesList = [];
    let tmpres;
   fetch(`${C.API}/user_roles/get`, {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
          'Content-Type': 'application/json',
      },
     // body: JSON.stringify(""),
      })
      .then((response) => response.json())
      .then((responseJson) => { 
        tmpres = responseJson;

        rs = tmpres.data;
        for(i=0;i<rs.length;i++)
        {
           var tmp = {};
           tmp.id = rs[i].id;
           tmp.time = rs[i].created_on;
   
           tmp.name = rs[i].name;
           tmp.city = rs[i].city;
           tmp.state = rs[i].state;
           
           messagesList.push(tmp);
        }

      })
      .catch(err => {console.warn(err) })
      .done();

      setTimeout(() => {
        dispatch(loadedMessagesList(messagesList));
      }, 1000);
  };
}

// Reducer
export default function RolesStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case MESSAGES_LIST_START_LOADING:
      return Object.assign({}, state, {
        messagesListLoading: true,
      });
    case MESSAGES_LIST_LOADED:
      return Object.assign({}, state, {
        messagesListLoading: false,
        messagesList: action.messagesList,
      });
    case MESSAGES_LOADED:
      return Object.assign({}, state, {
        messages: {
          ...state.messages,
          [action.userId]: action.messages,
        },
      });
    default:
      return state;
  }
}
