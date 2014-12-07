$(document).ready(function(){
	$(".j-mail").keyup(function(){
		$(".j-warn td2 div").addClass("hide");
		if($(this).val()!=""){
			$(".j-purchase div").addClass("btncan");
		}else{
			$(".j-purchase div").removeClass("btncan");
		}
	});

	$(".j-purchase").click(function(){
		var email   = $(".j-mail").val();
		$.ajax({
			url:"api/preorder",
			type:'post',
			dataType:'json',
			data:{
				email:email
			},
			success:function(data){
				if(data.errno==0){
					alert("申购成功！");
				}else if(data.errno == 1){
					$(".j-warn .td2 span").text("输入的邮箱格式不正确");
					$(".j-warn .td2 div").removeClass("hide");
				}else if(data.errno == 2){
					$(".j-warn .td2 span").text("抱歉，此邮箱已提交申购。");
					$(".j-warn .td2 div").removeClass("hide");
				}
			}
		});
	});
});