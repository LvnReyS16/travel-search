import React from 'react';
import GoogleMapReact from 'google-map-react';
import {Paper, Typography, useMediaQuery} from '@material-ui/core';
import LocationOnOutlineIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import placeholderPlace from '../../assets/Place.jpg'
import useStyles from './styles';
import mapStyles from './mapStyles';

const Map = ({weatherData,setCoordinates, setBounds,coordinates, places, setChildClicked}) => {

    const classes = useStyles();
    const isDesktop= useMediaQuery('(min-width:600px)');
    


    return (
        <div className={classes.mapContainer}>
            <GoogleMapReact
             bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
             defaultCenter={coordinates}
             center={coordinates}
             defaultZoom={14}
             margin={[50,50,50,50]} 
             options={{disableDefaultUI: true, zoomControl: true, styles:mapStyles}}
             onChange={(e)=>{
                 
                setCoordinates({ lat: e.center.lat, lng: e.center.lng})
                setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw})
            }}
           onChildClick={(child) => setChildClicked(child)}
            >
               {places?.map((place,i)=>(
                   <div 
                   className={classes.markerContainer}
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    key={i}
                   >
                       {!isDesktop?(
                           <LocationOnOutlineIcon color="primary" fontSize="Large"/>
                       ):(
                           <Paper elevation={3} className={classes.paper}>
                               <Typography className={classes.Typography} variant="subtitle2" gutterBottom>
                                   {place.name}

                               </Typography>
                               <img 
                                    className={classes.pointer}
                                    src={place.photo ? place.photo.images.large.url : placeholderPlace}
                                    alt={place.name}
                               />
                               <Rating  size="small" value={Number(place.rating)} readOnly/>
                           </Paper>
                       )}
                   </div>
               ))}
                 {weatherData?.list?.length && weatherData.list.map((data, i) => (
                   <div key={i} lat={data.coord.lat} lng={data.coordinates.lon}>
                    <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}alt="weather icon" height="70px" />
                   </div>
               ))}
            </GoogleMapReact>
        </div>
    );
}

export default Map;
