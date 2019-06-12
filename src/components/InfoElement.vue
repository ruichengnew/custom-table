<template lang="html">
  <font-awesome-icon
    icon="info-circle"
    data-toggle="popover"
    data-placement="top"
    :data-content="info"
    class="text-secondary"
  />
</template>

<script>
export default {
  name: "InfoElement",
  props: {
    info: {
      type: String,
      required: false,
      default: "Here is something you maybe care."
    }
  },
  mounted: function() {
    $(function() {
      $('[data-toggle="popover"]').popover({
        trigger: "hover focus",
        delay: { show: 200, hide: 300 }
      });
    });
  }
};
</script>

<style lang="css" scoped></style>
