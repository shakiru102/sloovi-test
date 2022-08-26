import { Provider } from 'react-redux'
import Dashboard from './components/Dashboard'
import { store } from './store'

function App() {

  return (
    <Provider store={store}>
      <Dashboard />
    </Provider>  
  )
}

export default App
