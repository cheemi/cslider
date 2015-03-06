/*
Author: Cheemi
Blog URL: http://cheemi.com
*/
(function($,window,document,undefined){
	var Slider=function(){
		 this.el,this.current,this.items,this.setIntervalID,this.width,this.height;
		 var _=this;
		this.opts={
			show:"fade",//目前只有fade，和slide两种
			delay:1000,
			auto:true,//是否自动播放
			loop:true,//是否循环
			fade:200,//当show="fade"的时候，下一张图片出现时延迟时间。
			pagination:false,//是否分页
			hoverpause:false//鼠标停在图片上的时候，不滑动
			};	
		this.init=function(el,opts){
			this.current=1;
			this.el=el;
			this.ul=_.el.find('ul');
			this.items=$(this.el).find("ul").children("li");
			this.opts=$.extend(this.opts,opts);	
			_.width=_.el.width();
			_.ul.css("width",_.width*_.items.length+"px");
			
			_.items.first().show();
			 
			_.opts.pagination&&_.dots();
			_.opts.auto&&this.start();
			_.opts.hoverpause&&this.el.hover(this.stop,this.start);
			return _;
		};
		this.move=function(index){
			 
			if(!_.items.eq(index).length) index=0;
			if(index>=_.items.length) index=0;
			
			if(_.opts.show=="fade"){
			  _.items.filter(":not("+index+")").hide();
			  _.items.eq(index).fadeIn(_.opts.fade);
			}else if(_.opts.show=="slide"){
			  _.el.find('ul').animate({
				  left:'-'+index*_.width+'px',
				  position:'relative'},_.opts.fade);
			  
			}
			 if(_.opts.pagination){
					_.el.find('.dot:eq('+index+')').addClass("active").siblings().removeClass('active');  
			  }
			  _.current=index+1;
			return _;
		};
		this.start=function(){
			
			  _.setIntervalID=setInterval(function(){_.move(_.current);},_.opts.delay);	
			return _;
		};
		this.dots=function(){
			 
			var html='<ol class="dots">';
			_.items.each(function(index){
				html+='<li class="dot '+(index<1?"active":"")+'"></li>';	
			});
			html+='</ol>';
			_.el.append(html).find('.dot').click(function(){
				_.move($(this).index());	
			});
		};
		this.stop=function(){
			
			_.setIntervalID=clearInterval(_.setIntervalID);	
			return _;
		}
	};
	$.fn.slider=function(o){
		this.each(function(index){
		var me=$(this);
	    (new Slider).init(me,o);
		
		});
		
	};
})(jQuery,window,document);