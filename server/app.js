const express = require("express");
const path = require("path");

const app = express();
const http = require("http").Server(app);
const sockets = require("./socket");

const db = require('./db.js')

const publicPath = path.resolve(__dirname, "..", "client", "dist");
io = require("socket.io")(http);

socketmap = {};

revision_ids = {}
searches = {
  1234: {
    clues: [],
    time: 0,
    searchers: {
      'foo' : {
        location: '42.3583277,71.10173499999999'
      }
    },
    coverage: {}
  },
}


io.on("connection", (socket) => {
  socket.on("init", (data) => {
    console.log(`User ${data.user_id} connected to socket`);
    if (data.search_id) {
      socket.join(data.search_id)
    }
    socketmap[data.user_id] = socket
  });

  socket.on("found_clue", (data) => {
    console.log("found clue sock")
    console.log(data)
    socket.to(data.search_id).emit('clue', data);
  });

  socket.on("location", (data) => {
    console.log("location sock")
    console.log(data)
    search = searches[data.search_id]
    searchers = search.searchers
    searchers[data.user_id].location = data.location
    search.coverage[data.location] = 1
  })

  socket.on("direct_searcher", (data) => {
    console.log("got a directing of a searcher")
    search = searches[data.search_id]
    searchers = search.searchers
    searchers[data.user_id]
    search.coverage[data.location] = 0
  })

});

app.use(express.static(publicPath));

app.get(["/manage/:number", "/search/:number", ], (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});


var tid = setTimeout(sendGrid, 200);
function sendGrid() {
  for(var search_id in searches) {
    var search = searches[search_id];
    io.in(search_id).emit("grid", search.coverage)
  }
  tid = setTimeout(sendGrid, 200); // repeat myself
}

// db.saveSearch({
//   id: 1
// }).then((data) => {
//   console.log(data)
// })

http.listen(3000, () => {
  console.log(`Listening on port 3000 and looking in folder ${publicPath}`);
});
