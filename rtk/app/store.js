const { configureStore } = require("@reduxjs/toolkit");
const videoReducer = require("../features/video/videoSlice");

const store = configureStore({
    reducer: {
        video: videoReducer,
    }
});

module.export = store;