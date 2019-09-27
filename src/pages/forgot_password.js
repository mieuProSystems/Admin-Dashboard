import React, { Component } from 'react';

import '../login_page.css';

import {Input} from 'reactstrap';
import Header from '../components/header';
import Button_Cls from '../components/button';
import IPADDRESS from '../components/server_ip';

class forget_password  extends Component {

    constructor(props) {
        super(props);
        this.state = {userMail:''
                     }
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value});
        console.log("userMailEntered");
        console.log(IPADDRESS);
        
    }


    handleLoginCredential=(e)=>{
        e.preventDefault();
        
        fetch(IPADDRESS+'/forgot',{ 
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify(this.state) 
        })
        .then(response => response.json())
        .then(resultData =>{console.log(resultData['status']);
        
            if(resultData['status']==='failed'){

                document.getElementById("forgotErrorInfo").innerHTML="";
                console.log(resultData);
                var addParagraph = document.createElement("P");
                addParagraph.innerHTML = resultData['description'];
                addParagraph.style.fontSize="12px";
                addParagraph.style.color="red";
                addParagraph.style.fontWeight=600;
                addParagraph.style.textAlign="center";
                document.getElementById("forgotErrorInfo").appendChild(addParagraph);
                }
                else{
                    document.getElementById("forgotErrorInfo").innerHTML="";
               
                var addParagraph = document.createElement("P");
                addParagraph.innerHTML = resultData['description'];
                addParagraph.style.fontSize="12px";
                addParagraph.style.color="lightgreen";
                addParagraph.style.fontWeight=600;
                addParagraph.style.textAlign="center";
                document.getElementById("forgotErrorInfo").appendChild(addParagraph);
                }
        
        
        
        })

        .catch(error =>{
            console.log(error)
        })

    }
    render() { 
        return ( <div className="login_container col-lg-4">
                    <Header/>
                    <div className="login_card col-lg-12 text-white">
                        
                        <div className='login_title'>
                            Forget Password?
                        </div>
                        <div id="forgotErrorInfo"></div>
                        <div className="form_value">
                            <form onSubmit={this.handleLoginCredential}>
                                <label>Enter Your Registered mail:</label>
                                <Input type="email" name='userMail' value={this.state.user_mail} placeholder="user@example.com" onChange={this.handleChange} required/><br/><br/>
                             
                                <Button_Cls name='Request to Change Password'/>
                            </form>
                        </div>
                    </div>
                </div>
                );
            }
        }
export default forget_password ;