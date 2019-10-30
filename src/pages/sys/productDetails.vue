<template>
    <div class="product_details">
        <el-button type='text' size="small" @click="backHandler">返回</el-button>
        <div class="baseMessage">
           <el-row>
             <el-col :span="6">产品名称：</el-col>
             <el-col :span="10">{{product.name}}</el-col>
           </el-row>
           <el-row>
             <el-col :span="6">产品单价：</el-col>
             <el-col :span="10">{{product.price}}</el-col>
           </el-row>
           <el-row>
             <el-col :span="6">产品介绍：</el-col>
             <el-col :span="10">{{product.details}}</el-col>
           </el-row>

           <el-row>
             <el-col :span="6">产品照片：</el-col>
             <el-col :span="10">
                     <img :src="product.photo"  >
             </el-col>
           </el-row>
         </div>
    </div>
</template>
<script>
import { mapState,mapActions } from "vuex";
export default {
    data(){
        return {

        }
    },
    computed:{
        ...mapState('product',['product'])
    },
    created(){
        let id = this.$route.query.id;
        //通过id查询商品的详细信息
        this.findProductById(id);
    },
    methods:{
        ...mapActions('product',['findProductById']),
        backHandler(){
            this.$router.go(-1)
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