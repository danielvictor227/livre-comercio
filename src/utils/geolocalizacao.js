/** Distância geográfica aproximada em quilômetros (linha reta, não percurso). */
export function distanciaKm(origem, destino) {
  if (!origem || !destino) return null;
  const latO = Number(origem.latitude), lonO = Number(origem.longitude);
  const latD = Number(destino.latitude), lonD = Number(destino.longitude);
  if (![latO, lonO, latD, lonD].every(Number.isFinite)) return null;
  if (Math.abs(latO)>90 || Math.abs(latD)>90 || Math.abs(lonO)>180 || Math.abs(lonD)>180) return null;
  const rad = (g) => g * Math.PI / 180;
  const dLat = rad(latD - latO), dLon = rad(lonD - lonO);
  const a = Math.sin(dLat/2)**2 + Math.cos(rad(latO))*Math.cos(rad(latD))*Math.sin(dLon/2)**2;
  return 6371*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
export function formatarDistancia(km) {
  if (!Number.isFinite(km) || km<0) return "";
  return km < 1 ? `${Math.round(km*1000)} m` : `${km.toFixed(1).replace('.',',')} km`;
}
