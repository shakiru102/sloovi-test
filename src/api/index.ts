import axios, { AxiosResponse } from "axios"
import { BASE_URL } from "../constants"
import { LoginResponse } from '../types/index'
import moment from 'moment'

export const initiateLogin = async (): Promise<AxiosResponse<LoginResponse>> => {
     const response = await axios.post(`${BASE_URL}/login`, {
        email : "smithwills1989@gmail.com",
        password : "12345678"
     })
     return response
} 

export const getUserList = async (company_id: string, token: string): Promise<AxiosResponse> => {
   const response = await axios.get(`${BASE_URL}/team?product=outreach&company_id=${company_id}`, {
      headers: {
         'Authorization': 'Bearer ' + token 
      }
   })
   return response
}

export const createTask = async (
   company_id: string,
   userId: string,
   task_date: string,
   task_time: string,
   task_description: string,
   access_token: string
   ): Promise<AxiosResponse> => {

     const time = moment.duration(task_time)
      const date = new Date()

   const response = await axios.post(`${BASE_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`, {
      assigned_user:  userId, 
      task_date: moment(task_date).format('YYYY-MM-DD'),
      // @ts-ignore
      task_time: time._milliseconds ,
      is_completed: 0,
		time_zone: date.getTimezoneOffset(),
      task_msg: task_description
   }, {
      headers: {
         'Authorization': 'Bearer ' + access_token 
      }
   })
   return response
} 

export const getAllTask = async (company_id: string, token: string): Promise<AxiosResponse> => {
   const response = await axios.get(`${BASE_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`, {
      headers: {
         'Authorization': 'Bearer ' + token 
      }
   })
   return response
}

export const getSingleTask = async (company_id: string, token: string, task_id: string): Promise<AxiosResponse> => {
   const response = await axios.get(`${BASE_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`, {
      headers: {
         'Authorization': 'Bearer ' + token 
      }
   })
   return response
}

export const deleteTask = async (company_id: string, token: string, task_id: string): Promise<AxiosResponse> => {
   const response = await axios.delete(`${BASE_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`, {
      headers: {
         'Authorization': 'Bearer ' + token 
      }
   })
   return response
}

export const updateSingleTask = async ( company_id: string,
   userId: string,
   task_date: string,
   task_time: string,
   task_description: string,
   access_token: string,
   task_id: string
   ): Promise<AxiosResponse> => {

      const time = moment.duration(task_time)
      const date = new Date()

      const response = await axios.put(`${BASE_URL}/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${task_id}?company_id=${company_id}`, {
      assigned_user:  userId, 
      task_date: moment(task_date).format('YYYY-MM-DD'),
      // @ts-ignore
      task_time: time._milliseconds ,
      is_completed: 0,
		time_zone: date.getTimezoneOffset(),
      task_msg: task_description
   }, {
      headers: {
         'Authorization': 'Bearer ' + access_token 
      }
   })
   return response
}