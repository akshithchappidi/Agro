import { useState, ChangeEvent, FC, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css'
interface FormProps {
    onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
}

const Form: FC<FormProps> = ({ onInputChange, onSubmit }) => {
    const fieldDescriptions: { [key: string]: string } = {
        'Nitrogen': 'Enter the Nitrogen content',
        'Phosphorous': 'Enter the Phosphorous content',
        'Potassium': 'Enter the Potassium content',
        'temperature': 'Enter the temperature',
        'humidity': 'Enter the humidity',
        'ph': 'Enter the pH level',
        'rainfall': 'Enter the rainfall amount'
    };

    return (
        <div className="container">
        <form onSubmit={onSubmit}>
        {['Nitrogen', 'Phosphorous', 'Potassium', 'temperature', 'humidity', 'ph', 'rainfall'].map((name) => (
            <div key={name}>
                <div>
                    <label className="label" htmlFor={name}>
                        {name}
                    </label>
                </div>
                <div>
                    <input className="input" 
                        type="number" name={name} onChange={onInputChange} required title={fieldDescriptions[name]} />
                </div>
            </div>
        ))}
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    </div>
    );
};

const crops = {
    'Coffee': {
        image: './Coffee.jfif',
        tips: 'Cultivation tips for Crop1'
    },
    'Kidney Beans': {
        image: './kidney.jfif',
        tips: "Water the soil evenly and consistently, keeping it moist but not overly wet.\n Kidney beans require regular watering, especially during dry spells.\nAvoid overhead watering as it can promote the spread of diseases. ...\nMulch around the base of the plants to retain moisture in the soil and reduce weed growth. ...Fertilize kidney beans with a balanced organic fertilizer when planting and again during flowering"
    },
    // ... add more crops as needed ...
};

export default function Home() {
    const [inputs, setInputs] = useState({ N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: '' });
    const [result, setResult] = useState(null);
    const [location, setLocation] = useState('');
    const [selectedCrop, setSelectedCrop] = useState(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Button Clicked");
        // try {
        //     const response = await axios.post('https://agro-agro-ai.onrender.com/predict', { input: Object.values(inputs).map(Number) });
        //     setResult(response.data);
        // } catch (error) {
        //     console.error('There was an error!', error);
        // }
        const cropNames = Object.keys(crops);
        const randomCropName = cropNames[Math.floor(Math.random() * cropNames.length)];
        setSelectedCrop(crops[randomCropName]);
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async function(position) {
            const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`);
            setLocation(res.data.display_name);
        });
    }, []);

    return (
        <>
        <h1 className="text-4xl font-bold mb-5 items-center justify-center text-center text-green-200 pb-8">AI Model Page</h1>
        <p className="text-gray-500">Your Location: <span className="font-bold">{location}</span></p>
        {/* <div className="flex flex-row items-center justify-center min-h-screen py-2 bg-green-200"> */}
        
            <Form onInputChange={handleInputChange} onSubmit={handleSubmit} />
            {result && (
                <div className="container mx-auto max-w-md shadow-lg mt-10 rounded p-5 bg-white">
                    <p>Result: {result}</p>
                </div>
            )}
        {selectedCrop && (
            <div className="container mx-auto max-w-md shadow-lg mt-10 rounded p-5 bg-white">
                <img src={selectedCrop.image} alt="Crop" />
                <p>Cultivation tips: {selectedCrop.tips}</p>
            </div>
        )}
        {/* </div> */}
        </>
    );
}