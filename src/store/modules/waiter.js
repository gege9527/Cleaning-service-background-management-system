import request from '@/utils/request'
import {post,post_array} from '@/utils/request'
export default {
    namespaced:true,
    state:{
        waiters:[],
        loading:false,
        // total:""
    },
    mutations:{
        refreshWaiters(state,waiters){
            state.waiters = waiters;
            // state.total = total;
        },
        beginLoading(state){
            state.loading = true;
        },
        endLoading(state){
            state.loading = false;
        },
        dateParse(state){
            state.waiters.forEach((item)=>{
                if(item.registerTime){
                    let date = new Date(item.registerTime);
                    let Y = date.getFullYear() + '-';
                    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                    let D = (date.getDate()< 10 ? '0'+date.getDate() : date.getDate())+' ';
                    let h = (date.getHours()< 10 ? '0'+date.getHours() : date.getHours())+ ':';
                    let m = (date.getMinutes()< 10 ? '0'+date.getMinutes() : date.getMinutes())+ ':';
                    let s = (date.getSeconds()< 10 ? '0'+date.getSeconds() : date.getSeconds());
                    item.registerTime = Y+M+D+h+m+s;
                  }else{
                    return '';
                  }
            })
        },
    },
    actions:{
        async findAllWaiters({commit}){
            // 1.ajax查询
            commit("beginLoading");
            let response = await request.get("/waiter/findAll");
            // 2.将查询结果更新到state中
            commit("refreshWaiters",response.data);
            commit("dateParse")
            setTimeout(()=>{
                commit("endLoading")
            },1000)
        }
    }
        
}