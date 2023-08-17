'use client'
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import Button from './button';
import axios from 'axios';

export default function Map()  {
    const [ origin, setOrigin ] = useState([51.505, -0.09]);
    const [ adress, setAdress ] = useState('Brazil, Rio de Janeiro, Rua Artur Vargas');

    async function getGeoAdress () {
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
        // setAdress(prompt('Digite um endereço.'));
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                setOrigin([position.coords.latitude, position.coords.longitude]);
            }, err => {
                throw err;
            });
        }
    }

    useEffect(() => {
        // async function fun () {
        //     try {
        //         const response = await fetch('/api/geo', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 adress: adress
        //             }) // Precisa ser em JSON
        //         });
        //         const readStream = response.body;
                
        //         console.log(readStream);
                
        //         const reader = readStream.getReader();
        //         const chunks = [];
                
        //         while (true) {
        //             const { done, value } = await reader.read();
        //             if (done) break;
        //             chunks.push(value);
        //         }
                
        //         const concatenatedBuffer = new Uint8Array(
        //             chunks.reduce((acc, chunk) => acc + chunk.length, 0)
        //         );
        //         let offset = 0;
        
        //         for (const chunk of chunks) {
        //             concatenatedBuffer.set(chunk, offset);
        //             offset += chunk.length;
        //         }

        //         console.log(concatenatedBuffer);

        //         const decoder = new TextDecoder('utf-8');

        //         const newBuffer = decoder.decode(concatenatedBuffer);
        //         console.log('JSON: ', newBuffer);
        //         console.log('new: ', JSON.parse(newBuffer));

        //         setOrigin(JSON.parse(newBuffer).data.latLong)
        //     } catch (err) {
        //         console.error(err);
        //     }
        // }

        // fun();
        getGeoAdress();
    }, [origin]);

    return (
        <div className='flex items-center h-full flex-col justify-center'>
            <p className='bg-slate-600 text-slate-100 w-[300px] mb-[20px]'>Endereço: {adress.display_name}</p>
            <Button event={getAdress} /> 
            <MapContainer style={{ height: 400, width: 400 }} center={origin} zoom={13} scrollWheelZoom={false}>
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
