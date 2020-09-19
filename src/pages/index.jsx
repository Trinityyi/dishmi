import React from 'react';
import Layout from '../components/layout';

export default function Home() {
  return (
    <Layout title="">
      <img
        className="block mx-auto w-40 mt-10 mb-4"
        src="/logo.png"
        alt="dishmi"
      />
      <h1 className="text-5xl font-bold text-center mb-12">dishmi</h1>
      <form
        className="flex flex-col items-center"
      >
        <input
          className="shadow appearance-none border rounded w-40 block py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="pin"
          type="text"
          placeholder="PIN"
          aria-label="PIN"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-40 block py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          View
        </button>
      </form>
    </Layout>
  );
}