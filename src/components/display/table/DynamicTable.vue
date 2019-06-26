<template>
  <div class="dynamicTable-container">
    <table>
      <thead>
        <tr>
          <th>紧急事件名称</th>
          <th>项目体</th>
          <th>发生时间</th>
          <th>具体位置</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in urgent_evnets_list" :key="index">
          <td>{{item.events_name}}</td>
          <td>{{item.project_name}}</td>
          <td>{{item.time}}</td>
          <td>{{item.location}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name:'DynamicTable',
  data(){
    return {
      urgent_evnets_list:[]
    }
  },

  mounted(){
    this.urgent_evnets_list = [
      {
        events_name:'温度过高',
        project_name:'上海大学',
        time: '2019-6-26 13:54',
        location: '厕所'
      },
       {
        events_name:'温度过高',
        project_name:'上海大学',
        time: '2019-6-26 13:54',
        location: '厕所'
      },
       {
        events_name:'温度过高',
        project_name:'上海大学',
        time: '2019-6-26 13:54',
        location: '厕所'
      },
       {
        events_name:'温度过高',
        project_name:'上海大学',
        time: '2019-6-26 13:54',
        location: '厕所'
      },
      {
        events_name:'温度过高',
        project_name:'上海大学',
        time: '2019-6-26 13:54',
        location: '厕所'
      },
      {
        events_name:'温度过高',
        project_name:'上海大学',
        time: '2019-6-26 13:54',
        location: '厕所'
      },
    ]
  }

}
</script>

<style lang="scss" scoped>
  .dynamicTable-container {
    padding: 10px;
    table {
      width: 100%;
      height: 100%;
      border-collapse: collapse;
      border: none;
      font-size: 12px;
      margin-top: 8px;
      thead th{
        color: #4695b6;
        padding: 5px;
        background: #17265f;
      }

      tbody td{
        text-align: center;
        padding: 5px;
        color: #d4e4ee
      }

      tbody tr:nth-child(even){
        background: #17265f
      }
    }
  }
</style>


