<template>
  <div class="customerDetails">
    <h2>顾客详情</h2>
    <el-button size="small" type="text" @click="backHandler">返回</el-button>
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="info">
          <div class="baseMessage">
           <el-row>
             <el-col :span="4">ID号：</el-col>
             <el-col :span="10">{{customerMessage.id}}</el-col>
           </el-row>
           <el-row>
             <el-col :span="4">姓名：</el-col>
             <el-col :span="10">{{customerMessage.realname}}</el-col>
           </el-row>
           <el-row>
             <el-col :span="4">电话：</el-col>
             <el-col :span="10">{{customerMessage.telephone}}</el-col>
           </el-row>
           <el-row>
             <el-col :span="4">状态：</el-col>
             <el-col :span="10">{{customerMessage.status}}</el-col>
           </el-row>
           <el-row>
             <el-col :span="4">照片：</el-col>
             <el-col :span="10">
                 <template #default="record">
                     <img :src="scope.row.photo"  width="50px" >
                 </template>
             </el-col>
           </el-row>
         </div>
      </el-tab-pane>
      <el-tab-pane label="订单信息" name="orders">
        <el-table :data="orders">
          <el-table-column label="订单ID" prop="id"></el-table-column>
          <el-table-column label="订单时间" prop="orderTime"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="员工号" prop="waiterId"></el-table-column>
          <el-table-column label="地址号" prop="addressId"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="服务地址" name="address">
        <el-table :data="address">
          <el-table-column label="省" prop="province"></el-table-column>
          <el-table-column label="市" prop="city"></el-table-column>
          <el-table-column label="区" prop="area"></el-table-column>
          <el-table-column label="街道" prop="address"></el-table-column>
          <el-table-column label="手机号" prop="telephone"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default {
  data(){
    return {
      activeName:"info",
      customerMessage:this.$route.query.customer,
    }
  },
  created(){
    let id = this.$route.query.customer.id;
    // 通过id查询顾客，订单，地址
    this.findAddressByCustomerId(id);
    
    this.findOrdersDetail();
  },
  computed:{
    ...mapState("address",["address"]),
    ...mapState("customer-order",["orders"]),
    
  },
  methods:{
    ...mapActions("address",["findAddressByCustomerId"]),
    ...mapActions("customer-order",["findOrdersById"]),
    backHandler(){
      // this.$router.push("/customer")
      this.$router.go(-1)
    },
    findOrdersDetail(){
      this.findOrdersById(this.customerMessage.id)
    }
  }

}
</script>
<style scoped>
.baseMessage{
    padding: 20px;
    width: 400px;
    height: 400px;
  }
  .baseMessage>.el-row{
    height: 40px;
    color: #606266;
  }

</style>