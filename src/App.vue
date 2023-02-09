<template>
  <ViewPage />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ViewPage from "./components/viewPage.vue";
export default defineComponent({
  name: "App",
  components: {
    ViewPage,
  },

  setup() {

    return {
    };
  },
});
</script>

<style>
</style>
