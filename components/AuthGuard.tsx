'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('adminAuth');
      const loginTime = localStorage.getItem('adminLoginTime');
      
      if (authStatus === 'true' && loginTime) {
        // Check if login is still valid (24 hours)
        const loginTimestamp = parseInt(loginTime);
        const currentTime = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        
        if (currentTime - loginTimestamp < twentyFourHours) {
          setIsAuthenticated(true);
        } else {
          // Session expired, clear and redirect
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminLoginTime');
          router.push('/admin/login');
        }
      } else {
        router.push('/admin/login');
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}