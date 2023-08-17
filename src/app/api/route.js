import { NextResponse } from 'next/server'
import { streamToString } from '@/functions/streamToString';

export async function GET () {
    return NextResponse.json({ message: 'Yeah, API works!' });
}

export async function POST (request) {
    // console.log('========================= REQUISIÇÃO:: ', typeof request)
    // console.log('========================= REQUISIÇÃO:: ', request)
    // const res = await request.json();
    // const response = JSON.parse(res);
    // console.log('REQUISIÇÃO PRIMEIRA', request.body); // Readable Stream
    // console.log('REQUISIÇÃO SEGUNDA', res.body) // Readable Stream
    const { body } = request; // ReadableStream
    let string = {};

    await streamToString(body)
    .then(data => {
        string = JSON.parse(data);
    })
    .catch(err => console.error(err));

    return NextResponse.json({ message: 'Yeah, API works!', ...string });
}