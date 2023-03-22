var apiclient = (function(){
    return {
        getBlueprintsByAuthor: function(author, callback){
        callback(
            JSON.parse($.ajax({type: 'GET', url: 'blueprints/' + author, async: true}).responseText)
        )},

        getBlueprintByAuthorAndName: function(author, bpname, callback){
        var link = author + "/" + bpname;
        callback(
            JSON.parse($.ajax({type: 'GET', url: 'blueprints/' + link, async: true}).responseText)
        )}
        putBlueprint: function(author, bpname, callback){
        var link = author + "/" + bpname;
                callback(
                    JSON.parse($.ajax({type: 'PUT', url: 'blueprints/' + link, async: true}).responseText)
                )
        }
        postBlueprint: function(callback){
        callback(
            JSON.parse($.ajax({type: 'POST', url: 'blueprints/' + link, async: true}).responseText)
        )}
        deleteBlueprint: function(author, callback){
        callback(
            JSON.parse($.ajax({type: 'DELETE', url: 'blueprints/' + link, async: true}).responseText)
        )}
    }
})();