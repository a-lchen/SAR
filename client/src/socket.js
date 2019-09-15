import socketIOClient from "socket.io-client";
const endpoint = window.location.hostname + ":" + window.location.port;
export const socket = socketIOClient(endpoint);

export const init = (user_id, search_id) => {
  socket.emit("init", { user_id: user_id, search_id: search_id });
};

// location: string in long,lat form. e.g. '42.3583277,71.10173499999999' location SHOULD NOT be discretized.
export const sendLocation = (location, user_id, search_id) => {
  socket.emit("location", {
    location: location,
    user_id: user_id,
    search_id: search_id
  });
};

export const sendFoundClue = (clue, user_id, search_id) => {
  socket.emit("found_clue", {
    clue: clue,
    user_id: user_id,
    search_id: search_id
  });
};

// location: string in long,lat form. e.g. '42.3583277,71.10173499999999' location SHOULD be discretized.
export const sendDirectSearcher = (location, user_id, search_id) => {
  socket.emit("direct_searcher", {
    location: location,
    user_id: user_id,
    search_id: search_id
  });
};
