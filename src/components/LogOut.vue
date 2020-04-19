<template>
    <div>
        <button type="button" @click="logOut" class="btn btn-secondary">{{ $t('Log Out') }}</button>
    </div>
</template>

<script>
import {LOG_OUT} from './../store/actions/auth.js'

export default {
    methods: {
        logOut() {
            let user_id = localStorage.getItem('id');
            let token   = localStorage.getItem('token');

            if(user_id && token) {
                let data = {
                    "token": token,
                    "params": JSON.stringify({"id": user_id})
                };

                this.$store.dispatch(LOG_OUT, data)
                    .then(() => {
                        this.$router.push({name: 'startpage'});
                    }).catch((errors) => {
                        console.log(errors)
                    })
                ;
            } 
        }
    }
}
</script>