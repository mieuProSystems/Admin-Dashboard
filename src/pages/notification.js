import React, { Component } from 'react';
import IPADDRESS from '../components/server_ip';

import '../CSS/notification.css';
class notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback:'false',
            unreadFeedbackCount:0
          }
    }

    componentDidMount(){
        console.log(this.props);
        //console.log("-----------------");

        this.setState({feedback:this.props.feedback});
        this.setState({unreadFeedbackCount:this.props.unreadFeedbackCount});

    }


    componentWillReceiveProps(){
        this.setState({feedback:this.props.feedback});
        this.setState({unreadFeedbackCount:this.props.unreadFeedbackCount});

    }

    converTime = (time) => {
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        // let sec = (time.split(':'))[2]
        let part = hour > 12 ? 'pm' : 'am';
        
        // sec =(sec+'').length ==1 ? `0${sec}` : sec;
        min = (min+'').length === 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour+'').length === 1 ? `0${hour}` : hour;
      
        // return (`${hour}:${min}:${sec} ${part}`)
        return (`${hour}:${min} ${part}`)
      }

    render() { 

        

        return ( <div>
                {/* <h4>Notification Page! <i>(Not Yet Completed)</i></h4> */}

                    <table className="table">
                    
                        <tr className='d-flex'>
                        <th className="col-lg-12">Notifications {(this.state.unreadFeedbackCount !== 0) ?(<i style={{color:'lightgreen'}}>(Unread Messages = {this.state.unreadFeedbackCount})</i>):null}</th>
                        </tr>
                    
            

                {(this.state.feedback==='false')?(<div>Loading...!</div>):(this.state.feedback.map((feedback, index)=>{
                    if(feedback.read === true){
                    return (
                        <div className="userFeedbacks">
                
                    <tr className='d-flex'>
                    <th className="col-lg-2">{feedback.userMail}<br></br> <div style={{fontSize:12}}>Received At: <i>{feedback.givenDate} <br></br> {this.converTime(feedback.givenTime)}</i></div></th>
                    <td className="col-lg-8">{feedback.feedback}</td>
                    {/* <td className="col-lg-2">{feedback.givenDate}</td> */}
                    {/* <td className="col-lg-1">{this.converTime(feedback.givenTime)}</td> */}
                     <td className="col-lg-2"><button className='replyButton' >Reply</button></td> 
                   
                    
                    </tr>
                
                   </div>
                    );}
                    else{
                        return(
                        <div className="userFeedbacks">
                        
                    <tr className='d-flex'>
                    <th className="col-lg-2">{feedback.userMail} <br></br> <div style={{fontSize:12}}><i>Received At:{feedback.givenDate} <br></br>{this.converTime(feedback.givenTime)}</i></div></th>
                    <td className="col-lg-8">{feedback.feedback}</td>
                    {/* <td className="col-lg-2">{feedback.givenDate}</td> */}
                    {/* <td className="col-lg-1">{this.converTime(feedback.givenTime)}</td> */}
                    <td className="col-lg-2"><button className='replyButton'>Reply</button></td>
                    
                    </tr>
            
                   </div>
                    );

                    }
                        

                }))}
            
            </table>
                </div> );
    }
}
 
export default notification ;