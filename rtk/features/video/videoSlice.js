const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require('node-fetch');

//initial state
const initialState = {
    video: {
        loading: false,
        videoObject: {},
        videoTags: [],
        error: ''
    },
    relatedVideos: {
        loading: false,
        relatedVideosData: [],
        error: ''
    }
};

//Thunk Function to call api for video
const fetchVideo = createAsyncThunk("video/fetchVideo", async () => {
    const response = await fetch("http://localhost:9000/videos");
    const data = response.json();

    return data;
});

//Thunk function to call 
const fetchRelatedVideos = createAsyncThunk("video/fetchRelatedVideo", async (videoTags) => {
    console.log("fetched:", videoTags);

    let queryString = videoTags.join('&tags_like=');

    const response = await fetch(`http://localhost:9000/videos?tags_like=${queryString}`);
    const data = response.json();

    return data;
})

//create slice
const videoSlice = createSlice({
    name: 'video',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchVideo.pending, (state) => {
            state.video.loading = true;
        })

        builder.addCase(fetchVideo.fulfilled, (state, action) => {
            state.video.loading = false;
            state.video.videoObject = action.payload;
            state.video.videoTags = action.payload.tags;
        })

        builder.addCase(fetchVideo.rejected, (state, action) => {
            state.video.loading = false;
            state.video.error = action.error;
        })

        builder.addCase(fetchRelatedVideos.pending, (state) => {
            state.relatedVideos.loading = true;
        })

        builder.addCase(fetchRelatedVideos.fulfilled, (state, action) => {
            state.relatedVideos.loading = false;
            state.relatedVideos.relatedVideosData = action.payload;
        })

        builder.addCase(fetchRelatedVideos.rejected, (state, action) => {
            state.relatedVideos.loading = false;
            state.relatedVideos.error = action.error;
        })
    }
});

module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
module.exports.fetchRelatedVideos = fetchRelatedVideos;
