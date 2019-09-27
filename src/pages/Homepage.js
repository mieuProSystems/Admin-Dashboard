import React, { Component } from 'react';

class homepage  extends Component {
    
    componentDidMount(){
        ("test" in this.props.location)?(console.log("got Key")):(console.log("Key missed"));
        
    }

    redirectToLogin =()=>{
        this.props.history.push({pathname:'/', test:{info:'Please Login...!'}});
    }

    render() { 
        return ( 
            "test" in this.props.location?(<div><h1>HomePage</h1></div>):(<div>{this.redirectToLogin()}</div>)
    );
}
}
 
export default homepage ;