<template>
  <!-- <div class="green home pa-4"> -->
  <!-- <v-layout class="pa-3" row> -->
  <v-container>
    <v-row :class="$vuetify.breakpoint.smAndUp ? '' : 'mb-5'">
      <v-col cols="12" md="8">
        <template v-if="!loadingPosts && posts.length">
          <v-card
            width="100%"
            elevation="1"
            v-for="post in posts"
            :key="post.id"
            class="mb-3"
          >
            <v-list two-line class="ma-0 pa-0">
              <v-list-item>
                <v-list-item-avatar>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                  ></v-img>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="caption font-weight-bold"
                    >@john_lenon</v-list-item-title
                  >
                  <v-list-item-subtitle class="caption">{{
                    post.location
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-img
              :height="$vuetify.breakpoint.smAndUp ? '480' : '250'"
              :src="post.imageUrl"
            ></v-img>
            <v-card-title class="text-h6">
              {{ post.caption }}
            </v-card-title>

            <v-card-subtitle class="caption text-grey">{{
              post.date | date("dd MMMM yyyy HH:mm")
            }}</v-card-subtitle>
          </v-card>
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="grey--text text-center">No post yet</h5>
        </template>
        <template v-else>
          <v-skeleton-loader
            type="list-item-avatar,image, article"
          ></v-skeleton-loader>
        </template>
      </v-col>
      <v-col cols="4" class="d-none d-sm-flex">
        <v-list two-line class="ma-0 pa-0 fixed-profile" color="#ffffff00">
          <v-list-item>
            <v-list-item-avatar size="48">
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="caption font-weight-bold"
                >@john_lenon</v-list-item-title
              >
              <v-list-item-subtitle class="caption"
                >Mepanga, Indonesia</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
  <!-- </v-layout> -->
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Axios from "axios";
export default {
  name: "PageHome",
  data() {
    return {
      posts: [],
      loadingPosts: false,
    };
  },
  methods: {
    getPosts() {
      this.loadingPosts = true;
      Axios.get(process.env.VUE_APP_API_URL + "/posts")
        .then((response) => {
          this.posts = response.data;
          this.loadingPosts = false;
        })
        .catch((err) => {
          console.log("err", err);
          this.loadingPosts = false;
        });
    },
  },
  created() {
    this.getPosts();
    // console.log(process.env.VUE_APP_URL_API)
  },
};
</script>

<style lang="sass">
.fixed-profile
  position: fixed
</style>