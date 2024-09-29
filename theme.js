!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this.options.asNavFor;return e&&null!==e&&(e=i(e).not(this.$slider)),e},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){this.autoPlayTimer&&clearInterval(this.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){for(o in s=null,r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n=this,r=i(e.currentTarget);switch(r.is("a")&&e.preventDefault(),r.is("li")||(r=r.closest("li")),o=n.slideCount%n.options.slidesToScroll!=0?0:(n.slideCount-n.currentSlide)%n.options.slidesToScroll,e.data.message){case"previous":s=0===o?n.options.slidesToScroll:n.options.slidesToShow-o,n.slideCount>n.options.slidesToShow&&n.slideHandler(n.currentSlide-s,!1,t);break;case"next":s=0===o?n.options.slidesToScroll:o,n.slideCount>n.options.slidesToShow&&n.slideHandler(n.currentSlide+s,!1,t);break;case"index":var l=0===e.data.index?0:e.data.index||r.index()*n.options.slidesToScroll;n.slideHandler(n.checkNavigable(l),!1,t),r.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(t=0,i>(e=this.getNavigableIndexes())[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){this.checkResponsive(),this.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){this.autoPlayClear(),this.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){for(e in s.respondTo=s.options.respondTo||"window",n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){i||this.autoPlay(),this.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.apx_slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

function triggerCDN(){
    //if(!sessionStorage.getItem('cdnTriggered')){
        console.log('IS_STORE_ASYNC',window.IS_STORE_ASYNC);
        theme.isLogged = $.cookie('LI-isUserLogged') === "true" ? true : false;
        $('.theme_account').remove();
        theme.build.account();
        sessionStorage.setItem('cdnTriggered',true)
    //}
};

const theme = [];

theme.info = {};
theme.info.icon = '<svg style="height:22px;width:47px;box-sizing: content-box;" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 320.23 150.05"><defs><style>.cls-1{fill:#fc5656;}.cls-2{fill:#b32fd3;}.cls-3{fill:url(#Gradiente_sem_nome_49);}</style><linearGradient id="Gradiente_sem_nome_49" x1="-1021.91" y1="912.64" x2="-898.84" y2="912.64" gradientTransform="translate(1114.16 -837.62)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fc5656"/><stop offset="1" stop-color="#b32fd3"/></linearGradient></defs><g id="Camada_2" data-name="Camada 2"><g id="Camada_1-2" data-name="Camada 1"><rect x="215.32" y="40.9" width="19.21" height="70.65"/><rect x="92.25" width="19.11" height="111.55"/><path d="M167.15,39.84a36.48,36.48,0,0,0-17.37,4.38V41.07H130.59V150h19.19V108.58a36.56,36.56,0,1,0,17.37-68.74Zm0,53.87A17.32,17.32,0,1,1,184.47,76.4,17.31,17.31,0,0,1,167.15,93.71Z"/><path d="M53.83,111.37H73l0-70.48H53.87v3.3a36.76,36.76,0,0,0-17.31-4.36,36,36,0,0,0-11.7,1.93,36.55,36.55,0,0,0,0,69.26,36.43,36.43,0,0,0,23.4,0,34.82,34.82,0,0,0,5.61-2.43M36.56,94.13A17.32,17.32,0,1,1,53.87,76.81,17.31,17.31,0,0,1,36.56,94.13Z"/><polygon points="318.51 41.07 305.89 58.94 282.36 58.94 294.97 41.07 318.51 41.07"/><polygon points="320.23 111.55 296.55 111.55 282.36 92.17 268.77 111.55 245.22 111.55 270.5 75.69 270.6 75.55 258.79 58.94 246.09 41.07 269.77 41.07 282.36 58.94 282.38 58.94 294.19 75.69 294.24 75.69 320.23 111.55"/><rect class="cls-1" x="92.25" y="130.94" width="19.11" height="19.11"/><rect class="cls-2" x="196.11" width="19.21" height="19.21"/><rect class="cls-3" x="92.25" y="130.94" width="19.11" height="19.11"/><rect class="cls-3" x="196.11" width="19.21" height="19.21"/></g></g></svg>';
theme.info.external = "https://www.alpix.dev?utm_source=" + window.location.host;
theme.info.ref = "https://www.alpix.dev/criar-sua-loja-integrada";
theme.isMobile = window.innerWidth < 990;

theme.lang = {};
theme.lang.productListDetail = "Ver Mais";
theme.lang.productListAdd = "Comprar Agora";
theme.lang.sideCartTitle = "Meu Carrinho";
theme.lang.footerTitle1 = "Institucional";
theme.lang.footerTitle2 = "Categorias";
theme.lang.footerTitle3 = "Pagamento e Segurança";
theme.lang.footerTitle4 = "Newsletter";
theme.lang.searchTitle = "Pesquisar";
theme.lang.searchPlaceholder = "Digite o que procura...";
theme.lang.searchButtonText = "Buscar";
theme.lang.accountTitle = "Minha Conta";
theme.lang.filtersTitle = "Filtrar por";
theme.lang.menuTitle = "Menu";
theme.lang.avisoEstoque = "Aproveite! Apenas [qtde] itens em estoque!";
theme.lang.brandTitle = "Compre por Marca";

theme.settings = {};
theme.settings.sideCheckout = true;
theme.settings.whatsappButton = false;
theme.settings.extraPagination = true;
theme.settings.instagramFeed = false;
theme.settings.productListImageFill = true;
theme.settings.imageSize = 1.4;
theme.settings.productExcerpt = false;
theme.settings.avisoEstoque = 999;
theme.settings.sliders = [];
theme.settings.sliders.config = [];
theme.settings.sliders.config.prevArrow = '<span class="arrow-l"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20"><path fill="#000000" d="M0 15c0 0.128 0.049 0.256 0.146 0.354 0.195 0.195 0.512 0.195 0.707 0l8.646-8.646 8.646 8.646c0.195 0.195 0.512 0.195 0.707 0s0.195-0.512 0-0.707l-9-9c-0.195-0.195-0.512-0.195-0.707 0l-9 9c-0.098 0.098-0.146 0.226-0.146 0.354z"></path></svg></span>';            
theme.settings.sliders.config.nextArrow   = '<span class="arrow-r"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 20 20"><path fill="#000000" d="M0 15c0 0.128 0.049 0.256 0.146 0.354 0.195 0.195 0.512 0.195 0.707 0l8.646-8.646 8.646 8.646c0.195 0.195 0.512 0.195 0.707 0s0.195-0.512 0-0.707l-9-9c-0.195-0.195-0.512-0.195-0.707 0l-9 9c-0.098 0.098-0.146 0.226-0.146 0.354z"></path></svg></span>';
theme.settings.productGallery = false;
theme.settings.galeriaZoom = false;

theme.settings.invertHeader = false;

theme.settings.sliders.benefitsStripe = {
    dots: false,
    infinite: true,
    autoplay:true,
    autoplaySpeed:3000,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
    responsive: [
        {
        breakpoint: 9999,
        settings: "unslick"
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 2
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1
        }
        }
    ]
}

theme.settings.sliders.brands = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows : false,
                centerMode: true
            }
        }
    ]
}

theme.settings.sliders.categorySlider = {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
    responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                arrows : false,
                centerMode: true
            }
        }
    ]
}

theme.settings.sliders.testimonials = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,            
            centerMode:true
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode:true
        }
        }
    ]  
}

theme.settings.sliders.products = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,            
            centerMode:true
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode:true
        }
        }
    ]  
}

theme.settings.sliders.verticalProductGallery = {
    vertical:true,
    infinite: true,
    centerMode:true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: false,    
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            
            centerMode:false
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode:false
        }
        }
    ]    
}
theme.settings.sliders.horizontalProductGallery = {
    infinite: true,
    centerMode:true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,    
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
            centerMode:false
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode:false
        }
        }
    ]
}
theme.settings.sliders.premiumProductGallery = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
}
theme.settings.sliders.premiumProductGalleryNav = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    prevArrow: theme.settings.sliders.config.prevArrow,
    nextArrow: theme.settings.sliders.config.nextArrow,
}

theme.settings.footer = [];
theme.settings.footer.social = false;
theme.settings.footer.payments = true;
theme.settings.footer.categories = true;
theme.settings.footer.pages = true;
theme.settings.footer.institutional = false;
theme.settings.footer.logo = false;
theme.settings.footer.newsletter = true;

