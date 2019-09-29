import React, { Component } from '../../node_modules/react';
import Priority from "./Priority";
import Service from "./Service";
import Location from "./Location";
import DateTime from "./DateTime";
import CallerContact from "./CallerContact";

class CallEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urgency: "High", 
            title: "Tree down on power line", 
            service: "Electrical",
            address: "1000 Hilltop Cir, Baltimore, MD 21250",
            dateTime: "3:00 AM EST",
            locationDetails: "West Hill Apartments",
            description: "Power is out, large tree fell on power line.",
            phoneNumber: "(555) 555-5555"
        }
    }
    render() { 
        return (
        <div>
            <h1>{this.state.title}</h1>
            <Priority level={this.state.urgency}/>
            <Service type={this.state.service}/>
            <DateTime dateTime={this.state.dateTime} />
            <p>{this.state.description}</p>
            <Location address={this.state.address} details={this.state.locationDetails} />
            <CallerContact phoneNumber={this.state.phoneNumber}/>
        </div>
        );
    }
}
 
export default CallEvent;