import {post,post_array,get} from '@/utils/request'
import request from '@/utils/request'
import moment from 'moment'
import { stat } from 'fs'
import { param } from '@/utils'
import axios from 'axios'
import qs from 'qs'

export default {
    namespaced:true,
    state:{
        orders:[],
        orderMessage:[],
        visible:false,
        // title:"派单",
        loading:false,

    },
    getters:{
          filterOrdersByStatus(state){
            return(status)=>{
              return state.orders.filter((item)=>{
                return item.status === status;
              })
            }
          }
    },
    mutations:{
        refreshorderMessage(state,orderMessage){
          state.orderMessage=orderMessage
        },
        refreshOrders(state,orders){
            state.orders=orders
           
        },
        beginLoading(state){
            state.loading= true;
        },
        endLoading(state){
            state.loading = false;
        },
        showModal(state){
            state.visible = true;
        },
        closeModal(state){
            state.visible = false;
        },

        
    },
    actions:{
        async findAllOrders(context){
            context.commit("beginLoading")
           let response = await get("/order/findAll") ;
           response.data.forEach((item)=>{
             item.orderTime = moment(item.orderTime).format('YYYY-MM-DD HH:mm:ss')
           })
           context.commit("refreshOrders",response.data);

            setTimeout(()=>{
                context.commit("endLoading")
            },1000)
        },
        async Send(context,params){
            let response = await get("/order/sendOrder",params)
            context.dispatch("findAllOrders")
            context.commit("closeModal");
            return response;
        },
        async closeOrder(context,payload){
            
            let response = await get("/order/cancelSendOrder?orderId="+payload)
            context.dispatch("findAllOrders")
            return response;
        },
        async findMessageByCustomerId(context,param){
          let response = await get('/order/query?customerId='+param)
          context.commit("refreshorderMessage",response.data)
        }
       
    },


}