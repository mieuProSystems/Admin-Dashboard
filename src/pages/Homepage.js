import React, { Component } from 'react';
import { Button } from 'reactstrap';

import '../CSS/homepage.css';
import IPADDRESS from '../components/server_ip';

import ChannelModal from '../components/newusermodal';

import LogoutModal from '../components/logoutModal';

import AccountInfo from '../pages/accountInfo';
import Notifications from '../pages/notification';

class homepage  extends Component {

    
    componentDidMount(){
            //Hide Initial Search Results Div
            let searchResults = document.getElementById('searchResults');
            searchResults.style.display='none';
            
            //Fetching Channel Videos 
            fetch(IPADDRESS+'/home/getVideos')
            .then(response => response.json())
            .then(resultData =>{

                resultData.map(async(resultData, index)=>{ 

                    var channelDiv = document.createElement('div');
                    channelDiv.setAttribute('id', resultData['channelId']);
                    channelDiv.setAttribute('class', 'channelDiv');

                    let title = '<h4><i>'+Number(index+1)+'. '+resultData['channelName']+'</i>'+'</h4>';

                    let channelTitleDiv = document.createElement('div');
                    channelTitleDiv.setAttribute("class","channelTitle");
                    channelTitleDiv.innerHTML=title;
                    
                    channelDiv.append(channelTitleDiv);

                    var channelContentDiv = document.createElement('div');
                    channelContentDiv.setAttribute("class","channelContent");
            
                    await resultData['videoIds'].map((channelVideosList, index)=>{

                        let videoDiv = document.createElement('div');
                        videoDiv.setAttribute('class', 'videosofthechannel');
                        videoDiv.setAttribute('videoId', channelVideosList);
                        

                        //Redirect to play youtube video in new tab
                        videoDiv.onclick=(e)=>{
                            //window.open('https://www.youtube.com/watch?v='+channelVideosList);
                            window.open('https://www.youtube.com/embed/'+channelVideosList);
                        
                        }
                        

                        let videoImg = document.createElement('img');
                        videoImg.setAttribute('src', resultData['videoThumbnails'][index]);
                        videoDiv.append(videoImg);
                        videoImg.style.width='250px'
                        videoImg.style.height="130px"

                        

                        let description = '<h6><i>'+Number(index+1)+'. '+'</i>'+resultData['videoTitles'][index]+'</h6>';

                        let descriptionDiv = document.createElement('div');
                        descriptionDiv.setAttribute('class', 'descriptionDiv');
                        descriptionDiv.innerHTML=description;
                        videoDiv.append(descriptionDiv);

                        channelContentDiv.append(videoDiv);
                        channelDiv.append(channelContentDiv);

                    
                    });

                    document.getElementById('home').appendChild(channelDiv);    
                })
                })
            .catch((error) => {
                alert(error);
            });   
    }

    
    constructor(props) {
        super(props);
        this.state={
                    currentTime:'',
                    currentDate:'',
                    query:'',
                    resultChannelData:'',
                    addedChannelId:'',
                    channelName:'',
                    videoIds:[],
                    videoTitles:[],
                    videoThumbnails:[],
                    showModal:false,
                    description:'',
                    selectedVideosCount:'0',
                    selectAllBoxChecked:false,
                    showLogoutModal:false

                    }
                    
                }
                
    //Fetching Current Date and Time
    componentWillMount(){
        setInterval(function(){
            this.setState({
                currentTime: new Date().toLocaleTimeString("en-US", {timeZone: "Asia/kolkata"}),
                currentDate: new Date().toLocaleDateString("en-US", {timeZone: "Asia/kolkata"})
            
            })
        }.bind(this), 1000);
    }

    //Redirect to home page while direct access URL
    redirectToLogin =async()=>{
        //console.log(this.props.location);
        await this.props.history.push({pathname:'/', test:{info:'Please Login...!'}});
    }

    //Set Query Value
    handleQueryValueChange=(event)=>{
        this.setState({[event.target.name]:event.target.value});
    }

