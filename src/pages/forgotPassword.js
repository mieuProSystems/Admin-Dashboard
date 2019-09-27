import React, { Component } from 'react';

import '../loginPage.css';
import '../CSS/forgotPassword.css';

import {Input, Spinner} from 'reactstrap';
import Header from '../components/header';
import Button_Cls from '../components/button';
import IPADDRESS from '../components/server_ip';

class forgetPassword  extends Component {

    constructor(props) {
        super(props);
        this.state = {userMail:'',
                        isLoading:false
                    }
    }
    //Set value of the state variable
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value});
        //console.log("userMailEntered");
        //console.log(IPADDRESS);   
    }

    // Send request to the server and displays the response
    handleCredential=async(e)=>{
        e.preventDefault();
        await this.setState({isLoading:true});
        
        fetch(IPADDRESS+'/forgot',{ 
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify(this.state) 
        })
        .then(response => response.json())
        .then(resultData =>{console.log(resultData['status']);
            this.setState({isLoading:false});

            if(resultData['status']==='failed'){

                let displayStatusDescription=document.getElementById("forgotErrorInfo");
                displayStatusDescription.innerHTML="";
                displayStatusDescription.innerHTML = resultData['description'];
                displayStatusDescription.style.color="red";
            }
            else{
                let displayStatusDescription=document.getElementById("forgotErrorInfo");
                displayStatusDescription.innerHTML="";
                displayStatusDescription.innerHTML = resultData['description'];
                displayStatusDescription.style.color="lightgreen";
                }
        
        })
        .catch(error =>{
            console.log(error);
            this.setState({isLoading:false});

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
                            <form onSubmit={this.handleCredential}>
                                <label>Enter Your Registered mail:</label>
                                <Input type="email" name='userMail' value={this.state.user_mail} placeholder="user@example.com" onChange={this.handleChange} required/><br/><br/>
                             
                                {(this.state.isLoading)?(<button className="btn-lg btn-block primary" disabled={true}><Spinner as="span"animation="animation" size="sm"/>Request to change password</button>):(<Button_Cls name='Request to Change Password'/>)}
                            </form>
                        </div>
                    </div>
                </div>
                );
            }
        }
export default forgetPassword ;