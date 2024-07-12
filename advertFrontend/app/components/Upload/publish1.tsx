'use client'
import Navbar1 from "@/app/components0/Navbar1";
import { Provider } from 'react-redux';
import store from '@/app/app/store';
import Publish1 from "@/app/components0/publish1";


const PublishImages = () => {

  return (
    <div>
       <Provider store={store}>
        <Navbar1 />
        <Publish1  />
      </Provider>
    </div>
  );
}

export default PublishImages;

