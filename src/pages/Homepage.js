import React, { Component } from 'react';

import '../CSS/homepage.css';

class homepage  extends Component {
    
    //componentDidMount(){
       // ("test" in this.props.location)?(console.log("got Key")):(console.log("Key missed"));
        
    //}

    
    constructor(props) {
        super(props);
        this.state={curTime:'',
                    curDate:'',
                    query:'',
                    resultDataState:''}
                }
    

    componentWillMount(){
        
        //console.log(this.props.loaction);
        setInterval(function(){
            this.setState({
                curTime: new Date().toLocaleTimeString("en-US", {timeZone: "Asia/kolkata"}),
                curDate: new Date().toLocaleDateString("en-US", {timeZone: "Asia/kolkata"})
            
            })
        }.bind(this), 1000);
    }

    redirectToLogin =()=>{
        this.props.history.push({pathname:'/', test:{info:'Please Login...!'}});
    }


    handleQueryValueChange=(event)=>{

        this.setState({[event.target.name]:event.target.value});

    }

    getYoutubeChannelList=(e)=> {
        e.preventDefault();

        //console.log(this.state.query);
        //const API_key ='AIzaSyAkil4byfMtp3vQdZBKojnbrJMbaxYsIDQ';
        //const API_key='AIzaSyCdZYM_1YvVxiOC4E9pIOcm2ems9RofYgw';
        //const API_key='AIzaSyDDJaRzAPz1S8zRZa3v3vvdx32tKCQZl2Q';

        const typeOfData='channel';
        const query=this.state.query;
        const maxResults = 50;
        let nextCall=false;
        //let nextPageToken;

        const fetchUrl='https://www.googleapis.com/youtube/v3/search?part=snippet&type='+typeOfData+'&q='+ query +'&key='+API_key+'&maxResults='+maxResults;


        return fetch(fetchUrl)
          .then((response) => response.json())
          .then((resultData) => { this.setState({resultDataState:resultData})}).then(()=>{console.log(this.state)})
          .catch((error) => {
            console.error(error);
          });
        }
        
        //       document.getElementById('searchResults').innerHTML='';
            
            
        //     for(let i in resultData['items']){
        //         let divElementForImages = document.createElement('div');
        //         divElementForImages.setAttribute('id','images'+i);
        //         divElementForImages.setAttribute('class','resultImages');
        //         divElementForImages.setAttribute('name',resultData['items'][i]['snippet']['channelTitle'])
        //         divElementForImages.innerHTML=resultData['items'][i]['snippet']['channelTitle'];
        //         divElementForImages.setAttribute('channelId',resultData['items'][i]['id']['channelId']);

        //         divElementForImages.onclick =function displayChannelItems(e){
        //             //https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCNvR1Zh8DoH4HcrVere2RzQ&maxResults=50&type=video&key=[YOUR_API_KEY] HTTP/1.1
        //             // https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UClqoU3DHuKFsYCCLXUNUE1g&key=[YOUR_API_KEY] HTTP/1.1
        //             if (!nextCall){
        //             var nextPageToken ='';
        //             }
                    
        //             let breakPoint=true;

                    
                
                            
        //             fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+e.target.getAttribute('channelId')+'&key='+API_key+'&maxResults=50&type=video&pageToken='+ nextPageToken)
        //             .then((responsedVideos)=>responsedVideos.json())
        //             .then((resultVideos)=>{
        //                 console.log(resultVideos['nextPageToken']);
                        
        //                 nextPageToken = resultVideos['nextPageToken'];

        //                 //if(nextPageToken==''){
        //                 //    console.log("hai");
        //                 //    breakPoint = false;
        //                 //}
        //                 if(typeof nextPageToken === 'undefined'){
        //                     nextPageToken='';
        //                     console.log('completed');
        //                 }
        //                 else{
        //                     nextCall=true;
        //                     displayChannelItems(e);
        //                 }
                          
        //             })

        //         }

        //         //console.log(e.target.getAttribute('channelId'));
                

        //         let thumbnailImage = document.createElement('img');
        //         thumbnailImage.setAttribute('src',resultData['items'][i]['snippet']['thumbnails']['default']['url']);
                
        //         divElementForImages.append(thumbnailImage);

        //         document.getElementById('searchResults').appendChild(divElementForImages);

        //         //console.log(resultData['items'][i]['snippet']['channelTitle']);
        //         //console.log(resultData['items'][i]['snippet']['thumbnails']['default']);
        //         //console.log(resultData['items'][i]['id']['channelId']);
            
        //     }

        //     console.log(resultData);
        //   })
        //   }
    

   // "test" in this.props.location?(
     //   <div>Welcome to VSMA..!</div>):(<div>{this.redirectToLogin()}</div>)

    render() { 
        return ( 

            <div className='container-fluid' style={{ display:'inline-flex', height:'100vh'}}>
                <div className= 'col-lg-2' style={{backgroundColor:'#eee'}}> 


                    <div className='adminInfo'>
                        <h3>Admin Info</h3>
                    {/*    <span>Name:{this.props.location}</span>*/}
                    
                    </div>
                    <div className='vertical-menu' style={{fontWeight:600, textAlign:'center'}}>
                    
                    <a>Home</a>
                    <a>Account Information</a>
                    <a>Manage Users</a>
                    <a>Manage Videos</a>
                    <a>Notifications</a>
                    <a>Log History</a>
                    <a>Log out</a>
                    </div>


                    <div style={{color:'block'}}>
                    <span>Date:{this.state.curDate} (MM/DD/YYYY)</span><br/>
                    <span>Time:{this.state.curTime} </span>
                    </div>

                </div>

                
                <div className='videoPanel col-lg-7' style={{border:'2px', borderStyle:'solid', borderColor:'black', marginTop:'0px',backgroundColor:'#eee'}}>
                Welcome to VSMA...!
                </div>
                <div className='searchPanel col-lg-3' style={{ border:'2px', borderStyle:'solid', borderColor:'black', marginTop:'0px',backgroundColor:'#eee'}}>
                    <form className='searchForm' onSubmit={this.getYoutubeChannelList}>
                    <h4>What are you looking for...?</h4>
                    <input type='text' name='query' placeholder='Enter Channel Name' onChange={this.handleQueryValueChange} value={this.state.query} required/>
                    <button type='submit' className='btn-primary' >Search</button>
                    </form>

                    <div id="searchResults">


                </div>
            
                </div>
                

        
            
            
            </div>
            );
}
}
 
export default homepage ;