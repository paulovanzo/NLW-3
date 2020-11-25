import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapIcon from '../utils/mapicon'
import mapMakerImg from '../images/map-marker.svg'

import '../styles/pages/orphanage-map.css';
import api from '../services/api';

function OrphanageMap (){

    useEffect(() => {
        api.get('orphanages').then(res => {
            console.log(res)
        })
    }, [])

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMakerImg} alt="Happy"/>


                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>

                </header>

                <footer>
                    <strong>Mossoró</strong>
                    <span>Rio Grande do Norte</span>
                </footer>
            </aside>

            <Map
                center = {[-5.210112,-37.3358592]}
                zoom = {14}
                style = {{ width: "100%", height: "100%", }}
            >
                <TileLayer url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                {/*<TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v1/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>*/}

                <Marker
                    icon = {mapIcon}
                    position = { [-5.210112,-37.3358592] }
                >
                
                    <Popup closeButton={false} minWidth={240} maxWidth={240} className='map-popup'>

                        Lar das meninas

                        <Link to="/orphanages/1">
                            <FiArrowRight size={20} color="#FFF"/>
                        </Link>
                        
                    </Popup>

                </Marker>
            </Map>


            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF"/>
            </Link>

        </div>
    )
}

export default OrphanageMap;