jQuery.expr[':'].Contains = function(a, i, m) { 
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};

var email_popups = {
	init: function(){
		$('body').on('click.new_message', function(e){
			var $target = $(e.target);			

			$('.new-message__list-action-btn.open').removeClass('open');

			if ( $('.new-message-tooltip--reminder').length && !$target.parents('.new-message-tooltip--reminder').length && !$target.hasClass('new-message-tooltip--reminder') ){
				$('.new-message-tooltip--reminder').remove();
				removeClassBtns();
			}

			if ( $('.new-message-tooltip--send-lated').length && !$target.parents('.new-message-tooltip--send-lated').length && !$target.hasClass('new-message-tooltip--send-lated') ){
				$('.new-message-tooltip--send-lated').remove();
				removeClassBtns();
			}

			if ( $('.new-message-tooltip--search-items').length && !$target.parents('.new-message-tooltip--search-items').length && !$target.hasClass('new-message-tooltip--search-items') ){
				$('.new-message-tooltip--search-items').remove();
				removeClassBtns();
			}
		});

		function removeClassBtns(){
			$('.new-message__btns-action > a.opened').removeClass('opened');
		}

		$('body').on('click', '.new-message__list-action-btn', function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		$('body').on('click', '.new-message__list-action-btn > .toggle-list', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parent().toggleClass('open');
			$('.new-message-tooltip--reminder, .new-message-tooltip--send-lated, .new-message-tooltip--search-items').remove();
		});

		$('body').on('click', '.new-message__list-action-btn li', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('.new-message__list-action-btn').toggleClass('open');
		});

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
				email_popups.newMessage__dateSchedule();
				email_popups.newMessage__time();
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
				email_popups.newMessage__dateReminder();
				$('.new-message-tooltip--reminder').find('select').chosen();
				$('.new-message-tooltip--reminder').show();
			}
			
		});
		
		$('body').on('change.remind_send_email_toggle', '.remind_send_email_toggle', function(){
			var $toggle = $(this);
			var $box = $toggle.parents('.new-message__toggle-public-private');

			$toggle.is(':checked') ? $box.removeClass('private') : $box.addClass('private');
		});

		$('body').on('click', '.new-message__btn-trackable-peace-of-content, .new-message__btn-template, .new-message__btn-snippet, .new-message__btn-name, .new-message__btn-signature, .item__btn-template, .item__btn-snippet, .item__btn-name, .item__btn-signature', function(e){
			e.preventDefault();
			e.stopPropagation();
			var $el = $(this);
			var className = '';
			var searchText = '';
			var content = '';
			var isItemClick = false;

            if ( $el.hasClass('new-message__btn-trackable-peace-of-content') ){
            	className = 'new-message-tooltip--search-items-trackable';
            	searchText = 'trackable peace of content';
            } else if ( $el.hasClass('new-message__btn-snippet') || $el.hasClass('item__btn-snippet') ){
            	className = 'new-message-tooltip--search-items-snippet';
            	searchText = 'snippet';
            	if ($el.hasClass('item__btn-snippet')){
            		isItemClick = true;
            	}
            	
            } else if ( $el.hasClass('new-message__btn-name') || $el.hasClass('item__btn-name') ) {
            	className = 'new-message-tooltip--search-items-name';
            	searchText = 'field';
            	if ($el.hasClass('item__btn-name')){
            		isItemClick = true;
            	}
            } else if ( $el.hasClass('new-message__btn-signature') || $el.hasClass('item__btn-signature') ){
            	className = 'new-message-tooltip--search-items-signature';
            	searchText = 'signature';
            	if ($el.hasClass('item__btn-signature')){
            		isItemClick = true;
            	}
            } else {
            	className = 'new-message-tooltip--search-items-template';
            	searchText = 'template';
            	if ($el.hasClass('item__btn-template')){
            		isItemClick = true;
            	}
            }

            content = '<div class="new-message-tooltip new-message-tooltip--search-items">'+
                                '<div class="new-message-tooltip__arrow"></div>'+
                                '<div class="new-message-tooltip__content">'+
                                	'<div class="new-message-tooltip__close"><svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Start-screen-Phone-call" transform="translate(-1166.000000, -19.000000)" class="svg-fill" fill="#333333"><g id="Group-5"><g id="close_window" transform="translate(1159.000000, 12.000000)"><path d="M18.78,17.394 L17.392,18.781 C17.138,19.036 16.722,19.036 16.468,18.781 L13,15.313 L9.533,18.78 C9.278,19.035 8.863,19.035 8.608,18.778 L7.22,17.394 C6.967,17.138 6.967,16.725 7.22,16.468 L10.688,13.001 L7.221,9.534 C6.967,9.278 6.967,8.862 7.221,8.609 L8.609,7.221 C8.864,6.964 9.28,6.964 9.534,7.221 L13,10.689 L16.468,7.221 C16.723,6.964 17.139,6.964 17.392,7.221 L18.78,8.607 C19.034,8.862 19.034,9.278 18.781,9.534 L15.313,13.001 L18.781,16.468 C19.033,16.725 19.033,17.138 18.78,17.394 L18.78,17.394 Z" id="Path"></path></g></g></g></g></svg></div>'+
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

            if ( !isItemClick){
            	if ( $el.hasClass('opened') ) {
					$el.removeClass('opened');
					$('.new-message-tooltip--search-items').remove();
				} else {
					$('.new-message__btns-action > a.opened').removeClass('opened');
					$('.new-message-tooltip--reminder, .new-message-tooltip--send-lated, .new-message-tooltip--search-items').remove();
					$el.addClass('opened');
					$el.after(content);
					email_popups.newMessage__searchTooltipInit();
					$('.new-message-tooltip--search-items').addClass(className).show().find('input').focus();
				}
            } else{
            	$el.parents('.new-message__list-action-btn').after(content);
				email_popups.newMessage__searchTooltipInit();
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

			email_popups.newMessage__seletedBtns($this.parents('.new-message-tooltip'));
			email_popups.newMessage__tooltipHide($this.parents('.new-message-tooltip'));
		});

		$('body').on('click', '.nm-schedule__btns .t-btn-gray', function(e){
			e.preventDefault();
			e.stopPropagation();

			var $this = $(this);

			email_popups.newMessage__seletedBtns($this.parents('.new-message-tooltip'));
			email_popups.newMessage__tooltipHide($this.parents('.new-message-tooltip'));
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
					email_popups.newMessage__seletedBtns($(this).parents('.new-message__btn-attach'), true);
				}

				$box.find('.new-message__attach-files').append(htmlFile);
			}
		});

		$('body').on('click', '.new-message__attach-file-delete', function(e){
			e.preventDefault();
			e.stopPropagation();
			$(this).parents('.new-message__attach-file').remove();
			email_popups.newMessage__countAttchFiles();
		});
	},
	newMessage__dateSchedule: function(){
		$('.nm-schedule__date-input .txt-field').datetimepicker({
			timepicker:false,
			format:'d/m/Y',
			value: new Date(),
			onChangeDateTime:function(dp,$input){
			    email_popups.newMessage__seletedBtns($input.parents('.new-message-tooltip'));
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
			    email_popups.newMessage__seletedBtns($input.parents('.new-message-tooltip'));
		  	}
		});
	},
	newMessage__time: function(){
		$('.nm-schedule__time-input .txt-field').datetimepicker({
			datepicker:false,
			format: 'g:i A',
			formatTime: 'g:i A',
			onChangeDateTime:function(dp,$input){
			    email_popups.newMessage__seletedBtns($input.parents('.new-message-tooltip'));
		  	}
		});
	},
	newMessage__searchTooltipInit: function(){
		$('.nm-search-items__search-input .txt-field').on('keyup', function(){
			var val = $(this).val();

			if ( val == '' ){
				$('.nm-search-items__search-list-none').hide();
				$('.nm-search-items__search-list-items').show().find('li').show();
			} else{
				email_popups.newMessage__searchTooltip(val);
			}
			
		});
		$('.nm-search-items__search-list-items li').on('click', function(e){
			e.preventDefault();
			e.stopPropagation();

			var $this = $(this);
			email_popups.newMessage__addTempaleteEditor($this.parents('.new-message').find('.new-message__field-message-editor').attr('id'));
			email_popups.newMessage__seletedBtns($this.parents('.new-message-tooltip'));
			email_popups.newMessage__tooltipHide($this.parents('.new-message-tooltip'));
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
	newMessage__seletedBtns:function($el, isbtn){
		if ( isbtn )
			$el.addClass('selected');
		else
			$el.prev().addClass('selected');
	}
}