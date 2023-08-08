'use client'
import Image from 'next/image';
import React, { useState } from 'react';


export default function Home() {

  const [isTurnedOn, setIsTurnedOn] = useState(true);
  const [log, setLog] = useState<{ time: string; value: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10; // Số dòng dữ liệu trên mỗi trang

  const handleTurnOn = () => {
    setIsTurnedOn(true);
    addToLog('ON');
  };

  const handleTurnOff = () => {
    setIsTurnedOn(false);
    addToLog('OFF');
  };

  const addToLog = (value: string) => {
    const newEntry = {
      time: new Date().toLocaleTimeString(),
      value: value,
    };
    setLog((prevLog) => [...prevLog, newEntry]);
    if ((log.length + 1) % pageSize === 1) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };


  const renderLog = () => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return log.slice(start, end).map((entry, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
        <td className="border p-2">{entry.time}</td>
        <td className="border p-2">{entry.value}</td>
      </tr>
    ));
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex place-items-center ...">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src={isTurnedOn ? '/lightingbulb.jpg' : '/lightbulb.jpg'}
          alt={isTurnedOn ? "Lighting Bulb" : "Light Bulb"}
          width={180}
          height={37}
          priority
        />
      </div>
      <div className="flex items-center space-x-4">
        <button className="border rounded-lg px-4 py-2 transition-colors hover:border-blue-500" onClick={handleTurnOn}>
          Turn on
        </button>
        <button className="border rounded-lg px-4 py-2 transition-colors hover:border-red-500" onClick={handleTurnOff}>
          Turn off
        </button>
      </div>
      <div className="mt-4 border-collapse border border-gray-300">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-black">Time</th>
              <th className="border p-2 text-black">Value</th>
            </tr>
          </thead>
          <tbody>{renderLog()}</tbody>
        </table>
      </div>
      <div className="mt-4">
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
          className="mr-2 bg-gray-200 px-2 py-1 rounded text-black"
        >
          Previous Page
        </button>
        <button
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={(currentPage - 1) * pageSize + pageSize >= log.length}
          className="bg-gray-200 px-2 py-1 rounded text-black"
        >
          Next Page
        </button>
      </div>

    </main>
  );
}
