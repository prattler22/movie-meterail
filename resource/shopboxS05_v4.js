/**
 * 네이버 쇼핑박스. (구버전 : shopboxR0005_v2.js)
 */
(function(global, $) {
	'use strict';

	var sbData = global.sbData = {};
	sbData.version = '3.0';

	// 타입 구분
	sbData.typeProduct = 'product';
	sbData.typeMall = 'mall';
	sbData.typeMen = 'men';

	// 카테고리
	sbData.category = "";

	// 노출 엘레멘트 관련
	sbData.exposeElementStates = [];
	sbData.visibleSeconds = 1;
	sbData.visibleRatio = 0.5;
	sbData.observer = null;

	sbData.initExposeElementStates = function() {
		sbData.exposeElementStates = {};

		var elements = document.querySelectorAll('[id^="goodsItem_"]');
		if (! elements) {
			return;
		}

		var now = new Date();
		for (var idx = 0; idx < elements.length; idx ++) {
			sbData.exposeElementStates[elements[idx].id] = {
				inputTime: now,
				isExpose: false,
			};
		}
	}

	sbData.initObserver = function () {
		if (sbData.observer) {
			sbData.observer.disconnect();
		}

		var elements = document.querySelectorAll('[id^="goodsItem_"]');
		for (var idx = 0; idx < elements.length; idx ++) {
			var element = elements[idx];
			sbData.observer.observe(element);
		}
	};

	sbData.intersectionObserverCallback = function (entries, observer) {
		for (var idx = 0; idx < entries.length; idx ++) {
			var entry = entries[idx];
			sbData.exposeElementStates[entry.target.id].inputTime = new Date();
			sbData.exposeElementStates[entry.target.id].isExpose = (entry.intersectionRatio >= sbData.visibleRatio);
		}
	}

	sbData.checkExposeElementStates = function () {
		for (var id in sbData.exposeElementStates) {
			if (! sbData.exposeElementStates.hasOwnProperty(id)) {
				continue;
			}

			var state = sbData.exposeElementStates[id];
			var element = document.getElementById(id);
			var exposure = element.getAttribute("exposure");

			if (state.isExpose && ! exposure) {
				var now = new Date();
				var interval = (now.getTime() - state.inputTime.getTime()) / 1000;

				if (interval > sbData.visibleSeconds) {
					var bizCd = element.getAttribute("bizCd");
					var expsTrtrCd = element.getAttribute("expsTrtrCd");
					var adCntsSeq = element.getAttribute("adCntsSeq");
					var cntsTpCd = element.getAttribute("cntsTpCd");
					var inflowCd = element.getAttribute("inflowCd");
					var expsPage = element.getAttribute("expsPage");

					sbData.mstLogSend(bizCd, expsTrtrCd, adCntsSeq, cntsTpCd, inflowCd, expsPage);

					element.setAttribute("exposure", "true");
					sbData.observer.unobserve(element);
				}
			}
		}
	}

	// sbData.parentHeightControl = function() {
	// 	if(typeof window.parent.adjustShopcastHeight !== "undefined") {
	// 		window.parent.adjustShopcastHeight(window.document.body.offsetHeight);
	// 	}
	// };

	sbData.getCookie = function (cookieName){
		var cookieValue = null;
		if (document.cookie){
			var array = document.cookie.split((escape(cookieName)+'='));
			if (array.length >= 2){
				var arraySub = array[1].split(';');
				cookieValue = unescape(arraySub[0]);
			}
		}

		return cookieValue;
	}

	// use event log only
	sbData.isInViewportForParent = function (element) {
		var currentWindow = parent.window.document.getElementById("shopcast_iframe");
		if (! currentWindow) {
			console.log("no parent window");
			return false;
		}

		var currentWindowRect = currentWindow.getBoundingClientRect();
		var rect = element.getBoundingClientRect();

		return (
			(rect.top + currentWindowRect.top) >= 0 &&
			(rect.left + currentWindowRect.left) >= 0 &&
			(rect.bottom + currentWindowRect.top) <= (parent.window.innerHeight || parent.document.documentElement.clientHeight) &&
			(rect.right + currentWindowRect.left) <= (parent.window.innerWidth || parent.document.documentElement.clientWidth)
		);
	}

	sbData.checkActualExposureEventLog = function () {
		var eventLogHost = this.getCookie("_shopboxeventlog");
		if (! eventLogHost) {
			return;
		}
		if (eventLogHost === "false") {
			return;
		}

		// 버튼 유효노출 로깅을 위한 elementId Map : 버튼은 기존 id가 있어서 필요한 방식으로 mapping 하는 rule이 필요 (임시로직)
		var arrowBtnEleIds = ["prod_page_prev", "prod_page_prev_buttom", "prod_plus_page_prev", "news_page_prev", "tmallA_page_prev", "tmallA_page_prev_bottom", "tmallB_page_prev", "men_page_prev", "men_page_prev_bottom", "men_plus_page_prev", "pf_page_prev"];
		var arrowBtnEleIdMap = {
			"prod_page_prev": "arrowBtnLeft_0413_0",
			"prod_page_prev_buttom": "arrowBtnLeft_0413_1",
			"prod_plus_page_prev": "arrowBtnLeft_0413_2",
			"news_page_prev": "arrowBtnLeft_0421_0",
			"tmallA_page_prev": "arrowBtnLeft_041201_0",
			"tmallA_page_prev_bottom": "arrowBtnLeft_041201_1",
			"tmallB_page_prev": "arrowBtnLeft_041202_0",
			"men_page_prev": "arrowBtnLeft_0415_0",
			"men_page_prev_bottom": "arrowBtnLeft_0415_1",
			"men_plus_page_prev": "arrowBtnLeft_0415_2",
			"pf_page_prev": "arrowBtnLeft_0422_0"
		}

		for (var idx = 0; idx < arrowBtnEleIds.length; idx ++) {
			var elementId = arrowBtnEleIds[idx];
			var el = document.getElementById(elementId);

			if (el) {
				if (sbData.isInViewportForParent(el)) {
					var exposure = el.getAttribute("exposure");
					if (! exposure) {
						elementId = arrowBtnEleIdMap[elementId] ? arrowBtnEleIdMap[elementId] : elementId;
						var split = elementId.split("_");

						sbData.eventLogSend({
							"position": split[0],
							"bizCd": split[1],
							"type": "actualExposure",
							"index" : split[2],
						});
						el.setAttribute("exposure", "true");
					}
				}
			}
		}
	}

	sbData.eventLogSend = function (body) {
		var xhr = new XMLHttpRequest();
		var url;

		if (phase == 'LOCAL') {
			url = 'http://local.shopping.naver.com:8080/event/frontPage/log';
		} else if (phase == 'DEV') {
			url = 'https://dev-cologger.shopping.naver.com/event/frontPage/log';
		} else if (phase == 'STAGE') {
			url = 'https://stg-cologger.shopping.naver.com/event/frontPage/log';
		} else {
			url = 'https://cologger.shopping.naver.com/event/frontPage/log'; // 운영환경
		}

		xhr.open('POST', url);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.withCredentials = true;
		xhr.onload = function() {
			if (xhr.status !== 200) {
				console.log('send error');
			}
		}

		xhr.send(JSON.stringify(body));
	}

	sbData.mstLogSend = function (bizCd, expsTrtrCd, adCntsSeq, cntsTpCd, inflowCd, expsPage) {
		var xhr = new XMLHttpRequest();
		var url;

		if (phase == 'LOCAL') {
			url = 'http://local.shopping.naver.com:8080/api/v1/validexpose';
		} else if (phase == 'DEV') {
			url = 'https://dev-cologger.shopping.naver.com/api/v1/validexpose';
		} else if (phase == 'STAGE') {
			url = 'https://stg-cologger.shopping.naver.com/api/v1/validexpose';
		} else {
			url = 'https://cologger.shopping.naver.com/api/v1/validexpose'; // 운영환경
		}

		url = url + "/biz/" + bizCd + "/expsTrtr/" + expsTrtrCd + "?adCntsSeqs=" + adCntsSeq;
		if (cntsTpCd) {
			url = url + "&cntsTypeCd=" + cntsTpCd;
		}
		if (inflowCd) {
			url = url + "&inflowCd=" + inflowCd;
		}
		if (expsPage) {
			url = url + "&expsPage=" + expsPage;
		}

		xhr.open('GET', url);
		xhr.withCredentials = true;
		xhr.onload = function() {
			if (xhr.status !== 200) {
				console.log('send error');
			}
		}
		xhr.send();
	}

	/**
	 * html 데이터 가져오기.
	 * @param url
	 * @param params
	 * @param targetElemId
	 */
	sbData.getCnts = function(url, params, targetElemId, callback) {
		params.bucket = bucket;

		$.ajax( {
			url: url,
			data: params,
			method: 'GET',
			dataType: 'html',
			cache: false,
			async :	true,
			timeout: 10000
		} )
			.done(function(data, textStatus, jqXHR) {
				try {
					if (jqXHR.status === 200 && data !== null && data !== '') {
						$('#' + targetElemId).html(data);
						// sbData.parentHeightControl();

						// 유효노출 이벤트 로그 추가
						sbData.initExposeElementStates();
						sbData.initObserver();

						sbData.checkActualExposureEventLog();

						sbData.initPlusDeal();
						if (callback && typeof callback === "function") {
							callback();
						}
					}
				} catch (e) {
					console.log(e);
				}
			})
			.fail(function(jqXHR, textStatus, errorThrown) {
				console.log(errorThrown);
			})
			.always(function() {
			});
	};

	// 탭메뉴명 구하기
	sbData.getTabName = function (typeName) {
		return 'tab_' + typeName;
	};

	// 탭메뉴 클릭시
	sbData.clickTab = function (typeName, targetElemId) {

		$("#" + this.getTabName(this.typeProduct) + " a:first-child").removeAttr('aria-selected');
		$('#' + this.getTabName(this.typeMall) + ' a:first-child').removeAttr('aria-selected');
		$('#' + this.getTabName(this.typeMen) + ' a:first-child').removeAttr('aria-selected');
		$('#' + this.getTabName(typeName) + ' a:first-child').attr('aria-selected', true);

		this.getCnts(tabTitle[typeName],{}, targetElemId);
	};

	// [이전] 클릭시
	sbData.prev = function(typeName, targetElemId, curOrder, exposePage, bannerCurOrder, bannerExposePage, callback) {
		this.getCnts(tabTitle[typeName],{type:'prev', order:curOrder, exposePage:exposePage, bannerType:'prev', bannerOrder:bannerCurOrder, bannerExposePage:bannerExposePage}, targetElemId, callback);
	};

	// [다음] 클릭시
	sbData.next = function(typeName, targetElemId, curOrder, exposePage, bannerCurOrder, bannerExposePage, callback) {
		this.getCnts(tabTitle[typeName],{type:'next', order:curOrder, exposePage:exposePage, bannerType:'next', bannerOrder:bannerCurOrder, bannerExposePage:bannerExposePage}, targetElemId, callback);
	};

	// 배너 롤링 아이콘 클릭시
	sbData.nextBanner = function(typeName, targetElemId, bannerCurOrder, bannerExposePage, callback) {
		this.getCnts(tabTitle[typeName], {bannerType:'next', bannerOrder:bannerCurOrder, bannerExposePage:bannerExposePage}, targetElemId, callback);
	};

	// 트렌드상품 플러스 이전 버튼 클릭시
	sbData.prevTrendProdPlusContents = function(typeName, targetElemId, curOrder, exposePage, plusCategoryListJson, initPlusCategory, callback) {
		var plusCategoryList = plusCategoryListJson ? JSON.parse(plusCategoryListJson) : [];
		if (plusCategoryList && plusCategoryList.length > 0) {
			if (initPlusCategory) {
				this.category = initPlusCategory;
			}
		}

		// 첫 페이지가 아닐 경우는 일반적인 페이징
		if (exposePage > 1) {
			this.getCnts(tabTitle[typeName],{type:'prev', order:curOrder, exposePage:exposePage, category:this.category}, targetElemId, callback);
			return;
		}

		// 첫 페이지일 경우는 이전 카테고리의 마지막 페이지로 이동
		var lastIdx = plusCategoryList.length - 1;

		for (var idx = 0; idx <= lastIdx; idx ++) {
			var prevIdx = idx - 1;

			if (this.category === plusCategoryList[idx].category) {
				if (idx === 0) {
					this.category = plusCategoryList[lastIdx].category;
				} else {
					this.category = plusCategoryList[prevIdx].category;
				}
				break;
			}
		}

		this.clickPlusCategory('productPlusContents', 'contents_productAdPlus', this.category, 'end');
	}

	// 트렌드상품 플러스 다음 버튼 클릭시
	sbData.nextTrendProdPlusContents = function(typeName, targetElemId, curOrder, exposePage, totalPage, plusCategoryListJson, initPlusCategory, callback) {
		var plusCategoryList = plusCategoryListJson ? JSON.parse(plusCategoryListJson) : [];
		if (plusCategoryList && plusCategoryList.length > 0) {
			if (initPlusCategory) {
				this.category = initPlusCategory;
			}
		}

		// 맨 뒷페이지가 아닐 경우는 알반적인 페이징
		if (exposePage < totalPage) {
			this.getCnts(tabTitle[typeName],{type:'next', order:curOrder, exposePage:exposePage, category:this.category}, targetElemId, callback);
			return;
		}

		// 맨 뒷페이지일 경우는 다음 카테고리의 첫페이지로 이동
		var lastIdx = plusCategoryList.length - 1;

		for (var idx = lastIdx; idx >= 0; idx --) {
			var nextIdx = idx + 1;

			if (this.category === plusCategoryList[idx].category) {
				if (idx === lastIdx) {
					this.category = plusCategoryList[0].category;
				} else {
					this.category = plusCategoryList[nextIdx].category;
				}
				break;
			}
		}

		this.clickPlusCategory('productPlusContents', 'contents_productAdPlus', this.category, 'start');
	}

	// input value 구하기
	sbData.val = function(elemId) {
		return $('#' + elemId).val();
	};

	sbData.focus = function(divId) {
		return function() {
			document.getElementById(divId).focus();
		}
	};

	sbData.focusBlur = function() {
		$('.goods_area:focus').blur();
	};

	sbData.clickPlusCategory = function (typeName, targetEleId, categoryName, type) {
		var categoryEle = document.getElementById("category_" + categoryName);
		if (! categoryEle) {
			return;
		}

		var params = {
			category: categoryName,
			type: type
		};

		this.getCnts(tabTitle[typeName], params, targetEleId, function () {
			sbData.category = categoryName;
			$('#category_' + categoryName).attr('aria-selected', true);
		});
	}

	var main = global.main = {}; // 메인에서 넘겨줄 함수 정의

	main.next = function() {
		var mainNextEl = document.getElementsByClassName('main_next');
		if(mainNextEl && mainNextEl.length > 0) {
			for (var i = 0; i < mainNextEl.length; i++) {
				mainNextEl[i].onclick();
			}
		}
	}

	// 주제판 연동 카테고리 매핑 작업
	main.productCategory = {
		mappingInfo: {
			BEAUTY: "fashion",
			STYLE: "fashion",
			ENTER: "fashion",
			DESIGN: "fashion",
			WEDDING: "fashion",
			LIVING: "life",
			LIVINGHOME: "life",
			"LIVING-MARKET": "life",
			MOMKIDS: "life",
			HEALTH: "life",
			FARM: "life",
			SPORTS: "digital",
			CARGAME: "digital",
			SCIENCE: "digital",
			ITTECH: "digital",
			GAMEAPP: "digital",
			BBOOM: "-",
			FINANCE: "-",
			TRAVEL: "-",
			CULTURE: "-",
			JOB: "-",
			MOVIE: "-",
			ANIMAL: "-",
			SHOW: "-",
			WITH: "-",
			LAW: "-",
			SCHOOL: "-",
			BUSINESS: "-",
			CHINA: "-",
		},
		getRandomInt: function (min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min)) + min;
		},
		click: function (boardId) {
			// var catNm = this.mappingInfo[boardId.toUpperCase()];
			// if (! catNm) {
			// 	return false;
			// }
			//
			// if (boardId === "BEAUTY") {
			// 	var rand = this.getRandomInt(1, 11);
			//
			// 	if (rand >= 1 && rand <= 7) {
			// 		catNm = "fashion";
			// 	} else {
			// 		catNm = "beauty";
			// 	}
			// }
			//
			// if (catNm === "-") {
			// 	var rand = this.getRandomInt(1, 5);
			//
			// 	if (rand === 1) {
			// 		catNm = "fashion";
			// 	} else if (rand === 2) {
			// 		catNm = "life";
			// 	} else if (rand === 3) {
			// 		catNm = "digital";
			// 	} else if (rand === 4) {
			// 		catNm = "beauty";
			// 	}
			// }
			//
			// sbData.clickPlusCategory('productPlusContents', 'contents_productAdPlus', catNm, '');

			return true;
		}
	}


	// plusdeal script
	sbData.plusdealPage = 1;
	sbData.plusdealPageSize = 3;		// 초기셋팅값
	sbData.plusdealTotalPage = 10;		// 초기셋팅값
	sbData.plusDealExposeCode = '';		// 초기셋팅값
	sbData.plusDealShowBanner = false;		// 초기셋팅값

	sbData.initPlusDeal = function() {
		if('plusdeal' !== $('#mode').val()) {
			return;
		}
		sbData.plusdealPageSize = $('#plusDealPageSize').val();
		sbData.plusdealTotalPage = $('#plusDealTotalCount').val();
		sbData.plusDealExposeCode = $('#plusDealExposeCode').val();
		sbData.plusDealShowBanner = JSON.parse($('#plusDealShowBanner').val());

		if(sbData.plusDealShowBanner) {
			return;
		}

		sbData.plusdealPage = 1;
		var firstCntsSeqs = [];
		$('.deal_item[data-page="1"]').each(function( index ) {
			firstCntsSeqs.push($(this).data('seq'));

			sbData.imgLazyLoading(this, 'cntsImgUrl');
			sbData.imgLazyLoading(this, 'cntsPlusImgUrl');
		});
		sbData.plusdealCollectLog(firstCntsSeqs);
	}

	sbData.plusdealNext = function() {
		sbData.plusdealChangePage('next');
		sbData.plusdealChangeItem();
	}

	sbData.plusdealPrev = function() {
		sbData.plusdealChangePage('prev');
		sbData.plusdealChangeItem();
	}

	sbData.plusdealChangePage = function(change) {
		if(change === 'next') {
			sbData.plusdealPage += 1;
			if(sbData.plusdealPage > sbData.plusdealTotalPage) {
				sbData.plusdealPage = 1;
			}
		} else {
			if(sbData.plusdealPage === 1) {
				sbData.plusdealPage = sbData.plusdealTotalPage;
			} else {
				sbData.plusdealPage -= 1;
			}
		}

		$('#plusdeal_current_page').text(sbData.plusdealPage);
	}

	sbData.plusdealChangeItem = function() {
		var cntSeqs = [];
		$('.list_deal > .deal_item').each(function( index ) {
			var page = $( this ).data('page');
			if(page === parseInt(sbData.plusdealPage)) {
				$( this ).css('display', 'block');
				cntSeqs.push($( this ).data('seq'));

				sbData.imgLazyLoading(this, 'cntsImgUrl');
				sbData.imgLazyLoading(this, 'cntsPlusImgUrl');
			} else {
				$( this ).css('display', 'none');
			}
		});

		sbData.plusdealCollectLog(cntSeqs);
	}

	sbData.imgLazyLoading = function(div, className) {
		var cntsImgUrl = $(div).find('img.' + className);
		var lazyImg = cntsImgUrl.data('lazy');
		var srcImg = cntsImgUrl.attr('src');
		if(lazyImg !== srcImg) {
			cntsImgUrl.attr('src', lazyImg);
		}
	}


	sbData.plusdealCollectLog = function(cntSeqs) {
		var expsTrtrCd = $('#plusDealExposeCode').val();

		try {
			if(cntSeqs === null || cntSeqs.length !== 3) {
				console.log('원쁠딜 노출 컨텐츠 갯수가 맞지 않음');
				return;
			}

			var xhr = new XMLHttpRequest();
			var url;

			if (phase === 'LOCAL' || phase === 'DEV') {
				url = 'https://dev-cologger.shopping.naver.com/';
			} else if (phase === 'STAGE') {
				url = 'https://stg-cologger.shopping.naver.com/';
			} else {
				url = 'https://cologger.shopping.naver.com/'; // 운영환경
			}

			url += '/api/v1/collect/PLUS_DEAL/' + expsTrtrCd + '?adCntsSeqs=' + cntSeqs[0] + '&adCntsSeqs=' + cntSeqs[1] + '&adCntsSeqs='+ cntSeqs[2];


			xhr.open('GET', url);
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.withCredentials = true;
			xhr.onload = function() {
				if (xhr.status !== 200) {
					console.log('send error');
				} else {
					let result = JSON.parse(xhr.response);
					for (let i = 0; i < result.exposeContents.length; i++) {
						try {
							var c = result.exposeContents[i];
							$('.deal_item[data-seq="' + c.adCntsSeq + '"]').children('a').attr('href', c.adCntsUrl);
						} catch (e) {
							console.log(e);
						}
					}
				}
			}

			xhr.send();
		} catch (e) {
			console.log(e)
		}
	}



}(this, jQuery));


