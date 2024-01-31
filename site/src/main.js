// import 'primevue/resources/themes/aura-light-green/theme.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'

import App from './App.vue'

import PrimeVue from 'primevue/config';

//companents
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   
import Row from 'primevue/row';                   
import Tag from 'primevue/tag';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';
import Dropdown from 'primevue/dropdown';



const app=createApp(App);
app.use(PrimeVue);
//mahsus komponentalar
app.component('Button',Button);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Row',Row);
app.component('Tag',Tag);
app.component('Card',Card);
app.component('ProgressSpinner',ProgressSpinner);
app.component('InputText',InputText);
app.component('Toolbar',Toolbar);
app.component('Dropdown',Dropdown);

app.mount('#app')
