<template>
    <div>
        <form class="form-signup">
            <div class="form-group">
                <input id="sing-up-name" type="text" name="name" v-model="name" class="form-control" :placeholder="$t('name')">
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.name) : null }}</i>
            </div>
            <div class="form-group">
                <input id="sing-up-surname" type="text" name="surname" v-model="surname" class="form-control" :placeholder="$t('surname')">
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.surname) : null }}</i>
            </div>
            <div class="form-group">
                <input id="sing-up-email" type="email" name="email" v-model="email" class="form-control" :placeholder="$t('email')">
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.email) : null }}</i>
            </div>
            <div class="form-group">
                <input id="sing-up-password" type="password" name="password" v-model="password" class="form-control" :placeholder="$t('password')">
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.password) : null }}</i>
            </div>
            <div class="form-group">
                <input id="sing-up-country" type="text" name="country" v-model="country" class="form-control" :placeholder="$t('country')">
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.country) : null }}</i>
            </div>
            <div class="form-group">
                <input id="sing-up-city" type="text" name="city" v-model="city" class="form-control" :placeholder="$t('city')">
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.city) : null }}</i>
            </div>
            <div class="form-group">
                <div class="row">
                    <div class="col">
                        <label for="sing-up-gender-male">
                            <input id="sing-up-gender-male" type="radio" name="gender" value="M" v-model="gender" class="form-control">{{ $t('male') }}
                        </label>
                    </div>
                    <div class="col">
                        <label for="sing-up-gender-female">
                            <input id="sing-up-gender-female" type="radio" name="gender" value="F" v-model="gender" class="form-control">{{ $t('female') }}
                        </label>
                    </div>
                </div>
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.gender) : null }}</i>
            </div>
            <div class="form-group">
                <input style="display:none" type="file" @change="onFileSelected" ref="fileInput">
                <button type="button" class="btn btn-primary" @click="$refs.fileInput.click()">{{ $t('file') }}</button>
            </div>    
            <div class="form-group">    
                <i class="error-field" v-for="(error, index) in errors" :key="index">{{ error ? $t(error.image) : null }}</i>
            </div>
            <button type="button" class="btn btn-success" @click="signUp">{{ $t('Sign Up') }}</button>
        </form>
    </div>
</template>

<script>

import {CREATE_USER} from './../store/actions/user.js'
import Validate from './../validate.js'

export default {
    name: 'sign-up',

    data() {
        return {
            name: '',
            surname: '',
            email: '',
            password: '',
            country: '',
            city: '',
            gender: '',
            errors: [],
            selectedFile: null
        }
    },

    methods: {

        validationSignUpForm(name, surname, email, password, country, city, gender, image) {
            this.validate = new Validate();
            this.errors.push(this.validate.validName(name));
            this.errors.push(this.validate.validSurname(surname));
            this.errors.push(this.validate.validEmail(email));
            this.errors.push(this.validate.validUpPassword(password));
            this.errors.push(this.validate.validCountry(country));
            this.errors.push(this.validate.validCity(city));
            this.errors.push(this.validate.validGender(gender));
            this.errors.push(this.validate.validImage(image));
        },

        signUp() {
            this.errors = [];

            this.validationSignUpForm(this.name, this.surname, this.email, this.password, this.country, this.city, this.gender, this.selectedFile);

            if(!this.errors.join('').split('').length) {
                const fd = new FormData();
                fd.append('name', this.name);
                fd.append('surname', this.surname);
                fd.append('email', this.email);
                fd.append('password', this.password);
                fd.append('country', this.country);
                fd.append('city', this.city);
                fd.append('gender', this.gender);
                fd.append('user_image', this.selectedFile, this.selectedFile.name);

                this.$store.dispatch(CREATE_USER, fd)
                    .then(() => {
                        this.$router.push("/card");
                    }).catch((errors) => {
                        this.$noty.error(errors.response.data.response, {layout: 'center'});
                    })
                ;
            } 
        },

        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
        }
    }
}

</script>

<style>
.form-signup {
  width: 100%;
  max-width: 350px;
  padding: 40px 0px 15px 15px; 
  margin: auto;
}
.form-signup .checkbox {
  font-weight: 400;
}
.form-signup .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signup .form-control:focus {
  z-index: 2;
}
.form-signup input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signup input[type="text"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signup input[type="password"] {
    margin-bottom: -1px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
