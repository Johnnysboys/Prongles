<template>
  <q-page padding >
    <div class="row q-my-md">
        <q-icon class="q-mx-sm" name="fa-paper-plane"/>
        <q-input float-label="Drone url" v-model="url" :disable="connected" prefix="ws://"/>
        <q-btn class="q-my-xs" @click="connector" :color="connected ? 'red-4' : 'green-4'" :loading="connecting">{{ connected ? 'Disconnect' : 'Connect'}}</q-btn>
    </div>
    <div class="row">
      <div class="col-4">
        <q-field icon="fa-hand-lizard" label="Altitude">
          <h5>{{ drone.position.alt }}</h5>
        </q-field>
      </div>
      <div class="col-4">
        <q-field icon="fa-compass" label="Heading">
          <h5>{{ drone.heading }}</h5>
        </q-field>
      </div>
      <div class="col-4">
        <q-field icon="fa-angle-double-right" label="Velocity" orientation="vertical">
          <q-field label="X">
            {{ drone.velocity[0] }}
          </q-field>  
          <q-field label="Y">
            {{ drone.velocity[1] }}
          </q-field>
          <q-field label="Z">
            {{ drone.velocity[2] }}        
          </q-field>
        </q-field>
      </div>
    </div>
      <div class="row">
      <div class="col-4">
        <q-field label="Battery" :icon="batteryIcon" orientation="vertical">
          <q-field label="Voltage">
            {{ drone.battery.voltage }}
          </q-field>  
          <q-field label="Level">
             {{ drone.battery.level }}
          </q-field>  
        </q-field>
      </div>
      <div class="col-4">
        <q-field icon="fa-cog" label="Mode">
          <h5>{{ drone.mode.name }}</h5>
        </q-field>
      </div>
      <div class="col-4">
        <q-field icon="fa-fire" label="Armed">
          <h5>{{ drone.armed ? 'Armed!' : 'Disarmed' }}</h5>
        </q-field>
      </div>
    </div>
    <div class="row justify-center gutter-xs">
      <div class="row col-12 justify-center">
        <q-btn class="go-btn " :disabled="!connected" @click="go" color="green">Go!</q-btn>
      </div>
      <div class="row  col-12  justify-center">
        <q-btn class="arm-btn" :disabled="!connected" @click="arm" color="red">Arm!</q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'PageIndex',
  created() {
    setInterval(() => {
      this.xInt += 0.1;
    }, 20);
  },
  data() {
    return {
      url: 'localhost:9000',
      socket: null,
      connected: false,
      connecting: false,
      xInt: 0,
      drone: {
        battery: { current: 0, voltage: 0, level: -1 },
        position: {
          lat: 0,
          local_frame: null,
          alt: 0,
          global_frame: null,
          lon: 0
        },
        mode: { name: 'LAND' },
        velocity: [0, 0, 0],
        armed: false,
        heading: 0
      }
    };
  },
  computed: {
    ...mapGetters('auth', ['accessToken']),
    wsUrl() {
      return 'ws://' + this.url;
    },
    batteryIcon() {
      const number = this.drone.battery.level;
      if (number > 90) return 'fa-battery-full';
      if (number <= 89 && number >= 75) return 'fa-battery-three-quarters';
      if (number <= 74 && number >= 50) return 'fa-battery-half';
      if (number <= 49 && number >= 25) return 'fa-battery-quarter';
      if (number <= 24 && number >= 0) return 'fa-battery-empty';
      return 'fa-question';
    }
  },
  methods: {
    connector() {
      this.connecting = true;
      if (this.socket === null)
        return (this.socket = new WebSocket(this.wsUrl));

      switch (this.socket.readyState) {
        case 0:
          break;
        case 1:
          this.socket.close();
          break;
        case 2:
          break;
        case 3:
          this.socket = new WebSocket(this.wsUrl);
          break;
      }
    },
    arm() {
      this.socket.send(
        JSON.stringify({
          token: this.accessToken,
          command: 'arm'
        })
      );
    },
    go() {
      this.socket.send(
        JSON.stringify({ token: this.accessToken, command: 'go' })
      );
    },
    dataParser(data) {
      if (data.type === 'status') {
        this.drone = data;
      }
    }
  },
  watch: {
    socket() {
      this.socket.onopen = _ => {
        this.socket.send(
          JSON.stringify({ token: this.accessToken, command: 'stream_status' })
        );
        this.$q.notify({
          type: 'positive',
          message: 'Connected to drone API!'
        });
        this.connecting = false;
        this.connected = true;
      };
      this.socket.onclose = _ => {
        this.$q.notify({
          type: 'negative',
          message: 'Disconnected from drone API!'
        });
        this.connecting = false;
        this.connected = false;
      };
      this.socket.onmessage = msg => {
        const data = JSON.parse(msg.data);
        this.dataParser(data);
        if (data.type !== 'status')
          this.$q.notify({
            message: msg.data,
            position: 'top-right'
          });
      };
    }
  }
};
</script>

<style lang="stylus">
.go-btn {
  width: 20vw;
  height: 10vh;
  font-size: 4em;
}

.arm-btn {
  width: 10vw;
  height: 5vh;
  font-size: 2em;
}
</style>
