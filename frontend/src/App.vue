<template>
  <div id="app">
    <!-- 1 -->
    <hr>
    <div>= get text_data via created() from mongoDb(mongoose) =</div>
    <div>{{mongoDb}}</div>
    
    <!-- 2 -->
    <hr>
    <div>= get Session from itself header =</div>
    <div @click="getSession" class="go">get Session</div>
    <div>{{sessionData}}</div>
    
    <!-- 3 -->
    <hr>
    <div>= upLoad file to gridStorage ИЛИ to diskStorage =</div>
    <div>необходимо переключить вид используемого хранилища в "let upload = multer({storage: gridStorage})"</div>
    <input type="file" multiple
           name="fileInput"
           @change="uploadImg"
    />
    <img :src="uploadedImageUrl" class="up-mage"/>
    
    <!--  4a  -->
    <hr>
    <div>= get img from gridStorage - sky.jpeg =</div>
    <img :src="loadedGrigImage" class="up-mage" alt="здесь картинка gridStorage"/>
    
    4b
    <hr>
    <div>= get img from diskStorage - sunset.jpeg =</div>
    <img :src="loadedDiskImage" class="up-mage" alt="здесь картинка diskStorage"/>
    
    <!-- 5a   -->
    <hr>
    <div>get list of file_name from gridStorage</div>
    <div @click="getAllGridFiles" class="go">getAllGridFiles</div>
    <pre> = {{loadedGridFiles}}</pre>
    
    <!-- 5b   -->
    <hr>
    <div>get list of file_name from diskStorage</div>
    <div @click="getAllDiskFilesName" class="go">getAllDiskFilesName</div>
    <pre>{{loadedDiskFilesName}}</pre>
    
    
    <!-- 6a   -->
    <hr>
    <div>get ONE file from gridStorage (vinny.jpg)</div>
    <div @click="getOneGridFile" class="go">getOneGridFile</div>
    <pre>{{loadedOneGridFile}}</pre>
    
    <!-- 6b   -->
    <hr>
    <div>get ONE text-file "password" from diskStorage</div>
    <div @click="getOneDiskFile" class="go">getOneDiskFile</div>
    <pre>{{loadedOneDiskFile}}</pre>
    
    <!-- 7a   -->
    <hr>
    <div>dellete GridFile - sky.jpeg</div>
    <div @click="delGridFile" class="go">delGridFile</div>
    
    <!-- 7b   -->
    <hr>
    <div>dellete DiskFile - sunset.jpeg</div>
    <div @click="delDiskFile" class="go">delDiskFile</div>
  
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import Vue from 'vue';
import { Product } from '@/types'

// @ts-ignore

export default  Vue.extend({
  data: () => ({
    mongoDb: 'mongoDb',
    sessionData: 'sessionData',
    uploadedImageUrl: '',
    loadedGrigImage: 'http://localhost/api/grigImage/sky.jpeg',
    loadedDiskImage: 'http://localhost/api/diskImage/sunset.jpeg',
    loadedGridFiles: null,
    loadedDiskFilesName: null,
    loadedOneGridFile: null,
    loadedOneDiskFile: null,
  }),
  methods: {
    getSession() {
      axios.get('/api/getsession')
      .then(response => {
        this.sessionData = response.data
      })
    },
    uploadImg(event) {
      this.uploadedImageUrl = URL.createObjectURL(event.target.files[0])
      
      let formData = new FormData();
      formData.append('file', event.target.files[0]);    //files - это НЕ массив загружаемых файлов, а массив параметров у event.target(!).
      const config = {headers: {'Content-Type': 'multipart/form-data'}}
      
      axios.post('/api/upload_file', formData, config)
      .then((response) => {
        console.log("response from gridStorage or diskStorage ============", response.data)
      })
      .catch(err => alert('Error: ' + err));
    },
    getAllGridFiles() {
      axios.get('/api/getAllGridFiles')
      .then((response) => {
        this.loadedGridFiles = response.data
      })
      .catch(err => alert('Error: ' + err));
    },
    getAllDiskFilesName() {
      axios.get('/api/getAllDiskFilesName')
      .then((response) => {
        this.loadedDiskFilesName = response.data
      })
      .catch(err => alert('Error: ' + err));
    },
    getOneGridFile() {
      axios.get('/api/gridImgs/vinny.jpg')
      .then((response) => {
        this.loadedOneGridFile = response.data
      })
      .catch(err => alert('Error: ' + err));
    },
    getOneDiskFile() {
      axios.get('/api/diskImgs/password')
      .then((response) => {
        this.loadedOneDiskFile = response.data
      })
      .catch(err => alert('Error: ' + err));
    },
    delGridFile() {
      axios.delete('/api/gridImgs/sky.jpeg')
      .then((response) => {
        this.loadedFile = response.data
      })
      .catch(err => alert('Error: ' + err));
    },
    delDiskFile() {
      axios.delete('/api/diskImgs/sunset.jpeg')
      .then((response) => {
        this.loadedFile = response.data
      })
      .catch(err => alert('Error: ' + err));
    },
  },
  created() {
    axios.get('/api/mongoCollection')
    .then(response => {
      this.mongoDb = response.data
    })
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.go {
  color: $success-color;
  font-size: rem(16);
  cursor: pointer;
}

.up-mage {
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  width: 150px;
  height: 150px;
  border: 2px solid #e5e5e5;
}
</style>
