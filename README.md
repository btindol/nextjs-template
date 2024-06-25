# This is a repo to contaierize a next.js app
# Take the flask repo url and make button that gets the list of alubms.

# Do this to run the app
1) npm install

2) npm run dev

3) npm install axios 


# Build dockerized app
1) docker build -t nextjs-app .

2) docker run -p 3000:3000 nextjs-app


# Make service principle for the repo
az login

az ad sp create-for-rbac --name "nextjsserviceprinciple" --role Contributor --scopes /subscriptions/{subscription-id}/resourceGroups/{resource-group-name} --sdk-auth


# Make github actions in .github/workflow/deploy.yml


# Get the storage account key and name and add to env secrets in github


# before api managment.

// app/page.tsx
"use client";

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      //const response = await axios.get('https://album-api.happymushroom-e864d1c9.canadacentral.azurecontainerapps.io/albums');
      const response = await axios.get('https://album-apim.azure-api.net/albums');

      if (response.status === 200) {
        setAlbums(response.data);
      } else {
        console.error(`Failed to retrieve albums. HTTP Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Hello, World from Next.js!</h1>
      <button 
        onClick={fetchAlbums} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Albums'}
      </button>
      <div className="mt-8 w-full max-w-2xl">
        {albums.length > 0 ? (
          albums.map((album) => (
            <div key={album.id} className="border-b border-gray-200 py-4">
              <h2 className="text-2xl font-semibold">{album.title}</h2>
              <p className="text-lg">{album.artist}</p>
              <p className="text-gray-600">${album.price}</p>
              <img src={album.image_url} alt={album.title} className="mt-2 w-full h-auto" />
            </div>
          ))
        ) : (
          !loading && <p>No albums to display</p>
        )}
      </div>
    </main>
  );
}
