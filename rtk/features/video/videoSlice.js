const { createSlice } = require("@reduxjs/toolkit");

//initial state
const initialState = {
    videoTags: [],
    video: {
        loading: false,
        videoData: [],
        error: ''
    },
    relatedVideos: {
        loading: false,
        videoData: [],
        error: ''
    }
};

//create slice
const videoSlice = createSlice({
    name: 'video',
    initialState,
    // reducers: {
    //     filterTags: (state, action) => {
    //         state.videoTags = action.payload.tags;
    //     }
    // }
})