// Register.js (Componente para el Registro con TailwindCSS)
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);  // Nuevo estado para manejar si está registrado
  const [errorMessage, setErrorMessage] = useState('');  // Para mostrar errores si los hay
  const router = useRouter();

  const handleRegister = async (e:any) => {
    e.preventDefault();

    const registerRequest = {
      username,
      email,
      password,
      street,
      city,
      country,
    };

    // Llamada a la API de registro
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerRequest),
    });

    const data = await response.json();

    if (data.success) {
      // Si el registro es exitoso, actualizamos el estado y redirigimos al login
      setIsRegistered(true);
      setErrorMessage('');
    } else {
      // Si hay un error, mostramos el mensaje de error
      setErrorMessage(data.message || 'Hubo un problema con el registro');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Crear Cuenta</h2>

        {isRegistered ? (
          <div className="text-center text-green-500">
            <p>¡Registro exitoso! Ahora puedes iniciar sesión.</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 text-blue-500 underline"
            >
              Ir al Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

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

            <div className="mb-4">
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Calle</label>
              <input
                type="text"
                id="street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
              <input
                type="text"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
              <input
                type="text"
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
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
              Registrarse
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
