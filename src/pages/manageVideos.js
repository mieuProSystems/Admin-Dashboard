import React, { Component } from 'react';
import IPADDRESS from '../components/server_ip';

import '../CSS/manageVideos.css';
import ManageVideosModal from '../components/manageVideosModal';



class manageVideos extends Component {
    constructor(props) {
        super(props);
        this.state = { channels:false,
                        isHovering:false,
                        showModal:false }
    }

 componentDidMount(){
    fetch(IPADDRESS+"/home/getVideos")
    .then(response =>response.json())
    .then(async(resultData)=>{
        await this.setState({channels:resultData});
    }) 
 }

 deleteVideo = (e)=>{
     var channelId = e.target.getAttribute('channelId');
     var videoId = e.target.getAttribute('videoId');
     let videoThumbnail = e.target.getAttribute('videoThumbnail');
     let videoTitle = e.target.getAttribute('videoTitle');

     fetch(IPADDRESS+'/home/manageVideos/removeVideo',{
        method: 'POST',
        headers: {
            
            'Content-Type': 'application/json',    
        },
         body:JSON.stringify({channelId:channelId, videoIds:videoId, videoTitles:videoTitle, videoThumbnails:videoThumbnail })

     })
     .then(response => response.json())
     .then(async(resultData)=>{
         console.log(resultData);

         if(resultData['status']==='success'){

            alert(resultData['description']);

            var delData=this.state.channels;

            delData.map((deleteData, index)=>{
                if(deleteData['channelId']=== channelId){
                    deleteData['videoIds'].map((videoIds, index)=>{
                        if(videoIds === videoId ){
                            
                            delete deleteData['videoIds'][index];
                            delete deleteData['videoThumbnails'][index];
                            delete deleteData['videoTitles'][index];
                        }
                    })
                }
            })

            await this.setState({channels:delData});
         }
         else{
             alert(resultData['description']);
         }


     })
     .catch((error)=>{
         alert(error);
     }
     )
    }


    playVideo =(e)=>{
        window.open('https://www.youtube.com/embed/'+e.target.getAttribute('videoId'));
    }


    showChannelVideos = (e)=>{

        this.setState({showModal:true});
        let channelIndex = e.target.getAttribute('channelIndex');
        let channels = document.getElementsByClassName('channelVideosInManage');

        if(document.getElementById('channel'+channelIndex+'VideosInManage').style.display==='grid'){
            document.getElementById('channel'+channelIndex+'VideosInManage').style.display='none'; 

        }
        else{

            for (let i=0; i<channels.length;i++){
                document.getElementById('channel'+i+'VideosInManage').style.display='none';

            }
            
            document.getElementById('channel'+channelIndex+'VideosInManage').style.display='grid';
           
            
        } 

    }

    showDeleteButton = (e)=>{

        

        let deleteButtonIndex = e.target.getAttribute('channelIndex');

        document.getElementById('deleteButton'+deleteButtonIndex).style.display='block';

    }

    hideDeleteButton = (e)=>{
        
        let deleteButton = document.getElementsByClassName('deleteButton');

        for(let i=0;i<deleteButton.length;i++){
            document.getElementsByClassName('deleteButton')[i].style.display='none';
        }
    }

    deleteChannel = (e)=>{
        e.stopPropagation();
        var channelId=e.currentTarget.getAttribute('channelId');

        fetch(IPADDRESS+'/home/manageVideos/removeChannel',{
            method: 'POST',
            headers: {
                
                'Content-Type': 'application/json',    
            },
             body:JSON.stringify({channelId:channelId})
    
         })
         .then(response=>response.json())
         .then(async(resultData)=>{

            if(resultData['status']==='success'){
                alert(resultData['description']);

                var delData = this.state.channels;

                delData.map((channel, index)=>{
                    if(channel['channelId']===channelId){
                        delete delData[index];
                    }
                })

                await this.setState({channels:delData});
            }
            else{

                alert(resultData['description']);

            }

         })
         .catch((error)=>{
             alert(error);
         })
    }


    // showVideoButtons = (e)=>{
    //     let videoId = e.target.getAttribute('videoId');
    //     console.log(videoId);

    //     console.log(document.getElementById('videoButtonsDiv'+videoId));

    //     document.getElementById('videoButtonsDiv'+videoId).style.display='block';
    // }

    // hideVideoButtons = (e)=>{
    //     let videosList = document.getElementsByClassName('videoButtonsDiv');
    //     for (let i=0;i<videosList.length;i++){
    //         if(document.getElementsByClassName('videoButtonsDiv')[i].style.display==='block'){
    //         document.getElementsByClassName('videoButtonsDiv')[i].style.display='none';
    //         //console.log(i);
    //         }
    //     }
    // }


    // onMouseLeave={(e)=>{this.hideVideoButtons(e)}} onMouseEnter={(e)=>{this.showVideoButtons(e)}}

    render() { 
        return ( <div>
            <div><h2>Your Channel List</h2></div>
            {(this.state.channels === false)?(<div>Loading...!</div>):(
            <div>
                {this.state.channels.map((channels, index)=>{
                    return (
                        <div className='channelContentInManage'>

                                <div className='channelNamesInManage' id={'channelNamesInManage'+index} channelIndex={index} onMouseEnter={(e)=>{this.showDeleteButton(e)}} onMouseLeave={(e)=>{this.hideDeleteButton(e)}} onClick ={(e)=>{this.showChannelVideos(e)}}>
                                    {channels.channelName}                         
            
                                    <button style ={{display:'none'}}className='deleteButton' id={'deleteButton'+index} channelId ={channels.channelId} channelName={channels.channelName}  onClick={(e)=>{this.deleteChannel(e)}}>Delete Channel</button>
                                    
                                </div>


        
        
                                  <div className="channelVideosInManage" id= {'channel'+index+'VideosInManage'}>
                                    {channels['videoIds'].map((videoId, videoIndex)=>{
                                        return(
                                            <div className="videoDivInManage">
                                            <div className='videoInManage'  videoId={videoId}  >
                                                {channels['videoTitles'][videoIndex]}
                                                <img src= {channels['videoThumbnails'][videoIndex]} width='40%' />
                                            </div>
                                            <div className='videoButtonsDiv' id={"videoButtonsDiv"+videoId}>
                                                {/* <button className="videoButton" videoId = {videoId} channelId={channels['channelId']} videoTitle={channels['videoTitles'][videoIndex]} videoThumbnail={channels['videoThumbnails'][videoIndex]} onClick={(e)=>{this.playVideo(e)}}>Play</button> */}
                                                <button className="videoButton" videoId = {videoId} channelId={channels['channelId']} videoTitle={channels['videoTitles'][videoIndex]} videoThumbnail={channels['videoThumbnails'][videoIndex]} onClick={(e)=>{this.deleteVideo(e)}}>Delete</button>
                                            </div>
                                            </div>
                                        );
                                    })}
                                </div>  
                        </div>    
                    );
                })}

            </div>)}


          <div>

          
          </div>

        </div> );
    }
}
 
export default manageVideos;