'use client'
import axios from "axios"
import { useEffect, useState } from "react";
import Spinner from "./spinner";

export default function CheckCep () {
    const [ cep, setCep ] = useState('');
    const [ adress, setAdress ] = useState({
        city: 'Nada',
        neighborhood: 'Nada',
        street: 'Nada'
    });
    const [ searching, setSearching ] = useState(false);
    
    
    useEffect(() => {
        async function checkCEPValidity(cepCode) {
            try {
                setSearching(true);
                const response = await axios.get(`https://viacep.com.br/ws/${cepCode}/json/`);
                const data = response.data;
                console.log(data);
                if (data.erro) {
                    console.error('CEP inválido');
                    setSearching(false);
                } else {
                    setAdress({
                        city: data.localidade,
                        neighborhood: data.bairro,
                        street: data.logradouro
                    });
                    setSearching(false);
                    console.log(`CEP válido.`);
                }
            } catch (error) {
                console.error('Erro ao verificar CEP', error);
                setSearching(false);
            }
        }

        if (cep.length === 8) checkCEPValidity(cep);
    }, [cep]);

    return (
        <>
            <Input setCep={setCep} isLoading={searching} />
            <div className="bg-slate-900 text-slate-50
            w-[280px] p-2 mt-2">
                <h1 className="text-xl mb-2">Output</h1>
                <p>Cidade: <span>{adress.city}</span></p>
                <p>Bairro: <span>{adress.neighborhood}</span></p>
                <p>Rua: <span>{adress.street}</span></p>
            </div>
            {/* <button className="bg-orange-500 text-slate-50 text-xl */}
            {/* p-4 rounded-xl mt-2" onClick={() => checkCEPValidity(cep)}>Checar CEP</button> */}
        </>
    );
}

function Input ({ setCep, isLoading }) {

    return (
        <div>
            <div className="flex items-center justify-between">
                <p className="text-2xl">CEP</p>
                {isLoading ? <Spinner /> : '' }
            </div>
            <input className="bg-slate-700 text-slate-50
            p-3 rounded-xl w-[250px]"
                onChange={e => setCep(e.target.value)}
                maxLength='8' />
        </div>
    );
}
