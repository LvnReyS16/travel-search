import React from 'react';
import {Box, Typography, Button, Card, CardMedia, CardContent,CardActions,Chip} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';
import placeholderPlace from '../../assets/Place.jpg';
import useStyles from './styles';

const PlaceDetails = ({place,selected,refProp}) => {
    const classes= useStyles();

    
    if(selected) {
        console.log({refProp})
        
        refProp?.current?.scrollIntoView({behavior: "smooth" , block:"start"});
    }
    return (
        <Card elevation={6}>
            <CardMedia 
            style={{height:350}} 
            image={place.photo ? place.photo.images.large.url : placeholderPlace}
             title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display="flex" justifyContent="space-between">
                <Rating   value={Number(place.rating)} readOnly/>
                    <Typography variant="subtitle1" gutterBottom> out of {place.num_reviews} reviews
                    </Typography>
                </Box>
                


                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">Price
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>{place.price_level}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Ranking
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>{place.ranking}
                    </Typography>
                </Box>
                {place?.awards?.map((award,index)=>(
                    <Box key={index} my={1} display="flex" justifyContent="space-between">
                        <img src={award.images.small} alt={award.display_name}></img>
                        <Typography  key={index} variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                    </Box>
                ))}
                {place?.cuisine?.map(({name,index})=>(
                    <Chip key={index} size="small" label={name}
                    className={classes.chip}/>
                ))}
                {place?.address && (
                    <Typography gutterBottom variant="body2" className={classes.subtitle}>
                        <LocationOnIcon/> {place.address}
                    </Typography>
                )}
                {place?.phone && (
                    <Typography gutterBottom variant="body2" className={classes.spacing}>
                        <PhoneIcon/> {place.phone}
                    </Typography>
                )}
                <CardActions>
                    <Button size="small" color="primary" onClick={()=> window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={()=> window.open(place.web_website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
         </Card>
           
    );
}

export default PlaceDetails;
