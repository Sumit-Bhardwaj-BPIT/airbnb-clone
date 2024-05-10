import { Route,Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import Layout from "./Layout";
import Home from "./components/Home";
import Spin from './components/Spin';
import Register from "./components/Register";
import Header from "./Header";
import axios from "axios";
import BookingPage from "./BookingPage";
import Account from "./components/Account";
import { UserContextProvider } from "./UserContext";
import PlacesPage from "./components/PlacesPage";
import PlacesFormPage from "./components/PlacesFormPage";
import PlacePage from "./components/PlacePage";
import BookingsPage from "./BookingsPage";
function App(){
  const [spin,setSpin]=useState(true);
  axios.defaults.withCredentials=true;
  useEffect(() => {
    // Simulating an asynchronous operation
    setTimeout(() => {
      setSpin(false);
    }, 2000); // Set a time in milliseconds to determine when to stop showing the spinner
  }, []);


  return (
    

    <UserContextProvider  >
    <Routes>
      <Route path="/" element={<Layout></Layout>}  >
        <Route index element={<Home/>}/>
        
        {spin ? (
          <Route path="/login" element={<Spin />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        <Route path="/register" element={<Register></Register>} ></Route>
        <Route path="/Account/?" element={<Account></Account>} ></Route>
        <Route path="/Account/places" element={<PlacesPage></PlacesPage>} ></Route>
        <Route path="/Account/places/new" element={<PlacesFormPage></PlacesFormPage>} ></Route>
        <Route path="/Account/places/:id" element={<PlacesFormPage></PlacesFormPage>} ></Route>

          <Route path="/place/:id" element={<PlacePage></PlacePage>} ></Route>
          <Route path="/Account/bookings"  element={<BookingsPage></BookingsPage>}  ></Route>
          <Route path="/Account/bookings/:id"  element={<BookingPage></BookingPage>}  ></Route>
        
          
      </Route>
      
    </Routes>
     </UserContextProvider>
  );
}
export default App;

