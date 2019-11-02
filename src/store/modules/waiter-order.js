import request from '@/utils/request'
import moment from 'moment'

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
      let response = await request.get("/order/query?waiterId="+id);
      response.data.forEach((item)=>{
        item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
      })
      context.commit("refreshOrders",response.data)
    }
  }
}