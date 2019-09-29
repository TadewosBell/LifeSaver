import React from '../../node_modules/react';

function getGoogleMapsUrl(address) { 
    return `https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`; 
}

export default function MapWidget(props) {  
    return (<iframe title="Map Widget" width="600" height="500" id="gmap_canvas" src={getGoogleMapsUrl(props.address)} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"/>);
}
