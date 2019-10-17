import React from '../../node_modules/react';

function getGoogleMapsUrl(address) { 
    return `https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`; 
}

export default function MapWidget(props) {  
    return (<iframe title="Map Widget" width="600" height="500" id="gmap_canvas" src={getGoogleMapsUrl(props.address)} frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"/>);
}
