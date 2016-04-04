class Forecast extends React.Component {
  render () {
    return (
      <div>
        <div>Weather Data: {this.props.weatherData.name}</div>
      </div>
    );
  }
}

Forecast.propTypes = {
  weatherData: React.PropTypes.object
};
