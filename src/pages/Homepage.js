import React, { Component } from 'react';
import Modal from 'react-bootstrap-modal';


import '../CSS/homepage.css';
import IPADDRESS from '../components/server_ip';
import { async } from 'q';
import { NONAME } from 'dns';

class homepage  extends Component {

    
    componentDidMount(){

    let searchResults = document.getElementById('searchResults');
    searchResults.style.display='none';
     // ("test" in this.props.location)?(console.log("got Key")):(console.log("Key missed"));

    fetch(IPADDRESS+'/home/getVideos')
    .then(response => response.json())
    .then(resultData =>{
        resultData.map(async(resultData, index)=>{ 

            console.log(resultData);
            var channelDiv = document.createElement('div');
            channelDiv.setAttribute('id', resultData['channelId']);
            channelDiv.setAttribute('class', 'channelDiv');

            let title = '<h4><i>'+Number(index+1)+'. '+'</i>'+resultData['channelName']+'</h4>';

            let channelTitleDiv = document.createElement('div');
            channelTitleDiv.setAttribute("class","channelTitle");
            channelTitleDiv.innerHTML=title;
               
            channelDiv.append(channelTitleDiv);

            var channelContentDiv = document.createElement('div');
            channelContentDiv.setAttribute("class","channelContent");
    
            await resultData['videoIds'].map((channelVideosList, index)=>{

                let videoDiv = document.createElement('div');
                videoDiv.setAttribute('class', 'videosofthechannel');
               
                let videoIframe = document.createElement('iframe');
                videoIframe.setAttribute('videoId', channelVideosList);
                videoIframe.setAttribute('frameBorder','0');
               // videoIframe.setAttribute('autoplay; encrypted-media');
                //videoIframe.setAttribute('allowFullScreen');
                
                
                videoIframe.width='250px'
                videoIframe.height="130px"

                
               
                videoIframe.src = 'http://www.youtube.com/embed/'+channelVideosList;
                videoDiv.append(videoIframe);
                
                console.log(resultData['videoTitles'][index]);
                let description = '<h6><i>'+Number(index+1)+'. '+'</i>'+resultData['videoTitles'][index]+'</h6>';

                let descriptionDiv = document.createElement('div');
                descriptionDiv.setAttribute('class', 'descriptionDiv');
                descriptionDiv.innerHTML=description;
                videoDiv.append(descriptionDiv);

                channelContentDiv.append(videoDiv);
                channelDiv.append(channelContentDiv);

               
            });

            document.getElementById('videosDisplay').appendChild(channelDiv);


            
        })
        })
    .catch((error) => {
        alert(error);
      });   
    }

    
    constructor(props) {
        super(props);
        this.state={
                    initialData:[],
                    currentTime:'',
                    currentDate:'',
                    query:'',
                    resultChannelData:'',
                    addedChannelId:'',
                    channelName:'',
                    videoIds:[],
                    videoTitles:[]

                    }
                }
                

