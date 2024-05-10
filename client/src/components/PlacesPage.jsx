import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesFormPage from './PlacesFormPage';
import AccountNav from '../AccountNav';

const PlacesPage = () => {
  
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/places').then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
        <AccountNav/>
        <div>
          <div className="text-center">
            List of all places
            <br />
            <Link
              className="inline-flex bg-primary text-white py-2 px-4 rounded-full"
              to={'/Account/places/new'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>{' '}
              Add new places
            </Link>
          </div>

          <div className="mt-4">
            {places.length > 0 &&
              places.map((place) => (
                <Link
                  to={'/account/places/' + place._id}
                  className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl"
                >
                  <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
                    {/* Add your PlaceImg component here */}
                    {/* //<PlaceImg place={place} /> */}
                    {
                      place.addedPhotos.length>0 && (
                        <img src={'http://localhost:4000/uploads/' + place.addedPhotos[0]} alt="" />
                      )
                    }
                  </div>
                  <div className="grow-0 shrink">
                    <h2 className="text-xl">{place.title}</h2>
                    <p className="text-sm mt-2">{place.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      
    </div>
  );
};

export default PlacesPage;
