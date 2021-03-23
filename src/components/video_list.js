import React, { Component } from 'react';
import VideoListItem from "./video_list_item";

const VideoList = (props) => {
        const videos = props.videos;
        const videoItems = videos.map( (video) => {
            return (
                <VideoListItem
                    key = { video.etag }
                    video = { video }
                    onVideoSelect = {props.onVideoSelect}
                />


        )
        });
        let ul = <ul className = "col-md4 list-group">
            {videoItems}
        </ul>;
        return ul

}

export default VideoList;