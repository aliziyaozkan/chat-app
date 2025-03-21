import './App.css'
import RouterConfig from './components/RouterConfig'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
function App() {

  return (
    <div>
      <RouterConfig />
      <ToastContainer position='top-right' autoClose={2300} />

    </div>
  )
}

export default App
