
import { CategoriesProvider } from './context/CategoryContext';
import Home from './pages/home/Home';
function App() {
  return (
   <CategoriesProvider>
  <Home /> 

   </CategoriesProvider>
    
  );
}

export default App;
