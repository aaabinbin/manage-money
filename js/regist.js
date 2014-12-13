(function(){
	var regist = {
		apiUrl:'../api/',
		imgUrl:'../img/',

		$email:null,
		$password:null,
		$repassword:null,
		$phone:null,
		$token:null,
		$tokenInfo:null,
		$btn:null,

		init:function(){
			var self = this;
			//initialize DOM
			self.$email = $('#j-email');
			self.$password = $('#j-password');
			self.$repassword = $('#j-repassword');
			self.$phone = $('#j-phone');
			self.$token = $('#j-confirm');
			self.$tokenInfo = self.$token.parent().next().children();
			self.$btn = $('#j-sub-btn1');

			self.bindEvent();
		},

		bindEvent:function(){
			var self = this;

			self.checkInput(self.$email,function(){
				return self.checkEmail(self.$email.val());
			})
			self.checkInput(self.$password,function(){
				return self.checkPassword(self.$password.val());
			})
			self.checkInput(self.$repassword,function(){
				return self.checkRepassword(self.$password.val(),self.$repassword.val());
			})
			self.checkInput(self.$phone,function(){
				return self.checkPhone(self.$phone.val());
			})
			self.$token.focus(function(){
				self.$tokenInfo.css({'visibility':'hidden'});
			}).blur(function(){
				if($(this).val()!=""){
					$(self.$tokenInfo[0]).attr({'src':self.imgUrl+'confirm.png'});
					$(self.$tokenInfo[1]).html("");
				}
				else{
					$(self.$tokenInfo[0]).attr({'src':self.imgUrl+'false.png'});
					$(self.$tokenInfo[1]).html("验证码错误");
				}
				self.$tokenInfo.css({'visibility':'visible'});
			})
			self.$token.next().click(function(){
				self.$phone.trigger('blur');
				if(self.$phone.next().attr('src')==self.imgUrl+"confirm.png"){
					$.ajax({
						url:self.apiUrl+'regist/phone/verify.json',
						type:'post',
						dataType:'json',
						data:{
							phone:self.$phone.val()
						},
						success:function(){

						}
					})
				}
			})
			self.$btn.click(function(){
				var flag = true;
				$('.contain input').each(function(){
					$ele = $(this);
					$ele.trigger('blur');
				});
				$('.contain img').each(function(){
					$ele = $(this);
					if($ele.attr('src')==self.imgUrl+"false.png"){
						flag = false;
					}
				});
				if(flag){
					$.ajax({
						url:self.apiUrl+'regist.json',
						type:'post',
						dataType:'json',
						data:{
							email:self.$emal.val(),
							password:self.$password.val(),
							phone:self.$phone.val(),
							token:self.$token.val()
						},
						success:function(data){
							switch(data.error.code){
								case 0:
									alert("注册成功");
									window.location.href = "index.html";
									break;
								case 2:
									alert("参数不正确");
									break;
								case 10:
									alert("邮箱格式不正确");
									break;
								case 11:
									alert("手机号格式不正确");
									break;
								case 12:
									alert("验证码格式不正确");
									break;
								case 13:
									alert("邮箱已存在");
									break;
								case 14:
									alert("手机号已存在");
									break;
								case 15:
									alert("验证码不正确");
									break;
							}
						}
					})
				}
			})
		},

		checkInput:function($ele,callback){
			var self = this;
			$ele.focus(function(){
				$ele.next().css({'visibility':'hidden'});
				$ele.parent().parent().next().find('.info').html("");
			}).blur(function(){
				var data = callback();
				if(data.result){
					$ele.next().attr({'src':self.imgUrl+'confirm.png'}).css({'visibility':'visible'});
				}
				else{
					$ele.next().attr({'src':self.imgUrl+'false.png'}).css({'visibility':'visible'});
				}
				$ele.parent().parent().next().find('.info').html(data.info);
			});
		},

		checkEmail:function(email){
			var self = this;
			var result = false;
			var info = "";
			if(email!=""){
				$.ajax({
					url:self.apiUrl+"regist/email/exist.json",
					type:'post',
					async:false,
					dataType:'json',
					data:{
						email:email
					},
					success:function(data){
						switch(data.error.code){
							case 0:
								if(data.result.exist=="True"){
									result = true;
								}
								else{
									info = "邮箱已注册";
								}
								break;
							case 2:
								info = "邮箱格式不正确";
						}
					}
				})
			}
			else{
				info = "邮箱不能为空";
			}
			return {
				result:result,
				info:info
			}
		},

		checkPassword:function(password){
			var self = this;
			var result = false;
			var info = "";
			if(password==""){
				info = "密码不能为空";
			}
			else{
				result = true;
			}
			return {
				result:result,
				info:info
			}
		},

		checkRepassword:function(password,repassword){
			var self = this;
			var result = false;
			var info = info;
			if(repassword==""){
				info = "确认密码不能为空";
			}
			else{
				if(password!=repassword){
					info = "两次输入的密码不一致";
				}
				else{
					result = true;
				}
			}
			return {
				result:result,
				info:info
			}
		},

		checkPhone:function(phone){
			var self = this;
			var result = false;
			var info = "";
			if(phone!=""){
				$.ajax({
					url:self.apiUrl+'regist/phone/exist.json',
					type:'post',
					async:false,
					dataType:'json',
					data:{
						phone:phone
					},
					success:function(data){
						switch(data.error.code){
							case 0:
								if(data.result.exist=="True"){
									result = true;
								}
								else{
									info = "手机号已注册";
								}
								break;
							case 2:
								info = "手机号格式不正确";
								break;
						}
					}
				})
			}
			else{
				info = "手机号不能为空";
			}
			return {
				result:result,
				info:info
			}
		}
	}
	regist.init();
})()