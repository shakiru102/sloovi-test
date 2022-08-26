import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ResultsData } from "../../types";

interface initalStateProps {
    user: null | ResultsData;
    userList: any;
    task_description: string;
    task_date: string;
    task_time: string;
    task_id: string;
    allTask: any;
    deleting: boolean;
    assigned_user: string;
    cardShown: boolean
}

const initialState: initalStateProps = {
    user: null,
    userList: null,
    task_date: '',
    task_description: '',
    task_time: '',
    allTask: [],
    task_id: '',
    deleting: false,
    assigned_user: '',
    cardShown: false
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers : {
      setUser: (state: initalStateProps, actions: PayloadAction<ResultsData> ) => {
        state.user = actions.payload
      },
      setDescription: (state: initalStateProps, actions: PayloadAction<string>) => {
        state.task_description = actions.payload
      },
      setDate: (state: initalStateProps, actions: PayloadAction<string>) => {
        state.task_date = actions.payload
      },
      setTime: (state: initalStateProps, actions: PayloadAction<string>) => {
        state.task_time = actions.payload
      },
      setAssignedUser: (state: initalStateProps, actions: PayloadAction<string>) => {
        state.assigned_user = actions.payload
      },
      setUserList: (state: initalStateProps, actions: PayloadAction<any>) => {
        state.userList = actions.payload
      },
      setAllTask: (state: initalStateProps, actions: PayloadAction<any>) => {
        state.allTask = actions.payload
      },
      setUpdateTask: (state: initalStateProps, actions: PayloadAction<any>) => {
        state.deleting = true
        state.task_date = actions.payload.task_date
        state.task_time = actions.payload.task_date_time_offset
        state.task_description = actions.payload.task_msg
        state.task_id = actions.payload.id
        state.assigned_user = actions.payload.assigned_user
      },
      setDelete: (state: initalStateProps) => {
        state.deleting = false
        state.assigned_user = ''
        state.task_date = ''
        state.task_description = ''
        state.task_time = ''
        state.task_id = ''
      },
      setCard: (state: initalStateProps) => {
        state.cardShown = !state.cardShown
      }
    }
})

export const { setCard, setUser, setDate, setDescription, setTime, setUserList, setAllTask, setUpdateTask, setAssignedUser, setDelete } = user.actions

export default user.reducer