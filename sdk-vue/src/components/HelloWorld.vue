<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br />
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
        >vue-cli documentation</a
      >.
    </p>
    <div>
      <v-col>
        <v-btn @click="init">init</v-btn>
      </v-col>
    </div>
  </div>
</template>

<script>
console.log("hello");
const sdk = require("@connext/vector-sdk");
console.log("world");
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  methods: {
    async init() {
      const connextSdk = new sdk.ConnextSdk();
      console.log(connextSdk);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
