
jQuery.expr[':'].Contains = function(a, i, m) { 
	return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0; 
};
var saPage = {
    init: function(){
        saPage.newMessage__editor();
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
	heightPreviewTemplate: function(){
		var $box = $('.preview-template');
		var offset = $box.offset().top;
		var heightHead = 58;
		var paddingBottom = 20;
		var height = $(window).height() - offset - heightHead - paddingBottom;

		$box.find('.preview-template__content').height(height);
	}
};
$(document).ready(function() {
    saPage.init();

    if($('.preview-template').length){
    	saPage.heightPreviewTemplate();
    	$(window).on('resize.heightPreviewTpl', function(){
    		saPage.heightPreviewTemplate();
    	});
    }

    email_popups.init();
});