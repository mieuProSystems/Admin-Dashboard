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

    converTime = (DateAndTime) => {

    
        let Date = (DateAndTime.split(','))[0]
        let time = (DateAndTime.split(','))[1]
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        // let sec = (time.split(':'))[2]
        let part = hour > 12 ? 'pm' : 'am';
        
        // sec =(sec+'').length ==1 ? `0${sec}` : sec;
        min = (min+'').length === 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour+'').length === 1 ? `0${hour}` : hour;
      
        // return (`${hour}:${min}:${sec} ${part}`)
        return (`${Date} ${hour}:${min} ${part}`)
        
        
      }


    render() { 
        return ( <div>logHistory

            {(this.state.logHistory===false)?(<div>Loading...!</div>):(<div>

                <table className="table table-striped">
                     <thead>
                        <tr className='d-flex'>
                        <th className='col-lg-4'>Name</th>
                        <th className='col-lg-4'>Mail Id</th>
                        <th className='col-lg-2'>Logged In</th>
                        <th className='col-lg-2'>Logged Out</th>
                    </tr>
                    </thead>
                    


                {(this.state.logHistory.map((data, index)=>{
                    return(
                        <thead>
                            <tr className='d-flex'>
                                <td className='col-lg-4'>{data.firstName}</td>
                                <td className='col-lg-4'>{data.userMail}</td>
                                <td className='col-lg-2'>{this.converTime(data.loginTime)}</td>
                                <td className='col-lg-2'> {(data.logoutTime === undefined)?('null'):(this.converTime(data.logoutTime))} </td>
                            </tr>
                            </thead>
                           

                        
                    );

                }))}

            </table>

            </div>)}

        </div> );
    }
}
 
export default logHistory ;