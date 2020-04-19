<template>
    <div>
        <form class="form-signin">
            <div class="form-group">
                <input id="sing-in-email" type="email" name="email" v-model="email" class="form-control" :placeholder="$t('email')">
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.email) : null }}</i>
            </div>
            <div class="form-group">
                <input id="sing-in-password" type="password" name="email" v-model="password" class="form-control" :placeholder="$t('password')">
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.password) : null }}</i>
            </div>
            <button type="button" class="btn btn-success" @click="signIn">{{ $t('Sign In') }}</button>
        </form>
    </div>
</template>

<script>

import {AUTH} from './../store/actions/auth.js'
import Validate from './../validate.js'

export default {
    name: 'sign-in',

    data() {
        return {
            email: null,
            password: null,
            errors: [],
            validate: ""
        }
    },

    methods: {

        validationSignInForm(email, password) {
            this.validate = new Validate();
            this.errors.push(this.validate.validEmail(email));
            this.errors.push(this.validate.validPassword(password));
        },

        signIn() {
            this.errors = [];

            this.validationSignInForm(this.email, this.password);

            if(!this.errors.join('').split('').length) {
                let data = JSON.stringify({email: this.email, password: this.password});

                this.$store.dispatch(AUTH, data)
                    .then(() => {
                        this.$router.push({name: 'card'});
                    }).catch((errors) => {
                        this.$noty.error(errors.response.data.response, {layout: 'center'});
                    })
                ;
            }
        }
    }
}

</script>

<style>
.form-signin {
  width: 100%;
  max-width: 350px;
  padding: 40px 0px 15px 15px; 
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>