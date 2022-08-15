const EventEmitter = require("events");
// globalThis.WebSocket = require("websocket").w3cwebsocket;
// const { connect, StringCodec } = require("nats.ws");
const { connect, StringCodec, JSONCodec } = require("nats");

class EventBroker {
  constructor() {
    this.localBus = new EventEmitter();
    /* this.natsConn;
    (async () => {
      this.natsConn = await connect({ servers: "localhost:4222" });
    })(); */
    this.stringCodec = StringCodec();
    this.jsonCodec = JSONCodec();
  }

  async pub(message, payload) {
    const nc = await connect({ servers: "localhost:4222" });
    console.log("en mes", message, "pload", payload);
    nc.publish(
      message,
      this.jsonCodec.encode(JSON.stringify(payload)),
    );
  }

  async sub(message, callback) {
    const nc = await connect({ servers: "localhost:4222" });
    console.log("mees", message);
    const sub = nc.subscribe(message, { callback });
    console.log("elsub", sub);
    return sub;
  }

  emit(eventName, payload) {
    const props = {
      eventName: eventName,
      // payload: payload,
      // options: opts,
      // eventGroups: [...opts.groups],
    };

    const ctx = new Map(Object.entries(props));

    console.log("emitiendo event", eventName, "payload:", payload);

    this.localBus.emit(eventName, payload);
  }

  on(eventName, fn) {
    console.log("escuchando event:", eventName);
    this.localBus.on(eventName, fn);
  }
}

module.exports = new EventBroker();
