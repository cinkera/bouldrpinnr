<template>
    <div class="wrapper">
        <!-- <p>Upload a picture!</p> -->
        <input type="file" 
            :style='{color: "#7349BD"}'
            counter 
            @change="previewImage" 
            accept="image/*"
            prepend-icon="mdi-camera"
            :disabled="processing"
        >
        <div>
            <p>Progress: {{uploadValue.toFixed()+"%"}}
            <progress id="progress" :value="uploadValue" max="100" ></progress>  </p>
        </div>
        <div v-if="imageData!=null">
            <img class="preview" :src="image">
            <br>
            <!-- <button @click="onUpload">Upload</button> -->
            <v-btn disabled v-if="!imageData" >Upload Picture!</v-btn>
            <v-btn v-if="imageData" @click="onUpload">Upload Picture!</v-btn>
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
            console.log("\n ... about to upload ", this.imageData, " to ", dbpath); 
            const storageRef = storage.ref(`${dbpath}/${this.imageData.name}`).put(this.imageData);
            storageRef.on(`state_changed`,snapshot=>{
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, error=>{console.log(error.message)},
                ()=>{this.uploadValue=100;
                    storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                        console.log("\n ... uploaded, url: ", url);
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
    padding: 2px;
    margin: auto;
}
.preview {
    width: 200px;
}
</style>