theme.stripe = [];
theme.stripe.color = '#fff';
theme.stripe.background = '#000';
theme.stripe.content = "";
theme.stripe.position = 2;
theme.stripe.fixed = false;

theme.benefitsStripe = [];
theme.benefitsStripe.active = 0;
theme.benefitsStripe.list = [];
//theme.benefitsStripe.list.push({img:'',title:'',subtitle:'',link:''})




theme.build = [];
theme.build.header = function(template){
    $('#cabecalho').html(theme.templates.header);
    $('#theme_header-logo').append(theme.logo);
    $('#theme_header-menu').html(theme.headerMenu);
    $('#theme_header-functions').append('<li>' + theme.headerCart + '</li>');

    $('#theme_header-functions').prepend('<li><button type="button" class="account-trigger">'+ theme.icon.account +'</button></li>');
    //$('#theme_header-functions').prepend('<li><a href="/conta/favorito/listar">'+ theme.icon.wishlist +'</a></li>');
    $('#theme_header-functions').prepend('<li><button type="button" class="search-trigger">'+ theme.icon.search +'</button></li>');
    
    $('.carrinho .icon-shopping-cart').before(theme.icon.cart);
    $('.carrinho .icon-shopping-cart').remove();
    $('.barra-inicial').remove();

    if(theme.stripe.content){
        let stripe = $('<div id="theme_header-stripe" style="background:'+ theme.stripe.background +'; color:'+ theme.stripe.color +'">'+ theme.stripe.content+'</div>');
        if(theme.stripe.fixed){
            theme.stripe.position == 1 ? stripe.prependTo('#cabecalho') : stripe.appendTo('#cabecalho');
        }else{
            theme.stripe.position == 1 ? stripe.insertBefore('#cabecalho') : stripe.insertAfter('#cabecalho');
        }
        
    } 

    //theme.settings.invertHeader
    if(theme.settings.invertHeader == true){
        $('#cabecalho').addClass('theme_invert');
    }

    
};
theme.build.footer = function(template){
    $('#barraNewsletter, .pagamento-selos').remove();
    $('#rodape .institucional').html(theme.templates.footer);
    $('#theme_footer-content1').append(theme.footerPages);
    $('#theme_footer-content2').append(theme.footerCategories);
    $('#theme_footer-content3').append(theme.footerPayments);
    $('#theme_footer-content3').append(theme.footerGateways);
    $('#theme_footer-content3').append(theme.footerSeals);

    if(theme.settings.footer.logo) $('#theme_footer-content-institutional').append($(theme.logo).find('a').html());
    if(theme.settings.footer.institutional) $('#theme_footer-content-institutional').append('<p>' + theme.storeDescription + '</p>');
    if(theme.settings.footer.institutional && theme.settings.footer.social) $('#theme_footer-content-institutional').append('<div id="theme_footer-content-institutional-social">' + theme.socialIcons + '</div>');
    
    theme.newsletter == "" ? $('#theme_footer-content4').parent('.col-auto').remove() : $('#theme_footer-content4').append(theme.newsletter);
    
    $('#rodape .selos').find('.titulo').remove();
    $('#rodape .selos').attr('class','selos');
};
theme.build.asideMenu = function(template){
    $('body').append(theme.templates.asideMenu);
    $('#theme_menu-aside').append(theme.headerMenu);
    $('#theme_menu-aside .com-filho > a').each(function(){
        let url = $(this).attr('href');
        let submenu = $(this).closest('.com-filho').find('.nivel-dois');
        $('<li><a href="'+ url +'">Ver Todos</a></li>').appendTo(submenu);
        $('<li class="theme_menu-closeSub"><button type="button">Voltar</button></li>').prependTo(submenu);
    });
    $('#theme_menu-aside .com-filho > a').click(function(e){
        e.preventDefault();
        $(this).closest('.com-filho').addClass('open');
    });
    $('.theme_menu-closeSub').click(function(){
        $(this).closest('.com-filho').removeClass('open');
    });
    $('#theme_header-menu-trigger, .theme_menu-trigger').click(function(){   
        $('body').toggleClass('asideMenu-visible');         
    });
};

theme.build.productFilter = function(template){
    if($('.coluna .filtro-coluna').length > 0){
        $('body').append(theme.templates.filters);
        $('body').on('click','.filter-trigger', function(){   
            $('body').toggleClass('asideFilter-visible');         
        });
        if($('.coluna .atributo-cor').length > 0 ){
            $('.coluna .atributo-cor a > span').wrap("<i class='color-bg'></i>")
            // $('.filtro-coluna .atributo-cor span').each(function(){
            //     let css = $(this).attr('style').replace('border-color','background-color');
            //     $(this).attr('style', css);
            // })
        }
        $('.coluna .filtro-coluna').each(function(){
            let filterName = $(this).find('h4.titulo').text().replace('Filtrar por','').replace('Limpar','').trim();
            $('#theme_filter').append('<h4>' + filterName + '</h4>');
            $('#theme_filter').append($(this).find('h4.titulo').next());
        });        
    }
};

theme.build.search = function(template){
    $('body').append(theme.templates.search);
    $('#theme_search').append(theme.searchForm);

    $('#theme_search #auto-complete').attr('placeholder',theme.lang.searchPlaceholder);
    $('#theme_search .botao.icon-search').text(theme.lang.searchButtonText);
    $('#theme_search .botao.icon-search').removeClass('icon-search');

    $('.search-trigger').click(function(){   
        $('body').toggleClass('asideSearch-visible');         
        $('#theme_search input').val('');
        //$('#theme_search input').autocomplete('destroy');
    });

    $("#theme_search input").autocomplete({
        delay: 300,
        minLength: 5,
        source: function(o, n) {
            $.ajax({
                url: "//api.awsli.com.br/v2/autocomplete/" + LOJA_ID,
                dataType: "json",
                data: {
                    q: o.term,
                    size: 3,
                    ttl: 300
                },
                success: function(p) {
                    n($.map(p.hits, function(q) {
                        console.log(q);
                        if (q.imagens) {
                            return {
                                label: '<span class="img"><img src="' + MEDIA_URL + "80x80/" + q.imagens[0].caminho + '?type=trim" /></span><span>' + q.nome + '</span>',
                                value: q.nome,
                                url: q.canonical_path
                            }
                        } else {
                            return {
                                label: '<span class="img"></span><span>' + q.nome + '</span>',
                                value: q.nome,
                                url: q.canonical_path
                            }
                        }
                    }))
                }
            })
        },
        open: function(n, o) {
            $(this).autocomplete("widget").css("z-index", 100000);
            $(this).autocomplete("widget").width($(this).parent().width())
        },
        select: function(n, o) {
            console.log(o);
            window.location = o.item.url
        }
    });
    $("#theme_search input").each(function() {
        $(this).data("ui-autocomplete")._renderItem = function(n, o) {
            return $("<li></li>").data("item.autocomplete", o).append("<a>" + o.label + "</a>").appendTo(n)
        }
    });
};

theme.build.account = function(template){
    $('body').append(theme.templates.account);
    let menu = $('<ul></ul>');
    if(theme.isLogged){
        menu.append('<li><a href="/conta/index">Meus dados</a></li>');
        menu.append('<li><a href="/conta/pedido/listar">Meus pedidos</a></li>');
        menu.append('<li><a href="/conta/logout">Sair</a></li>');
    }else{
        //menu.append('<li><a href="">Login</a></li>');
        menu.append('<li><form id="apx_sideLogin" action="/conta/login" method="post"><label>E-mail<input id="id_email" maxlength="128" name="email" type="text"></label><label>Senha<input id="id_senha" maxlength="32" name="senha" type="password"></label><div><button type="submit" class="botao principal">Entrar</button><button id="recoverPassword" data-toggle="modal"> <i class="icon-lock cor-secundaria"></i> Esqueceu a senha? </button></div></form></li>');
        menu.append('<li><a href="/conta/criar?next=conta_index&email=_">Cliente novo? Cadastre-se</a></li>');
    }
    menu.append('<li class="divider"></li>');
    //menu.append('<li><a href="">Preciso de ajuda</a></li>');
    //menu.append('<li><a href="">Fale com a gente</a></li>');
    $('#theme_account').append(menu);
    $('.account-trigger').click(function(){   
        $('body').toggleClass('asideAccount-visible');         
    });

    $('#recoverPassword').click(function(){
        let mail = $('#apx_sideLogin #id_email');
        $.get('/conta/recuperar_senha?email=' + mail.val(), function(data){
            let res = JSON.parse(data);
            console.log(res.mensagem);
            if(res.status == "erro"){
                mail.focus()
            }
            alert(res.mensagem);
        })
    });



}


