import React, { Component } from 'react';
import IPADDRESS from '../components/server_ip';
class notification extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        fetch(IPADDRESS+'/home/admin/getFeedback')
        .then(response=>response.json())
        .then((resultData)=>{
            console.log(resultData);
        })
    }
    render() { 
        return ( <h4>Notification Page! <i>(Not Yet Completed)</i></h4> );
    }
}
 
export default notification ;