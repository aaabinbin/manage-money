(function (){
	var Should = {
		init:function(){
			this.bindEvent();
		},
		bindEvent:function(){

			$(".j-nav")
			.click(function(){
				var _this = $(this);
				_this.parent().addClass("blue");
				_this.parent().siblings().removeClass("blue");
			})

			var navH = $(".j-mainl").offset().top-50;
            $(window).scroll(function(){
                var scroH = $(this).scrollTop();
                if(scroH>=navH){
                    $(".j-mainl").css({"position":"fixed","top":"50px"});
                }
                else if(scroH<navH){
                    $(".j-mainl").css({"position":"static"});
                }
            })
		}
	}
	Should.init();
})()