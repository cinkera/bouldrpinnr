<template>
    <div class="wrapper">
        <!-- <p>Upload a picture!</p> -->
        <label class="fileInputLabel" v-if="!imageData">Choose a profile picture
            <input type="file" 
                color="#7349BD"
                @change="previewImage" 
                accept="image/*"
                prepend-icon="mdi-camera"
                :disabled="processing" >
        </label>
        <div class="progress" v-if="imageData">
            <p>Progress: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" color="#7349BD"></progress>  </p>
            <p v-if="this.imageData">{{this.imageData.name}}</p>
        </div>
        <div preview v-if="imageData!=null">
            <img :src="image">
            <br>
            <!-- <button @click="onUpload">Upload</button> -->
            <v-btn disabled v-if="!imageData" >Upload Picture!</v-btn>
            <v-btn color="deep-purple" outlined v-if="imageData" @click="onUpload">Upload Picture!</v-btn>
        </div>
    </div>
</template>

<script>
import { storage } from "@/firebase.js";

export default {
    name: 'UploadImage',
    components: {},
    props: ['user', 'type'],
    data: () => ({
        loading: false,
        processing: false,
        image: null,
        error: null,
        imageData: null,
        uploadValue: 0
    }),
    methods: {
        previewImage(event) {
            this.uploadValue=0;
            this.image=null;
            this.imageData = event.target.files[0];
        },
        onUpload(){
            this.processing = true;
            this.loading = true;
            this.image=null;
            let dbpath = null;
            if(this.type="userImage") dbpath = '/userImages';
            else if (this.type="suggestion") dbpath="/suggestionImages";
            else dbpath = null;
            // console.log("\n ... about to upload ", this.imageData, " to ", dbpath); 
            const storageRef = storage.ref(`${dbpath}/${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{this.uploadValue=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        // console.log("\n ... uploaded, url: ", url);
                        // now that this is uploaded, we need to emit the url so DB can be upadted in appropriate spot
                        this.$emit('updateDB', url);
                        this.image = url;
                    });
                }
            );
        }
    },
    created() {
    }
    
}
</script>

<style scoped>
.wrapper {
    padding: 5px;
    margin: 5px auto;
    min-height: 100px;
    min-width: 350px;
    display: flex;
    flex-direction: column;
}
.preview {
    order: 3;
    max-width: 100%;
    height: auto;
    min-width: 200px;
}
.progress {
    order: 3;
}
.fileInputLabel {
    order: 1;
    position: relative;
    font-family: calibri;
    padding: 10px;
    margin: 2px auto;
    border-radius: 5px;
    border: 1px solid #7349BD;
    text-align: center;
    /* background-color: #DDD; */
    cursor: pointer;
}
input[type="file"] {
    display: none;
}
</style>
