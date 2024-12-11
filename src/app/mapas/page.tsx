import MapComponent from "../components/MapComponent";

export default function Home() {
  return (
    <div className="flex flex-col items-center space-y-6">
      <h2 className="text-xl font-semibold">Selecciona una ubicación en el mapa</h2>
      <MapComponent />
    </div>
  );
}