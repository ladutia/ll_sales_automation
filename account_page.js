
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
		$('body').on('click.new_message', function(e){
			var $target = $(e.target);			

			//$('.new-message__list-action-btn.open').removeClass('open');
			//$('.new-message__btns-action > a.opened').removeClass('opened');

			if ( $('.new-message-tooltip--reminder').length && !$target.parents('.new-message-tooltip--reminder').length && !$target.hasClass('new-message-tooltip--reminder') ){
				$('.new-message-tooltip--reminder').remove();
				removeClsassBtns();
			}

			if ( $('.new-message-tooltip--send-lated').length && !$target.parents('.new-message-tooltip--send-lated').length && !$target.hasClass('new-message-tooltip--send-lated') ){
				$('.new-message-tooltip--send-lated').remove();
				removeClsassBtns();
			}

			if ( $('.new-message-tooltip--search-items').length && !$target.parents('.new-message-tooltip--search-items').length && !$target.hasClass('new-message-tooltip--search-items') ){
				$('.new-message-tooltip--search-items').remove();
				removeClsassBtns();
			}

			//$('.new-message-tooltip--reminder .new-message-tooltip--reminder, .new-message-tooltip--search-items').remove();
		});

		function removeClsassBtns(){
			$('.new-message__list-action-btn.open').removeClass('open');
			$('.new-message__btns-action > a.opened').removeClass('opened');
		}

		$('body').on('click', '.new-message__list-action-btn', function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		$('body').on('click', '.new-message__list-action-btn > .toggle-list', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parent('').toggleClass('open');
		});

		$('body').on('click', '.new-message__list-action-btn li', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('.new-message__list-action-btn').toggleClass('open');
		});
		/*
		$('body').on('click.events-new-message-tooltip', '.new-message-tooltip--reminder, .new-message-tooltip--send-lated, .new-message-tooltip--search-items', function(e){
			e.preventDefault();
			e.stopPropagation();
		});*/

		$('body').on('click', '.new-message__btn-send-lated', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $el = $(this);
			var content = '<div class="new-message-tooltip new-message-tooltip--send-lated">'+
		                        '<div class="new-message-tooltip__arrow"></div>'+
		                        '<div class="new-message-tooltip__content">'+
		                            '<div class="nm-schedule">'+
		                                '<div class="nm-schedule__columns clearfix">'+
		                                    '<div class="nm-schedule__column">'+
		                                        '<div class="nm-schedule__date">'+
		                                            '<label>Date</label>'+
		                                            '<div class="nm-schedule__date-input">'+
		                                                '<input type="text" class="txt-field"/>'+
		                                                '<i class="nm-schedule__icn-search-date"></i>'+
		                                            '</div>'+
		                                        '</div>'+
		                                    '</div>'+
		                                    '<div class="nm-schedule__column">'+
		                                        '<div class="nm-schedule__time">'+
		                                            '<label>Time</label>'+
		                                            '<div class="nm-schedule__time-input">'+
		                                                '<input type="text" class="txt-field" value="1:00 PM"/>'+
		                                            '</div>'+
		                                        '</div>'+
		                                    '</div>'+
		                                '</div>'+
		                                '<div class="nm-schedule__btns">'+
		                                    '<a href="#" class="t-btn-gray">1 Day</a>'+
		                                    '<a href="#" class="t-btn-gray">1 Week</a>'+
		                                    '<a href="#" class="t-btn-gray">1 Month</a>'+
		                                '</div>'+
		                                '<div class="nm-schedule__btns-action">'+
			                                '<a href="javascript:void(0);" class="t-btn-orange nm-schedule__btn-schedule">Schedule</a>'+
			                                '<a href="javascript:void(0);" class="t-btn-gray nm-schedule__btn-clear">Clear</a>'+
		                                '</div>'+
		                            '</div>'+
		                        '</div>'+
		                   '</div>';

			if ( $el.hasClass('opened') ) {
				$el.removeClass('opened');
				$('.new-message-tooltip--send-lated').remove();
			} else {
				$('.new-message__btns-action > a.opened').removeClass('opened');
				$('.new-message-tooltip--reminder, .new-message-tooltip--send-lated, .new-message-tooltip--search-items').remove();
				$el.addClass('opened');
				$el.after(content);
				acc_page.newMessage__dateSchedule();
				acc_page.newMessage__time();
				$('.new-message-tooltip--send-lated').show();
			}
		});

		$('body').on('click', '.new-message__btn-reminder', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $el = $(this);
			var content = '<div class="new-message-tooltip new-message-tooltip--reminder">'+
                                '<div class="new-message-tooltip__arrow"></div>'+
                                '<div class="new-message-tooltip__content">'+
                                    '<div class="nm-reminder">'+
                                        '<div class="nm-reminder__title">Remind me if no reply after:</div>'+
                                        '<div class="nm-reminder__columns clearfix">'+
                                            '<div class="nm-reminder__column">'+
                                                '<div class="nm-reminder__day-select">'+
                                                    '<select>'+
                                                        '<option selected>1</option>'+
                                                        '<option>2</option>'+
                                                        '<option>3</option>'+
                                                        '<option>4</option>'+
                                                        '<option>5</option>'+
                                                        '<option>6</option>'+
                                                        '<option>7</option>'+
                                                        '<option>8</option>'+
                                                        '<option>9</option>'+
                                                        '<option>10</option>'+
                                                        '<option>11</option>'+
                                                        '<option>12</option>'+
                                                        '<option>13</option>'+
                                                        '<option>14</option>'+
                                                        '<option>15</option>'+
                                                        '<option>16</option>'+
                                                        '<option>17</option>'+
                                                        '<option>18</option>'+
                                                        '<option>19</option>'+
                                                        '<option>20</option>'+
                                                        '<option>21</option>'+
                                                        '<option>22</option>'+
                                                        '<option>23</option>'+
                                                        '<option>24</option>'+
                                                        '<option>25</option>'+
                                                        '<option>26</option>'+
                                                        '<option>27</option>'+
                                                        '<option>28</option>'+
                                                        '<option>29</option>'+
                                                        '<option>30</option>'+
                                                    '</select>'+
                                                '</div>'+
                                            '</div>'+
                                            '<div class="nm-reminder__column">'+
                                                '<div class="nm-reminder__period-select">'+
                                                   '<select>'+
                                                        '<option>Days</option>'+
                                                        '<option>Months</option>'+
                                                        '<option>Years</option>'+
                                                    '</select>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="nm-reminder__datepicker">'+
                                        	'<div class="nm-reminder__title">Or, if no reply after this specific day:</div>'+
                                            '<input type="text" class="txt-field"/>'+
                                        '</div>'+
                                        '<div class="nm-reminder__switches">'+
	                                        '<div class="nm-reminder__title">Send reminder as:</div>'+
	                                        '<div class="ll-switch switch-small">'+
	                                        	'<div class="switch">'+
	                                        		'<input id="remind_send_email" name="remind_send_email" class="cmn-toggle cmn-toggle-round" type="checkbox">'+
	                                        		'<label for="remind_send_email"></label>'+
	                                        	'</div>'+
	                                       		'<div class="ll-switch-lb">Email</div>'+
	                                        '</div>'+
	                                        '<div class="ll-switch switch-small">'+
	                                        	'<div class="switch">'+
	                                        		'<input id="remind_create_task" checked="checked" name="remind_create_task" class="cmn-toggle cmn-toggle-round" type="checkbox">'+
	                                        		'<label for="remind_create_task"></label>'+
	                                        	'</div>'+
	                                        	'<div class="ll-switch-lb">Task</div>'+
                                        	'</div>'+
                                        
                                        '<div class="nm-reminder__btns-action">'+
			                                '<a href="javascript:void(0);" class="t-btn-gray nm-reminder__btn-clear">Clear</a>'+
			                                '<a href="javascript:void(0);" class="t-btn-orange nm-reminder__btn-save">Save</a>'+
		                                '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';

			if ( $el.hasClass('opened') ) {
				$el.removeClass('opened');
				$('.new-message-tooltip--reminder').remove();
			} else {
				$('.new-message__btns-action > a.opened').removeClass('opened');
				$('.new-message-tooltip--reminder, .new-message-tooltip--send-lated, .new-message-tooltip--search-items').remove();
				$el.addClass('opened');
				$el.after(content);
				acc_page.newMessage__dateReminder();
				$('.new-message-tooltip--reminder').find('select').chosen();
				$('.new-message-tooltip--reminder').show();
			}
			
		});

		$('body').on('click', '.new-message__btn-trackable-peace-of-content, .new-message__btn-template, .new-message__btn-snippet', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $el = $(this);
			var className = '';
			var searchText = '';
			var content = ''

            if ( $el.hasClass('new-message__btn-trackable-peace-of-content') ){
            	className = 'new-message-tooltip--search-items-trackable';
            	searchText = 'trackable peace of content';
            } else if (  $el.hasClass('new-message__btn-snippet') ){
            	className = 'new-message-tooltip--search-items-snippet';
            	searchText = 'snippet';
            } else{
            	className = 'new-message-tooltip--search-items-template';
            	searchText = 'template';
            }

            content = '<div class="new-message-tooltip new-message-tooltip--search-items">'+
                                '<div class="new-message-tooltip__arrow"></div>'+
                                '<div class="new-message-tooltip__content">'+
                                	'<div class="new-message-tooltip__close"></div>'+
                                    '<div class="nm-search-items">'+
                                        '<div class="nm-search-items__search">'+
                                            '<div class="nm-search-items__search-input">'+
                                                '<input type="text" class="txt-field"/>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="nm-search-items__search-list">'+
                                            '<div class="nm-search-items__search-list-none">No '+ searchText +' found</div>'+
                                            '<ul class="nm-search-items__search-list-items">'+
                                                '<li><span class="search-text">Item 1</span></li>'+
                                                '<li><span class="search-text">Item 2</span></li>'+
                                                '<li><span class="search-text">Item 3</span></li>'+
                                                '<li><span class="search-text">Item 4</span></li>'+
                                                '<li><span class="search-text">Item 5</span></li>'+
                                            '</ul>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';

			if ( $el.hasClass('opened') ) {
				$el.removeClass('opened');
				$('.new-message-tooltip--search-items').remove();
			} else {
				$('.new-message__btns-action > a.opened').removeClass('opened');
				$('.new-message-tooltip--reminder, .new-message-tooltip--send-lated, .new-message-tooltip--search-items').remove();
				$el.addClass('opened');
				$el.after(content);
				acc_page.newMessage__searchTooltipInit();
				$('.new-message-tooltip--search-items').addClass(className).show().find('input').focus();
			}
			
		});
		
		$('body').on('click', '.new-message-tooltip__close', function(e){
			e.stopPropagation();
			e.preventDefault();

			var $tooltip = $(this).parents('.new-message-tooltip');
			$tooltip.prev().removeClass('opened');
			$tooltip.remove();
		});

		$('body').on('click', '.nm-schedule__btn-schedule', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $this = $(this);
			var $box = $this.parents('.new-message__actions');

			$box.find('.new-message__btn-send').hide();
			$box.find('.new-message__btn-sсhedule').css('display','inline-block');

			acc_page.newMessage__seletedBtns($this.parents('.new-message-tooltip'));
			acc_page.newMessage__tooltipHide($this.parents('.new-message-tooltip'));
		});

		$('body').on('click', '.nm-schedule__btns .t-btn-gray', function(e){
			e.preventDefault();
			e.stopPropagation();

			var $this = $(this);

			acc_page.newMessage__seletedBtns($this.parents('.new-message-tooltip'));
			acc_page.newMessage__tooltipHide($this.parents('.new-message-tooltip'));
		});

		$('body').on('click', '.nm-reminder__btn-clear', function(e){
			e.preventDefault();
			e.stopPropagation();

			var $tooltip = $(this).parents('.new-message-tooltip');

			$tooltip.find('.nm-reminder__datepicker .txt-field').datetimepicker('reset');
			$tooltip.find('.nm-reminder__day-select select option').eq(0).attr('selected', true);
            $tooltip.find('.nm-reminder__day-select').find('select').trigger('liszt:updated');
            $tooltip.find('.nm-reminder__period-select select option').eq(0).attr('selected', true);
            $tooltip.find('.nm-reminder__period-select').find('select').trigger('liszt:updated');
            $tooltip.prev().removeClass('selected');
		});

		$('body').on('click', '.nm-schedule__btn-clear', function(e){
			e.preventDefault();
			e.stopPropagation();

			var $tooltip = $(this).parents('.new-message-tooltip');

			$tooltip.find('.nm-schedule__date-input .txt-field, .nm-schedule__time-input .txt-field').datetimepicker('reset');
          	$tooltip.find('.nm-schedule__date-input .txt-field').val($.datepicker.formatDate('dd/mm/yy', new Date()));
            $tooltip.prev().removeClass('selected');
		});

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

		$('body').on('click', '.new-message__attach-file-delete', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('.new-message__attach-file').remove();
			acc_page.newMessage__countAttchFiles();
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
			e.preventDefault();
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
		$('body').on('change', '.new-message__btn-attach input', function(e){
			e.preventDefault();
			e.stopPropagation();

			var html = '<div class="new-message__attach-files"></div>';
			var val = e.target.files[0].name;
			var $box = $(this).parents('.new-message');
			var htmlFile = '';

			if ( val != ''){
				htmlFile = '<div class="new-message__attach-file">'+
                                '<div class="new-message__attach-file-name">'+ val +'</div>'+
                                '<div class="new-message__attach-file-delete"></div>'+
                            '</div>';

				if ( !$box.find('.new-message__attach-files').length ){
					$box.find('.new-message__actions').before(html);
					acc_page.newMessage__seletedBtns($(this).parents('.new-message__btn-attach'), true);
				}

				$box.find('.new-message__attach-files').append(htmlFile);
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
	newMessage__dateSchedule: function(){
		$('.nm-schedule__date-input .txt-field').datetimepicker({
			timepicker:false,
			format:'d/m/Y',
			value: new Date(),
			onChangeDateTime:function(dp,$input){
			    acc_page.newMessage__seletedBtns($input.parents('.new-message-tooltip'));
		  	}
		});
	},
	newMessage__dateReminder: function(){
		$('.nm-reminder__datepicker .txt-field').datetimepicker({
			timepicker:false,
			format:'d/m/Y',
			inline: true,
			value: new Date(),
			onChangeDateTime:function(dp,$input){
			    acc_page.newMessage__seletedBtns($input.parents('.new-message-tooltip'));
		  	}
		});
	},
	newMessage__time: function(){
		$('.nm-schedule__time-input .txt-field').datetimepicker({
			datepicker:false,
			format: 'g:i A',
			formatTime: 'g:i A',
			onChangeDateTime:function(dp,$input){
			    acc_page.newMessage__seletedBtns($input.parents('.new-message-tooltip'));
		  	}
		});
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
	newMessage__searchTooltipInit: function(){
		$('.nm-search-items__search-input .txt-field').on('keyup', function(){
			var val = $(this).val();

			if ( val == '' ){
				$('.nm-search-items__search-list-none').hide();
				$('.nm-search-items__search-list-items').show().find('li').show();
			} else{
				acc_page.newMessage__searchTooltip(val);
			}
			
		});
		$('.nm-search-items__search-list-items li').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();

			var $this = $(this);
			acc_page.newMessage__addTempaleteEditor($this.parents('.new-message').find('.new-message__field-message-editor').attr('id'));
			acc_page.newMessage__seletedBtns($this.parents('.new-message-tooltip'));
			acc_page.newMessage__tooltipHide($this.parents('.new-message-tooltip'));
		});
	},
	newMessage__tooltipHide: function($tooltip){
		$tooltip.prev().removeClass('opened');
		$tooltip.remove();
	},
	newMessage__addTempaleteEditor: function($editorId){
		tinymce.get($editorId).execCommand('mceInsertContent', false, ' <strong>Lorem epsum</strong>');
	},
	newMessage__searchTooltip: function(searchText){
		var countItem = 0;
		$('.nm-search-items__search-list-items li').hide();
		$('.nm-search-items__search-list-items li').each(function(){
			$(this).find('.search-text:Contains("'+ searchText +'")').each(function(){
				$(this).parent().show();
				countItem++;
				return false;
			});
		});
		

		if (countItem > 0){
			$('.nm-search-items__search-list-none').hide();
			$('.nm-search-items__search-list-items').show();
		} else{
			$('.nm-search-items__search-list-none').show();
			$('.nm-search-items__search-list-items').hide();
		}
	},
	newMessage__countAttchFiles: function(){
		$('.new-message__attach-files').each(function(){
			var $wrap = $(this);

			if ( $wrap.find('.new-message__attach-file').length < 1 ){
				$wrap.parents('.new-message').find('.new-message__btn-attach').removeClass('selected');
				$wrap.remove();
			}
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
                                    '<a href="#" class="new-message__btn-send-lated ll_std_tooltip" title="Send Lated"><svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Embedded-in-Profile-page" transform="translate(-564.000000, -670.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(564.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 8.000000)"><g id="if_10_171505" transform="translate(0.000000, 1.000000)"><path d="M11.252227,6.96931915 C11.252227,6.67442553 11.0162128,6.43553191 10.7252908,6.43553191 L7.5007234,6.43553191 L7.5007234,3.2157305 L7.5007234,3.21563121 C7.5007234,2.91974468 7.2606383,2.67975887 6.96495035,2.67975887 C6.66906383,2.67975887 6.42897872,2.91974468 6.42897872,3.21563121 L6.42897872,6.96723404 C6.42897872,7.26321986 6.66906383,7.50320567 6.96495035,7.50320567 L10.7255887,7.50320567 C11.0162128,7.50320567 11.252227,7.26421277 11.252227,6.96931915 M12.8614326,6.96594326 C12.8614326,10.2224823 10.2218865,12.8624255 6.96604255,12.8624255 C3.71,12.8624255 1.07065248,10.2224823 1.07065248,6.96594326 C1.07065248,3.70940426 3.71,1.06946099 6.96604255,1.06946099 C10.2218865,1.06946099 12.8614326,3.70940426 12.8614326,6.96594326 M13.9318865,6.96594326 C13.9318865,3.1187234 10.8131631,0 6.96604255,0 C3.1187234,0 0,3.1187234 0,6.96594326 C0,10.8131631 3.1187234,13.9318865 6.96604255,13.9318865 C10.8131631,13.9318865 13.9318865,10.8131631 13.9318865,6.96594326" id="Schedule"></path></g></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-reminder ll_std_tooltip" title="Reminder"><svg width="12px" height="16px" viewBox="0 0 12 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Embedded-in-Profile-page" transform="translate(-591.000000, -669.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(564.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 8.000000)"><g id="if_lamp_622407" transform="translate(27.000000, 0.000000)"><path d="M10.2307274,1.70002361 C9.09827502,0.603749705 7.59211391,0 5.98962083,0 C2.68260049,0 0,2.60349469 0,5.8036647 C0,7.88958678 1.11237754,9.77104132 2.95778031,10.803608 L2.95778031,14.3084675 C2.95778031,15.2367887 3.71126119,15.991405 4.6567323,15.991405 L7.33412856,15.991405 C8.27388771,15.991405 9.05053865,15.2367887 9.05053865,14.3084675 L9.05053865,10.8006139 C10.8861774,9.76774498 11.9923938,7.88738607 11.9923938,5.8036647 C11.9923938,4.25336482 11.3628576,2.79600472 10.2307274,1.70002361 Z M7.33412856,14.7352066 L4.6567323,14.7352066 C4.42669162,14.7352066 4.24663303,14.5445478 4.24663303,14.3084675 L4.24663303,13.2995514 L7.76168592,13.2995514 L7.76168592,14.3084675 C7.76168592,14.5445478 7.55859398,14.7352066 7.33412856,14.7352066 Z M8.11277136,9.86997875 C7.89357852,9.97544274 7.76168592,10.1919055 7.76168592,10.4287226 L7.76168592,12.0527887 L6.66811391,12.0527887 L6.66811391,8.05751122 L8.23205858,8.05751122 C8.58834825,8.05751122 8.87717819,7.7787863 8.87717819,7.43413459 C8.87717819,7.08948288 8.58834825,6.81075797 8.23205858,6.81075797 L3.78075183,6.81075797 C3.42446216,6.81075797 3.13564199,7.08948288 3.13564199,7.43413459 C3.13564199,7.7787863 3.42446216,8.05751122 3.78075183,8.05751122 L5.36949715,8.05751122 L5.36949715,12.0527887 L4.24663303,12.0527887 L4.24663303,10.4315277 C4.24663303,10.1945502 4.10077787,9.97805903 3.88137998,9.87262338 C2.28269487,9.10439669 1.28595281,7.54526564 1.28595281,5.8036647 C1.28595281,3.29170248 3.39584378,1.24807556 5.99142718,1.24807556 C8.58658096,1.24807556 10.700358,3.29170248 10.700358,5.8036647 C10.7003678,7.54319717 9.71039219,9.10132704 8.11277136,9.86997875 Z" id="remind"></path></g></g></g></g></g></svg></a> '+
                                    '<a href="javascript:void(0);" class="new-message__btn-attach ll_std_tooltip" title="Attach">'+
                                        '<svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Embedded-in-Profile-page" transform="translate(-615.000000, -670.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(564.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 8.000000)"><g id="if_attachment_2318448" transform="translate(58.000000, 8.000000) scale(1, -1) translate(-58.000000, -8.000000) translate(51.000000, 1.000000)"><path d="M3.91715858,8.94991177 C3.77832,9.11473722 3.70231214,9.32114168 3.70231214,9.53628809 C3.70231214,9.78448753 3.80346821,10.0171745 3.98554913,10.1955679 C4.32961474,10.5253371 4.91039362,10.5469593 5.28550062,10.2604343 L11.5236994,4.28144044 C11.8716763,3.92853186 12.0618497,3.46703601 12.0618497,2.97839335 C12.0618497,2.47423823 11.8554913,1.99722992 11.483237,1.64044321 C10.7387283,0.926869806 9.43583815,0.926869806 8.68728324,1.64044321 L1.99479769,8.06260388 L1.99884393,8.06648199 C1.44046243,8.60166205 1.13294798,9.31523546 1.13294798,10.0753463 C1.13294798,10.8354571 1.44046243,11.5451524 1.99884393,12.0842105 C3.15202312,13.1894737 5.02947977,13.1894737 6.18265896,12.0880886 L13.1947977,5.36731302 L13.9797688,6.11966759 L6.82196532,12.9761773 L6.81791908,12.9722992 C6.04508671,13.6393352 5.0699422,13.9728532 4.09075145,13.9728532 C3.04682081,13.9728532 2.00693642,13.5927978 1.21387283,12.832687 C0.445086705,12.0958449 0.0202312139,11.1185596 0.0202312139,10.0753463 C0.0202312139,9.08254848 0.404624277,8.14792244 1.10462428,7.42271468 L1.09653179,7.41495845 L7.93872832,0.864819945 C8.51734104,0.325761773 9.27803468,0.0271468144 10.0872832,0.0271468144 C10.9127168,0.0271468144 11.6855491,0.333518006 12.2682081,0.891966759 C12.8508671,1.45041551 13.1705202,2.19113573 13.1705202,2.98227147 C13.1705202,3.72299169 12.8872832,4.42105263 12.3734104,4.96398892 L12.3774566,4.96786704 L12.2884393,5.0531856 C12.2803468,5.06094183 12.2763006,5.06481994 12.2682081,5.07257618 L6.14219653,10.9440443 L6.14624277,10.9479224 C6.1135551,10.9786315 6.08006495,11.0081249 6.0458365,11.0364005 L5.94393064,11.134072 L5.93284969,11.1234515 C5.56018629,11.3909086 5.11477523,11.5257618 4.66936416,11.5257618 C4.13526012,11.5257618 3.60520231,11.331856 3.20057803,10.9440443 C2.39132948,10.1684211 2.39132948,8.90027701 3.20057803,8.12465374 L3.27055172,8.19171994 L9.14295484,2.31931682 L9.89432204,3.07068402 L3.96612643,8.99887963 L3.91715858,8.94991177 Z" id="Attach"></path></g></g></g></g></g></svg>'+
                                        '<input type="file"/>'+
                                    '</a> '+
                                    '<a href="#" class="new-message__btn-trackable-peace-of-content ll_std_tooltip" title="Trackable peace of content"><svg width="12px" height="14px" viewBox="0 0 12 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Embedded-in-Profile-page" transform="translate(-642.000000, -670.000000)" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(564.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 8.000000)"><g id="if_78_111113" transform="translate(78.000000, 1.000000)"><path d="M0,1.16663991 L0,12.8333922 C0,13.4779478 0.537028578,14 1.20002642,14 L11.2499298,14 C11.6638618,14 12,13.6733562 12,13.2709183 C12,12.8683198 11.6638618,12.541676 11.2499298,12.541676 L2.10000495,12.541676 C1.76994238,12.541676 1.50004127,12.2790769 1.50004127,11.9583079 C1.50004127,11.6376994 1.7699754,11.3750682 2.10000495,11.3750682 L10.7999075,11.3750682 C11.4628724,11.3750682 12,10.8528555 12,10.2082678 L12,1.16663991 C12,0.522116386 11.4628724,3.21025815e-05 10.7999075,3.21025815e-05 L6.5999967,3.21025815e-05 L6.5999967,5.24719905 C6.5999967,5.32296114 6.57011408,5.39869113 6.51295739,5.45708573 C6.39613452,5.57072887 6.20382916,5.57072887 6.08694025,5.45708573 C6.00891526,5.37820968 4.79997358,4.40123182 4.79997358,4.40123182 C4.79997358,4.40123182 3.59106493,5.37820968 3.5129739,5.45708573 C3.39608499,5.57072887 3.20394473,5.57072887 3.08698978,5.45708573 C3.0300312,5.39869113 2.99998349,5.32296114 2.99998349,5.24719905 L2.99998349,0 L1.20002642,0 C0.536995559,0 0,0.522116386 0,1.16663991 Z" id="book"></path></g></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-template ll_std_tooltip" title="Template"><svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Embedded-in-Profile-page" transform="translate(-665.000000, -670.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(564.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 8.000000)"><g id="if_document_text_add_103511" transform="translate(101.000000, 1.000000)"><g id="document_x5F_text_x5F_add"><path d="M10.5,6.1508125 L10.5,2.443 L8.056125,0 L0,0 L0,14 L10.5,14 L10.5,13.9741875 C12.4683125,13.7554375 13.999125,12.089 14,10.0625 C13.999125,8.035125 12.4683125,6.36825 10.5,6.1508125 Z M7.874125,1.0556875 L9.443875,2.625 L7.874125,2.625 L7.874125,1.0556875 L7.874125,1.0556875 Z M0.875,13.125 L0.875,0.874125 L7,0.874125 L7,3.4995625 L9.625,3.4995625 L9.625,6.1508125 C8.8585,6.2356875 8.1585,6.5401875 7.58975,7 L1.75,7 L1.75,7.875 L6.7886875,7.875 C6.6084375,8.1445 6.463625,8.4389375 6.3538125,8.75 L1.75,8.75 L1.75,9.625 L6.1508125,9.625 C6.134625,9.7689375 6.125,9.9141875 6.125,10.0625 C6.125,11.3001875 6.69725,12.4035625 7.5901875,13.125 L0.875,13.125 Z M10.0625,13.0738125 C8.3995625,13.069875 7.05425,11.7245625 7.0503125,10.0625 C7.05425,8.3995625 8.3995625,7.05425 10.0625,7.0503125 C11.7245625,7.05425 13.069875,8.3995625 13.0738125,10.0625 C13.069875,11.7245625 11.7245625,13.069875 10.0625,13.0738125 Z M8.75,5.25 L8.75,6.125 L1.75,6.125 L1.75,5.25 L8.75,5.25 Z M12.25,9.625 L12.25,10.5 L10.500875,10.5 L10.500875,12.25 L9.625,12.25 L9.625,10.5 L7.875,10.5 L7.875,9.625 L9.625,9.625 L9.625,7.875 L10.500875,7.875 L10.500875,9.625 L12.25,9.625 Z" id="Template"></path></g></g></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-snippet ll_std_tooltip" title="Snippet"><svg width="13px" height="12px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Embedded-in-Profile-page" transform="translate(-691.000000, -671.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(564.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 8.000000)"><path d="M127.5,13.499868 C127.504625,13.499868 127.509212,13.499951 127.513763,13.5001159 C127.515617,13.4999506 127.511029,13.499868 127.5,13.499868 Z M132.327496,7.30088741 L132.327496,2.49986798 L127.836077,2.49986798 L127.836077,6.96415272 L130.37729,6.96415272 L130.366527,7.47469135 C130.323438,9.51854982 129.489389,11.0203937 127.836077,11.9930033 L127.836077,13.450001 C130.839582,12.9465468 132.327496,10.926714 132.327496,7.30088741 Z M139.836077,7.30088741 L139.836077,2.49986798 L135.349781,2.49986798 L135.349781,6.96415272 L137.890994,6.96415272 L137.880231,7.47469135 C137.837227,9.51453401 137.001541,11.0164224 135.349781,11.9899985 L135.349781,13.4173963 C138.527087,12.6717562 139.836077,10.8739062 139.836077,7.30088741 Z" id="snippets" transform="translate(133.668039, 7.999992) scale(-1, -1) translate(-133.668039, -7.999992) "></path></g></g></g></g></svg></a> '+
                                    '<a href="#" class="new-message__btn-name ll_std_tooltip" title="First Name / Full Name"><svg width="12px" height="13px" viewBox="0 0 12 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Embedded-in-Profile-page" transform="translate(-717.000000, -671.000000)" fill-rule="nonzero" class="svg-fill" fill="#939393"><g id="Group-12" transform="translate(564.000000, 661.000000)"><g id="Group-33" transform="translate(0.000000, 8.000000)"><path d="M153,4.6 C153,4.275 153.067709,3.8839847 153.200521,3.625 C153.333333,3.36601595 153.466146,3.04101595 153.734375,2.77949235 C154,2.52050765 154.265625,2.325 154.598959,2.19550765 C154.932292,2.06601595 155.333333,2 155.799479,2 C156.265625,2 156.666667,2.06601595 157,2.19550765 C157.333333,2.325 157.666667,2.52050765 157.867187,2.77949235 C158.132813,2.975 158.333333,3.3 158.401042,3.625 C158.466146,3.95 158.598959,4.275 158.598959,4.6 L158.598959,5.25 C158.598959,5.575 158.533854,5.96601595 158.401042,6.225 C158.265625,6.4839847 158.132813,6.8089847 157.867187,7.07050765 C157.598959,7.32949235 157.333333,7.4589847 157,7.65449235 C156.666667,7.7839847 156.265625,7.85 155.799479,7.85 C155.333333,7.85 154.932292,7.7839847 154.598959,7.65449235 C154.265625,7.525 153.932292,7.32949235 153.734375,7.07050765 C153.466146,6.875 153.333333,6.55 153.200521,6.29101595 C153.067709,6.02949235 153,5.64101595 153,5.25 L153,4.6 Z M154.734375,5.25 C154.734375,5.37949235 154.734375,5.575 154.799479,5.70449235 C154.799479,5.8339847 154.867187,5.96601595 155,6.09550765 C155.067709,6.225 155.200521,6.29101595 155.333333,6.35449235 C155.466146,6.42050765 155.598959,6.42050765 155.799479,6.42050765 C156,6.42050765 156.132813,6.42050765 156.265625,6.35449235 C156.401042,6.29101595 156.533854,6.225 156.598959,6.09550765 C156.666667,5.96601595 156.734375,5.8339847 156.799479,5.70449235 C156.867187,5.575 156.867187,5.44550765 156.867187,5.25 L156.867187,4.6 C156.867187,4.47050765 156.867187,4.275 156.799479,4.14550765 C156.799479,4.01601595 156.734375,3.8839847 156.598959,3.82050765 C156.533854,3.69101595 156.401042,3.625 156.265625,3.5589847 C156.132813,3.49550765 156,3.42949235 155.799479,3.42949235 C155.598959,3.42949235 155.466146,3.42949235 155.333333,3.49550765 C155.200521,3.625 155.067709,3.69101595 155,3.82050765 C154.867187,3.8839847 154.799479,4.01601595 154.799479,4.14550765 C154.734375,4.275 154.734375,4.47050765 154.734375,4.6 L154.734375,5.25 Z M156.401042,13.8955076 L155.132813,13.2455077 L161.466146,3.36601595 L162.734375,4.01601595 L156.401042,13.8955076 Z M159.401042,11.75 C159.401042,11.425 159.466146,11.0339847 159.598959,10.775 C159.734375,10.45 159.932292,10.1910159 160.132813,9.92949235 C160.401042,9.67050765 160.666667,9.54101595 161,9.34550765 C161.333333,9.15 161.734375,9.15 162.200521,9.15 C162.666667,9.15 163.067709,9.21601595 163.401042,9.34550765 C163.734375,9.475 164.067709,9.67050765 164.265625,9.92949235 C164.533854,10.1910159 164.666667,10.45 164.799479,10.775 C164.932292,11.1 165,11.425 165,11.75 L165,12.4 C165,12.725 164.932292,13.1160159 164.799479,13.375 C164.666667,13.7 164.533854,13.9589847 164.265625,14.2205077 C164,14.4794923 163.734375,14.6089847 163.401042,14.8044924 C163.067709,14.9339847 162.666667,15 162.200521,15 C161.734375,15 161.333333,14.9339847 161,14.8044924 C160.666667,14.675 160.333333,14.4794923 160.132813,14.2205077 C159.867187,13.9589847 159.734375,13.7 159.598959,13.375 C159.466146,13.05 159.401042,12.725 159.401042,12.4 L159.401042,11.75 Z M161.067709,12.4 C161.067709,12.5294923 161.067709,12.725 161.132813,12.8544923 C161.200521,12.9839847 161.265625,13.1160159 161.333333,13.2455077 C161.401042,13.375 161.533854,13.4410159 161.666667,13.5044923 C161.799479,13.5705076 161.932292,13.5705076 162.132813,13.5705076 C162.333333,13.5705076 162.533854,13.5705076 162.666667,13.5044923 C162.799479,13.4410159 162.932292,13.375 163,13.2455077 C163.067709,13.1160159 163.132813,12.9839847 163.200521,12.8544923 C163.265625,12.725 163.265625,12.5955077 163.265625,12.4 L163.265625,11.75 C163.265625,11.6205077 163.265625,11.425 163.200521,11.2955076 C163.132813,11.1660159 163.067709,11.0339847 163,10.9044923 C162.932292,10.775 162.799479,10.7089847 162.666667,10.6455076 C162.533854,10.5794923 162.401042,10.5794923 162.200521,10.5794923 C162,10.5794923 161.867187,10.5794923 161.734375,10.6455076 C161.598959,10.7089847 161.466146,10.775 161.401042,10.9044923 C161.333333,11.0339847 161.265625,11.1660159 161.200521,11.2955076 C161.132813,11.425 161.132813,11.5544923 161.132813,11.75 L161.132813,12.4 L161.067709,12.4 Z" id="Name"></path></g></g></g></g></svg></a> '+
                                    '<div class="new-message__list-action-btn">'+
                                        '<a href="#" class="toggle-list">'+
                                            '<span></span><span></span><span></span>'+
                                        '</a>'+
                                        '<div class="drop-list">'+
                                            '<ul>'+
                                                '<li idx="0">'+
                                                    'Choise 1'+
                                                '</li>'+
                                                '<li idx="1">'+
                                                    'Choise 2'+
                                                '</li>'+
                                            '</ul>'+
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
	newMessage__seletedBtns:function($el, isbtn){
		if ( isbtn )
			$el.addClass('selected');
		else
			$el.prev().addClass('selected');
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