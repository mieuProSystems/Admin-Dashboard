import React, { Component } from 'react';
import IPADDRESS from '../components/server_ip';
import '../CSS/manageUser.css';

import ManageUserModal from '../components/manageUserModal'



class manageUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:'false',
            adminData:'false',
            showModal:false
          }
    }
    componentDidMount(){
        fetch(IPADDRESS+"/home/admin/getUserDetails")
        .then(response => response.json())
        .then(async(resultData) =>{
            console.log(resultData);
            await this.setState({userData:resultData});
        })
        .catch(error =>{
            alert(error);
        })

        fetch(IPADDRESS+"/home/admin/getAdminDetails")
        .then(response => response.json())
        .then(async(resultData) =>{
            console.log(resultData);
            await this.setState({adminData:resultData});
        })
        .catch(error =>{
            alert(error);
        })
    }

    removeUser =(e)=>{
        console.log(e.target.getAttribute('userMail'));
        var userData = this.state.userData;


        let confirm=window.confirm("Do you want to remove this user account?");
        if(confirm){

            
        userData.map(async(data, index)=>{
            if(data.email === e.target.getAttribute('userMail') ){
                delete userData[index];
                await this.setState({userData:userData});
            }
        });

        fetch(IPADDRESS+'/home/admin/removeUser',{
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify({userMail:e.target.getAttribute('userMail')}) 
        })
        .then(response=> response.json())
        .then(async(resultData)=>{
            console.log(resultData);

            await this.setState({showModal:true})
            document.getElementById('modalWindow').innerHTML=resultData['description'];

            if(resultData['status']==='success'){
                document.getElementById('modalWindow').style.color="green";
            }
            else{
                document.getElementById('modalWindow').style.color="red";
            }

        })
        .catch((error)=>{
            alert(error);
        })

    }   
    }


    
    removeAdminAccount =(e)=>{
        console.log(e.target.getAttribute('userMail'));
        

        let confirm=window.confirm("Do you want to remove this admin account?");
        if(confirm){

           

        fetch(IPADDRESS+'/home/admin/removeAdmin',{
            
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify({userMail:e.target.getAttribute('userMail')}) 
        })
        .then(response=> response.json())
        .then(async(resultData)=>{
            console.log(resultData);
            var adminData = this.state.adminData;
  
            await this.setState({showModal:true})
            document.getElementById('modalWindow').innerHTML=resultData['description'];

            if(resultData['status']==='success'){
                 
            await adminData.map(async(data, index)=>{
                if(data.userMail === e.target.getAttribute('userMail') ){
                    delete adminData[index];
                    await this.setState({adminData:adminData});
                }
            });

            document.getElementById('modalWindow').style.color="green";
 
            }
            else{
                document.getElementById('modalWindow').style.color="red";
            }

        })
        .catch((error)=>{
            alert(error);
        })

    }   
    }
    // horizontal Navigation
   horizontalMenuNavigation=(parameter, event)=>{

    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("horizontalTabContent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("horizontalMenu");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(parameter).style.display = "block";
    event.currentTarget.className += " active";
}



    render() { 
        return (
        ((this.state.userData==='false') || (this.state.adminData==='false'))?(<div>Loading...</div>):(<div>

            <div style={{textAlign:'center', marginBottom:'20px'}}><h2>Manage Accounts</h2></div>
        
        <div className="horizontalTab">
            <div className="horizontalMenu active" onClick={(event) => {this.horizontalMenuNavigation("adminDetails", event)}}>Admin Details</div>
            <div className="horizontalMenu" onClick={(event) => {this.horizontalMenuNavigation("userDetails", event)}}>User Details</div>
        </div>

        <div style={{borderStyle:'solid', borderColor:'#ccc', borderWidth:'2px', wordWrap:'break-word'}}>
        
        <div className="horizontalTabContent" id="adminDetails" style={{}}>

            <table className="table table-striped">
                <thead>
                    <tr className='d-flex'>
                    <th className="col-lg-2">First Name</th>
                    <th className="col-lg-2">Last Name</th>
                    {/* <th className="col-lg-1">Gender</th> */}
                    <th className="col-lg-4">Mail Id</th>
                    <th className="col-lg-2">Mobile No</th>
                    <th className="col-lg-2"></th>
                    </tr>
                </thead>
         
       {this.state.adminData.map((adminData, index)=>{
            return(
                   <thead>
                  <tr className='d-flex'>
                    <td className="col-lg-2">{adminData.firstName}</td>
                    <td className="col-lg-2">{adminData.lastName}</td>
                    {/* <td className="col-lg-1">{adminData.gender}</td> */}
                    <td className="col-lg-4">{adminData.userMail}</td>
                    {(adminData.mobileNo ===null)?(<td className="col-lg-2"style={{color:'green'}}>-</td>):(<td className="col-lg-2" >{adminData.mobileNo}</td>)}
                    {(adminData.isLogged===true)?(<td className="col-lg-2"></td>):(
                    <td className="col-lg-2"><button className="button" style={{backgroundColor:'white', border:'1px', borderColor:'#2c3e50', borderStyle:'solid'}} userMail={adminData.userMail} onClick={(event)=>{this.removeAdminAccount(event)}}>Remove</button></td>)}
                    </tr>
                   </thead>
                             
                );})}   
                </table> 

        </div>
        

        <div className="horizontalTabContent" id="userDetails" style={{display:'none'}}>

        <table className="table table-striped">
        <thead>
        <tr className='d-flex'>
          <th className="col-lg-2">User Name</th>
          <th className="col-lg-4">Registered Mail</th>
          <th className="col-lg-3">Verification Status</th>
          <th className="col-lg-3"></th>
          </tr>
         </thead>
         
      {this.state.userData.map((userData, index)=>{
            return(

                   <thead>
                  <tr className='d-flex'>
                    <td className="col-lg-2">{userData.username}</td>
                    <td className="col-lg-4">{userData.email}</td>
                    {(userData.isVerified ===true)?(<td className="col-lg-3" style={{color:'green'}}>Verified</td>):(<td className="col-lg-3" style={{color:'red'}}>Not Verified</td>)}
                    <td className="col-lg-3"><button className="button" style={{backgroundColor:'white', border:'1px', borderColor:'#2c3e50', borderStyle:'solid'}} userMail={userData.email} onClick={(event)=>{this.removeUser(event)}}>Remove</button></td>
                    
                    </tr>
                   </thead>
                             
            
                
                );})}
                </table>

                </div>
                
                </div>


                
        <ManageUserModal
            show={this.state.showModal}
            onHide={() => {this.setState({showModal:false})}}
            headerTitle={ [ <div id='modalTitle'> Remove Account  </div>]}
            description={[<div id="modalWindow">  </div>]}
              
        />




                </div>
                )
        );
    }
}
 
export default manageUsers;