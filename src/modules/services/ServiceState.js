import C from '../../../Constants';
import SyncStorage from 'sync-storage';
import { TabNavigator } from 'react-navigation';



// Initial state
const initialState = {
  messagesList: [],
  servicemessages: {},
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

//  export function serviceList() {
//   return dispatch => {
//     dispatch(startMessagesListLoading());
//     // TODO: Load messages list here

//     let messagesList = [];
//     const unassigned_lead_data = [];
//     const new_lead_data = [];
//     const dealDone_lead_data =[];
//     const dead_lead_data = [];
//     const completed_lead_data = [];
//     const progress_lead_data = [];
    
//     let tmpres;
//     fetch(`${C.API}/leads/get`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Authorization':'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
//         'Content-Type': 'application/json'
//       }//,
//       //body: JSON.stringify(""),
//       })
//       .then((response) => response.json())
//       .then((responseJson) => { 
//         tmpres = responseJson;
//         let rs = tmpres.data;

//         for(let i=0;i<rs.length;i++){ 
//           var tmp = {};
//           tmp.id = rs[i].id; 
//           tmp.status = rs[i].status;
//           tmp.createdOn = rs[i].created_on;
//           tmp.message = rs[i].message;
//           tmp.name = rs[i].name;
//           tmp.city = rs[i].city;
//           tmp.state = rs[i].state;
//           tmp.address = rs[i].address;
//           tmp.email = rs[i].email;
//           tmp.phone = rs[i].phone;
          
          
//         //   if(rs[i].status == "Unassigned"){
//         //   //  unassigned_lead_data.push(tmp);
//         //   //unassignedList.push(tmp);
//         // //  messagesList.push(tmp);    
//         //   }
//         //  if(rs[i].status == "New"){
//         //   //  unassigned_lead_data.push(tmp);
          
//         //   messagesList.push(tmp);   
//         //   }
//           if(rs[i].status == "Unassigned")
//              unassigned_lead_data.push(tmp);
//           if(rs[i].status == "New")
//             new_lead_data.push(tmp);
//           if(rs[i].status == "In-Progress")
//             progress_lead_data.push(tmp);
//           if(rs[i].status == "Deal-Done")
//             dealDone_lead_data.push(tmp);
//           if(rs[i].status == "Dead")
//             dead_lead_data.push(tmp);
//           if(rs[i].status == "Completed")
//             completed_lead_data.push(tmp);

//         }
//         messagesList.push(unassigned_lead_data);
//         messagesList.push(new_lead_data);
//         messagesList.push(progress_lead_data);
//         messagesList.push(dead_lead_data);
//         messagesList.push(dealDone_lead_data);
//         messagesList.push(completed_lead_data);
//       })
//       .catch(err => {console.warn("error is "+err) })
//       .done();

//       setTimeout(() => {
//         dispatch(loadedMessagesList(messagesList));
//       }, 1000);
//   };
// }


export function serviceList() {
  return dispatch => {
    dispatch(startMessagesListLoading());
    // TODO: Load messages list here
let serviceData = [];
const unassigned_service_data = [];
const new_service_data = [];
const progress_service_data =[];
const pending_service_data = [];
const completed_service_data = [];

fetch(`${C.API}/services/get`, {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Authorization':'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
    'Content-Type': 'application/json',
  }//,
  //body: JSON.stringify(""),
  })
  .then((response) => response.json())
  .then((responseJson) => { 
    myres = responseJson;
    
    let serviceresp = myres.data;
    for(let i=0;i<serviceresp.length;i++)
    { 
       var tmp = {};
       tmp.id = serviceresp[i].id; 
       tmp.priority = serviceresp[i].priority;
       tmp.priorityId = serviceresp[i].priorityId;
       tmp.images = serviceresp[i].service_images;
       tmp.createdOn =serviceresp[i].created_on;
       tmp.message1 = serviceresp[i].message;
       tmp.serviceType = serviceresp[i].service_type.name;
       tmp.serviceTypeId = serviceresp[i].service_type.id;
       tmp.productId = serviceresp[i].product.id;
       tmp.product = serviceresp[i].product.name;
       tmp.productTypeId = serviceresp[i].product_type.id;
       tmp.productType = serviceresp[i].product_type.name;
       tmp.productDescription = serviceresp[i].description;
       tmp.customerId = serviceresp[i].customer.id;
       tmp.customerName = serviceresp[i].customer.name;
       tmp.customerCity = serviceresp[i].customer.city;
       tmp.customeservicereSptate = serviceresp[i].customer.state;
       tmp.customerEmail = serviceresp[i].customer.email;
       tmp.customerPhone = serviceresp[i].customer.phone;
       tmp.customerAddress = serviceresp[i].customer.address;
       tmp.customerZipcode = serviceresp[i].customer.zipcode;
       
       if(serviceresp[i].state == "Unassigned")
       unassigned_service_data.push(tmp);
       if(serviceresp[i].state == "New")
        new_service_data.push(tmp);
       if(serviceresp[i].state == "In Progress")
        progress_service_data.push(tmp);
       if(serviceresp[i].state == "Pending")
        pending_service_data.push(tmp);
       if(serviceresp[i].state == "Completed")
        completed_service_data.push(tmp);
    }
    serviceData.push(unassigned_service_data);
    serviceData.push(new_service_data);
    serviceData.push(progress_service_data);
    serviceData.push(pending_service_data);
    serviceData.push(completed_service_data);
    
  })
      .catch(err => {console.warn("error is "+err) })
      .done();

      setTimeout(() => {
        dispatch(loadedMessagesList(serviceData));
      }, 1000);
  };
}



// Reducer
export default function ServicesStateReducer(state = initialState, action = {}) {
  
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