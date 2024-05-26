import { useState, ChangeEvent, FC, useEffect } from 'react';
import axios from 'axios';
import '../styles/styles.css'
interface FormProps {
    onInputChange: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    onSubmit: (event: ChangeEvent<HTMLFormElement>) => void;
    algorithm: Algorithm | '';
}

const Form: FC<FormProps> = ({ onInputChange, onSubmit, algorithm }) => {
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
        {['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'].map((name) => (
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
        <div>
            <label className="label" htmlFor="algorithm">
                Algorithm
            </label>
        </div>
        <div>
            <select className="input" name="algorithm" value={algorithm} onChange={onInputChange} required>
                <option value="">Select an algorithm</option>
                <option value="SVC">SVC</option>
                <option value="KNN">KNN</option>
                <option value="RFC">RFC</option>
                <option value="GBC">GBC</option>
            </select>
        </div>
            <button type="submit" className="button">
                Submit
            </button>
        </form>
    </div>
    );
};

type CropInfo = {
    image: string;
    tips: string;
};

type Crops = {
    [crop: string]: CropInfo;
};

const crops: Crops = {
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

type Algorithm = 'SVC' | 'KNN' | 'RFC' | 'GBC' ;

type Inputs = {
    N: string;
    P: string;
    K: string;
    temperature: string;
    humidity: string;
    ph: string;
    rainfall: string;
    algorithm: Algorithm | '';
}


export default function Home() {
    const [inputs, setInputs] = useState<Inputs>({ N: '', P: '', K: '', temperature: '', humidity: '', ph: '', rainfall: '', algorithm: '' });
    const [result, setResult] = useState(null);
    const [location, setLocation] = useState('');
    const [selectedCrop, setSelectedCrop] = useState<CropInfo | null>(null);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'algorithm') {
            setInputs(inputs => ({ ...inputs, [name]: value as Algorithm | '' }));
        } else {
            setInputs(inputs => ({ ...inputs, [name]: value ? Number(value) : 0 }));
        }
    };

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const apiUrlMap: { [key in Algorithm]: string } = {
            'SVC': 'http://localhost:5000/predict',
            'KNN': 'http://localhost:5000/predictKNN',
            'RFC': 'http://localhost:5000/predictRFC',
            'GBC': 'http://localhost:5000/predictGBC',
        };
        
        if (inputs.algorithm !== '') {
            const apiUrl = apiUrlMap[inputs.algorithm];
            const dataToSend = {
                N: Number(inputs.N),
                P: Number(inputs.P),
                K: Number(inputs.K),
                temperature: Number(inputs.temperature),
                humidity: Number(inputs.humidity),
                ph: Number(inputs.ph),
                rainfall: Number(inputs.rainfall)
            };
            
            const formattedDataToSend = { input: Object.values(dataToSend) };
            console.log('API URL:', apiUrl);
            console.log('Data to send:', formattedDataToSend);
            try {
                const response = await axios.post(apiUrl, formattedDataToSend);
                setResult(response.data.prediction);
                setSelectedCrop(crops[response.data.prediction]);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        else{
            console.error('Please select an algorithm!');
        }
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
        
        <Form onInputChange={handleInputChange} onSubmit={handleSubmit} algorithm={inputs.algorithm} />
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