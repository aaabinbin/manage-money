$(function(){
	var height = $(window).width();
	var mpadding = height/10;
	var fpadding = height/13;

	$(function(){
		$(".main").css("padding-top",mpadding+"px"); 
		$(".foot").css("padding-top",fpadding+"px"); 
	})
})