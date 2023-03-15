//@author hcadavid

apimock=(function(){

	var mockdata=[];

	mockdata["johnconnor"]=	[
	{author:"johnconnor","points":[{"x":150,"y":120},{"x":215,"y":115}],"name":"house"},
	{author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"},
	{author:"johnconnor","points":[{"x":34,"y":76},{"x":190,"y":71}],"name":"Test"},
	{author:"johnconnor","points":[{"x":370,"y":210},{"x":152,"y":212}],"name":"Test2"}];

	mockdata["maryweyland"]=[
	{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"},
	{author:"maryweyland","points":[{"x":120,"y":120},{"x":115,"y":125}],"name":"Test3"},
	{author:"maryweyland","points":[{"x":130,"y":111},{"x":125,"y":135}],"name":"Test4"}];

    mockdata["david"]=	[{author:"david","points":[{"x":180,"y":150},{"x":115,"y":120}],"name":"test1"}]
	mockdata["stefania"]=	[{author:"stefania","points":[{"x":18,"y":15},{"x":195,"y":140}],"name":"test2"}]
	return {

		getBlueprintsByAuthor:function(authname,callback){

			callback(
				mockdata[authname]
			);
		},

		getBlueprintByAuthorAndName:function(authname,bpname,callback){

			callback(
				mockdata[authname].find(function(e){return e.name===bpname})
			);
		}
	}

})();