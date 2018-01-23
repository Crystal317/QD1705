define(["jquery"], function($){
	// alert(1)
	//加载的三张图片的数据
	function three(){
		$.ajax({
			url:"../data/three.json",
			type:"get",
			success:function(res){
				
				var html="";
				for(var i=0;i<res.length;i++){
					html += `<p><img src="${res[i].pic}"></p>`
										
				}
				$(".three").html(html);
			}
		});
		return "加载完成了"
	}

	//加载的机器人数据
	function smart(){
			$.ajax({
				url:"../data/smart.json",
				type:"get",
				success:function(res){
					var html="";
					for(var i = 0; i < res.length; i++){
						html+=`<div class="smart">
								
										<a href="">
											<img class="animation"src="${res[i].name}" alt="">
											<dl>
												<dt>${res[i].title}</dt>
												<dt>${res[i].dsc}</dt>
											</dl>
											<span class="span-bb">${res[i].price}</span>
										</a>		
									</div>`
					}
					
					$(".smart-box").html(html)
				}

			})
			return "加载完成了"
		}
	//加载的手机数据
	function phone(){
		//加载的手机

			$.ajax({
				url:"../data/phone1.json",
				type: "GET",
				success:function(res){
					var html ="";
					for(var i =0;i<res.length;i++){
						html += `<div class="phone">
									<a href="">
										<img class="animation" src="${res[i].name}" alt="">
										<dl>
											<dt>${res[i].title}</dt>
											<dd>${res[i].dsc}</dd>
										</dl>
										<span>${res[i].price}</span>
									</a>
								</div>`;			
					}
					$(".phone-mid").html(html);
				}

			})
			return "加载完成了"

	}
	function peijian(){
		//加载配件

			$.ajax({
				url:"../data/peijian.json",
				type: "GET",
				success:function(res){
					var html ="";
					for(var i =0;i<res.length;i++){
						html += `<div class="phone">
									<a href="">
										<img class="animation" src="${res[i].name}" alt="">
										<dl>
											<dt>${res[i].title}</dt>
											<dd>${res[i].dsc}</dd>
										</dl>
										<span>${res[i].price}</span>
									</a>
								</div>`;			
					}
					$(".peijian-box").html(html);
				}

			})
			return("加载完成了");

	}
	
	//左边的盒子
	function jzsh_le(){
		$.ajax({
			url:"..data/jzsh-le.json",
			type:"get",
			success:function(res){
				
					html = "http://www.doov.com.cn/upload/image/201608/8b666cf7-4d88-41c6-85b4-f9f2ff161dd7.jpg";
				
				$("jzsh-le").html(html);
			}
		})
		return("加载完毕");
	}
	//右面的盒子

	/*function jzsh_ri(){
		$.ajax({
			url:"..data/jzsh-ri.json",
			type:"get",
			success:function(res){
				var html="";
				for(var i = 0;i<res.length;i++){
					html += `
									
									<img class="animation"src="${res[i].name}" alt="">
									<a href="">
									<dl>
										<dt>${res[i].title}</dt>
										<dd>${res[i].dsc}</dd>
									</dl>
									<span class="span-bb">${res[i].price}</span>
									</a>
									
							`
				}
				$(".jzsh-ri-a").html(html);
			}
		})
		return("加载完成了")
	}
*/




	

	
	return {
		phone:phone,
		smart:smart,
		peijian:peijian,
		three:three,
		jzsh_le:jzsh_le
		// jzsh_ri:jzsh_ri
	}	
		
})





/*alert(JSON.stringify([{pic:"http://www.doov.com.cn/upload/image/201711/d891b3b4-38a2-494d-a96a-10d0c602ddac.jpg"},
	{pic:"http://www.doov.com.cn/upload/image/201709/5b377521-c308-4853-8c51-3d3df486990a.jpg"},

	{pic:"http://www.doov.com.cn/upload/image/201612/de788019-6756-4a94-8b0c-0df511cf8e13.jpg"}]));*/





/*alert(JSON.stringify([
			{name:"http://www.doov.com.cn/upload/image/201608/67814b2d-9e65-4bb9-acd0-546abfeb6922.png", 
			title:"小朵多媒体音响",
			dsc: "超人气最新萌宠",
			price: "￥29.90"},

			{name:"http://www.doov.com.cn/upload/image/201512/f97390b3-dc77-4891-80df-b4301f215a13.png", 
			title:"音乐耳机",
			dsc: "超低音环绕",
			price: "￥49.00"}
			

			]));
*/


/*alert(JSON.stringify([{name:"http:www.doov.com.cn/upload/image/201608/8b666cf7-4d88-41c6-85b4-f9f2ff161dd7.jpg"}]))*/




		
		