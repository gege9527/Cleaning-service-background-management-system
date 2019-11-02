<template>
  <div class="order" v-loading="loading">
    <el-tabs v-model="activeName" >
      
      <el-tab-pane label="所有订单" name="AllOrder">
      
        <el-table :data="orders" size="mini">
          <el-table-column label="订单编号" prop="id"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime"></el-table-column>
          <el-table-column label="总价" prop="total"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="顾客id" prop="customerId"></el-table-column>
          <el-table-column label="操作" >
            <template #default="record">
              <a href="" @click.prevent="toDetailHandler(record.row)" style="color:blue">详情</a>
            </template>
          </el-table-column>
        </el-table>
     
      </el-tab-pane>
      <el-tab-pane label="待支付" name="待支付">
        <el-table :order="filterOrdersByStatus(activeName)" size="mini">
          <el-table-column label="订单编号" prop="id"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime"></el-table-column>
          <el-table-column label="总价" prop="total"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="顾客id" prop="customerId"></el-table-column>
        </el-table>
      </el-tab-pane >
      <el-tab-pane label="待派单" name="待派单">
        <el-table :data="filterOrdersByStatus(activeName)" size="mini">
          <el-table-column label="订单编号" prop="id"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime"></el-table-column>
          <el-table-column label="总价" prop="total"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="顾客id" prop="customerId"></el-table-column>
          <el-table-column label="操作" >
            <template #default="record">
              <a href="" @click.prevent="toSendOrder(record.row.id)" style="color:blue">派单</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待接单" name="待接单">
        <el-table :data="filterOrdersByStatus(activeName)" size="mini">
          <el-table-column label="订单编号" prop="id"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime"></el-table-column>
          <el-table-column label="总价" prop="total"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="顾客id" prop="customerId"></el-table-column>
          <el-table-column label="操作" >
            <template #default="record">
              <a href="" @click.prevent="" style="color:blue" @click="close(record.row.id)">取消</a>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待服务" name="待服务">
        <el-table  :data="filterOrdersByStatus(activeName)" size="mini">
          <el-table-column label="订单编号" prop="id"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime"></el-table-column>
          <el-table-column label="总价" prop="total"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="顾客id" prop="customerId"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待确认" name="待确认">
        <el-table :data="filterOrdersByStatus(activeName)" size="mini">
          <el-table-column label="订单编号" prop="id"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime"></el-table-column>
          <el-table-column label="总价" prop="total"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="顾客id" prop="customerId"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="已完成">
        <el-table  :data="filterOrdersByStatus(activeName)" size="mini">
          <el-table-column label="订单编号" prop="id"></el-table-column>
          <el-table-column label="下单时间" prop="orderTime"></el-table-column>
          <el-table-column label="总价" prop="total"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="顾客id" prop="customerId"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    
    <!-- 派单模态框 -->
    <el-dialog title="派单" :visible.sync="visible" @close="dialogCloseHandler">
      <el-form :model="order" ref="orderForm">
        <el-form-item label="员工" prop="waiterId">
         
          <el-select v-model="order.waiterId"> 
            <el-option v-for="a in waiters" :key="a.id" :value="a.id" :label="a.realname"></el-option>
          </el-select>
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeModal">取 消</el-button>
        <el-button size="small" type="primary" @click="SendOrder">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /模态框 --> 
    
   </div>
 </template>
<script>
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return{
      activeName:"AllOrder",
      ids:[],
      order:{
        orderId:{}
      },
      

      
    }
  },
  created(){
    this.findAllOrders();
    this.findAllWaiters();
  },
  computed:{
    ...mapState('waiter',['waiters']),
    ...mapState("order",["orders","orderSend","orderReceive","orderService","orderSure","orderComplate","orderPay","visible","title","loading"]),
    ...mapGetters("order",["filterOrdersByStatus"])

  },
  methods:{
    ...mapMutations("order",["showModal","closeModal","setTitle"]),
    ...mapActions("order",["findAllOrders","Send","closeOrder"]),
    ...mapActions("waiter",["findAllWaiters"]),

    //普通方法
    toSendOrder(id){
      this.showModal();
      this.order.orderId=id
    },
    SendOrder(){
      this.Send(this.order).then((response)=>{
        this.$message({
          type:"success",
          message:response.statusText
        })
        
      })
    },
    dialogCloseHandler(){
      this.$refs.orderForm.resetFields();
      this.closeModal()
    },
    close(orderId){
      
      this.closeOrder(orderId).then((response)=>{
        this.$message({
          type:"success",
          message:response.statusText
        })
      })
    },
    toDetailHandler(order){
      this.$router.push({
        path:"./orderDetails",
        query:{order}
      })
    },
    
  }
  
}
</script>
<style scoped>

</style>