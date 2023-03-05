const store = require("./rtk/app/store");
const { fetchVideo, fetchRelatedVideos } = require('./rtk/features/video/videoSlice');

// store.subscribe();
//dispatch actions
store.dispatch(fetchVideo());

setTimeout(() => {
    store.dispatch(fetchRelatedVideos(store.getState().video.video.videoTags));
}, 10);