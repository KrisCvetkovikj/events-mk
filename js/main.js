$(document).ready( function() {
    $('.dates').val(new Date().toISOString().slice(0,10).replace(/-/g,"-"));
});
