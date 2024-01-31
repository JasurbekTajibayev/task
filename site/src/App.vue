<template>
  <header>
    <Toolbar>
    <template #center>
      <label>Select Theme:</label> 
      <Dropdown  v-model="selectedTheme" @change="changeTheme()" :options="themes"  optionLabel="name" placeholder="Select a theme" checkmark :highlightOnSelect="false" class="w-full md:w-14rem" />
    </template>
</Toolbar>

  </header>
  <main>
    <Card>
    <template #title>kep.uz problems table</template>
    <template #content>
      <!-- ustun nomlari: id, nomi, teglar, qiyinchiligi, reyting, urinishlar -->
      <DataTable v-model:filters="filters" :value="problems" filterDisplay="row" selectionMode="single" :loading="loading" dataKey="id" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]"   tableStyle="min-width: 50rem">
            
        <template #empty> No problems found. </template>
        <template #loading> Loading problems data. Please wait. </template>
            
            <Column field="id"  header="ID" sortable></Column>
            
            <Column field="title" :showFilterMenu="false" header="Title" sortable>
              <template #body="item">
                <a class="text-900" :href="'https://kep.uz/practice/problems/problem/'+item.data.id">{{item.data.title}}</a>
              </template>
              <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" style="min-width: 6rem;" placeholder="Search by title" />
                </template>
            </Column>

            <Column filterFiled="tags" :showFilterMenu="false" header="Tags">
              <template #body="item">
                <Tag v-for="tag in item.data.tags" :value="tag.name" class="tag"/>
              </template>
            </Column>
            
            <Column field="difficultyTitle" filterFiled="difficultyTitle"  :showFilterMenu="false" header="Difficulty" sortable>
              <template #body="item">
                <Tag :value="item.data.difficultyTitle" :severity="getSeverity(item.data.difficultyTitle)" style="min-width: 6rem;" />
              </template>
              <template #filter="{ filterModel, filterCallback }">
                <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="severity" placeholder="Select One" class="p-column-filter" style="min-width: 6rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Dropdown>
              </template>
            </Column>
            
            <Column  field="likesCount" header="Rating" sortable>
              <template #body="item">
                <span class="pi pi-thumbs-up-fill"></span> {{item.data.likesCount}}
                <spn class="pi pi-thumbs-down-fill"></spn> {{item.data.dislikesCount}}
              </template>
            </Column>
            
            <Column field="attemptsCount" header="Attempts" sortable>
              <template #body="item">
                <Tag icon="pi pi-check" :value="item.data.solved+'/'+item.data.attemptsCount" severity="info" style="min-width: 5rem;"/>
              </template>
            </Column>
            
        </DataTable>
    </template>
    </Card>
  </main>

  <!-- Footer qismmi -->
  <footer>
    <h5>Created By: JASURBEK TAJIBAYEV</h5>
  </footer>
</template>

<script>
import axios from 'axios';
import { usePrimeVue } from 'primevue/config';
import { FilterMatchMode } from 'primevue/api';

export default {
  data() {
    return {
      count: 0,
      problems: [],
      page: 1,
      pageSize: 0,
      pagesCount: 1,
      total: 0,
      loading: true,
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
      tags: null,
      severity: ['Beginner', 'Basic', 'Normal', 'Medium', 'Advanced', 'Hard', 'Extremal'],
      filters: {
        title: {value: null, matchMode: FilterMatchMode.CONTAINS},
        tags: {value: null, matchMode: FilterMatchMode.EQUALS},
        difficultyTitle: {value: null, matchMode: FilterMatchMode.EQUALS },
      },
    }
  },
  methods: {
    async fetchProblems() {
      const url="https://kep.uz/api/problems";
      try {
        const res=await axios.get(url);
        const data=res.data;
        this.count=data.count;
        this.problems=data.data;
        this.page=data.page;
        this.pageSize=data.pageSize;
        this.pagesCount=data.pagesCount;
        this.total=data.total;
        this.loading=false;
      } catch (error) {
        console.log(error);
      }
    },
    //barcha teglarni aolish
    async getTags() {
      const url="https://kep.uz/api/problems";
    },
    //qiyinlik darajalarini rangli qilib chiqarish uchun
    getSeverity(item) {
      switch(item) {
        case this.severity[0]: return '';
        case this.severity[1]: return '';
        case this.severity[2]: return 'success';
        case this.severity[3]: return 'info';
        case this.severity[4]: return 'warning';
        case this.severity[5]: return 'warning';
        case this.severity[6]: return 'danger';
        default: return null;
      }
    },
    //styleni o'zgartirish uchun
    changeTheme() {
      this.PrimeVue.changeTheme(this.oldTheme,this.selectedTheme.name,'theme-link',()=>{});
      this.oldTheme=this.selectedTheme.name;
    }
  },
  mounted() {
    this.fetchProblems();
  }
}

</script>


<style>
a {
  color:darkblue;
  text-decoration-line: none;
}
.tag {
  background-color: darkblue; color: aliceblue; margin:1px;
}
footer {
  padding: 10px;
  border-top: 1px solid #ccc;
  margin-top: 10px;
  text-align: center;

}
label {
  font-size: 16px;
  margin-right: 10px;
}
</style>
