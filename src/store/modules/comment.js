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
        comments:[]
    },
    getters:{
        findAllCommentByOrderId(state){
            return(id)=>{
                return state.comments.filter((item)=>{
                    return item.orderId === id;
                })
            }
        }
    },
    mutations:{
        refreshComment(state,comments){
            state.comments=comments
        }
    },
    actions:{
       async findAllComment(context){
            let response = await get ('/commtent/findAll')
            context.commit('refreshComment',response.data)
        }
    }
}