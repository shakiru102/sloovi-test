import  { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getAllTask, initiateLogin, getUserList } from '../api'
import { RootState } from '../store'
import { setAllTask, setCard, setDelete, setUser, setUserList } from '../store/user'
import { BsPlus } from 'react-icons/bs'
import Card from './Card'
import Task from './Task'

const Dashboard = () => {

  const { user, allTask, cardShown, userList } = useSelector((state: RootState) => state.user )
  const dispatch = useDispatch()

  useEffect(() => {
    initiateLogin()
    .then(res => {
      if(res.data.status === 'success') dispatch(setUser(res.data.results))
    })
  },[])

  useEffect(() => {
   if(user) {
      getUserList(user.company_id, user.token)
      .then(res=> dispatch(setUserList(res.data.results.data)))
      getAllTask(user.company_id, user.token)
      .then(res => dispatch(setAllTask(res.data.results)))
   }
  }, [ user ])
   
  if(!userList) return <div>Loading....</div>

  return (
    <div className='h-[100vh] flex'>
      <div className='w-[200px] h-full bg-[#27313D]' />
      <div className='flex-1 flex flex-col'>
        <div className='bg-white h-[50px] shadow-lg' />
          <div className='h-full flex flex-col justify-center'>
            <div className='w-[350px] mb-28 ml-3'>
              <div className='flex border pl-2 h-[35px] items-center'> 
                <div className='flex-1 text-gray-500'>Tasks 0</div>
                <div className='border-l flex text-center px-2' onClick={() => {
                  dispatch(setCard())
                  dispatch(setDelete())
                }}>
                <BsPlus size={24} />
                </div>
              </div>
             { cardShown ?  <Card />  : 
               <div>
                { allTask && allTask.map((item: any, index: number) => (
                  <Task {...item} key={index} /> 
                )) }
               </div>}
            </div> 
        </div>
      </div>
    </div>
  )
}

export default Dashboard