theme.functions = [];
theme.functions.galeriaZoom = function(){
    $(window).load(function(){
        $.getScript( "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js", function( data, textStatus, jqxhr ) {
            if(jqxhr.status == 200){
                $('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', 'https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.css') );
                $("#abreZoom").unbind();        
                $("#abreZoom, .conteiner-imagem").click(function() {
                    var g, c, f = [];
                    g = $("#abreZoom").attr("href");
                    imagens_li = $(".produto .miniaturas li");
                    for (i = 0; i < imagens_li.length; i++) {
                        if ($(imagens_li[i]).is(":visible")) {
                            var d = $("a", imagens_li[i]).attr("data-imagem-grande");
                            f.push(d)
                        }
                    }
                    c = [];
                    for (i = 0; i < f.length; i++) {
                        var e = f[i];
                        if (e != g) {
                            c.push({
                                src: e,
                                type:'image'
                            })
                        }
                    }
                    Fancybox.show(c,{startIndex : $("#imagemProduto").attr('data-index') });
                    return false
                });
                $(".produto-thumbs .miniaturas li a").unbind();
                $(".produto-thumbs").on("click", ".miniaturas li a", function(d) {
                    let index = $(this).closest('li').index();
                    d.preventDefault();
                    $(this).parent().siblings().removeClass("active");
                    $(this).parent().addClass("active");
                    var c = $("#imagemProduto").data("imagezoom");
                    if (c) {
                        c.changeImage($(this).find("img").attr("data-mediumimg"), $(this).find("img").attr("data-largeimg"))
                        $("#imagemProduto").attr('data-index',index);
                    }
                })
            }        
        });        
    });
};
theme.functions.customBanners = function(ref){
    let movie = false;
    $('.secao-banners .banner.cheio img').each(function(){
        let alt = $(this).attr('alt');        
        if(alt.includes('[movie]')){
            movie = true;
            let iframeLink = $(this).closest('a').attr('href');
            let iframe = $('<iframe id="theme_fullMovie"  src="https://www.youtube-nocookie.com/embed/'+ iframeLink +'?'+ (alt.includes('[autoplay]') ? 'autoplay=1&mute=1&' : '') +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>');
            let li = $(this).closest('li');
            li.find('img').remove();
            li.find('a').remove();
            li.append(iframe);     
            
            let regExp = /\[proporcao:(.*?)\]/;
            let match = regExp.exec(alt);
            console.log(match);
            if(match[1]){
                $('#theme_fullMovie').css('height',(window.innerWidth * parseFloat(match[1])) + 'px');
            }
            
            
        }        
    });

    //slider categorias    
    $('.secao-banners .banner.cheio img').each(function(){
        let alt = $(this).attr('alt');                
        if(alt.includes('[slider-categorias]')){
            if($('#theme_categorySlider').length == 0){
                $('<div id="theme_categorySlider"><div class="slides"></div></div>').prependTo('#corpo > .conteiner');
            }
            $(this).closest('li').appendTo('#theme_categorySlider > .slides');               
        }
    });
    $('#theme_categorySlider li').wrap('<div class="item"/>').contents().unwrap();
    $('#theme_categorySlider > .slides').apx_slick(theme.settings.sliders.categorySlider);

     //ícones do menu
    $('.secao-banners .banner.cheio img').each(function(){
        let alt = $(this).attr('alt');
        if(alt.includes('[icone-')){
            let regExp = /\[icone-(.*?)\]/;
            let target = regExp.exec(alt);
            let regExp2 = /\[posicao-(.*?)\]/;
            let position = regExp2.exec(alt);
            if($('.menu.superior .nivel-um > li > a[title="' + target[1] +'"]').length == 1){
                let removeAfter = $(this).closest('li');
                $('.menu.superior .nivel-um > li > a[title="' + target[1] +'"]').closest('li').addClass('theme_icon theme_icon-' + (theme.isMobile ? 'Esquerda' : position[1]));
                $('.menu.superior .nivel-um > li > a[title="' + target[1] +'"]').prepend('<div class="theme_icon-item"></div>');
                $(this).appendTo('.menu.superior .nivel-um > li > a[title="' + target[1] +'"] .theme_icon-item');
                removeAfter.remove();    
            }
        }
    });

    //daqui para baixo somente os que tem mobile
    
    //banners mobile
    $('.secao-banners .banner.cheio img').each(function(){
        let alt = $(this).attr('alt');        
        if(!alt.includes('[mobile]') && theme.isMobile){
            $(this).closest('li').remove();                        
        }
        if(alt.includes('[mobile]') && !theme.isMobile){
            $(this).closest('li').remove();                        
        }
    });

    //banners vitrine
    $('.secao-banners .banner.cheio img').each(function(){
        let alt = $(this).attr('alt');
        if(alt.includes('[vitrine-')){
            let regExp = /\[vitrine-(.*?)\]/;
            let match = regExp.exec(alt);
            if($('.vitrine-' + match[1]).length == 1){
                if($('#theme_customBanners-' + match[1]).length == 0){
                    $('.vitrine-' + match[1] + ' + ul').after('<div class="theme_customBanners" id="theme_customBanners-' + match[1] + '"></div>');
                }
                $(this).closest('li').appendTo('#theme_customBanners-' + match[1]);               
            }
        }else{
            if(movie && !alt.includes('[movie]')){
                $(this).closest('li').remove();
            }
        }
    });    
    $('.theme_customBanners li').wrap('<div class="item"/>').contents().unwrap();
};

theme.functions.createField = function (oObj){
    let field = $('<div class="theme-customInputElement"></div>');    
    field.append('<label>'+oObj.label+'</label>');
    
    if("text,number,password,tel,email,date,color".split(',').includes(oObj.type)){
        field.append('<input type="'+ oObj.type +'" name="theme_field-'+ oObj.id +'"/>');
    }
    if(oObj.type == "textarea"){
        field.append('<textarea rows="4" name="theme_field-'+ oObj.id +'"></textarea>');
    }
    if(oObj.type == "select"){
        let select = $('<select name="theme_field-'+ oObj.id +'"></select>');
        $.each(oObj.list, function(list_, list_value){
            select.append('<option value="'+list_value+'">'+list_value+'</option>');
        });
        field.append(select);
    }
    if(oObj.type == "boolean"){
        let select = $('<select name="theme_field-'+ oObj.id +'"></select>');
        select.append('<option value="true">Sim</option>');
        select.append('<option value="false">Não</option>');
        field.append(select);
    }
    return field;

};

theme.functions.beforeInit = function(){
//custom content
};

theme.templates = [];

theme.functions.init = function(){
    theme.isLogged = $('.bem-vindo > span').text() != "identifique-se" ? true : false;
    theme.logo = $('<div></div>').append($('#cabecalho .logo').clone()).html();
    theme.storePhone = $('.barra-inicial .canais-contato .icon-phone').parent().text().replace('Telefone: ','').trim();
    theme.storeSkype = $('.barra-inicial .canais-contato .fa-skype').parent().text().replace('Skype: ','').trim();
    theme.storeWhatsapp = $('.barra-inicial .canais-contato .fa-whatsapp').parent().text().replace('Whatsapp: ','').trim();
    theme.storeMail = "";
    theme.storeSkype = $('.barra-inicial .canais-contato .fa-skype').parent().text().replace('Skype: ','').trim();
    theme.storeDescription = $('.sobre-loja-rodape > p').text();

    theme.primaryColor = $('[name="theme-color"]').attr('content');
    if(theme.primaryColor){document.documentElement.style.setProperty('--primaryColor', theme.primaryColor);}
    try{theme.buttonColor = getComputedStyle(document.querySelector('.botao.principal.botao-comprar')).backgroundColor;}catch(e){console.log(e)}

    theme.currentPage = $('body').attr('class').split(' ')[0].trim();
    theme.searchForm = $('<div></div>').append($('#cabecalho .busca #form-buscar').first().clone()).html();
    theme.socialIcons = $('<div></div>').append($('.barra-inicial .lista-redes a').clone()).html();

    theme.headerMenu = $('<div></div>').append($('.menu.superior').clone()).html();
    theme.footerCategories = $('<div></div>').append($('.links-rodape-categorias > ul').clone()).html();
    theme.footerPages = $('<div></div>').append($('.links-rodape-paginas > ul').clone()).html();

    theme.footerSeals = $('<div></div>').append($('#rodape .selos').clone()).html();
    theme.footerPayments = $('<div></div>').append($('#rodape .bandeiras-pagamento').clone()).html();
    theme.footerGateways = $('<div></div>').append($('#rodape .gateways-rodape').clone()).html();
    theme.headerCart = $('<div></div>').append($('#cabecalho .carrinho').clone()).html();
    theme.newsletter = $('<div></div>').append($('#barraNewsletter').clone()).html();

    theme.icon = {};
    theme.icon.sideCartClose = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="arrow-back"><rect width="24" height="24" transform="rotate(90 12 12)" opacity="0"/><path d="M19 11H7.14l3.63-4.36a1 1 0 1 0-1.54-1.28l-5 6a1.19 1.19 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13a1.19 1.19 0 0 0 .09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .64-.23 1 1 0 0 0 .13-1.41L7.14 13H19a1 1 0 0 0 0-2z"/></g></g></svg>';
    theme.icon.cart = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10H21M3 10L5 20H19L21 10M3 10L9 4M21 10L15 4" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    theme.icon.wishlist = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    theme.icon.search = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4697 20.5303C19.7626 20.8232 20.2374 20.8232 20.5303 20.5303C20.8232 20.2374 20.8232 19.7626 20.5303 19.4697L19.4697 20.5303ZM17.25 10.5C17.25 14.2279 14.2279 17.25 10.5 17.25V18.75C15.0563 18.75 18.75 15.0563 18.75 10.5H17.25ZM10.5 17.25C6.77208 17.25 3.75 14.2279 3.75 10.5H2.25C2.25 15.0563 5.94365 18.75 10.5 18.75V17.25ZM3.75 10.5C3.75 6.77208 6.77208 3.75 10.5 3.75V2.25C5.94365 2.25 2.25 5.94365 2.25 10.5H3.75ZM10.5 3.75C14.2279 3.75 17.25 6.77208 17.25 10.5H18.75C18.75 5.94365 15.0563 2.25 10.5 2.25V3.75ZM20.5303 19.4697L16.3428 15.2821L15.2821 16.3428L19.4697 20.5303L20.5303 19.4697Z" fill="black"/></svg>';
    theme.icon.account = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    theme.icon.newsletter = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="email"><rect width="24" height="24" opacity="0"/><path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z"/></g></g></svg>';
    theme.icon.filter = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="funnel"><rect width="24" height="24" opacity="0"/><path d="M13.9 22a1 1 0 0 1-.6-.2l-4-3.05a1 1 0 0 1-.39-.8v-3.27l-4.8-9.22A1 1 0 0 1 5 4h14a1 1 0 0 1 .86.49 1 1 0 0 1 0 1l-5 9.21V21a1 1 0 0 1-.55.9 1 1 0 0 1-.41.1zm-3-4.54l2 1.53v-4.55A1 1 0 0 1 13 14l4.3-8H6.64l4.13 8a1 1 0 0 1 .11.46z"/></g></g></svg>';
    theme.icon.seeMore = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="eye"><rect width="24" height="24" opacity="0"/><path d="M21.87 11.5c-.64-1.11-4.16-6.68-10.14-6.5-5.53.14-8.73 5-9.6 6.5a1 1 0 0 0 0 1c.63 1.09 4 6.5 9.89 6.5h.25c5.53-.14 8.74-5 9.6-6.5a1 1 0 0 0 0-1zM12.22 17c-4.31.1-7.12-3.59-8-5 1-1.61 3.61-4.9 7.61-5 4.29-.11 7.11 3.59 8 5-1.03 1.61-3.61 4.9-7.61 5z"/><path d="M12 8.5a3.5 3.5 0 1 0 3.5 3.5A3.5 3.5 0 0 0 12 8.5zm0 5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/></g></g></svg>';
    theme.icon.close = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g data-name="Layer 2"><g data-name="close"><rect width="24" height="24" transform="rotate(180 12 12)" opacity="0"/><path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z"/></g></g></svg>';

    
    
    if (!theme.templates.header) theme.templates.header = '<div id="theme_header_1"><div class="conteiner-fluid"><div class="row-flex align-items-center"><div class="col" id="theme_header-logo"><button type="button" id="theme_header-menu-trigger"></button></div><div class="col-auto justify-content-center" id="theme_header-menu"></div><div class="col"><ul id="theme_header-functions"></ul></div></div></div></div>';
    if (!theme.templates.search) theme.templates.search = '<div class="theme_aside theme_search right"><div class="theme_aside-header"><button type="button" class="search-trigger" >'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.searchTitle +'</span></div><div class="theme_aside-content" id="theme_search"></div></div>';
    if (!theme.templates.account) theme.templates.account = '<div class="theme_aside theme_account right"><div class="theme_aside-header"><button type="button" class="account-trigger" >'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.accountTitle +'</span></div><div class="theme_aside-content" id="theme_account"></div></div>';
    if (!theme.templates.filters) theme.templates.filters = '<div class="theme_aside theme_filter right"><div class="theme_aside-header"><button type="button" class="filter-trigger" >'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.filtersTitle +'</span></div><div class="theme_aside-content" id="theme_filter"></div></div>';
    if (!theme.templates.footer){
        theme.templates.footer = '<div class="row-flex justify-content-between">' + 
        (theme.settings.footer.institutional == true ? '<div class="col-auto"><div id="theme_footer-content-institutional"></div></div>' : '') +
        (theme.settings.footer.pages == true ? '<div class="col-auto"><h4>'+ theme.lang.footerTitle1 +'</h4><div id="theme_footer-content1"></div></div>' : '') +
        (theme.settings.footer.categories == true ?  '<div class="col-auto"><h4>'+ theme.lang.footerTitle2 +'</h4><div id="theme_footer-content2"></div></div>' : '') +
        (theme.settings.footer.payments == true ? '<div class="col-auto"><h4>'+ theme.lang.footerTitle3 +'</h4><div id="theme_footer-content3"></div></div>' : '' ) +
        (theme.settings.footer.newsletter == true ? '<div class="col-auto"><h4>'+ theme.lang.footerTitle4 +'</h4><div id="theme_footer-content4"></div></div>' : '') +
        '</div>';  
    } 
    if (!theme.templates.asideMenu) theme.templates.asideMenu = '<div class="theme_aside theme_menu left"><div class="theme_aside-header"><span>'+ theme.lang.menuTitle +'</span><button type="button" class="theme_menu-trigger" >'+ theme.icon.sideCartClose +'</button></div><div class="theme_aside-content" id="theme_menu-aside"></div></div>';
    // console.log(theme.templates.header);
    // console.log(theme.templates.search);
    // console.log(theme.templates.account);
    // console.log(theme.templates.filters);
    try{
        $('html').attr('alpix-theme',window.LOJA_ID);
        try{
            $(document).ready(function(){
                theme.functions[theme.currentPage]();
            });
        }catch(e){}

        $('body').append('<div class="theme_aside-shadow"></div>');
        
        if($('.carrinho-checkout').length == 0){theme.build.header(2);theme.build.asideMenu();}
        theme.build.footer(1);
        theme.build.search(1);    
        theme.build.account(1);    
        theme.functions.sideCartSet();
        theme.functions.sideCartActions();
        theme.functions.resizeBanners();
        theme.functions.unwrapProductList();
        theme.functions.flags();    
        theme.functions.productListActions();    
        theme.functions.productListImageSize(theme.settings.imageSize);
        theme.watch();
        
        const el = document.querySelector("#cabecalho")
        const observerMenu = new IntersectionObserver( 
        ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
        { threshold: [1] }
        );    
        observerMenu.observe(el);    
        $('body').css('opacity','1');
        $('.theme_aside-shadow').click(function(){
            $('body').removeClass('sideCart-visible').removeClass('asideSearch-visible').removeClass('asideMenu-visible').removeClass('asideAccount-visible');
        })
    }catch(e){
        $('body').css('opacity','1')
    }
};
theme.functions.unwrapProductList = function(){
    $('.listagem > ul > li > ul > li').attr('class','');
    $('.listagem-item').unwrap().unwrap().unwrap().wrap('<li/>');
    if($('.listagem-linha.flexslider').length){
        $('.listagem-linha.flexslider').each(function(){
            let listagemUL = $(this).parent('ul');
            let listagemQtdLinhas = $(this).parent('ul').attr('data-produtos-linha');
            theme.settings.sliders.products.slidesToShow = parseInt(listagemQtdLinhas);
            theme.functions.flexDestroy($(this));
            listagemUL.find('.listagem-linha').apx_slick(theme.settings.sliders.products);
            $(this).removeClass('flexslider');

            listagemUL.find('[data-imagem-caminho]').each(function(){
                $(this).after('<img src="'+ $(this).attr('data-imagem-caminho')+'" class="imagem-zoom"/>');
            })
        })   
    }
};
theme.functions.resizeBanners = function(){
    $('.secao-banners img').each(function(){
        let url = $(this).attr('src').replace('400x400/','700x700/').replace('1140x1140/','1920x1920/');
        $(this).attr('src',url);

    })
};

theme.functions.blockPage = function (status){
    if(status){
        $('body').append('<div id="apx_loader"><div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>');
    }else{
        $('#apx_loader').remove();
    }   
};

theme.watch = function(){
    $(window).resize(function(){
        theme.functions.sideCartScroll();
        theme.functions.productListImageSize(theme.settings.imageSize);
    });
    $(window).scroll(function(){
        theme.functions.sideCartScroll();
    })
    $('#rodape > div:last-child a').attr('href',theme.info.ref);
    $('#rodape > div:last-child a').before('<a href="'+ theme.info.external +'" target="_blank">'+ theme.info.icon +'</a>');        
}

theme.functions.productListImageSize = function(param){
    if(theme.settings.productListImageFill){
        $('.listagem-item').addClass('theme-imageFill');
    }
    
    let h = $('.listagem-item').first().find('.imagem-produto').innerWidth() * param;
    $('.listagem-item .imagem-produto').css('height',h + 'px');
    


    $('.listagem-item .imagem-produto').each(function(){
        $(this).find('img').each(function(){
            let url = $(this).attr('src').replace('300x300/','500x500/').replace('400x400/','600x600/');
            $(this).attr('src',url);
        })
    })

    //$('.listagem-item .imagem-produto').css('max-height','unset');
}

theme.functions.flags = function(){
    $('.bandeira-promocao').each(function(){
        let i = $(this).text().replace('Desconto','').trim();
        $(this).text(i);
    });
}

theme.functions.productListActions = function(){
    $('.listagem-item').each(function(){
        let hasVariants = $(this).find('.botao-comprar-ajax').length > 0 ? true : false;
        let id = $(this).attr('class').split(' ')[1].replace('prod-id-','').trim();
        let url = $(this).find('.info-produto > a:first-child').attr('href');        
        let block = $('<div id="theme_list-functions"></div>');
        if(hasVariants){
            block.append($('<a href="/carrinho/produto/'+ id +'/adicionar" class="theme_buttonBuy-ajax">'+ theme.icon.cart +'<span>'+ theme.lang.productListAdd +'</span></a>'));
        }        
        block.append($('<a href="'+ url +'">'+ theme.icon.seeMore +'<span>'+ theme.lang.productListDetail +'</span></a>'));
        $(this).find('.imagem-produto').prepend(block);        
    });
    $('.listagem-item .acoes-produto, .listagem-item .acoes-produto-responsiva').remove();    
}
theme.functions.sideCartScroll = function(){
    if($("#theme_sideCart-content .scroll").length){
        let h = $('#theme_sideCart-header').innerHeight() + $('#theme_sideCart-content .table-footer').innerHeight() + $('#theme_sideCart-footer').innerHeight();
        let maxheight = $('#theme_sideCart').innerHeight();
        $('#theme_sideCart-content .scroll').css('height','calc('+ maxheight +'px - ' + h + 'px');
    }
}
theme.functions.sideCartActions = function(html){
    $(document).on("click", "#theme_sideCart .table-body .excluir a, #theme_sideCart .table-body .quantidade a:not(.atualizar-quantidade), #theme_sideCart .cupom-sucesso a", function(p) {
        p.preventDefault();
        theme.functions.blockPage(true);
        var n = $(this);
        var o = $(this).attr("href");
        let hasZero = false;
        if(o.includes('atualizar')){
            hasZero = parseInt(o.split('atualizar/')[1]) == 0 ? true : false;
        }
        if(hasZero == true){
            theme.functions.blockPage(false);
            return false;
        }else{
            $.ajax({
                url: $(this).attr("href").replace("https:", ""),
                dataType: "json"
            }).done(function(q) {
                if (q.status !== "sucesso") {
                    alert(q.mensagem);
                } else {
                    $("#theme_sideCart-content").load("/carrinho/mini", function() {
                        theme.functions.sideCart()
                    })
                }
            }).fail(function(q) {
                window.location = o
            }).always(function() { theme.functions.blockPage(false); })
        }
        
    });

    $('#theme_header-functions > li > .carrinho > a').click(function(e){
        e.preventDefault();
        if($('#theme_sideCart #theme_sideCart-content').is(':empty')){
            $("#theme_sideCart-content").load("/carrinho/mini", function() {
                theme.functions.sideCart()
            })
        }else{
            theme.functions.sideCartToggle();
        }
    })

    $('body').on('click','#theme_sideCart [for="usarCupom"]',function(){
        $(this).next('.controls').toggle();
        theme.functions.sideCartScroll();
    });
}
theme.functions.sideCartSet = function(){
    $(document).on("click", ".theme_buttonBuy-ajax", function(o) {
        o.preventDefault();
        var n = $(this);
        let previousText = n.attr('text');
        n.addClass("loading");
        $.ajax({
            url: $(this).attr("href").replace("https:", ""),
            dataType: "json"
        }).done(function(p) {
            if (p.status !== "sucesso") {
                alert(p.mensagem);
            } else {
                $("#theme_sideCart-content").load("/carrinho/mini", function() {
                    theme.functions.sideCart()
                })
            }
        }).fail(function(p) {
            window.location = n.attr("href")
        }).always(function() {            
            n.text(previousText).removeClass("loading");
        })
    });
    //$('body').append('<div id="theme_sideCart-shadow"></div><div id="theme_sideCart"><div id="theme_sideCart-header"><button type="button" onclick="theme.functions.sideCartToggle()">'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.sideCartTitle +'</span></div><div id="theme_sideCart-content"></div><div id="theme_sideCart-footer"><a href="/carrinho/index" class="botao">Finalizar Compra</div></div></div>');    
    $('body').append('<div id="theme_sideCart" class="theme_aside right"><div class="theme_aside-header" id="theme_sideCart-header"><button type="button" onclick="theme.functions.sideCartToggle()">'+ theme.icon.sideCartClose +'</button><span>'+ theme.lang.sideCartTitle +'</span></div><div id="theme_sideCart-content"></div><div id="theme_sideCart-footer"><a href="/carrinho/index" class="botao principal botao-comprar">Finalizar Compra</div></div></div>');    
}
theme.functions.sideCart = function(){
    //$('#theme_sideCart-content').html(html);
    $('body').addClass('sideCart-visible');  
    theme.functions.sideCartScroll();  
}

theme.functions.sideCartToggle = function(){
    if($('#theme_sideCart-content:empty').length){
        $("#theme_sideCart-content").load("/carrinho/mini", function() {
            theme.functions.sideCart()
        })
    }
    $('body').toggleClass('sideCart-visible');
}

theme.functions['pagina-cadastro'] = function(){
    $('#id_email').val() == "_" ? $('#id_email').val('') : false;
};

theme.functions['pagina-inicial'] = function(){
    if($('.secao-principal > .coluna').length){
        $('.secao-principal > .conteudo').toggleClass('span9 span12');
        $('.secao-principal > .coluna').remove();
    }
    if($('.marcas').length){
        theme.functions.flexDestroy($('.marcas .flexslider'));
        $('.marcas .slides').apx_slick(theme.settings.sliders.brands);
        $('<div class="titulo-categoria cor-principal"><strong>'+ theme.lang.brandTitle +'</strong></div>').prependTo('.marcas');
    }
    
};

theme.functions['pagina-categoria'] = function(){
    theme.build.productFilter(1);

    if(theme.settings.extraPagination){
        let pagination = $('.pagination').first().clone();
        pagination.insertAfter('#listagemProdutos');
    }

    let category_description = ""
    if($('h4.titulo .icon-file-text').length > 0){
        category_description = $('h4.titulo .icon-file-text').closest('div').find('p').html()
    }

    if($('.secao-principal > .coluna').length){
        $('.secao-principal > .conteudo').toggleClass('span9 span12');
        $('.secao-principal > .coluna').remove();
    }
    
    

    $('<div id="theme_listing"></div>').insertAfter('h1.titulo');
    $('<div id="theme_listing-info"></div>').appendTo('#theme_listing');
    $('<div id="theme_listing-filters"></div>').appendTo('#theme_listing');
    $('#botaoOrdenar + ul').find('a').find('i').remove();
    $('#botaoOrdenar + ul').find('a').appendTo('#theme_listing-filters');
    let currentPage = parseInt($('.pagination').first().find('.active > a').text().replaceAll('.',''));    
    let lastPage = parseInt($('.pagination').first().find('li').eq(-2).text().replaceAll('.',''));
    $('.ordenar-listagem').remove();
    
    if($('.listagem-item').length > 1 ||  $('#theme_filter li.active').length > 0){
        $('<button type="button" class="filter-trigger btn-icon">'+ theme.icon.filter +'<span>Filtrar Resultados</span></button>').appendTo('#theme_listing-filters');        
    }else{
        $('#theme_listing-filters > a:last-child').css('margin-right','0');
    }
    let selector = $('<select name="changePage"></select>');
    for(i = 1; i <= lastPage; i ++){
        let cleanUrl = '';
        if(window.location.search == ''){
            cleanUrl = window.location.pathname + '?pagina=' + i;    
        }
        if(window.location.search != '' && !window.location.search.includes('pagina')){
            cleanUrl = window.location.pathname + window.location.search + '&pagina=' + i;        
        }
        if(window.location.search.includes('pagina')){
            cleanUrl = window.location.pathname + window.location.search.split('&pagina')[0] + '&pagina=' + i;
        }
       
        selector.append('<option value="'+ cleanUrl +'" '+ (i == currentPage ? 'selected' : '') +'>'+ i +'</option>');
    }

    let listing = $('<span>Página <span class="selectorContainer"></span> de '+ lastPage + '. Exibindo ' + $('.listagem-item').length  + ' produtos.</span>');
    
    if(isNaN(currentPage)){
        listing = $('<span>Exibindo ' + $('.listagem-item').length  + ' produtos.</span>');
    }
    
    listing.find('.selectorContainer').append(selector);
    $('#theme_listing-info').append(listing);        

    if($('#theme_filter li.active').length > 0){
        $('.filter-trigger > span').append('<i>'+ $('#theme_filter li.active').length +'</i>');
        if(window.location.search.includes('&q=')){
            $('<a id="theme_filter-clean" href="'+ window.location.pathname + '?q='+window.location.search.split('&q=')[1]+'"><i class="icon-undo"></i>&nbsp;&nbsp;<span>Limpar Filtros</span></a>').prependTo('#theme_filter.theme_aside-content');
        }else if(window.location.search.includes('?q=')){
            $('<a id="theme_filter-clean" href="'+ window.location.pathname + '?q='+window.location.search.split('?q=')[1]+'"><i class="icon-undo"></i>&nbsp;&nbsp;<span>Limpar Filtros</span></a>').prependTo('#theme_filter.theme_aside-content');
        }
        else{
            $('<a id="theme_filter-clean" href="'+ window.location.pathname +'"><i class="icon-undo"></i>&nbsp;&nbsp;<span>Limpar Filtros</span></a>').prependTo('#theme_filter.theme_aside-content');
        }
    }


    if(!theme.isMobile){        
        document.addEventListener("DOMContentLoaded", function() {
            let h = $('#cabecalho').innerHeight() - 1;
            $('#theme_listing').addClass('sticky_this');
            $('#theme_listing').css('top', h + 'px');
        });
        window.addEventListener('resize', function(event) {
            let h = $('#cabecalho').innerHeight() - 1;
            $('#theme_listing').addClass('sticky_this');
            $('#theme_listing').css('top', h + 'px');
        });
        window.addEventListener('load', function(event) {
            let h = $('#cabecalho').innerHeight() - 1;
            $('#theme_listing').addClass('sticky_this');
            $('#theme_listing').css('top', h + 'px');
        });
    }
    $('#theme_listing-filters a').each(function(){
        if(window.location.href.indexOf($(this).attr('href')) >= 0){
            $(this).css('font-weight','bold');
        }
    });

    $('#theme_listing [name="changePage"]').change(function(){
        window.location.href = $(this).val();
    });

    if(category_description != ""){
        $('<p>'+ category_description +'</p>').insertAfter('h1.titulo')
    }

    $('#corpo').css('overflow-x','unset');
    // if($('.listagem-item').length <= 1){
    //     $('#theme_listing-filters').hide();
    // }
};
theme.functions['pagina-busca'] = theme.functions['pagina-categoria'];
theme.functions['pagina-marca'] = theme.functions['pagina-categoria'];
theme.functions['pagina-produto'] = function(){
    $('<div class="conteiner theme-bc"></div>').prependTo('#corpo');
    $('.breadcrumbs').appendTo('.theme-bc');
    $('.breadcrumbs > ul > li:first-child > a').html('Página Inicial');
    $('.breadcrumbs > ul').append('<li><strong class="cor-secundaria">'+ $('.info-principal-produto h1.nome-produto.titulo').text() +'</strong></li>');
    $('.parcelas-produto').remove();

    if($('.secao-principal > .coluna').length){
        $('.secao-principal > .produto').toggleClass('span9 span12');
        $('.secao-principal > .coluna').remove();
    }

    // if($('.atributo-cor').length > 0 ){
    //     $('.atributo-cor a span').each(function(){
    //         let css = $(this).attr('style').replace('border-color','background-color');
    //         $(this).attr('style', css);
    //     });
    // }    

    if($('meta[name="description"]').attr('content').length > 0 && theme.settings.productExcerpt){
        $('<p class="theme_excerpt">'+ $('meta[name="description"]').attr('content') +'</p>').insertAfter('.codigo-produto');
    }
    

    $('.produto-thumbs img').each(function(){
        let crop = $(this).attr('src').split('/')[3];
        let removeCrop = $(this).attr('src').replace(crop,'150x150');
        $(this).attr('src',removeCrop);
    });

    let h = $('.thumbs-vertical .produto-thumbs .miniaturas a').first().innerWidth() * theme.settings.imageSize;
    $('.thumbs-vertical .produto-thumbs .miniaturas a').css('height', h + 'px!important');
    
    $('.comprar .icon-shopping-cart').remove();

    $('.lista-favoritos').appendTo('.codigo-produto').attr('class','lista-favoritos adicionar-favorito')
    $('.lista-favoritos .icon-plus').before(theme.icon.wishlist);
    $('.lista-favoritos .icon-plus').remove();

    if($('.thumbs-vertical').length > 0){
        theme.functions.flexDestroy($('.thumbs-vertical #carouselImagem'));
        if($('.thumbs-vertical #carouselImagem .miniaturas a').length > theme.settings.sliders.verticalProductGallery.slidesToShow){
            $('.thumbs-vertical #carouselImagem .miniaturas').apx_slick(theme.settings.sliders.verticalProductGallery);
        }
    }
    if($('.thumbs-horizontal').length > 0){
        theme.functions.flexDestroy($('.thumbs-horizontal'));
        $('.thumbs-horizontal #carouselImagem .miniaturas').apx_slick(theme.settings.sliders.horizontalProductGallery);
        $(".produto-thumbs").on("click", ".miniaturas li a", function(d) {
            d.preventDefault();
            $(this).parent().siblings().removeClass("active");
            $(this).parent().addClass("active");
            var c = $("#imagemProduto").data("imagezoom");
            if (c) {
                c.changeImage($(this).find("img").attr("data-mediumimg"), $(this).find("img").attr("data-largeimg"))
            }
        })
    }
    $('.produto-compartilhar').remove();

    if(theme.settings.avisoEstoque != undefined){
        $('.qtde_estoque').each(function(){
            let estoque = parseInt($(this).text());
            if(theme.settings.avisoEstoque >= estoque){
                let aviso = theme.lang.avisoEstoque.replace('[qtde]',estoque);
                $('<p class="theme-avisoEstoque">'+ aviso +'</p>').insertBefore($(this).closest('.comprar'))
            }
        })
        theme.settings.avisoEstoque != undefined
    }

    $('.qtde-adicionar-carrinho').append('<button type="button"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Add</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112"/></svg></button>');
    $('.qtde-adicionar-carrinho').prepend('<button class="minus" type="button"><svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Remove</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M400 256H112"/></svg></button>');

    $('.qtde-adicionar-carrinho button').click(function(){
        let me = $(this).closest('.qtde-adicionar-carrinho');
        let input = me.find('input');
        let qtd = parseInt(input.val());

        if($(this).hasClass('minus')){
            qtd = qtd - 1
        }else{
            qtd = qtd + 1
        }

        if(qtd < 1){qtd = 1}

        input.val(qtd);
        input.trigger('change');
    });


    $('.produto-thumbs img').each(function(){
        let crop = $(this).attr('data-mediumimg').replace('600x700','1000x1000');
        $(this).attr('data-mediumimg', crop);
    });
    
    $('[data-imagem-grande]').each(function(){
        let url = $(this).attr('data-imagem-grande').replace('1000x1000','1500x1500')
        $(this).attr('data-imagem-grande', url);
    });
    $('[data-mediumimg]').each(function(){
        let url = $(this).attr('data-mediumimg').replace('600x1000','1500x1500')
        $(this).attr('data-mediumimg', url);
    })
    
    $('.produto .conteiner-imagem img').each(function(){
        let url = $(this).attr('src').replace('600x1000','1500x1500')
        $(this).attr('src', url);
    })
        
    $('.thumbs-vertical #carouselImagem .miniaturas li.slick-slide.slick-center a').click();
    
    $(window).load(function(){
        $('.thumbs-vertical #carouselImagem .miniaturas li.slick-slide.slick-center a').click();
    })

    $('.botao-comprar-ajax').unbind();
    $('.botao-comprar-ajax').removeAttr('data-loading-text');
    $('.botao-comprar-ajax').addClass('theme_buttonBuy-ajax').removeClass('botao-comprar-ajax');

    if(theme.settings.galeriaZoom == true){
        theme.functions.galeriaZoom();
    }
    
};

theme.functions['pagina-carrinho'] = function(){
    if($('.carrinho-checkout').length > 0){
        //$('.tabela-carrinho').insertBefore('#formas-pagamento-wrapper');
        $('.tabela-carrinho').wrap('<div class="caixa-sombreada theme_order-resume"></div>');
        $('<legend class="titulo cor-secundaria"><i class="icon-archive"></i>Itens do pedido</legend>').insertBefore('.tabela-carrinho');
    }
};

theme.functions['pagina-pagina'] = function(){
    if($('.secao-principal > .coluna').length){
        $('.secao-principal > .produto').toggleClass('span9 span12');
        $('.secao-principal > .coluna').remove();
    }
};

theme.functions.flexDestroy = function(oObj){
    var $els = $(oObj);
    $els.each(function() {
        var $el = $(this);
        var $elClean = $el.clone();
    
        $elClean.find('.flex-viewport').children().unwrap();
        $elClean
        .removeClass('flexslider')
        .find('.clone, .flex-direction-nav, .flex-control-nav')
            .remove()
            .end()
        .find('*').removeAttr('style').removeClass(function (index, css) {
            // If element is SVG css has an Object inside (?)
            if (typeof css === 'string') {
            return (css.match(/\bflex\S+/g) || []).join(' ');
            }
        });
    
        $elClean.insertBefore($el);
        $el.remove();
    });
}

theme.worker = {};
theme.worker.run = function(){
    $(window).load(function(){
        $.each(theme.worker, function(k, item){
            if(k != "run"){
                if(theme.worker[k].style !== undefined){
                    $('head').append(theme.worker[k].style);
                }
                if(theme.worker[k].list.length > 0 && theme.worker[k].match){
                    theme.worker[k].run();
                }            
            }        
        })
    });
};
theme.worker.mobileFullbanner = {};
theme.worker.mobileFullbanner.list = [];
theme.worker.mobileFullbanner.run = function(el){    
    if(theme.isMobile){
        $('.banner.cheio').hide();
        $('.banner.cheio').after('<div id="apx_fullbannerMobile"></div>');
        let pagingLast = parseInt($('.banner.cheio .flex-control-paging > li:last-child').text());
        $.each(theme.worker.mobileFullbanner.list, function(k,v){
            let bn = $('<div></div>');
            bn.append('<a href="'+ v.href +'" title="'+ v.title +'"><img  alt="'+ v.alt +'" src="'+ v.src +'"/></a>')
            bn.appendTo('#apx_fullbannerMobile');
        })
        $('#apx_fullbannerMobile').apx_slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows:false,
            dots:true
        });
    }
    console.log('theme.worker.mobileFullbanner OK');
};

