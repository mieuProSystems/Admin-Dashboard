import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Label, Input, Spinner, Button, Modal, ButtonToolbar} from 'reactstrap';
import Header from './components/header';
import Button_cls from './components/button';
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
        //console.log("formValuesChanging");  
    }

    // Send login credential data to the server and displays the result/ redirect to new page 
    handleLoginCredential=async(event)=>{
        event.preventDefault();
        
        await this.setState({isLoading:true});
        console.log(this.state);
  
        fetch(IPADDRESS+'/login',{ 
            
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
                this.props.history.push({pathname:'/home',test:{token: resultData['token'] }});
                }
            else{
                console.log("Please Login");
                }
            }
            
            })

        .catch(error =>{
            this.setState({isLoading:false});
         
            console.log(error);
        })
    }

    componentDidMount(){
        console.log(this.state.isLoading);
        {(!this.state.isLoading)?(console.log('Loading')):(console.log("error"))}

    }


    // MyVerticallyCenteredModal(props) {
    //     return (
    //       <Modal
    //         {...props}
    //         size="lg"
    //         aria-labelledby="contained-modal-title-vcenter"
    //         centered
    //       >
    //         <Modal.Header closeButton>
    //           <Modal.Title id="contained-modal-title-vcenter">
    //             Modal heading
    //           </Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //           <h4>Centered Modal</h4>
    //           <p>
    //             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
    //             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
    //             consectetur ac, vestibulum at eros.
    //           </p>
    //         </Modal.Body>
    //         <Modal.Footer>
    //           <Button onClick={props.onHide}>Close</Button>
    //         </Modal.Footer>
    //       </Modal>
    //     );
    //   }
      


    render()
    
    {
        
        

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

                                {(this.state.isLoading)?(<button className="btn-lg btn-block primary" disabled={true}><Spinner as="span"animation="animation" size="sm"/>Loading...{this.state.isLoading}</button>):(<Button_cls name='Login'></Button_cls>)}
   
                            </form>

                                                    
                            </div>
                    </div>




                    
                    </div> 
                );
            }
        }


        
export default login ;
