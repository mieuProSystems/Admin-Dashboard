import React, { Component } from 'react';

class homepage  extends Component {
    
    //componentDidMount(){
       // ("test" in this.props.location)?(console.log("got Key")):(console.log("Key missed"));
        
    //}

    
    constructor(props) {
        super(props);
        this.state={curTime:'null'}}
    

    componentWillMount(){

        setInterval(function(){
            this.setState({
                curTime: new Date().toLocaleString("en-US", {timeZone: "Asia/kolkata"})
            })
        }.bind(this), 1000);
    }

    redirectToLogin =()=>{
        this.props.history.push({pathname:'/', test:{info:'Please Login...!'}});
    }

   // "test" in this.props.location?(
     //   <div>Welcome to VSMA..!</div>):(<div>{this.redirectToLogin()}</div>)

    render() { 
        return ( 

            <div className='container-fluid' style={{color:'white', display:'inline', zIndex:1}}>
                <div style={{border:'2px', borderStyle:'solid', borderColor:'black', height:'100%'}}> 
                    Welcome to VSMA...!
                </div>

                <div className='container-fluid' style={{width:'100%'}}>
                    <div className='row'>
                <div className='searchPanel col-lg-3' style={{border:'2px', borderStyle:'solid', borderColor:'black', height:'100%', marginTop:'0px',backgroundColor:'white'}}>
                    hai
                </div>
                <div className='searchPanel col-lg-6' style={{border:'2px', borderStyle:'solid', borderColor:'black', height:'100%', marginTop:'0px',backgroundColor:'white'}}>
                    hai
                </div>
                <div className='searchPanel col-lg-3' style={{border:'2px', borderStyle:'solid', borderColor:'black', height:'100px',color:'black', marginTop:'0px',backgroundColor:'white'}}>
                    {this.state.curTime}

                    
                
          
          
                </div>
                </div>

                </div>
            
            
            </div>
            );
}
}
 
export default homepage ;