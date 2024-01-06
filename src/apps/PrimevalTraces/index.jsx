import { useEffect } from 'react';
import PrimevalNavbar from './components/Navbar';
import Map from './components/Map';
import './style.scss';

const PrimevalTraces = ({ appRef }) => {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1";
    document.getElementsByTagName('head')[0].appendChild(meta);
  }, []);

  return (
    <div id="primeval" className="interactable">
      <Map />
    </div>
  )
}

export default PrimevalTraces;
