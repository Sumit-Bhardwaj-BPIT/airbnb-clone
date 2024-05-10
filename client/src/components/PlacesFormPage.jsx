import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Perks from '../Perks';
import PhotosUploader from '../PhotosUploader';
import { Navigate, redirect, useParams } from 'react-router-dom';
const PlacesFormPage = () => {
  const {id}=useParams(); 
  const [title,setTitle]=useState('');
    const [address, setAddress]=useState('');
    const [addedPhotos,setAddedPhotos]=useState('');
    const [photoLink,setPhotoLink]=useState('');
    const[description,setDescription]=useState('');
    const[perks,setPerks]=useState('');
    const [extraInfo,setExtraInfo]=useState('');
    const [checkin,setCheckin]=useState('');
    const [checkout,setCheckout]=useState('');
    const [maxGuests,setMaaxGuests]=useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect]=useState(false);

    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get('http://localhost:4000/places/'+id).then(res=>{
        const {data} = res;
        setTitle(data.title);
       setAddress(data.address);
       setAddedPhotos(data.addedPhotos);
       setDescription(data.description);
       setPerks(data.perks);
       setExtraInfo(data.extraInfo);
       setCheckin(data.checkin);
       setCheckout(data.checkout);
       setMaaxGuests(data.maxGuests);
       setPrice(data.price)
      })

    },[id])


    async function savePlace(ev) {
      ev.preventDefault();
      const placeData = {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkin, checkout, maxGuests, price,
      };
      if (id) {
        // update
        await axios.put('http://localhost:4000/places', {
          id, ...placeData
        });
        setRedirect(true);
      } else {
        // new place
        await axios.post('http://localhost:4000/places', placeData);
        setRedirect(true);
      }
  
    }
    
    // async function addNewPlace(ev){
    //   ev.preventDefault();
    //   const placeData = {
    //     title, address, addedPhotos,
    //     description, perks, extraInfo,
    //     checkin, checkout, maxGuests, price,
    //   };
    //   // await axios.post('http://localhost:4000/places',{
    //   //   title,address,addedPhotos,description,perks,extraInfo,checkin,checkout,maxGuests,
    //   // });

    //   // setRedirect(true);

    //   if (id) {
    //     // update
    //     await axios.put('http://localhost:4000/places', {
    //       id, ...placeData
    //     });
    //     setRedirect(true);
    //   } else {
    //     // new place
    //     await axios.post('http://localhost:4000/places', placeData);
    //     setRedirect(true);
    //   }
      
      

    
    if(redirect){
      return (<Navigate to={'/Account/places'}/>);
    }

  return (
    
      <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-lg bg-blue-100">
            <h2 className="text-3xl font-semibold text-blue-600 mb-4">Create Your Place</h2>
            <form onSubmit={savePlace}>
              <div className="mb-4">
                <label className="text-lg text-blue-600" htmlFor="title">
                  Title
                </label>
                <p className="text-blue-400 text-sm">Title for your place</p>
                <input
                  type="text"
                  value={title}
                  onChange={ev=>setTitle(ev.target.value)}
                  id="title"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Title"
                />
              </div>
          
              <div className="mb-4">
                <label className="text-lg text-blue-600" htmlFor="address">
                  Address
                </label>
                <p className="text-blue-400 text-sm">Address to your place</p>
                <input
                value={address}
                 onChange={(ev) => setAddress(ev.target.value)}
                  type="text"
                  id="address"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Address"
                />
              </div>
          
              <PhotosUploader addedPhotos={addedPhotos}  setAddedPhotos={setAddedPhotos} />
              
          
              <div className="mb-4">
                <label className="text-lg text-blue-600" htmlFor="description">
                  Description
                </label>
                <p className="text-blue-400 text-sm">Description of the place</p>
                <textarea
                  id="description"
                  value={description} onChange={ev=>setDescription(ev.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Description"
                  rows="6"
                />
              </div>
              <div>
         <div className="mb-4">
                <label className="text-lg text-blue-600">Perks</label>
                <p className="text-blue-400 text-sm">Select all the perks</p>
                <div>
                <Perks selected={perks} onChange={setPerks} ></Perks>
                </div>
              </div>
    </div>
          
              
          
              <div className="mb-4">
                <label className="text-lg text-blue-600" htmlFor="extra-info">
                  Extra Info
                </label>
                <p className="text-blue-400 text-sm">Rules of the house, etc.</p>
                <textarea
                  value={extraInfo} onChange={ev=>setExtraInfo(ev.target.value)}
                  id="extra-info"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Extra Info"
                  rows="6"
                />
              </div>
          
              <h2 className="text-lg text-blue-600">Check-in & Check-out time</h2>
              <p className="text-blue-400 text-sm" >Add check-in and check-out time, remember to do cleaning between two guests</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg text-blue-600">Check-in time</h3>
                  <input
                    type="text"
                    value={checkin} onChange={ev=>setCheckin(ev.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="14:00"
                  />
                </div>
                <div>
                  <h3 className="text-lg text-blue-600">Check-out time</h3>
                  <input
                    type="text"
                    value={checkout} onChange={ev=>setCheckout(ev.target.value)}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="00:00"
                  />
                </div>
              </div>
          
              <div className="mb-4">
                <label className="text-lg text-blue-600" htmlFor="max-guests">
                  Max Number of Guests
                </label>
                <p className="text-blue-400 text-sm">Maximum number of guests</p>
                <input
                  type="text"
                  value={maxGuests} onChange={ev=>setMaaxGuests(ev.target.value)}
                  id="max-guests"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="10"
                />
              </div>

              <div className="mb-4">
                <label className="text-lg text-blue-600" htmlFor="price">
                  Price
                </label>
                <p className="text-blue-400 text-sm">Price of your place</p>
                <input
                value={price}
                 onChange={(ev) => setPrice(ev.target.value)}
                  type="text"
                  id="price"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  placeholder="Rupees...."
                />
              </div>
          
              <button onSubmit={savePlace} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Save
              </button>
            </form>
          </div>
    
  )

  }
export default PlacesFormPage