theme.worker.sizeTable = {};
theme.worker.sizeTable.list = [];
theme.worker.sizeTable.config = {text:"Guia de Medidas", icon:"",backgroundColor: "#000",textColor:"#fff", target:".atributo-comum .cor-secundaria:contains(Tamanho)"};
theme.worker.sizeTable.run = function(el){    
    //const sizeTableProduct = parseInt($('.pagina-produto').attr('class').replace('pagina-produto produto-','').trim());
    const sizeTableProduct = $('.pagina-produto [itemprop="sku"]').text().trim();
    const sizeTableBrand = $('.pagina-produto [itemprop="brand"] [itemprop="name"]').length > 0 ? $('.pagina-produto [itemprop="brand"] [itemprop="name"]').attr('content').toLowerCase() : '';
    
    
    var themeSizeTable = theme.worker.sizeTable.list.filter( el => el.identifier == sizeTableProduct);
    if(themeSizeTable.length == 0){
        themeSizeTable = theme.worker.sizeTable.list.filter( el => el.identifier == sizeTableBrand);
    }
    if(themeSizeTable.length == 0){
        themeSizeTable = theme.worker.sizeTable.list.filter( el => el.identifier == "x");
    }

    if(themeSizeTable.length > 0){
        $(theme.worker.sizeTable.config.target).before("<div id='tabela-medidas'><a href='"+ themeSizeTable[0].src +"' class='theme_worker-sizeTable' style='"+ (theme.worker.sizeTable.config.textColor != undefined ? "color:" +  theme.worker.sizeTable.config.textColor + ";" : "") + " " + (theme.worker.sizeTable.config.backgroundColor != undefined ? "background-color:" +  theme.worker.sizeTable.config.backgroundColor + ";" : "") + "'>"+ theme.worker.sizeTable.config.icon + "" + theme.worker.sizeTable.config.text +"</a></div>");
        $(".theme_worker-sizeTable").fancybox();
    }   
    console.log('theme.worker.sizeTable OK');
};

