// Login.js (Componente para el Login en Next.js con TailwindCSS y redirección)
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e:any) => {
    e.preventDefault();

    const loginRequest = {
      email,
      password
    };

    // Llamada a la API de login
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginRequest),
    });

    const data = await response.json();

    if (data.success) {
      // Si el login es exitoso, redirige a la pantalla de mapas
      setErrorMessage('');
      router.push('/maps');
    } else {
      // Si hay un error, muestra el mensaje de error
      setErrorMessage(data.message || 'Correo o contraseña incorrectos');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center mb-4">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
