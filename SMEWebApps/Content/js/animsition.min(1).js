/*!
 * Remark (http://getbootstrapadmin.com/remark)
 * Copyright 2015 amazingsurge
 * Licensed under the Themeforest Standard Licenses
 */
$.components.register("animsition",{mode:"manual",defaults:{inClass:"fade-in",outClass:"fade-out",inDuration:800,outDuration:500,linkElement:".animsition-link",loading:!0,loadingParentElement:"body",loadingClass:"loader",loadingType:"default",timeout:!1,timeoutCountdown:5e3,onLoadEvent:!0,browser:["animation-duration","-webkit-animation-duration"],overlay:!1,overlayClass:"animsition-overlay-slide",overlayParentElement:"body",inDefaults:["fade-in","fade-in-up-sm","fade-in-up","fade-in-up-lg","fade-in-down-sm","fade-in-down","fade-in-down-lg","fade-in-left-sm","fade-in-left","fade-in-left-lg","fade-in-right-sm","fade-in-right","fade-in-right-lg","zoom-in-sm","zoom-in","zoom-in-lg"],outDefaults:["fade-out","fade-out-up-sm","fade-out-up","fade-out-up-lg","fade-out-down-sm","fade-out-down","fade-out-down-lg","fade-out-left-sm","fade-out-left","fade-out-left-lg","fade-out-right-sm","fade-out-right","fade-out-right-lg","zoom-out-sm","zoom-out","zoom-out-lg"]},init:function(context,callback){var options=$.components.getDefaults("animsition");if(options.random){var li=options.inDefaults.length,lo=options.outDefaults.length,ni=parseInt(li*Math.random(),0),no=parseInt(lo*Math.random(),0);options.inClass=options.inDefaults[ni],options.outClass=options.outDefaults[no]}var $this=$(".animsition",context);return $this.animsition(options),$("."+options.loadingClass).addClass("loader-"+options.loadingType),$this.animsition("supportCheck",options)?($.isFunction(callback)&&$this.one("animsition.end",function(){callback.call()}),!0):($.isFunction(callback)&&callback.call(),!1)}});