<template lang="">
    <Card>
    <template #title>kep.uz problems table</template>
    <template #content>
      
      <DataTable v-model:filters="filters" :value="problems" filterDisplay="row" selectionMode="single" :loading="loading" dataKey="id"  tableStyle="min-width: 50rem">
            
        <template #empty> No problems found. </template>
        <template #loading>
          <div class="card flex justify-content-center">
            <ProgressSpinner style="width: 70px; height: 70px" strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" aria-label="Custom ProgressSpinner" />
          </div>
        </template>
      
            <!-- Id ustuni -->
            <Column field="id"  header="ID" sortable></Column>
            
            <!-- Title ustuni -->
            <Column field="title" :showFilterMenu="false" header="Title" sortable>
              <template #body="item">
                <a class="p-text-secondary" :href="'https://kep.uz/practice/problems/problem/'+item.data.id">{{item.data.title}}</a>
                <Tag icon="pi pi-check-circle" severity="success" v-if="item.data.hasSolution" value="Solution" />
              </template>
              <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" style="min-width: 6rem;" placeholder="Search by title" />
                </template>
            </Column>
            
            <!-- Tags ustuni -->
            <Column filterFiled="tags" :showFilterMenu="false" header="Tags">
              <template #body="item">
                <Tag v-for="tag in item.data.tags" :value="tag.name" class="tag"/>
              </template>
            </Column>
            
            <!-- Difficulty ustuni -->
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
            
            <!-- Rating ustuni -->
            <Column  field="likesCount" header="Rating" sortable>
              <template #body="item">
                <span class="pi pi-thumbs-up-fill"></span> {{item.data.likesCount}}
                <spn class="pi pi-thumbs-down-fill"></spn> {{item.data.dislikesCount}}
              </template>
            </Column>
            
            <!-- Attempts ustuni -->
            <Column field="attemptsCount" header="Attempts" sortable>
              <template #body="item">
                <Tag icon="pi pi-check" :value="item.data.solved+'/'+item.data.attemptsCount" severity="info" style="min-width: 5rem;"/>
              </template>
            </Column>
            
        </DataTable>
    </template>
    <template #footer>
        <div class="card">
        <Paginator :rows="count" v-model:rows="rows" v-model:first="first"  :totalRecords="total" :rowsPerPageOptions="[10, 20, 30]" @click="getProblems()"></Paginator>
    </div>
    </template>
    
    </Card>
</template>
<script>
import axios from 'axios';
import { FilterMatchMode } from 'primevue/api';
export default {
    name: 'dataTable',
    data() {
    return {
        count: 10,
        page: 1,
        pageSize: 10,
        pagesCount: null,
        total: 200,
        first: 0,
        rows: 10,
        problems: [],
        key: 1,
        loading: true,
        severity: ['Beginner', 'Basic', 'Normal', 'Medium', 'Advanced', 'Hard', 'Extremal'],
        filters: {
        title: {value: null, matchMode: FilterMatchMode.CONTAINS},
        tags: {value: null, matchMode: FilterMatchMode.EQUALS},
        difficultyTitle: {value: null, matchMode: FilterMatchMode.EQUALS },
      },
    }
  },
  methods: {
    async getProblems() {
        this.page=this.first/this.rows+1;
        
        const url="https://kep.uz/api/problems";
        try {
          this.loading=true;
        const {data} = await axios.get(url, { params: {
          page_size: this.rows,
          page: this.page
        } });
        this.page=data.page;
        this.count=this.rows;
        this.total=data.total;
        this.pageSize=data.pageSize;
        this.pagesCount=data.pagesCount;
        this.problems=data.data;
        } catch (error) {
          console.log(error);
        } finally {
          this.loading=false;
        }
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
    
  },
  mounted() {
    this.getProblems();
  }
}
</script>
<style lang="">
    
</style>