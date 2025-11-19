"use client";

import GoogleMapReact from "google-map-react";

interface GoogleMapProps {
  address?: string;
  defaultCenter?: {
    lat: number;
    lng: number;
  };
  defaultZoom?: number;
}

interface MarkerProps {
  lat: number;
  lng: number;
}

// Default location: Plot 45B Daganga Crescent, Mabushi, Abuja, Nigeria
const DEFAULT_CENTER = {
  lat: 9.0765,
  lng: 7.3986,
};

const DEFAULT_ZOOM = 15;

// Marker component
const Marker = ({ lat, lng }: MarkerProps) => (
  <div className="absolute transform -translate-x-1/2 -translate-y-full">
    <div className="bg-wca-primary text-white rounded-full p-2 shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    </div>
  </div>
);

export default function GoogleMap({
  address,
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = DEFAULT_ZOOM,
}: GoogleMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // If no API key, show a placeholder with the address
  if (!apiKey) {
    return (
      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <svg
            className="w-16 h-16 text-gray-500 mx-auto mb-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <p className="text-gray-600 text-sm mb-2">
            Google Maps API Key Required
          </p>
          {address && <p className="text-gray-500 text-xs">{address}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <GoogleMapReact
        bootstrapURLKeys={{ key: apiKey }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
      >
        <Marker lat={defaultCenter.lat} lng={defaultCenter.lng} />
      </GoogleMapReact>
    </div>
  );
}
