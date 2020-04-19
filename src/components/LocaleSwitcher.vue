<template>
    <div class="main-locale">
        <ul class="locale">
            <li v-for="locale in locales" :key="locale" @click="switchLocale(locale)">
                {{locale}}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'LocaleSwitcher',

    data() {
        return {
            locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE.split(',')
        }
    },

    methods: { 
        switchLocale(locale) {
            if (this.$i18n.locale !== locale) {
                this.$i18n.locale = locale;
            }
        }
    }
}
</script>

<style>
    .main-locale {
        max-width: 70px;
        margin: auto;
    }

    .locale {
        padding-left: 0px;
        padding-right: 0px;
        margin-bottom: 5px;
    }

    .locale li {
        display: inline;
        margin-right: 5px;
        text-decoration: underline;
        color: #459CE7;
        cursor: pointer;
    }
</style>