theme.worker.testimonials = {};
theme.worker.testimonials.list = [];
theme.worker.testimonials.config = {title:"O que dizem por ai", ratingColor: "#f9d141", nameColor: "#000", descriptionColor:"#666", slidesDesktop: 3, slidesMobile: 1, target: "#blank-home-position3"};
theme.worker.testimonials.run = function(el){
    var themeTestimonials = $('<div class="theme_worker-testimonials"></div>');    
    themeTestimonials.append('<div class="titulo-categoria cor-principal"><strong>'+ theme.worker.testimonials.config.title +'</strong></div>');    
    var themeTestimonialsList = $('<ul class="slider"></ul>');
    $.each(theme.worker.testimonials.list, function(k,item){
        let li_ = $('<li></li>');
        let li = $('<div></div>');
        var content = $('<div class="content"></div>');
        if(item.img != ""){li.append('<img src="'+item.img+'"/>');}
        if(item.name != ""){content.append('<div><strong style="'+ (theme.worker.testimonials.config.nameColor != "" ? "color:" + theme.worker.testimonials.config.nameColor + ";": "") +'" >'+ item.name +'</strong></div>');}
        if(item.description != ""){content.append('<div><p style="'+ (theme.worker.testimonials.config.descriptionColor != "" ? "color:" + theme.worker.testimonials.config.descriptionColor + ";": "") +'">'+ item.description +'</p></div>');}
        let rating = $('<div class="rating"></div>')
        if(item.rating != ""){
            for(let i = 1; i<=5; i++ ){
                rating.append('<i style="'+ (theme.worker.testimonials.config.ratingColor != "" ? "color:" + theme.worker.testimonials.config.ratingColor + ";": "") +'" class="fa fa-star'+ (i<= item.rating ? '' : '-o') +'"></i>');
            }            
        }
        content.append(rating);
        li.append(content);
        li_.append(li);        
        themeTestimonialsList.append(li_);
    });
    themeTestimonials.append(themeTestimonialsList);
    themeTestimonials.appendTo(theme.worker.testimonials.config.target);
    
    $('.theme_worker-testimonials > .slider').apx_slick(theme.settings.sliders.testimonials);
    
    console.log('theme.worker.testimonials OK');
};

