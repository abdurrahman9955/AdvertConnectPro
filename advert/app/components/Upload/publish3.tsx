'use client'
import Navbar1 from "@/app/components0/Navbar1";
import { Provider } from 'react-redux';
import store from '@/app/app/store';
import Publish3 from "@/app/components0/publish3";


const PublishVideos = () => {

  return (
    <div>
       <Provider store={store}>
        <Navbar1 />
        <Publish3 />
      </Provider>
    </div>
  );
}

export default PublishVideos;

