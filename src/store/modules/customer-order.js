import request from '@/utils/request'
import {post} from '@/utils/request'
export default {
  namespaced:true,
  state:{
    orders:[]
  },
  mutations:{
    refreshOrders(state,orders){
      state.orders = orders;
    }
  },
  actions:{
    async findOrdersById(context,id){
      let response = await request.get("/order/query?customerId="+id);
      
      context.commit("refreshOrders",response.data)
    }
  }
}