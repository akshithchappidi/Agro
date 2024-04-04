import { useState, ChangeEvent, FC, useEffect } from 'react';
import axios from 'axios';

interface FormProps {
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = ({ onInputChange, onSubmit }) => {
    return (
        <div className="container mx-auto max-w-md shadow-lg mt-10 rounded p-5 bg-white">
            <form onSubmit={onSubmit}>
                {['N', 'P', 'K', 'temperature', 'soil moisture', 'ph', 'rainfall'].map((name) => (
                    <div className="mb-4" key={name}>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                            {name}
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            type="number" name={name} onChange={onInputChange} required />
                    </div>
                ))}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default function Home() {
    const [inputs, setInputs] = useState({ N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: '' });
    const [result, setResult] = useState(null);
    const [location, setLocation] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.post('https://agro-agro-ai.onrender.com/predict', { input: Object.values(inputs).map(Number) });
            setResult(response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
            setLocation(res.data.display_name);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-5">AI Model Page</h1>
            <Form onInputChange={handleInputChange} onSubmit={handleSubmit} />
            {result && (
                <div className="container mx-auto max-w-md shadow-lg mt-10 rounded p-5 bg-white">
                    <p>Result: {result}</p>
                </div>
            )}
            <p className="text-gray-500">Your Location: <span className="font-bold">{location}</span></p>
        </div>
    );
}