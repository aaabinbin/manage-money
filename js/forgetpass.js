var forgetpass1 = {

	apiUrl:'../api/',

	$imgUsername:null,
	$imgRand:null,
	$btnNext:null,

	init:function(){
		var self = this;
		self.$imgUsername = $("#username").parent().parent().next().find("img").css({'visiblity':'hidden'});
		self.$imgRand = $(".check").hide();
		self.$btnNext = $(".block");
		self.bindEvent();
	},

	bindEvent:function(){
		var self = this;
			$("#username").focus(function(){
			self.$imgUsername.hide();
		});
		$("#username").blur(function(){
			var username = $(this).val();
			if(username==""||!self.checkMail(username)){
				self.$imgUsername.show();
				self.$btnNext.attr({'class':'btn'});
			}
			else{
				self.$btnNext.attr({'class':'btnb'});
			}
		});
		self.$btnNext.click(function(){
			var username = $(this).val();				
			var rand = $("#rand").val();

			if($(this).attr('class')=="btnb"){
	            $.ajax({
	                url: self.apiUrl+"account/password/send_reset_email.json",
	                type: "post",
	                dataType: "json",
	                data:{
	                	"email":username,
	                },
	                success: function(data){
	                	switch(data.error.code){
	                		case 0:
	                			window.location.href = "forgetpass2.html";
	                			break;
	                		case 2:
	                			alert("参数错误");
	                			break;
	                		case 10:
	                			alert("账号不存在");
	                			break;
	                	}
	                },
	                error:function(){}
	            });
 			}
       });
	},

	checkMail:function(mail){
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(filter.test(mail)) return true;
		return false;
	}
}

var forgetpass2 = {
	apiUrl:'../api/',

	init:function(){
		var self = this;
		self.bindEvent();
	},

	bindEvent:function(){
		var self = this;
		$('#resent').click(function(){
			$.ajax({
				url:self.apiUrl+'account/password/send_reset_email.json',
				type:'post',
				dataType:'json',
				data:{},
				success:function(){

				}
			})
		})
	}
}

var forgetpass3 = {
	apiUrl:'../api/',

	$password:null,
	$repassword:null,
	$info:null,
	$btn:null,

	init:function(){
		var self = this;
		self.$password = $('#j-password');
		self.$repassword = $('#j-repassword');
		self.$info = $('#check').hide();
		self.$btn = $('.btn');
		self.bindEvent();
	},

	bindEvent:function(){
		var self = this;
		self.$btn.click(function(){
			if(self.$password.val()==self.$repassword.val()){
				$.ajax({
					url:self.apiUrl+'account/password/reset.json',
					type:'post',
					dataType:'json',
					data:{
						new_password:self.$password.val()
					},
					success:function(data){
						switch(data.error.code){
							case 0:
								window.location.href = "forgetpass4.html";
								break;
							case 2:
								alert("参数错误");
								break;
							case 10:
								alert("无效请求");
								break;
							case 11:
								alert("无效请求");
								break;
						}
					}
				})
			}
			else{
				self.$info.show();
			}
		})
	}
}
	
var forgetpass4 = {
	
}



