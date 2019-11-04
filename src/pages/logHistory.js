import React, { Component } from 'react';
import IPADDRESS from '../components/server_ip';
import { async } from 'q';

class logHistory  extends Component {
    constructor(props) {
        super(props);
        this.state = { logHistory:false }
    }

    componentDidMount(){
        fetch(IPADDRESS+'/admin/getLoginSessions')
        .then(response => response.json())
        .then(async(resultData)=>{
            console.log(resultData);
            await this.setState({logHistory:resultData});
        })
        .catch((error)=>{ console.warn(error);
        }
        )
    }
    render() { 
        return ( <div>logHistory

            {(this.state.logHistory===false)?(<div>Loading...!</div>):(<div>

                {(this.state.logHistory.map((data, index)=>{
                    return(
                        <div>
                            {data.firstName} is logged in @ {data.loginTime} and logged out @ {data.logoutTime}

                        </div>
                    );

                }))}

            </div>)}

        </div> );
    }
}
 
export default logHistory ;