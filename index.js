const store = require("./rtk/app/store");
const { fetchVideo } = require('./rtk/features/video/videoSlice');

//dispatch actions
store.dispatch(fetchVideo());