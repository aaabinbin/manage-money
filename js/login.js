$(document).ready(function(){
	var apiUrl = "../api/";
	$("#j-log-btn").click(function(){
	    var username = $("#j-user").val();
	    var pass = $("#j-password").val();
	    if (!(username != "" && pass != "" && username != "用户名" && pass != "密码")) {
	        alert("请填写用户名或密码");
	    } else {
	        $.ajax({
	            url: apiUrl+"login.json",
	            data: {
	                username: username,
	                pass: pass
	            },
	            dataType: "json",
	            type: "post",
	            error: function () {
	            },
	            success: function (data) {
	                switch(data.error.code){
	                    case 0:
	                        alert("登录成功");
	                        window.location.href = data.result.next;
	                        break;
	                    case 10:
	                        alert("账号或密码错误");
	                        break;
	                    case 11:
	                        alert("连续失败次数过多，请一个小时后再试");
	                        break;
	                }
	            }
	        });
	    }
	});
});