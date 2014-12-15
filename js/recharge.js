(function(){
	var recharge = {
		apiUrl:'../api/',

		init:function(){
			var self = this;
			self.bindEvent();
		},

		bindEvent:function(){
			var self = this;
			$('#send').click(function(){
				var $btn = $(this);
				$.ajax({
					url:self.apiUrl+'withdraw/phone/verify.json',
					type:'post',
					dataType:'json',
					data:{
						amount:$('#j-amount').val()
					},
					success:function(data){
						switch(data.error.code){
							case 0:
								alert("验证码发送成功");
								$btn.html("重新发送(60)").css({'color':'grey'});
								$btn.unbind('click').click(function(){
									return false;
								});
								var time = function(t){
									setTimeout(function(){
										var content = $btn.html();
										$btn.html(content.replace(/[\d]{1,2}/,t-1));
										if(t>1){
											time(t-1);
										}
										else{
											$btn.html("重新发送").css({'color':'#088ae0'});
											$btn.unbind('click');
											self.bindEvent();
										}
									},1000);
								};
								time(60);
								break;
							case 1:
								alert("请先登录");
								break;
							case 2:
								alert("参数错误");
								break;
							case 10:
								alert("发送验证码失败");
								break;
						}
					}
				})
			})
			$('#confirm').click(function(){
				if($("#j-confirm").val()==''){
					return;
				}
				$.ajax({
					url:self.apiUrl+'withdraw/apply.json',
					type:'post',
					dataType:'json',
					data:{
						amout:$('#j-amount').val(),
						token:$('#j-confirm').val()
					},
					success:function(data){
						switch(data.error.code){
							case 0:
								alert("提交成功");
								break;
							case 1:
								alert("请先登陆")
								break;
							case 2:
								alert("参数错误")
								break;
							case 10:
								alert("提现金额不合法")
								break;
							case 11:
								alert("验证码格式不正确")
								break;
							case 12:
								alert("验证码错误")
								break;
							case 13:
								alert("余额不足")
								break;
							case 14:
								alert("没有设置提现银行卡信息")
								break;
							case 15:
								alert("系统错误")
								break;
						}
					}
				})
			})
		}
	}
	recharge.init();
})()