theme.worker.floatingWhatsapp = {};
theme.worker.floatingWhatsapp.list = [{}];
theme.worker.floatingWhatsapp.config = {icon:'<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"/><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"/><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"/><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"/><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"/></svg>', text:"Precisa de ajuda?<br><strong>Fale Conosco</strong>", textColor: "#666", textBackground: "#f8f8f8", target: "body"};
theme.worker.floatingWhatsapp.run = function(el){
    var themeFloatingWhatsapp = $('<div class="theme_worker-floatingWhatsapp"></div>');    
    themeFloatingWhatsapp.append('<a target="_blank" href="http://wa.me/'+ theme.worker.floatingWhatsapp.config.number+'"><span style="color:'+ theme.worker.floatingWhatsapp.config.textColor +';background-color:'+ theme.worker.floatingWhatsapp.config.textBackground +';">'+ theme.worker.floatingWhatsapp.config.text +'</span>'+ theme.worker.floatingWhatsapp.config.icon +'</a>');    
    themeFloatingWhatsapp.appendTo(theme.worker.floatingWhatsapp.config.target);
    console.log('theme.worker.floatingWhatsapp OK');
};

theme.worker.insertBanners = {};
theme.worker.insertBanners.list = [];
theme.worker.insertBanners.functions = {};
theme.worker.insertBanners.style = "";
theme.worker.insertBanners.config = {};
theme.worker.insertBanners.run = function(){
    $.each(theme.worker.insertBanners.list, function(k, item){
        let targetSelector = null;
        switch (item.target){
            case 'Lançamento':
                targetSelector = $('.vitrine-lancamento + ul');
                break;
            case 'Mais Vendidos':
                targetSelector = $('.vitrine-mas-vendidos + ul');
            break;
            case 'Posição':
                targetSelector = $('.pagina-inicial #listagemProdutos > ul').eq(item.position - 1);
            break; 
        }
         
        if(targetSelector.length == 1 && item.images.length > 0){
            let columns = 12/item.images.length;
            let row = $('<div class="row-fluid"></div>');
            $.each(item.images,function(k2, image){
                row.append('<div class="span'+ columns+'"><a href="'+ image.link +'"><img src="'+ image.url +'"/></a></div>');
            });
            targetSelector.after(row);
        }
    })  
}