    //Get youtube channel for the given query
    getYoutubeChannelList=(e)=> {
        e.preventDefault();
        let searchResults = document.getElementById('searchResults');
        searchResults.style.display='block';
    
        //console.log(this.state.query);
        //const API_key ='AIzaSyAkil4byfMtp3vQdZBKojnbrJMbaxYsIDQ';
        //const API_key='AIzaSyCdZYM_1YvVxiOC4E9pIOcm2ems9RofYgw';
        const API_key='AIzaSyDDJaRzAPz1S8zRZa3v3vvdx32tKCQZl2Q';
        //const API_key ='AIzaSyBEpVCkJdMTbTnoNhavYOMsqAfEJmMuEFs';

        const typeOfData='channel';
        const query=this.state.query;
        const maxResults = 50;
    
        //Set Url
        const fetchUrl='https://www.googleapis.com/youtube/v3/search?part=snippet&type='+typeOfData+'&q='+ query +'&key='+API_key+'&maxResults='+maxResults;

        //Fetch Url
        return fetch(fetchUrl)
          .then((response) => {if(response.status === 200){return response.json();}else{alert('error occured! Check Your console!');throw new Error(response.status);}})
          .then((resultData) => {  
                    //console.log(resultData);
                    this.setState({resultChannelData:resultData})
            })
          .then(()=>{ document.getElementById('searchResults').innerHTML='';
                        //console.log(this.state);
                        this.state.resultChannelData['items'].map(this.createChannelList)
            })
          .catch((error) => {
            alert(error);
          });
        }


        createChannelList = (channelList, index)=>{ 
            const API_key='AIzaSyDDJaRzAPz1S8zRZa3v3vvdx32tKCQZl2Q';
        
        
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
                    //console.log(addedChannelId);
                await this.setState({addedChannelId:addChannel});
                

                let confirm=window.confirm("Do you want to get the videos from this channel?");
                // Fetching Channel Content
                if(confirm){
                await this.setState({showModal:true});

                fetch('https://www.googleapis.com/youtube/v3/search?part=snippet&channelId='+e.target.getAttribute('channelId')+'&key='+API_key+'&maxResults=50&type=video')
                    .then((responsedVideos)=>{if(responsedVideos.status === 200){return responsedVideos.json();}else{alert("Error Occured! Check Your console"); throw new Error(responsedVideos.status);}})
                    .then(async(resultVideos)=>{
                        //console.log(resultVideos);
                        await resultVideos['items'].map(this.getVideoId);
                        })
                        .catch(error =>{
                            alert(error);
                        })      
                }                                      
            };


            let thumbnailImage = document.createElement('img');
            thumbnailImage.setAttribute('src',channelList['snippet']['thumbnails']['default']['url']);
            divElementForImages.append(thumbnailImage);
            document.getElementById('searchResults').appendChild(divElementForImages);
            
        }



        // Get Video Ids of the selected Videos
        getVideoId = async(videoList)=>{

            // Video Div   
            let videoDiv = document.createElement('div');
            videoDiv.setAttribute('class', 'selectVideos');
            videoDiv.setAttribute('videoId',videoList['id']['videoId']);
            videoDiv.setAttribute('videoTitle', videoList['snippet']['title'] );
            videoDiv.setAttribute('videoThumbnail',videoList['snippet']['thumbnails']['high']['url'])
            videoDiv.onclick= async(e)=>{

                document.getElementById('checkbox').checked = false;
                //console.log(e.target.getAttribute('videoId'));
                let videoIds = this.state.videoIds;
                let videoTitles= this.state.videoTitles;
                let videoThumbnails = this.state.videoThumbnails;

                
                var index=videoIds.indexOf(e.target.getAttribute('videoId'));
                
                
                // Select Videos on Click
                if(index>-1){
                    e.target.style.backgroundColor="white";
                    e.target.style.color="black";
                    videoIds.splice(index,1);
                    videoTitles.splice(index,1);
                    videoThumbnails.splice(index,1);
                    await this.setState({videoIds:videoIds, videoTitles:videoTitles, videoThumbnails:videoThumbnails});
                    await this.setState({selectedVideosCount:videoIds.length});
                }
                else{
                    e.target.style.backgroundColor="#2c3e50";
                    e.target.style.color="white";
                    videoIds.push(e.target.getAttribute('videoId'));
                    videoTitles.push(e.target.getAttribute('videoTitle'));
                    videoThumbnails.push(e.target.getAttribute('videoThumbnail'));
                    await this.setState({videoIds:videoIds, videoTitles:videoTitles, videoThumbnails:videoThumbnails});
                    await this.setState({selectedVideosCount:videoIds.length});
                
                }     
            }

            let videoImg = document.createElement('img');
            videoImg.setAttribute('src', videoList['snippet']['thumbnails']['default']['url']);

            videoDiv.innerHTML = videoList['snippet']['title'];
            videoDiv.append(videoImg);

            document.getElementById('modalWindow').append(videoDiv);
            }


