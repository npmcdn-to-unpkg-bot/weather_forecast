$(document).ready(function() {
// Get your data source
    var dataSourceZipcodes = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        //prefetch: 'geo/all',
        remote: {
            url: 'geo/lookup?type=zipcode&query=%QUERYSTRING',
            wildcard: '%QUERYSTRING'
        }
    });

    var dataSourceCities = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        //prefetch: 'geo/all',
        remote: {
            url: 'geo/lookup?type=city&query=%QUERYSTRING',
            wildcard: '%QUERYSTRING'
        }
    });

    var dataSourceStates = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        //prefetch: 'geo/all',
        remote: {
            url: 'geo/lookup?type=state&query=%QUERYSTRING',
            wildcard: '%QUERYSTRING'
        }
    });

// initialize your element
    var $typeahead = $('#search-box .typeahead').typeahead(
        {
            highlight: true
        },
        {
            display: 'zipcode',
            name: 'zipcodes',
            source: dataSourceZipcodes,
            limit: 10,
            templates: {
                /*empty: [
                    '<div class="empty-message">',
                    'No zipcodes found',
                    '</div>'
                ].join('\n'),*/
                suggestion: function(data) {
                    var result = '<div>';
                    if (data.zipcode) {
                        result +=  data.zipcode + ', ';
                    }
                    result += data.city + ', ' + data.state + '</div>';
                    return result;
                },
                header: '<h3 class="suggestion-heading">Zipcodes</h3>'
            }
        },
        {
            display: 'city',
            name: 'cities',
            source: dataSourceCities,
            templates: {
                /*empty: [
                    '<div class="empty-message">',
                    'No cities found',
                    '</div>'
                ].join('\n'),*/
                suggestion: function(data) {
                    var result = '<div>';
                    if (data.zipcode) {
                        result += data.zipcode + ', ';
                    }
                    result += data.city + '</div>';
                    return result;
                },
                header: '<h3 class="suggestion-heading">Cities</h3>'
            }
        },
        {
            display: 'state',
            name: 'states',
            source: dataSourceStates,
            templates: {
                /*empty: [
                    '<div class="empty-message">',
                    'No states found',
                    '</div>'
                ].join('\n'),*/
                suggestion: function(data) {
                    var result = '<div>';
                    if (data.zipcode) {
                        result += data.zipcode + ', ';
                    }
                    result += data.state + '</div>';
                    return result;
                },
                header: '<h3 class="suggestion-heading">States</h3>'
            }
        }
    ).bind("typeahead:selected", function(obj, datum, name) {
        if (datum.zipcode) {
            // forecast by zipcode
        } else if (datum.city) {
            // forecast by city
        } else if (datum.state) {
            // forecast by state
        }
    });

    /*$('#search-box .typeahead').typeahead({
     hint: true,
     highlight: true,
     minLength: 1
     },
     {
     source: dataSource
     }
     );*/

});
