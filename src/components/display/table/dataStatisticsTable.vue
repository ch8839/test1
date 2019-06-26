<template>
  <div class="dataStatistics-container">
    <ul class="type-list">
      <li v-for="(item, index) in type_list" :key="index" @click="type_tab(index)" :class="{'selected':selected_type == index}">
        {{item}}
      </li>
    </ul>
    
    <div class="wrap-list">
      <div v-for="(item, index) in statisticsData" :key="index" class="wrap-cell">
        <span :class="item.level == 2 ? 'red':'blue'">{{ index +1 }}</span>
        <span>{{ item.project_name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'DataStatistics',
  data(){
    return {
      selected_type:0,
      type_list: ['消防报警系统', '楼宇水系统', '防排烟系统', '电气火灾系统', '电梯监控系统'],

    }
  },

  mounted(){},

  methods:{
    type_tab(index){
      this.selected_type = index
      console.log('')
    }
  },

  computed:{
    statisticsData(){
      return [
        {
          level:2,
          project_name:'上海大学'
        },
        {
          level:1,
          project_name:'上海大学'
        },
        {
          level:2,
          project_name:'上海大学'
        },
        {
          level:2,
          project_name:'上海大学'
        },{
          level:2,
          project_name:'上海大学'
        },
        {
          level:1,
          project_name:'上海大学'
        },
        {
          level:2,
          project_name:'上海大学'
        },
        {
          level:1,
          project_name:'上海大学'
        }
      ]
    }
  }

}
</script>

<style lang="scss" scoped>
  .dataStatistics-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    .type-list {
      display: flex;
      justify-content: flex-end;
      height: 10%;
      li {
        text-align: center;
        list-style: none;
        border-radius: 5px;
        width: 75px;
        padding:5px 0px;
        background: #17b3eb;
        font-size: 10px;
        margin-right: 5px;
        cursor: pointer;
      }
      .selected {
        background: #115b77;
      }
    }

    .wrap-list {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      height: 125px;
      .wrap-cell {
        height: 25%;
      
        &:nth-child(even) {
          background: #131945
        }
        span {
          border-radius: 45%;
          margin-right: 10px;
          padding: 5px
        }
        .red {
          background: #ea6e6e
        }
        .blue {
          background: #1888fd
        }
      }
      
    }
   
  }
</style>