// Add selected Video Ids to the database
     addVideosIntoDB = ()=>{
        this.setState({showModal:false});
        //console.log(this.state);
     
        fetch(IPADDRESS+'/home/add/channelVideos',{ 
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
            body:JSON.stringify({channelName:this.state.channelName,channelId:this.state.addedChannelId, videoThumbnails:this.state.videoThumbnails, videoIds:this.state.videoIds, videoTitles:this.state.videoTitles, currentTime:this.state.currentTime, currentDate:this.state.currentDate}) 
            
        })
        .then(response => response.json())
        .then(async(resultData) =>{

            //console.log(resultData);
            await this.setState({videoIds:[], videoTitles:[], videoThumbnails:[]});
            await window.location.reload();
            })
        .catch(async(error) => {
            //console.error(error);
            alert(error);
            await this.setState({videoIds:[], videoTitles:[], videoThumbnails:[]});
            await window.location.reload();  
          }); 
        }



    selectAll = async()=>{
        await this.setState({videoIds:[], videoTitles:[], videoThumbnails:[], selectAllBoxChecked:!this.state.selectAllBoxChecked});
        
        
        let allDiv = document.getElementsByClassName('selectVideos');
        for (let i=0; i<allDiv.length;i++)
        {
            let childDiv = document.getElementsByClassName('selectVideos')[i];

            if(this.state.selectAllBoxChecked){
                await this.setState({videoIds:[...this.state.videoIds, childDiv.getAttribute('videoId')], videoTitles:[...this.state.videoTitles, childDiv.getAttribute('videoTitle')], videoThumbnails:[...this.state.videoThumbnails, childDiv.getAttribute('videoThumbnail')]});
                childDiv.style.color='white';
                childDiv.style.backgroundColor='#2c3e50';
            }
            else{
                childDiv.style.color='#2c3e50';
                childDiv.style.backgroundColor='white';
            }
        
        }
        await this.setState({selectedVideosCount:this.state.videoIds.length}); 
    }


