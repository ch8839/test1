<template>
  <div class="excel-container">
    <upload-excel-component :on-success="handleSuccess"></upload-excel-component>
    <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top:20px;">
      <el-table-column v-for="item of tableHeader" :key="item" :prop="item" :label="item" />
    </el-table>
  </div>
</template>

<script>
  import UploadExcelComponent from '../../components/excel/index'

  export default {
    name: 'UploadExcel',
    components: {
      UploadExcelComponent
    },
    data() {
      return {
        tableData: [],
        tableHeader: []
      }
    },
    methods: {
      handleSuccess({
        results,
        header
      }) {
        this.tableData = results
        this.tableHeader = header
        console.log('results', results)
        console.log('header', header)
      }
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .excel-container {
    padding: 50px;
  }

</style>
