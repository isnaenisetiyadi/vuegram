<template>
  <v-container class="max-width-screen-cam">
    <div class="camera-frame pa-2">
      <video
        v-show="!imageCaptured"
        width="100%"
        height="auto"
        autoplay
        playsinline
        ref="video"
      />
      <canvas v-show="imageCaptured" ref="canvas" width="100%" height="240" />
    </div>
    <div class="pa-2 text-center">
      <v-btn
        v-if="hasCameraSupport"
        @click="captureImage"
        :disabled="imageCaptured"
        color="grey darken-4"
        fab
        dark
        small
        elevation="0"
      >
        <eva-icon name="camera" fill="white"></eva-icon>
      </v-btn>

      <v-file-input
        v-else
        accept="image/*"
        v-model="imageUploaded"
        @change="captureImageFallback"
        outlined
        counter
        color="grey"
      >
        <template v-slot:prepend-inner>
          <eva-icon name="attach"></eva-icon>
        </template>
      </v-file-input>
      <!-- prepend-icon="mdi-paperclip" -->

      <!-- <v-text-field solo label="Prepend inner">
        <template v-slot:append-outer>
          <eva-icon name="attach"></eva-icon>
        </template>
      </v-text-field> -->
      <!-- prepend-inner-icon="mdi-map-marker" -->
    </div>
    <div
      class="px-6"
      :class="$vuetify.breakpoint.smAndUp ? 'max-width-sm mx-auto' : ''"
    >
      <div class="row justify-center px-3 pt-3">
        <v-text-field
          v-model="post.caption"
          label="Caption *"
          dense
          color="grey"
        ></v-text-field>
      </div>
      <div class="row justify-center px-3">
        <v-text-field
          v-model="post.location"
          dense
          label="Location"
          color="grey"
          :loading="locationLoading"
        >
          <template v-slot:append v-if="!locationLoading && locationSupported">
            <v-btn @click="getLocation" icon plain>
              <eva-icon name="navigation-2-outline"></eva-icon>
            </v-btn>
          </template>
        </v-text-field>
      </div>

      <div class="row justify-center pt-3">
        <v-btn
          @click="addPost()"
          :disabled="!post.caption || !post.photo"
          rounded
          color="primary"
          dark>
          Post
          Image
          </v-btn>
      </div>
    </div>

    <!-- Dialog -->
    <v-dialog v-model="errorDialog" max-width="400">
      <v-card>
        <v-alert icon="mdi-map-marker-off" prominent text type="error">
          Lokasi tidak dapat ditemukan
        </v-alert>
      </v-card>
    </v-dialog>

    <!-- Process Loader-->
    <!-- <v-overlay >
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay> -->
    <v-snackbar
      v-model="saveNotif"
    >
      Post Added

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="saveNotif = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
// @ is an alias to /src
// import formData from vue js
import Axios from "axios";
require("md-gum-polyfill");
export default {
  name: "Camera",
  data() {
    return {
      post: {
        id: this.uid,
        caption: "",
        location: "",
        photo: null,
        date: Date.now(),
      },
      imageCaptured: false,
      imageUploaded: [],
      hasCameraSupport: true,
      errorDialog: false,
      locationLoading: false,
      saveNotif: false
    };
  },
  computed: {
    locationSupported() {
      if ("geolocation" in navigator) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    goTo() {
      // let random = Math.random() * 100
      // console.log(random);
      console.log(this.post.id);
    },

    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((error) => {
          this.hasCameraSupport = false;
        });
    },
    captureImageFallback(file) {
      this.post.photo = file;
      let canvas = this.$refs.canvas;
      let context = canvas.getContext("2d");
      var reader = new FileReader();
      reader.onload = (event) => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img, 0, 0);
          this.imageCaptured = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      this.post.photo = this.dataURItoBlob(canvas.toDataURL());
      this.disableCamera();
    },
    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(",")[1]);

      // separate out the mime component
      var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      //Old Code
      //write the ArrayBuffer to a blob, and you're done
      //var bb = new BlobBuilder();
      //bb.append(ab);
      //return bb.getBlob(mimeString);

      //New Code
      return new Blob([ab], { type: mimeString });
    },
    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCityAndCountry(position);
        },
        (err) => {
          this.locationError();
        },
        { timeout: 7000 }
      );
    },
    getCityAndCountry(position) {
      //api geocode.xzy : 116400034037948e15834918x61565
      let apiUrl =
        "https://geocode.xyz/" +
        position.coords.latitude +
        "," +
        position.coords.longitude +
        "?json=1&auth=116400034037948e15834918x61565";
      Axios.get(apiUrl)
        .then((result) => {
          this.locationSuccess(result);
        })
        .catch((err) => {
          this.locationError();
        });
    },
    locationSuccess(result) {
      this.post.location = result.data.city;
      if (result.data.country) {
        this.post.location += ", " + result.data.country;
      }
      this.locationLoading = false;
    },
    locationError() {
      this.errorDialog = true;
      this.locationLoading = false;
    },
    addPost(){
      let formData = new FormData()
      formData.append('id', this.post.id)
      formData.append('caption', this.post.caption)
      formData.append('location', this.post.location)
      formData.append('date', this.post.date)
      formData.append('fo;e', this.post.photo, this.post.id + '.png')

      Axios.post(process.env.VUE_APP_API_URL + '/createPost', formData).then (response => {
        console.log('response', response)
        this.saveNotif = true
        this.$router.push('/')
      }).catch(err => {
        console.log('err', err)
      })
    }
  },
  mounted() {
    this.initCamera();
    // console.log("uid", this.post.id);
  },
  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  },
};
</script>

<style lang="sass">
.camera-frame
  border: 2px solid #616161
  border-radius: 10px

.max-width-sm
  max-width: 350px
</style>