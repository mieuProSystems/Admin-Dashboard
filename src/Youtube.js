import React, {Component} from 'react';



const API_key ='AIzaSyAkil4byfMtp3vQdZBKojnbrJMbaxYsIDQ';
const typeOfData='channel';
const query="nakkalites";
const maxResults = 50;

console.log(API_key);

const fetchUrl='https://www.googleapis.com/youtube/v3/search?part=snippet&type='+typeOfData+'&q='+ query +'&key='+API_key+'&maxResults='+maxResults;


console.log(fetchUrl);
//'https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyAkil4byfMtp3vQdZBKojnbrJMbaxYsIDQ'
// https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=sony&key=AIzaSyAkil4byfMtp3vQdZBKojnbrJMbaxYsIDQ
class youtube extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    getYoutube() {
        return fetch(fetchUrl)
          .then((response) => response.json())
          .then((responseJson) => {

            
            console.log(responseJson['items'][0]['snippet']['channelTitle']);

            //<div>responseJson['items'][0]['snippet']['channelTitle']</div>
            console.log(responseJson);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    render()
    
    { 
        return ( <div>Good Morning
                <div>
                <button onClick= {this.getYoutube} >Click Me..!</button>
                </div>

                <div>
                <iframe width="520" length="300" src="https://www.youtube.com/embed/5Fk34WRjFL4"></iframe>
                <iframe width="520" length="300" src="https://www.youtube.com/embed/UdM5z32hqwY"></iframe>
                
                </div>
                

        </div> );
    }
}
 


export default youtube;