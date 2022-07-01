import { Routes, Route } from 'react-router-dom';
import Body from './layout/Body/Body';
import Header from './layout/Header/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <section>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Body></Body>}></Route>
      </Routes>
      <ToastContainer />
    </section>
  );
}

export default App;
