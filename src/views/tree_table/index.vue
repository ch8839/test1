<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入" v-model="listQuery.DSNUM" class="filter-input"/>
      <el-select v-model="listQuery.place" placeholder="请选择区域" clearable class="filter-item">
        <el-option v-for="(item,index) in placeOptions" :key="index" :label="item" :value="index"/>
      </el-select>
      <el-select
        v-model="listQuery.equipmentType"
        placeholder="请选择设备类型"
        clearable
        class="filter-item"
      >
        <el-option
          v-for="(item,index) in equipmentOptions"
          :key="index"
          :label="item"
          :value="index"
        />
      </el-select>
      <el-select v-model="listQuery.status" placeholder="请选择状态" clearable class="filter-item">
        <el-option v-for="(item,index) in statusOptions" :key="index" :label="item" :value="index"/>
      </el-select>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="handleCreate">添加</el-button>
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >导出</el-button>
    </div>

    <el-table v-loading="listLoading" :data="tableData" border stripe style="width: 100%">
      <el-table-column label="DSNUM" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.DSNUM }}</span>
        </template>
      </el-table-column>
      <el-table-column label="日期" width="180" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ placeOptions[scope.row.place] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详细位置" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备类型" width="180" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ equipmentOptions[scope.row.equipmentType] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="180" align="center">
        <template slot-scope="scope">
          <div slot="reference" class="name-wrapper">
            <span
              class="tap"
              :style="active_background[scope.row.status]"
            >{{ statusOptions[scope.row.status] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
      <el-form :model="content">
        <el-form-item label="时间：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="content.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="区域：" :label-width="formLabelWidth">
          <el-select
            class="filter-item"
            placeholder="Please select"
            :value="placeOptions[content.place]"
            @change="change1"
          >
            <el-option
              v-for="(item,index) in placeOptions"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细位置：" :label-width="formLabelWidth">
          <el-input v-model="content.address"/>
        </el-form-item>
        <el-form-item label="设备类型：" :label-width="formLabelWidth">
          <el-select
            class="filter-item"
            placeholder="Please select"
            :value="equipmentOptions[content.equipmentType]"
            @change="change2"
          >
            <el-option
              v-for="(item,index) in equipmentOptions"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-select
            class="filter-item"
            placeholder="Please select"
            :value="statusOptions[content.status]"
            @change="change3"
          >
            <el-option
              v-for="(item,index) in statusOptions"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleUpdata">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加设备" :visible.sync="dialogFormVisible2">
      <el-form :model="content2">
        <el-form-item label="DSNUM：" :label-width="formLabelWidth">
          <el-input v-model="content2.DSNUM"/>
        </el-form-item>
        <el-form-item label="时间：" :label-width="formLabelWidth">
          <el-date-picker
            v-model="content2.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="Please pick a date"
          />
        </el-form-item>
        <el-form-item label="区域：" :label-width="formLabelWidth">
          <el-select v-model="content2.place" class="filter-item" placeholder="Please select">
            <el-option
              v-for="(item,index) in placeOptions"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细位置：" :label-width="formLabelWidth">
          <el-input v-model="content2.address"/>
        </el-form-item>
        <el-form-item label="设备类型：" :label-width="formLabelWidth">
          <el-select
            v-model="content2.equipmentType"
            class="filter-item"
            placeholder="Please select"
          >
            <el-option
              v-for="(item,index) in equipmentOptions"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态：" :label-width="formLabelWidth">
          <el-select v-model="content2.status" class="filter-item" placeholder="Please select">
            <el-option
              v-for="(item,index) in statusOptions"
              :key="index"
              :label="item"
              :value="index"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="CreateData">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getTableData,
  updateTable,
  deleteData,
  addTableData
} from "@/api/test/table";
export default {
  data() {
    return {
      listLoading: false,
      listQuery: { DSNUM: "", place: "", equipmentType: "", status: "" },
      placeOptions: [
        "上海大学宝山校区",
        "上海大学延长校区",
        "上海大学嘉定校区"
      ],
      equipmentOptions: ["P表", "G表", "Z表"],
      statusOptions: ["正常", "故障", "离线"],
      color: ["#eeeeee", "#c51111", "#f09115"],
      active_background: [
        { background: "#46c37b" },
        { background: "#d26a5c" },
        { background: "#f3b760" }
      ],
      tableData: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: "90px",
      content: {
        DSNUM: "",
        date: "",
        equipmentType: "",
        status: "",
        address: ""
      },
      content2: {}
    };
  },
  methods: {
    change1(e) {
      this.content.place = e;
    },
    change2(e) {
      this.content.equipmentType = e;
    },
    change3(e) {
      this.content.status = e;
    },

    handleFilter() {
      console.log(this.listQuery);
      this.getList(this.listQuery);
      // this.listQuery= {DSNUM:'', place:'' , equipmentType:'' , status:''}
    },

    handleCreate() {
      this.content2 = {};
      this.dialogFormVisible2 = true;
    },

    async CreateData() {
      console.log(this.content2);
      await addTableData(this.content2);
      this.getList();
      this.dialogFormVisible2 = false;
      this.$message({
        type: "success",
        message: "添加成功！"
      });
    },

    async handleDownload() {},

    handleEdit(index, row) {
      console.log(index, row);
      this.content = Object.assign({}, row);
      this.dialogFormVisible = true;
    },
    async handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteData(row.id)
            .then(() => {
              this.getList();
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            })
            .catch(err => {
              throw err;
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    async handleUpdata() {
      console.log(this.content);
      const res = await updateTable(this.content);
      this.getList();
      this.dialogFormVisible = false;
    },

    async getList() {
      this.listLoading = true;
      console.log(this.listQuery); //筛选条件
      const res = await getTableData(this.listQuery);
      console.log(res);
      const tableData = res.data.res;

      //筛选
      let filterList = tableData.filter(item => {
        if (
          this.listQuery.place !== "" &&
          item.place !== this.listQuery.place
        ) {
          return false;
        }
        if (
          this.listQuery.equipmentType !== "" &&
          item.equipmentType !== this.listQuery.equipmentType
        ) {
          return false;
        }
        if (
          this.listQuery.status !== "" &&
          item.status !== this.listQuery.status
        ) {
          return false;
        }
        if (
          this.listQuery.DSNUM !== "" &&
          item.DSNUM !== this.listQuery.DSNUM
        ) {
          return false;
        }
        return true;
      });
      this.tableData = filterList;
      this.listLoading = false;
    }
  },

  created() {
    this.getList();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.filter-container {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 30px;
  .filter-item {
    margin-left: 20px;
    width: 130px;
  }
  .filter-input {
    width: 200px;
    color: #f09115;
  }
}
.tap {
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25em;
  background-color: #d26a5c;
}
</style>

