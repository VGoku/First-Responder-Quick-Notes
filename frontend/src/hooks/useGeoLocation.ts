import { useState, useEffect } from "react";

export default function useGeoLocation() {
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((p) => {
      setPos({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      });
    });
  }, []);

  return pos;
}