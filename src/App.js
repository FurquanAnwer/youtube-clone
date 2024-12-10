// import logo from './logo.svg';
// import './App.css';
import Head from "./components/Head";
import Body from "./components/Body";
import Results from "./components/Results";
import { Provider } from "react-redux";
import store from "./utils/store";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Watchpage from "./components/Watchpage";

const appRouter = createBrowserRouter([{
  path:"/",
  element:(
    <div>
      <Head /> {/* Head included here */}
      <Body />
    </div>
  ),
  children:[
    {
      path:'/',
      element:<MainContainer/>,
    },
    {
      path:'watch',
      element:<Watchpage/>,
    },
    {
      path:'results',
      element:<Results/>,
    }
  ]
}])

function App() {
  return (
    <Provider store = {store}>
      <div >
      
      <RouterProvider router={appRouter}/>
      
      {/* <Body/> */}
    </div>
    </Provider>
    
  );
}

export default App;
