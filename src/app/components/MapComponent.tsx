'use client';

import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { saveLocation } from '../services/apiService';
import { FaMapMarkerAlt, FaLocationArrow, FaUserAlt, FaRegCommentDots } from 'react-icons/fa'; // Íconos representativos

const MapComponent = () => {
  const [selectedPosition, setSelectedPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [user, setUser] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
      );
      const data = await response.json();
      const formattedAddress = data.results[0]?.formatted_address || 'Dirección no disponible';
      setAddress(formattedAddress);
    } catch {
      setAddress('Error al obtener la dirección');
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedPosition({ lat, lng });
      fetchAddress(lat, lng);
    }
  };

  const handleSaveLocation = async () => {
    if (!selectedPosition) {
      alert('Por favor, selecciona una ubicación en el mapa.');
      return;
    }

    if (!comment) {
      alert('Por favor, escribe un comentario antes de guardar.');
      return;
    }

    if (!user) {
      alert('Por favor, ingresa tu nombre de usuario.');
      return;
    }

    const payload = {
      latitude: selectedPosition.lat,
      longitude: selectedPosition.lng,
      comment: comment || 'Comentario vacío',
      category: 'test',
      user_id: user,
    };

    setIsSaving(true); // Deshabilitar el botón

    const result = await saveLocation(payload);
    setIsSaving(false); // Restaurar el botón

    if (result.success) {
      setSuccessMessage('¡Comentario agregado con éxito!');
      setComment('');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      alert(`Error al guardar el comentario: ${result.error}`);
    }
  };

  return (
    <div className="w-full">
      {/* Mapa */}
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: '80%', height: '500px', margin: '0 auto' }}
          center={{ lat: -29.9653, lng: -71.3494 }}
          zoom={17}
          onClick={handleMapClick}
        >
          {selectedPosition && <Marker position={selectedPosition} />}
        </GoogleMap>
      ) : (
        <p className="text-center">Cargando el mapa...</p>
      )}

      {/* Detalles y Formulario de Comentarios */}
      <div className="w-full max-w-lg px-6 py-6 bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg rounded-lg mx-auto mt-6">
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-md text-center">
            {successMessage}
          </div>
        )}

        {selectedPosition && (
          <div className="mb-4 text-sm text-white">
            <div className="flex items-center mb-2">
              <FaLocationArrow className="text-lg text-white mr-2" />
              <p><strong>Coordenadas:</strong> {selectedPosition.lat.toFixed(6)}, {selectedPosition.lng.toFixed(6)}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="text-lg text-white mr-2" />
              <p><strong>Dirección:</strong> {address}</p>
            </div>
          </div>
        )}

        {/* Campo para ingresar el comentario */}
        <div className="flex items-center mb-4">
          <FaRegCommentDots className="text-3xl text-yellow-400 mr-3" /> {/* Ícono de comentario */}
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3} 
            maxLength={150} //caracteres a 150
            placeholder="Escribe un comentario (máx. 150 caracteres)..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="text-right text-sm text-white">
          {comment.length}/150 caracteres
        </div>

        {/* Campo para ingresar el nombre de usuario */}
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <FaUserAlt className="text-lg text-white mr-2" />
            <label className="text-sm text-white mb-2">Usuario</label>
          </div>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa tu nombre de usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        {/* Botón de guardado */}
        <button
          className={`w-full py-3 rounded-lg transition duration-200 ${isSaving || !comment || !user ? 'bg-gray-500 cursor-not-allowed' : 'bg-orange-600 hover:bg-orange-700 text-white'}`}
          onClick={handleSaveLocation}
          disabled={isSaving || !comment || !user}
        >
          {isSaving ? 'Guardando...' : 'Guardar ubicación'}
        </button>
      </div>
    </div>
  );
};

export default MapComponent;
