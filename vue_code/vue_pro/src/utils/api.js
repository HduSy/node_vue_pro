import axios from 'axios'
import {Message} from "element-ui"

axios.interceptors.response.use(res => {
    if (res.data.code === 500) {
        Message.error({message: res.data.msg, duration: 1500})
        return
    } else {
        Message.success({message: res.data.msg, duration: 1500})
    }
    return res
}, err => {
    if (err.response.status === 504 || err.response.status === 404) {
        Message.error({message: '服务器崩溃'})
    } else if (err.response.status === 403) {
        Message.error({message: '权限不足,请联系管理员!'})
    } else if (err.response.status === 401) {
        Message.error({message: err.response.data.msg})
    } else {
        if (err.response.data.msg) {
            Message.error({message: err.response.data.msg})
        } else {
            Message.error({message: '未知错误!'})
        }
    }
})
const base = ''
/**
 * 封装axios get请求
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export const getRequest = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}
/**
 * 封装axios post 请求
 * @param url
 * @param params
 * @returns {*}
 */
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-type': 'application/json'
        }
    })
}
/**
 * 封装axios delete请求
 * @param url
 * @param params
 * @returns {*}
 */
export const deleteRequest = (url, params) => {
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-type': 'application/json'
        }
    })
}
/**
 * 封装axios put请求
 * @param url
 * @param params
 * @returns {*}
 */
export const putRequest = (url, params) => {
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        headers: {
            'Content-type': 'application/json'
        }
    })
}
