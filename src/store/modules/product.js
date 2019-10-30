import {post, post_array} from '@/utils/request'
import requset from '@/utils/request'

export default {
  namespaced:true,
  state:{
    products:[],
    visible:false,
    title:"添加产品信息",
    product:{}  //当前产品信息
  },
 
  mutations:{
    showModal(state){
      state.visible = true;
    },
    closeModal(state){
      state.visible = false;
    },
    refreshProducts(state,products){
      state.products = products;
    },
    refreshProduct(state,product){
      state.product = product;
    },
    setTitle(state,title){
      state.title = title;
    }
  },
  actions:{
    async findProductById(context,id){
      const response = await requset.get('/product/findById?id='+id)
      context.commit('refreshProduct',response.data)
    },
    async batchDeleteProduct(context,ids){
      // 1. 批量删除
      let response = await post_array("/product/batchDelete",{ids})
      // 2. 分发
      context.dispatch("findAllProducts");
      // 3. 返回结果
      return response;
    },
    async deleteProductById(context,id){
      let response = await requset.get("/product/deleteById?id="+id);
      context.dispatch("findAllProducts");
      return response;
    },
    async findAllProducts(context){
      // 1. ajax查询
      let response = await requset.get("/product/findAll");
      // 2. 将查询结果更新到state中
      context.commit("refreshProducts",response.data);
    },
    // payload 顾客信息
    async saveOrUpdateProduct({commit,dispatch},payload){
      // 1. 保存或更新
      let response = await post("/product/saveOrUpdate",payload)
      // 2. 刷新页面
      dispatch("findAllProducts");
      // 3. 关闭模态框
      commit("closeModal");
      // 4. 提示
      return response;
    },
    async deletePhoto(context,id){
      // let response = await requset.get('/file/deleteById',id);
      
    }
  }
}