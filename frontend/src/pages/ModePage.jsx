import { useState } from "react";
const ModelPage = () => {
    const [path, setPath] = useState("");
    const [base64Image, setBase64Image] = useState("")
    const [pred, setPred] = useState({ prediction: '0' });

    /**
     * @param {React.ChangeEvent<HTMLInputElement>} e Event Var
     */
    const handleChange = (e) => {
        setPath(URL.createObjectURL(e.target.files[0]));
        const reader = new FileReader();
        reader.onload = () => {
            const dataURL = reader.result;
            const b64 = dataURL.replace("data:image/png;base64,", "")
            setBase64Image(b64);
        }
        reader.readAsDataURL(e.target.files[0]);
    };

    /**
     * @param {React.FormEvent<HTMLFormElement>} e Form Event
     */
    const handlePredict = async (e) => {
        e.preventDefault();
        const payload = {
            image: base64Image,
        };

        try {
            const res = await fetch("http://127.0.0.1:5000/predict", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            setPred(data?.prediction);

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="flex justify-center items-center">
            <main className="bg-gray-50 max-w-full min-h-screen p-4">
                <div>
                    <label htmlFor="fileInput">Enter X-Ray Image: </label>
                    <input id="fileInput" type="file" onChange={handleChange} />
                </div>
                <div>
                    {path && <img src={path} alt="ml_model_image" className="border-3 border-gray-400 rounded max-w-[45rem] mt-8" />}
                </div>
                <div>
                    <form onSubmit={handlePredict}>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded mt-8 hover:bg-indigo-600">Check</button>
                    </form>
                </div>
                <div className="block mt-8 uppercase">
                    <span className="block text-blue-500 font-semibold">Probability: {pred?.prediction}</span>
                    {pred?.prediction == 0 ? '' : pred?.prediction <= 0.5 ? <p>your result is <span className=" text-green-400 font-semibold">normal</span></p> : <p>your result is <span className=" text-red-400 font-semibold">pnenomial</span></p>}
                </div>
            </main>
        </div>
    );
};

export default ModelPage;