import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Label, Input, Spinner} from 'reactstrap';
import Header from './components/header';
import ButtonCls from './components/button';
import './loginPage.css';


import IPADDRESS from './components/server_ip';

/*import {
    FacebookLoginButton,
    GoogleLoginButton,
    TwitterLoginButton,
  } from "react-social-login-buttons";*/



class login  extends Component {

    constructor(props) {
        super(props);
        this.state = {userMail:'',
                        password:'',
                        isLoading:false,
                        }
    }

    
    // Set value of the state variables
    setFormValues=(event)=>{
        this.setState({[event.target.name]:event.target.value});
    }

    // Send login credential data to the server and displays the result/ redirect to new page 
    handleLoginCredential=async(event)=>{
        event.preventDefault();
        
        await this.setState({isLoading:true});
        //console.log(this.state);

        document.getElementById('log').innerHTML='';
  
        fetch(IPADDRESS+'/admin/login',{ 
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify(this.state) 
        })
        .then(response => response.json())
        .then(resultData =>{
            this.setState({isLoading:false});
        
            //console.log(resultData['token']);
            
            
            //Displays the failed status 
            if(resultData['status']==='failed'){
                let displayStatusDescription=document.getElementById("loginStatusInfo");
                displayStatusDescription.innerHTML='';
                displayStatusDescription.innerHTML = resultData['description'];
                displayStatusDescription.style.color="red";
            }// Displays success status
            else{
             let displayStatusDescription=document.getElementById("loginStatusInfo");
                displayStatusDescription.innerHTML="";
                displayStatusDescription.innerHTML = resultData['description'];
                displayStatusDescription.style.color="lightgreen";

            // prevent direct accessing the Url without login
            if(resultData['token']){
                console.log(resultData);
                this.props.history.push('/home',{response:resultData});
                }
            else{
                console.log("Please Login");
                }
            }
            
            })

        .catch(error =>{
            this.setState({isLoading:false});
         
            alert(error);
        })
    }

    // componentDidMount(){
    //     console.log(this.state.isLoading);
    //     {(!this.state.isLoading)?(console.log('Loading')):(console.log("error"))}
    // }

    render()
    
    {
        return ( <div className="login_container col-lg-4">
                
                    <Header/>

                    <br/>
                    <div className="login_card col-lg-12 text-white ">

                        <div className='login_title'>
                            Login in to your account
                        </div>
                        
                        {("test" in this.props.location)?(<div id="log" style={{color:'lightgreen', textAlign:'center'}}>{this.props.location.test.info}</div>):(<div id='log'></div>)}
    
                        <div id="loginStatusInfo"></div>
                        <div className="form_value">
                            <form onSubmit={this.handleLoginCredential}>

                                <Label>User mail: </Label>
                                <Input type="email" name='userMail' value={this.state.user_mail} placeholder="user@example.com" onChange={this.setFormValues} required/>

                                <Label>Password:</Label>
                                <Input type="password" name='password' value={this.state.password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" placeholder="my_Password@123" onChange={this.setFormValues} required/>

                                <div className="forgetPassword_newUser">
                                    <Link to='/forgot'><h6>Forgot Password?</h6></Link>
                                    <Link to ='/newUser'><h6>New User? Register</h6></Link>
                                </div> 
                                <br/>

                                {(this.state.isLoading)?(<button className="btn-lg btn-block primary" disabled={true}><Spinner as="span"animation="animation" size="sm"/>Loading...{this.state.isLoading}</button>):(<ButtonCls name='Login'></ButtonCls>)}
   
                            </form>

                                                    
                            </div>
                    </div>   
                    </div> 
                );
            }
        }


        
export default login ;
