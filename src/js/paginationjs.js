import $ from '../templates/paginationjs.hbs';

function simpleTemplating(data) {
    var html = '<ul>';
    $.each(data, function(index, item){
        html += '<li>'+ item +'</li>';
    });
    html += '</ul>';
    return html;
}

$('#pagination-container').pagination({
    dataSource: [1, 2, 3, 4, 5, 6, 7],
    callback: function(data, pagination) {
        var html = simpleTemplating(data).html(), {
            data: data
        });
        $('#data-container').html(html);
    }
})


