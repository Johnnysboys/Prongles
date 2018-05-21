<template>
  <q-page padding >
    <div class="row">
      <div class="col-4">
        <q-field label="X">
          <h5>{{ x }}</h5>
        </q-field>
      </div>
      <div class="col-4">
        <q-field label="Y">
          <h5>{{ y }}</h5>
        </q-field>
      </div>
      <div class="col-4">
        <q-field label="Z">
          <h5>{{ z }}</h5>
        </q-field>
      </div>
    </div>
    <div class="fixed-center">
      <div class="row justify-center gutter-xs">
        <div class="row justify-center">
          <q-btn class="go-btn " color="green">Go!</q-btn>
        </div>
        <div class="row justify-center">
          <q-btn class="arm-btn" color="red">Arm!</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>

</style>

<script>
export default {
  name: 'PageIndex',
  created() {
    setInterval(() => {
      this.xInt += 0.1;
    }, 20);
  },
  data() {
    return {
      xInt: 0
      // y: '1',
      // z: '1'
    };
  },
  computed: {
    x() {
      return (Math.sin(this.xInt) * 100).toPrecision(4);
    },
    y() {
      return (Math.cos(this.xInt) * 100).toPrecision(4);
    },
    z() {
      return (Math.tan(this.xInt) * 100).toPrecision(4);
    }
  }
};
</script>

<style lang="stylus">
.go-btn {
  width: 40vw;
  height: 20vh;
  font-size: 8em;
}

.arm-btn {
  width: 20vw;
  height: 10vh;
  font-size: 4em;
}
</style>
