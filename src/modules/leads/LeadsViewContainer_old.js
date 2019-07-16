import { compose, lifecycle, withState } from 'recompose';
import { connect } from 'react-redux';
import SyncStorage from 'sync-storage';
import C from '../../../Constants';
import LeadsView from './LeadsView';
//import {leadList} from './LeadState';

let unassigned_lead_data = [];
let new_lead_data = [];
let dealDone_lead_data =[];
let dead_lead_data = [];
let completed_lead_data = [];
let progress_lead_data = [];

let messagesList = [];

getLeads = function(){
   unassigned_lead_data = [];
   new_lead_data = [];
   dealDone_lead_data =[];
   dead_lead_data = [];
   completed_lead_data = [];
   progress_lead_data = [];
  
   messagesList = [];

fetch(`${C.API}/leads/get`, {
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
    tmpres = responseJson;
    rs = tmpres.data;
    for(let i=0;i<rs.length;i++)
    { 
      var tmp = {};
      tmp.id = rs[i].id; 
      tmp.status = rs[i].status;
      tmp.createdOn = rs[i].created_on;
      tmp.message = rs[i].message;
      tmp.name = rs[i].name;
      tmp.city = rs[i].city;
      tmp.state = rs[i].state;
      tmp.address = rs[i].address;
      tmp.email = rs[i].email;
      tmp.phone = rs[i].phone;
      
      if(rs[i].status == "Unassigned")
        unassigned_lead_data.push(tmp);
      if(rs[i].status == "New")
        new_lead_data.push(tmp);
      if(rs[i].status == "In-Progress")
        progress_lead_data.push(tmp);
      if(rs[i].status == "Deal-Done")
        dealDone_lead_data.push(tmp);
      if(rs[i].status == "Dead")
        dead_lead_data.push(tmp);
      if(rs[i].status == "Completed")
        completed_lead_data.push(tmp);
    }
    messagesList.push(unassigned_lead_data);
    messagesList.push(new_lead_data);
    messagesList.push(progress_lead_data);
    messagesList.push(dead_lead_data);
    messagesList.push(dealDone_lead_data);
    messagesList.push(completed_lead_data);
  })
  .catch(err => {console.warn("error is "+err) })
  .done();
}

getLeads();

export default compose(
  connect(),
 
  withState('tabIndex', 'setTabIndex', 0),
  withState('tabs', 'setTabs', ['Unassigned','New', 'In Progress','Dead', 'Deal Done' ,'Completed' ]),
  withState('unassigned_lead', 'setData', unassigned_lead_data),
  withState('new_leads', 'setData', new_lead_data),
  withState('dealDone_leads', 'setData', dealDone_lead_data),
  withState('dead_leads', 'setData', dead_lead_data),
  withState('completed_leads', 'setData', completed_lead_data),
  withState('progress_leads', 'setData', progress_lead_data),
  withState('activeTab','setActiveTab'),
  // withState('leadList','setLead',getLeads),

)(LeadsView);
