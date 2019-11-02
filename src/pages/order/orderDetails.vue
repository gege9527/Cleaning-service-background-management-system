<template>
    <div class="order_details">
        <el-button type="text" size="mini" @click="backHandler">返回</el-button>
        <template>
        <el-tabs v-model="activeName" >
            <el-tab-pane label="基本信息" name="basic">
                 <div class="baseMessage">
                    <el-row>
                        <el-col :span="6">ID：</el-col>
                        <el-col :span="10">{{order_details.id}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">订单时间：</el-col>
                        <el-col :span="10">{{order_details.orderTime}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">总价：</el-col>
                        <el-col :span="10">{{order_details.total}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">状态：</el-col>
                        <el-col :span="10">{{order_details.status}}</el-col>
                    </el-row>
                   
                    </div>
            </el-tab-pane>
            <el-tab-pane label="顾客信息" name="customerMessage">
                   
                    <div class="baseMessage">
                    <el-row>
                        <el-col :span="6">ID：</el-col>
                        <el-col :span="10">{{customerMessage.id}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">姓名：</el-col>
                        <el-col :span="10">{{customerMessage.realname}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">手机号：</el-col>
                        <el-col :span="10">{{customerMessage.telephone}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">状态：</el-col>
                        <el-col :span="10">{{customerMessage.status}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">照片：</el-col>
                        <el-col :span="10">
                            <template #default="record">
                                <img :src="scope.row.photo">
                            </template>
                        </el-col>
                    </el-row>
                   
                    </div>
                   
                   
            </el-tab-pane>
            <el-tab-pane label="服务员信息" name="waiterMessage">
                <div class="baseMessage">
                    <el-row>
                        <el-col :span="6">ID：</el-col>
                        <el-col :span="10">{{waiterMessage.id}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">姓名：</el-col>
                        <el-col :span="10">{{waiterMessage.realname}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">手机号：</el-col>
                        <el-col :span="10">{{waiterMessage.telephone}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">状态：</el-col>
                        <el-col :span="10">{{waiterMessage.status}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4">照片：</el-col>
                        <el-col :span="10">
                            <template #default="record">
                                <img :src="scope.row.photo">
                            </template>
                        </el-col>
                    </el-row>
                   
                </div>
            </el-tab-pane>
             <el-tab-pane label="地址信息" name="addressMessage">
                <div class="baseMessage">
                    <el-row>
                        <el-col :span="6">ID：</el-col>
                        <el-col :span="10">{{addressMessage.id}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">省份：</el-col>
                        <el-col :span="10">{{addressMessage.province}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">城市：</el-col>
                        <el-col :span="10">{{addressMessage.city}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">区域：</el-col>
                        <el-col :span="10">{{addressMessage.area}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">详细地址：</el-col>
                        <el-col :span="10">{{addressMessage.address}}</el-col>
                    </el-row>
                   
                </div>
            </el-tab-pane>
            <el-tab-pane label="评论信息" name="commentMessage">
                <div class="baseMessage">
                    <el-row>
                        <el-col :span="6">评论内容：</el-col>
                        <el-col :span="10">{{comment.id}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">评论时间：</el-col>
                        <el-col :span="10">{{comment.commentTime}}</el-col>
                    </el-row>
                   
                </div>
            </el-tab-pane>
            
        </el-tabs>
        </template>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    data(){
        return {
            activeName:'basic',
            order_details:{},
            customerMessage:'',
            waiterMessage:'',
            addressMessage:'',
            comment:[]
        }
    },
    created(){
        this.order_details=this.$route.query.order;
        this.findcustomerMessage();
        this.findAllComment()
        
    },
    computed:{
        ...mapState('order',['orderMessage']),
        ...mapState('comment',['comments']),
        ...mapGetters('comment',['findAllCommentByOrderId'])
    },
    methods:{
        ...mapActions('order',['findMessageByCustomerId']),
        ...mapActions('comment',['findAllComment']),
        backHandler(){
            this.$router.go(-1)
        },
        findcustomerMessage(){
            this.findMessageByCustomerId(this.order_details.customerId)
           let result= this.orderMessage.filter((item)=>{
                return item.status===this.order_details.status && item.id===this.order_details.id
            })
            this.customerMessage=result[0].customer
            this.waiterMessage=result[0].waiter
            this.addressMessage=result[0].address
            
        },
        findCommentMessage(){
            this.comment=findAllCommentByOrderId(this.order_details.id)
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