/**
 * 쇼핑박스 초기화
 *  - 쇼핑박스 초기 실행시 초기화할 동작,함수를 지정
 */

(function($) {

	$( document ).ready(function() {

		$('#' + sbData.getTabName(sbData.typeProduct)+ ' > a').on( 'click', function() {
			sbData.clickTab(sbData.typeProduct,'contents');
			return false;
		});

		$('#' + sbData.getTabName(sbData.typeMall) + ' > a').on( 'click', function() {
			sbData.clickTab(sbData.typeMall,'contents');
			return false;
		});

		$('#' + sbData.getTabName(sbData.typeMen) + ' > a').on( 'click', function() {
			sbData.clickTab(sbData.typeMen,'contents');
			return false;
		});

		// sbData.parentHeightControl();
	});

	nclk_evt = 1;
	nsc = "navertop.v4";
	// nclk_do();

	sbData.observer = new IntersectionObserver(sbData.intersectionObserverCallback, {
		root: null,
		rootMargin: '0px',
		threshold: [sbData.visibleRatio]
	});
	sbData.initObserver();
	sbData.initExposeElementStates();
	setInterval(sbData.checkExposeElementStates, 500);

	window.addEventListener('message', function (e) {
		if (e.data === 'nmainChange' && e.origin.indexOf('naver.com') >= 0) {
			sbData.checkActualExposureEventLog();
		}
	}, false);

	sbData.checkActualExposureEventLog();

	sbData.initPlusDeal();
}(jQuery));

