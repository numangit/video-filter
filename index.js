const store = require("./rtk/app/store");
const { fetchVideo, fetchRelatedVideos } = require('./rtk/features/video/videoSlice');

// store.subscribe();
//dispatch actions
store.dispatch(fetchVideo())
    .then(data => store.dispatch(fetchRelatedVideos(data.payload.tags)))
