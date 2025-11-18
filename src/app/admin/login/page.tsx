'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import Image from 'next/image';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin');
      } else {
        setError(data.error || 'Erreur de connexion');
      }
    } catch (error) {
      setError('Erreur de connexion au serveur');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFEF9] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-white border border-[#E5E5E5] p-8">
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="absolute -inset-4 border border-[#C9A96E]/20 rotate-45"></div>
              <Image
                src="/img/amarea.png"
                alt="Amarea"
                width={120}
                height={48}
                className="relative object-contain filter grayscale contrast-125"
              />
            </div>
            <h1 className="font-serif text-3xl text-[#2C2C2C] mb-2">
              Administration
            </h1>
            <p className="text-[#5C5C5C] text-sm">
              Connectez-vous pour gérer le contenu
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm mb-2 text-[#5C5C5C]">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none"
                placeholder="admin@amarea.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#5C5C5C]">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-[#E5E5E5] focus:border-[#C9A96E] outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2C2C2C] text-[#FFFEF9] hover:bg-[#C9A96E] transition-colors disabled:opacity-50"
            >
              <LogIn size={18} />
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

