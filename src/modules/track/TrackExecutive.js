import React from "react";
import {
StyleSheet,
View,
Text,
TouchableOpacity,
Platform,
PermissionsAndroid
} from "react-native";
import MapView, {
Marker,
AnimatedRegion,
Polyline,
PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
import C from '../../../Constants';
import SyncStorage from 'sync-storage';
import axios from 'axios'
import Toast from 'react-native-simple-toast';
import car_icon from '../../Images/car-icon.png'

const LATITUDE_DELTA = 0.0029;
const LONGITUDE_DELTA = 0.0029;
var i=0;
var firstmarker = 0;
var lastmarker = 9999;
let latestinterval;
class TrackExecutive extends React.Component {
constructor(props) {
super(props);

this.state = {
mapCoords:[],
lat:"",
long:"",
};
}

getCoordinates = async () => {
//${this.props.navigation.state.params.id}
//5d29bcbd765651707b10b184
    try {
        const res = await axios.get(`${C.API}/track/${this.props.navigation.state.params.id}`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}})
        if (res.data.success) { 
            let tmp = res.data.data;
            let mapCoords = [];
            for(let i=0;i<tmp.length;i++){
                var temp ={};
                temp.latitude = tmp[i].lat;
                temp.longitude = tmp[i].long;
                mapCoords.push(temp);
                if(i==(tmp.length-1))
                this.setState({lat:temp.latitude,long:temp.longitude})
            }
            if(tmp.length>0)
                this.setState({ mapCoords:mapCoords });
            else{
                Toast.show("No route found...");
                this.props.navigation.goBack();
            }
        }
    }
    catch (e){
        console.warn("error: ",e)
    }
}

getLatestCoordinates = async () => {
    //${this.props.navigation.state.params.id}
    //5d29bcbd765651707b10b184
        try {
            const res = await axios.get(`${C.API}/track/latest/${this.props.navigation.state.params.id}`,{headers:{ Authorization: 'Bearer '+SyncStorage.get('LOGIN_DETAILS')}})
            if (res.data.success) { 
                let tmp = res.data.data;
                let mapCoords = [];
                var temp ={latitude:tmp.lat,longitude:tmp.long};
                mapCoords.push(temp);
                this.setState({lat:temp.latitude,long:temp.longitude})
                let oldcoords = this.state.mapCoords;
                this.setState({ mapCoords:oldcoords.concat(mapCoords) });
            }
        }
        catch (e){
            console.warn("error: ",e)
        }
}

componentDidMount() {
    this.getCoordinates();
    latestinterval= setInterval(this.getLatestCoordinates, 100000);
}

componentWillUnmount(){
    clearInterval(latestinterval);
}

getMapRegion = () => ({
    latitude: this.state.lat,
    longitude: this.state.long,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
});

calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
};

render() {
   let firstCoords = {latitude: 0, longitude: 0}
   let lastCoords = {latitude: 0, longitude: 0}
   if (this.state.mapCoords.length > 0) {
       firstCoords = this.state.mapCoords[0]
    //    firstCoords.latitude = firstCoords.latitude - 0
    //    firstCoords.longitude = firstCoords.longitude - 0

       const l = this.state.mapCoords.length - 1
       lastCoords = this.state.mapCoords[l]
    //    lastCoords.latitude = lastCoords.latitude - 0
    //    lastCoords.longitude = lastCoords.longitude - 0
   }
    return (
        <View style={styles.container}>
            <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE} 
            showUserLocation
            followUserLocation
            loadingEnabled
            region={this.getMapRegion()}
            >
                <Polyline 
                coordinates={this.state.mapCoords} 
                strokeWidth={7} 
                strokeColor="#3498DB" 
                />

                <MapView.Marker
                key = {firstmarker++}
                title="Start Point"
                coordinate={firstCoords}
                >
                </MapView.Marker>

                <MapView.Marker
                key = {lastmarker++}
                title="Last Point"
                coordinate ={lastCoords}
                image={car_icon}
                >
                </MapView.Marker>
                {/* {
                this.state.mapCoords.map((loc)=>{
                const longitude = loc.longitude - 0;
                const latitude = loc.latitude -0;
                if(firstndlast == 0 || firstndlast == (this.state.mapCoords.length-1))
                {
                    return (
                    <View>
                        <MapView.Marker
                        key = {firstndlast++}
                        coordinate ={{longitude,latitude}}
                        >
                        </MapView.Marker>
                    </View>
                    );
                }
                firstndlast++;
                })
                } */}
            </MapView>
            
            {/* <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
            {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
            </TouchableOpacity>
            </View> */}
        </View>
    );
}

}

const styles = StyleSheet.create({
container: {
...StyleSheet.absoluteFillObject,
justifyContent: "flex-end",
alignItems: "center"
},
map: {
...StyleSheet.absoluteFillObject
},
bubble: {
flex: 1,
backgroundColor: "rgba(255,255,255,0.7)",
paddingHorizontal: 18,
paddingVertical: 12,
borderRadius: 20
},
latlng: {
width: 200,
alignItems: "stretch"
},
button: {
width: 80,
paddingHorizontal: 12,
alignItems: "center",
marginHorizontal: 10
},
buttonContainer: {
flexDirection: "row",
marginVertical: 20,
backgroundColor: "transparent"
}
});

export default TrackExecutive;