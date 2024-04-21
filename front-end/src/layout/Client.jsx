
import { Route, Routes } from 'react-router-dom';

import './layout.css'

import Home from '../components/Client/Home';
import Explore from '../components/Client/Explore';
import CreateEvent from '../components/Client/CreateEvent';
import Profile from '../components/Client/Profile';
import MyEvent from '../components/Client/MyEvent';
import Header from '../components/Client/Header';
import Event from '../components/Client/Event';
import Footer from '../components/Client/Footer';

function Client() {

    return (
        <div className='Client'>
            <Header />
            <div className='Client-content p-4'>
                <Routes>
                    <Route path="/event/:slug" element={<Event />} />
                    <Route path="" element={<Home />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="create-event" element={<CreateEvent />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="my-event" element={<MyEvent />} />
                </Routes>
            </div>
            <Footer/>
        </div >
    )

}

export default Client
