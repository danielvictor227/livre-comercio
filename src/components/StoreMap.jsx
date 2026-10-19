import React, {useEffect, useMemo, useState} from 'react';
import {MapContainer, Marker, Popup, TileLayer, CircleMarker, useMap} from 'react-leaflet';
import L from 'leaflet';
import {Link} from 'react-router-dom';
import {MapPin, LocateFixed, Search} from 'lucide-react';
import {distanciaKm, formatarDistancia} from '../utils/geolocalizacao';
import {filtrarEstabelecimentos, obterEstabelecimentosDoCatalogo} from '../services/estabelecimentos';

const centroAnapolis = [-16.3281, -48.953];
const marcadorLoja = L.divIcon({
  className: 'pin-loja', html: '<span aria-hidden="true">⌂</span>',
  iconSize: [34,38], iconAnchor: [17,35], popupAnchor: [0,-33]
});
function MovimentoDoMapa({destino}) {
  const map=useMap();
  useEffect(()=>{
    if(destino) map.flyTo([destino.latitude,destino.longitude],15,{duration:0.7});
  },[map,destino]);
  return null;
}
export default function StoreMap({stores}) {
  const [busca,setBusca]=useState('');
  const [foco,setFoco]=useState(null);
  const [localizacao,setLocalizacao]=useState(null);
  const [aviso,setAviso]=useState('');
  const estabelecimentos=useMemo(()=>obterEstabelecimentosDoCatalogo(stores),[stores]);
  const encontrados=useMemo(()=>filtrarEstabelecimentos(estabelecimentos,busca),[estabelecimentos,busca]);
  function encontrarMinhaLocalizacao(){
    if(!navigator.geolocation){setAviso('Geolocalização não disponível neste navegador.');return;}
    setAviso('Solicitando permissão de localização...');
    navigator.geolocation.getCurrentPosition(({coords})=>{
      const pos={latitude:coords.latitude,longitude:coords.longitude};
      setLocalizacao(pos);setFoco(pos);
      setAviso('Localização obtida com permissão. Não é armazenada pela aplicação.');
    },(erro)=>{
      setAviso(erro.code===1?'Permissão negada. O mapa continua disponível.':'Não foi possível obter sua localização.');
    },{enableHighAccuracy:false, timeout:12000, maximumAge:60000});
  }
  return <section className="map-section" aria-label="Mapa demonstrativo de estabelecimentos">
    <div className="map-heading">
      <div><span className="eyebrow">MAPA DE ESTABELECIMENTOS</span>
        <h2>Encontre as vitrines no mapa.</h2>
        <p>Exibição de {estabelecimentos.length} lojas fictícias na região de Anápolis. Os pontos e endereços são apenas exemplos.</p>
      </div>
      <button type="button" className="map-locate btn" onClick={encontrarMinhaLocalizacao}><LocateFixed size={17}/> Minha localização</button>
    </div>
    <label className="map-search"><Search size={18} /><input type="search" value={busca} onChange={e=>setBusca(e.target.value)} placeholder="Buscar loja ou categoria" aria-label="Buscar estabelecimento no mapa" /></label>
    {aviso && <p className="map-notice" role="status">{aviso}</p>}
    <div className="map-layout">
      <div className="map-list" aria-label="Resultados do mapa">
        <strong>{encontrados.length} {encontrados.length===1?'estabelecimento':'estabelecimentos'}</strong>
        {encontrados.length===0 ? <p>Nenhuma loja encontrada para esta pesquisa.</p> : <ul>{encontrados.map(loja=><li key={loja.id}>
          <button type="button" onClick={()=>setFoco(loja.localizacao)} title={`Centralizar mapa em ${loja.nomeFantasia}`}>
            <strong>{loja.nomeFantasia}</strong><small>{loja.categoria}</small>
            {localizacao && <small>Distância em linha reta: {formatarDistancia(distanciaKm(localizacao,loja.localizacao))}</small>}
          </button>
          <Link to={`/loja/${loja.id}`}>Ver vitrine</Link>
        </li>)}</ul>}
      </div>
      <div className="map-view" aria-label="Mapa interativo da região de Anápolis">
        <MapContainer center={centroAnapolis} zoom={13} scrollWheelZoom={false} style={{height:'100%',minHeight:390,width:'100%'}}>
          <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {encontrados.map(loja=><Marker key={loja.id} position={[loja.localizacao.latitude,loja.localizacao.longitude]} icon={marcadorLoja}><Popup>
            <strong>{loja.nomeFantasia}</strong><div>{loja.categoria} · loja fictícia</div><Link to={`/loja/${loja.id}`}>Abrir vitrine</Link>
          </Popup></Marker>)}
          {localizacao&& <CircleMarker center={[localizacao.latitude,localizacao.longitude]} radius={9} pathOptions={{color:'#1652bd',fillColor:'#327adf',fillOpacity:0.8}}><Popup>Localização aproximada obtida com permissão.</Popup></CircleMarker>}
          <MovimentoDoMapa destino={foco}/>
        </MapContainer>
      </div>
    </div>
    <p className="map-note"><MapPin size={15}/> Demonstração acadêmica: não representa lojas cadastradas ou disponibilidade em tempo real. O mapa-base precisa de internet.</p>
  </section>;
}
