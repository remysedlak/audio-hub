import React from 'react';

const StartPage = () => {
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Selected file:', file);
            // Handle the file upload logic here
        }
    };
    
    return (
        <div className="flex flex-col items-center mt-10 justify-between">
            <h1 className="mb-10 text-5xl text-center font-bold text-white mb-4">Welcome to harmoniX</h1>
            <div>
                <label className="cursor-pointer">
                    <h4 className="text-3xl text-center font-bold text-gray-400 mb-4">Upload file to begin</h4>
                    <input 
                        type="file" 
                        accept="audio/*" 
                        className="hidden" 
                        onChange={handleFileChange} 
                    />
                </label>
            </div>
        </div>
    );
};
export default StartPage;