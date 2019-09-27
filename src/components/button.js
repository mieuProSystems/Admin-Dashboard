import React, { Component } from 'react';


class button_cls extends Component {
    
    render() { 
        return ( <button className= "submit_button btn-block btn-lg"type='submit'>{this.props.name}
        </button> );
    }
}
 
export default button_cls;
  


