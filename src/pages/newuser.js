import React, { Component } from 'react';
import {Label, Input} from 'reactstrap';
import Header from '../components/header';
import Button_cls from '../components/button';

/*import {
    FacebookLoginButton,
    GoogleLoginButton,
    TwitterLoginButton,
  } from "react-social-login-buttons";*/

import '../login_page.css';

import IPADDRESS from '../components/server_ip';






class newUser  extends Component {

    constructor(props) {
        super(props);
        this.state = {  firstName:'',
                        lastName:'',
                        gender:'',
                        userMail:'',
                        mobileNo:'',
                        password:'',
                        confirmPassword:'',
                        isPasswordMatched:'false'
                     }
    }

    setFormValues=async(event)=>{
        let getEventTargetName=event.target.name;
        
        await(this.setState({[event.target.name]:event.target.value}));
        if (getEventTargetName === 'password'){
        
            const {password, confirmPassword} = this.state;

            function isPasswordMatch1(){
            if (password === confirmPassword){
                return true;
            }
            return false;
        }
        console.log(password,confirmPassword);
        await(this.setState({isPasswordMatched:await(isPasswordMatch1())}));
        this.displayConfirmPasswordState();
    



        }
        console.log("formValuesChanged");   
    }



    comparePassword = async(event)=>{
        let getEventTargetName=event.target.name;
        
        console.log("comparePassword");
        if(getEventTargetName === 'confirmPassword'){
        await(this.setState({[event.target.name]:event.target.value}));
        }

        const {password, confirmPassword} = this.state;

        function isPasswordMatch2(){
            if (password === confirmPassword){
                return true;
            }
            return false;
        }
        console.log(password,confirmPassword);
        await(this.setState({isPasswordMatched:await(isPasswordMatch2())}));
        this.displayConfirmPasswordState();
    }



    handleLoginCredential=async(event)=>{
        event.preventDefault();
        const{isPasswordMatched}=this.state;
        
        console.log('In submit, Is PasswordMatched = '+isPasswordMatched);
        if(isPasswordMatched){
            await(this.setState({isPasswordMatched:'false'}));
            document.getElementById('registerErrorInfo').innerHTML="";


        fetch(IPADDRESS+'/register',{ 
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify(this.state) 
        })
        .then(response => response.json())
        .then(resultData =>{console.log(resultData);
            if(resultData['status']==='failed'){
                document.getElementById("registerErrorInfo").innerHTML="";
               
                var addParagraph = document.createElement("P");
                addParagraph.innerHTML = resultData['description'];
                addParagraph.style.fontSize="12px";
                addParagraph.style.color="red";
                addParagraph.style.fontWeight=600;
                addParagraph.style.textAlign="center";
                document.getElementById("registerErrorInfo").appendChild(addParagraph);
                }
            else{
                document.getElementById("registerErrorInfo").innerHTML="";
               
                var addParagraph = document.createElement("P");
                addParagraph.innerHTML = resultData['description'];
                addParagraph.style.fontSize="12px";
                addParagraph.style.color="lightgreen";
                addParagraph.style.fontWeight=600;
                addParagraph.style.textAlign="center";
                document.getElementById("registerErrorInfo").appendChild(addParagraph);     
                }
    
        
        })

        .catch(error =>{
            console.log(error)
        })
        
    }
    else{

    }
    
    }

    displayConfirmPasswordState=()=>{
        if(this.state.isPasswordMatched){
            document.getElementById("passwordErrorInfo").innerHTML="";
           
            var addParagraph = document.createElement("P");
            addParagraph.innerHTML = "Password Matched";
            addParagraph.style.fontSize="12px";
            addParagraph.style.color="lightgreen";
            addParagraph.style.fontWeight=600;
            document.getElementById("passwordErrorInfo").appendChild(addParagraph);
            }
        else{
            document.getElementById("passwordErrorInfo").innerHTML="";
           
            var addParagraph = document.createElement("P");
            addParagraph.innerHTML = "Password Mismatched";
            addParagraph.style.fontSize="12px";
            addParagraph.style.color="red";
            addParagraph.style.fontWeight=600;
            document.getElementById("passwordErrorInfo").appendChild(addParagraph);     
            }
    }

    render() { 
        return ( <div className="login_container col-lg-4">
                    <Header/>
                    <div className="login_card col-lg-12 text-white ">

                        <div className='login_title'>
                            New User? Sign Up Here!
                        </div>
                        <div id='registerErrorInfo'></div>
                        <div className="form_value">
                            <form onSubmit={this.handleLoginCredential}>

                                <Label>First Name </Label>
                                <Input type="text" name='firstName' value={this.state.firstName} placeholder="John" onChange={this.setFormValues} required/>
                                
                                <Label>Last Name </Label>
                                <Input type="text" name='lastName' value={this.state.lastName} placeholder="Wick" onChange={this.setFormValues} required/>
                                
                                <Label>Gender</Label>
                                <Input type="text" name='gender' value={this.state.gender} placeholder="Male/Female/Other" onChange={this.setFormValues} required/>
                                
                                <Label>User Email</Label>      
                                <Input type="email" name='userMail' value={this.state.user_mail} placeholder="user@example.com" onChange={this.setFormValues} required/>
    
                                <Label>Mobile No (Optional) </Label>
                                <Input name='mobileNo' value={this.state.mobileNo} pattern="^[0-9\b]+$" title="Must contain only numbers" placeholder="Enter Mobile No" onChange={this.setFormValues}/>

                                <Label>Password</Label>
                                <Input type="password" name='password' value={this.state.password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="my_Password@123" onChange={this.setFormValues} required/>
                                
                                

                                <Label>Confirm Password</Label>
                                <Input type="password" name='confirmPassword'  value={this.state.confirmPassword} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"  title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="my_Password@123" onChange={this.comparePassword} required/>
                                <div id = 'passwordErrorInfo'> </div>
                                <br/>

                                
                                
                                <Button_cls name='Register'/>
                            </form>
                        </div>
                    </div>
                </div> 
                );
    }
}



export default newUser ;