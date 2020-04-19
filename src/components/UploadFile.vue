<template>
    <div>
        <input type="file" @change="onFileSelected">
        <button @click="onUpload">Upload</button>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'uploadFile',

    data() {
        return {
            selectedFile: null
        }
    },

    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            console.log(event);
        },

        onUpload() {
            const formData = new FormData();
            formData.append('user_image', this.selectedFile, this.selectedFile.name);
            axios.post("http://project/api/user/upload", formData). then((res) => {console.log(res)}).catch((err) => {console.log(err)});
        }
    }
}

</script>