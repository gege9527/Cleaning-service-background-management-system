<template>
    <div class="waiterDetails">
    <el-button size="small" type="text" @click="backHandler">返回</el-button>
        <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="info">
                 <div class="baseMessage">
                    <el-row>
                        <el-col :span="4">昵称：</el-col>
                        <el-col :span="10">{{basicMessage.username}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">姓名：</el-col>
                        <el-col :span="10">{{basicMessage.realname}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">密码：</el-col>
                        <el-col :span="10">{{basicMessage.password}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">电话：</el-col>
                        <el-col :span="10">{{basicMessage.telephone}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">qq：</el-col>
                        <el-col :span="10">{{basicMessage.qq}}</el-col>
                    </el-row>
                        <el-row>
                        <el-col :span="4">微信：</el-col>
                        <el-col :span="10">{{basicMessage.wxid}}</el-col>
                    </el-row>
                </div>

            </el-tab-pane>
            <el-tab-pane label="订单信息" name="orders">
                <el-table :data="orders" >
                    <el-table-column label="订单ID" prop="id"></el-table-column>
                    <el-table-column label="订单时间" prop="orderTime"></el-table-column>
                    <el-table-column label="状态" prop="status"></el-table-column>
                    <el-table-column label="员工号" prop="waiterId"></el-table-column>
                    <el-table-column label="地址号" prop="name" ></el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex"
export default {
    data(){
        return {
            activeName:"info",
            basicMessage:this.$route.query.waiter,
        }
    },
    created(){
        let id = this.$route.query.waiter.id;
        this.findOrderDetail();
    },
    computed:{
        ...mapState("waiter-order",["orders"]),

    },
    methods:{
        ...mapActions("waiter-order",["findOrdersById"]),

        backHandler(){
            this.$router.go(-1)
        },
        findOrderDetail(){
            this.findOrdersById(this.basicMessage.id)
        },
       
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