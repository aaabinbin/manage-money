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
                var windowH = $(window).height();
                var bodyH = $(document).height();
                var $title = $('#mainr .title');
                var $label = $('#mainl li').not(":first");
                var h;//导航距离底部高度
                var n=0;//所在版块下标
                if(scroH>=navH){
                    $(".j-mainl").css({"position":"fixed","top":"50px"});
                }
                else if(scroH<navH){
                    $(".j-mainl").css({"position":"static"});
                }
                h = bodyH-scroH-windowH-270
                if(h<0){
                	$(".j-mainl").css({"top":(50+h)+"px"});
                }
                for(i=0;i<$title.length;i++){
                	if($($title[i]).offset().top-scroH-180<0){
                		n = i;
                	}
                }
                $label.removeClass("blue");
                $($label[n]).attr({"class":"blue"});
            });
		}
	}
	Should.init();
})()