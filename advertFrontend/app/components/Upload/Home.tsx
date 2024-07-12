'use client'
import Individual from "@/app/components0/Individual";
import Navbar1 from "@/app/components0/Navbar1";
import { Provider } from 'react-redux';
import store from '@/app/app/store';


const Home = () => {

  return (
    <div>
       <Provider store={store}>
        <Navbar1 />
        <Individual />
      </Provider>
    </div>
  );
}

export default Home;

