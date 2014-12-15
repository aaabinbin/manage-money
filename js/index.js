/**
 * Created by wjw on 2014/11/22.
 */
(function(){
    var Index = {

        apiUrl:"../api/",
        hasBind:0,
        productLen:3,
        incomeTpl:
        [
            '<span class="num1"><%= Item.last_profit %></span>',
            '<span class="num2"><%= Item.remainder %>份</span>',
            '<span class="num3"><%= Item.price %>元/份</span>',

        ].join(""),
        init:function(){
            this.getData();
            this.bindEvent();
        },
        bindEvent:function(){
            var self = this;
            if(!Util.hasAttrSupport("placeholder")){
                $("#j-user").val("用户名").click(function(){
                    if($(this).val()=="用户名"){
                        $(this).val("");
                    }
                }).blur(function(){
                    if($(this).val()==""){
                        $(this).val("用户名");
                    }
                });
                $("#j-password").val("密码").click(function(){
                    if($(this).val()=="密码"){
                        $(this).val("");
                    }
                }).blur(function(){
                    if($(this).val()==""){
                        $(this).val("密码");
                    }
                });;
            }
            $("#j-password").keydown(function(event){
                //键盘监听回车
                if(event.which == "0XD" || event.keyCode==13){
                    $('#j-log-btn').trigger('click');
                    return false;
                }
            });
            $("#j-log-btn").click(function(){
                var username = $("#j-user").val();
                var pass = $("#j-password").val();
                if (!(username != "" && pass != "" && username != "用户名" && pass != "密码")) {
                    alert("请填写用户名或密码");
                } else {
                    $.ajax({
                        url: self.apiUrl+"login.json",
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
            $(".cathectic p").click(function(){
                var num = $(this).parent().parent().prev('.j-money').find('input').val();
                if(num<0.01){
                    return false;
                }

                $product = $(this).closest(".halei");
                var product = $product.find(".title span").attr('productCode');
                var amount = $product.find(".money .num4 input").val();

                if(amount!=""){
                    $.ajax({
                        url:self.apiUrl+'order.json',
                        type:'post',
                        dataType:'json',
                        data:{
                            product:product,
                            amount:amount
                        },
                        success:function(data){
                            switch(data.error.code){
                                case 0:
                                    alert("购买成功");
                                    break;
                                case 1:
                                    window.location.href="../login.html";
                                    break;
                                case 2:
                                    alert("参数错误");
                                    break;
                                case 10:
                                    alert("产品不存在");
                                    break;
                                case 11:
                                    alert("数量格式错误");
                                    break;
                                case 12:
                                    alert("剩余份数不足");
                                    break;
                                case 13:
                                    alert("余额不足");
                                    break;
                                case 14:
                                    alert("系统错误");
                                    break;
                            }
                        }
                    })
                }
                else{
                    alert("分数不能为空");
                }
            });

            $(".j-money").keyup(function(){
                var num = $(this).find('input').val();
                if(num<0.01){
                    return false;
                }
                var price = $(this).find('.j-num5').text();
                var all = num*price;
                $(this).find(".j-num6").text(all);
            });
        },

        getData:function(){
            var self = this;
            $.ajax({
                //url:"../js/indexdata.json",
                url:self.apiUrl+"index/product/info.json",
                data:{},
                dataType:"json",
                type:"get",
                error:function(){
                    console.log("error");
                },
                success:function(data) {
                    self.renderPage(data);
                }
            });
        },
        renderPage:function(data){
            var self = this;
            var $income = $("#halei .j-income_num");
            for(var i =0;i<this.productLen;i++){
                $income.eq(i).append(Util.tmpl(self.incomeTpl,{Item:data.product_info[i]}));
                $income.parent().find(".title span").eq(i).attr('productCode',data.product_info[i].product);
                $income.closest(".halei").find(".j-num5").eq(i).html(data.product_info[i].price);

                var idName ='graph'+parseInt(i+1);
                self.makeTable(data.product_info[i].history_profit,idName);
            }
        },
        makeTable:function(arr,id){
            var myData = new Array();
            for(i=0;i<arr.length;i++){
                myData[i] = new Array(arr[i]['date'],arr[i]['profit']);
            }
            var myChart = new JSChart(id, 'line');
            myChart.setDataArray(myData);
            myChart.setTitleFontSize(11);
            myChart.setAxisNameX('天');
            myChart.setAxisNameY('元');
            myChart.setAxisColor('#088ae0');
            myChart.setAxisValuesColor('#088ae0');
            myChart.setAxisPaddingLeft(35);
            myChart.setAxisPaddingRight(10);
            myChart.setAxisPaddingTop(30);
            myChart.setAxisPaddingBottom(35);
            //myChart.setAxisValuesDecimals(1);
            //myChart.setAxisValuesNumberX(22);
            myChart.setShowXValues(false);
            myChart.setGridColor('#088ae0');
            myChart.setLineColor('#088ae0');
            myChart.setLineWidth(2);
            myChart.setFlagColor('#088ae0');
            myChart.setFlagRadius(4);
            for(var i=0;i<arr.length;i++) {
                myChart.setTooltip([arr[i][0], arr[i][1]]);
                myChart.setLabelX([arr[i][0], arr[i][0]]);
            }

            myChart.setSize(294, 170);
            myChart.draw();
        }
    }
    Index.init();
})()