// Vertical Navigation
   menuNavigation=(parameter, event)=>{

        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("menu");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(parameter).style.display = "block";
        event.currentTarget.className += " active";
    }
  
  

    render() {  
        return ( 
            
            (this.props.location.state===undefined)?(<div>{this.redirectToLogin()}</div>):(
            <div className='container-fluid' style={{ display:'inline-flex', height:'100vh', width:'100%'}}>
                <div className= 'col-lg-2 menuPanel'> 

                    <div className='vertical-menu'>
                    
                        <div className="menu active" onClick={(event) => {this.menuNavigation("home", event)}} >Home</div>
                        <div className="menu " onClick={(event) => {this.menuNavigation("accountInfo", event)}} >Account Information</div>
                        <div className="menu" onClick={(event) => {this.menuNavigation("manageUsers", event)}}>Manage Users</div>
                        <div className="menu" onClick={(event) => {this.menuNavigation("manageVideos", event)}}>Manage Videos</div>
                        <div className="menu " onClick={(event) => {this.menuNavigation("notifications", event)}}>Notifications</div>
                        {/*<div className="menu" >Google Admob</div>*/}
                        
                        <div className="menu" onClick={(event) => {this.menuNavigation("logHistory", event)}}>Log History</div>
                        <div className="menu" onClick={(event) => {this.setState({showLogoutModal:true});this.menuNavigation("logout", event)}}>Log out</div>
                    
                    </div>


                    <div className='dateAndTime'>
                        <span>Date: {this.state.currentDate} (MM/DD/YYYY)</span><br/>
                        <span>Time: {this.state.currentTime} </span>
                    </div>

                </div> 

                
                
               <div className='videoPanel col-lg-7'   style={{marginTop:'0px',backgroundColor:'white', transition:'0.5s'}}>
                
                <div id='home' className='tabcontent'><center><h2>Welcome!</h2></center></div>

                <div id="accountInfo"  style={{display:'none'}} className="tabcontent">
                <AccountInfo token={this.props.location.state.response.token}/>
                </div>

                <div id="manageUsers" style={{display:'none'}} className="tabcontent">
                <h1>User Info</h1>
                </div>
                
                <div id="manageVideos" style={{display:'none'}} className="tabcontent">
                <h1>Manage Videos</h1>
                </div>

                <div id="notifications" style={{display:'none'}} className="tabcontent">
                <Notifications/>
                </div>

                <div id="logHistory" style={{display:'none'}} className="tabcontent">
                <h1>Log History</h1>
                </div>

                <div id="logout" style={{display:'none'}} className="tabcontent">
                <LogoutModal
                    show={this.state.showLogoutModal}
                    onHide={() => {this.setState({showLogoutModal:false})}}
                    headerTitle={ [ <div id='modalTitle'> Logout  </div>]}
                    logoutButton={[<Button onClick={async()=>{// console.log(this.props.location.state.response.token); 
                                                    await fetch(IPADDRESS+'/admin/logout',{
                                                    method: 'POST',
                                                    headers: {
                                                        
                                                        'Content-Type': 'application/json',    
                                                    },
                                                    body:JSON.stringify({loginToken:this.props.location.state.response.token})
                                                    
                                                            })
                                                            .then(response=>response.json())
                                                            .then((resultData)=>{
                                                                console.log(resultData);
                                                                    
                                                                if(resultData['status']==='success'){
                                                                    this.props.history.push({pathname:'/', test:{info:'Logged Out Successfully!'}});
                                                                }
                                                                else{

                                                                }
                                                            })
                                                            .catch(e=>{console.log(e);})
                                                        
                                    }}>Logout</Button>]}

                    description={[<div id="modalWindow"><div>  Do you want to exit from this panel? </div></div>]}/>
                
                </div>

                
      


            
                </div> 

                <div className='searchPanel col-lg-3' style={{ marginTop:'0px'}}>
                    <form className='searchForm' onSubmit={this.getYoutubeChannelList}>
                    <h4 style={{color:'white'}}>What are you looking for...?</h4>
                    <input type='text' name='query' placeholder='Enter Channel Name' onChange={this.handleQueryValueChange} value={this.state.query} required/>
                    <button type='submit' className='btn-primary' >Search</button>
                    </form>

                    <div id="searchResults">
                    </div>


        <ChannelModal
            show={this.state.showModal}
            onHide={() => {this.setState({showModal:false, selectAllBoxChecked:false, videoIds:[], videoTitles:[], videoThumbnails:[],selectedVideosCount:0})}}
            headerTitle={ [ <div id='modalTitle'>Select the videos from this Channel  </div>]}
            description={[<div id="modalWindow"><center><div><label>
            Select All the Videos from this page
            <input type="checkbox" id='checkbox' onChange={this.selectAll} /></label></div><h6>------ Or ------</h6> <h6><i>( Click the Videos To Select )</i>  </h6></center></div>]}
            footerbutton={[<div><Button onClick={this.addVideosIntoDB}>Get Videos ( {this.state.selectedVideosCount} )</Button></div>]}   
        />
          

      </div>
        
    </div>)
    
);
}
}
 
export default homepage ;