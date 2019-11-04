import React, { Component } from 'react';

class manageVideos extends Component {
    constructor(props) {
        super(props);
        this.state = { channels:false }
    }

    componentDidMount(){
        this.setState({channels:this.props.channels});
    }
    render() { 
        return ( <div>
            {(this.state.channels === false)?(<div>Loading...!</div>):(<div>
                {this.state.channels.map((channels, index)=>{
                    return (
                        <div>
                            {channels.channelName}

                        </div>
                    );
                })}

            </div>)}

        </div> );
    }
}
 
export default manageVideos;