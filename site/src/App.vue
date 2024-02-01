<template>
  <header>
    <HeaderVue/>
  </header>
  <main>
    <TableVue/>
  </main>

  <!-- Footer qismmi -->
  <footer>
    <h5>Created By: JASURBEK TAJIBAYEV</h5>
  </footer>
</template>

<script>
import HeaderVue from './components/Header.vue';
import TableVue from './components/TableVue.vue';
export default {
  components: {HeaderVue, TableVue},
}

</script>

<style>
a {
  color: --primary-color;
  text-decoration-line: none;
  display: block;
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
