
var Forecast = React.createClass({
    getInitialState: function () {
        return {
            searchParams: {},
            searchResult: {}
        };
    },

    parseParams: function (data) {
        var params = {};

        if (data.zipcode) {
            // forecast by zipcode
            params = {
                area_type: 'zipcode',
                zipcode: data.zipcode
            };
        } else if (data.city && data.state) {
            // forecast by city
            params = {
                area_type: 'city',
                city: data.city,
                state: data.state
            };
        } else if (data.state) {
            // forecast by state
            params = {
                area_type: 'state',
                state: data.state
            };
        }

        return params;
    },

    convertDate: function(timestamp, format = 'short') {
        var monthNames = [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ];

        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

        var date = new Date(timestamp * 1000);

        if ('full' == format) {
            return days[date.getDay()] + ', ' + monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
        } else {
            return monthNames[date.getMonth()] + ' ' + date.getDate();
        }
    },

    performSearch: function (params) {
        this.serverRequest = $.get(this.props.source, this.parseParams(params), function (result) {
            this.setState({
                searchResult: result
            });
        }.bind(this));
    },


    render: function () {
        var searchResult = this.state.searchResult;
        var convertDate = this.convertDate; // workaround (this.convertDate() wasn't working inside return <div>...</div>
        if (searchResult.hasOwnProperty('data')) {
            return (
                <div className="row">
                    <div className="col-xs-12">
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="page-header">
                                    <h1>Weather forecast from {convertDate(searchResult.data[0].time)} to {convertDate(searchResult.data[1].time)}</h1>
                                    <h1><small>{searchResult.summary}</small></h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                        {searchResult.data.map(function(dayData, i) {
                            var style = (i == 0) ? "panel panel-success" : "panel panel-primary";
                            return <div className="col-md-4" key={i}>
                                <div className={style}>
                                    <div className="panel-heading">
                                        <h3 className="panel-title">{convertDate(dayData.time, 'full')}</h3>
                                    </div>
                                    <div className="panel-body">
                                        <p>{dayData.summary}</p>
                                        <p><strong>Min:</strong> {Math.round(dayData.temperatureMin)} °C</p>
                                        <p><strong>Max:</strong> {Math.round(dayData.temperatureMax)} °C</p>
                                    </div>
                                    <div className="panel-footer">
                                        <small><strong>Wind:</strong> {dayData.windSpeed} mps <strong> - Humidity:</strong> {dayData.humidity * 100} % - <strong>Pressure:</strong> {dayData.pressure} hPa</small>
                                    </div>
                                </div>
                            </div>
                        })}
                        </div>
                    </div>
                </div>


            );
        } else {
            return (
                <div></div>
            );
        }
    }
});


