import moment from "moment";
import { FC, useEffect } from "react"
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { MdModeEdit } from 'react-icons/md'
import { getSingleTask } from "../api";
import { useDispatch } from "react-redux";
import { setCard, setUpdateTask } from "../store/user";

const Task: FC = (data) => {
  // console.log(data);
  

  const { userList, user } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()
  // console.log(userList, 'selected');
// @ts-ignore
  const userIndex = (id) => userList.find(item => item.id === id) 
  
  const updateTask = () => {
   if(user){
// @ts-ignore
    getSingleTask(user?.company_id, user?.token, data.id)
    .then(res => {
      dispatch(setUpdateTask(res.data.results))
      dispatch(setCard())
    })
   }
  }
  
  return (
    <div className="flex p-3 ">
      <div className=" flex items-center flex-1 gap-2">
        {/* @ts-ignore */}
        <img  src={userIndex(data.assigned_user).icon} className="h-[35px] w-[35px]"/>
        {/* @ts-ignore */}
        <div className="text-[18px]">{data.task_msg}
        {/* @ts-ignore */}
        <div className="text-[16px] text-red-400">{ moment(data.created).format('DD/MM/YYYY') }</div>
        </div>
      </div>
      <div>
        <span onClick={updateTask} className="w-[40px] h-[40px] border flex items-center justify-center"> 
          <MdModeEdit size={20} />
        </span>
      </div>
    </div>
  )
}

export default Task