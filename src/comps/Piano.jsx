import React from 'react';

const Piano = ({ keys }) => {
    console.log({keys});
  const pianoKeys = [
    { note: "C", hasBlack: true },
    { note: "D", hasBlack: true },
    { note: "E", hasBlack: false },
    { note: "F", hasBlack: true },
    { note: "G", hasBlack: true },
    { note: "A", hasBlack: true },
    { note: "B", hasBlack: false }
  ];

  return (
    <ul className="flex bg-gray-800 rounded p-2">
      {pianoKeys.map(({ note, hasBlack }, index) => (
        <li key={index} className="relative">
          {/* White Key */}
          <div
            className={`w-10 h-40 border border-gray-400 ${
              keys.includes(note) ? "bg-red-500" : "bg-white"
            }`}
            data-note={note}  // Store the note in a data attribute
          >
            {note}
          </div>

          {/* Black Key */}
          {hasBlack && (
            <div className="absolute top-0 left-7 w-6 h-24 bg-black" data-note={`${note}#`}></div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default Piano;
