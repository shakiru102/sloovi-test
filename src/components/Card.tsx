import { Button, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import { RiContactsBook2Line } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { createTask, deleteTask, getAllTask, updateSingleTask } from '../api'
import { RootState } from '../store'
import { setAllTask, setAssignedUser, setCard, setDate, setDelete, setDescription, setTime } from '../store/user'
import { RiDeleteBin6Line } from 'react-icons/ri'

const Card = () => {

    const { task_date, task_description, task_time, user, userList, deleting, assigned_user, task_id } = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch()

    const initiateTask = () => {
        if(user) {
            createTask(user?.company_id, assigned_user, task_date, task_time, task_description, user?.token)
            .then(() => {
                getAllTask(user.company_id, user.token)
                .then(res => {
                  dispatch(setAllTask(res.data.results))
                  dispatch(setCard())
                  
                })
            })
        .catch(err => console.log(err))
        }
    }

    const initiateUpdate = () => {
      if(user) {
        updateSingleTask(user?.company_id, assigned_user, task_date, task_time, task_description, user?.token, task_id)
      .then(() => {
        getAllTask(user.company_id, user.token)
        .then(res => {
          dispatch(setAllTask(res.data.results))
          dispatch(setCard())
        })
    })
    .catch(err => console.log(err))
      }
    }
    const initiateDeleteTask = () => {
      if(user){
   // @ts-ignore
       deleteTask(user?.company_id, user?.token, task_id)
       .then(() => {
        dispatch(setDelete())
          getAllTask(user.company_id, user.token)
        .then(res => {
          dispatch(setAllTask(res.data.results))
          dispatch(setDelete())
          dispatch(setCard())
        })
       })
      }
     }

  return (
    <div className='px-2 pt-8 pb-20 bg-[#F9FEFF]'>
                <InputLabel>Task Description</InputLabel>
                  <OutlinedInput
                  type='text'
                  fullWidth
                  style={{ height: '30px', background: 'white' }}
                  endAdornment={
                    <RiContactsBook2Line size={18}  />
                  }
                  value={task_description}
                  onChange={e => dispatch(setDescription(e.target.value))}
                  />
                  <div className='flex gap-4 my-3'>
                     <div className='flex-1'>
                     <InputLabel>Date</InputLabel>
                      <OutlinedInput
                      type='date'
                      fullWidth
                      value={task_date}
                      onChange={e => dispatch(setDate(e.target.value))}
                      style={{ height: '30px', background: 'white'  }}
                      />
                     </div>
                     <div className='flex-1'>
                     <InputLabel>Time</InputLabel>
                        <OutlinedInput
                        type='time'
                        fullWidth
                        value={task_time}
                        onChange={e => dispatch(setTime(e.target.value))}
                        style={{ height: '30px', background: 'white'  }}
                        />
                     </div>
                  </div>
                  <InputLabel>Assign User</InputLabel>
                  <Select
                  type='text'
                  value={assigned_user}
                  fullWidth
                  style={{ height: '30px', background: 'white'  }}
                  onChange={e => dispatch(setAssignedUser(e.target.value))}
                  >
                   { userList && userList.map((item: any, index: number) => (
                    <MenuItem key={index} value={item.id} >{item.name}</MenuItem>
                   )) }
                    </Select>
                  <div className='flex justify-between mt-10'>
                    <IconButton onClick={initiateDeleteTask}>
                    { deleting && <RiDeleteBin6Line /> }
                    </IconButton>
                    <div>
                    <Button 
                    variant='text'
                    onClick={() => dispatch(setCard())}
                    >Cancel</Button>
                    <Button
                    disableElevation
                    variant='contained'
                    color='success'
                    style={{ width: '100px' }}
                    onClick={() => deleting === false ? initiateTask() : initiateUpdate() } 
                    >
                        Save
                    </Button>
                    </div>
                  </div>
              </div>
  )
}

export default Card