theme.worker.insertVideos = {};
theme.worker.insertVideos.list = [];
theme.worker.insertVideos.functions = {};
theme.worker.insertVideos.style = "";
theme.worker.insertVideos.config = {};
theme.worker.insertVideos.run = function(){
    $.each(theme.worker.insertVideos.list, function(k, item){
        let targetSelector = null;
        switch (item.target){
            case 'Lançamento':
                targetSelector = $('.vitrine-lancamento + ul');
                break;
            case 'Mais Vendidos':
                targetSelector = $('.vitrine-mas-vendidos + ul');
            break;
            case 'Posição':
                targetSelector = $('.pagina-inicial #listagemProdutos > ul').eq(item.position - 1);
            case 'Rodapé':
                targetSelector = $('#blank-home-position4');
            break; 
        }
        //console.log(targetSelector.length)
        if(targetSelector.length == 1 && item.videoShare){            
            if(item.description != null){
                let container = $('<div class="container withDescription theme_worker-insertVideos"></div>');
                let row = $('<div class="row-flex align-items-center text-center"></div>');
                row.append('<div class="col"><div class="titulo-categoria cor-principal"><strong>'+ item.title +'</strong></div><div class="description">'+ item.description +'</div></div>');
                row.append('<div class="col text-center">'+ item.videoShare +'</div>');
                container.append(row);
                targetSelector.after(container);
            }else{
                let container = $('<div class="conteiner theme_worker-insertVideos"></div>');
                let row = $('<div class="row-flex align-items-center text-center"></div>');
                container.append('<div class="row"><div class="col"><div class="titulo-categoria cor-principal"><strong>'+ item.title +'</strong></div></div></div>')
                container.append('<div class="row"><div class="col text-center">'+ item.videoShare +'</div></div>');
                targetSelector.after(container);
            }            
        }
    })  
}

