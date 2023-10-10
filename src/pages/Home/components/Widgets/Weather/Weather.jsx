import { WbSunny } from "@mui/icons-material";
import "./Weather.scss";

const WeatherWidget = () => {
  return (
    <div className="widget weather">
      <div className="weather-top">
        <div>
          <div className="weather-location">Basingstoke</div>
          <div className="weather-temp">26°</div>
        </div>
        <div className="weather-icon">
          <WbSunny />
        </div>
      </div>

      <div className="weather-content">
        {/* Example hourly forecast */}
        {['12PM', '1PM', '2PM', '3PM'].map((hour, idx) => (
          <div key={idx} className="hourly-forecast">
            <div className="hour">{hour}</div>
            <div className="icon">
              <WbSunny fontSize="small" />
            </div>
            <div className="temp">25°</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
