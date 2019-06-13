<template>
  <div>
    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">

    <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary" @click="handleUpload">选择文件
    </el-button>

    <span>{{ fileName }}</span>
    <div class="upload">
      <span>选择上传的数据表：</span>
      <el-radio-group v-model="radio">
        <el-radio :label="1">实验室土壤数据</el-radio>
        <el-radio :label="2">实验室水数据</el-radio>
      </el-radio-group>

      <el-button style="margin-left:16px;" size="mini" type="primary" @click="uploadTo">上传</el-button>
    </div>
  </div>
</template>

<script>
  import XLSX from "xlsx";
  import {
    uploadExcel
  } from '@/api/table/excel.js'
  export default {
    props: {
      onSuccess: Function // eslint-disable-line
    },
    data() {
      return {
        loading: false,
        fileName: '',
        radio: 1,
        excelData: {
          header: null,
          results: null
        }
      };
    },
    methods: {
      generateData({
        header,
        results
      }) {
        this.excelData.header = header;
        this.excelData.results = results;
        this.onSuccess && this.onSuccess(this.excelData);
      },

      handleUpload() {
        this.$refs["excel-upload-input"].click()
      },
      handleClick(e) {
        const files = e.target.files
        const rawFile = files[0] // only use files[0]
        this.fileName = rawFile.name
        console.log('rawFile', rawFile)
        if (!rawFile) return
        this.upload(rawFile)
      },
      upload(rawFile) {
        this.$refs["excel-upload-input"].value = null; // fix can't select the same excel

        if (!this.beforeUpload) {
          this.readerData(rawFile);
          return;
        }
        const before = this.beforeUpload(rawFile);
        if (before) {
          this.readerData(rawFile);
        }
      },
      readerData(rawFile) {
        this.loading = true;
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = e => {
            const data = e.target.result;
            const workbook = XLSX.read(data, {
              type: "array"
            });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const header = this.getHeaderRow(worksheet);
            const results = XLSX.utils.sheet_to_json(worksheet);
            this.generateData({
              header,
              results
            });
            this.loading = false;
            resolve();
          };
          reader.readAsArrayBuffer(rawFile);
        });
      },

      getHeaderRow(sheet) {
        const headers = [];
        const range = XLSX.utils.decode_range(sheet["!ref"]);
        let C;
        const R = range.s.r;
        /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) {
          /* walk every column in the range */
          const cell = sheet[XLSX.utils.encode_cell({
            c: C,
            r: R
          })];
          /* find the cell in the first row */
          let hdr = "UNKNOWN " + C; // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
          headers.push(hdr);
        }
        return headers;
      },
      isExcel(file) {
        return /\.(xlsx|xls|csv)$/.test(file.name);
      },

      async uploadTo() {
        console.log("upload")
        if (!this.excelData.results) {
          this.$message({
            message: '请先导入表格',
            type: 'warning'
          });
          return false
        }
        let res = await uploadExcel(this.excelData.results, this.radio)
        console.log(res)
        this.$message({
          message: res.data.msg,
          type: 'success'
        });
      }
    }
  };

</script>

<style scoped>
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .drop {
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 160px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }

  .upload {
    float: right;
    margin-right: 50px
  }

</style>
