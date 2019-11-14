import React, { Component } from 'react';

import "../CSS/accountinfo.css"
import IPADDRESS from '../components/server_ip';

import {Button, Label, Input} from 'reactstrap';

import ResponseModal from '../components/logoutModal';


class accountinfo  extends Component {


    componentDidMount(){

        fetch(IPADDRESS +'/home/myProfile/getDetails',{ 

            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify({loginToken:this.props.token})
            
        })
        .then(response=>response.json())
        .then(async(resultData)=>{

            await this.setState({firstName:resultData['firstName'], lastName:resultData['lastName'], gender:resultData['gender'], userMail:resultData['userMail'], mobileNo:resultData['mobileNo']});
            console.log(resultData);
        })
        .catch((error)=>{
            console.log("error");
        })
    

    }


    constructor(props) {
        super(props);
        this.state = {
                       firstName:"",
                       lastName:"",
                       gender:"",
                       userMail:"",
                       mobileNo:"",
                       oldPassword:"",
                       newPassword:"",
                       token:""

                    }
    }

    changePassword = ()=>{

    }

    openForm = ()=>{
        document.getElementById("changePasswordForm").style.display='block';
    }

    setFormValues = (event)=>{
        this.setState({[event.target.name]:event.target.value});
    }


    handleCredentials = (e)=>{
        document.getElementById('verifyButton').disabled=true;
        e.preventDefault();
        fetch(IPADDRESS+'/admin/changePassword',{ 
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify({userMail:this.state.userMail,
                                oldPassword:this.state.oldPassword
                            }) 
        })
        .then(response => response.json())
        .then((resultData)=>{
            //console.log(resultData);
            document.getElementById('verificationInfo').innerHTML=resultData['description'];

            if (resultData['status'] ==='success'){
                document.getElementById('verificationInfo').style.color="green";
                document.getElementById('newPasswordFormDiv').style.display="block";
                
                //document.getElementById('changePasswordForm').style.display="none";
                this.setState({token:resultData['token']});
            }
            else{
                document.getElementById('verificationInfo').style.color="red";
                document.getElementById('verifyButton').disabled=false;
            }
        })
    }


    handleNewPasswordCredentials = (e)=>{
        e.preventDefault();
        document.getElementById('verifyButton').disabled=true;
        
        fetch(IPADDRESS+'/admin/newPassword',{ 
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify({changePasswordToken:this.state.token,
                                newPassword:this.state.newPassword
                                }) 
        })
        .then(response => response.json())
        .then((resultData)=>{
            //console.log(resultData);
             
             if (resultData['status'] ==='success'){
                this.setState({showModal:true});
                 document.getElementById("modalWindow").innerHTML=resultData['description'];
                 document.getElementById("modalWindow").style.color='green';    
             }
             else{
                //this.setState({showModal:true});
                document.getElementById("newPasswordErrorInfo").innerHTML=resultData['description'];
                document.getElementById("newPasswordErrorInfo").style.color='red';
             }
        })
    }

    render() { 
        return (<div>
                    <div id='accountInfoTitle'>
                        <h4>Admin Details</h4>
                    </div>
                    <div id='accountInfo'>
                        <table className="table table-striped">
                            <thead>
                                <tr className='d-flex'>
                                    <th className="col-lg-3">First Name</th>
                                    <th className="col-lg-9">{this.state.firstName}</th>
                                </tr>
                            </thead>

                            <thead>
                                <tr className='d-flex'>
                                    <th className="col-lg-3">Last Name</th>
                                    <th className="col-lg-9">{this.state.lastName}</th>
                                </tr>
                            </thead>

                            <thead>
                                <tr className='d-flex'>
                                    <th className="col-lg-3">Gender</th>
                                    <th className="col-lg-9">{this.state.gender}</th>
                                </tr>
                            </thead>

                            <thead>
                                <tr className='d-flex'>
                                    <th className="col-lg-3">Mail Id</th>
                                    <th className="col-lg-9">{this.state.userMail}</th>
                                </tr>
                            </thead>

                            <thead>
                                <tr className='d-flex'>
                                    <th className="col-lg-3">Mobile No</th>
                                    <th className="col-lg-9">{this.state.mobileNo}</th>
                                </tr>
                            </thead>  
                
                            <thead>
                                <tr className='d-flex'>
                                    <th className="col-lg-3">Password</th>
                                    <th className="col-lg-9">***************<Button id="changePassword" onClick={this.openForm}>Change Password</Button></th>
                                </tr>
                            </thead>               
            
                        </table>

                    <div style={{display:'none'}} id="changePasswordForm">
                        <center>
                            <h5 style={{backgroundColor:'#2c3e50', color:'white'}}>Change Password</h5>
                        </center>

                        <form onSubmit={this.handleCredentials}>
                            <Label>Old Password: </Label>
                            <Input type="text" name='oldPassword' value={this.state.user_mail} placeholder="Enter Old Password" onChange={this.setFormValues} required/>
                            <br/>
                            <div id = 'verificationInfo'></div>

                            <center>
                                <Button type="submit" className="btn btn-block" id="verifyButton">Verify</Button>
                            </center>
                        </form>

                        <div id="newPasswordFormDiv" style={{display:'none'}}>
                            <form onSubmit={this.handleNewPasswordCredentials}>
                                <Label>Enter New Password: </Label>
                                <Input type="password" name='newPassword' value={this.state.newPassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="Enter New Password" onChange={this.setFormValues} required/>
                                <br/>
                                <div id="newPasswordErrorInfo"></div>
                                <center>
                                    <Button type="submit" className="btn btn-block" id="changePasswordButton">Change Password</Button>
                                </center>
                            </form>
                        </div>
                    </div>
                </div>

                <ResponseModal
                    show={this.state.showModal}
                    onHide={() => {this.setState({showModal:false});
                                    window.location.reload();}}
                    headerTitle={ [ <div id='modalTitle'> Change Password  </div>]}
                    description={[<div id="modalWindow"></div>]}    
                />
            </div>
                );
            }
        }
export default  accountinfo;