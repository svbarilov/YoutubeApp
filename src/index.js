import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list'
import SearchBar from "./components/search_bar";
import VideoDetail from "./components/video_detail";
import _ from 'lodash';

const API_KEY = 'AIzaSyBdkaVnGNQocIYKviLTmBAfV6-_OeXgtPM';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            selectedVideo: null
        };
        this.videoSearch('surfboard');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term},
            (videos) => {
                this.setState({
                    videos: videos,
                    selectedVideo: videos[0]
                });
            });
    }


    render() {
        const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 300);
        return <div>
            <SearchBar  onSearchTermChanged={videoSearch} />
            <VideoDetail video = {this.state.selectedVideo} />
            <VideoList
                onVideoSelect={selectedVideo => {this.setState({selectedVideo})}}
                videos={this.state.videos} />
        </div>;
    }

}

// display on page
ReactDOM.render(<App />, document.querySelector('.container'));



// export function isFieldEditableForObject(fieldName, quote, conn, objectName){
//
//     console.log('object name: ' + objectName);
//     console.log('field value: ' + quote.SBQQ__trigger__c );
//     console.log('field name: ' + fieldName );
//
//
//     if (fieldName === 'SBQQ__test__c') {
//         if (quote.SBQQ__trigger__c == '1') {
//             return false;
//         }
//     }
//
// }
//
//
//
// export function isFieldVisibleForObject(fieldName, quote, conn, objectName){
//
//     console.log('object name: ' + objectName);
//     console.log('field value: ' + quote.SBQQ__trigger__c );
//     console.log('field name: ' + fieldName );
//
//     if (fieldName === 'SBQQ__test__c') {
//         if (quote.SBQQ__trigger__c == '2') {
//             return false;
//         }
//     }
//
// }
//
//
// export function onAfterCalculate(quoteModel, quoteLineModels) {
//     return Promise.resolve();
// };


export function onAfterCalculate(quote, lines) {

    lines.forEach(function(line) {
        console.log(line.record );67
        if (line.record['calculator__c'] && line.record['calculator__c'] == '1') {
            line.record['trigger__c'] = '1';
        }
        if (line.record['calculator__c'] && line.record['calculator__c'] == '2') {
            line.record['trigger__c'] = '2';
        }
    });
    return Promise.resolve();
};

