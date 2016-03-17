$(document).ready(function() {
// Get your data source
    var dataSource = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: 'geo/all',
        remote: {
            url: 'geo/lookup?query=%QUERYSTRING',
            wildcard: '%QUERYSTRING'
        }
    });

// initialize your element
    var $typeahead = $('#search-box .typeahead').typeahead(null, {
        display: 'city',
        source: dataSource,
        limit: 10,
        templates: {
            empty: [
                '<div class="empty-message">',
                'unable to find any location that match the current query',
                '</div>'
            ].join('\n'),
            suggestion: function(data) {
                var result = '<div>';
                if (data.zipcode) {
                    result += '<strong>' + data.zipcode + '</strong>, ';
                }
                result += '<strong>' + data.city  + '</strong>, <strong>' + data.state + '</strong>(state)</div>';
                return result;
            }
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
