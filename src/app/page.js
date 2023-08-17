import dynamic from "next/dynamic";
import Link from "next/link";

const MyMap = dynamic(() => import('../components/map'), { ssr: false });

export default function App() {

    return (
        <div className="h-screen flex items-center flex-col">
            <MyMap />
            <Link className="text-slate-950 bg-orange-300 p-2 rounded-lg mb-2" href='/distance'>Página de distância</Link>
        </div>
    );
}
