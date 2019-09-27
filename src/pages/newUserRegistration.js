import React, { Component } from 'react';
import {Label, Input, Spinner} from 'reactstrap';
import Header from '../components/header';
import Button_Cls from '../components/button';

/*import {
    FacebookLoginButton,
    GoogleLoginButton,
    TwitterLoginButton,
  } from "react-social-login-buttons";*/

import '../loginPage.css';
import '../CSS/newUserRegistration.css';
import Modal from '../components/showModal'

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
                        isPasswordMatched:'false',
                        isLoading:false,
                        showModal:false
                     }
    }

    //Set value of the state variables && also compare the password with ConfirmPassword to display the error message
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
        //console.log(password,confirmPassword);
        await(this.setState({isPasswordMatched:await(isPasswordMatch1())}));
        this.displayConfirmPasswordState();
        }
        //console.log("formValuesChanged");   
    }


    // Comparing password with ConfirmPassword
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

        //console.log(password,confirmPassword);
        await(this.setState({isPasswordMatched:await(isPasswordMatch2())}));
        this.displayConfirmPasswordState();
    }



    //Displays Password Status Message
    displayConfirmPasswordState=()=>{
        if(this.state.isPasswordMatched){
            let displayPasswordStatus=document.getElementById("passwordErrorInfo");
            displayPasswordStatus.innerHTML = "Password Matched";
            displayPasswordStatus.style.color="lightgreen";
            }
        else{
            let displayPasswordStatus=document.getElementById("passwordErrorInfo");
            displayPasswordStatus.innerHTML = "Password Mismatched";
            displayPasswordStatus.style.color="red";
            }
        }



    // Send form values to the server and displays the status
    handleRegisterCredential=async(event)=>{
        event.preventDefault();
        await this.setState({isLoading:true});
        await this.setState({showModal: true});
        
        const{isPasswordMatched}=this.state;
        console.log(this.state);
        
        //console.log('In submit, Is PasswordMatched = '+isPasswordMatched);

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
            .then(resultData =>{
                this.setState({isLoading:false})
        
                console.log(resultData);
                if(resultData['status']==='failed'){
                    let displayRegisterStatus=document.getElementById("registerErrorInfo");
                    displayRegisterStatus.innerHTML = resultData['description'];
                    alert(resultData['description']);
                    displayRegisterStatus.style.color="red";
                }
                else{
                    let displayRegisterStatus=document.getElementById("registerErrorInfo");
                    displayRegisterStatus.innerHTML = resultData['description'];
                    alert(resultData['description']);
                    displayRegisterStatus.style.color="lightgreen";
                }
            })
            .catch(error =>{
                console.log(error);
                this.setState({isLoading:false});
        
            })
        
        }
        else{
            document.getElementById("registerErrorInfo").innerHTML="Passwords Mismatched";
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
                            <form onSubmit={this.handleRegisterCredential}>

                                <Label>First Name </Label>
                                <Input type="text" name='firstName' value={this.state.firstName} placeholder="Steve" onChange={this.setFormValues} required/>
                                
                                <Label>Last Name </Label>
                                <Input type="text" name='lastName' value={this.state.lastName} placeholder="Smith" onChange={this.setFormValues} required/>
                                
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

                                {(this.state.isLoading)?(<button className="btn-lg btn-block primary" disabled={true}><Spinner as="span"animation="animation" size="sm"/>Register</button>):(<Button_Cls name='Register'/>)}
                                
                    
                            </form>
                        </div>
                    </div>

                    
                </div> 
                );
    }
}



export default newUser ;