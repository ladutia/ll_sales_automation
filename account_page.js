
jQuery.expr[':'].Contains = function(a, i, m) { 
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};
var acc_page = {
    init: function(){
        $('body').on('click', function(){
			$('.dropdown-action-custom.open').removeClass('open');
			$('.dropdown-actions-tab.open').removeClass('open');
			$('.stage-box.last .point.open').removeClass('open');
		});
		$('.btn-toggle-actions').on('click', function(e){
			e.preventDefault();
			$(this).parents('.box-content-actions').toggleClass('hide-actions');
		});
		$('.box-edit-details').on('click', '.btn-show-hide-desc', function(e){
			e.preventDefault();
			$(this).parents('.show-hide-desc').toggleClass('open');
		});
		$('.btn-show-more-timelines').on('click', function(e){
			e.preventDefault();
			
			acc_page.addTimelines();
			acc_page.addTimelines();
			acc_page.addTimelines();
			acc_page.addTimelines();
			acc_page.addTimelines();
		});
		$('.timelines-msg').on('click', '.tl-msg-content', function(){
			$(this).toggleClass('show-content');
			$(this).parents('.tl-msg').toggleClass('show-content');
		});
		$('.timelines-msg').on('click', '.tl-msg-content a', function(e){
			e.stopPropagation();
		});
		$('.sstimelines-msg').on('click', '.new-message__toggle-public-private', function(e){
			e.stopPropagation();
		});
		$('.prospects-search .txt-field').val('');
		$('.prospects-search .txt-field').on('keyup',function(e){
			e.stopPropagation();
			var val = $(this).val();
			if (val == ''){
				$('.wrap-list-prospects .item').show();
			} else{
				acc_page.searchProspects(val);
			}
		});
		$('.account-page').on('click', '.remove-gray-box', function(e){
			e.preventDefault();
			$(this).parents('.gray-box').remove();
		});
		$('.timelines-msg').on('click', '.btn-delete-timeline', function(e){
			e.preventDefault();
			$(this).parents('.tl-msg').remove();
			$('.timelines-msg .tl-msg:last').addClass('last-msg');
		});
		$('.box-content-actions .tabs-actions li a').on('click', function(e){
			e.preventDefault();
			var index = $(this).parents('ul:first').children('li').index($(this).parent());
			
			$(this).parent().addClass('selected').siblings('li').removeClass('selected');
			$('.wrap-tabs-content-actions .tab-content-action').removeClass('active').eq(index).addClass('active');
			
			if( $('.box-content-actions').hasClass('hide-actions') ){
				$('.btn-toggle-actions').trigger('click');
			}
			
			
			$('.dropdown-actions-tab').find('li').removeClass('selected');
			if( $(this).parent().hasClass('item-email') ){
				$('.dropdown-actions-tab').find('li.d-item-email').addClass('selected');
			} else if( $(this).parent().hasClass('item-call') ){
				$('.dropdown-actions-tab').find('li.d-item-call').addClass('selected');
			} else if( $(this).parent().hasClass('item-letter') ){
				$('.dropdown-actions-tab').find('li.d-item-letter').addClass('selected');
			} else if( $(this).parent().hasClass('item-automate') ){
				$('.dropdown-actions-tab').find('li.d-item-automate').addClass('selected');
			} else if( $(this).parent().hasClass('item-lists') ){
				$('.dropdown-actions-tab').find('li.d-item-lists').addClass('selected');
			}
		});
		$('#crm-details-popup').on('click', '.btn-star', function(e){
			e.preventDefault();
			$(this).parents('.t-field').toggleClass('hide-field');
		});
		$('#prospects-popup .btn-show-more').on('click', function(e){
			e.preventDefault();
			acc_page.showMoreProspect();
		});
		$('#prospects-popup .wrap-prospect-box').on('click', function(e){
			e.preventDefault();
			$('#prospects-popup .ll-btn-close-popup').trigger('click');
		});
		$('#prospects-popup .wrap-prospect-box a').on('click', function(e){
			e.stopPropagation();
		});
		
		$('#prospects-popup .search-prospects-popup .txt-field').val('');
		$('#prospects-popup .search-prospects-popup .txt-field').on('keyup',function(e){
			e.stopPropagation();
			var val = $(this).val();
			if (val == ''){
				$('.wrap-prospect-box').show();
			} else{
				acc_page.searchPopupProspects(val);
				if( $('#prospects-popup .wrap-prospect-box:visible').length < 1 ){
					$('#prospects-popup .wrap-prospect-box').show();
				}
			}
		});
		
		$('#select-type-activity').change(function(){
			acc_page.updateSelectTypeActivity();
		});
		$('#edit-title .t-inner').on('click', function(){
			var $box = $('#edit-title');
			var val = $.trim($(this).text());
			$(this).hide();
			$box.find('.t-field').show().find('.txt-field').val(val).attr('data-text', val).focus();
		});
		$('#edit-title .txt-field').on('blur', function(){
			var $box = $('#edit-title');
			var val = $.trim($(this).val());
			
			if (val == ''){
				val = $(this).attr('data-text');
			}
			
			$box.find('.t-field').hide();
			$box.find('.t-inner').show().text(val);
		});

		$('.details-search-fields .search-general-field').change(function(){
			acc_page.detailsPopupSearch();
		});
		$('.details-search-fields .txt-field').on('keyup', function(){
			acc_page.detailsPopupSearch();
		});
		$('.details-search-fields .txt-field').on('keypress', function(e){
			if ( e.which === 13 ) acc_page.detailsPopupSearch();
		});
		$('.crm-details-popup').find('.column-1, .column-2, .column').sortable({
			placeholder: 'ui-sortable-placeholder',
			connectWith: '.crm-details-popup .column-1, .crm-details-popup .column-2, .crm-details-popup .column'
		});
		$('.crm-details-popup .ll-popup-content').sortable({
			handle: '.move-section',
			placeholder: 'ui-sortable-placeholder',
			axis: "y",
			start: function(event, ui) {
				$('.crm-details-popup .t-fields-category').parents('.wrap-section').addClass('sortable');
				$('.crm-details-popup .t-fields-category').next('.categories-list').hide();
				$('.crm-details-popup .ui-sortable-placeholder').next('.categories-list').hide();
				$('.crm-details-popup .ll-popup-content').sortable("refreshPositions");
				ui.helper.css('width', $('.crm-details-popup .ui-sortable-placeholder').outerWidth());
			},
			stop: function(event, ui) {
				$('.crm-details-popup .wrap-section').removeClass('sortable');
				$('.crm-details-popup .t-fields-category').next('.categories-list').show();
				$('.crm-details-popup .ll-popup-content').sortable("refreshPositions");
			}
		}).disableSelection();
		$('.crm-details-popup').on('click', '.btn-hidden-field', function(e){
			e.preventDefault();
			e.stopPropagation();

			$(this).parents('.t-field').toggleClass('hidden');
		});
		$('.crm-details-popup').on('click', '.btn-full', function(e){
			e.preventDefault();
			e.stopPropagation();

			$(this).parents('.crm-details-popup').toggleClass('full');
			acc_page.detailsPopupColumn();
		});
    },
    detailsPopupSearch: function(isFirstOpen){
    	var $boxSearch = $('.details-search-fields');
    	var $filterSelect = $boxSearch.find('.search-general-field');
    	var filter = $filterSelect.val();
    	var $input = $boxSearch.find('.txt-field')
    	var val = $input.val();
    	var $popup = $('#crm-details-popup');
    	var classFilter = '';

    	if ( isFirstOpen ){
    		$input.val('');
    		$popup.find('.t-field').show();
    		$filterSelect.find('option[value="0"]').attr('selected', true);
            $filterSelect.trigger('liszt:updated');

    		$popup.find('.t-field:visible').show();
    	} else{
    		if ( filter === '1' ){
	    		classFilter = ':not(.hide-field)';
	    	} else if ( filter === '2' ){
	    		classFilter = '.social-field';
	    	}

	    	$popup.find('.t-field:visible').hide();
			$popup.find('.t-field' + classFilter).each(function(){
				$(this).children('label:Contains("'+ val +'")').each(function(){
					$(this).parents('.t-field').show();
					return false;
				});
			});
    	}
    	acc_page.detailsPopupCategoryHide();
    },
    detailsPopupCategoryHide: function(){
    	var $list = $('#crm-details-popup .categories-list');
    	$list.each(function(){
    		var $list = $(this);
    		var $titleList = $list.prev('.t-fields-category');
    		if ( $list.find('.t-field:visible').length ){
    			$titleList.show();
    			$list.find('.column-1, .column-2, .column').css('padding', '');
    			$titleList.parents('.wrap-section').css('padding', '');
    		}else{
    			$titleList.hide();
    			$list.find('.column-1, .column-2, .column').css('padding', '0');
    			$titleList.parents('.wrap-section').css('padding', '0');
    		}
    	});
    },
    detailsPopupColumn: function(){
    	var $popup = $('.crm-details-popup');
    	var columnMinWidth = 327;
    	var widthPopup = $popup.find('.ll-popup-content').width();
    	var countColumn = Math.floor(widthPopup/columnMinWidth);
    	var countCurrentCol = $popup.find('.categories-list:first').find('.column').length;
    	var minColumns = 2;
    	var countCurrentVisible = minColumns + countCurrentCol;
    	var massFields = [];

    	if (countColumn > 4)
    		countColumn = 4;

    	if (countColumn != countCurrentVisible){
			$popup.removeClass('columns-3 columns-4');

			if (countColumn === 3)
				$popup.addClass('columns-3');
			else if (countColumn === 4)
				$popup.addClass('columns-4');
			
			
			$popup.find('.categories-list').each(function(index){
				var $list = $(this);
				var countFields = 0;

				$list.find('.t-field').each(function(index){
					var detach = $(this).detach();
					massFields.push(detach);
				});

				$list.find('.column').remove();

				for(var i = 0; i < countColumn - minColumns; i++){
					$list.find('.column-1').after('<div class="column"></div>');
					$list.find('.column:not(.ui-sortable)').sortable({
						placeholder: 'ui-sortable-placeholder',
						connectWith: '.crm-details-popup .column-1, .crm-details-popup .column-2, .crm-details-popup .column'
					});
				}

				var $column = $list.find('.column-1, .column, .column-2');
				var columnLength = $column.length;
				var columnCount = columnLength;

				for(var i = 0; i < columnLength; i++){
					countFields = massFields.length;
					var countFieldsCol = Math.ceil(countFields / columnCount);

					if(countFieldsCol > 0){
						for(var j = 0; j < countFieldsCol; j++){
							$column.eq(i).append(massFields[0]);
							massFields.splice(0, 1);
						}
					}
					columnCount--;
				}

				massFields = [];
			});
    	}
    },
	updateSelectTypeActivity: function(){
		var val = $('#select-type-activity').val();
		var $selectWraper = $('#select-type-activity').parents('.select-type-activity');
		var $input = $selectWraper.next('.field-activity-name').find('.txt-field');
		var icn = 'icn-' + val.toLowerCase();
		$input.attr('placeholder', val);
		$selectWraper.removeClass('icn-call icn-email icn-task icn-meeting icn-deadline icn-lunch icn-event icn-teambuilding icn-errand').addClass(icn);
		
	},
	searchPopupProspects:function(searchText){
		$('#prospects-popup .wrap-prospect-box:visible').hide();
		$('#prospects-popup .wrap-prospect-box').each(function(){
			$(this).find('.txt-searсh:Contains("'+ searchText +'")').each(function(){
				$(this).parents('.wrap-prospect-box').show();
				return false;
			});
		});
		
	},
	searchProspects:function(searchText){
		$('.wrap-list-prospects .item:visible').hide();
		$('.wrap-list-prospects .item').find('.name:Contains("'+ searchText +'")').each(function(){
			$(this).parents('.item').show();
		});
	},
	addTimelines: function(){
		var btnHtml = '<div class="msg-btn">'+
						'<a href="javascript:void(0);" class="t-btn-gray">'+
							'<i class="icn-share">'+
							'<svg width="14px" height="10px" viewBox="0 0 14 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
								'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
									'<g id="Account-page" transform="translate(-1078.000000, -951.000000)" fill="#333333">'+
										'<g id="Group-31" transform="translate(417.000000, 771.000000)">'+
											'<g id="Group" transform="translate(23.000000, 81.000000)">'+
												'<g id="Line-text" transform="translate(0.000000, 81.523810)">'+
													'<g id="Group-2" transform="translate(564.000000, 10.000000)">'+
														'<g id="Group-21">'+
															'<g id="Group-22" transform="translate(68.000000, 0.000000)">'+
																'<g id="btn_remove">'+
																	'<g id="Group-23" transform="translate(6.066667, 7.800000)">'+
																		'<path d="M6.29833087,7.22238367 L6.12656051,7.71764521 C6.01550386,8.04001489 5.65546349,8.213581 5.32164288,8.10597425 L4.2436798,7.75850835 C3.9104008,7.65095721 3.73077639,7.30332288 3.84218401,6.9810054 L4.03955502,6.45955148 L6.29833087,7.22238367 L6.29833087,7.22238367 Z M3.54871465,6.29378521 L3.35130389,6.81560425 C3.14672084,7.40717808 3.47314738,8.03892444 4.07883507,8.23438349 L5.1568802,8.58187586 C5.7632873,8.77735059 6.41823967,8.46161506 6.6198458,7.87639995 L6.78918339,7.38815404 L10.92,8.78321053 L10.92,0.716505263 L2.08,3.27545263 L2.08,5.79777193 L3.54871465,6.29378521 L3.54871465,6.29378521 Z M12.22,0 C11.78996,0 11.44,0.337680702 11.44,0.752631579 L11.44,8.78070175 C11.44,9.19565263 11.78996,9.53333333 12.22,9.53333333 C12.65004,9.53333333 13,9.19565263 13,8.78070175 L13,0.752631579 C13,0.337680702 12.65004,0 12.22,0 L12.22,0 Z M0.78,3.01052632 C0.34996,3.01052632 0,3.34820702 0,3.76315789 L0,5.26842105 C0,5.68337193 0.34996,6.02105263 0.78,6.02105263 C1.21004,6.02105263 1.56,5.68337193 1.56,5.26842105 L1.56,3.76315789 C1.56,3.34820702 1.21004,3.01052632 0.78,3.01052632 L0.78,3.01052632 Z" id="Combined-Shape"></path>'+
																	'</g>'+
																'</g>'+
															'</g>'+
														'</g>'+
													'</g>'+
												'</g>'+
											'</g>'+
										'</g>'+
									'</g>'+
								'</g>'+
							'</svg>'+
							'</i>'+
						'</a> '+
						'<a href="javascript:void(0);" class="t-btn-gray btn-delete-timeline">'+
							'<i class="icn-delete">'+
								'<svg width="10px" height="12px" viewBox="0 0 10 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
									'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
										'<g id="Account-page" transform="translate(-338.000000, -789.000000)" fill="#333333">'+
											'<g id="Group-10" transform="translate(65.000000, 734.000000)">'+
												'<g id="Group-9" transform="translate(10.000000, 43.000000)">'+
													'<g id="Group-6" transform="translate(258.000000, 8.000000)">'+
														'<g id="btn_move">'+
															'<path d="M14.0834382,9.04499092 C13.6699306,9.45812794 11.9879952,9.58505517 9.99887166,9.58505517 C8.00974809,9.58505517 6.36823449,9.39490967 5.95247043,8.98177265 C5.9016987,9.03334546 5.86954327,9.08713645 5.85769653,9.14259109 L5.85544001,9.17253659 C5.85431175,9.19083662 5.85656827,9.19860027 5.85769653,9.20580937 L6.16052893,14.7156707 C6.18986371,15.2269624 6.78558534,16 9.99887174,16 C13.2121581,16 13.8084439,15.2269624 13.8366504,14.7156707 L14.1810327,9.26902764 C14.1844175,9.24296396 14.182161,9.23963669 14.182161,9.23575486 L14.1844175,9.20580936 C14.169186,9.15035473 14.134774,9.09656373 14.0834382,9.04499092 Z M12.2410075,4.39888235 C12.2410075,4.13759743 11.9692817,4 11.6928609,4 L8.33984375,4 C8.06401866,4 7.72667699,4.13816055 7.72667699,4.39888235 L7.49679565,6.02177693 C5.87818491,6.19521605 5,6.5465993 5,6.95373075 L5,7.72688633 C5,7.88568449 5.16978434,8.03659905 5.47480043,8.17287265 C6.27308471,8.52707138 7.99952341,8.77315221 9.99940427,8.77315221 C12.0010723,8.77315221 13.7263196,8.52707138 14.5257953,8.17287265 C14.8290242,8.03659905 15,7.88568449 15,7.72688633 L15,6.95373075 C15,6.53252145 14.2172922,6.18733246 12.5015767,6.02177693 L12.2410075,4.39888235 Z M8.68850708,4.75823677 L11.3587443,4.75823677 L11.481425,5.56121986 L8.62141927,5.56121986 L8.68850708,4.75823677 Z" id="Shape"></path>'+
														'</g>'+
													'</g>'+
												'</g>'+
											'</g>'+
										'</g>'+
									'</g>'+
								'</svg>'+
							'</i>'+
						'</a>'+
					'</div>';
		var icnMsg = '<div class="icn icn-message">'+
						'<div class="svg">'+
							'<svg width="26px" height="18px" viewBox="0 0 26 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
								'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">'+
									'<g id="Account-page" transform="translate(-452.000000, -1120.000000)" fill="#4A90E2">'+
										'<g id="Group-31" transform="translate(417.000000, 771.000000)">'+
											'<g id="Group" transform="translate(23.000000, 81.000000)">'+
												'<g id="Line-text" transform="translate(0.000000, 251.047619)">'+
													'<g id="Group-26">'+
														'<g id="Group-24" transform="translate(12.000000, 16.000000)">'+
															'<path d="M23,2.95238095 C23.551,2.95238095 24,3.40138095 24,3.95238095 L24,15.952381 C24,16.503381 23.551,16.952381 23,16.952381 L3,16.952381 C2.449,16.952381 2,16.503381 2,15.952381 L2,3.95238095 C2,3.40138095 2.449,2.95238095 3,2.95238095 L23,2.95238095 L23,2.95238095 Z M23,0.952380952 L3,0.952380952 C1.344,0.952380952 0,2.29638095 0,3.95238095 L0,15.952381 C0,17.608381 1.344,18.952381 3,18.952381 L23,18.952381 C24.656,18.952381 26,17.608381 26,15.952381 L26,3.95238095 C26,2.29638095 24.656,0.952380952 23,0.952380952 Z M17.469,9.83938095 L23.875,16.397381 L16.061,10.815381 L13,12.809381 L9.938,10.815381 L2.124,16.397381 L8.531,9.83938095 L0.784,3.80038095 L13,10.388381 L25.215,3.80038095 L17.469,9.83938095 Z" id="Combined-Shape"></path>'+
														'</g>'+
													'</g>'+
												'</g>'+
											'</g>'+
										'</g>'+
									'</g>'+
								'</g>'+
							'</svg>'+
						'</div>'+
					'</div>';
		var content = '<div class="tl-msg">'+
									'<div class="el">'+
										icnMsg +
										'<div class="v-line"></div>'+
									'</div>'+
									'<div class="tl-msg-content">'+
										btnHtml +
										'<div class="title">'+
											'Email: Interested in buying? 8/01'+
										'</div>'+
										'<div class="date-time">'+
											'8/01/2015 at 4:21 PM'+
										'</div>'+
										'<div class="text">'+
											'Make sure to follow up in this. They are really wanting to work with us. Talk about the new'+
											'sports car he just bought. Make sure to follow up in this. They are really wanting to work'+
											'with us. Talk about the new sports car he just bought. Make sure to follow up in this.'+
										'</div>'+
									'</div>'+
								'</div>';
		
		
		$('.timelines-msg .wrap-tl-msg').append(content);
		$('.timelines-msg .tl-msg').removeClass('last-msg');
		$('.timelines-msg .tl-msg:last').addClass('last-msg');
	},
	dropDownActionCustom: function(){
		$('.dropdown-action-custom > a').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('.dropdown-action-custom').toggleClass('open');
		});
		$('.dropdown-action-custom').on('mouseenter', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).addClass('open');
		});
		$('.dropdown-action-custom').on('mouseleave', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).removeClass('open');
		});
		$('.dropdown-action-custom .drop-list > ul li').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			var idx = $(this).attr('data-idx');
			//$(this).addClass('selected').siblings('li').removeClass('selected');
			$(this).parents('.dropdown-action-custom').removeClass('open');
		});
	},
	sortableSidebar:function(){
		$(".wrap-sidebar-boxs").sortable({
            handle: ".title",
            scroll: true,
            placeholder: "sidebar-box-placeholder",
            tolerance: "pointer"
        });
	},
	editorNoteAndTask: function(){
		tinymce.init({
			autoresize_min_height: 120,
			autoresize_max_height: 360,
            selector: "#add-note-editor, #task-editor-account",
            plugins: "image textcolor table save contextmenu link lists autoresize",
            auto_reset_designmode:true,
            forced_root_block : "", 
            force_br_newlines : true,
            force_p_newlines : false,
			toolbar_items_size: 'small',
            entity_encoding : "raw",
            toolbar: [
                    "bold italic underline strikethrough | bullist numlist | forecolor | alignleft aligncenter alignright alignjustify | fontselect | fontsizeselect"
            ],
			theme_advanced_resizing : true,
			theme_advanced_statusbar_location : 'bottom',
			theme_advanced_resize_horizontal : false,
			menubar: false,
			statusbar: false,
			autoresize_bottom_margin : 0
        });
	},
	attachFiles:function(){
		$("#dropzone-attach-files").dropzone({
			addRemoveLinks: true,
			dictRemoveFile: false,
			dictDefaultMessage: 'Drag & Drop Files',
			createImageThumbnails: false,
			previewsContainer: '.attach-files-preview',
			error: function (file, response) {
				//consle.log('Error');
			}
		});
	},
	showMoreProspect:function(){
		var $box = $('#prospects-popup .wrap-prospects');
		var i = 2;
		while(i){
			i--;
			$box.append('<div class="wrap-prospect-box">'+
				'<div class="prospect">'+
					'<a href="#" class="ava"><img src="imgs/ava60.png"/></a>'+
					'<div class="inf-content">'+
						'<div class="name txt-searсh">Ryan Schefke</div>'+
						'<div class="line-table">'+
							'<div class="line-td-1">Work:</div>'+
							'<div class="line-td-2"><a href="#" class="ll-open-inbound-call-popup">(469)675-1313</a></div>'+
						'</div>'+
						'<div class="line-table">'+
							'<div class="line-td-1">Mobile:</div>'+
							'<div class="line-td-2"><a href="#" class="ll-open-inbound-call-popup">(469)675-1313</a></div>'+
						'</div>'+
						'<div class="line-table">'+
							'<div class="line-td-1">Email:</div>'+
							'<div class="line-td-2"><a href="#" class="txt-searсh">rrschefke@leadliaison.com</a></div>'+
						'</div>'+
						'<div class="line-table">'+
							'<div class="line-td-1">Title:</div>'+
							'<div class="line-td-2 txt-searсh">VP of Engineer</div>'+
						'</div>'+
						'<div class="line-table">'+
							'<div class="line-td-1">Location:</div>'+
							'<div class="line-td-2 txt-searсh">Dallas, TX USA</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>');
		}
	},
	editAmount: function(){
		$('.edit-amount-user').on('click', function(){
			var text = $(this).find('.t-inner').hide().text();
			var $boxEdit = $('.amount-field-user');
			var $input = $boxEdit.find('.txt-field');
			
			$input.val(text);
			$boxEdit.show();
			$input.focus();
		});
		$('.amount-field-user').find('.txt-field').on('blur', function(){
			var val = $(this).val();
			$('.edit-amount-user').find('.t-inner').show().text(val);
			$('.amount-field-user').hide();
		});
	},
	editCloseDate: function(){
		$('.edit-close-date-user').on('click', function(){
			var text = $(this).find('.t-inner').hide().text();
			var $boxEdit = $('.close-date-field-user');
			var $input = $boxEdit.find('.txt-field');
			
			$(this).find('.fires').hide();
			$input.val(text);
			$boxEdit.show();
			$input.focus();
		});
		$('.close-date-field-user').find('.txt-field').on('blur', function(){
			var val = $(this).val();
			$('.edit-close-date-user').find('.t-inner').show().text(val);
			$('.close-date-field-user').hide();
		});
	},
	editQuality: function(){
		$('.edit-quality-user').on('click', function(){
			var text = $(this).find('.t-inner').hide().text();
			var $boxEdit = $('.quality-field-user');
			var $input = $boxEdit.find('.txt-field');
			
			$(this).find('.fires').hide();
			$input.val(text);
			$boxEdit.show();
			$input.focus();
		});
		$('.quality-field-user').find('.txt-field').on('blur', function(){
			var val = $(this).val();
			$('.edit-quality-user').find('.t-inner').show().text(val);
			$('.quality-field-user').hide();
			$('.edit-quality-user').find('.fires').css('display','inline-block');
		});
	},
	editLocation: function(){
		$('.edit-location-user').on('click', function(){
			var text = $(this).find('.t-inner').hide().text();
			var $boxEdit = $('.location-field-user');
			var $input = $boxEdit.find('.txt-field');
			
			$input.val(text);
			$boxEdit.show();
			$input.focus();
		});
		$('.location-field-user').find('.txt-field').on('blur', function(){
			var val = $(this).val();
			$('.edit-location-user').find('.t-inner').show().text(val);
			$('.location-field-user').hide();
		});
		$('.location-field-user').find('.txt-field').on('blur', function(){
			//page.locationGoogle();
		});
	},
	editNameUser: function(){
		$('body').on('click', function(){
			$('.edit-name-user').find('.t-inner').show();
			$('.field-name-user').hide();
		});
		$('.edit-name-user .t-name').on('click', function(e){
			e.stopPropagation();
			var $boxEdit = $('#field-name-user');
			
			$(this).parents('.edit-name-user').find('.t-inner').hide();
			$boxEdit.show();
		});
		$('#field-name-user').on('click', function(e){
			e.stopPropagation();
		});
		$('#field-name-user-select').on('change', function(e){
			e.stopPropagation();
			var val = $(this).val();

			$('.edit-name-user').find('.t-inner').show().find('.t-name').text(val);
			$('.field-name-user').hide();
		});
	},
	addFieldPopup: function(){
		$('.list-add-fields').on('click', 'li', function(){
			$(this).addClass('selected').siblings('li').removeClass('selected');
		});
	},
	fieldEditAction: function(){
		$('.details-box').on('click', '.f-edit', function(e){
			e.stopPropagation();
			var type = $(this).parents('.box-details-field').attr('edit-type');
			
			acc_page.startEditField($(this), type);
		});
		$('.details-box').on('blur', '.field-edit .txt-field', function(e){
			e.stopPropagation();
			var type = $(this).parents('.box-details-field').removeClass('show-field').attr('edit-type');
			
			acc_page.endEditField($(this), type);
		});
		$('.details-box').on('change', '.edit-dropdown', function(e){
			e.stopPropagation();
			var type = $(this).parents('.box-details-field').removeClass('show-field').attr('edit-type');
			acc_page.endEditField($(this), type);
		});
		$('body').on('click', function(){
			$(this).find('.box-details-field.show-field').removeClass('show-field');
		});
		$('.details-box').on('click', '.txt-field, .chzn-container', function(e){
			e.stopPropagation();
		});
		$('.settings-gray-box').on('click', function(){
			acc_page.detailsUpdateFieldPopup();
			if ( $('#crm-details-popup .details-search-fields').length ) acc_page.detailsPopupSearch(true);
		});
		$('.btn-save-details').on('click', function(){
			acc_page.detailsShowHideField();
			$('.crm-details-popup').removeClass('full');
			acc_page.detailsPopupColumn();
		});
		$('.btn-cancel-details').on('click', function(){
			$('.crm-details-popup').removeClass('full');
			acc_page.detailsPopupColumn();
		});
		$('.btn-create-new-section').on('click', function(e){
			e.stopPropagation();
			e.preventDefault();
			var $popupContent = $('.crm-details-popup .ll-popup-content');
			var columnAdd = '';
			var columnDefault = 2;
			var columnCurrent = $('.categories-list:first').find('.column-1, .column-2, .column').length;

			for (var i = 0; i < columnCurrent - columnDefault; i++){
				columnAdd +='<div class="column"></div>';
			}

			$popupContent.prepend(
					'<div class="wrap-section"><div class="t-fields-category">'+
						'<div class="wrap-title">'+
							'<span class="t"><span class="t-inner">New Section</span></span>'+
							'<i class="edit-title"><svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Details-popup" transform="translate(-385.000000, -304.000000)" fill-rule="nonzero" fill="#ADADAD"> <g id="Group-38" transform="translate(241.000000, 103.000000)"> <g id="popup"> <g id="Group"> <g id="Rectangle-48" transform="translate(1.000000, 0.000000)"> <path d="M145.476266,210.28001 L144.542211,213.460903 L147.617427,212.555608 L153.488809,206.69162 L154.275775,207.478305 L148.308887,213.391046 L148.012504,213.094561 L148.130034,213.494856 L143.918934,214.730386 L143,215 L143.269742,214.081404 L144.505713,209.872343 L144.908124,209.990425 L144.610629,209.693036 L150.57698,203.781368 L151.280261,204.483325 L145.476266,210.28001 Z M145.964082,210.968248 L151.862305,205.076958 L152.841855,206.057231 L146.944168,211.947449 L146.820786,211.160227 L145.964082,210.968248 Z M154.810611,206.891107 L151.111817,203.193633 L151.958328,202.400513 L155.656587,206.097986 L154.810611,206.891107 Z M152.551101,201.90984 L153.095057,201.360179 C153.578932,200.876478 154.368043,200.880231 154.857282,201.369832 L156.630236,203.141616 C157.119475,203.631216 157.123766,204.420046 156.639892,204.903748 L156.095399,205.453409 L152.551101,201.90984 Z" id="edit"></path> </g> </g> </g> </g> </g> </g> </svg></i>'+
							'<i class="move-section"><svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <defs></defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="Details-popup" transform="translate(-408.000000, -304.000000)" fill-rule="nonzero" fill="#ADADAD"> <g id="if_move_134218" transform="translate(408.000000, 304.000000)"> <path d="M13.710375,6.360375 L11.97875,4.62875 C11.809875,4.4594375 11.6073125,4.375 11.375,4.375 C10.85525,4.375 10.5,4.8195 10.5,5.25 C10.5,5.47575 10.581375,5.681375 10.75375,5.85375 L11.025,6.125 L7.875,6.125 L7.875,2.975 L8.14625,3.24625 C8.318625,3.418625 8.52425,3.5 8.75,3.5 C9.1805,3.5 9.625,3.1443125 9.625,2.625 C9.625,2.3926875 9.5405625,2.190125 9.37125,2.02125 L7.6330625,0.282625 C7.4725,0.1220625 7.3189375,0 7,0 C6.6810625,0 6.5034375,0.146125 6.3599375,0.289625 L4.62875,2.02125 C4.4594375,2.190125 4.375,2.3926875 4.375,2.625 C4.375,3.14475 4.8195,3.5 5.25,3.5 C5.47575,3.5 5.681375,3.418625 5.85375,3.24625 L6.125,2.975 L6.125,6.125 L2.975,6.125 L3.24625,5.85375 C3.418625,5.681375 3.5,5.47575 3.5,5.25 C3.5,4.8195 3.1443125,4.375 2.625,4.375 C2.3926875,4.375 2.190125,4.4594375 2.02125,4.62875 L0.289625,6.360375 C0.146125,6.503875 0,6.6810625 0,7 C0,7.3189375 0.1220625,7.4725 0.282625,7.6330625 L2.02125,9.37125 C2.190125,9.5405625 2.3926875,9.625 2.625,9.625 C3.14475,9.625 3.5,9.1805 3.5,8.75 C3.5,8.52425 3.418625,8.318625 3.24625,8.14625 L2.975,7.875 L6.125,7.875 L6.125,11.025 L5.85375,10.75375 C5.681375,10.581375 5.47575,10.5 5.25,10.5 C4.8195,10.5 4.375,10.8556875 4.375,11.375 C4.375,11.6073125 4.4594375,11.809875 4.62875,11.97875 L6.3599375,13.710375 C6.5034375,13.853875 6.6810625,14 7,14 C7.3189375,14 7.4725,13.8779375 7.6330625,13.717375 L9.37125,11.97875 C9.5405625,11.809875 9.625,11.6073125 9.625,11.375 C9.625,10.85525 9.1805,10.5 8.75,10.5 C8.52425,10.5 8.318625,10.581375 8.14625,10.75375 L7.875,11.025 L7.875,7.875 L11.025,7.875 L10.75375,8.14625 C10.581375,8.318625 10.5,8.52425 10.5,8.75 C10.5,9.1805 10.8556875,9.625 11.375,9.625 C11.6073125,9.625 11.809875,9.5405625 11.97875,9.37125 L13.717375,7.6330625 C13.8779375,7.4725 14,7.3189375 14,7 C14,6.6810625 13.853875,6.503875 13.710375,6.360375 Z" id="dragndrop"></path> </g> </g> </g> </svg></i>'+
							'<div class="remove-section">Delete Section</div>'+
						'</div>'+
						'<div class="field"><input type="text" class="txt-field"/></div>'+
					'</div>'+
					'<div class="categories-list clearfix">'+
		                '<div class="column-1"></div>'+
		                '<div class="column-2"></div>'+
		                columnAdd +
		            '</div></div>');
			$popupContent.find('.categories-list:first').find('.column-1, .column-2, .column').sortable({
				placeholder: 'ui-sortable-placeholder',
				connectWith: '.crm-details-popup .column-1, .crm-details-popup .column-2, .crm-details-popup .column'
			});
		});
		$('.crm-details-popup').on('click', '.edit-title', function(e){
			e.stopPropagation();
			e.preventDefault();
			var $el = $(this).parents('.t-fields-category');
			var val = $el.find('.t-inner').text();

			$el.addClass('editable');
			$el.find('.txt-field').focus().val(val);
		});
		$('.crm-details-popup').on('blur', '.t-fields-category .txt-field', function(e){
			e.stopPropagation();
			e.preventDefault();
			var $el = $(this).parents('.t-fields-category');
			var val = $(this).val();

			$el.removeClass('editable');
			if (val == '')
				val = "New Section";
			$el.find('.t-inner').text(val);
		});
		$('.crm-details-popup').on('click', '.remove-section', function(e){
			e.stopPropagation();
			e.preventDefault();
			var $section = $(this).parents('.t-fields-category');
			var $list = $section.next('.categories-list');
			
			if ($list.find('.t-field').length === 0 )
				$list.remove();
			$section.remove();
		});

	},
	startEditField: function($box, type){
		var $wrapper = $box.parents('.box-details-field');
		var $wrapField = $wrapper.find('.field-edit');
		
		$('.details-box').find('.box-details-field.show-field').removeClass('show-field');
		
		
		if ( type == 'text' || type == 'monetary' || type == 'person' || type == 'autocomplete' || type == 'phone-number' || type == 'date' || type == 'time' ){
			$wrapField.find('.txt-field').focus().val($box.text());
			$box.parents('.box-details-field').addClass('show-field');
		} else if ( type == 'single-dropdown' ){
			$box.parents('.box-details-field').addClass('show-field');
		} else if ( type == 'desc' ){
			$wrapField.find('.txt-field').focus().val($box.text());
			$box.parents('.box-details-field').addClass('show-field');
		} else {
			$('#crm-details-popup, #ll-fade').show();
		}
	},
	endEditField: function($box, type){
		var $wrapper = $box.parents('.box-details-field');
		var $wrapField = $wrapper.find('.field-edit');
		
		if ( type == 'text' || type == 'monetary' || type == 'person' || type == 'autocomplete' || type == 'phone-number' || type == 'date' || type == 'time' ){
			$wrapper.find('.f-edit').text($wrapField.find('.txt-field').val());
		} else if ( type == 'single-dropdown' ){
			$wrapper.find('.f-edit').text($box.val());
		} else if ( type == 'desc' ){
			$wrapper.find('.f-edit').text($wrapField.find('.txt-field').val());
		}
	},
	detailsUpdateFieldPopup: function(){
		var $popup = $('#crm-details-popup');
		var $fieldPopup = $popup.find('.t-field[data-idx]').addClass('hide-field');
		
		$('.box-edit-details').find('.box-details-field').each(function(){
			var $field = $(this);
			var idx = $field.attr('data-idx');

			$popup.find('.t-field[data-idx="'+idx+'"]').removeClass('hide-field');
		});

	},
	detailsShowHideField: function(){
		var $popup = $('#crm-details-popup');
		var $detailsBox = $('.box-edit-details');
		var content = '';
		
		$detailsBox.html('');
		
		$popup.find('.t-field[data-idx]:not(.hide-field)').each(function(){
			var $boxField = $(this);
			var label = $boxField.children('label').text();
			var idx = $boxField.attr('data-idx');
			var type = $boxField.attr('data-type');
			var text = '';
			var fieldHtml = '';
			
			
			
			if ( type == 'text' || type == 'monetary' || type == 'person' || type == 'autocomplete' || type == 'phone-number' ){
				text = $boxField.find('.txt-field').val();
				fieldHtml = '<input class="txt-field" type="text"/>';
			} else if (type == 'single-dropdown'){
				text = $boxField.find('select').val();
				fieldHtml= $boxField.find('.t-field-inner select').html();
				fieldHtml = '<select>'+ fieldHtml +'</select>';
			} else if (type == 'address'){
				text = '<a target="_blank" href="http://maps.google.com/?q='+$boxField.find('.txt-field').val()+'" class="address-link">8804 Milano Dr, McKinney, TX United States</a>';
			} else if (type == 'desc'){
				text = $boxField.find('.txt-field').val();
				fieldHtml = '<textarea class="txt-field"></textarea>';
			} else if (type == 'date'){
				text = $boxField.find('.txt-field').val();
				fieldHtml = '<div class="wrap-input-date-single"><span class="icn-search-date"></span><input style="" class="txt-field ll-input-date-single" type="text"></div>';
			} else if (type == 'date-range'){
				text = $boxField.find('.txt-field:first').val() +' - '+ $boxField.find('.txt-field:last').val();
			} else if (type == 'multiple-values'){
				var text = $boxField.find('select').val();
			} else if (type == 'time'){
				text = $boxField.find('.txt-field').val();
				fieldHtml = '<input style="" class="txt-field ll-input-time-single" value="'+text+'" type="text"/>';
			} else if (type == 'time-range'){
				text = $boxField.find('.txt-field:first').val() +' - '+ $boxField.find('.txt-field:last').val();
			}
			
			if ( type == 'desc' ){
				 content = '<div class="line-tr box-details-field" data-idx="'+idx+'" edit-type="'+type+'">'+
						'<div class="line-td-1"><span class="lb">'+label+'</span></div> '+
						'<div class="line-td-2">'+
							'<div class="show-hide-desc">'+
								'<div class="btn-show-hide-desc">'+
									'<svg width="10px" height="9px" viewBox="0 0 10 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
										'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.400000006">'+
											'<g id="Account-page1" transform="translate(-346.000000, -353.000000)" stroke="#979797" fill="#D8D8D8">'+
												'<g id="Group-4" transform="translate(79.000000, 180.000000)">'+
													'<path d="M271.803142,180.398953 L267.800524,176.396334 L267,177.196858 L271.40288,181.599738 L271.803142,182 L276.606284,177.196858 L275.80576,176.396334 L271.803142,180.398953 L271.803142,180.398953 Z M271.803142,177.002618 L267.800524,173 L267,173.800524 L271.40288,178.203404 L271.803142,178.603666 L276.606284,173.800524 L275.80576,173 L271.803142,177.002618 L271.803142,177.002618 Z" id=""></path>'+
												'</g>'+
											'</g>'+
										'</g>'+
									'</svg>'+
									'<svg width="10px" height="9px" viewBox="0 0 10 9" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'+
										'<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity="0.400000006">'+
											'<g id="Account-page1" transform="translate(-346.000000, -353.000000)" stroke="#979797" fill="#D8D8D8">'+
												'<g id="Group-4" transform="translate(79.000000, 180.000000)">'+
													'<path d="M271.803142,180.398953 L267.800524,176.396334 L267,177.196858 L271.40288,181.599738 L271.803142,182 L276.606284,177.196858 L275.80576,176.396334 L271.803142,180.398953 L271.803142,180.398953 Z M271.803142,177.002618 L267.800524,173 L267,173.800524 L271.40288,178.203404 L271.803142,178.603666 L276.606284,173.800524 L275.80576,173 L271.803142,177.002618 L271.803142,177.002618 Z" id="" transform="translate(271.803142, 177.500000) scale(1, -1) translate(-271.803142, -177.500000) "></path>'+
												'</g>'+
											'</g>'+
										'</g>'+
									'</svg>'+
								'</div>'+
								'<span class="f-edit">'+text+'</span>'+
							'</div>'+
							'<div class="field-edit">'+
								fieldHtml +
							'</div>'+
						'</div>'+
					'</div>';
			} else {
				  content = '<div class="line-tr box-details-field" data-idx="'+idx+'" edit-type="'+type+'">'+
						'<div class="line-td-1"><span class="lb">'+label+'</span></div> '+
						'<div class="line-td-2">'+
							'<span class="f-edit">'+text+'</span>'+
							'<div class="field-edit">'+
								fieldHtml +
							'</div>'+
						'</div>'+
					'</div>';
			}
			
			$detailsBox.append(content);
			
			if (type == 'single-dropdown'){
				var $select = $detailsBox.find('select:not(.chzn-done)');
				$select.chosen();
			} else if (type == 'date'){
				$detailsBox.find('.ll-input-date-single').datetimepicker({
					timepicker:false,
					format:'d/m/Y',
					value: new Date(),
					onSelectDate: function(ct,$i){
						$i.parents('.box-details-field').find('.f-edit').text(ct.dateFormat('d/m/Y'));
					}
				});
				$detailsBox.find('.wrap-input-date-single .icn-search-date').off('click').on('click', function(e){
					e.stopPropagation();
					$(this).next('input').focus();
				});
			} else if (type == 'time'){
				$detailsBox.find('.ll-input-time-single').datetimepicker({
					datepicker:false,
					format: 'g:i A',
					formatTime: 'g:i A',
					onSelectTime: function(current_time,$input){
						$input.parents('.box-details-field').find('.f-edit').text(current_time.dateFormat('g:i A'));
					}
				});
				
			}
		});
	},
	filterTimelinesActions: function(){
		$('#filter-timelines input[type="checkbox"]').on('click', function(){
			acc_page.filterTimelines($(this));
		});
		$('#filter-timelines input[type="checkbox"]').each(function(){
			acc_page.filterTimelines($(this));
		});
	},
	filterTimelines:function($checkbox){
		var type = $checkbox.attr('data-filter');
		var $timelines = $('.timelines-msg .wrap-tl-msg');
		var $timelinesMsg = $timelines.find('.tl-msg[data-filter="'+type+'"]');

		if ( $checkbox.is(':checked') ){
			$timelinesMsg.show();
		} else {
			$timelinesMsg.hide();
		}
		$timelines.find('.tl-msg').removeClass('last-msg');
		$timelines.find('.tl-msg:visible:last').addClass('last-msg');
	},
	dropDownActionTab: function(){
		$('.dropdown-actions-tab > a').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('.dropdown-actions-tab').toggleClass('open');
		});
		$('.dropdown-actions-tab .drop-list > ul li').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			var idx = $(this).attr('data-idx');
			
			
			$(this).addClass('selected').siblings('li').removeClass('selected');
			$('.tabs-actions > ul > li').removeClass('selected');
			$(this).parents('.dropdown-actions-tab').removeClass('open');
			
			//$(this).parents('.dropdown-actions-tab').children('a').attr('data-idx', idx);
			
			
			if( $(this).hasClass('d-item-email') ){
				$('.tabs-actions > ul > li.item-email').addClass('selected').find('a').trigger('click');
			} else if( $(this).hasClass('d-item-call') ){
				$('.tabs-actions > ul > li.item-call').addClass('selected').find('a').trigger('click');
			} else if( $(this).hasClass('d-item-letter') ){
				$('.tabs-actions > ul > li.item-letter').addClass('selected').find('a').trigger('click');
			} else if( $(this).hasClass('d-item-automate') ){
				$('.tabs-actions > ul > li.item-automate').addClass('selected').find('a').trigger('click');
			} else if( $(this).hasClass('d-item-lists') ){
				$('.tabs-actions > ul > li.item-lists').addClass('selected').find('a').trigger('click');
			}
		});
	},
	emailMessage: function(){
		$('.open-cc-field').on('click', function(){
			$(this).toggleClass('selected');
			$(this).parents('.add-email-editor').find('.field-cc').toggle().find('select').val('').trigger('liszt:updated');
		});
		$('.open-bcc-field').on('click', function(){
			$(this).toggleClass('selected');
			$(this).parents('.add-email-editor').find('.field-bcc').toggle().find('select').val('').trigger('liszt:updated');
		});
	},
	dealStage: function(){
		$('.stage-box .point').on('mouseenter', function(){
			var $box = $(this).parent();
			$box.addClass('hover').prevAll('.stage-box').addClass('hover');
		});
		$('.stage-box .point').on('mouseleave', function(){
			var $box = $(this).parent();
			$box.removeClass('hover').prevAll('.stage-box').removeClass('hover');
		});
		$('.stage-box .point').on('click', function(){
			var $box = $(this).parent();
			$box.addClass('selected').prevAll('.stage-box').addClass('selected');
			$box.nextAll('.stage-box').removeClass('selected');
		});
		$('.stage-box.last .point').on('click', function(e){
			e.stopPropagation();
			$(this).toggleClass('open');
		});
		$('.toltip-stage li a').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parent().addClass('selected').siblings('li').removeClass('selected');
			$(this).parents('.point.open').removeClass('open');
		});
	},
	addFieldsAutomateAndLists: function(){
		$('.automate-and-lists').on('click', '.remove-line', function(e){
			e.preventDefault();
			$(this).parent().remove();
			
		});
		$('.automate-and-lists').on('click', '.add-line', function(e){
			e.preventDefault();
			$(this).parents('.fields-add').append('<div class="line-fields">'+
												'<a href="#" class="add-line"></a>'+
												'<a href="#" class="remove-line"></a>'+
												'<select class="txt-field"><option value=""></option><option value="1017">Nurture Test</option><option value="1019">Invite people to my webinar</option><option value="1037">Test Zapier Webhook</option><option value="1100">Test Process Server</option><option value="1102">Test LD Process Server</option><option value="1138">Testing VMTA issue - Athena</option><option value="1141">Test new date-time-wait options</option><option value="1170">Test Remove Functionality</option><option value="1200">Test Wait Business Days action</option><option value="1210">Test CRM Task tasks...</option><option value="1215">Measuring Conversions Automation</option><option value="1228">Test Address Merge</option><option value="1229">Test Address Merge - clone</option><option value="1230">Test Address Merge - clone - clone</option><option value="1267">My Workflow Example</option><option value="1268">Validate AND-OR with Ryan - clone</option><option value="1269">Validate AND-OR with Ryan - clone 2</option><option value="1328">Test Conversion Automation</option><option value="1329">Test Conversion Automation - clone</option><option value="1330">Final Test Conversion</option><option value="1331">Lead to Contact Action</option><option value="1368">Test Sync to CRM Automation</option><option value="1369">Test new alert action</option><option value="1448">Test Donation-Payment filters</option><option value="1627">Test Send Email</option><option value="1629">CTU test</option><option value="1677">Test Relay2</option><option value="1678">Test Relay 3</option><option value="1732">Test tokens replace automation...</option><option value="1973">Pharmacy Nurturing Track</option><option value="2137">Trying sending email</option><option value="311">Test New Website Visit Filter</option><option value="312">Run on entire DB</option><option value="382">Send email to check PMTA Header</option><option value="448">Testing Minute Wait State</option><option value="449">Testing Add to LL Campaign </option><option value="450">Send Email to Test Unsubscribe</option><option value="473">Send Authur Lebedinski to Emad and then to Hopper</option><option value="474">Distribute to Engineering - Test 2</option><option value="532">Nurture Emad</option><option value="538">Email Myself to test Resend issue</option><option value="560">Showing Ravi</option><option value="581">Some automation, testing email lists</option><option value="601">Lead Nurturing Process for VMTA</option><option value="602">Simple Automation VMTA</option><option value="605">Testing BNCE automation</option><option value="608">Send Bounce Test</option><option value="609">Send Bounce Test 2</option><option value="625">Testing send email automation</option><option value="683">Testing plain text alert</option><option value="693">Test webhooks</option><option value="700">Testing Requestbin</option><option value="701">Testing Requestbin - clone</option><option value="707">Test Webhooks 3</option><option value="734">Test Wait Issue</option><option value="745">Testing nurture VMTA</option><option value="753">Test sending email automation...</option><option value="764">Test simple automation for validation</option><option value="819">Alert Sales for Key Companies</option><option value="829">One Time Automation for Testing</option><option value="883">Test sending emails through custom VMTA</option><option value="937">Test performace</option><option value="941">Send myself email</option><option value="960">Test Tag Staff</option><option value="962">Test mode testing...</option><option value="965">Test new action improvements...</option><option value="977">Invite people to Webinar</option><option value="978">Register People to Event</option></select>'+
											'</div>');
			$(this).parents('.fields-add').find('select:visible').chosen();
		});
	},
	linkEditAction: function(){
		$('.details-box').on('click', '.edit-link .pencil', function(){
			var $box = $(this).parents('.edit-link');
			var text = $.trim( $box.find('.edit-link-text a').text() );

			$box.parents('.inf-phone, .inf-email').addClass('show-field');
			$box.find('.field-edit .txt-field').val(text).focus();
		});
		$('.details-box').on('blur', '.edit-link .txt-field', function(){
			acc_page.linkEditText( $(this) );
		});
		$('.details-box').on('keypress', '.edit-link .txt-field', function(e){
			(e.which === 13) ? acc_page.linkEditText( $(this) ) : null;
		});
	},
	linkEditText: function($field){
		var $box = $field.parents('.edit-link');
		var val = $.trim( $field.val() );

		(val == '') ? val = 'Empty' : null;

		$box.find('.edit-link-text a').text(val);
		$box.parents('.inf-phone, .inf-email').removeClass('show-field');
	},
	showHideTabs: function(){
		var $wrap = $('.show-hide-tabs > ul');
		var $tabs = $wrap.find('li');
		var $dropdown = $('.dropdown-actions-tab');
		var wrapWidth = $wrap.width();
		var tabsLiWidth = 0;
		var indexTab = null;
		var count = 0;
		var $countBlock = $dropdown.find('.t-btn-gray .count');

		$tabs.each(function(index){
			var $li = $(this);
			tabsLiWidth += $li.width() + 19;

			if ( tabsLiWidth > wrapWidth ){
				indexTab = index;
				//console.log(tabsLiWidth, wrapWidth, indexTab, $('.right-content-main').width());
				return false;
			}
		});

		if ( indexTab !== null ){
			var $hideTabs =  $tabs.eq(indexTab).add( $tabs.eq(indexTab).nextAll('li') );

			$tabs.eq(indexTab).prevAll('li').css('display','inline-block');
			$dropdown.find('li').hide().removeClass('active');

			$hideTabs.each(function(){
				var $li = $(this);
				var $liDropdown = $dropdown.find('li');
				var index = $li.attr('idx');

				$li.hide();
				$liDropdown.filter('[idx="'+ index +'"]').show().addClass('active');
			});

			$dropdown.show();
		} else{
			$tabs.css('display','inline-block');
			$dropdown.hide().find('li').hide();
		}
		$dropdown.find('li.active .count').each(function(){
			count += parseInt($(this).text());
		});

		( count != 0) ? $countBlock.show().text(count) : $countBlock.hide().text(0);
	},
	isMsgNotesSave: function(){
		window.addEventListener("beforeunload", function (e) {
		  var confirmationMessage = "It looks like you've got some note in the system. Are you sure you want to leave this page?";

		  if ( tinyMCE.get('add-note-editor').getContent() !== '' ){
		  	e.returnValue = confirmationMessage;
		  	return confirmationMessage;
		  } else{
		  	return null;
		  }

		});
	},
	newMessage__init: function(){
		email_popups.init();
		$('body').on('click', '.new-message__btn-send, .new-message__btn-sсhedule', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $this = $(this);
			var $box = $this.parents('.new-message__actions');

			$this.addClass('disabled');
			$box.find('.new-message__btn-undo').css('display','inline-block');
			$box.find('.new-message__btns-action').hide();
		});

		$('body').on('click', '.new-message__btn-undo', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $this = $(this);
			var $box = $this.parents('.new-message__actions');

			$this.hide();
			$box.find('.new-message__btn-send, .new-message__btn-sсhedule').removeClass('disabled');
			$box.find('.new-message__btns-action').css('display','inline-block');
		});

		$('body').on('click', '.new-message__btn-expand', function(e){
			e.preventDefault();
			e.stopPropagation();

			$('.new-message__popups').prepend(acc_page.newMessage__expandPopup());
			acc_page.newMessage__editor();
			$('.new-message__popups .new-message-popup:first select').chosen();
			$('.new-message__popups .new-message-popup:first .ll_std_tooltip').tooltipster({
				theme: 'll-std-tooltip-theme',
				position: 'bottom',
				offsetY: 0
			});
			acc_page.newMessage__popupEditorHeight($('.new-message__popups .new-message-popup:first .new-message'));
			acc_page.newMessage__popupShowHide();

			tinymce.get($('.new-message__popups .new-message-popup:first .new-message .new-message__field-message-editor').attr('id')).setContent('Hey Ben, <br/><br/> I am not very happy with the way this going. Can you tell me why you are acting this way? <br/><br/> Please give me a call as soon as you get this. Thank you!');
			$('.new-message__popups .new-message-popup:first .new-message .new-message__actions').before('<div class="new-message__attach-files"><div class="new-message__attach-file"><div class="new-message__attach-file-name">Attached_files.xls</div><div class="new-message__attach-file-delete"></div></div><div class="new-message__attach-file"><div class="new-message__attach-file-name">Attached_files.xls</div><div class="new-message__attach-file-delete"></div></div></div>');
		});
		
		$('.wrap-tl-msg').on('click', '.tl-message-nested .tl-message-nested-header', function(e){
			e.stopPropagation();

			var $box = $(this).parents('.tl-message-nested');

			if ( !$box.hasClass('opened-reply') ){
				$box.toggleClass('opened');
			} else{
				$box.removeClass('opened-reply').find('.tl-message-nested__reply-content').html('');
			}
			
		});

		$('.wrap-tl-msg').on('click', '.old-message__btn', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).next('.old-message__content').toggle();
		});

		$('.wrap-tl-msg').on('click', '.tl-message-nested__btn-reply-all', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $box = $(this).parents('.tl-message-nested');

			$box.find('.tl-message-nested__reply-content').html(acc_page.new_message__htmlEditor());
			acc_page.newMessage__editor();
			$box.find('.tl-message-nested__reply-content select').chosen();
			$box.find('.tl-message-nested__reply-content .ll_std_tooltip').tooltipster({
				theme: 'll-std-tooltip-theme',
				position: 'bottom',
				offsetY: 0
			});
			$box.removeClass('opened').addClass('opened-reply');
		});
		$('.wrap-tl-msg').on('click', '.tl-message-nested__btn-reply-next', function(e){
			e.preventDefault();
			e.stopPropagation();
			
		});

		$('.wrap-tl-msg').on('click', '.tl-message-nested__btn-clock', function(e){
			e.preventDefault();
			e.stopPropagation();
			
		});

		$('.wrap-tl-msg').on('click', '.tl-message-nested__btn-reply', function(e){
			e.preventDefault();
			e.stopPropagation();
			
		});

		$('.wrap-tl-msg').on('click', '.tl-message-nested__btn-delete', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $this = $(this);
			var $box = $this.parents('.tl-msg-nested');

			$this.parents('.tl-message-nested').remove();
			acc_page.newMessage__isCountListNested($box);
		});

		$('body').on('click', '.new-message-popup__minimize', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $popup = $(this).parents('.new-message-popup-wrap')

			$popup.toggleClass('new-message-popup--minimize');

			if ( !$popup.hasClass('new-message-popup--minimize') ){
				$popup.addClass('new-message-popup-wrap--no-minimize');
			}
			
			acc_page.newMessage__popupShowHide();
		});
		$('body').on('click', '.new-message-popup__title', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parent().find('.new-message-popup__minimize').trigger('click');
		});

		$('body').on('click', '.new-message-popup__close', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('.new-message-popup-wrap').remove();
			acc_page.newMessage__popupShowHide();
		});

		acc_page.newMessage__editor();
		acc_page.newMessage__ccBcc();

		$(window).resize(function(){
			acc_page.newMessage__popupShowHide();
			acc_page.detailsPopupColumn();
		});

		$('.toggle-nav-admin').on('click', function(){
			acc_page.newMessage__popupShowHide();
		});

		$('.ll-open-inbound-call-popup').on('click', function(){
			$('.new-message__popups').addClass('offset-call');
			acc_page.newMessage__popupShowHide();
		});

		$('.ic-close-popup').on('click', function(){
			$('.new-message__popups').removeClass('offset-call');
			acc_page.newMessage__popupShowHide();
		});
		
		$('body').on('click', '.new-message-popup__preview', function(e){
			e.preventDefault();
			e.stopPropagation();

			var $popup = $(this).parents('.new-message-popup-wrap');

			if ( !$popup.hasClass('show-preview') ){
				$('.new-message-popup-wrap').removeClass('show-preview').find('.new-message-popup-preview').css('left', '0');
			}
			
			if ( $popup.hasClass('show-preview') ){
				$popup.removeClass('show-preview').find('.new-message-popup-preview').css('left', '0');
			}else{
				$popup.addClass('show-preview').find('.new-message-popup-preview').animate({
					left:  -296 + 'px'
				}, 300);
			}

		});
	},
	newMessage__isCountListNested: function($box){
		var count = $box.find('.tl-message-nested').length;

		if (count > 0){
			$box.addClas('tl-msg-nested');
		}else{
			$box.removeClass('tl-msg-nested');
			$box.find('.tl-message-nested-list').remove();
		}
	},
	newMessage__ccBcc: function(){
		$('body').on('click', '.new-message__button-cc', function(){
			var $this = $(this);

			$this.toggleClass('selected');
			$this.parents('.new-message__fields').find('.new-message__field-cc').toggle().find('select').val('').trigger('liszt:updated');
			
			acc_page.newMessage__popupEditorHeight($this.parents('.new-message'));
		});
		$('body').on('click', '.new-message__button-bcc', function(){
			var $this = $(this);
			$this.toggleClass('selected');
			$this.parents('.new-message__fields').find('.new-message__field-bcc').toggle().find('select').val('').trigger('liszt:updated');
			
			acc_page.newMessage__popupEditorHeight($this.parents('.new-message'));
		});
	},
	newMessage__editor: function(){
		tinymce.init({
			autoresize_min_height: 300,
			autoresize_max_height: 300,
            selector: ".new-message__field-message-editor",
            plugins: "image textcolor table save contextmenu link lists autoresize code",
            auto_reset_designmode:true,
            forced_root_block : "", 
            force_br_newlines : true,
            force_p_newlines : false,
			toolbar_items_size: 'small',
            entity_encoding : "raw",
            toolbar: [
                    "styleselect | bold italic forecolor | bullist numlist | image link code"
            ],
			menubar: false,
			statusbar: false,
			style_formats: [
				{
				 	title: 'Inline', 
				 		items: [
							{title: 'Underline', icon: 'underline', format: 'underline'},
							{title: 'Strikethrough', icon: 'strikethrough', format: 'strikethrough'}
						]
				},
				{
				 	title: 'Alignment', items: [
						{title: 'Left', icon: 'alignleft', format: 'alignleft'},
						{title: 'Center', icon: 'aligncenter', format: 'aligncenter'},
						{title: 'Right', icon: 'alignright', format: 'alignright'},
						{title: 'Justify', icon: 'alignjustify', format: 'alignjustify'}
					]
				},
				{
	                title: "Font Family",
	                items: [
	                    {title: 'Arial', inline: 'span', styles: { 'font-family':'arial'}},
	                    {title: 'Book Antiqua', inline: 'span', styles: { 'font-family':'book antiqua'}},
	                    {title: 'Comic Sans MS', inline: 'span', styles: { 'font-family':'comic sans ms,sans-serif'}},
	                    {title: 'Courier New', inline: 'span', styles: { 'font-family':'courier new,courier'}},
	                    {title: 'Georgia', inline: 'span', styles: { 'font-family':'georgia,palatino'}},
	                    {title: 'Helvetica', inline: 'span', styles: { 'font-family':'helvetica'}},
	                    {title: 'Impact', inline: 'span', styles: { 'font-family':'impact,chicago'}},
	                    {title: 'Open Sans', inline: 'span', styles: { 'font-family':'Open Sans'}},
	                    {title: 'Symbol', inline: 'span', styles: { 'font-family':'symbol'}},
	                    {title: 'Tahoma', inline: 'span', styles: { 'font-family':'tahoma'}},
	                    {title: 'Terminal', inline: 'span', styles: { 'font-family':'terminal,monaco'}},
	                    {title: 'Times New Roman', inline: 'span', styles: { 'font-family':'times new roman,times'}},
	                    {title: 'Verdana', inline: 'span', styles: { 'font-family':'Verdana'}}
	                ]
	            },
				{
					title: "Font Size", 
					items: [
                        {title: '8pt', inline:'span', styles: { fontSize: '12px', 'font-size': '8px' } },
                        {title: '10pt', inline:'span', styles: { fontSize: '12px', 'font-size': '10px' } },
                        {title: '12pt', inline:'span', styles: { fontSize: '12px', 'font-size': '12px' } },
                        {title: '14pt', inline:'span', styles: { fontSize: '12px', 'font-size': '14px' } },
                        {title: '16pt', inline:'span', styles: { fontSize: '12px', 'font-size': '16px' } }
					]
				}
			],
			setup: function(editor) {
				editor.on('keyup', function(e) {
					var $popup = $('#' + editor.id).parents('.new-message-popup-wrap');

					if ( $popup.length ){
						$popup.find('.new-message-popup-preview__email-content').html(editor.getContent());
					}
				});
			}
        });
	},
	new_message__htmlEditor: function(){
		var id = new Date().getMilliseconds();
		var html = '<div class="new-message">'+
                        '<div class="new-message__fields">'+
                            '<div class="new-message__field-to">'+
                                '<label>To:</label>'+
                                '<select multiple data-placeholder=" ">'+
                                    '<option>Ryan Schefke</option>'+
                                    '<option>Emily Smith</option>'+
                                    '<option>Mr. Bob Sanders</option>'+
                                '</select>'+
                                '<div class="new-message__cc-bcc">'+
                                    '<a href="#" class="new-message__button-cc">Cc</a>'+
                                    '<a href="#" class="new-message__button-bcc">Bcc</a>'+
                                '</div>'+
                            '</div>'+
                            '<div class="new-message__field-cc">'+
                                '<label>Сс:</label>'+
                                '<select multiple data-placeholder=" ">'+
                                    '<option>Ryan Schefke</option>'+
                                    '<option>Emily Smith</option>'+
                                    '<option>Mr. Bob Sanders</option>'+
                                '</select>'+
                            '</div>'+
                            '<div class="new-message__field-bcc">'+
                                '<label>Bcc:</label>'+
                                '<select multiple data-placeholder=" ">'+
                                    '<option>Ryan Schefke</option>'+
                                    '<option>Emily Smith</option>'+
                                    '<option>Mr. Bob Sanders</option>'+
                                '</select>'+
                            '</div>'+
                            '<div class="new-message__field-subject">'+
                                '<input type="text" class="txt-field" placeholder="Subject"/>'+
                            '</div>'+
                            '<div class="new-message__field-message">'+
                                '<textarea class="new-message__field-message-editor"></textarea>'+
                            '</div>'+
                            '<div class="new-message__actions">'+
                                '<a href="#" class="new-message__btn-send t-btn-orange">Send</a> '+
                                '<a href="#" class="new-message__btn-sсhedule t-btn-orange">Sсhedule</a> '+
                                '<a href="#" class="new-message__btn-undo t-btn-red">Undo</a> '+
                                '<div class="new-message__btns-action">'+
                                    '<a href="#" class="new-message__btn-send-lated ll_std_tooltip" title="Send Lated"><svg width="20px" height="21px" viewBox="0 0 20 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-560.000000, -667.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><g id="if_10_171505" transform="translate(0.000000, 1.375000)"><path d="M16.1531993,10.0048463 C16.1531993,9.58151004 15.8143877,9.23856493 15.396753,9.23856493 L10.7677067,9.23856493 L10.7677067,4.61636045 L10.7677067,4.61621791 C10.7677067,4.19145631 10.4230512,3.84694328 9.99857463,3.84694328 C9.57381302,3.84694328 9.22915746,4.19145631 9.22915746,4.61621791 L9.22915746,10.001853 C9.22915746,10.4267571 9.57381302,10.7712702 9.99857463,10.7712702 L15.3971806,10.7712702 C15.8143877,10.7712702 16.1531993,10.4281825 16.1531993,10.0048463 M18.4633037,10 C18.4633037,14.6749433 14.6740881,18.4647291 10.0001425,18.4647291 C5.32591188,18.4647291 1.53698134,14.6749433 1.53698134,10 C1.53698134,5.32505666 5.32591188,1.53527089 10.0001425,1.53527089 C14.6740881,1.53527089 18.4633037,5.32505666 18.4633037,10 M20,10 C20,4.47710136 15.5228986,0 10.0001425,0 C4.47710136,0 0,4.47710136 0,10 C0,15.5228986 4.47710136,20 10.0001425,20 C15.5228986,20 20,15.5228986 20,10" id="Schedule"></path></g></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-reminder ll_std_tooltip" title="Reminder"><svg width="18px" height="22px" viewBox="0 0 18 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-597.000000, -666.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><g id="if_lamp_622407" transform="translate(37.849315, 0.000000)"><path d="M14.3417046,2.33753247 C12.7542029,0.830155844 10.6428264,0 8.39640911,0 C3.76054041,0 0,3.57980519 0,7.98003896 C0,10.8481818 1.5593603,13.4351818 4.14629477,14.854961 L4.14629477,19.6741429 C4.14629477,20.9505844 5.20254422,21.9881818 6.52793067,21.9881818 L10.2811757,21.9881818 C11.5985549,21.9881818 12.6872848,20.9505844 12.6872848,19.6741429 L12.6872848,14.8508442 C15.2605318,13.4306494 16.8112553,10.8451558 16.8112553,7.98003896 C16.8112553,5.84837662 15.9287547,3.84450649 14.3417046,2.33753247 Z M10.2811757,20.2609091 L6.52793067,20.2609091 C6.20545355,20.2609091 5.95304266,19.9987532 5.95304266,19.6741429 L5.95304266,18.2868831 L10.8805369,18.2868831 L10.8805369,19.6741429 C10.8805369,19.9987532 10.5958372,20.2609091 10.2811757,20.2609091 Z M11.3726977,13.5712208 C11.0654274,13.7162338 10.8805369,14.0138701 10.8805369,14.3394935 L10.8805369,16.5725844 L9.34753868,16.5725844 L9.34753868,11.0790779 L11.5399177,11.0790779 C12.039374,11.0790779 12.4442635,10.6958312 12.4442635,10.2219351 C12.4442635,9.74803896 12.039374,9.36479221 11.5399177,9.36479221 L5.29995805,9.36479221 C4.80050176,9.36479221 4.39562598,9.74803896 4.39562598,10.2219351 C4.39562598,10.6958312 4.80050176,11.0790779 5.29995805,11.0790779 L7.52710331,11.0790779 L7.52710331,16.5725844 L5.95304266,16.5725844 L5.95304266,14.3433506 C5.95304266,14.0175065 5.74857902,13.7198312 5.44102126,13.5748571 C3.19994213,12.5185455 1.8026827,10.3747403 1.8026827,7.98003896 C1.8026827,4.52609091 4.76038374,1.7161039 8.39894129,1.7161039 C12.0368966,1.7161039 15.0000453,4.52609091 15.0000453,7.98003896 C15.0000589,10.3718961 13.6122849,12.5143247 11.3726977,13.5712208 Z" id="remind"></path></g></g></g></g></g></svg></a> '+
                                    '<a href="javascript:void(0);" class="new-message__btn-attach ll_std_tooltip" title="Attach">'+
                                        '<svg width="21px" height="20px" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-631.000000, -667.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><g id="if_attachment_2318448" transform="translate(81.493151, 10.625000) scale(1, -1) translate(-81.493151, -10.625000) translate(71.493151, 0.625000)"><path d="M5.45147824,12.3547113 C5.28210787,12.5726884 5.18999921,12.8373468 5.18999921,13.1123961 C5.18999921,13.4536704 5.33180247,13.773615 5.58704833,14.0189058 C6.06936861,14.4723385 6.88351983,14.502069 7.40935476,14.1080972 L16.154227,5.88698061 C16.6420302,5.4017313 16.9086204,4.76717452 16.9086204,4.09529086 C16.9086204,3.40207756 16.6193417,2.74619114 16.0975057,2.25560942 C15.0538338,1.27444598 13.2274078,1.27444598 12.1780637,2.25560942 L2.79636023,11.0860803 L2.80203236,11.0914127 C2.01927838,11.8272853 1.58819648,12.8084488 1.58819648,13.8536011 C1.58819648,14.8987535 2.01927838,15.8745845 2.80203236,16.6157895 C4.41858949,18.1355263 7.05045794,18.1355263 8.66701507,16.6211219 L18.4968169,7.3800554 L19.5972101,8.41454294 L9.56321166,17.8422438 L9.55753953,17.8369114 C8.47416264,18.7540859 7.10717924,19.2126731 5.73452372,19.2126731 C4.2711141,19.2126731 2.81337662,18.690097 1.70163908,17.6449446 C0.623934331,16.6317867 0.0283606514,15.2880194 0.0283606514,13.8536011 C0.0283606514,12.4885042 0.567213028,11.2033934 1.54849157,10.2062327 L1.53714731,10.1955679 L11.1287196,1.18912742 C11.9398342,0.447922438 13.0061947,0.0373268698 14.1406208,0.0373268698 C15.2977354,0.0373268698 16.3811123,0.458587258 17.197899,1.22645429 C18.0146858,1.99432133 18.4627841,3.01281163 18.4627841,4.10062327 C18.4627841,5.11911357 18.0657349,6.07894737 17.3453744,6.82548476 L17.3510465,6.83081717 L17.2262597,6.94813019 C17.2149154,6.95879501 17.2092433,6.96412742 17.197899,6.97479224 L8.61029377,15.0480609 L8.6159659,15.0533934 C8.57014345,15.0956183 8.52319607,15.1361717 8.47521372,15.1750507 L8.33235938,15.309349 L8.31682583,15.2947458 C7.7944164,15.6624994 7.17002737,15.8479224 6.54563835,15.8479224 C5.79691715,15.8479224 5.05386808,15.5813019 4.48665505,15.0480609 C3.352229,13.9815789 3.352229,12.2378809 4.48665505,11.1713989 L4.63015479,11.306304 L12.8269145,3.10954431 L13.8600444,4.14267421 L5.5497428,12.4529758 L5.45147824,12.3547113 Z" id="Attach"></path></g></g></g></g></g></svg>'+
                                        '<input type="file"/>'+
                                    '</a> '+
                                    '<a href="#" class="new-message__btn-trackable-peace-of-content ll_std_tooltip" title="Trackable peace of content"><svg width="18px" height="20px" viewBox="0 0 18 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-669.000000, -667.000000)" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><g id="if_78_111113" transform="translate(109.342466, 1.375000)"><path d="M0,1.60412988 L0,17.6459143 C0,18.5321783 0.752820884,19.25 1.68222881,19.25 L15.7704496,19.25 C16.3507104,19.25 16.8219178,18.8008648 16.8219178,18.2475126 C16.8219178,17.6939397 16.3507104,17.2448045 15.7704496,17.2448045 L2.94384256,17.2448045 C2.4811521,17.2448045 2.10279759,16.8837308 2.10279759,16.4426734 C2.10279759,16.0018367 2.48119839,15.6407188 2.94384256,15.6407188 L15.1395964,15.6407188 C16.0689581,15.6407188 16.8219178,14.9226763 16.8219178,14.0363682 L16.8219178,1.60412988 C16.8219178,0.71791003 16.0689581,4.41410496e-05 15.1395964,4.41410496e-05 L9.25205017,4.41410496e-05 L9.25205017,7.21489869 C9.25205017,7.31907157 9.21015992,7.42320031 9.13003616,7.50349288 C8.96627077,7.65975219 8.69669202,7.65975219 8.53283405,7.50349288 C8.42345655,7.39503832 6.72873009,6.05169376 6.72873009,6.05169376 C6.72873009,6.05169376 5.03404993,7.39503832 4.92457985,7.50349288 C4.76072188,7.65975219 4.49137457,7.65975219 4.32742403,7.50349288 C4.24757799,7.42320031 4.20545631,7.31907157 4.20545631,7.21489869 L4.20545631,0 L1.68222881,0 C0.752774596,0 0,0.71791003 0,1.60412988 Z" id="book"></path></g></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-template ll_std_tooltip" title="Template"><svg width="21px" height="20px" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-701.000000, -667.000000)" fill-rule="nonzero" class="svg-fill" fill="#333333"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><g id="if_document_text_add_103511" transform="translate(141.584475, 1.375000)"><g id="document_x5F_text_x5F_add"><path d="M14.7191781,8.45736719 L14.7191781,3.359125 L11.2932894,0 L0,0 L0,19.25 L14.7191781,19.25 L14.7191781,19.2145078 C17.4784107,18.9137266 19.6243442,16.622375 19.6255708,13.8359375 C19.6243442,11.0482969 17.4784107,8.75634375 14.7191781,8.45736719 Z M11.038157,1.45157031 L13.2386741,3.609375 L11.038157,3.609375 L11.038157,1.45157031 L11.038157,1.45157031 Z M1.22659817,18.046875 L1.22659817,1.20192188 L9.81278539,1.20192188 L9.81278539,4.81189844 L13.4925799,4.81189844 L13.4925799,8.45736719 C12.4180799,8.57407031 11.4368014,8.99275781 10.6395126,9.625 L2.45319635,9.625 L2.45319635,10.828125 L9.51656193,10.828125 C9.26388271,11.1986875 9.06088071,11.6035391 8.90694264,12.03125 L2.45319635,12.03125 L2.45319635,13.234375 L8.62237186,13.234375 C8.59967979,13.4322891 8.58618721,13.6320078 8.58618721,13.8359375 C8.58618721,15.5377578 9.38838242,17.0548984 10.6401259,18.046875 L1.22659817,18.046875 Z M14.105879,17.9764922 C11.7747292,17.9710781 9.88883447,16.1212734 9.88331478,13.8359375 C9.88883447,11.5493984 11.7747292,9.69959375 14.105879,9.69417969 C16.4358022,9.69959375 18.3216969,11.5493984 18.3272166,13.8359375 C18.3216969,16.1212734 16.4358022,17.9710781 14.105879,17.9764922 Z M12.2659817,7.21875 L12.2659817,8.421875 L2.45319635,8.421875 L2.45319635,7.21875 L12.2659817,7.21875 Z M17.1723744,13.234375 L17.1723744,14.4375 L14.7204047,14.4375 L14.7204047,16.84375 L13.4925799,16.84375 L13.4925799,14.4375 L11.0393836,14.4375 L11.0393836,13.234375 L13.4925799,13.234375 L13.4925799,10.828125 L14.7204047,10.828125 L14.7204047,13.234375 L17.1723744,13.234375 Z" id="Template"></path></g></g></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-snippet ll_std_tooltip" title="Snippet"><svg width="18px" height="16px" viewBox="0 0 18 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-738.000000, -669.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><path d="M178.732877,18.5623185 C178.73936,18.5623185 178.745791,18.5624326 178.752169,18.5626594 C178.754769,18.5624321 178.748338,18.5623185 178.732877,18.5623185 Z M185.500188,10.0387202 L185.500188,3.43731848 L179.203998,3.43731848 L179.203998,9.57570999 L182.766338,9.57570999 L182.75125,10.2777006 C182.690848,13.088006 181.521655,15.1530414 179.203998,16.4903795 L179.203998,18.4937514 C183.414392,17.8015019 185.500188,15.0242318 185.500188,10.0387202 Z M196.025916,10.0387202 L196.025916,3.43731848 L189.736907,3.43731848 L189.736907,9.57570999 L193.299247,9.57570999 L193.284159,10.2777006 C193.223875,13.0824843 192.052389,15.1475808 189.736907,16.486248 L189.736907,18.4489199 C194.190939,17.4236648 196.025916,14.9516211 196.025916,10.0387202 Z" id="snippets" transform="translate(187.379396, 10.999989) scale(-1, -1) translate(-187.379396, -10.999989) "></path></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-name ll_std_tooltip" title="Insert Merge Field"><svg width="18px" height="19px" viewBox="0 0 18 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-774.000000, -668.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><path d="M214.479452,6.325 C214.479452,5.878125 214.574368,5.34047896 214.760547,4.984375 C214.946728,4.62827193 215.132908,4.18139693 215.508919,3.82180198 C215.881279,3.46569802 216.253639,3.196875 216.720915,3.01882302 C217.18819,2.84077193 217.750381,2.75 218.403836,2.75 C219.057292,2.75 219.619482,2.84077193 220.086758,3.01882302 C220.554033,3.196875 221.021309,3.46569802 221.302404,3.82180198 C221.674765,4.090625 221.95586,4.5375 222.050776,4.984375 C222.14204,5.43125 222.328221,5.878125 222.328221,6.325 L222.328221,7.21875 C222.328221,7.665625 222.236955,8.20327193 222.050776,8.559375 C221.860945,8.91547896 221.674765,9.36235396 221.302404,9.72194802 C220.926394,10.078052 220.554033,10.256104 220.086758,10.524927 C219.619482,10.702979 219.057292,10.79375 218.403836,10.79375 C217.750381,10.79375 217.18819,10.702979 216.720915,10.524927 C216.253639,10.346875 215.786364,10.078052 215.508919,9.72194802 C215.132908,9.453125 214.946728,9.00625 214.760547,8.65014693 C214.574368,8.29055198 214.479452,7.75639693 214.479452,7.21875 L214.479452,6.325 Z M216.910745,7.21875 C216.910745,7.39680198 216.910745,7.665625 217.00201,7.84367698 C217.00201,8.02172896 217.096925,8.20327193 217.283105,8.38132302 C217.378021,8.559375 217.5642,8.65014693 217.750381,8.73742698 C217.936561,8.82819802 218.122741,8.82819802 218.403836,8.82819802 C218.684932,8.82819802 218.871112,8.82819802 219.057292,8.73742698 C219.247123,8.65014693 219.433302,8.559375 219.524568,8.38132302 C219.619482,8.20327193 219.714398,8.02172896 219.805663,7.84367698 C219.900578,7.665625 219.900578,7.48757302 219.900578,7.21875 L219.900578,6.325 C219.900578,6.14694802 219.900578,5.878125 219.805663,5.70007302 C219.805663,5.52202193 219.714398,5.34047896 219.524568,5.25319802 C219.433302,5.07514693 219.247123,4.984375 219.057292,4.89360396 C218.871112,4.80632302 218.684932,4.71555198 218.403836,4.71555198 C218.122741,4.71555198 217.936561,4.71555198 217.750381,4.80632302 C217.5642,4.984375 217.378021,5.07514693 217.283105,5.25319802 C217.096925,5.34047896 217.00201,5.52202193 217.00201,5.70007302 C216.910745,5.878125 216.910745,6.14694802 216.910745,6.325 L216.910745,7.21875 Z M219.247123,19.106323 L217.469285,18.212573 L226.34752,4.62827193 L228.125357,5.52202193 L219.247123,19.106323 Z M223.452602,16.15625 C223.452602,15.709375 223.543867,15.171729 223.730047,14.815625 C223.919878,14.36875 224.197323,14.0126469 224.478418,13.653052 C224.854429,13.296948 225.226788,13.1188969 225.694064,12.850073 C226.161339,12.58125 226.723531,12.58125 227.376986,12.58125 C228.030441,12.58125 228.592633,12.6720219 229.059908,12.850073 C229.527184,13.028125 229.994459,13.296948 230.271904,13.653052 C230.647914,14.0126469 230.834094,14.36875 231.020275,14.815625 C231.206455,15.2625 231.30137,15.709375 231.30137,16.15625 L231.30137,17.05 C231.30137,17.496875 231.206455,18.0345219 231.020275,18.390625 C230.834094,18.8375 230.647914,19.193604 230.271904,19.553198 C229.899543,19.909302 229.527184,20.087354 229.059908,20.356177 C228.592633,20.534229 228.030441,20.625 227.376986,20.625 C226.723531,20.625 226.161339,20.534229 225.694064,20.356177 C225.226788,20.178125 224.759513,19.909302 224.478418,19.553198 C224.106057,19.193604 223.919878,18.8375 223.730047,18.390625 C223.543867,17.94375 223.452602,17.496875 223.452602,17.05 L223.452602,16.15625 Z M225.78898,17.05 C225.78898,17.228052 225.78898,17.496875 225.880244,17.674927 C225.975159,17.852979 226.066425,18.0345219 226.161339,18.212573 C226.256255,18.390625 226.442435,18.4813969 226.628615,18.568677 C226.814795,18.659448 227.000976,18.659448 227.282071,18.659448 C227.563166,18.659448 227.844261,18.659448 228.030441,18.568677 C228.216622,18.4813969 228.402802,18.390625 228.497717,18.212573 C228.592633,18.0345219 228.683897,17.852979 228.778812,17.674927 C228.870078,17.496875 228.870078,17.318823 228.870078,17.05 L228.870078,16.15625 C228.870078,15.978198 228.870078,15.709375 228.778812,15.531323 C228.683897,15.3532719 228.592633,15.171729 228.497717,14.993677 C228.402802,14.815625 228.216622,14.724854 228.030441,14.637573 C227.844261,14.546802 227.658082,14.546802 227.376986,14.546802 C227.09589,14.546802 226.90971,14.546802 226.723531,14.637573 C226.5337,14.724854 226.34752,14.815625 226.256255,14.993677 C226.161339,15.171729 226.066425,15.3532719 225.975159,15.531323 C225.880244,15.709375 225.880244,15.887427 225.880244,16.15625 L225.880244,17.05 L225.78898,17.05 Z" id="Name"></path></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-signature ll_std_tooltip" title="Change Signature"><svg width="27px" height="20px" viewBox="0 0 27 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-808.000000, -667.000000)" fill-rule="nonzero" class="svg-fill" fill="#979797"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><path d="M265.639093,13.7366543 C265.59523,13.9369591 265.577104,14.0203626 265.551527,14.1401271 C264.916273,17.1146775 264.959884,18.4869644 266.782524,18.9604752 C268.664729,19.4494609 274.685634,18.2461254 274.757325,16.960799 C274.80325,16.1374136 272.466817,16.8107714 270.358542,17.0901845 C269.175744,17.2469425 268.343721,17.3562879 267.76496,17.1768689 C267.47658,17.0901845 267.480991,16.7731219 267.47658,16.6343426 C267.461821,16.1699352 267.553832,15.5445392 267.76496,14.5559413 C267.789623,14.4404569 267.807033,14.3603503 267.850177,14.1633215 C268.240274,12.3850614 268.326481,11.876352 268.253731,11.2141776 C268.087443,9.7006022 266.728808,9.26609434 265.205721,10.069492 C263.676876,10.8759269 262.856833,12.3088779 262.06087,14.7859094 C261.954223,15.117793 261.591656,16.3030719 261.626674,16.1901093 C261.259058,17.3760113 261.003567,17.9966527 260.723517,18.3432217 C260.554288,18.5526478 260.520954,18.5606288 260.190612,18.4144065 C259.783988,18.2344186 260.18627,16.4111371 261.900573,11.8810104 C262.006366,11.6012683 262.048782,11.4888638 262.112057,11.3203748 C263.143613,8.57356516 263.639093,6.95942893 263.788334,5.50506558 C264.01332,3.31257094 263.241119,1.78031564 261.210913,1.43833709 C257.694604,0.846031633 254.656249,4.4351749 251.385838,11.0638612 C250.212429,13.4422049 247.134635,19.5540482 248.43982,20.074194 C249.745005,20.5943397 252.298523,14.2555183 253.434533,11.9529784 C256.219607,6.30800613 258.856708,3.19285559 260.81187,3.52219335 C261.44234,3.62839291 261.667281,4.07473702 261.541319,5.30223714 C261.415737,6.52604137 260.952568,8.03491746 259.982873,10.6170043 C259.920287,10.7836584 259.878383,10.8947079 259.773193,11.1728542 C258.644187,14.1563065 258.317012,15.093017 258.044612,16.3276329 C257.604337,18.3231142 257.825781,19.708782 259.227141,20.3290801 C260.530809,20.9061355 261.713854,20.6228905 262.522611,19.62203 C263.029888,18.9942611 263.347332,18.223123 263.794317,16.7811798 C263.763236,16.8814439 264.120713,15.7128061 264.222242,15.3968485 C264.765636,13.7058114 265.288294,12.6860161 265.96061,12.1466135 C265.904354,12.4982213 265.802175,12.9932424 265.639093,13.7366543 Z" id="Path-2"></path></g></g></g></g></svg></a> '+
                                    '<div class="new-message__list-action-btn">'+
                                        '<a href="#" class="toggle-list">'+
                                            '<span></span><span></span><span></span>'+
                                        '</a>'+
                                        '<div class="drop-list">'+
                                            '<ul>'+
                                                '<li idx="0" class="item__btn-template"><svg class="svg" width="21px" height="20px" viewBox="0 0 21 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-701.000000, -667.000000)" fill-rule="nonzero" class="svg-fill" fill="#333333"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><g id="if_document_text_add_103511" transform="translate(141.584475, 1.375000)"><g id="document_x5F_text_x5F_add"><path d="M14.7191781,8.45736719 L14.7191781,3.359125 L11.2932894,0 L0,0 L0,19.25 L14.7191781,19.25 L14.7191781,19.2145078 C17.4784107,18.9137266 19.6243442,16.622375 19.6255708,13.8359375 C19.6243442,11.0482969 17.4784107,8.75634375 14.7191781,8.45736719 Z M11.038157,1.45157031 L13.2386741,3.609375 L11.038157,3.609375 L11.038157,1.45157031 L11.038157,1.45157031 Z M1.22659817,18.046875 L1.22659817,1.20192188 L9.81278539,1.20192188 L9.81278539,4.81189844 L13.4925799,4.81189844 L13.4925799,8.45736719 C12.4180799,8.57407031 11.4368014,8.99275781 10.6395126,9.625 L2.45319635,9.625 L2.45319635,10.828125 L9.51656193,10.828125 C9.26388271,11.1986875 9.06088071,11.6035391 8.90694264,12.03125 L2.45319635,12.03125 L2.45319635,13.234375 L8.62237186,13.234375 C8.59967979,13.4322891 8.58618721,13.6320078 8.58618721,13.8359375 C8.58618721,15.5377578 9.38838242,17.0548984 10.6401259,18.046875 L1.22659817,18.046875 Z M14.105879,17.9764922 C11.7747292,17.9710781 9.88883447,16.1212734 9.88331478,13.8359375 C9.88883447,11.5493984 11.7747292,9.69959375 14.105879,9.69417969 C16.4358022,9.69959375 18.3216969,11.5493984 18.3272166,13.8359375 C18.3216969,16.1212734 16.4358022,17.9710781 14.105879,17.9764922 Z M12.2659817,7.21875 L12.2659817,8.421875 L2.45319635,8.421875 L2.45319635,7.21875 L12.2659817,7.21875 Z M17.1723744,13.234375 L17.1723744,14.4375 L14.7204047,14.4375 L14.7204047,16.84375 L13.4925799,16.84375 L13.4925799,14.4375 L11.0393836,14.4375 L11.0393836,13.234375 L13.4925799,13.234375 L13.4925799,10.828125 L14.7204047,10.828125 L14.7204047,13.234375 L17.1723744,13.234375 Z" id="Template"></path></g></g></g></g></g></g></svg>Template</li>'+
                                                '<li idx="1" class="item__btn-snippet"><svg class="svg" width="18px" height="16px" viewBox="0 0 18 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-738.000000, -669.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><path d="M178.732877,18.5623185 C178.73936,18.5623185 178.745791,18.5624326 178.752169,18.5626594 C178.754769,18.5624321 178.748338,18.5623185 178.732877,18.5623185 Z M185.500188,10.0387202 L185.500188,3.43731848 L179.203998,3.43731848 L179.203998,9.57570999 L182.766338,9.57570999 L182.75125,10.2777006 C182.690848,13.088006 181.521655,15.1530414 179.203998,16.4903795 L179.203998,18.4937514 C183.414392,17.8015019 185.500188,15.0242318 185.500188,10.0387202 Z M196.025916,10.0387202 L196.025916,3.43731848 L189.736907,3.43731848 L189.736907,9.57570999 L193.299247,9.57570999 L193.284159,10.2777006 C193.223875,13.0824843 192.052389,15.1475808 189.736907,16.486248 L189.736907,18.4489199 C194.190939,17.4236648 196.025916,14.9516211 196.025916,10.0387202 Z" id="snippets" transform="translate(187.379396, 10.999989) scale(-1, -1) translate(-187.379396, -10.999989) "></path></g></g></g></g></svg>Snippet</li>'+
                                                '<li idx="2" class="item__btn-name"><svg class="svg" width="18px" height="19px" viewBox="0 0 18 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-774.000000, -668.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><path d="M214.479452,6.325 C214.479452,5.878125 214.574368,5.34047896 214.760547,4.984375 C214.946728,4.62827193 215.132908,4.18139693 215.508919,3.82180198 C215.881279,3.46569802 216.253639,3.196875 216.720915,3.01882302 C217.18819,2.84077193 217.750381,2.75 218.403836,2.75 C219.057292,2.75 219.619482,2.84077193 220.086758,3.01882302 C220.554033,3.196875 221.021309,3.46569802 221.302404,3.82180198 C221.674765,4.090625 221.95586,4.5375 222.050776,4.984375 C222.14204,5.43125 222.328221,5.878125 222.328221,6.325 L222.328221,7.21875 C222.328221,7.665625 222.236955,8.20327193 222.050776,8.559375 C221.860945,8.91547896 221.674765,9.36235396 221.302404,9.72194802 C220.926394,10.078052 220.554033,10.256104 220.086758,10.524927 C219.619482,10.702979 219.057292,10.79375 218.403836,10.79375 C217.750381,10.79375 217.18819,10.702979 216.720915,10.524927 C216.253639,10.346875 215.786364,10.078052 215.508919,9.72194802 C215.132908,9.453125 214.946728,9.00625 214.760547,8.65014693 C214.574368,8.29055198 214.479452,7.75639693 214.479452,7.21875 L214.479452,6.325 Z M216.910745,7.21875 C216.910745,7.39680198 216.910745,7.665625 217.00201,7.84367698 C217.00201,8.02172896 217.096925,8.20327193 217.283105,8.38132302 C217.378021,8.559375 217.5642,8.65014693 217.750381,8.73742698 C217.936561,8.82819802 218.122741,8.82819802 218.403836,8.82819802 C218.684932,8.82819802 218.871112,8.82819802 219.057292,8.73742698 C219.247123,8.65014693 219.433302,8.559375 219.524568,8.38132302 C219.619482,8.20327193 219.714398,8.02172896 219.805663,7.84367698 C219.900578,7.665625 219.900578,7.48757302 219.900578,7.21875 L219.900578,6.325 C219.900578,6.14694802 219.900578,5.878125 219.805663,5.70007302 C219.805663,5.52202193 219.714398,5.34047896 219.524568,5.25319802 C219.433302,5.07514693 219.247123,4.984375 219.057292,4.89360396 C218.871112,4.80632302 218.684932,4.71555198 218.403836,4.71555198 C218.122741,4.71555198 217.936561,4.71555198 217.750381,4.80632302 C217.5642,4.984375 217.378021,5.07514693 217.283105,5.25319802 C217.096925,5.34047896 217.00201,5.52202193 217.00201,5.70007302 C216.910745,5.878125 216.910745,6.14694802 216.910745,6.325 L216.910745,7.21875 Z M219.247123,19.106323 L217.469285,18.212573 L226.34752,4.62827193 L228.125357,5.52202193 L219.247123,19.106323 Z M223.452602,16.15625 C223.452602,15.709375 223.543867,15.171729 223.730047,14.815625 C223.919878,14.36875 224.197323,14.0126469 224.478418,13.653052 C224.854429,13.296948 225.226788,13.1188969 225.694064,12.850073 C226.161339,12.58125 226.723531,12.58125 227.376986,12.58125 C228.030441,12.58125 228.592633,12.6720219 229.059908,12.850073 C229.527184,13.028125 229.994459,13.296948 230.271904,13.653052 C230.647914,14.0126469 230.834094,14.36875 231.020275,14.815625 C231.206455,15.2625 231.30137,15.709375 231.30137,16.15625 L231.30137,17.05 C231.30137,17.496875 231.206455,18.0345219 231.020275,18.390625 C230.834094,18.8375 230.647914,19.193604 230.271904,19.553198 C229.899543,19.909302 229.527184,20.087354 229.059908,20.356177 C228.592633,20.534229 228.030441,20.625 227.376986,20.625 C226.723531,20.625 226.161339,20.534229 225.694064,20.356177 C225.226788,20.178125 224.759513,19.909302 224.478418,19.553198 C224.106057,19.193604 223.919878,18.8375 223.730047,18.390625 C223.543867,17.94375 223.452602,17.496875 223.452602,17.05 L223.452602,16.15625 Z M225.78898,17.05 C225.78898,17.228052 225.78898,17.496875 225.880244,17.674927 C225.975159,17.852979 226.066425,18.0345219 226.161339,18.212573 C226.256255,18.390625 226.442435,18.4813969 226.628615,18.568677 C226.814795,18.659448 227.000976,18.659448 227.282071,18.659448 C227.563166,18.659448 227.844261,18.659448 228.030441,18.568677 C228.216622,18.4813969 228.402802,18.390625 228.497717,18.212573 C228.592633,18.0345219 228.683897,17.852979 228.778812,17.674927 C228.870078,17.496875 228.870078,17.318823 228.870078,17.05 L228.870078,16.15625 C228.870078,15.978198 228.870078,15.709375 228.778812,15.531323 C228.683897,15.3532719 228.592633,15.171729 228.497717,14.993677 C228.402802,14.815625 228.216622,14.724854 228.030441,14.637573 C227.844261,14.546802 227.658082,14.546802 227.376986,14.546802 C227.09589,14.546802 226.90971,14.546802 226.723531,14.637573 C226.5337,14.724854 226.34752,14.815625 226.256255,14.993677 C226.161339,15.171729 226.066425,15.3532719 225.975159,15.531323 C225.880244,15.709375 225.880244,15.887427 225.880244,16.15625 L225.880244,17.05 L225.78898,17.05 Z" id="Name"></path></g></g></g></g></svg>Insert Merge Field</li>'+
                                                '<li idx="3" class="item__btn-signature"><svg class="svg" width="27px" height="20px" viewBox="0 0 27 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Sales-automatin" transform="translate(-808.000000, -667.000000)" fill-rule="nonzero" class="svg-fill" fill="#979797"><g id="Group-12" transform="translate(560.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 5.000000)"><path d="M265.639093,13.7366543 C265.59523,13.9369591 265.577104,14.0203626 265.551527,14.1401271 C264.916273,17.1146775 264.959884,18.4869644 266.782524,18.9604752 C268.664729,19.4494609 274.685634,18.2461254 274.757325,16.960799 C274.80325,16.1374136 272.466817,16.8107714 270.358542,17.0901845 C269.175744,17.2469425 268.343721,17.3562879 267.76496,17.1768689 C267.47658,17.0901845 267.480991,16.7731219 267.47658,16.6343426 C267.461821,16.1699352 267.553832,15.5445392 267.76496,14.5559413 C267.789623,14.4404569 267.807033,14.3603503 267.850177,14.1633215 C268.240274,12.3850614 268.326481,11.876352 268.253731,11.2141776 C268.087443,9.7006022 266.728808,9.26609434 265.205721,10.069492 C263.676876,10.8759269 262.856833,12.3088779 262.06087,14.7859094 C261.954223,15.117793 261.591656,16.3030719 261.626674,16.1901093 C261.259058,17.3760113 261.003567,17.9966527 260.723517,18.3432217 C260.554288,18.5526478 260.520954,18.5606288 260.190612,18.4144065 C259.783988,18.2344186 260.18627,16.4111371 261.900573,11.8810104 C262.006366,11.6012683 262.048782,11.4888638 262.112057,11.3203748 C263.143613,8.57356516 263.639093,6.95942893 263.788334,5.50506558 C264.01332,3.31257094 263.241119,1.78031564 261.210913,1.43833709 C257.694604,0.846031633 254.656249,4.4351749 251.385838,11.0638612 C250.212429,13.4422049 247.134635,19.5540482 248.43982,20.074194 C249.745005,20.5943397 252.298523,14.2555183 253.434533,11.9529784 C256.219607,6.30800613 258.856708,3.19285559 260.81187,3.52219335 C261.44234,3.62839291 261.667281,4.07473702 261.541319,5.30223714 C261.415737,6.52604137 260.952568,8.03491746 259.982873,10.6170043 C259.920287,10.7836584 259.878383,10.8947079 259.773193,11.1728542 C258.644187,14.1563065 258.317012,15.093017 258.044612,16.3276329 C257.604337,18.3231142 257.825781,19.708782 259.227141,20.3290801 C260.530809,20.9061355 261.713854,20.6228905 262.522611,19.62203 C263.029888,18.9942611 263.347332,18.223123 263.794317,16.7811798 C263.763236,16.8814439 264.120713,15.7128061 264.222242,15.3968485 C264.765636,13.7058114 265.288294,12.6860161 265.96061,12.1466135 C265.904354,12.4982213 265.802175,12.9932424 265.639093,13.7366543 Z" id="Path-2"></path></g></g></g></g></svg>Change Signature</li>'+
                                            '</ul>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="new-message__toggle-public-private">'+
                                    '<div class="svg ll_std_tooltip" title="Private Mail">'+
                                        '<svg  width="11px" height="15px" viewBox="0 0 11 15" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"><g id="New-Deal-popup" sketch:type="MSArtboardGroup" transform="translate(-820.000000, -291.000000)" fill="#939393"><g id="popup" sketch:type="MSLayerGroup" transform="translate(320.000000, 274.000000)"><g id="Group" sketch:type="MSShapeGroup"><g id="Group-3" transform="translate(461.000000, 10.000000)"><g id="lock" transform="translate(39.000000, 7.000000)"><path d="M9.2125,5.4375 L9.2125,4.8283125 C9.2125,2.27037688 7.83723022,0.515625 5.5,0.515625 C3.16652595,0.515625 1.7875,2.28055625 1.7875,4.8283125 L1.7875,5.4375 L3.1625,5.4375 L3.1625,4.8283125 C3.1625,2.99661816 4.00224869,1.921875 5.5,1.921875 C7.00262942,1.921875 7.8375,2.98711379 7.8375,4.8283125 L7.8375,5.4375 L9.2125,5.4375 L9.2125,5.4375 Z" id="Shape"></path><path d="M9.35,6 L1.65,6 C0.7392,6 0,6.756 0,7.6875 L0,13.3125 C0,14.244 0.7392,15 1.65,15 L9.35,15 C10.2608,15 11,14.244 11,13.3125 L11,7.6875 C11,6.756 10.2608,6 9.35,6 L9.35,6 Z M6.05,10.9066875 L6.05,12.1875 C6.05,12.4974375 5.80305,12.75 5.5,12.75 C5.19695,12.75 4.95,12.4974375 4.95,12.1875 L4.95,10.9066875 C4.6222,10.7115 4.4,10.3531875 4.4,9.9375 C4.4,9.3165 4.8928,8.8125 5.5,8.8125 C6.1072,8.8125 6.6,9.3165 6.6,9.9375 C6.6,10.352625 6.3778,10.7115 6.05,10.9066875 L6.05,10.9066875 Z" id="Shape"></path></g></g></g></g></g></g></svg>'+
                                    '</div> '+
                                    '<div class="ll-switch switch-small">'+
                                        '<div class="switch">'+
                                            '<input checked id="remind_send_email_toggle_'+id+'" name="remind_send_email_'+id+'" class="remind_send_email_toggle cmn-toggle cmn-toggle-round" type="checkbox">'+
                                            '<label for="remind_send_email_toggle_'+id+'"></label>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="new-message__btns-right">'+
                                	'<a href="#" class="new-message__btn-expand t-btn-gray ll_std_tooltip" title="Compose"></a>'+
                                    '<a href="#" class="new-message__btn-save t-btn-gray ll_std_tooltip" title="Save"></a>'+
                                    '<a href="#" class="new-message__btn-delete t-btn-gray ll_std_tooltip" title="Delete"></a>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                    '</div>';
		return html;
	},
	newMessage__expandPopup: function(){
		var html = '<div class="new-message-popup-wrap new-message-popup-wrap--no-minimize">'+
				        '<div class="new-message-popup">'+
				            '<div class="new-message-popup__header">'+
				                '<div class="new-message-popup__title">New Message</div>'+
				                '<a href="#" class="new-message-popup__preview"></a>'+
				                '<a href="#" class="new-message-popup__minimize"></a>'+
				                '<a href="#" class="new-message-popup__close"></a>'+
				            '</div>'+
				            '<div class="new-message-popup__content">'+
				                acc_page.new_message__htmlEditor() +
				            '</div>'+
				        '</div>'+
				        '<div class="new-message-popup-preview">'+
				            '<div class="new-message-popup-preview__btns-top">'+
				                '<a href="#" class="new-message-popup-preview__btn-prev"></a>'+
				                '<a href="#" class="new-message-popup-preview__btn-next"></a>'+
				            '</div>'+
				            '<div class="new-message-popup-preview__to-from">'+
				                '<div class="new-message-popup-preview__to"><strong>To:</strong> "Arthur Chin" &lt;a.chin@ucol.edu&gt;</div>'+
				                '<div class="new-message-popup-preview__from"><strong>From:</strong> "Ryan Schefke" &lt;rrschefke@leadliaison&gt;</div>'+
				            '</div>'+
				            '<div class="new-message-popup-preview__content">'+
				                '<div class="new-message-popup-preview__email-content">'+
				                    
				                '</div>'+
				            '</div>'+
				            '<div class="new-message-popup-preview__btns-bottom">'+
				                '<a href="#" class="t-btn-orange new-message-popup-preview__btn-send-me-preview">Send Me a Preview</a>'+
				            '</div>'+
				        '</div>'+
				    '</div>';
		return html;
		
	},
	newMessage__popupShowHide: function(){
		var offsetRight = 90 + $('.inbound-call-popup:visible').outerWidth();
		var offsetCall = 466 - offsetRight;
		var offsetPreview = 300;
		var widthPopup = 450;
		var widthPopupMinimize = 190; 
		var widthBox = $(window).outerWidth() - offsetRight - offsetPreview;
		var countPopupVisible = 0;
		var countPopupMinimizeVisible = 0;
		var countPopupMinimizeVisiblePresent = 0;
		var countPopupImport = $('.new-message-popup-wrap.new-message-popup-wrap--no-minimize').length;
		var countItemInColumn = 12;

		if ( $('.new-message__popups').hasClass('offset-call') ){
			widthBox = widthBox - offsetCall;
		}

		countPopupVisible = Math.floor( (widthBox) / widthPopup);
		countPopupMinimizeVisible = Math.floor((widthBox + offsetPreview - (countPopupVisible * widthPopup)) / widthPopupMinimize);

		$('.new-message-popup-wrap:not(.new-message-popup--minimize):not(.new-message-popup-wrap--no-minimize)').each(function(index){
			var $popup = $(this);

			if (countPopupVisible - countPopupImport > index){

				if (countPopupVisible != 0){
					$popup.show();
				}else {
					$popup.hide().addClass('new-message-popup--minimize');
				}

			}else{
				$popup.hide().addClass('new-message-popup--minimize');
			}
		});

		
		if (countPopupVisible != 0)
			$('.new-message-popup-wrap--no-minimize').show().removeClass('new-message-popup-wrap--no-minimize');
		else
			$('.new-message-popup-wrap--no-minimize').removeClass('new-message-popup-wrap--no-minimize').addClass('new-message-popup--minimize');


		countPopupMinimizeVisiblePresent = Math.floor((widthBox + offsetPreview - ($('.new-message-popup-wrap:not(.new-message-popup--minimize):visible').length * widthPopup)) / widthPopupMinimize);
		
		$('.new-message-popup-wrap.new-message-popup--minimize').each(function(index){
			var $popup = $(this);

			if (countPopupMinimizeVisiblePresent * countItemInColumn > index)
				$popup.show()
			else
				$popup.hide();
		});

		acc_page.newMessage__popupPosition(countPopupMinimizeVisiblePresent, countItemInColumn);
	},
	newMessage__popupPosition:function(countColumn, countItemInColumnMax){
		var marginRight = 10;
		var widthPopup = 450;
		var widthMinimizePopup = 190;
		var marginBottom = 0;
		var heightMinimize = 46;
		var indexItem = 0;
		var countVisibleMinimize = $('.new-message-popup-wrap.new-message-popup--minimize:visible').length;

		$('.new-message-popup-wrap:not(.new-message-popup--minimize):visible').each(function(){
			$(this).css({
				marginRight: marginRight,
				marginBottom: 0
			})
			marginRight = marginRight + widthPopup;
		});

		$('.new-message-popup-wrap.new-message-popup--minimize:visible').each(function(index){

			
			if ( countColumn >= countVisibleMinimize ){
				if ( indexItem > 0 )
					marginRight = marginRight + widthMinimizePopup;
			} else{

				if ( indexItem + 1 > countItemInColumnMax ){
					marginRight = marginRight + widthMinimizePopup;
					indexItem = 0;
					marginBottom = 0;
				} else{
					if ( indexItem > 0 )
						marginBottom += heightMinimize;
				}
			}
			
			$(this).css({
				marginRight:  marginRight,
				marginBottom: marginBottom
			});

			indexItem++;
		});
	},
	newMessage__popupEditorHeight: function($box){
		var resizeHeight = 300;
		var heightField = 42;
		var fieldShowLength = 0;
		
		if ( $box.parents('.new-message-popup').length )
			resizeHeight = 400;

		fieldShowLength = $box.find('.new-message__field-cc:visible, .new-message__field-bcc:visible').length;
		resizeHeight = resizeHeight - (fieldShowLength * heightField);
		tinyMCE.DOM.setStyle(tinyMCE.DOM.get($box.find('.new-message__field-message-editor').attr('id') + '_ifr'), 'height', resizeHeight + 'px');
	},
	overflowing: function(element, extraWidth) {
		return element.position().left + element.width() + extraWidth > element.parent().width();
	},
	moreRecipientsChange: function($el){
		$el.each(function(){
			var extraWidth = 41,
				$el = $(this);

			acc_page.overflowing($el, extraWidth) ? $el.addClass('toggle-more') : $el.removeClass('toggle-more');
		});
	},
	moreRecipients: function(){
		acc_page.moreRecipientsChange($('.wrap-recipients'));

		$('.wrap-tl-msg').on('click', '.toggle-more', function(e){
			e.stopPropagation();
			$(this).parent().toggleClass('no-overflow');
		});

		$(window).on('resize.moreRecipients', function(){
			acc_page.moreRecipientsChange($('.wrap-recipients'));
		});
	}
};
$(document).ready(function() {
    acc_page.init();

	if( $('.main-content').hasClass('account-page') ){
		acc_page.dropDownActionCustom();
		acc_page.sortableSidebar();
		acc_page.editorNoteAndTask();
		acc_page.attachFiles();
		acc_page.editQuality();
		acc_page.editLocation();
		acc_page.editNameUser();
		acc_page.editAmount();
		acc_page.editCloseDate();
		
		
		acc_page.updateSelectTypeActivity();
		acc_page.emailMessage();
		acc_page.dropDownActionTab();
		acc_page.dealStage();
	}
	acc_page.fieldEditAction();
	acc_page.addFieldPopup();
	acc_page.filterTimelinesActions();
	acc_page.addFieldsAutomateAndLists();
	acc_page.linkEditAction();

	if( $('.show-hide-tabs').length ){
		acc_page.showHideTabs();

		$(window).resize(function(){
			acc_page.showHideTabs();
		});

		$('.toggle-nav-admin').on('click', function(){
			setTimeout(function(){
				acc_page.showHideTabs();
			},1);
		});
	}

	acc_page.isMsgNotesSave();
	acc_page.newMessage__init();
	acc_page.moreRecipients();
});