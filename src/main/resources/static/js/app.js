var apimock = apimock;

var app = (function (){
    var author;
    var blueprintName;
    var totalPoints;
    var fun=function(list){
            blueprints = list;
        }
    function getName() {
            $("#name").text(author + "'s " + "blueprints:");
        }


     function getNameAuthorBlueprints() {
        author = $("#author").val();
        apimock.getBlueprintsByAuthor(author,authorData);

     }
     function getBluePrints(){
             authorName();
             getBluePrintsByNameAndAuthor();
             updatePoints();
         }


     var authorData = function( data) {
         $("#table tbody").empty();
         if (data === undefined) {
             alert("No existe el autor");
             $("#name").empty();
             $("#points").text("Total Points");
             $("#nameblu").empty();
         } else {
             getName();
             const datanew = data.map((elemento) => {
                 return {
                     name: elemento.name,
                     puntos: elemento.points.length
                 }
             });

             datanew.map((elementos) => {
                 $("#table > tbody:last").append($("<tr><td>" + elementos.name + "</td><td>" + elementos.puntos.toString() +
                     "</td><td>" + "<button  id=" + elementos.name + " onclick=app.getBlueprintByAuthorAndName(this)>open</button>" + "</td>"));
             });

             const totalPuntos = datanew.reduce((suma, {puntos}) => suma + puntos, 0);

             $("#points").text("Total user points: " + totalPuntos);
            }
         }
         function updatePoints(){
                 var points = blueprints.map(function(bp){
                     return bp.points.length;
                 })
                 totalPoints = points.reduce(function(a,b){return a+b;});
                 document.getElementById('totalPoints').innerHTML = totalPoints;
             }

         function getBlueprintByAuthorAndName() {
                 $("table tbody").empty();
                         apimock.getBlueprintsByAuthor(author,fun);
                         bps = blueprints;
                         bps2 = blueprints.map(function(bp){;
                             if(bp.points.length==1){
                                 return {nombre:bp.name, puntos: bp.points[0].x + "," + bp.points[0].y};
                             }
                             else if(bp.points.length==2){
                                 return {nombre:bp.name, puntos: bp.points[0].x + "," + bp.points[0].y + "|||" + bp.points[bp.points.length-1].x + "," + bp.points[bp.points.length-1].y};
                             }
                             else{
                                 return {nombre:bp.name, puntos: bp.points.length};
                             }
                         })
                         var bluePrintTable = bps2.map(function(plano){
                             var columna = "<tr><td align=\"center\" id=\""+plano.nombre+"\">"+plano.nombre+"</td><td align=\"center\">"+plano.puntos+"</td><td><button onclick=\"Blueprint.drawBlueprint("+plano.nombre+".id)\">Open</button></td></tr>";
                             $("table tbody").append(columna);
                             return columna;
                         });
             }

         function canvasDraw(data) {
                 const puntos = data.points;
                 var c = document.getElementById("myCanvas");
                 var ctx = c.getContext("2d");
                 ctx.clearRect(0, 0, c.width, c.height);
                 ctx.restore();
                 ctx.beginPath();
                 for (let i = 1; i < puntos.length; i++) {
                     ctx.moveTo(puntos[i - 1].x, puntos[i - 1].y);
                     ctx.lineTo(puntos[i].x, puntos[i].y);
                     if (i === puntos.length - 1) {
                         ctx.moveTo(puntos[i].x, puntos[i].y);
                         ctx.lineTo(puntos[0].x, puntos[0].y);
                     }
                 }
                 ctx.stroke();
             }
     function setBluePrints(blueprints){
             this.blueprints = blueprints;
         }
     return{
        getBlueprintByAuthorAndName:getBlueprintByAuthorAndName,
        getNameAuthorBlueprints: getNameAuthorBlueprints
     }
     function createBlueprints(){
             authorName();
             if(author == ''){
                 alert("No ingreso autor");
                 return;
             }
             var bpname = prompt("blueprint: ", "New blueprint");
             if (bpname == '' || bpname == null){
                 alert("No ingreso ningun nombre");
                 return;
             }
             var newbp = {author: author, name: bpname, points: []};
             apimock.postBlueprint( JSON.stringify(bpnew), readInputData);
         }
     function deleteBlueprints(){
             canvas.width = canvas.width;
             apimock.deletePrint($("#author").val(),ID);
             $("table tbody").remove();
             getBluePrintsByNameAndAuthor();
         }
     function saveBlueprints(){
             console.log($("#author").val());
             console.log(ID);
             console.log(JSON.stringify(blueprints.points));
             apimock.updateBlueprint($("#author").val(),ID,JSON.stringify(blueprints.points),fun);
         }
     function repaint(ID,newPoint){
             bps.points.push(newPoint);
             console.log(bps.points)
             drawBlueprint(bps.name);
         }
     return{
             getBluePrints : getBluePrints,
             setAuthor: setAuthor,
             setBluePrints: setBluePrints,
             drawBlueprint : drawBlueprint,
             saveBlueprints : saveBlueprints,
             deleteBlueprints : deleteBlueprints,
             createBlueprints : createBlueprints,
             init:function(){
                 canvas = $("#canvas")[0];
                 ctx = canvas.getContext("2d");
                 let rect = canvas.getBoundingClientRect();
                 if(window.PointerEvent){
                     canvas.addEventListener("pointer", function(event){
                         var newPoint = {x:event.clientX-rect.left, y:event.clientY-rect.top-10};
                         repaint(ID,newPoint);
                     });
                 }
             }
         }
})();