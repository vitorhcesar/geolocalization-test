'use client'
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import Button from './button';
import axios from 'axios';

export default function Map()  {
    const [ origin, setOrigin ] = useState([51.505, -0.09]);
    const [ adress, setAdress ] = useState({
        display_name: 'Sem endereços...'
    });

    const getGeoAdress = async () => {
        await axios(`https://nominatim.openstreetmap.org/reverse?lat=${origin[0]}&lon=${origin[1]}`, {
            params: {
                format: 'json'
            }
        })
        .then(res => {
            const data = res.data;
            setAdress(data);

            return data;
        });
    }

    const getAdress = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                setOrigin([position.coords.latitude, position.coords.longitude]);
            }, err => {
                throw err;
            });
        }
    }

    useEffect(() => {
        // callAPI('get');
        // callAPI('post');
        getGeoAdress();
    }, [origin]);

    return (
        <div className='flex items-center h-full flex-col justify-center'>
            <p className='bg-slate-600 text-slate-100 w-[300px] mb-[20px] p-3 rounded-xl'>
                <b>Endereço:</b> <br/> <span className='text-[.8rem] text-orange-100'>{adress.display_name}</span></p>
            <Button event={getAdress} /> 
            <MapContainer fadeAnimation={true} style={{ height: 400, width: 400 }} center={origin} zoom={13} scrollWheelZoom={false}>
                <MapComponent coord={origin} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={origin}>
                    <Popup>
                        Sua casa.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

function MapComponent ({ coord }) {
    const button = document.getElementById('button-id');
    
    const map = useMapEvents({
        click: () => {
            map.setView([coord[0], coord[1]], map.getZoom())
        },
        locationfound: (location) => {
            console.log('location found: ', location);
        }
    });

    return null;
}

const callAPI = async (method) => {
    const body = {
        key: 'Dado passado pelo body da requisição'
    }

    if (method === 'get') {
        await axios('/api')
        .then(res => {
            const data = res.data;
            console.log('Chamada API GET:', data);
        })
        .catch(err => {
            console.error(err);
        })
    } else if (method === 'post') {
        await axios('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ key: 'Dado passado pelo body da requisição' })
        })
        .then(res => {
            const data = res.data;
            console.log('Chamada API POST:', data);
        })
        .catch(err => {
            console.error('ERRO: ', err);
        })
    }
}
