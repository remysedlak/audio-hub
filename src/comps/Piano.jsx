import React from 'react';

const Piano = () => {
    return (
        
            <ul className="flex bg-gray-800 rounded ">
                {/* Piano Keys */}
                <li className="relative">
                    <div className="w-7 h-20 bg-white border border-gray-400"></div>
                    <div className="absolute top-0 left-5 w-2 h-12 bg-black"></div>
                </li>
                <li className="relative">
                    <div className="absolute top-0 w-2 h-12 bg-black"></div>
                    <div className="w-7 h-20 bg-white border border-gray-400"></div>
                    <div className="absolute top-0 left-5 w-2 h-12 bg-black"></div>
                </li>
                <li className="relative">
                    <div className="absolute top-0 w-2 h-12 bg-black"></div>
                    <div className="w-7 h-20 bg-white border border-gray-400"></div>
                </li>
                <li className="relative">
                    <div className="w-7 h-20 bg-white border border-gray-400"></div>
                    <div className="absolute top-0 left-5 w-2 h-12 bg-black"></div>
                </li>
                <li className="relative">
                    <div className="absolute top-0 w-2 h-12 bg-black"></div>
                    <div className="w-7 h-20 bg-white border border-gray-400"></div>
                    <div className="absolute top-0 left-5 w-2 h-12 bg-black"></div>
                </li>
                <li className="relative">
                    <div className="absolute top-0 w-2 h-12 bg-black"></div>
                    <div className="w-7 h-20 bg-white border border-gray-400"></div>
                    <div className="absolute top-0 left-5 w-2 h-12 bg-black"></div>
                </li>
                <li className="relative">
                    <div className="absolute top-0 w-2 h-12 bg-black"></div>
                    <div className="w-7 h-20 bg-white border border-gray-400"></div>
                </li>
            </ul>
        
    );
};
export default Piano;
