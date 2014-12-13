
(function(){
	var security = {
		apiUrl:'../api/',

		init: function(){
            this.bindEvent();

		},

		bindEvent:function(){	
			var self = this;	
			//安第一个提交按钮
			$("#j-sub-btn1").click(function(){
				var Img = ["../img/confirm.png","../img/false.png"];
				var _fImg = $("#j-fpassword").parent().parent().find("img");//定位到图片层
				var _nImg = $("#j-npassword").parent().parent().find("img");//定位到图片层
				var _reImg = $("#j-repassword").parent().parent().find("img");//定位到图片层
				self.fpassword();
				self.npassword();
				self.repassword();
				if( ((_reImg).attr("src")==Img[0]) && ((_nImg).attr("src")==Img[0]) && ((_fImg).attr("src")==Img[0]) )
					$.ajax({
						url:self.apiUrl+'password/change.json',
						type:'post',
						dataType:'json',
						data:{
							current_password:$('#j-fpassword').val(),
							new_password:$('#j-npassword').val()
						},
						success:function(data){
							switch(data.error.code){
								case 0:
									alert("修改成功");
									break;
								case 1:
									alert("请先登录");
									break;
								case 2:
									alert("参数错误");
									break;
								case 10:
									alert("当前密码不正确");
									break;
							}
						}
					})
			})
			//当填写密码错误时
			$("#j-fpassword").click(function(){
				$("#j-fpassword").blur(function(){
					self.fpassword();
				})
			})
			//填写新密码时候的图片显示
			$("#j-npassword").click(function(){
				$("#j-npassword").blur(function(){
					self.npassword();
				})
			})
			//填写重复密码时候的图片显示
			$("#j-repassword").click(function(){
				$("#j-repassword").blur(function(){
					self.repassword();
				})
			})
			

			
			$("#j-sub-btn2").click(function(){
				var Img = ["../img/confirm.png","../img/false.png"];
				var _bImg = $("#j-bankcardnum").parent().parent().find("img");//定位到图片层
				var _naImg = $("#j-name").parent().parent().find("img");//定位到图片层
				self.bankcardnum();
				self.name();
				if( ((_bImg).attr("src")==Img[0]) && ((_naImg).attr("src")==Img[0]) )
					$.ajax({
						url:self.apiUrl+'account/bank/bind.json',
						type:'post',
						dataType:'json',
						data:{
							bank_card_id:$('#j-bankcardnum').val(),
							bank_name:$('#j-bank'),
							real_name:$('#j-name')
						},
						success:function(data){
							switch(data.error.code){
								case 0:
									alert("提交成功");
									break;
								case 1:
									alert("没有登陆");
									break;
								case 2:
									alert("参数错误");
									break;
								case 10:
									alert("银行卡格式错误");
									break;
								case 11:
									alert("姓名不匹配");
									break;
							}
						}
					})
			})

			$("#j-bankcardnum").click(function(){
				$("#j-bankcardnum").blur(function(){
					self.bankcardnum();
				})
			})

			$("#j-name").click(function(){
				$("#j-name").blur(function(){
					self.name();
				})
			})

			$("#j-sub-btn3").click(function(){
				var Img = ["../img/confirm.png","../img/false.png"];
				var _fImg = $("#j-fbank").parent().parent().find("img");//定位到图片层
				var _nImg = $("#j-nbank").parent().parent().find("img");//定位到图片层
				var _reImg = $("#j-rebank").parent().parent().find("img");//定位到图片层
				self.fbank();
				self.nbank();
				self.rebank();
				if( ((_reImg).attr("src")==Img[0]) && ((_nImg).attr("src")==Img[0]) && ((_fImg).attr("src")==Img[0]) )
					alert("提交成功");
			})
			//当填写密码错误时
			$("#j-fbank").click(function(){
				$("#j-fbank").blur(function(){
					self.fbank();
				})
			})
			//填写新密码时候的图片显示
			$("#j-nbank").click(function(){
				$("#j-nbank").blur(function(){
					self.nbank();
				})
			})
			//填写重复密码时候的图片显示
			$("#j-rebank").click(function(){
				$("#j-rebank").blur(function(){
					self.rebank();
				})
			})
		},
		/*************第一表************/
		fpassword:function(){//原来密码的验证
			var Img = ["../img/confirm.png","../img/false.png"];
			var formalpassword = $("#j-fpassword").val();
			var _fImg = $("#j-fpassword").parent().parent().find("img");//定位到图片层
			if(formalpassword == ""){
					_fImg.css("visibility","visible");
                    _fImg.attr("src",Img[1]);
				}
				else{
                    _fImg.attr("src",Img[0]);
                }

		},

		npassword:function(){
			var Img = ["../img/confirm.png","../img/false.png"];
			var newpassword = $("#j-npassword").val();
			var repeatpassword = $("#j-repassword").val();
			var _nImg = $("#j-npassword").parent().parent().find("img");//定位到图片层
			var _reImg = $("#j-repassword").parent().parent().find("img");//定位到图片层
			if(newpassword != ""){
				_nImg.attr("src",Img[0]);
				_nImg.css("visibility","visible");
				if (repeatpassword == "") {
					_reImg.css("visibility","hidden");
				}
				else{
					if(repeatpassword == newpassword){
						_reImg.attr("src",Img[0]);
						_reImg.css("visibility","visible");
					}
					else{
						_reImg.attr("src",Img[1]);
						_reImg.css("visibility","visible");
					}
				}	
			}
			else{
				_nImg.css("visibility","visible");
				_nImg.attr("src",Img[1]);
			}
		},

		repassword:function(){
			var Img = ["../img/confirm.png","../img/false.png"];
			var newpassword = $("#j-npassword").val();
			var repeatpassword = $("#j-repassword").val();
			var _reImg = $("#j-repassword").parent().parent().find("img");//定位到图片层
				if(repeatpassword != ""){
					if(repeatpassword == newpassword){
						_reImg.attr("src",Img[0]);
						_reImg.css("visibility","visible");
					}
					else{
						_reImg.attr("src",Img[1]);
						_reImg.css("visibility","visible");
					}
				}
				else{
					_reImg.attr("src",Img[1]);
					_reImg.css("visibility","visible");

				}
		},

/*************第二个表***************/
		//判断银行卡号是否为空
		bankcardnum:function(){
			var Img = ["../img/confirm.png","../img/false.png"];
			var bankcardnum = $("#j-bankcardnum").val();
			var _bImg = $("#j-bankcardnum").parent().parent().find("img");//定位到图片层
			if(bankcardnum == ""){
				_bImg.css("visibility","visible");
				_bImg.attr("src",Img[1]);
			}
			else{
				_bImg.attr("src",Img[0]);
				_bImg.css("visibility","visible");
			}
		},
		//判断姓名是否为空
		name:function(){
			var Img = ["../img/confirm.png","../img/false.png"];
			var name = $("#j-name").val();
			var _naImg = $("#j-name").parent().parent().find("img");//定位到图片层
			if(name == ""){
				_naImg.css("visibility","visible");
				_naImg.attr("src",Img[1]);
			}
			else{
				_naImg.attr("src",Img[0]);
				_naImg.css("visibility","visible");
			}
		},

/*************第三表************/
		fbank:function(){//原来密码的验证
			var Img = ["../img/confirm.png","../img/false.png"];
			var formalbank = $("#j-fbank").val();
			var _fImg = $("#j-fbank").parent().parent().find("img");//定位到图片层
			if(formalbank != ""){
				_fImg.css("visibility","visible");
				_fImg.attr("src",Img[0]);
					
			}
			else{
				_fImg.css("visibility","visible");
				_fImg.attr("src",Img[1]);
			}

		},

		nbank:function(){
			var Img = ["../img/confirm.png","../img/false.png"];
			var newbank = $("#j-nbank").val();
			var repeatbank = $("#j-rebank").val();
			var _nImg = $("#j-nbank").parent().parent().find("img");//定位到图片层
			var _reImg = $("#j-rebank").parent().parent().find("img");//定位到图片层
			if(newbank != ""){
				_nImg.attr("src",Img[0]);
				_nImg.css("visibility","visible");
				if (repeatbank == "") {
					_reImg.css("visibility","hidden");
				}
				else{
					if(repeatbank == newbank){
						_reImg.attr("src",Img[0]);
						_reImg.css("visibility","visible");
					}
					else{
						_reImg.attr("src",Img[1]);
						_reImg.css("visibility","visible");
					}
				}	
			}
			else{
				_nImg.attr("src",Img[1]);
				_nImg.css("visibility","visible");
			}
		},

		rebank:function(){
			var Img = ["../img/confirm.png","../img/false.png"];
			var newbank = $("#j-nbank").val();
			var repeatbank = $("#j-rebank").val();
			var _reImg = $("#j-rebank").parent().parent().find("img");//定位到图片层
				if(repeatbank != ""){
					if(repeatbank == newbank){
						_reImg.attr("src",Img[0]);
						_reImg.css("visibility","visible");
					}
					else{
						_reImg.attr("src",Img[1]);
						_reImg.css("visibility","visible");
					}
				}
				else{
					_reImg.attr("src",Img[1]);
					_reImg.css("visibility","visible");
				}
		}

	}
	security.init();
})()

