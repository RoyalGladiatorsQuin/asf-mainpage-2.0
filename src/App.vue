<template>
  <div id="app">
      <asf-navbar></asf-navbar>
      <launch-screen></launch-screen>
      <top-contents></top-contents>
      <common-tools></common-tools>
      <about-us></about-us>
  </div>
</template>

<script>
import aboutUs from "./components/aboutUs/aboutUs";
import commonTools from "./components/commonTools/commonTools";
import launchScreen from "./components/launchScreen/launchScreen";
import topContents from "./components/topContents/topContents";
import asfNavbar from 'asf-navbar-vue'
export default {
  beforeCreate() {
    document.getElementsByTagName("body")[0].setAttribute("style", "margin:0");
  },
  name: 'App',
  components: {
    asfNavbar,
    aboutUs,
    commonTools,
    launchScreen,
    topContents,
  },
  metaInfo() {
    return {
      title: "asf-mainpage-2.0",
      meta: [
        {
          name: "referrer",
          content:
              "never"
        }
      ]
    };
  }
}
</script>

<style>
#app {
  text-align: center;
  margin: 0;
}
</style>
