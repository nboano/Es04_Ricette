// Tooltips
$('.tip').each(function () {
    var options = {}
    if ($('#' + $(this).data('tip')).length > 0) {
        options = {
            html: true,
            title: $('#' + $(this).data('tip')).html()
        };
    } else {
        options = {
            html: false,
            title: $(this).data('tip')
        };
    }
    var tp = new bootstrap.Tooltip(this, options);
    //$(this).tooltip(
    //	);
});