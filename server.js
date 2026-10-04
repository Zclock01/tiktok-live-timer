const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, path: "/ws" });

app.use(express.static(path.join(__dirname, "public")));
app.get("/health", (_, res) => res.json({ok:true}));

let state = {
  seconds: 1800,
  running: true,
  changedAt: Date.now()
};

function currentSeconds() {
  if (!state.running) return Math.max(0, state.seconds);
  return Math.max(0, state.seconds - Math.floor((Date.now()-state.changedAt)/1000));
}

function snapshot() {
  return {seconds: currentSeconds(), running: state.running, changedAt: Date.now()};
}
function broadcast() {
  const msg=JSON.stringify({type:"state", ...snapshot()});
  for (const c of wss.clients) if (c.readyState===WebSocket.OPEN) c.send(msg);
}
function setState(seconds,running=true) {
  state={seconds:Math.max(0,Math.floor(seconds)),running:!!running,changedAt:Date.now()};
  if(state.seconds===0) state.running=false;
  broadcast();
}

wss.on("connection",(ws)=>{
  ws.send(JSON.stringify({type:"state", ...snapshot()}));
  ws.on("message",(raw)=>{
    try{
      const m=JSON.parse(raw.toString());
      if(m.type==="add"){
        setState(currentSeconds()+Number(m.seconds||0), true);
      } else if(m.type==="set"){
        setState(Number(m.seconds||0), !!m.running);
      } else if(m.type==="toggle"){
        const s=currentSeconds();
        setState(s,!state.running);
      } else if(m.type==="reset"){
        setState(Number(m.seconds||1800), true);
      }
    }catch{}
  });
});

setInterval(()=>{ if(state.running && currentSeconds()===0){state.running=false;state.changedAt=Date.now();broadcast();} },500);

const port=process.env.PORT||10000;
server.listen(port,"0.0.0.0",()=>console.log("Timer server on "+port));
