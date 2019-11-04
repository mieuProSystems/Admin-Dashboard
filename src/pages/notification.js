import React, { Component } from 'react';
import IPADDRESS from '../components/server_ip';

import '../CSS/notification.css';


class notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback:'false',
            unreadFeedbackCount:0,
            replyMessage:null
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


      showReplyMessageDiv= async(event)=>{
          event.preventDefault();

          
          

          var replyMessageDiv=document.getElementsByClassName('replyMessageBox');

          for(let i=0; i < replyMessageDiv.length;i++){
              console.log(replyMessageDiv[i]);
             if (replyMessageDiv[i].style.display !=='none'){
                 replyMessageDiv[i].style.display='none';
                 document.getElementById('replyButton'+i).disabled =false;
             }
           }


          let userIndex = event.target.getAttribute('userIndex');
          document.getElementById('user'+userIndex).style.display='block';
          document.getElementById('replyButton'+userIndex).disabled =true ;

          document.getElementById('user'+userIndex).scrollIntoView({
            behavior: "smooth"
        });
          
          await this.setState({replyMessage:''});
      }

      
      closeReplyMessageDiv= async(event)=>{
        event.preventDefault();

        
        //document.getElementById('replyButton'+replyButtonId).disabled ='false';
        let userIndex = event.target.getAttribute('cancelButtonId');
        //console.log(userIndex +"cancel");
        //console.log(document.getElementById('replyButton'+userIndex));
        document.getElementById('replyButton'+userIndex).disabled =false;
        
    
        document.getElementById('user'+userIndex).style.display='none';
        await this.setState({replyMessage:''});

    }

    ReplyMessageContent=async(event)=>{
        await this.setState({replyMessage:event.target.value});
        console.log(this.state.replyMessage);
    }

    sendReplyMessage =(e)=>{
        e.preventDefault();
        
        

        var sendButtonIndex =e.target.getAttribute('sendButtonIndex');
        var replyMessage =this.state.replyMessage;

        this.props.reduceFunction(sendButtonIndex, replyMessage);
        
        fetch(IPADDRESS+'/home/admin/replyFeedback', {
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify({userMail:e.target.getAttribute('userMail'), givenTime: e.target.getAttribute('givenTime') ,givenDate:e.target.getAttribute('givenDate'), replyMessage:this.state.replyMessage})
        })
        .then(response => response.json())
        .then((resultData)=>{
            console.log(resultData);
            
            document.getElementById('user'+ sendButtonIndex).innerHTML='';
            var responseDiv = document.createElement('div');
            responseDiv.innerHTML=resultData['description'];
            
            if(resultData['status']==='success'){
                responseDiv.style.color='green'; 
                
                
            }
            else{
                responseDiv.style.color='red';
            }

            document.getElementById('user'+ sendButtonIndex).append(responseDiv);

            

        })
        .catch((error)=>{
            alert(error);
        })
        
        //console.log(this.state.replyMessage,e.target.getAttribute('userMail'))
    }

    showRepliedMessage = (e)=>{
        
        (document.getElementById('repliedMessage'+e.target.getAttribute('viewButtonIndex')).style.display ==='none')?(document.getElementById('repliedMessage'+e.target.getAttribute('viewButtonIndex')).style.display ='block'):(document.getElementById('repliedMessage'+e.target.getAttribute('viewButtonIndex')).style.display ='none');
        
        document.getElementById('repliedMessage'+e.target.getAttribute('viewButtonIndex')).scrollIntoView({behavior:'smooth'});
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
                    <th className="col-lg-4" style={{wordWrap:'break-word'}}>{feedback.userMail}<br></br> <div style={{fontSize:12}}>Received At: <i>{feedback.givenDate} <br></br> {this.converTime(feedback.givenTime)}</i></div></th>
                    <td className="col-lg-6" style={{wordWrap:'break-word'}}>{feedback.feedback}</td>
                    {(feedback.isReplied===true)?(<td className="col-lg-2" style={{color:'lightgreen'}}> Replied <button viewButtonIndex={index} onClick={(e)=>{this.showRepliedMessage(e)}}>View</button></td>):(<td className="col-lg-2"><button className='replyButton' id={'replyButton'+index} userIndex={index} onClick={(event)=>{  this.showReplyMessageDiv(event)}} >Reply</button></td>)} 
                    </tr>
                    <div className="replyMessageBox" id= {'user'+index} style={{backgroundColor:'#ccc', display:'none', transition:'.5s'}}>   
                        <tr  className='d-flex' >
                        <th className="col-lg-2">Reply</th>
                        <td className="col-lg-1">Body:</td>
                        <td  className="col-lg-6"> 
                            <textarea rows='4' cols='60' name="replyMessage" value={this.state.replyMessage} onChange={(event)=>{this.ReplyMessageContent(event)}}/>
                                <button className='cancelButton' cancelButtonId={index} onClick={(event)=>{this.closeReplyMessageDiv(event)}}> Cancel</button> 
                                <button className='sendButton' sendButtonIndex={index} userMail={feedback.userMail} givenDate={feedback.givenDate} givenTime={feedback.givenTime} onClick={(e)=>{ this.sendReplyMessage(e)}}> Send Reply</button>
                        </td>
                    
                    </tr>
                    </div>
                    <div className="repliedMessage" id= {"repliedMessage"+index} style={{display:'none', backgroundColor:'#ccc'}}>
                    <tr className='d-flex'>
                    {(feedback.isReplied===true)?(<div > <b> Replied: </b> {feedback.repliedMessage}</div>):null}
                    
                    </tr>
                    </div>

                
                   </div>
                    );}
                    else{
                        return(
                        <div className="userFeedbacks" style={{backgroundColor:'#ccc'}}>
                        
                    <tr className='d-flex'>
                    <th className="col-lg-4" style={{wordWrap:'break-word'}}>{feedback.userMail} <br></br> <div style={{fontSize:12}}><i>Received At:{feedback.givenDate} <br></br>{this.converTime(feedback.givenTime)}</i></div></th>
                    <td className="col-lg-6" style={{wordWrap:'break-word'}}>{feedback.feedback}</td>
                    <td className="col-lg-2"><button className='replyButton' id={'replyButton'+index} userIndex={index} onClick={(e)=>{this.showReplyMessageDiv(e)}}>Reply</button></td>
                    
                    </tr>

                     
                     <div className="replyMessageBox" id= {'user'+index} style={{backgroundColor:'#ccc', display:'none', transition:'.5s'}}>   
                         <tr  className='d-flex' >
                         <th className="col-lg-2">Reply</th>
                         <td className="col-lg-1">Body:</td>
                         <td  className="col-lg-6"> 
                             <textarea rows='4' cols='60' name="replyMessage" value={this.state.replyMessage} onChange={(event)=>{this.ReplyMessageContent(event)}}/>
                                 <button className='cancelButton' cancelButtonId={index} onClick={(event)=>{this.closeReplyMessageDiv(event)}}> Cancel</button> 
                                 <button className='sendButton' sendButtonIndex={index} userMail={feedback.userMail} givenDate={feedback.givenDate} givenTime={feedback.givenTime} onClick={(e)=>{ this.sendReplyMessage(e);}}> Send Reply</button>
                         </td>
                    
                     </tr>
                     </div>
            
                   </div>
                    );

                    }
                        

                }))}
            
            </table>
                </div> );
    }
}
 
export default notification ;