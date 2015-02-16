/*
jQuery Waypoints - v2.0.3
Copyright (c) 2011-2013 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/jquery-waypoints/blob/master/licenses.txt
*/
function startSlides(t){$(".slideshow").length>0&&t.responsiveSlides({speed:500,pager:!0,nav:!0,pause:!0,pauseControls:!0,maxwidth:900,namespace:"centered-btns"})}function goPresent(t){if($("body").addClass("present"),!($(".centered-btns").length>0)&&$(".slideshow").length>0&&($(".slideshow").waypoint("destroy"),startSlides($(".slideshow"))),$("html").css("background-color","#000"),"ontouchstart"in document.documentElement){for(var e=document.getElementsByTagName("a"),n=0;n<e.length;n++)e[n].onclick=function(){return window.location=this.getAttribute("href"),!1};$.getScript("../assets/js/fastclick.js",function(){FastClick.attach(document.body)}),$("body").append('<span class="toptouch"></span><span class="lefttouch"></span><span class="righttouch"></span><span class="bottomtouch"></span><span class="tlcornertouch"></span><span class="trcornertouch"></span>'),$(".toptouch").click(function(){$(document).trigger({type:"keydown",which:13,keyCode:38})}),$(".lefttouch").click(function(){$(document).trigger({type:"keydown",which:13,keyCode:37})}),$(".righttouch").click(function(){$(document).trigger({type:"keydown",which:13,keyCode:39})}),$(".bottomtouch").click(function(){$(document).trigger({type:"keydown",which:13,keyCode:40})}),$(".tlcornertouch").click(function(){$(document).trigger({type:"keydown",which:13,keyCode:13})}),$(".trcornertouch").click(function(){$(document).trigger({type:"keydown",which:13,keyCode:27})})}"/glass/"==$(".next a").attr("href")?$(".next a").attr("href","/visualization/"):"/glass/"==$(".previous a").attr("href")&&$(".previous a").attr("href","/fuse/"),$(".next a").attr("href",$(".next a").attr("href")+"#present"),$(".previous a").attr("href",$(".previous a").attr("href")+"#present"),$(".thumbnails a").each(function(t,e){$(e).attr("href",$(e).attr("href")+"#present")}),$("body, html").animate({scrollTop:0,scrollLeft:0}),$(window).blur(function(){function t(){document.activeElement&&(document.activeElement.blur(),clearInterval(t))}setInterval(t,100)}),$(window).bind("touchmove",function(t){t.preventDefault()}),$(window).on("mousewheel DOMMouseScroll",function(t){t.preventDefault()}),(-1!=navigator.userAgent.indexOf("Safari")&&-1==navigator.userAgent.indexOf("Chrome")||"ontouchstart"in document.documentElement)&&$("body.present .page section").css("overflow","scroll"),$(document).keydown(function(t){$("section").length>0?(slide=Math.floor(($("body").scrollLeft()+$("html").scrollLeft())/$(window).width())-1,(32==t.keyCode||39==t.keyCode)&&(t.preventDefault(),$("section").length-1>slide&&$("body, html").animate({scrollLeft:$($("section")[slide+1]).offset().left})),37==t.keyCode&&(t.preventDefault(),0==slide?$("body, html").animate({scrollLeft:0}):slide>0&&$("body, html").animate({scrollLeft:$($("section")[slide-1]).offset().left})),38==t.keyCode&&(t.preventDefault(),$("body > .previous a").length>0?$("body > .previous a")[0].click():window.location="/#projects-present"),40==t.keyCode&&(t.preventDefault(),$("body > .next a").length>0?$("body > .next a")[0].click():window.location="/#projects-present"),27==t.keyCode&&window.location.hash.length>0&&(window.location=window.location.hash.split("#")[0]),13==t.keyCode&&(window.location="/#projects-present")):(37==t.keyCode&&$("body").scrollLeft()+$("html").scrollLeft()>100&&$("body, html").animate({scrollLeft:0}),(32==t.keyCode||39==t.keyCode)&&(t.preventDefault(),$("body, html").animate({scrollLeft:$(".intro").width()})),38==t.keyCode&&(t.preventDefault(),window.location="/archive/#present"),40==t.keyCode&&(t.preventDefault(),window.location="/hue/#present"),27==t.keyCode&&(window.location="/"))}),slide=-1,$(window).resize(function(){resizeTransform()}),resizeTransform(),t&&$("body, html").animate({scrollLeft:$(".intro").width()}),"present"!=window.location.hash.split("#")[1]&&(window.location.hash="present")}function resizeTransform(){if($("section").length>0){if($(".top").height()>$(window).height()){var t=$(window).height()-$(".top").height();$(".top-image").css({"margin-top":t+"px"}),$(".top").css({"padding-bottom":"50px"})}else $(".top").css("height","100vh");$("section").each(function(t,e){if($(e).has(".columns").length>0){var n=.8*($(e).width()/$(e).find(".columns").width());$(e).find("article").css({"-webkit-transform":"translateY(-50%) scale("+n+")","-moz-transform":"translateY(-50%) scale("+n+")",transform:"translateY(-50%) scale("+n+")"})}if($(e).has(".video").length>0){var n=$(e).width()/900;$(e).find(".description").css({"-webkit-transform":"scale("+n+")","-moz-transform":"scale("+n+")",transform:"scale("+n+")"})}}),-1==slide?$("body, html").animate({scrollLeft:0}):slide>-1&&$("body, html").animate({scrollLeft:$($("section")[slide]).offset().left})}else{var e=$(window).width()/1e3;$(".firefly, .bio").css({"-webkit-transform":"scale("+e+")","-moz-transform":"scale("+e+")",transform:"scale("+e+")"});var n=.9*($(window).height()/$(".wrapper").height());$(".page").css({"-webkit-transform":"translateY(-50%) scale("+n+")","-moz-transform":"translateY(-50%) scale("+n+")",transform:"translateY(-50%) scale("+n+")"})}}!function(){var t=[].indexOf||function(t){for(var e=0,n=this.length;n>e;e++)if(e in this&&this[e]===t)return e;return-1},e=[].slice;!function(t,e){return"function"==typeof define&&define.amd?define("waypoints",["jquery"],function(n){return e(n,t)}):e(t.jQuery,t)}(this,function(n,o){var i,r,s,a,l,c,d,f,u,h,p,m,w,v,y,g;return i=n(o),f=t.call(o,"ontouchstart")>=0,a={horizontal:{},vertical:{}},l=1,d={},c="waypoints-context-id",p="resize.waypoints",m="scroll.waypoints",w=1,v="waypoints-waypoint-ids",y="waypoint",g="waypoints",r=function(){function t(t){var e=this;this.$element=t,this.element=t[0],this.didResize=!1,this.didScroll=!1,this.id="context"+l++,this.oldScroll={x:t.scrollLeft(),y:t.scrollTop()},this.waypoints={horizontal:{},vertical:{}},t.data(c,this.id),d[this.id]=this,t.bind(m,function(){var t;return e.didScroll||f?void 0:(e.didScroll=!0,t=function(){return e.doScroll(),e.didScroll=!1},o.setTimeout(t,n[g].settings.scrollThrottle))}),t.bind(p,function(){var t;return e.didResize?void 0:(e.didResize=!0,t=function(){return n[g]("refresh"),e.didResize=!1},o.setTimeout(t,n[g].settings.resizeThrottle))})}return t.prototype.doScroll=function(){var t,e=this;return t={horizontal:{newScroll:this.$element.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.$element.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}},!f||t.vertical.oldScroll&&t.vertical.newScroll||n[g]("refresh"),n.each(t,function(t,o){var i,r,s;return s=[],r=o.newScroll>o.oldScroll,i=r?o.forward:o.backward,n.each(e.waypoints[t],function(t,e){var n,i;return o.oldScroll<(n=e.offset)&&n<=o.newScroll?s.push(e):o.newScroll<(i=e.offset)&&i<=o.oldScroll?s.push(e):void 0}),s.sort(function(t,e){return t.offset-e.offset}),r||s.reverse(),n.each(s,function(t,e){return e.options.continuous||t===s.length-1?e.trigger([i]):void 0})}),this.oldScroll={x:t.horizontal.newScroll,y:t.vertical.newScroll}},t.prototype.refresh=function(){var t,e,o,i=this;return o=n.isWindow(this.element),e=this.$element.offset(),this.doScroll(),t={horizontal:{contextOffset:o?0:e.left,contextScroll:o?0:this.oldScroll.x,contextDimension:this.$element.width(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:o?0:e.top,contextScroll:o?0:this.oldScroll.y,contextDimension:o?n[g]("viewportHeight"):this.$element.height(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}},n.each(t,function(t,e){return n.each(i.waypoints[t],function(t,o){var i,r,s,a,l;return i=o.options.offset,s=o.offset,r=n.isWindow(o.element)?0:o.$element.offset()[e.offsetProp],n.isFunction(i)?i=i.apply(o.element):"string"==typeof i&&(i=parseFloat(i),o.options.offset.indexOf("%")>-1&&(i=Math.ceil(e.contextDimension*i/100))),o.offset=r-e.contextOffset+e.contextScroll-i,o.options.onlyOnScroll&&null!=s||!o.enabled?void 0:null!==s&&s<(a=e.oldScroll)&&a<=o.offset?o.trigger([e.backward]):null!==s&&s>(l=e.oldScroll)&&l>=o.offset?o.trigger([e.forward]):null===s&&e.oldScroll>=o.offset?o.trigger([e.forward]):void 0})})},t.prototype.checkEmpty=function(){return n.isEmptyObject(this.waypoints.horizontal)&&n.isEmptyObject(this.waypoints.vertical)?(this.$element.unbind([p,m].join(" ")),delete d[this.id]):void 0},t}(),s=function(){function t(t,e,o){var i,r;o=n.extend({},n.fn[y].defaults,o),"bottom-in-view"===o.offset&&(o.offset=function(){var t;return t=n[g]("viewportHeight"),n.isWindow(e.element)||(t=e.$element.height()),t-n(this).outerHeight()}),this.$element=t,this.element=t[0],this.axis=o.horizontal?"horizontal":"vertical",this.callback=o.handler,this.context=e,this.enabled=o.enabled,this.id="waypoints"+w++,this.offset=null,this.options=o,e.waypoints[this.axis][this.id]=this,a[this.axis][this.id]=this,i=null!=(r=t.data(v))?r:[],i.push(this.id),t.data(v,i)}return t.prototype.trigger=function(t){return this.enabled?(null!=this.callback&&this.callback.apply(this.element,t),this.options.triggerOnce?this.destroy():void 0):void 0},t.prototype.disable=function(){return this.enabled=!1},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0},t.prototype.destroy=function(){return delete a[this.axis][this.id],delete this.context.waypoints[this.axis][this.id],this.context.checkEmpty()},t.getWaypointsByElement=function(t){var e,o;return(o=n(t).data(v))?(e=n.extend({},a.horizontal,a.vertical),n.map(o,function(t){return e[t]})):[]},t}(),h={init:function(t,e){var o;return null==e&&(e={}),null==(o=e.handler)&&(e.handler=t),this.each(function(){var t,o,i,a;return t=n(this),i=null!=(a=e.context)?a:n.fn[y].defaults.context,n.isWindow(i)||(i=t.closest(i)),i=n(i),o=d[i.data(c)],o||(o=new r(i)),new s(t,o,e)}),n[g]("refresh"),this},disable:function(){return h._invoke(this,"disable")},enable:function(){return h._invoke(this,"enable")},destroy:function(){return h._invoke(this,"destroy")},prev:function(t,e){return h._traverse.call(this,t,e,function(t,e,n){return e>0?t.push(n[e-1]):void 0})},next:function(t,e){return h._traverse.call(this,t,e,function(t,e,n){return e<n.length-1?t.push(n[e+1]):void 0})},_traverse:function(t,e,i){var r,s;return null==t&&(t="vertical"),null==e&&(e=o),s=u.aggregate(e),r=[],this.each(function(){var e;return e=n.inArray(this,s[t]),i(r,e,s[t])}),this.pushStack(r)},_invoke:function(t,e){return t.each(function(){var t;return t=s.getWaypointsByElement(this),n.each(t,function(t,n){return n[e](),!0})}),this}},n.fn[y]=function(){var t,o;return o=arguments[0],t=2<=arguments.length?e.call(arguments,1):[],h[o]?h[o].apply(this,t):n.isFunction(o)?h.init.apply(this,arguments):n.isPlainObject(o)?h.init.apply(this,[null,o]):o?n.error("The "+o+" method does not exist in jQuery Waypoints."):n.error("jQuery Waypoints needs a callback function or handler option.")},n.fn[y].defaults={context:o,continuous:!0,enabled:!0,horizontal:!1,offset:0,triggerOnce:!1},u={refresh:function(){return n.each(d,function(t,e){return e.refresh()})},viewportHeight:function(){var t;return null!=(t=o.innerHeight)?t:i.height()},aggregate:function(t){var e,o,i;return e=a,t&&(e=null!=(i=d[n(t).data(c)])?i.waypoints:void 0),e?(o={horizontal:[],vertical:[]},n.each(o,function(t,i){return n.each(e[t],function(t,e){return i.push(e)}),i.sort(function(t,e){return t.offset-e.offset}),o[t]=n.map(i,function(t){return t.element}),o[t]=n.unique(o[t])}),o):[]},above:function(t){return null==t&&(t=o),u._filter(t,"vertical",function(t,e){return e.offset<=t.oldScroll.y})},below:function(t){return null==t&&(t=o),u._filter(t,"vertical",function(t,e){return e.offset>t.oldScroll.y})},left:function(t){return null==t&&(t=o),u._filter(t,"horizontal",function(t,e){return e.offset<=t.oldScroll.x})},right:function(t){return null==t&&(t=o),u._filter(t,"horizontal",function(t,e){return e.offset>t.oldScroll.x})},enable:function(){return u._invoke("enable")},disable:function(){return u._invoke("disable")},destroy:function(){return u._invoke("destroy")},extendFn:function(t,e){return h[t]=e},_invoke:function(t){var e;return e=n.extend({},a.vertical,a.horizontal),n.each(e,function(e,n){return n[t](),!0})},_filter:function(t,e,o){var i,r;return(i=d[n(t).data(c)])?(r=[],n.each(i.waypoints[e],function(t,e){return o(i,e)?r.push(e):void 0}),r.sort(function(t,e){return t.offset-e.offset}),n.map(r,function(t){return t.element})):[]}},n[g]=function(){var t,n;return n=arguments[0],t=2<=arguments.length?e.call(arguments,1):[],u[n]?u[n].apply(null,t):u.aggregate.call(null,n)},n[g].settings={resizeThrottle:100,scrollThrottle:30},i.load(function(){return n[g]("refresh")})})}.call(this),/*!
* FitVids 1.0.3
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/
function(t){"use strict";t.fn.fitVids=function(e){var n={customSelector:null};return e&&t.extend(n,e),this.each(function(){var e=["iframe[src*='player.vimeo.com']","iframe[src*='youtube.com']","iframe[src*='youtube-nocookie.com']","iframe[src*='kickstarter.com'][src*='video.html']","object","embed"];n.customSelector&&e.push(n.customSelector);var o=t(this).find(e.join(","));o=o.not("object object"),o.each(function(){var e=t(this);if(!("embed"===this.tagName.toLowerCase()&&e.parent("object").length||e.parent(".fluid-width-video-wrapper").length)){var n="object"===this.tagName.toLowerCase()||e.attr("height")&&!isNaN(parseInt(e.attr("height"),10))?parseInt(e.attr("height"),10):e.height(),o=isNaN(parseInt(e.attr("width"),10))?e.width():parseInt(e.attr("width"),10),i=n/o;if(!e.attr("id")){var r="fitvid"+Math.floor(999999*Math.random());e.attr("id",r)}e.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top",100*i+"%"),e.removeAttr("height").removeAttr("width")}})})}}(window.jQuery||window.Zepto),function(t,e,n){t.fn.responsiveSlides=function(o){var i=t.extend({auto:!0,speed:1e3,timeout:4e3,pager:!1,nav:!1,random:!1,pause:!1,pauseControls:!1,prevText:"Previous",nextText:"Next",maxwidth:"",controls:"",namespace:"rslides",before:function(){},after:function(){}},o);return this.each(function(){n++;var r,s,a,l,c,d=t(this),f=0,u=d.children(),h=u.size(),p=parseFloat(i.speed),m=parseFloat(i.timeout),w=parseFloat(i.maxwidth),v=i.namespace,y=v+n,g=v+"_nav "+y+"_nav",$=v+"_here",b=y+"_on",k=y+"_s",x=t("<ul class='"+v+"_tabs "+y+"_tabs' />"),S={"float":"left",position:"relative"},C={"float":"none",position:"absolute"},z=function(e){i.before(),u.stop().fadeOut(p,function(){t(this).removeClass(b).css(C)}).eq(e).fadeIn(p,function(){t(this).addClass(b).css(S),i.after(),f=e})};if(i.random&&(u.sort(function(){return Math.round(Math.random())-.5}),d.empty().append(u)),u.each(function(t){this.id=k+t}),d.addClass(v+" "+y),o&&o.maxwidth&&d.css("max-width",w),u.hide().eq(0).addClass(b).css(S).show(),1<u.size()){if(p+100>m)return;if(i.pager){var _=[];u.each(function(t){t+=1,_+="<li><a href='#' class='"+k+t+"'>"+t+"</a></li>"}),x.append(_),c=x.find("a"),o.controls?t(i.controls).append(x):d.after(x),r=function(t){c.closest("li").removeClass($).eq(t).addClass($)}}if(i.auto&&(s=function(){l=setInterval(function(){u.stop(!0,!0);var t=h>f+1?f+1:0;i.pager&&r(t),z(t)},m)},s()),a=function(){i.auto&&(clearInterval(l),s())},i.pause&&d.hover(function(){clearInterval(l)},function(){a()}),i.pager&&(c.bind("click",function(e){e.preventDefault(),i.pauseControls||a(),e=c.index(this),f===e||t("."+b+":animated").length||(r(e),z(e))}).eq(0).closest("li").addClass($),i.pauseControls&&c.hover(function(){clearInterval(l)},function(){a()})),i.nav){v="<a href='#' class='"+g+" prev'>"+i.prevText+"</a><a href='#' class='"+g+" next'>"+i.nextText+"</a>",o.controls?t(i.controls).append(v):d.after(v);var v=t("."+y+"_nav"),j=t("."+y+"_nav.prev");v.bind("click",function(e){if(e.preventDefault(),!t("."+b+":animated").length){var n=u.index(t("."+b)),e=n-1,n=h>n+1?f+1:0;z(t(this)[0]===j[0]?e:n),i.pager&&r(t(this)[0]===j[0]?e:n),i.pauseControls||a()}}),i.pauseControls&&v.hover(function(){clearInterval(l)},function(){a()})}}if("undefined"==typeof document.body.style.maxWidth&&o.maxwidth){var T=function(){d.css("width","100%"),d.width()>w&&d.css("width",w)};T(),t(e).bind("resize",function(){T()})}})}}(jQuery,this,0),$(document).ready(function(){"ontouchstart"in document.documentElement?($(".video .poster").hide(),startSlides($(".slideshow"))):$(".slideshow").waypoint(function(){startSlides($(this))},{triggerOnce:"true",offset:"bottom-in-view"}),$(".page").fitVids(),$(".video .poster").each(function(){var t=$(this);$(this).next().find("iframe").load(function(){var e=$f($(this)[0]);e.addEvent("ready",function(){e.addEvent("finish",function(){t.fadeIn()})})})}),$(".video .poster").click(function(){$(this).fadeOut(),thisVideo=$f($(this).next().find("iframe")[0]),"ytplayer"==$(this).next().find("iframe").attr("id")?player.playVideo():thisVideo.api("play")}),$(".header h1 a").hover(function(){$(this).html("<span>←</span> Project List"),$(window).on("keydown",function(t){27==t.keyCode&&(t.preventDefault(),goPresent())})},function(){$(this).html("Basheer Tome"),$(window).off("keydown")}),"present"==window.location.hash.split("#")[1]&&goPresent()});
;