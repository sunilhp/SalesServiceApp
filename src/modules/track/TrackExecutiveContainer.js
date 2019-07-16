




// not in use






import React from 'react'
import SyncStorage from 'sync-storage'
import C from '../../../Constants'
import TrackExecutive from './TrackExecutive';

class TrackExecutiveViewContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { lat:"",long:"",mapCoords: [], isRefreshing: false}
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this.getCoordinates();
        })
    }


    getCoordinates = () => this.setState({ isRefreshing: true }, this._getCoordinates)

    _getCoordinates() {
      
      fetch(`${C.API}/track/5d29bcbd765651707b10b184`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS'),
            'Content-Type': 'application/json',
        },
       // body: JSON.stringify(""),
        })
        .then((response) => response.json())
        .then(this._parseResponse)
        .catch(err => {console.warn("error occured:"+err) })
        .done();
    }

    _parseResponse = (response) => {
      let tmp = response.data;
      let mapCoords = [];
      for(let i=0;i<tmp.length;i++)
      {
        var temp ={};
        temp.latitude = tmp[i].lat;
        temp.longitude = tmp[i].long;
        mapCoords.push(temp);
        if(i==0)
            this.setState({lat:temp.latitude,long:temp.longitude})
      }
      this.setState({ mapCoords:mapCoords,isRefreshing: false});
    }

    render() {
        if (this.state.isLoading) 
            return null
        return <TrackExecutive
            mapCoords={this.state.mapCoords} 
            lat= {this.state.lat}
            long= {this.state.long}
            isRefreshing={this.state.isRefreshing}
            getCoordinates={this.getCoordinates}
            />
    }
}

export default TrackExecutiveViewContainer