    componentWillMount(){
        
        //console.log(this.props.loaction);
        setInterval(function(){
            this.setState({
                currentTime: new Date().toLocaleTimeString("en-US", {timeZone: "Asia/kolkata"}),
                currentDate: new Date().toLocaleDateString("en-US", {timeZone: "Asia/kolkata"})
            
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
        let searchResults = document.getElementById('searchResults');
        searchResults.style.display='block';
    

        //console.log(this.state.query);
        //const API_key ='AIzaSyAkil4byfMtp3vQdZBKojnbrJMbaxYsIDQ';
        //const API_key='AIzaSyCdZYM_1YvVxiOC4E9pIOcm2ems9RofYgw';
        //const API_key='AIzaSyDDJaRzAPz1S8zRZa3v3vvdx32tKCQZl2Q';
        //const API_key ='AIzaSyBEpVCkJdMTbTnoNhavYOMsqAfEJmMuEFs';

        const typeOfData='channel';
        const query=this.state.query;
        const maxResults = 50;
        let nextCall=false;
        //let nextPageToken;

        const fetchUrl='https://www.googleapis.com/youtube/v3/search?part=snippet&type='+typeOfData+'&q='+ query +'&key='+API_key+'&maxResults='+maxResults;


        return fetch(fetchUrl)
          .then((response) => {if(response.status === 200){return response.json();}else{alert('error occured! Check Your console!');throw new Error(response.status);}})
          .then((resultData) => {  
                    console.log(resultData);
                    
                    this.setState({resultChannelData:resultData})
                })
          .then(()=>{ document.getElementById('searchResults').innerHTML='';
                        //console.log(this.state);
                        this.state.resultChannelData['items'].map(this.createChannelList)
                    })
          .catch((error) => {
            console.error(error);
          });
        }


        createChannelList = (channelList, index)=>{ 
            //const API_key ='AIzaSyAkil4byfMtp3vQdZBKojnbrJMbaxYsIDQ';
        
        
            let divElementForImages = document.createElement('div');
            divElementForImages.setAttribute('id','images'+index);
            divElementForImages.setAttribute('class','resultImages');
            divElementForImages.setAttribute('name',channelList['snippet']['channelTitle'])
            divElementForImages.innerHTML=channelList['snippet']['channelTitle'];
            divElementForImages.setAttribute('channelId',channelList['id']['channelId']);

            divElementForImages.onclick= async(e)=>{
                var addChannel =e.target.getAttribute('channelId');
                var channelName =e.target.getAttribute('name');

                await this.setState({channelName:channelName});


                let addedChannelId = this.state.addedChannelId;
                console.log(addedChannelId);


                    await this.setState({addedChannelId:addChannel});

                    let confirm=window.confirm("Do you want to get the videos from this channel?");

                    if(confirm){
                
                    fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+e.target.getAttribute('channelId')+'&key='+API_key+'&maxResults=50&type=video')
                        .then((responsedVideos)=>{if(responsedVideos.status === 200){return responsedVideos.json();}else{alert("Error Occured! Check Your console"); throw new Error(responsedVideos.status);}})
                        .then(async(resultVideos)=>{

                            console.log(resultVideos);

                            await resultVideos['items'].map(this.getVideoId);

                            return fetch(IPADDRESS+'/home/add/channelVideos',{ 
            
                                method: 'POST',
                                headers: {
                                    
                                    'Content-Type': 'application/json',    
                                },
                                body:JSON.stringify({channelName:this.state.channelName,channelId:this.state.addedChannelId, videoIds:this.state.videoIds, videoTitles:this.state.videoTitles, currentTime:this.state.currentTime, currentDate:this.state.currentDate}) 
                                
                            })
                            .then(response => response.json())
                            .then(async(resultData) =>{
                                console.log(resultData);
                                await this.setState({videoIds:[]});
                                await this.setState({videoTitles:[]});
                                
                                })
                            .catch((error) => {
                                console.error(error);
                              });
                         })
                      
                }                                      
            };
            let thumbnailImage = document.createElement('img');
            thumbnailImage.setAttribute('src',channelList['snippet']['thumbnails']['default']['url']);
            divElementForImages.append(thumbnailImage);
            document.getElementById('searchResults').appendChild(divElementForImages);
            
        }




        getVideoId = async(videoList)=>{
            await this.setState({videoIds:[...this.state.videoIds,videoList['id']['videoId']]});
            await this.setState({videoTitles:[...this.state.videoTitles,videoList['snippet']['title']]});
            }
    

   // "test" in this.props.location?(
     //   <div>Welcome to VSMA..!</div>):(<div>{this.redirectToLogin()}</div>)


    render() { 

        

        return ( 

            <div className='container-fluid' style={{ display:'inline-flex', height:'100vh'}}>
                <div className= 'col-lg-2 menuPanel'> 


                    <div className='adminInfo'>
                    <h3>Admin Info</h3> 
                    </div>
                    {/*    <span>Name:{this.props.location}</span>*/}
                    
                    
                    <div className='vertical-menu'>
                    
                    <div className="menu" >Home</div>
                    <div className="menu" >Account Information</div>
                    <div className="menu" >Manage Users</div>
                    <div className="menu" >Manage Videos</div>
                    <div className="menu" >Notifications</div>
                    <div className="menu" >Google Admob</div>
                    <div className="menu" >Log History</div>
                    <div className="menu" >Log out</div>

                    </div>


                    <div className='dateAndTime'>
                    <span>Date: {this.state.currentDate} (MM/DD/YYYY)</span><br/>
                    <span>Time: {this.state.currentTime} </span>
                    </div>

                 </div> 

                
                
               <div className='videoPanel col-lg-7' id='videosDisplay' onClick={()=>{console.log('clicked');}} style={{border:'2px', borderStyle:'solid', borderColor:'black', marginTop:'0px',backgroundColor:'white', overflow:'scroll'}}>
                <h2>Welcome to VSMA...!</h2>
                {/*<iframe src='http://www.mieupro.com'*/}
               
                <iframe src='https://www.youtube.com/embed/x7qwz_1TjLk' 
                frameBorder='0'
                allow='autoplay; encrypted-media'
                allowFullScreen
                title='video'
                width='200px'
                height="110px"
                />
                </div> 

                <div className='searchPanel col-lg-3' style={{ marginTop:'0px'}}>
                    <form className='searchForm' onSubmit={this.getYoutubeChannelList}>
                    <h4 style={{color:'white'}}>What are you looking for...?</h4>
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