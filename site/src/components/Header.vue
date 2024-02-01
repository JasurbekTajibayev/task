<template>
<Toolbar>
    <template #center>
      <label>Select Theme:</label> 
      <Dropdown  v-model="selectedTheme" @change="changeTheme()" :options="themes"  optionLabel="name" placeholder="Select a theme" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" />
    </template>
</Toolbar>
</template>
<script>
import { usePrimeVue } from 'primevue/config';
export default {
    data() {
        return {
            selectedTheme: null,
            oldTheme: 'lara-light-blue',
            themes : [
                { name: 'aura-light-blue' },
                { name: 'aura-light-purple' },
                { name: 'aura-dark-blue' },
                { name: 'aura-dark-green' },
                { name: 'arya-blue' },
                { name: 'arya-green' },
                { name: 'arya-orange' },
                { name: 'arya-purple' },
                { name: 'lara-light-blue'},
            ],
            PrimeVue: usePrimeVue(),
        }
    },
    methods: {
        //styleni o'zgartirish uchun
    changeTheme() {
      this.PrimeVue.changeTheme(this.oldTheme,this.selectedTheme.name,'theme-link',()=>{});
      this.oldTheme=this.selectedTheme.name;
    }
    }
}
</script>

<style>
    
</style>