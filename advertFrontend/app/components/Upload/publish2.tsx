'use client'
import Navbar1 from "@/app/components0/Navbar1";
import { Provider } from 'react-redux';
import store from '@/app/app/store';
import Publish2 from "@/app/components0/publish2";

const PublishBanner = () => {

  return (
    <div>
       <Provider store={store}>
        <Navbar1 />
        <Publish2  />
      </Provider>
    </div>
  );
}

export default PublishBanner;

