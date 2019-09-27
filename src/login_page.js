import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Label, Input} from 'reactstrap';
import Header from './components/header';
import Button_cls from './components/button';
import './login_page.css';


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
                        
                     }
    }

    setFormValues=(event)=>{
        this.setState({[event.target.name]:event.target.value});
        console.log("formValuesChanging");  
    }


    handleLoginCredential=async(event)=>{
        event.preventDefault();
        
        //console.log(this.state);
  
        fetch(IPADDRESS+'/login',{ 
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify(this.state) 
        })
        .then(response => response.json())
        .then(resultData =>{
            console.log(resultData['token']);
            
            if(resultData['status']==='failed'){

            document.getElementById("loginStatusInfo").innerHTML="";
           
            var addParagraph = document.createElement("P");
            addParagraph.innerHTML = resultData['description'];
            addParagraph.style.fontSize="12px";
            addParagraph.style.color="red";
            addParagraph.style.fontWeight=600;
            addParagraph.style.textAlign="center";
            document.getElementById("loginStatusInfo").appendChild(addParagraph);
            }
            else{

                
            
            document.getElementById("loginStatusInfo").innerHTML="";
           
            var addParagraph = document.createElement("P");
            addParagraph.innerHTML = resultData['description'];
            addParagraph.style.fontSize="12px";
            addParagraph.style.color="lightgreen";
            addParagraph.style.fontWeight=600;
            addParagraph.style.textAlign="center";
            document.getElementById("loginStatusInfo").appendChild(addParagraph);

            
            if(resultData['token']){
                console.log(resultData);
                this.props.history.push({pathname:'/home',test:{token: resultData['token'] }});
                }
            else{
                //this.props.history.push("/");

                console.log("Please Login");
                }
            }
            
            })

        .catch(error =>{
            console.log(error)
        })
    }

    componentDidMount(){
        console.log(this.props);
        }


    render() { 
        return ( <div className="login_container col-lg-4">
                    <Header/>

                    <br/>
                    <div className="login_card col-lg-12 text-white ">

                        <div className='login_title'>
                            Login in to your account
                        </div>

                        {("test" in this.props.location)?(<p>{this.props.location.test.info}</p>):(<p></p>)}
    
                            
        

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
                                
                                <Button_cls name='Login'/>
                            </form>
                        
                        </div>
                    </div>
                </div> 
                );
            }
        }
        
export default login ;
