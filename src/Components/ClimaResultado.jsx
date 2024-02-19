const ClimaResultado = ({ clima }) => {
    
  
    if (!clima) return null;
    return (
        <div className="transparente p-3 rounded-4 align-self-center my-lg-3">
        <h2>Resultado del Clima</h2>
        <p>Ciudad: {clima.name}</p>
        <p>País: {clima.sys.country}</p>
        <p>Temperatura: {clima.main.temp} °C</p>
        <p>Descripción: {clima.weather[0].description}<img src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}.png`}></img></p>
      </div>
    );
};
    

export default ClimaResultado;