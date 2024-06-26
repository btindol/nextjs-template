"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';

// Define the Album interface
interface Album {
  id: number;
  title: string;
  artist: string;
  price: number;
  image_url: string;
}

export default function Home() {
  const { data: session, status } = useSession();
  const [albums, setAlbums] = useState<Album[]>([]); // Use the Album interface here
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('Home component: Session status:', status);
    if (session) {
      console.log('Home component: Session data:', session);
    } else {
      console.log('Home component: No session data');
    }
  }, [session, status]);

  const fetchAlbums = async () => {
    if (!session) {
      console.log('Home component: No session found, signing in...');
      signIn();
      return;
    }

    setLoading(true);
    try {
      console.log('Home component: Fetching albums with session:', session);
      const response = await axios.get('https://album-api.happymushroom-e864d1c9.canadacentral.azurecontainerapps.io/albums', {
        headers: {
          'Authorization': `Bearer ${session.accessToken}`,
          // Remove the subscription key if not needed for the direct API call
          'Ocp-Apim-Subscription-Key': 'YOUR_SUBSCRIPTION_KEY' 
        }
      });
      // const response = await axios.get('https://album-apim.azure-api.net/albums', {
      //   headers: {
      //     'Authorization': `Bearer ${session.accessToken}`,
      //     'Ocp-Apim-Subscription-Key': 'YOUR_SUBSCRIPTION_KEY' // Ensure to replace with actual subscription key
      //   }
      // });

      console.log('Home component: Response status:', response.status);
      if (response.status === 200) {
        console.log('Home component: Albums data:', response.data);
        setAlbums(response.data);
      } else {
        console.error(`Home component: Failed to retrieve albums. HTTP Status code: ${response.status}`);
      }
    } catch (error) {
      console.error('Home component: Error fetching albums:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Hello, World from Next.js!</h1>
      {status === "authenticated" ? (
        <>
          <button 
            onClick={fetchAlbums} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Fetch Albums'}
          </button>
          <button onClick={() => signOut()} className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
            Sign Out
          </button>
        </>
      ) : (
        <button onClick={() => signIn()} className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700">
          Sign In
        </button>
      )}
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
