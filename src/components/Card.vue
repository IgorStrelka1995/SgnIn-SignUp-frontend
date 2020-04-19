<template>
    <div class="card">
        <img :src="user.image" alt="Avatar" style="width:100%">
        <div class="card-container">
            <div class="container">
                <div class="row">
                     <div class="col-5">
                        <p class="field-name"><b>{{ $t('name') }}:</b></p>
                    </div>
                    <div class="col-7">
                        <p class="field-value">{{ user.name }}</p>
                    </div>
                </div>
                <div class="row">
                     <div class="col-5">
                        <p class="field-name"><b>{{ $t('surname') }}:</b></p>
                    </div>
                    <div class="col-7">
                        <p class="field-value">{{ user.surname }}</p>
                    </div>
                </div>
                <div class="row">
                     <div class="col-5">
                        <p class="field-name"><b>{{ $t('cardemail') }}:</b></p>
                    </div>
                    <div class="col-7">
                        <p class="field-value">{{ user.email }}</p>
                    </div>
                </div>
                <div class="row">
                     <div class="col-5">
                        <p class="field-name"><b>{{ $t('country') }}:</b></p>
                    </div>
                    <div class="col-7">
                        <p class="field-value">{{ user.country }}</p>
                    </div>
                </div>
                <div class="row">
                     <div class="col-5">
                        <p class="field-name"><b>{{ $t('city') }}:</b></p>
                    </div>
                    <div class="col-7">
                        <p class="field-value">{{ user.city }}</p>
                    </div>
                </div>
                <div class="row">
                     <div class="col-5">
                        <p class="field-name"><b>{{ $t('gender') }}:</b></p>
                    </div>
                    <div class="col-7">
                        <p class="field-value">{{ user.gender }}</p>
                    </div>
                </div>
                <div class="row">
                     <div class="col-12">
                        <log-out></log-out>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LogOut from './LogOut'
import {GET_USER} from './../store/actions/user.js'
import 'vuejs-noty/dist/vuejs-noty.css'

export default {
    name: "card",

    components: {
        LogOut
    },

    data() {
        return {
            user: []
        }
    },

    methods: {
        getUser() {
            let user_id = localStorage.getItem('id');
            let token = localStorage.getItem('token');

            if(user_id && token) {
                let data = {
                    "token": token,
                    "params": user_id
                };

                this.$store.dispatch(GET_USER, data)
                    .then(() => {
                        this.user = this.$store.getters.getUserData;
                    })
                    .catch((errors) => {
                        this.$noty.error(errors.response.data.response, {layout: 'center'});
                    })
                ;
            }
        }
    },

    created() {
        this.getUser();
    }
}
</script>

<style>
    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 20%;
        margin: auto;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .card-container {
        padding: 12px 16px;
    }

    .field-name, .field-value {
        text-align: left;
    }
</style>