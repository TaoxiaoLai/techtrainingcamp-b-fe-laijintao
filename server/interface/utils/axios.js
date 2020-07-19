import axios from 'axios'

const instance = axios.create({
  baseURL:`http://${process.env.HOST||'localhost'}:${process.env.PORT||3000}`,
  timeout:2000,
  headers:{
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
})

export default instance
