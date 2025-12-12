import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/authServices';

export default function AuthLoader({ children }) {
  const queryClient = useQueryClient();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchCurrentUser()
      .then(data => {
        queryClient.setQueryData(['currentUser'], data);
      })
      .catch(() => {
        queryClient.setQueryData(['currentUser'], null);
      })
      .finally(() => {
        setIsReady(true);
      });
  }, []);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return children;
}