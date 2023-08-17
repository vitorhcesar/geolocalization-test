import dynamic from "next/dynamic";

const MyMap = dynamic(() => import('../components/map'), { ssr: false });

export default function App() {

    return (
        <div className="h-screen">
            <MyMap />
        </div>
    );
}
