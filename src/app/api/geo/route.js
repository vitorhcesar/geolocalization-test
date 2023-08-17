import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST (request) {
    const { adress } = await request.json();
    
    const latLong = await axios('https://nominatim.openstreetmap.org/search', {
        params: {
            q: adress,
            format: 'json'
        }
    })
    .then(res => {
        const data = res.data;
        if (data.length > 0) {
            return [
                parseFloat(data[0].lat),
                parseFloat(data[0].lon)
            ]
        } else {
            return 'Not found.'
        }
    })
    .catch(err => {
        return err;
    })

    const data = {
        message: 'Hey, API works!',
        adress,
        latLong
    }

    return NextResponse.json({ data });
}