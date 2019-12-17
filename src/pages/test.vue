<template>
  <div class="test">
    test
    <pre>
      {{ data }}
    </pre>
  </div>
</template>

<script>
import gql from "graphql-tag";
// import Component from "~/components/Component.vue"

export default {
  components: {
    // Component
  },
  async asyncData({ app }) {
    const client = app.apolloProvider.clients.spacex;

    const { data } = await client.query({
      query: gql`
        {
          launchesPast(limit: 10) {
            mission_name
          }
        }
      `,
      variables: undefined
    });

    return { data };
  }
};
</script>

<style lang="sass" scoped></style>
