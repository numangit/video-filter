const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const fetch = require('node-fetch');

//initial state
const initialState = {
    video: {
        loading: false,
        videoTags: [],
        error: ''
    },
    relatedVideos: {
        loading: false,
        videoData: [],
        error: ''
    }
};

//Thunk Function to call api for video
const fetchVideo = createAsyncThunk("video/fetchVideo", async () => {
    const response = await fetch("http://localhost:9000/videos");
    const data = response.json();

    return data;
})

//create slice
const videoSlice = createSlice({
    name: 'video',
    initialState,
    // reducers: {
    //     filterTags: (state, action) => {
    //         state.videoTags = action.payload.tags;
    //     }
    // }
    extraReducers: (builder) => {
        builder.addCase(fetchVideo.pending, (state) => {
            state.video.loading = true;
        })

        builder.addCase(fetchVideo.fulfilled, (state, action) => {
            state.video.loading = false;
            state.video.videoTags = action.payload.tags;
        })

        builder.addCase(fetchVideo.rejected, (state, action) => {
            state.video.loading = false;
            state.video.error = action.error;
        })
    }
});

module.exports = videoSlice.reducer;
// module.exports = videoSlice.reducer;
module.exports.fetchVideo = fetchVideo;