$(document).ready(function(){
    theme.worker.insertBanners.match = $('.pagina-inicial').length == 1;
    theme.worker.insertVideos.match = $('.pagina-inicial').length == 1;
    theme.worker.floatingWhatsapp.match = theme.settings.whatsappButton;
    theme.worker.mobileFullbanner.match = $('.pagina-inicial').length == 1;
    theme.worker.testimonials.match = $('.pagina-inicial').length > 0;
    theme.worker.sizeTable.match = $('.pagina-produto').length > 0;
    theme.worker.floatingWhatsapp.config.number =  "55" + $('.barra-inicial .canais-contato .fa-whatsapp').parent().text().replace('Whatsapp: ','').replace('(','').replace(')','').replace('-','').replaceAll(' ','').trim();

    
    theme.functions.beforeInit();
    theme.functions.init();
    theme.worker.run();

    theme.functions.productListImageSize(theme.settings.imageSize);

    /* 2.6 */
    //funcao ocultar categorias no menu
    $('.menu.superior > .nivel-um > li > a > strong:contains(Ocultar)').closest('li').prev('li').nextAll().remove();

    //funcao ocultar paginas no menu
    $('#theme_footer-content1 > ul > li > a:contains(Ocultar)').closest('li').prev('li').nextAll().remove();
    

    //theme.benefitsStripe
    if(theme.benefitsStripe.active == 1 && theme.benefitsStripe.list.length > 0 && $('.pagina-inicial').length > 0){
        $('.secao-principal').prepend('<div class="theme_benefitsStripe"></div>');
        $.each(theme.benefitsStripe.list, function(key, item){
            let block = $('<div class="item"></div>');
            if(item.img){ block.append('<img src="'+ item.img +'"/>') }
            block.append('<div class="text"></div>');
            if(item.title){ block.find('.text').append('<strong>'+ item.title +'</strong>') }
            if(item.subtitle){ block.find('.text').append('<p>'+ item.subtitle +'</p>') }            
            if(item.link){ block.wrapInner('<a href="'+ item.link +'"></a>') }
            block.appendTo('.theme_benefitsStripe');
        });
        $('.theme_benefitsStripe').apx_slick(theme.settings.sliders.benefitsStripe);
    }

    

    //cep no carrinho nativo
    $('.pagina-carrinho #formCalcularFrete').closest('tr').attr('id','cep-wrapper');
    $('.pagina-carrinho .bg-dark').each(function(){
        if($(this).html().trim().length == 0){
            $(this).remove();
        }
    });

    // if(window.IS_STORE_ASYNC){        
    //     triggerCDN();
    // }
});
$(window).load(function(){
    theme.functions.productListImageSize(theme.settings.imageSize);
});

$(document).ready(function(){
    if(window.IS_STORE_ASYNC){
        triggerCDN();
    }
})
$(window).load(function(){
    if(window.IS_STORE_ASYNC){
        triggerCDN();
    }
});



