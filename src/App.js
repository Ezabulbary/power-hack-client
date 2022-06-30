import { Routes, Route } from 'react-router-dom';
import Body from './layout/Body/Body';
import Header from './layout/Header/Header';

function App() {
  return (
    <section>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Body></Body>}></Route>
      </Routes>
    </section>
  );
}

export default App;
