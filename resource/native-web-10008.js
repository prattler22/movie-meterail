var darkModeType,DomUtil={getClassRegexp:function(e){return new RegExp("(^|[^A-Za-z-])"+e+"((?![A-Za-z-])|$)","gi")},elementHasClass:function(e,a){var s=DomUtil.getClassRegexp(a);return!!e&&s.test(e.className)},addClass:function(e,a){e&&!DomUtil.elementHasClass(e,a)&&(e.className=e.className.trim()+" "+a)},removeClass:function(e,a){var s=DomUtil.getClassRegexp(a);e&&(e.className=e.className.trim().replace(s,""))},toggleClass:function(e,a){DomUtil.elementHasClass(e,a)?DomUtil.removeClass(e,a):DomUtil.addClass(e,a)},setClass:function(e,a){e&&(e.className=a)}},adElement=document.querySelector("#ad-element"),mql=window.matchMedia("(prefers-color-scheme: dark)");function setDarkMode(e){e?DomUtil.addClass(adElement,"type_dark"):DomUtil.removeClass(adElement,"type_dark")}var sfAPI=window.sfAPI;sfAPI.register((function(e,a){switch(e){case"ready":case"rendered":case"viewable":break;case"hostMetaChange":if(a&&a.theme)switch(darkModeType=a.theme,a.theme){case"system":setDarkMode(mql.matches);break;case"dark":setDarkMode(!0);break;case"light":setDarkMode(!1)}}}));try{var listener=function(e){"system"==darkModeType&&setDarkMode(e.matches)};mql.addEventListener?mql.addEventListener("change",listener):mql.addListener&&mql.addListener(listener)}catch(e){}