import { useState, ChangeEvent, FC, useEffect } from 'react';
import axios from 'axios';

interface FormProps {
    onMoistureChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Form: FC<FormProps> = ({ onMoistureChange }) => {
    return (
        <div className="container mx-auto max-w-md shadow-lg mt-10 rounded p-5 bg-white">
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="inline-full-name">
                        Soil Moisture
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        type="number" min="30" max="90" onChange={onMoistureChange} />
                </div>
            </form>
        </div>
    );
};

export default function Home() {
    const [crop, setCrop] = useState('');
    const [bgColor, setBgColor] = useState('white');
    const [location, setLocation] = useState('');

    const handleMoistureChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value);

        if (value < 50) {
            setCrop('Crop A');
            setBgColor('lightgreen');
        } else if (value < 70) {
            setCrop('Crop B');
            setBgColor('lightblue');
        } else {
            setCrop('Crop C');
            setBgColor('lightyellow');
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
            setLocation(res.data.display_name);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2" style={{backgroundColor: bgColor}}>
            <h1 className="text-2xl font-bold mb-5">AI Model Page</h1>
            <Form onMoistureChange={handleMoistureChange} />
            <div className="flex items-center">
                <div className="w-1/3"></div>
                <div className="w-2/3">
                    <p className="text-gray-500">Recommended Crop: <span className="font-bold">{crop}</span></p>
                    <p className="text-gray-500">Your Location: <span className="font-bold">{location}</span></p>
                    {crop && <img src={`/images/${crop}.jpg`} alt={crop} />}
                </div>
            </div>
        </div>
    );
}