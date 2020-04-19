<template>
    <div class="dynamic-component">
        <button
            v-for="(tab, name) in tabs"
            v-bind:key="tab"
            v-bind:class="['tab-button', { active: currentTab === tab }]"
            v-on:click="currentTab = tab"
            >
            {{ $t(name) }}
            </button>
          <keep-alive>
              <component v-bind:is="currentTabComponent" class="tab"></component>
          </keep-alive>    
     </div> 
</template>

<script>
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'

export default {
    name: 'StartPage',

    components: {
        SignIn,
        SignUp
    },

    data() {
        return {
          currentTab: "sign-in",
          tabs: {"Sign In": "sign-in","Sign Up": "sign-up"}
        }
    },

    computed: {
        currentTabComponent: function() {
          return this.currentTab.toLowerCase();
        }
    }
}
</script>

<style>
.dynamic-component {
    max-width: 400px;
    margin: auto
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
  color: #495057;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
}
</style>