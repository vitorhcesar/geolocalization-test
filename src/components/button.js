'use client'

const Button = ({ event }) => {
    return (
        <button id="button-id" className="bg-slate-600 text-slate-300 p-2"
            onClick={event}>Clique em mim</button>
    );
}

export default Button;