var url_ajax_product = 'wp-admin/admin-ajax.php?action=woo_products_action';
var design={
	zIndex: 1,
	view: 'back',
	design_id: null,
	design_file: '',
	designer_id: 0,
	design_key: 0,
	output: {},
	colors: [],
	teams: {},
	fonts: '',
	ini:function(){
		var self = this;
		
		jQuery( ".accordion" ).accordion({heightStyle: "content", collapsible: true});
		jQuery('.dg-tooltip').tooltip();
		jQuery( "#layers" ).sortable({
			cancel: ".remove-layer, .layer-options, .setting-layer",
			stop: function( event, ui ) {
			self.layers.sort();
		}});		
		jQuery('.popover-close').click(function(){
			jQuery( ".popover" ).hide('show');
		});		
		
		design.item.move();
		$jd( "#dg-outline-width" ).slider({
			animate: true,
			slide: function( event, ui ) {
				jQuery('.outline-value').html(ui.value);
				design.text.update('outline-width', ui.value);
			}
		});
		
		$jd( "#dg-shape-width" ).slider();
		
		$jd('.dg-color-picker-active').click(function(){
			$jd(this).parent().find('ul').show('slow');
		});
		
		/* rotate */
		$jd('.rotate-refresh').click(function(){
			self.item.refresh('rotate');
		});
		$jd('.rotate-value').on("focus change", function(){
			var e = self.item.get();
			var deg = $jd(this).val();
			if(deg > 360) deg = 360;
			if(deg < 0) deg = 0;
			var angle = ($jd(this).val() * Math.PI)/180;
			e.rotatable("setValue", angle);	
		});
		
		/* lock */
		$jd('.ui-lock').click(function(){
			var e = self.item.get();
			e.resizable('destroy')			
			if($jd(this).is(':checked') == true) self.item.resize(e, 'n, e, s, w, se');
			else self.item.resize(e, 'se');
		});
		
		if (jQuery('.labView.active .product-design').html() == '')
		{
			setTimeout(function(){
				var a_thumbs = jQuery('#product-thumbs a');
				if (typeof a_thumbs[0] != 'undefined')
					a_thumbs[0].click();
			}, 1000);
			
		}
		
		/* menu */
		$jd('.menu-left a').click(function(){
			$jd('.menu-left a').removeClass('active');
			if($jd(this).hasClass('add_item_text')) {
				console.log(444);
	jQuery('.dropdown-toolbar').hide();
	jQuery('dropdown-toolbar-textoptions').show();
	$jd('dropdown-toolbar-textoptions').show();
	
	jQuery('dropdown-toolbar-textoptions').css('display','block');
	$jd('dropdown-toolbar-textoptions').css('display','block');
	console.log(222);
				self.text.create();
			}
			if($jd(this).hasClass('add_item_team')) self.team.create();
			if($jd(this).hasClass('add_item_qrcode')) self.qrcode.open();
			$jd(this).addClass('active');
		});
		
		/* share */
		jQuery('.list-share span').click(function(){
			design.share.ini(jQuery(this).data('type'));
		});
		/* tools */
		$jd('a.dg-tool').click(function(){
			var f = $jd(this).data('type');
			switch(f){
				case 'preview':
					design.tools.preview(this);
					break;
				case 'undo':
					design.tools.undo(this);
					break;
				case 'redo':
					design.tools.redo(this);
					break;
				case 'zoom':
					design.tools.zoom();
					break;
				case 'reset':
					design.tools.reset(this);
					break;
			}
		});
			
		jQuery('#product-attributes .size-number').click(function(){
			design.team.changeSize();
		});
		design.products.sizes();
		
		$jd('.add_item_clipart').click(function(){
			if(jQuery('#dg-design-ideas').length == 0)
			{
				self.designer.art.categories(true, 0);
				if( jQuery('#dag-list-arts').html() == ''){
					self.designer.art.arts('');
				}
			}
		});
		
		$jd('.add_item_mydesign').click(function(){
			self.ajax.mydesign();
		});
		
		$jd('#dag-art-detail button').click(function(){
			jQuery('#dag-art-detail').hide('slow');
			jQuery('#dag-list-arts').show('slow');
			jQuery('#arts-add').hide();
			jQuery('#arts-pagination').css('display', 'block');
		});
		
		/* layers-toolbar control */
		jQuery('.layers-toolbar button').click(function(){
			var arrow = jQuery('.col-right .arrow-mobile');
			if (arrow.hasClass('active') == true)
			{
				arrow.trigger( "click" );
			}
				
			var elm = jQuery(this).parents('.div-layers').find('.control-layers');
			if (elm.hasClass('active') == true)
			{
				elm.removeClass('active');
				jQuery(elm).hide('show');
			}
			else
			{
				elm.addClass('active');
				jQuery(elm).show('show');
			}
		});
		
		jQuery( window ).resize(function() {
			var width = jQuery(window).width();
			if (width > 770)
			{
				jQuery('.control-layers.accordion').attr('style', '');
				jQuery('.col-right').attr('style', '');
			}
			else
			{
				if (jQuery('.arrow-mobile.active').length == 0)
					jQuery('.col-right').attr('style', 'bottom: 60px; top: auto;');
			}
		});
		
		/* mobile toolbar */
		jQuery('.dg-options-toolbar button').click(function(){
			var check = jQuery(this).hasClass('active');
			jQuery('.dg-options-toolbar button').removeClass('active');
			var elm = jQuery(this).parents('.dg-options');
			var type = jQuery(this).data('type');
			
			if (check == true)
			{
				elm.children('.dg-options-content').removeClass('active');
				jQuery('.toolbar-action-'+type).removeClass('active');
			}
			else
			{				
				jQuery(this).addClass('active');				
				elm.children('.dg-options-content').addClass('active');
				elm.children('.dg-options-content').children('div').removeClass('active');
				jQuery('.toolbar-action-'+type).addClass('active');
			}			
		});
		
		jQuery('#close-product-detail').click(function(){
			jQuery('#dg-products .products-detail').hide();
			jQuery('#dg-products .product-list').show();
			jQuery('#loading-change-product').hide();
			jQuery('#dg-products .product-detail.active').removeClass('active');
		});
		
		/* text update */
		$jd('.text-update').each(function(){
			var e = $jd(this);
			e.bind(e.data('event'), function(){
				if (e.data('value') != 'undefined')
					design.text.update(e.data('label'), e.data('value'));
				else
					design.text.update(e.data('label'));
			});
		});
		jQuery('#product-attributes .size-number').keyup(function(){
			design.products.sizes();
		});
		jQuery('#quantity').keyup(function(e){
			/*check console*/
				var currnt_vl = jQuery(this).attr('aria-valuenow');
				if (currnt_vl < min_order){
					alert_text(lang.designer.quantityMin +' '+min_order+'. '+lang.designer.quantity);
					scrollQuantity();
					return false;
				}
				/*check console*/
			design.ajax.getPrice();			
			e.preventDefault();	
			return false;	
		});
		jQuery('#team-edit-number').keyup(function(){
			design.team.updateBack(this, 'number');
			var o = jQuery('.labView.active .drag-item-number');
			if (typeof o[0] != 'undefined')
				design.item.select(o[0]);
		});
		jQuery('#team-edit-name').keyup(function(){
			design.team.updateBack(this, 'name');
			var o = jQuery('.labView.active .drag-item-name');
			if (typeof o[0] != 'undefined')
				design.item.select(o[0]);
		});
			
		design.item.designini(items);		
		design.designer.loadColors();
		design.designer.loadFonts();
		design.designer.fonts = {};
		design.products.colorPicker();
		design.designer.fontActive = {};
		jQuery('.view_change_products').bind('click', function(){design.products.productCate(0)});
		
		jQuery('.modal .close').click(function(){
			setTimeout(function(){
				jQuery('#dg-modal .modal').hide();
			}, 10);
		});
		
		var quantity_ini = jQuery('#quantity').data('count');
		if (quantity_ini < 0) quantity_ini = 0;
		var input_size = jQuery('.list-number input.size-number');
		if (input_size.length > 0)
		{
			jQuery(input_size[0]).val(quantity_ini);
			jQuery('#quantity').val(quantity_ini);
		}
		
		jQuery(document).triggerHandler( "ini.design");
		
		design.ajax.getPrice();
	},
	ajax:{
		form: function(){
			var datas = {};
			
			datas.product_id = product_id;
			
			/* get product color */
			var hex = design.exports.productColor();
			var span_color = jQuery('#product-list-colors span.active');
			var index = jQuery('#product-list-colors span').index(span_color);					
			datas.colors = {};
			datas.colors[index] = hex;

			if(span_color.hasClass('bg-more-colors'))
			{
				if(typeof datas.options == 'undefined')
					datas.options = {};
				datas.options.is_color_picker = 1;
			}	
			
			/* get Design color and size*/
			colors 			= {};
			colors.front 		= design.print.colors('front');			
			colors.back 		= design.print.colors('back');		
			colors.left 		= design.print.colors('left');			
			colors.right 		= design.print.colors('right');
			
			datas.print 		= {};			
			datas.print.sizes 	= JSON.stringify(design.print.size());
			datas.print.colors 	= JSON.stringify(colors);
		
			/* product attribute */
			var attributes = jQuery('#tool_cart').serializeObject();
			datas = jQuery.extend(datas, attributes);			
			
			datas.cliparts = design.exports.cliparts();
			
			jQuery(document).triggerHandler( "form.addtocart.design", datas);
			
			return datas;
		},
		getPrice: function(){
			var datas = this.form();
			
			var lable = jQuery('#product-price .product-price-title');
			var div = jQuery('#product-price .product-price-list');
			var title = '';
			if(typeof design.ajax_price_str == 'undefined')
			{
				design.ajax_price_str = '';
			}
			var data_string = JSON.stringify(datas);
			var str = encrypt_api.Base64.encode(data_string);
			if(str == design.ajax_price_str)
			{
				return;
			}
			design.ajax_price_str = str;

			lable.html('Updating...');
			jQuery.ajax({
				type: "POST",
				processData: false,
				dataType: "json",
				url: siteURL + "ajax.php?type=prices",
				data: JSON.stringify(datas),				
				contentType: "application/json; charset=utf-8",
			}).done(function( data ) {
				if (data != '')
				{
					if (typeof data.sale != 'undefined')
					{
						jQuery(document).triggerHandler( "price.addtocart.design", data);
						
						jQuery('.price-sale-number').html(data.sale);
						jQuery('.price-old-number').html(data.old);
						
						if (data.sale == data.old)
							jQuery('#product-price-old').css('display', 'none');
						else
							jQuery('#product-price-old').css('display', 'inline-block');
					}
				}
			}).always(function(){
				lable.html(title);				
				design.print.colors();
			});
		},
		isBlank: function(){
			var check = {};
			check.status = true;
			
			jQuery(document).triggerHandler( "checkItem.item.design", check );
			
			if (check.status == false && typeof check.callback != 'undefined')
			{
				return false;
			}
			
			var items = jQuery('#app-wrap .drag-item');
			if (items.length == 0)
			{
				var check = confirm_text(addon_lang_js_design_blank);
				if (check == false)
				{
					return false;
				}
			}
			return true;
		},
		addJs: function(e){
			if (this.isBlank() == false) return false;

			if (jQuery('.labView.active .design-area').hasClass('zoom'))
			{
				design.tools.zoom();
			}
			var quantity = jQuery('#quantity').val();
				quantity = parseInt(quantity);
			if (isNaN(quantity) == true || quantity < 1)
			{
				alert_text(lang.designer.quantity);
				scrollQuantity();
				return false;
			}
			if (quantity < min_order){
				alert_text(lang.designer.quantityMin +' '+min_order+'. '+lang.designer.quantity);
				scrollQuantity();
				return false;
			}
			if (quantity > max_order){
				alert_text(lang.designer.quantityMax +' '+max_order+'. '+lang.designer.checkquantity);
				scrollQuantity();
				return false;
			}
			design.mask(true);
			design.ajax.active = 'back';
			design.svg.items('front', design.ajax.save);
		},
		active: 'back',
		save: function(){
			if (design.ajax.active == 'back')
			{
				design.ajax.active = 'left';
				if (jQuery('#view-back .product-design').html() != '' && jQuery('#view-back .product-design').find('img').length > 0)
				{
					design.svg.items('back', design.ajax.save);
				}
				else
				{
					delete design.output.back;
					design.ajax.save();
				}
			}
			else if (design.ajax.active == 'left')
			{
				design.ajax.active = 'right';
				if (jQuery('#view-left .product-design').html() != '' && jQuery('#view-left .product-design').find('img').length > 0)
				{
					design.svg.items('left', design.ajax.save);
				}
				else
				{
					delete design.output.left;
					design.ajax.save();
				}	
			}
			else if (design.ajax.active == 'right')
			{
				if (jQuery('#view-right .product-design').html() != '' && jQuery('#view-right .product-design').find('img').length > 0)
				{
					design.svg.items('right', design.ajax.addToCart);
				}
				else
				{
					delete design.output.right;
					design.ajax.addToCart();
				}
			}
		},
		addToCart: function(){
			var options		= {};
			options.vectors	= JSON.stringify(design.exports.vector());
			
			options.images	= {};
			options.isIE    = design.isIE();
			if (jQuery('#view-front .product-design').html() != '')
			{
				if(design.isIE())
				{
					options.images.front = design.front.svgThum;
				}
				else
				{
					options.images.front = design.output.front.toDataURL();
				}
			}
			
			if (jQuery('#view-back .product-design').html() != '')
			{
				if(design.isIE())
				{
					options.images.back  = design.back.svgThum;
				}
				else
				{
					options.images.back  = design.output.back.toDataURL();
				}
			}
			
			if (jQuery('#view-left .product-design').html() != '')
			{
				if(design.isIE())
				{
					options.images.left  = design.left.svgThum;
				}
				else
				{
					options.images.left  = design.output.left.toDataURL();
				}
			}
			
			if (jQuery('#view-right .product-design').html() != '')
			{
				if(design.isIE())
				{
					options.images.right = design.right.svgThum;
				}
				else
				{
					options.images.right = design.output.right.toDataURL();
				}
			}
			
			var datas = design.ajax.form();
			datas.design = options;				
			datas.teams = design.teams;				
			datas.fonts = design.fonts;
			
			jQuery(document).triggerHandler( "before.addtocart.design", datas);
			
			jQuery.ajax({
				type: "POST",
				processData: false,
				data: JSON.stringify(datas),
				dataType: "json",
				contentType: "application/json; charset=utf-8",	
				url: siteURL + "ajax.php?type=addCart"					
			}).done(function( data ){
				
				jQuery(document).triggerHandler( "after.addtocart.design", data);
				
				var a = jQuery('#product-thumbs a');
				if(typeof a[0] != 'undefined')
				{
					a[0].click();
				}
				
				if (data != '')
				{
					var content = data;
					if (content.error == 0)
					{
						content.product.product_id = parent_id;
						window.parent.app.cart(content.product);
					}
					else
					{
						alert_text(content.msg);
					}
				}
			}).always(function(){				
				design.mask(false);
			});			
		},		
		mydesign: function(e){			
			if (user_id == 0)
			{
				is_save = 0;
				jQuery('#f-login').modal();
			}
			else
			{				
				jQuery('#dg-mydesign').modal();
				var div = jQuery('#dg-mydesign .list-design-saved');
				div.addClass('loading');
				
				var datas = {};
				jQuery(document).triggerHandler( "before.save.design", datas);
				
				if (typeof e != 'undefined')
				{
					var page = jQuery(e).data('page');
					var $btn = jQuery(e).button('loading');
				}
				else
				{
					var page = 0;
				}
				
				datas.page = page;
				jQuery.ajax({
					type: "POST",
					url: siteURL + "ajax.php?type=userDesign",
					data: {url: urlDesign, datas: datas},
					cache: false
				}).done(function( data ){
					
					jQuery(document).triggerHandler( "after.save.design", data);
					
					div.removeClass('loading');
					
					
					if (typeof $btn != 'undefined')
					{
						$btn.button('reset');
						div.append(data);
						jQuery('#dg-mydesign .loadingImage').remove();
						jQuery('.list-design-saved').attr('style', '');
					}
					else
					{
						div.html(data);
					}
					
					page = page + 1;
					if (jQuery('#dg-mydesign img').length > (page*9)-1)
					{
						jQuery('#dg-mydesign .modal-footer').css('display', 'block');
						jQuery('#dg-mydesign .modal-footer button').data('page', page);
					}
					else
					{
						jQuery('#dg-mydesign .modal-footer').css('display', 'none');
					}
						
					jQuery('#dg-mydesign .design-box a').each(function(){
						if (typeof jQuery(this).data('added') == 'undefined')
						{
							var href = jQuery(this).attr('href');
							if(href.indexOf('http') == -1)
								href = urlDesign + href;
							jQuery(this).attr('href', href);
							jQuery(this).bind('click', function(event){
								event.preventDefault();
								window.parent.location = href;
							});
							jQuery(this).data('added', 1);
						}
					});
				});
			}
		},
		removeDesign: function(e)
		{
			jQuery(document).triggerHandler( "before.remove.mydesign.design", e);
			
			jQuery(e).parents('.design-box').remove();
			var id = jQuery(e).data('id');
			jQuery.ajax({
				url: siteURL + "ajax.php?type=removeDesign&id="+id
			}).done(function( data ){
				jQuery(document).triggerHandler( "after.remove.mydesign.design", data);
			});
		}
	},
	tools:{
		elm: '',
		data: '',
		id: 0,
		item: '',		
		preview: function(e)
		{
			if (jQuery('.labView.active .design-area').hasClass('zoom'))
			{
				this.zoom();
			}
			jQuery('#dg-mask').css('display', 'block');
			var html 	= '<a class="left carousel-control" href="#carousel-slide" role="button" data-slide="prev">'
						+	'<span class="glyphicons chevron-left"></span>'
						+ '</a>'
						+ '<a class="right carousel-control" href="#carousel-slide" role="button" data-slide="next">'
						+	'<span class="glyphicons chevron-right"></span>'
						+ '</a>';
			html = '';
			if (document.getElementById('carousel-slide') == null)
			{
				var div = '<div id="carousel-slide" class="carousel slide" data-ride="carousel">'
						+ 	'<div class="carousel-inners"></div>';
						+ '</div>';
				jQuery('#dg-main-slider').append(div);
			}
			else
			{
				jQuery('#carousel-slide').html('<div class="carousel-inners"></div>');
			}
			if (jQuery('#view-front .product-design').html() != '')
			{
				if(design.isIE())
				{
					design.createSvgthumb('front');
				}
				else
				{
					design.svg.items('front');
				}
			}
			if (jQuery('#view-back .product-design').html() != '')
			{
				if(design.isIE())
				{
					design.createSvgthumb('back');
				}
				else
				{
					design.svg.items('back');
				}
			}
			if (jQuery('#view-left .product-design').html() != '')
			{
				if(design.isIE())
				{
					design.createSvgthumb('left');
				}
				else
				{
					design.svg.items('left');
				}
			}
			if (jQuery('#view-right .product-design').html() != '')
			{
				if(design.isIE())
				{
					design.createSvgthumb('right');
				}
				else
				{
					design.svg.items('right');
				}
			}
			setTimeout(function(){
				if (jQuery('#view-front .product-design').html() != ''){
					jQuery('#carousel-slide .carousel-inners').append('<div class="item active"><div id="slide-front" class="slide-fill"></div></div>');
					if(design.isIE())
					{
						jQuery('#slide-front').append(design.front.svgThum);
					}
					else
					{
						jQuery('#slide-front').append(design.output.front);
					}
				}
				
				if (jQuery('#view-back .product-design').html() != ''){
					jQuery('#carousel-slide .carousel-inners').append('<div class="item"><div id="slide-back" class="slide-fill"></div></div>');
					if(design.isIE())
					{
						jQuery('#slide-back').append(design.back.svgThum);
					}
					else
					{
						jQuery('#slide-back').append(design.output.back);
					}
				}
				
				if (jQuery('#view-left .product-design').html() != ''){
					jQuery('#carousel-slide .carousel-inners').append('<div class="item"><div id="slide-left" class="slide-fill"></div></div>');
					if(design.isIE())
					{
						jQuery('#slide-left').append(design.left.svgThum);
					}
					else
					{
						jQuery('#slide-left').append(design.output.left);
					}
				}
				
				if (jQuery('#view-right .product-design').html() != ''){
					jQuery('#carousel-slide .carousel-inners').append('<div class="item"><div id="slide-right" class="slide-fill"></div></div>');
					if(design.isIE())
					{
						jQuery('#slide-right').append(design.right.svgThum);
					}
					else
					{
						jQuery('#slide-right').append(design.output.right);
					}
				}
				jQuery('#dg-mask').css('display', 'none');
				jQuery('#carousel-slide').append(html);
				jQuery('#dg-preview').modal();
				var a = jQuery('#product-thumbs a');
				if(typeof a[0] != 'undefined')
				{
					a[0].click();
				}
			}, 1000);
		},
		undo: function(e)
		{			
		},
		redo: function(e)
		{
			var vector = design.exports.vector();
			var str = JSON.stringify(vector);
			design.imports.vector(str, 'front');
		},
		fit: function(){
			var e = design.item.get();
			if(typeof e == 'undefined') return;

			var width = e.width();
			var height = e.height();

			var area = jQuery('.labView.active .design-area');
			var area_w = area.width();
			var area_h = area.height();

			var new_h = (height * area_w)/width;
			var new_w = area_w;
			if(new_h > area_h)
			{
				var new_w = (width * area_h)/height;
				var new_h = area_h;
			}
			new_h = new_h;
			new_w = new_w;
			var left = (area_w - new_w)/2;
			var top = (area_h - new_h)/2;
			e.css({
				width: new_w+'px',
				height: new_h+'px',
				top: top+'px',
				left: '-1px',
			});
			var svg = e.find('svg');
			if(typeof svg[0] == 'undefined') return;
			svg[0].setAttributeNS(null, 'width', new_w);
			svg[0].setAttributeNS(null, 'height', new_h);
			var img = e.find('image');
			if(typeof img[0] != 'undefined')
			{
				img[0].setAttributeNS(null, 'width', new_w);
				img[0].setAttributeNS(null, 'height', new_h);
			}
			design.item.unselect();
			design.item.select(e[0]);
		},
		zoom: function()
		{
			design.item.unselect();
			var view = jQuery('.labView.active .design-area'),
				width = view.width(),
				height = view.height();
			var id 		= jQuery('.labView.active').attr('id');
			var postion = id.replace('view-', '');
			var area 	= eval ("(" + items['area'][postion] + ")");
			if (view.hasClass('zoom'))
			{
				var colorIndex = jQuery('#product-list-colors span').index(jQuery('#product-list-colors span.active'));				
				view.removeClass('zoom');
				view.css({"width": area.width, "height": area.height, "top":area.top, "left":area.left});
				
				var images 	= eval ("(" + items['design'][colorIndex][postion] + ")");
				jQuery.each(images, function(i, image){
					if (image.id != 'area-design')
					{
						jQuery('#'+postion+'-img-'+image.id).css({"width":image.width, "height":image.height, "left":image.left,"top":image.top});
					}
				});
				
				this.changeZoom(view, true);
			}
			else
			{
				view.addClass('zoom');
				if ( (max_box_width - width) > (max_box_height - height))
				{
					var spur = max_box_height%height, div = max_box_height/height, zoomIn = 1;
					/** if(spur > 0) { zoomIn = Math.round(div*10)/10; } else { zoomIn = div; } */
					zoomIn = div;
					var newHeight = max_box_height,
						newWidth = zoomIn * width,
						zoomIn;
				}
				else
				{
					var spur = max_box_width%width, div = max_box_width/width, zoomIn = 1;
					/** if(spur > 0) { zoomIn = Math.round(div*10)/10; } else { zoomIn = div; } */
					zoomIn = div;
					var newWidth = max_box_width,
						newHeight = zoomIn * height,
						zoomIn;
				}
				var left 	= Math.round((max_box_width - newWidth)/2);
				var top 	= Math.round((max_box_height - newHeight)/2);
				var zoomT 	= (design.convert.px(area.top)*zoomIn - top);
				var zoomL 	= (design.convert.px(area.left)*zoomIn - left);
				jQuery('.labView.active .product-design').find('img').each(function(){
					var imgW = design.convert.px(this.style.width)*zoomIn,
						imgH = design.convert.px(this.style.height)*zoomIn,
						imgT = design.convert.px(this.style.top)*zoomIn,
						imgL = design.convert.px(this.style.left)*zoomIn;
						
					jQuery(this).css({"width":imgW, "height":imgH, "top":imgT-zoomT, "left":imgL-zoomL});
				});
				view.css({"width": Math.round(newWidth), "height": Math.round(newHeight), "top":top, "left": left});
				
				view.data('width', area.width);
				view.data('height', area.height);
				view.data('zoom', zoomIn);
				view.data('zoomL', zoomL);
				view.data('zoomT', zoomT);
				this.changeZoom(view, false);
			}
		},
		changeZoom: function(view, type){
			design.item.unselect();
			var zoomIn 	= view.data('zoom'),
				zoomT 	= view.data('zoomT'),
				zoomL 	= view.data('zoomL');
			jQuery('.labView.active').find('.drag-item').each(function(){
				var css = {};
					css.top 	= design.convert.px(this.style.top);
					css.left 	= design.convert.px(this.style.left);
					css.width 	= design.convert.px(this.style.width);
					css.height 	= design.convert.px(this.style.height);
				
				var svg = jQuery(this).find('svg');
				var img = jQuery(svg).find('image');				
				var itemsCss	= {};
				if (type == false)
				{
					itemsCss.top 	= css.top * zoomIn - 0;
					itemsCss.left 	= css.left * zoomIn - 0;
					itemsCss.width 	= css.width * zoomIn;
					itemsCss.height = css.height * zoomIn;
					if (typeof img[0] != 'undefined')
					{
						var imgW 	= img[0].getAttributeNS(null, 'width') * zoomIn;
						var imgH 	= img[0].getAttributeNS(null, 'height') * zoomIn;
					}
				}
				else
				{
					itemsCss.top 	= (css.top + 0)/zoomIn;
					itemsCss.left 	= (css.left + 0)/zoomIn;
					itemsCss.width 	= css.width / zoomIn;
					itemsCss.height = css.height / zoomIn;
					if (typeof img[0] != 'undefined')
					{
						var imgW 	= img[0].getAttributeNS(null, 'width') / zoomIn;
						var imgH 	= img[0].getAttributeNS(null, 'height') / zoomIn;
					}
				}
				jQuery(this).css({"width": itemsCss.width, "height": itemsCss.height, "top":itemsCss.top, "left": itemsCss.left});
				svg[0].setAttributeNS(null, 'width', itemsCss.width);
				svg[0].setAttributeNS(null, 'height', itemsCss.height);				
				if (typeof img[0] != 'undefined')
				{
					img[0].setAttributeNS(null, 'width', imgW);
					img[0].setAttributeNS(null, 'height', imgH);
					var gEle = jQuery(svg[0]).find('g');
					flipFlg  = true;
					if(gEle.attr('transform') != undefined)
					{
						if(gEle.attr('transform').indexOf('scale(-1,1)') != -1) {
							flipFlg = false;
						}
					}
					var viewBox = svg[0].getAttributeNS(null, 'viewBox');
					if (viewBox != null && viewBox != '' )
					{
						var size = viewBox.split(' ');
						var width = size[2];
					}
					else
					{
						var width = imgW;
					}
					if(flipFlg == false)
					{
						transform = 'translate('+width+', 0) scale(-1,1)';
					}
					else
					{
						transform = 'translate(0, 0) scale(1,1)';
					}
					if(gEle.attr('transform') != undefined)
					{
						gEle[0].setAttributeNS(null, 'transform', transform);
					}
				}
				jQuery(document).triggerHandler( "zoomClip.clipart.design", [svg, type, zoomIn]);
			});
		},
		reset: function(e)
		{
			var remove = confirm_text(lang.designer.reset);
			if (remove == true)
			{
				jQuery('.labView.active .drag-item').each(function(){
					var id = jQuery(this).attr('id');
					var index = id.replace('item-', '');
					design.layers.remove(index);
				});
			}
		},
		flip: function(n){
			var markArea = jQuery('.labView.active .mask-items-view .mask-items-area');
			if(markArea.find('.mask-all-item').length > 0)
			{
				design.flipAll(n);
				return false;
			}
			var e = design.item.get(),
				svg = e.find('svg'),
				transform = '';
				if(typeof svg[0] == 'undefined')
					return false;	
			var viewBox = svg[0].getAttributeNS(null, 'viewBox');
			if (viewBox != null && viewBox != '' )
			{
				var size = viewBox.split(' ');
				var width = 2*size[0] + parseFloat(size[2]);
			}
			else
			{
				var width = svg[0].getAttributeNS(null, 'width');
				if (typeof width != 'undefined' && width != null)
				{
					width = width.replace('px', '');
				}				
			}
			
			if(typeof e.data('flipX') == 'undefined') e.data('flipX', true);
			if(e.data('flipX') === true){
				transform = 'translate('+width+', 0) scale(-1,1)';
				e.data('flipX', false);
			}
			else{
				transform = 'translate(0, 0) scale(1,1)';
				e.data('flipX', true);
			}					
			var g = jQuery(svg[0]).find('g');
			if (g.length > 0)
				g[0].setAttributeNS(null, 'transform', transform);

			if (jQuery('#dg-fonts .list-fonts a.box-font.active').length) {
				var el_font_cur = jQuery('#dg-fonts .list-fonts a.box-font.active');
				design.designer.changeFont(el_font_cur);
			}
		},
		remove: function(){
			var markArea = jQuery('.labView.active .mask-items-view .mask-items-area');
			if(markArea.find('.mask-all-item').length > 0)
			{
				var eleLst = jQuery('.labView.active .drag-item');
				eleLst.each(function() {
					var e = jQuery(this).find('.item-remove-on');
					design.item.remove(e[0]);
				});
				jQuery('.mask-all-item').remove();
				closeChangeColorAll();
				return false;
			}
			var e = design.item.get();
			if (e.length == 0) return;
			var elm = e.children('.item-remove-on');
			design.item.remove(elm[0]);
		},
		copy: function(){
			var e = design.item.get();
			if (e.length == 0) return;
			
			this.item = e[0].item;
			this.id = e[0].id;
			this.data = e.data;			
			this.elm = jQuery('<div>').append(e.clone()).html();		
		},
		paste: function(){
			if (this.elm == '') return;
			
			var n = -1;
			jQuery('#app-wrap .drag-item').each(function(){
				var index 	= jQuery(this).attr('id').replace('item-', '');
				if (index > n) n = parseInt(index);
			});			
			var id = n + 1;
			
			var elm = this.elm;
			elm = elm.replace('id="'+this.id+'"', 'id="item-'+id+'"');
			
			design.item.unselect();
			
			jQuery('.labView.active .content-inner').append(elm);
			var e = jQuery('#item-'+id);	
			e.data('id', id);			
			e[0].item = this.item;
			e[0].item.id = item;
			
			var e = jQuery('#item-'+id);
			design.item.move(e);
			design.item.resize(e);				
			design.item.rotate(e);
			e.bind('click', function(e){design.item.select(this); e.stopPropagation();});
			design.layers.add(e[0].item);
			design.item.setup(e[0].item);			
			design.print.colors();			
			design.print.size();
			design.ajax.getPrice();		
		},
		move: function(type){
			var markArea = jQuery('.labView.active .mask-items-view .mask-items-area');
			if(markArea.find('.mask-all-item').length > 0)
			{
				design.moveAll(type);
				return false;
			}
			var e = design.item.get();
			if (e.length == 0) return;
			
			if (type == 'left')
			{
				var left = e.css('left');
				left = left.replace('px', '');
				left = left - 1;
				e.css('left', left + 'px');
			}
			else if (type == 'right')
			{
				var left = e.css('left');
				left = left.replace('px', '');
				left = parseInt(left) + 1;
				e.css('left', left + 'px');
			}
			else if (type == 'up')
			{
				var top = e.css('top');
				top = top.replace('px', '');
				top = parseInt(top) - 1;
				e.css('top', top + 'px');
			}
			else if (type == 'down')
			{
				var top = e.css('top');
				top = top.replace('px', '');
				top = parseInt(top) + 1;
				e.css('top', top + 'px');
			}
			else if (type == 'vertical')
			{
				var $width = e.width(),
				pw 		= e.parent().parent().width();
				var left = (pw - $width)/2;
				e.css('left', left+'px');
			}
			else if (type == 'horizontal')
			{
				var $height = e.height(),
				pw 		= e.parent().parent().height();
				var top = (pw - $height)/2;
				e.css('top', top+'px');
			}
			
			jQuery(document).triggerHandler( "move.tool.design", e);
		}
	},
	print:{
		colors:function(view){
			if (jQuery('#view-'+view+ ' .product-design').html() == '')
			{
				return '';
			}
			
			if (typeof view != 'undefined')
				view = ' #view-'+view;
			else
				view = '';
			design.colors = [];
			jQuery('#app-wrap'+view).find('svg').each(function(){
				var o = document.getElementById(jQuery(this).parent().attr('id'));
				if(o.item.confirmColor == true && typeof o.item.colors != 'undefined')
				{
					var colors = o.item.colors;
					jQuery.each(colors, function(i, hex){
						hex = hex.toString();
						hex = hex.replace('#', '');
						if (jQuery.inArray(hex, design.colors) == -1 && hex != 'none')
						{
							design.colors.push(hex);
						}
					});					
				}
				else
				{
					var c = design.svg.getColors(jQuery(this));
					var colors = [];
					for(var color in c) {
						colors.push(color);
					}
					jQuery.each(colors, function(i, hex){
						hex = hex.toString();
						hex = hex.replace('#', '');
						if (jQuery.inArray(hex, design.colors) == -1 && hex != 'none')
						{
							design.colors.push(hex);
						}
					});
				}
			});
			jQuery('.color-used').html('<div id="colors-used" class="list-colors"></div>');
			var div = jQuery('#colors-used');
			jQuery.each(design.colors, function(i, hex){
				div.append('<span style="background-color:#'+hex+'" class="bg-colors"></span>');
			});
			return design.colors;			
		},
		size:function(){
			var sizes = {};
			var postions = ['front', 'back', 'left', 'right'];
			jQuery('.screen-size').html('<div id="sizes-used"></div>');
			
			jQuery.each(postions, function(i, postion){
				if (jQuery('#view-'+postion+ ' .content-inner').html() != '' && jQuery('#view-'+postion+ ' .product-design').html() != '')
				{
					var top = max_box_height, left = max_box_width, right = max_box_width, bottom = max_box_height, area = {}, print = {};
					var div = jQuery('#view-'+postion+ ' .design-area');
					area.width = design.convert.px(div.css('width'));
					area.height = design.convert.px(div.css('height'));
					if(div.hasClass('zoom'))
					{
						area.width = div.data('width');
						area.height = div.data('height');
						var zoom = div.data('zoom');
					}
					else
					{
						var zoom = 1;
					}
										
					jQuery('#view-'+postion+ ' .drag-item').each(function(){
						var o = {}, e = jQuery(this);
						
						o.left = design.convert.px(e.css('left'))/zoom;
						o.top = design.convert.px(e.css('top'))/zoom;
						o.width = design.convert.px(e.css('width'));
						o.width = o.width/zoom;
						o.height = design.convert.px(e.css('height'));
						o.height = o.height/zoom;
						o.right = area.width - o.left - o.width;
						o.bottom = area.height - o.top - o.height;						
						if (o.left < 0) o.left = 0;
						if (o.top < 0) o.top = 0;
						if (o.right < 0) o.right = 0;
						if (o.bottom < 0) o.bottom = 0;						
						
						if (o.top < top) top = o.top;
						if (o.left < left) left = o.left;
						if (o.right < right) right = o.right;
						if (o.bottom < bottom) bottom = o.bottom;
					});
					print.width 	= area.width - left - right;
					print.height 	= area.height - top - bottom;
					
					if (print.width > 0 && print.height > 0)
					{
						if(print.width >= area.width) print.width = area.width;
						if(print.height >= area.height) print.height = area.height;
						var item = eval ("(" + items.params[postion] + ")");
						sizes[postion] = {};
						sizes[postion].width = (print.width * item.width)/area.width;
						sizes[postion].height = (print.height * item.height)/area.height;
						sizes[postion].size = design.print.perpage(sizes[postion].width, sizes[postion].height);
						jQuery('#sizes-used').append('<div class="text-center"><strong>'+lang.text[postion]+'</strong><br /><span class="paper glyphicons file"><strong>A'+sizes[postion].size+'</strong></span></div>');
					}
					
				}
			});			
			return sizes;
		},
		perpage: function(width, height){
            var pagesW = [], pagesH = [];
            pagesW[0] = 10.5, pagesW[1] = 14.8, pagesW[2] = 21, pagesW[3] = 29.7, pagesW[4] = 42, 
            pagesW[5] = 59.4, pagesW[6] = 84.1;
            pagesH[0] = 14.8, pagesH[1] = 21, pagesH[2] = 29.7, pagesH[3] = 42, pagesH[4] = 59.4, 
            pagesH[5] = 84.1, pagesH[6] = 118.9;
			width = width.toFixed(1);
			height = height.toFixed(1);
            if (width < pagesW[0] && height < pagesH[0]) return 6;
            var size = 6;
            for (i = 1; i <= 6; i++) {
                if ((width <= pagesW[i] && height <= pagesH[i]) || (width <= pagesH[i] && height <= pagesW[i])) {
                    return 6 - i;
                }
            }
            return 0;
        },
		addColor: function(e){
			if (jQuery(e).hasClass('active'))
			{
				jQuery(e).removeClass('active');
			}
			else
			{
				jQuery(e).addClass('active');
			}
		}
	},
	designer:{
		art:{
			designs: {},
			categories: function(load, index){
				if (jQuery('#dag-art-categories').length == 0) return false;
				if (typeof index == 'undefined') index = 0;
				self = this;
				
				var ajax = true;
				if (typeof load != 'undefined' && load == true)
				{
					jQuery('#dag-art-categories').children('ul').each(function(){
						if (index == jQuery(this).data('type'))
						{
							ajax = false;
						}
					});
				}
				else
				{
					ajax = false;
				}
				
				if (ajax == true)
				{					
					jQuery('#dag-art-categories').addClass('loading');
					jQuery.ajax({				
						dataType: "json",
						url: siteURL + "ajax.php?type=cateArts"
					}).done(function( data ) {
						if (data != '')
						{								
							var e = document.getElementById('dag-art-categories');
							self.treeCategories(data, e, index);		
							design.artCategories = data;
						}
					}).always(function(){
						jQuery('#dag-art-categories').removeClass('loading');
					});					
				}
			},
			loadarts: function(cate_id, start, keyword){
				var arts = this.designs;
				var parent = document.getElementById('dag-list-arts');
				var count = arts.length;
				if (arts.length > 0)
				{
					jQuery('#dg-cliparts .modal-body').css('opacity', '0.5');
					var limit = start + 18;
					var i = 0;
					while (start - i < limit)
					{
						if (typeof arts[start] == 'undefined')
						{
							jQuery('#arts-pagination').css('display', 'none');
							count = 0;
							break;
						}
						var art = arts[start];
						start = start + 1;
						
						if (cate_id > 0)
						{
							if (typeof art.cate_id == 'undefined') art.cate_id = 0;
							if (cate_id != art.cate_id)
							{
								i = i + 1;
								continue;
							}
						}
						
						var title = art.title.toLowerCase();
						if (title.indexOf(keyword) == -1)
						{
							i = i + 1;
							continue;
						}
						
						var url = art.url;
						var div = document.createElement('div');
							div.className = 'box-art';
						var a = document.createElement('a');
							a.setAttribute('title', art.title);
							a.setAttribute('href', 'javascript:void(0)');
							a.setAttribute('onclick', 'design.art.create(this)');
							jQuery(a).data('title', art.title);
							jQuery(a).data('description', art.description);
							jQuery(a).data('price', art.price);
							jQuery(a).data('id', art.clipart_id);
							jQuery(a).data('clipart_id', art.clipart_id);
							jQuery(a).data('medium', url + art.medium);
							art.imgThumb = url + art.thumb;
							art.imgMedium = url + art.medium;
							a.item = art;
						var img = '<img alt="" src="'+url + art.thumb+'">';
						a.innerHTML = img;
						div.appendChild(a);
						if(art.price != 0)
						{
							var span = document.createElement('span');
								span.className = 'art-price';
								span.innerHTML = currency_symbol+art.price;
							div.appendChild(span);
						}
						parent.appendChild(div);
					}
					if (count > 1)
					{
						jQuery('#arts-pagination').css('display', 'block');
						var ul = jQuery('#arts-pagination .pagination');
						var button = document.createElement('button');
							button.className = 'btn btn-primary btn-sm';
							button.setAttribute('type', 'button');
							button.innerHTML = lang.text.show_design;
						ul.html(button);
						
						jQuery(button).click(function(){
							jQuery('#dg-cliparts .modal-body').css('opacity', '0.5');
							var limit = start + 18;
							var i = 0;
							while (start - i < limit)
							{
								if (typeof arts[start] == 'undefined')
								{
									jQuery('#arts-pagination').css('display', 'none');
									break;
								}
								
								var art = arts[start];
								start = start + 1;
								
								if (cate_id > 0)
								{								
									if (typeof art.cate_id == 'undefined') art.cate_id = 0;
									if (cate_id != art.cate_id)
									{
										i = i + 1;
										continue;
									}
								}
								
								var title = art.title.toLowerCase();
								if (title.indexOf(keyword) == -1)
								{
									i = i + 1;
									continue;
								}
								
								var url = art.url;
								var div = document.createElement('div');
									div.className = 'box-art';
								var a = document.createElement('a');
									a.setAttribute('title', art.title);
									
									a.setAttribute('href', 'javascript:void(0)');
									a.setAttribute('onclick', 'design.art.create(this)');
									
									jQuery(a).data('title', art.title);
									jQuery(a).data('description', art.description);
									jQuery(a).data('price', art.price);
									jQuery(a).data('id', art.clipart_id);
									jQuery(a).data('clipart_id', art.clipart_id);
									jQuery(a).data('medium', url + art.medium);
									
									art.imgThumb = url + art.thumb;
									art.imgMedium = url + art.medium;
									
									a.item = art;
								var img = '<img alt="" src="'+url + art.thumb+'">';
								a.innerHTML = img;
								div.appendChild(a);
								if(art.price != 0)
								{
									var span = document.createElement('span');
										span.className = 'art-price';
										span.innerHTML = currency_symbol+art.price;
									div.appendChild(span);
								}
								parent.appendChild(div);
							}
							gridArt('#dag-list-arts');
						});
					}
				}
			},
			arts: function(cate_id, start)
			{				
				if (jQuery('#dag-list-arts').length == 0) return false;
				if (typeof start == 'undefined') start = 0;								
				if (typeof cate_id == 'undefined') cate_id = 0;								
				
				var self = this;
				var parent = document.getElementById('dag-list-arts');				
				parent.innerHTML = '';
				jQuery('#dag-art-detail').hide('slow');
				jQuery('#dag-list-arts').show('slow');
				jQuery('#arts-add').hide();
				if(cate_id == 0)
				{
					jQuery('#dag-art-categories li.show-subfolder').removeClass('show-subfolder');
					jQuery('#dag-art-categories li.show-subfolder').removeClass('active');
					jQuery('#dag-art-categories a.active').removeClass('active');
				}
				
				var keyword = jQuery('#art-keyword').val();
				keyword = keyword.toLowerCase();
				if(self.designs.length > 0)
				{
					self.loadarts(cate_id, start, keyword);
					return;
				}
				jQuery('#dag-list-arts').addClass('loading');
				jQuery.ajax({		
					dataType: "json",					
					url: siteURL + "ajax.php?type=arts"
				}).done(function( data ) {
					if (data == null || data.count == 0)
					{
						jQuery('#dag-list-arts').removeClass('loading');
						parent.innerHTML = lang.designer.datafound;
						var ul = jQuery('#arts-pagination .pagination').html('');						
						return false;
					}
					self.designs = data.arts;
					self.loadarts(cate_id, start, keyword);
					jQuery('#dag-list-arts').removeClass('loading');
				});
			},
			artDetail: function(e)
			{
				var id = jQuery(e).data('id');
				jQuery('.box-art-detail').css('display', 'none');
				jQuery('#arts-pagination').css('display', 'none');
				if (document.getElementById('art-detail-'+id) == null)
				{
					var div = document.createElement('div');
						div.className = 'box-art-detail';
						div.setAttribute('id', 'art-detail-'+id);
					var html = 	'<div class="col-xs-5 col-md-5 art-detail-left">'
							+ 		'<img class="thumbnail img-responsive" src="'+jQuery(e).data('medium')+'" alt="">'
							+ 	'</div>'
							+ 	'<div class="col-xs-7 col-md-7 art-detail-right">'							
							+ 	'</div>';
					div.innerHTML = html;
					jQuery('#dag-art-detail').append(div);					
					jQuery('.art-detail-price').html('');
										
					var info = jQuery('#art-detail-'+id+' .art-detail-right');
					info.html('');					
					info.append('<h4>'+jQuery(e).data('title')+'</h4>');
					info.append('<p>'+jQuery(e).data('description')+'</p>');
					e.item.title = jQuery(e).data('title');							
				}
				else
				{
					jQuery('#art-detail-'+id).css('display', 'block');
				}				
				if(typeof currency_postion != 'undefined' && currency_postion == 'right')
				{
					jQuery('.art-detail-price').html(lang.text.fromt+' '+ jQuery(e).data('price') + currency_symbol);
				}else
				{
					jQuery('.art-detail-price').html(lang.text.fromt+' '+ currency_symbol + jQuery(e).data('price'));
				}
				jQuery(document).triggerHandler( "price.clipart.design", [lang.text.fromt, currency_symbol, jQuery(e).data('price')]);
				
				jQuery('#dag-list-arts').hide('slow');
				jQuery('#dag-art-detail').show('slow');
				jQuery('#arts-add').show();
				jQuery('#arts-add button').unbind('click');
				jQuery('#arts-add button').bind('click', function(event){design.art.create(e);});
				jQuery('#arts-add button').button('reset');
			},
			treeCategories: function(categories, e, system)
			{
				self = this;
				if (categories.length == 0) return false;
				var ul = document.createElement('ul');
				jQuery(ul).data('type', system);
				jQuery.each(categories, function(i, cate){
					var li = document.createElement('li'),
						a = document.createElement('a');						
						if (jQuery.isEmptyObject(cate.children) == false)
						{
							var span = document.createElement('span');
								span.innerHTML = '<i class="glyphicons plus"></i>';
							jQuery(span).click(function(){
								var parent = this;
								jQuery(this).parent().children('ul').toggle('slow', function(){
									var display = jQuery(parent).parent().children('ul').css('display');
									if (display == 'none')
										jQuery(parent).children('i').attr('class', 'glyphicons plus');
									else
										jQuery(parent).children('i').attr('class', 'glyphicons minus');
								});
							});
							li.appendChild(span);
						}			
						a.setAttribute('href', 'javascript:void(0)');
						a.setAttribute('title', cate.title);
						jQuery(a).data('id', cate.id);
						jQuery(a).click(function(){
							jQuery('#dag-art-categories a').removeClass('active');
							jQuery(a).addClass('active');
							jQuery('#art-number-page').val(0);
							jQuery('#arts-pagination .pagination').html('');
							self.arts(cate.id);
							if(jQuery(this).parent().find('ul').length)
							{
								jQuery(this).parents('ul').children('li').addClass('show-subfolder');
								jQuery(this).parent().addClass('active');
							}
						});
						a.innerHTML = cate.title;
						li.appendChild(a);
					ul.appendChild(li);					
					if (jQuery.isEmptyObject(cate.children) == false)
						design.designer.art.treeCategories(cate.children, li);
				});
				e.appendChild(ul);
			}
		},
		fonts: {},
		fontActive: {},
		loadColors: function(){
			var self = this;
			jQuery.ajax({				
				dataType: "json",
				url: siteURL + "ajax.php?type=colors"
			}).done(function( data ) {
				if (data.status == 1)
				{					
					self.addColor(data.colors);					
				}
			}).always(function(){			
			});
		},
		addColor: function(colors)
		{
			var screen_colors	= jQuery('#screen_colors_list');
			var div = jQuery('.other-colors');
			jQuery(div).html('<span class="bg-colors bg-none" data-color="none" title="Normal" onclick="design.item.changeColor(this)"></span>');			
			jQuery.each(colors, function(i, color){
				var span = document.createElement('span');
					span.className = 'bg-colors';
					span.setAttribute('data-color', color.hex);
					span.setAttribute('title', color.title);							
					span.setAttribute('onclick', 'design.item.changeColor(this)');							
					span.style.backgroundColor = '#'+color.hex;						
				jQuery(div).append(span);				
				
				screen_colors.append('<span class="bg-colors" onclick="design.print.addColor(this)" style="background-color:#'+color.hex+'" data-color="'+color.hex+'" title="'+color.title+'"></span>');
			});	
		},
		loadFonts: function(){
			var self = this;
			var data = {};
			jQuery(document).triggerHandler( "beforeloadfonts", data);
			jQuery.ajax({				
				dataType: "json",
				type: "POST",
				data: data,
				url: siteURL + "ajax.php?type=fonts"
			}).done(function( data ) {
				if (data.status == 1)
				{
					if (typeof data.fonts.google_fonts != 'undefined')
					{
						var str = data.fonts.google_fonts;
						var fonts = str.split('|');
						var count = 10, list_font = '', j=1, n = fonts.length;
						for(k=0; k<n; k++)
						{
							if (fonts[k] != '')
							{
								if (list_font == '')
									list_font = fonts[k];
								else
									list_font = list_font +'|'+fonts[k];
							}
							var max = count * j;
							if (k == max || n == k+1)
 							{
								list_font = list_font.replace(/\|\|/g, '|');
								jQuery('head').append("<link href='https://fonts.googleapis.com/css?family="+list_font+"' rel='stylesheet' type='text/css'>");
								list_font = '';
								j++;
							}
						}
						
					}
					self.fonts = data.fonts;
					self.addFonts(data.fonts);
					var div = jQuery('.list-fonts');
					jQuery(div).html('');
					jQuery.each(data.fonts.fonts, function(i, font){
						var a = document.createElement('a');
							a.className = 'box-font';							
							a.setAttribute('href', 'javascript:void(0)');
							jQuery(a).data('id', font.id);
							jQuery(a).data('title', font.title);
							jQuery(a).data('type', font.type);
							if (font.type == '')
							{
								font.url = baseURL + font.path.replace('\\', '/') + '/';
								jQuery(a).data('url', font.url);
								jQuery(a).data('filename', font.filename);
								var html = '<img src="' + font.url + font.thumb + '" alt="'+font.title+'">'+font.title;
							}
							else
							{
								var html = '<h2 class="margin-0" style="font-family:\''+font.title+'\'">abc zyz</h2>'+font.title;
							}
							jQuery(a).bind('click', function(){self.changeFont(this)});
						a.innerHTML = html;
						jQuery(div).append(a);
					});
				}
			}).always(function(){			
			});
		},
		addFonts: function(data)
		{
			var self = this;
			var ul = jQuery('.font-categories');
			ul.html('');
			var li = document.createElement('li');				
			jQuery(li).bind('click', function(){self.cateFont(this)});
			jQuery(li).data('id', 0);
			var html = '<a href="javascript:void(0);" title="'+lang.text.all_fonts+'">'+lang.text.all_fonts+'</a>';
			li.innerHTML = html;
			jQuery(ul).append(li);
			jQuery.each(data.categories, function(i, cate){
				var li = document.createElement('li');				
				jQuery(li).bind('click', function(event){ event.preventDefault(); self.cateFont(this)});
				jQuery(li).data('id', cate.id);
				var html = '<a href="javascript:void(0);" title="'+cate.title+'">'+cate.title+'</a>';
				li.innerHTML = html;
				jQuery(ul).append(li);
			});			
		},
		cateFont: function(e)
		{
			var self = this;
			var id = jQuery(e).data('id');
			if (typeof id != 'undefined')
			{				
				var div = jQuery('.list-fonts');
				jQuery(div).html('');
				if (typeof this.fonts.cateFonts != 'undefined' && typeof this.fonts.cateFonts[id] != 'undefined')
				{
					var fonts = this.fonts.cateFonts[id]['fonts'];
				}
				else
				{
					var fonts = this.fonts.fonts;
				}
				jQuery.each(fonts, function(i, font){
					if(font.published == 0)
						return;
					var a = document.createElement('a');
						a.className = 'box-font';							
						a.setAttribute('href', 'javascript:void(0)');
						jQuery(a).data('id', font.id);
						jQuery(a).data('title', font.title);
						jQuery(a).data('type', font.type);
						if (font.type == '')
						{
							font.url = baseURL + font.path.replace('\\', '/') + '/';
							jQuery(a).data('url', font.url);
							jQuery(a).data('filename', font.filename);
							var html = '<img src="' + font.url + font.thumb + '" alt="'+font.title+'">'+font.title;
						}
						else
						{
							var html = '<h2 class="margin-0" style="font-family:\''+font.title+'\'">abc zyz</h2>'+font.title;
						}
						jQuery(a).bind('click', function(){self.changeFont(this)});
					a.innerHTML = html;
					jQuery(div).append(a);
				});				
			}
		},
		changeFont: function(e)
		{
			var selected = design.item.get();
			if (selected.length == 0)
			{
				jQuery('#dg-fonts').modal('hide');
				return false;
			}
			
			jQuery('.list-fonts a').removeClass('active');
			jQuery(e).addClass('active');
			var id = jQuery(e).data('id');
			jQuery('.labView.active .content-inner').addClass('loading');
			if (typeof id != 'undefined')
			{
				var title = jQuery(e).data('title');
				jQuery('#txt-fontfamily').html(title);				
				if (typeof design.designer.fontActive[id] == 'undefined' && jQuery(e).data('type') == 'google')
				{					
					design.text.update('fontfamily', title);
					jQuery('.labView.active .content-inner').removeClass('loading');
					setTimeout(function(){
						var e = design.item.get();
						
						var rotate = e.data('rotate');
						if (rotate == 'undefined') rotate = 0;
						rotate = rotate * Math.PI / 180;
						e.css('transform', 'rotate(0rad)');
										
						var txt = e.find('text');
						txt[0].setAttributeNS(null, 'y', 0);
						var size1 = txt[0].getBoundingClientRect();
						var size2 = e[0].getBoundingClientRect();
						
						var $w 	= parseInt(size1.width);							
						var $h 	= parseInt(size1.height);							
						
						design.item.updateSize($w, $h);	
						
						var svg = e.find('svg'),
						view = svg[0].getAttributeNS(null, 'viewBox');
						var arr = view.split(' ');						
						//var y = txt[0].getAttributeNS(null, 'y');						
						//y = Math.round(y) + Math.round(size2.top) - Math.round(size1.top) - ( (Math.round(size2.top) - Math.round(size1.top)) * (($w - arr[2])/$w) );						
						//if (y < 0) y = '';
						var y = (size2.top - size1.top) * arr[3] / $h;
						txt[0].setAttributeNS(null, 'y', y);
						
						e.css('transform', 'rotate('+rotate+'rad)');
						
						jQuery(document).triggerHandler( "beforechangefont.item.design", [$w, $h]);
					}, 200);
					
					design.text.baseencode(title, 'google');
				}
				else
				{
					var filename = jQuery(e).data('filename');
					var url = jQuery(e).data('url');					
					if (filename != '')
					{
						var item = eval ("(" + filename + ")");													
						design.designer.fontActive[id] = title;
						var css = "<style type='text/css'>@font-face{font-family:'"+title+"';font-style: normal; font-weight: 400;src: local('"+title+"'), local('"+title+"'), url("+url+item.woff+") format('woff');}</style>";						
						design.fonts = design.fonts + ' '+css;
						jQuery('head').append(css);
						
						var e = design.item.get();
						var svg = e.find('svg');							
						design.text.update('fontfamily', title);
						jQuery('.labView.active .content-inner').removeClass('loading');
						setTimeout(function(){
							var rotate = e.data('rotate');
							if (rotate == 'undefined') rotate = 0;
							rotate = rotate * Math.PI / 180;
							e.css('transform', 'rotate(0rad)');							
							
							var txt = e.find('text');
							txt[0].setAttributeNS(null, 'y', 0);
							var size1 = txt[0].getBoundingClientRect();
							var size2 = e[0].getBoundingClientRect();
							var $w 	= parseInt(size1.width);							
							var $h 	= parseInt(size1.height);							
							
							design.item.updateSize($w, $h);

							var svg = e.find('svg'),
							view = svg[0].getAttributeNS(null, 'viewBox');
							var arr = view.split(' ');						
							//var y = txt[0].getAttributeNS(null, 'y');						
							//y = Math.round(y) + Math.round(size2.top) - Math.round(size1.top) - ( (Math.round(size2.top) - Math.round(size1.top)) * (($w - arr[2])/$w) );						
							var y = (size2.top - size1.top) * arr[3] / $h;
							txt[0].setAttributeNS(null, 'y', y);
							
							e.css('transform', 'rotate('+rotate+'rad)');
							
							jQuery(document).triggerHandler( "beforechangefont.item.design", [$w, $h]);
						}, 200);
						
						design.text.baseencode(title, url+item.ttf);
					}
				}
			}
			jQuery('#dg-fonts').modal('hide');
		}
	},
	products:{
		categories: {},
		products: {},
		product: {},
		sizes: function(){
			var sizes = 0;
			var check = false;
			jQuery('#product-attributes .size-number').each(function(){
				var value = jQuery(this).val();
				if (value == '') 
				{
					jQuery(this).val('');
					value = 0;
				}
				if (isNaN(value) == true || value < 0){
					jQuery(this).val('');
					value = 0;
				}
				sizes = parseInt(sizes) + parseInt(value);
				check = true;
			});
			
			jQuery(document).triggerHandler( "sizes.product.design", sizes);
			if (sizes < 0) sizes = 0;
			if(min_order != undefined && min_order != '' && check == false)
			{
				if (sizes == 0) sizes = parseInt(min_order);
			}
			if(check)
			{
				jQuery('#quantity').val(sizes);
			}
			else
			{
				if(min_order != undefined && min_order != '')
				{
					jQuery('#quantity').val(parseInt(min_order));
				}
				else
				{
					jQuery('#quantity').val(0);
				}
			}
			design.ajax.getPrice();
		},
		discount: function(product){
			var div = jQuery('.product-discount');
			if(typeof product.prices == 'undefined')
			{
				div.hide();
				return;
			}

			if(typeof product.prices.price == 'undefined')
			{
				div.hide();
				return;
			}
			var tbody = div.find('tbody');
			tbody.html('');
			for(var i=0; i<product.prices.price.length; i++)
			{
				var discount_val = ((product.price - product.prices.price[i])/product.price)*100;
				tbody.append('<tr>'
					+ '<td>'+product.prices.min_quantity[i]+'</td>'
					+ '<td>'+product.prices.max_quantity[i]+'</td>'
					+ '<td>'+product.prices.price[i]+' ('+discount_val.toFixed(2)+')</td>'
					+ '</tr>');
			}
			div.show();
		},
		colorPicker: function(){
			var color = design.exports.productColor();
			jQuery('#e-change-product-color .bg-more-colors').spectrum({
				color: "#"+color,
				showInput: true,
				showInitial: true,
				showButtons: true,
				preferredFormat: 'hex',
				change: function(color) {
					var hexcolor = color.toHexString();
					hexcolor = hexcolor.replace('#', '');
					jQuery('#e-change-product-color .bg-colors').removeClass('active');
					jQuery(this).addClass('active');
					jQuery(this).data('color', hexcolor);
					var index = jQuery(this).data('index');
					if(typeof index == 'undefined')
						index = 0;
					design.products.changeColor(this, index);
					jQuery('.product-design .main-product-img').css('background-color', '#'+hexcolor);
					jQuery('.product-color-active-value').html('<a href="javascript:void(0);" style="background-color:#'+hexcolor+'; width: 23px;"></a>');
				}
			});
		},
		changeView: function(e, postion){
			design.item.unselect();
			design.changeViewEventFlg = true;
			jQuery('#product-thumbs a').removeClass('active');
			jQuery(e).addClass('active');			
			jQuery('#app-wrap .labView').removeClass('active');
			jQuery('#app-wrap .labView').css('display', '');
			jQuery('#view-'+postion).addClass('active');
			design.layers.setup();
			design.team.changeView();
			
			jQuery(document).triggerHandler( "changeView.product.design", e);
		},
		viewActive: function(){
			var id = jQuery('.labView.active').attr('id');
			
			var view = 'front';
			if ( typeof id != 'undefined' )
			{
				var view = id.replace('view-', '');
			}
			return view;
		},
		changeColor: function(e, n)
		{
			if (jQuery('.labView.active .design-area').hasClass('zoom'))
				design.tools.zoom();
			jQuery('#product-list-colors span').removeClass('active');
			jQuery(e).addClass('active');
			design.item.designini(items, n);
			var a = jQuery('#product-thumbs a');
			design.products.changeView(a[0], 'front');

			var hex = jQuery(e).data('color');
			if( jQuery('.div-design-area .is_change_color').length )
			{
				jQuery('.div-design-area .is_change_color').css('background-color', '#'+hex);
			}
			
			jQuery(document).triggerHandler( "changeColor.product.design", e, n);
			
			design.ajax.getPrice();
		},
		changeDesign: function(e, id){
			if(jQuery('.labView.active .design-area').hasClass('zoom'))
			{
				design.tools.zoom();
			}
			var a = document.getElementById('product-thumbs').getElementsByTagName('a');
			this.changeView(a[0], 'front');
			jQuery('#app-wrap .product-design').html('');
			
			if(typeof id == 'undefined')
			{
				var ids = jQuery('.product-detail.active').attr('id');
				var id = ids.replace('product-detail-', '');
			}
			product_id = id;
			
			if (typeof this.product[product_id] == 'undefined') return;
			
			var product = this.product[product_id];
			items['design'] = {};
			parent_id = product.parent_id;			
			print_type = product.print_type;
			min_order = product.min_order;
			max_order = product.max_order;

			change_bg_product = 'img';
			if(typeof product.design.change_bg != 'undefined')
			{
				change_bg_product = 'area';
			}
			if (max_order < min_order) max_order = 99999; // fix max_order.
			var list_color = jQuery('#product-list-colors');
			list_color.html('');
			jQuery.each(product.design.color_hex, function(i, color){
				/* add color */
				var span = document.createElement('span');
					if (i == 0)	span.className = 'bg-colors dg-tooltip active';
					else span.className = 'bg-colors dg-tooltip';
					span.setAttribute('data-original-title', product.design.color_title[i]);
					span.setAttribute('data-placement', 'top');
					span.setAttribute('data-color', color);
					span.setAttribute('onclick', 'design.products.changeColor(this, '+i+')');
					
					var colors_hex = color.split(';');
					var a_width = 23/colors_hex.length;
					for(jc=0; jc<colors_hex.length; jc++)
					{
						var a_color = document.createElement('a');
							a_color.setAttribute('href', 'javascript:void(0);');
							
						a_color.style.backgroundColor = '#' + colors_hex[jc];
						a_color.style.width = a_width+'px';
						span.appendChild(a_color);
					}
				list_color.append(span);
				
				items['design'][i] = {};
				items['design'][i]['color'] = color;
				items['design'][i]['title'] = product.design.color_title[i];
				if (typeof product.design.front[i] != 'undefined')
					items['design'][i]['front'] = product.design.front[i];
				else items['design'][i]['front'] = '';
				
				if (typeof product.design.back != 'undefined' && typeof product.design.back[i] != 'undefined')
					items['design'][i]['back'] = product.design.back[i];
				else items['design'][i]['back'] = '';
				
				if (typeof product.design.left != 'undefined' && typeof product.design.left[i] != 'undefined')
					items['design'][i]['left'] = product.design.left[i];
				else items['design'][i]['left'] = '';
				
				if (typeof product.design.right != 'undefined' && typeof product.design.right[i] != 'undefined')
					items['design'][i]['right'] = product.design.right[i];
				else items['design'][i]['right'] = '';
			});
			if(typeof product.design.color_picker != 'undefined')
			{
				list_color.append('<span class="bg-colors dg-tooltip bg-more-colors" data-placement="top" data-original-title="'+lang.color_picker+'"></span>');
				design.products.colorPicker();
			}
			items['area'] 	= product.design.area;
			items['params'] = product.design.params;

			jQuery.each(['front', 'back', 'left', 'right'], function(i, view){
				if(items.params[view] == '')
				{
					items.params[view] = "{'page':'21.0x29.7','width':'21.0','height':'29.7','lockW':true,'lockH':true,'shape':'square','shapeVal':0}";
				}
			});

			jQuery('#product-attributes').html(product.attribute);
			
			design.item.designini(items);
			jQuery('#dg-products').modal('hide');
			jQuery('.dg-tooltip').tooltip();
			
			if (jQuery('#product-attributes .size-number').length > 0)
			{
				var min_quantity = jQuery('#quantity').val();
				jQuery('#product-attributes .size-number').val('');
				var size = jQuery('#product-attributes .size-number');
				setTimeout(function(){
					size[0].setAttribute('value', min_quantity);
					jQuery(size[0]).val(min_quantity);
					jQuery('#quantity').val(min_quantity);
					design.ajax.getPrice();
				}, 100);
			}
			
			
			jQuery('#product-attributes .size-number').keyup(function(){
				design.products.sizes();
			});
			
			jQuery('#quantity').keyup(function(e){
				/*check console*/
				var currnt_vl = jQuery(this).attr('aria-valuenow');
				if (currnt_vl < min_order){
					alert_text(lang.designer.quantityMin +' '+min_order+'. '+lang.designer.quantity);
					scrollQuantity();
					return false;
				}
				/*check console*/
				design.ajax.getPrice();
				var code = e.keyCode || e.which;
				if (code == 13) { 
					e.preventDefault();
					return false;
				}				
			});

			if(product.image == '') product.image = 'assets/images/photo.png';
			
			jQuery(document).triggerHandler("change.product.design", product);
			jQuery(document).triggerHandler("product.change.design", product);
			
			design.team.setup();
			design.team.save();
			design.products.discount(product);
			
			// fix add quantity when change product.
			if(jQuery('#quantity').val() == 0)
				jQuery('#quantity').val(min_order);
			
			design.team.changeSize();
			jQuery('#product-attributes .size-number').click(function(){
				design.team.changeSize();
			});
			
			design.ajax.getPrice();
			jQuery('#modal-product-info .product-detail-image').attr('src', baseURL + product.image);
			jQuery('#modal-product-info .product-detail-description').html(product.description);
			jQuery('#modal-product-info .product-detail-title').html(product.title);
			jQuery('#modal-product-info .product-detail-id').html(product.id);
			jQuery('#modal-product-info .product-detail-sku').html(product.sku);
			jQuery('#modal-product-info .product-detail-short_description').html(product.short_description);
			jQuery('.product-detail-size').html(product.size);
								
		},
		changeProduct: function(e, product){
			var id 	= jQuery(e).data('id');
			jQuery('.product-list .product-box').removeClass('active');
			jQuery(e).addClass('active');
			jQuery('.product-list .img-thumbnail').css('boder', '1px solid #ddd');
			jQuery(e).find('.img-thumbnail').css('boder', '1px solid #007aff');			
			if (document.getElementById('product-detail-' + id) == null)
			{			
				var div = document.createElement('div');
					div.className = 'product-detail';
					div.setAttribute('id', 'product-detail-' + product.id);
				var html = 			'<div class="row">';
					html = html + 		'<div class="col-sm-6">';
					html = html + 			'<img alt="'+product.title+'" class="img-responsive img-thumbnail" src="'+baseURL+product.image+'">';
					html = html + 		'</div>';
					html = html + 		'<div class="col-sm-6">';
					html = html + 			'<h3 class="margin-top">'+product.title+'</h3>';
					html = html + 			'<p>'+lang.product.id+' '+product.id+'</p>';
					html = html + 			'<p>'+lang.product.sku+' '+product.sku+'</p>';
					html = html + 		'</div>';
					html = html + 	'</div>';
					
					html = html + 	'<div class="row col-sm-12">';
					html = html + 		'<h4>'+lang.product.description+'</h4>';
					html = html + 		'<div class="box-product-description">'+product.description+'</div>';
					html = html + 	'</div>';
				div.innerHTML = html;
				jQuery('#dg-products .products-detail').append(div);
			}
			jQuery('#product-detail-' + id).addClass('active');
			jQuery('#dg-products .products-detail').show('slow');
			jQuery('#dg-products .product-list').hide();
			jQuery('#loading-change-product').show();
			
			jQuery(document).triggerHandler( "changeProduct.product.design", [e, product]);
		},
		productCate: function(id){
			var seft = this;
			if (typeof seft.products[id] != 'undefined'){
				seft.addProduct(seft.products[id]);
			}
			else{
				jQuery('#dg-products .modal-body').addClass('loading');
				jQuery.ajax({
					type: "POST",
					dataType: "json",
					url: mainURL + url_ajax_product,
					data: { id: id, lang: lang_active }
				}).done(function( data ) {
					jQuery.each(data.products, function(i, product){
						if(product.image == '') product.image = 'assets/images/photo.png';
						seft.product[product.id] = product;
					});
					seft.products[id] = data.products;
					seft.addProduct(data.products);			
				}).always(function(){
					jQuery('#dg-products .modal-body').removeClass('loading');
				});
			}
		},
		addProduct: function(products){							
			
			jQuery('.product-list').html('');
			
			if (products.length == 0) return;
			
			var seft = this;
			jQuery.each(products, function(i, product){
				var div = document.createElement('div');
					div.setAttribute('data-id', product.id);
					div.className = 'product-box col-xs-6 col-sm-4 col-md-3';
				jQuery(div).click(function(){ 
					//seft.changeProduct(this, product);
					design.products.changeDesign(null, product.id);
				});			
				
				html = '<div class="thumbnail"><img src="'+product.image+'" alt="'+product.title+'" class="img-responsive"> <div class="caption">' + product.title +'</div></div>';
					div.innerHTML = html;
				
				jQuery('.product-list').append(div);
			});
		},
		changeCategory: function(e)
		{	
			jQuery('#close-product-detail').trigger('click');
			this.childCate(e);
			var level = jQuery(e).attr('data-level'),
				parent_id = e.value;
			if(level > 1 && parent_id == 0)
			{
				if (jQuery('#parent-categories-' + (parseInt(level)-1)).length > 0)
				{
					parent_id = jQuery('#parent-categories-' + (parseInt(level)-1)).val();
				}
			}
			this.productCate(parent_id);
			//this.productCate(e.value);
		},
		childCate: function(e){
			var seft = this;
			if (typeof seft.categories != 'undefined' & typeof seft.categories[e.value] != 'undefined'){
				seft.addCatogory(e, seft.categories[e.value]);
				return;
			}
			jQuery(e).addClass('loading_sm');
			jQuery.ajax({
				type: "POST",
				dataType: "json",
				url: baseURL + "ajax.php?type=categories",
				data: { parent_id: e.value }
			}).done(function( data ) {
				if (data.error == 0)
				{
					seft.categories[e.value] = data.categories;
					seft.addCatogory(e, seft.categories[e.value]);
				}
			}).always(function(){
				jQuery(e).removeClass('loading_sm');
			});
		},
		addCatogory: function(e, categories){
			var level = jQuery(e).data('level');
				level = parseInt(level) + 1;
			var value = jQuery(e).val(),
				data = {},
				j = 0;
				
			jQuery.each(categories, function(i, cate){
				if (cate.parent_id == value && cate.parent_id > 0){
					data[j]	= cate;
					j++;
				}
			});			
			if (j>0){
				this.removeCate(level);
				
				if (document.getElementById('parent-categories-' + level)){
					var html = '<option value="0"> '+lang.designer.category+' </option>';						
						
					jQuery.each(data, function(i, category){
						html = html + '<option value="'+category.id+'">'+category.title+'</option>';
					});
					
					jQuery('#parent-categories-' + level).html(html);
				} 
				else
				{
					var div = document.createElement('div');
					if(jQuery('#list-categories').hasClass('mobile'))
						div.className = 'col-xs-6';
					else
						div.className = 'col-xs-4 col-md-3';
					var select = '<select id="parent-categories-'+level+'" data-level="'+level+'" onchange="design.products.changeCategory(this)" class="form-control input-sm">';
						select = select + '<option value="0"> '+lang.designer.category+' </option>';
					
					jQuery.each(data, function(i, category){
						select = select + '<option value="'+category.id+'">'+category.title+'</option>';
					});
					
					select = select + '</select>';
					
					div.innerHTML = select;
					jQuery('#list-categories').append(div);
				}
			}else{
				this.removeCate(level-1);
			}			
		},
		removeCate: function(level){
			jQuery('#list-categories select').each(function(){
				var i = parseInt(jQuery(this).data('level'));
				if (i > level){
					jQuery(this).parent().remove();
				}
			});
		}
	},
	team:{
		updateBack: function(e, type){
			jQuery(document).triggerHandler("remove.team.design");
			if (typeof type != 'undefined')
			{
				var e = jQuery('.labView.active .drag-item-'+type);
				if (e.length == 0) return false;
				e.removeClass('drag-item-selected');
				var value = jQuery('#team-edit-'+type).val();
				if (value == '') return;
				e[0].item.text = value;
				var tspan = e.find('tspan');
				tspan[0].textContent = value;
				design.text.setSize(e);				
			}
			else
			{				
				jQuery('#txt-team-fontfamly').html(e.item.fontFamily);
				jQuery('#team-name-color').data('color', e.item.color.replace('#', '')).css('background-color', e.item.color);
			}			
		},
		load: function(teams){
			var $this = this;
			if(typeof teams != 'undefined' && teams != null)
			{
				if(typeof teams.name != 'undefined')
				{
					$this.tableView(teams);
					jQuery.each(teams.name, function(i, name){
						var team = {};
						team.name = name;
						team.number = teams.number[i];
						team.size = teams.size[i];
						$this.addMember(team);
					});
				}
			}
		},
		changeView: function(){			
			if (jQuery('.labView.active .drag-item-name').length > 0)
			{
				document.getElementById('team_add_name').checked = true;
				var e = jQuery('.labView.active .drag-item-name');
				if (typeof e[0] != 'undefined' && typeof e[0].item != 'undefined' && typeof e[0].item.text != 'undefined')
					jQuery('#team-edit-name').val(e[0].item.text);
				else
					jQuery('#team-edit-name').val('NAME');
			}
			else
			{
				document.getElementById('team_add_name').checked = false;
				jQuery('#team-edit-name').val('NAME');
			}
				
			if (jQuery('.labView.active .drag-item-number').length > 0)
			{
				document.getElementById('team_add_number').checked = true;
				var e = jQuery('.labView.active .drag-item-number');
				if (typeof e[0] != 'undefined' && typeof e[0].item != 'undefined' && typeof e[0].item.text != 'undefined')
					jQuery('#team-edit-number').val(e[0].item.text);
				else
					jQuery('#team-edit-number').val('00');
			}
			else
			{
				document.getElementById('team_add_number').checked = false;
				jQuery('#team-edit-number').val('00');
			}
		},
		create: function(){
			design.popover('add_item_team');
			jQuery('.popover-title').children('span').html(lang.text.teamTitle);
		},
		addName: function(e){
			if (jQuery(e).is(':checked') == true)
			{
				$jd('#txt-team-fontfamly').html('arial');
				$jd('.ui-lock').attr('checked', false);
				var txt = {};
				txt.text = jQuery('#team-edit-name').val();
				if (txt.text == '') txt.text = 'NAME';
				txt.color = '#000000';
				txt.fontSize = '24px';
				txt.fontFamily = 'arial';
				txt.stroke = 'none';
				txt.strokew = '0';
				txt.fn = {};
				txt.fn.remove = false;
				txt.fn.rotate = false;
				design.text.add(txt, 'team');
				var o = design.item.get();
				o.addClass('drag-item-name');
				o[0].item.isName = true;
				jQuery(document).triggerHandler("name.add.team.design", o);
				
				design.popover('add_item_team');
			}
			else
			{
				var id = jQuery('.labView.active .drag-item-name').attr('id');
				var index = id.replace('item-', '');
				design.layers.remove(index);
				jQuery('.labView.active .drag-item-name').remove();
				jQuery(document).triggerHandler("remove.team.design");
				design.ajax.getPrice();
			}
		},
		addNumber: function(e){
			if (jQuery(e).is(':checked') == true)
			{
				$jd('#txt-team-fontfamly').html('arial');
				$jd('.ui-lock').attr('checked', false);
				var txt = {};
				txt.text = jQuery('#team-edit-number').val();
				if (txt.text == '') txt.text = 'NAME';
				txt.color = '#000000';
				txt.fontSize = '24px';
				txt.fontFamily = 'arial';
				txt.stroke = 'none';
				txt.strokew = '0';
				txt.fn = {};
				txt.fn.remove = false;
				design.text.add(txt, 'team');
				var o = design.item.get();
				o.addClass('drag-item-number');
				o[0].item.isNumber = true;
				jQuery(document).triggerHandler( "number.add.team.design", o);
				design.popover('add_item_team');
			}
			else
			{
				var id = jQuery('.labView.active .drag-item-number').attr('id');
				var index = id.replace('item-', '');
				design.layers.remove(index);
				jQuery('.labView.active .drag-item-number').remove();
				jQuery(document).triggerHandler("remove.team.design");
				design.ajax.getPrice();
			}
		},
		addMember: function(team){
			var i = 1;
			jQuery('#table-team-list tbody tr').each(function(){
				var td = jQuery(this).find('td');
					td[0].innerHTML = i;
				i++;
			});
			if (typeof team == 'undefined')
			{
				team = {};
				team.name = '';
				team.number = '';
				team.size = '';
			}
			var sizes = this.sizes(team.size);
			var html = '<tr>'
					 + 	'<td>'+i+'</td>'					 
					 + 	'<td>'
					 + 		'<input type="text" class="form-control input-sm" value="'+team.name+'" placeholder="'+lang.team.name+'">'
					 + 	'</td>'
					 + 	'<td>'
					 + 		'<input type="text" class="form-control input-sm" value="'+team.number+'" placeholder="'+lang.team.number+'">'
					 + 	'</td>'
					 + 	'<td>'+sizes+'</td>'
					 + 	'<td>'
					 + 		'<a href="javascript:void(0)" onclick="design.team.removeMember(this)" title="remove">'+lang.remove+'</a>'
					 + 	'</td>'
					 + '</tr>';
			jQuery('#table-team-list tbody').append(html);
		},
		removeMember: function(e){
			jQuery(e).parents('tr').remove();
			var i = 1;
			jQuery('#table-team-list tbody tr').each(function(){
				var td = jQuery(this).find('td');
					td[0].innerHTML = i;
				i++;
			});
		},
		setup: function(){
			var sizes = this.sizes('');
			jQuery('#table-team-list tbody tr').each(function(){
				var td = jQuery(this).find('td');
				td[3].innerHTML = sizes;
			});
			jQuery('#team_msg_error').html(lang.team.choose_size).css('display', 'block');
		},
		sizes: function(size){
			var options =  '';
			jQuery('.p-color-sizes').each(function(){
				var groupName = jQuery(this).parent().parent().children('label').text();
				options = options + '<optgroup label="'+groupName+'">';
				
				jQuery(this).find('.size-number').each(function(){
					var value = jQuery(this).attr('name');
					value = value.replace('][', '-');
					value = value.replace('][', '-');
					value = value.replace(']', '');
					value = value.replace('[', '');
					value = value.replace('attribute', '');
					var lable = jQuery(this).parents('li').find('label').data('id');
					if (size == lable+'::'+value)
						options = options + '<option value="'+lable+'::'+value+'" selected="selected">'+lable+'</option>';
					else
						options = options + '<option value="'+lable+'::'+value+'">'+lable+'</option>';
				});
				
				options = options + '</optgroup>';
			});
			if (options == '')
			{
				var select = '<select class="form-control input-sm" disabled=""></select>';
			}
			else
			{
				var select = '<select class="form-control input-sm">'+options+'</select>';
			}
			return select;
		},
		changeSize: function(){
			if(typeof design.teams.name != 'undefined' && typeof design.teams.name[1] != 'undefined')
			{
				this.create();
				jQuery('#dg-item_team_list').modal();
				return false;
			}
		},
		save: function(){			
			var teams 			= {};
				teams.name 		= {};
				teams.number 	= {};
				teams.size 		= {};
			var i = 1, checked = true;
			jQuery('#table-team-list tbody tr').each(function(){
				var td = jQuery(this).find('td');
				var name = jQuery(td[1]).find('input').val();
				var number = jQuery(td[2]).find('input').val();
				var size = jQuery(td[3]).find('select').val();
				if (name == '' || number == '')
				{
					checked = false;
				}
				teams.name[i] = name;
				teams.number[i] = number;
				teams.size[i] = size;
				
				i++;
			});
			if (checked == false)
			{
				jQuery('#team_msg_error').html(lang.product.team).css('display', 'block');
			}
			else
			{
				jQuery('#team_msg_error').css('display', 'none');
				jQuery('#dg-item_team_list').modal('hide');
				this.tableView(teams);
			}
			design.teams = teams;
		},
		tableView: function(teams){			
			if (typeof teams.name != 'undefined')
			{
				var sizes = {}, n=0;
				var div = jQuery('#item_team_list tbody');
				div.html('');
				jQuery.each(teams.name, function(i, team){
					n++;
					if (teams.size[i] == null)
					{
						var temp = []; temp[0] = '';
					}
					else
					{
						var temp = teams.size[i].split('::');
					}
					
					var html = '<tr>'
							+  	'<td>'+teams.name[i]+'</td>'
							+  	'<td>'+teams.number[i]+'</td>'
							+  	'<td>'+temp[0]+'</td>'
							+  '</tr>';
					div.append(html);
					if (typeof sizes[teams.size[i]] == 'undefined')
						sizes[teams.size[i]] = [];
					sizes[teams.size[i]].push(i);
				});
				
				if (jQuery('.size-number').length > 0)
				{
					jQuery('.size-number').each(function(){
						var lable = jQuery(this).parents('li').find('label').data('id');
						var value = jQuery(this).attr('name');
							value = value.replace('][', '-');
							value = value.replace('][', '-');
							value = value.replace(']', '');
							value = value.replace('[', '');
							value = value.replace('attribute', '');
							
						if (typeof sizes[lable+'::'+value] != 'undefined')
							jQuery(this).val(Object.keys(sizes[lable+'::'+value]).length);
						else
							jQuery(this).val('');
					});
				}
				else
				{
					jQuery('#quantity').val(n);
					jQuery('#quantity').click(function(){
						design.team.changeSize();
					});
				}
			}
			if (jQuery('.size-number').length > 0)
			{
				design.products.sizes();
			}
			design.ajax.getPrice();
		}
	},
	text:{
		getValue: function(){
			var o = {};
			o.txt 			= $jd('#addEdit').val();
			o.color 		= $jd('#dg-font-color').css('background-color');
			o.fontSize 		= $jd('#dg-font-size').text();
			o.fontFamily 	= $jd('#dg-font-family').text();
			if($jd('#font-style-bold').hasClass('active')) o.fontWeight 	= 'bold';
			var outline 	= $jd('#dg-change-outline-value a').css('left');
			outline 		= outline.replace('px', '');
			if(outline != 0){
				o.stroke 		= $jd('#dg-outline-color').css('background-color');
				o.strokeWidth 	= outline/10;
			}
			o.spacing 		= '0';			
			return o;
		},		
		create: function(){
			$jd('.ui-lock').attr('checked', false);
			
			var txt = {};
			
			txt.text = 'テキスト';
			txt.color = '#FF0000';
			txt.fontSize = '24px';
			txt.fontFamily = 'arial';
			txt.stroke = 'none';
			txt.strokew = '0';
			
			jQuery(document).triggerHandler( "before.add.text.design", txt);
			
			this.add(txt);			
		},
		setValue: function(o){
			$jd('#enter-text').val(o.text);
			$jd('#txt-fontfamily').html(o.fontFamily);
			var color = $jd('#txt-color');
				color.data('color', o.color);
				color.css('background-color', o.color);
				
			if (typeof o.align == 'undefined')
				o.align = 'center';
			jQuery('#text-align span').removeClass('active');
			jQuery('#text-align-'+o.align).addClass('active');
			
			if (typeof o.Istyle != 'undefined' && o.Istyle == 'italic')
				jQuery('#text-style-i').addClass('active');
			else
				jQuery('#text-style-i').removeClass('active');
			
			if (typeof o.weight != 'undefined' && o.weight == 'bold')
				jQuery('#text-style-b').addClass('active');
			else
				jQuery('#text-style-b').removeClass('active');
				
			if (typeof o.decoration != 'undefined' && o.decoration == 'underline')
				jQuery('#text-style-u').addClass('active');
			else
				jQuery('#text-style-u').removeClass('active');
		
			if (typeof o.color != 'undefined')
			{
				var obj = jQuery('#txt-color');
				if (o.color == 'none')
					obj.addClass('bg-none');
				else
					obj.removeClass('bg-none');
					
				obj.data('color', o.color);
				obj.data('value', o.color);
				obj.css('background-color', '#'+o.color);
			}
			
			if (typeof o.outlineC == 'undefined')
			{
				o.outlineC	= 'none';
			}
			var obj = jQuery('.option-outline .dropdown-color');
			if (o.outlineC == 'none')
				obj.addClass('bg-none');
			else
				obj.removeClass('bg-none');
				
			obj.data('color', o.outlineC);
			obj.data('value', o.outlineC);
			obj.css('background-color', '#'+o.outlineC);					
			
			if (typeof o.outlineW == 'undefined')
			{
				o.outlineW = 0;
			}
			jQuery('.outline-value.pull-left').html(o.outlineW);
			jQuery('#dg-outline-width a').css('left', o.outlineW + '%');
			
			jQuery(document).triggerHandler( "setValue.text.design", o);
		},
		add: function(o, type){
			var item = {};
				if (typeof type == 'undefined')
				{
					item.type 	= 'text';
					item.remove = true;
					item.rotate = true;
				}
				else
				{
					item.type	= type;
					item.remove 		= false;
					item.edit 			= false;
				}
				if (typeof o.fn != 'undefined' && typeof o.fn.rotate != 'undefined')
					item.rotate = o.fn.rotate;
				if (typeof o.fn != 'undefined' && typeof o.fn.edit != 'undefined')
					item.edit = o.fn.edit;
				if (typeof o.fn != 'undefined' && typeof o.fn.remove != 'undefined')
					item.remove = o.fn.remove;
				
				item.text 		= o.text;
				item.fontFamily = o.fontFamily;
				item.color 		= o.color;
				colors			= [];
				colors[0]		= o.color;
				item.colors 	= colors;
				item.stroke		= 'none';
				item.strokew 	= '0';
			if(o){
				this.setValue(o);
			}else{
				var o = this.getValue();
			}
			
			var div = document.createElement('div');
			var node = document.createTextNode(o.text);
				div.appendChild(node);
				div.style.fontSize = o.fontSize;
				div.style.fontFamily = o.fontFamily;
			var cacheText = document.getElementById('cacheText');
			cacheText.innerHTML = '';
			cacheText.appendChild(div);
			var $width = cacheText.offsetWidth,
				$height = cacheText.offsetHeight;

			var svgNS 	= "http://www.w3.org/2000/svg",
			tspan 		= document.createElementNS(svgNS, 'tspan'),
			text 		= document.createElementNS(svgNS, 'text'),
			content 	= document.createTextNode(o.text);
			
			tspan.setAttributeNS(null, 'x', '50%');
			tspan.setAttributeNS(null, 'dy', 0);
							
			text.setAttributeNS(null, 'fill', o.color);
			text.setAttributeNS(null, 'stroke', o.stroke);
			text.setAttributeNS(null, 'stroke-width', o.strokew);
			text.setAttributeNS(null, 'stroke-linecap', 'round');
			text.setAttributeNS(null, 'stroke-linejoin', 'round');
			text.setAttributeNS(null, 'x', parseInt($width/2));
			text.setAttributeNS(null, 'y', 20);				
			text.setAttributeNS(null, 'text-anchor', 'middle');				
			text.setAttributeNS(null, 'font-size', o.fontSize);
			text.setAttributeNS(null, 'font-family', o.fontFamily);
			
			if(typeof o.fontWeight != 'undefined')
			text.setAttributeNS(null, 'font-weight', o.fontWeight);
			
			if(typeof o.strokeWidth != 'undefined' && o.strokeWidth != 0){
				text.setAttributeNS(null, 'stroke', o.stroke);
				text.setAttributeNS(null, 'stroke-width', o.strokeWidth);
			}
			if(typeof o.rotate != 'undefined'){
				text.setAttributeNS(null, 'transform', o.rotate);
			}
			if(typeof o.style != 'undefined'){
			text.setAttributeNS(null, 'style', o.style);
			}
			tspan.appendChild(content);
			text.appendChild(tspan);
			
			var g = document.createElementNS(svgNS, 'g');
				g.id = Math.random();
			g.appendChild(text);
			
			var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			svg.setAttributeNS(null, 'width', $width);
			svg.setAttributeNS(null, 'height', $height);
			svg.setAttributeNS(null, 'viewBox', '0 0 '+$width+' '+$height);			
			svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
			svg.appendChild(g);
			
			item.width = $width;
			item.height = $height;
			item.file = '';
			item.confirmColor	= false;
			item.svg = svg;
			
			design.item.create(item);
			
			jQuery(document).triggerHandler( "after.add.text.design", item);
		},
		update: function(lable, value){
			var markArea = jQuery('.labView.active .mask-items-view .mask-items-area');
			if(markArea.find('.mask-all-item').length > 0)
			{
				var e = design.elementChangeColor;
			}
			else
			{
				var e = design.item.get();
			}
			if(typeof e[0] == 'undefined') return false;
			var txt = e.find('text');		
			if(typeof lable != 'undefined' && lable != '')
			{
				var rotate = e.data('rotate');
				if (rotate == 'undefined') rotate = 0;
				rotate = rotate * Math.PI / 180;
				e.css('transform', 'rotate(0rad)');
			
				var obj = document.getElementById(e.attr('id'));
				switch(lable){
					case 'fontfamily':
						txt[0].setAttributeNS(null, 'font-family', value);
						obj.item.fontFamily = value;
						if (obj.item.type == 'text')
						{
							jQuery('#txt-fontfamly').html(value);
							jQuery('#txt-fontfamily').css('font-family', value);
						}							
						else
						{
							jQuery('#txt-team-fontfamly').html(value);
						}							
						break;
					case 'color':
						var color = $jd('#txt-color').data('value');
						if (color == 'none') var hex = color;
						else var hex = '#' + color;
						txt[0].setAttributeNS(null, 'fill', hex);
						obj.item.color = hex;
						var colors = obj.item.colors;
						colors[0] = hex;
						obj.item.colors = colors;
						value = '';
						break;
					case 'colorT':
						var color = $jd('#team-name-color').data('value');
						if (color == 'none') var hex = color;
						else var hex = '#' + color;
						txt[0].setAttributeNS(null, 'fill', hex);
						obj.item.color = hex;
						var colors = obj.item.colors;
						colors[0] = hex;
						obj.item.colors = colors;
						value = '';
						break;
					case 'text':
						var align = obj.item.align;
						if (jQuery('#text-align .active').length == 0 || jQuery('#text-align .active').data('label') != 'alignC')
						{
							this.update('alignC', '');
						}
						var text = $jd('#enter-text').val();
						text = text.replace('\n\n', '\n');
						if(text.indexOf('\n') == 0)
							text = text.substring(1, text.lenght);
						
						$jd('#enter-text').val(text); // Fix text when create some space line.
						
						if (text == '') break;
						jQuery('.layer.active span').html(text.substring(0, 15));
						jQuery('.layer.active span').attr('title', text);
						obj.item.text = text;
						var texts = text.split('\n');
						var svgNS 	= "http://www.w3.org/2000/svg";						
						txt[0].textContent = '';
						var fontSize = txt[0].getAttribute('font-size').split('px');
						for (var i = 0; i < texts.length; i++) {
							if(texts[i] == '' && typeof(texts[i+1]) == 'undefined') // Remove space line end.
								continue;
							
							var tspan 	= document.createElementNS(svgNS, 'tspan');
							var dy = 0;
							if(i> 0) dy = fontSize[0];
								tspan.setAttributeNS(null, 'dy', dy);
								tspan.setAttributeNS(null, 'x', '50%');
							var content 	= document.createTextNode(texts[i]);	
							tspan.appendChild(content);
							txt[0].appendChild(tspan);
						}
						this.setSize(e);

						if(align == 'left')
						{
							this.update('alignL', '');
						}
						else if(align == 'right')
						{
							this.update('alignR', '');
						}						
						break;						
					case 'alignL':
						obj.item.align = 'left';
						design.text.align(e, 'left');
						break;
					case 'alignC':
						obj.item.align = 'center';
						design.text.align(e, 'center');
						break;
					case 'alignR':
						obj.item.align = 'right';
						design.text.align(e, 'right');
						break;
					case 'styleI':
						var o = $jd('#text-style-i');
						if(o.hasClass('active')){
							o.removeClass('active');
							txt.css('font-style', 'normal');
							obj.item.Istyle = 'normal';
						}else{
							o.addClass('active');
							txt.css('font-style', 'italic');
							obj.item.Istyle = 'italic';
						}
						lable = 'styleI'; value = 'styleI';
						this.setSize(e);
						break;
					case 'styleB':
						var o = $jd('#text-style-b');
						if(o.hasClass('active')){
							o.removeClass('active');
							txt.css('font-weight', 'normal');
							obj.item.weight = 'normal';
						}else{
							o.addClass('active');
							txt.css('font-weight', 'bold');
							obj.item.weight = 'bold';
						}
						lable = 'styleB'; value = 'styleB';
						this.setSize(e);
						break;
					case 'styleU':
						var o = $jd('#text-style-u');
						if(o.hasClass('active')){
							o.removeClass('active');
							txt.css('text-decoration', 'none');
							obj.item.decoration = 'none';
						}else{
							o.addClass('active');
							txt.css('text-decoration', 'underline');
							obj.item.decoration = 'underline';
						}
						lable = 'styleU'; value = 'styleU';
						this.setSize(e);
						break;
					case 'outline-width':
						txt[0].setAttributeNS(null, 'stroke-width', value/50);
						txt[0].setAttributeNS(null, 'stroke-linecap', 'round');
						txt[0].setAttributeNS(null, 'stroke-linejoin', 'round');
						obj.item.outlineW = value;
						break;
					case 'outline':
						if (value == 'none') var hex = value;
						else var hex = '#' + value;
						txt[0].setAttributeNS(null, 'stroke', hex);
						
						var colors = obj.item.colors;
						colors[1] = hex;
						obj.item.colors = colors;
						
						txt[0].setAttributeNS(null, 'stroke-width', $jd('.outline-value').html()/50);
						obj.item.outlineC = hex;
						break;
					default:
						txt[0].setAttributeNS(null, lable, value);
						break;
				}
				e.css('transform', 'rotate('+rotate+'rad)');
			}
			jQuery(document).triggerHandler( "update.text.design", [lable, value]);
		},
		updateBack: function(e){
			this.setValue(e.item);
		},
		reset:function(){
			document.getElementById('dg-font-family').innerHTML = 'arial';
			document.getElementById('dg-font-size').innerHTML = '12';
			$jd('#dg-font-style span').removeClass();
			$jd( "#dg-change-outline-value" ).slider();
		},
		setSize: function(e){
			var txt = e.find('text');
			var $w 	= parseInt(txt[0].getBoundingClientRect().width);
			var $h 	= parseInt(txt[0].getBoundingClientRect().height);
			e.css('width', $w + 'px');
			e.css('height', $h + 'px');						
			var svg = e.find('svg'),
				width = svg[0].getAttribute('width'),
				height = svg[0].getAttribute('height'),
				view = svg[0].getAttribute('viewBox').split(' '),
				vw = (view[2] * $w)/width,
				vh = (view[3] * $h)/height;			
			svg[0].setAttributeNS(null, 'width', $w);
			svg[0].setAttributeNS(null, 'height', $h);
			
			svg[0].setAttributeNS(null, 'viewBox', '0 0 '+vw +' '+ vh);
			
			
			/* setup Y */
			txt[0].setAttributeNS(null, 'y', 0);
			var size1 = txt[0].getBoundingClientRect();
			var size2 = e[0].getBoundingClientRect();
			var svg = e.find('svg'),
			view = svg[0].getAttributeNS(null, 'viewBox');
			var arr = view.split(' ');
						
			var y = (size2.top - size1.top) * vh / $h;
			txt[0].setAttributeNS(null, 'y', y);
						
			jQuery(document).triggerHandler( "size.update.text.design", [$w, $h]);
		},		
		align: function(e, type){
			var span = $jd('#text-align-'+type);
			var txt = e.find('text');
			var tspan = e.find('tspan');
			if(span.hasClass('active')){
				span.removeClass('active');
				txt[0].setAttributeNS(null, 'text-anchor', 'middle');
				for(i=0; i<tspan.length; i++){
					tspan[i].setAttributeNS(null, 'x', '50%');
				}
			}else{
				$jd('#text-align span').removeClass('active');
				span.addClass('active');
				txt[0].setAttributeNS(null, 'text-anchor', 'middle');
				if(type == 'left')
					txt[0].setAttributeNS(null, 'text-anchor', 'start');
				else if(type == 'right')
					txt[0].setAttributeNS(null, 'text-anchor', 'end');
				else 
					txt[0].setAttributeNS(null, 'text-anchor', 'middle');
				
				for(i=0; i<tspan.length; i++){
					if(type == 'left')
						tspan[i].setAttributeNS(null, 'x', '0');
					else if(type == 'right')
						tspan[i].setAttributeNS(null, 'x', '100%');
					else
						tspan[i].setAttributeNS(null, 'x', '50%');
				}
			}
			jQuery(document).triggerHandler( "align.text.design", [e, type]);
		},
		fonts: function(files, names){
			jQuery.ajax({type: "POST", url: baseURL+'components/com_devn_vmattribute/assets/fonts/fonts.php', data: { files: files, names: names, url: baseURL },
			beforeSend: function ( xhr ){xhr.overrideMimeType("application/octet-stream");},
			success: function(data) {
			jQuery("<style>"+data+"</style>").appendTo('head');
			var fonts = names.split(';');
			var html = '';
			for(i=0;i<fonts.length; i++){
				html = html + '<span style="font-family:\''+fonts[i]+'\'">test</span>';
			}
			jQuery('<div style="display:none">'+html+'</div>').appendTo('body');
			}});
		},
	},
	myart:{
		loadFile: function(key){
			design.mask(true);
			jQuery.ajax({
				url: siteURL + "ajax.php?type=userfile&file="+key
			}).done(function( data ){
				var results 	= eval('('+data+')');
				if (results.status == 1)
				{
					var span = jQuery('#file-'+key);
					if(typeof span[0] != 'undefined')
					{
						span[0].item = results.item;
						span[0].item.url = siteURL + results.item.url;
						span[0].item.thumb = siteURL + results.item.thumb;

						jQuery(document).triggerHandler( "uploaded", [results.item, span[0]]);
						design.myart.create(span[0]);
						setTimeout(function(){
							var elm = design.item.get();
							jQuery(elm).addClass('drag-item-upload');
							jQuery(elm).data('upload', 1);
							jQuery(document).triggerHandler( "added.uploaded", elm);
							design.ajax.getPrice();
						}, 200);
					}
				}
				else
				{
					alert_text(results.msg)
				}
			}).always(function(){
				design.mask(false);
			});
		},
		create: function(e){
			var item = e.item;
			$jd('.ui-lock').attr('checked', false);			
			var o 			= item;
			o.type 			= 'clipart';			
			o.upload		= 1;			
			o.title 		= item.title;
			o.url 		= item.url;
			o.file_name 	= item.file_name;			
			o.thumb		= item.thumb;
			o.confirmColor	= true;
			o.remove 		= true;
			o.edit 		= false;
			o.rotate 		= true;	
			o.rotate 		= true;

			if(typeof item.layer != 'undefined')
			{
				o.layer = item.layer;
			}
			
			if (item.file_type != 'svg')
			{
				o.file		= {};
				o.file.type	= 'image';				
				var img = new Image();
				design.mask(true);
				img.onload = function() {
					o.width 	= this.width;
					o.height	= this.height;
					if (this.width > 100)
					{
						o.width 	= 100;						
						o.height 	= (100/this.width) * this.height;
					}
					o.change_color = 0;					
						
					jQuery(document).triggerHandler( "myitem.create.item.design", o);

					var content = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="'+o.width+'" height="'+o.height+'" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink">'
								 + '<g><image x="0" y="0" width="'+o.width+'" height="'+o.height+'" preserveAspectRatio="none" xlink:href="'+item.thumb+'" /></g>'
								 + '</svg>';
					o.svg 		= jQuery.parseHTML(content);
					
					if(typeof o.stoped != 'undefined' && o.stoped == 1)
					{
						$jd('#dg-myclipart').modal('hide');
						design.mask(false);
						return false;
					}
					
					design.item.create(o);
					$jd('#dg-myclipart').modal('hide');
					design.mask(false);
				}
				img.src = item.thumb;
				return true;
			}
		}
	},
	qrcode:{
		open: function(){
			design.popover('add_item_qrcode');
			jQuery('.popover-title').children('span').html(lang.text.qrcde);
		},
		create: function(e){
			var txt = jQuery('#enter-qrcode').val();
			if (txt == '')
			{
				alert_text(lang.text.enter_text);
				return false;
			}
			
			var $btn = jQuery(e).button('loading');
			jQuery.ajax({
				url: siteURL + "ajax.php?type=qrcode&text="+txt
			}).done(function( data ){
				var img = document.createElement('img');
					img.className = 'img-responsive img-thumbnail';
					img.setAttribute('src', siteURL+data);
					img.setAttribute('alt', 'QRcode');
					img.setAttribute('title', lang.text.add_qrcode);
				
				var fileName = data.split('/');
				
				var item = {};
					item.title = lang.text.qrcode;
					item.url = siteURL+data;
					item.file_name = fileName[fileName.length - 1];
					item.thumb = siteURL+data;
					item.file_type = 'image';
					
				img.item = item;
					
				jQuery('#qrcode-img').html(img);
				$btn.button('reset');
				jQuery(img).bind('click', function(){
					design.myart.create(img);
				});
				design.myart.create(img);
				jQuery('#image-qr-code').trigger('click');
			});
			
		}
	},
	art:{
		create: function(e){
			var item = e.item;
			$jd('.ui-lock').attr('checked', false);
			var o 		= item;
			o.type 		= 'clipart';			
			o.upload 		= 0;			
			o.clipart_id 	= jQuery(e).data('clipart_id');
			o.title 		= item.title;
			o.url 		= item.url;
			o.file_name 	= item.file_name;
			o.change_color 	= parseInt(item.change_color);

			if(typeof o.thumb == 'undefined')
			{
				var img 	= $jd(e).children('img');	
				o.thumb	= img.attr('src');	
			}
			o.remove 		= true;
			o.edit 		= true;
			o.rotate 		= true;
			o.confirmColor	= false;
			
			$jd('.modal').modal('hide');
			design.mask(true);
			if (item.file_type != 'svg')
			{
				o.confirmColor	= true;
				var canvas = document.createElement('canvas');
				var context = canvas.getContext('2d');
				var img = new Image();
				img.onload = function() {				  
					o.width 	= 100;
					o.height	= Math.round((o.width/this.width) * this.height);
					o.change_color = 0;
					o.file		= {};
					o.file.type	= 'image';
					
					canvas.width = this.width;
					canvas.height = this.height;
					
					context.drawImage(img,0,0);
					context.stroke();
					var dataURL = canvas.toDataURL();
					var content = '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" preserveAspectRatio="none" width="'+o.width+'" height="'+o.height+'" xmlns:xlink="http://www.w3.org/1999/xlink">'
									 + '<g><image x="0" y="0" width="'+o.width+'" preserveAspectRatio="none" height="'+o.height+'" xlink:href="'+dataURL+'" /></g>'
									 + '</svg>';
					o.svg 		= jQuery.parseHTML(content);					
					jQuery('#arts-add button').button('reset');
					design.item.create(o);
					design.mask(false);
				}
				design.mask(false);
				if(typeof item.imgMedium == 'undefined')
				{
				    item.imgMedium = item.fle_url + item.medium;
				}
				var src = item.imgMedium;
				src = src.replace('http://', '');
				src = src.replace('https://', '');
				img.src = urlCase +'?src='+ src +'&w=250&h=atuto&q=90';				
			}
			else
			{
				delete item.svg; /* fixed cannot add arts of owner store */
				$jd.ajax({
					type: "POST",
					data: item,
					url: siteURL + "ajax.php?type=svg",
					dataType: "json",
					success: function(data){					
							o.width 		= data.size.width;
							o.height		= data.size.height;
							o.file		= data.info;						
							o.svg 		= jQuery.parseHTML(data.content);
							design.item.create(o);
							var elm = design.item.get();			
							var svg = elm.children('svg');
							jQuery(svg[0]).removeAttr('style');
							$jd('.modal').modal('hide');
							var e = design.item.get();
							design.item.setup(e[0].item);
					},
					failure: function(errMsg) {
						alert_text(errMsg+ '. '+lang.designer.tryagain);
						design.mask(false);
					},
					complete: function() {
						design.mask(false);
					}
				});
			}
		},
		/*
		* change object e from color1 to color2
		*/
		changeColor: function(e, color){
			var o = e.data('colors');
			if(typeof o != 'undefined')
			{
				jQuery(o).each(function(){
					if (color == 'none')
						var hex = color;
					else
						var hex = '#' + color;
					/* this.setAttributeNS(null, o.type, hex); */
					jQuery(this).attr(o.type, hex);
				});
			}			
		},
		restore: function(){
			var e = design.item.get();
			//var html = e.data('content');
			//var o = e.children('svg');
		},
		update: function(e){			
			design.item.setup(e.item);
		}
	},
	item:{
		designini: function(items, color){
			if (Object.keys(items.design).length > 0)
			{
				var postion = 'front';
				if (typeof color == 'undefined'){ var check = true; color = 0;}
				else var check = false;
				var thumbs = jQuery('#product-thumbs');
				jQuery(thumbs).html('');
				
				var postions = ['front', 'back', 'left', 'right'];
				var value	= items.design[color];				
				jQuery.each(postions, function(i, view){
					if (value[view] != '' && value[view].length > 0)
					{
						var item = eval ("(" + value[view] + ")");						
						var o = jQuery('#view-'+view);
						var images = jQuery(o).children('.product-design');
						jQuery(images).html('');
						var window = jQuery(o).children('.design-area');
						var thumbView = '';
						jQuery.each(item, function(j, e){
							if (typeof e.id != 'undefined' && e.id != 'area-design')
							{
								thumbView = e.img;
								var img	= document.createElement('img');
									img.className = 'modelImage';
									img.id = view +'-img-'+ e.id;
									img.setAttribute('src', baseURL + e.img);
									
									img.style.width	 	= e.width;
									img.style.height 		= e.height;
									img.style.top 		= e.top;
									img.style.left 		= e.left;
									img.style.zIndex		= e.zIndex;
									if(typeof e.is_change_color != 'undefined' && e.is_change_color == 1)
									{
										jQuery(img).addClass('is_change_color');
									}
									jQuery(document).triggerHandler( "load.item.design", [img, e]);
								jQuery(images).append(img);
							}
						});

						if(change_bg_product == 'area')
						{
							o.find('img').removeClass('is_change_color');
							o.find('.design-area .content-inner').addClass('is_change_color');
						}
						
						var a = document.createElement('a');
						jQuery(a).bind('click', function(){design.products.changeView(this, view)});
						a.setAttribute('class', 'box-thumb');
						a.setAttribute('href', 'javascript:void(0)');
						a.innerHTML = '<img width="40" height="40" src="'+baseURL+thumbView+'"><span class="help-block">'+lang.text[view]+'</span>';
						jQuery(thumbs).append(a);
					}					
					
					if (check == true)
					{
						var area = items['area'][view];
						if (area != '' && area.length > 0)
						{
							var vector = eval ("(" + area + ")");
							jQuery(window).css({"height":vector.height, "width":vector.width, "left":vector.left, "top":vector.top, "border-radius":vector.radius, "z-index":vector.zIndex});
						}
					}
				});				
			}
		},
		create: function(item){
			jQuery(document).triggerHandler( "start_create.item.design", item);
			if(typeof item.disabled_add != 'undefined' && item.disabled_add == 1)
			{
				return false;
			}
			this.unselect();
			jQuery('.labView.active .design-area').css('overflow', 'visible');
			var e = $jd('#app-wrap .active .content-inner'),				
				span = document.createElement('span');
			var n = -1;
			jQuery('#app-wrap .drag-item').each(function(){
				var index 	= jQuery(this).attr('id').replace('item-', '');
				if (index > n) n = parseInt(index);
			});			
			var n = n + 1;			
			
			span.className 	= 'drag-item';
			span.id 		= 'item-'+n;
			span.item 		= item;
			item.id 		= n;			
			jQuery(span).bind('click', function(e){design.item.select(this); e.stopPropagation();});
			var center = this.align.center(item);
			span.style.left = center.left + 'px';
			span.style.top 	= center.top + 'px';
			var viewDes = jQuery('#design-area .labView.active .design-area');
			var zoom    = -1;
			if(viewDes.hasClass('zoom')) {
				zoom    = viewDes.data('zoom');
			}
			if(zoom != -1)
			{
				if(typeof item.width == 'string')
				{
					item.width  = parseFloat(item.width.replace('px', '')) * zoom;
				}
				else
				{
					item.width  = item.width * zoom;
				}
				if(typeof item.height == 'string')
				{
					item.height = parseFloat(item.height.replace('px', '')) * zoom;
				}
				else
				{
					item.height = item.height * zoom;
				}
				var div     = document.createElement('div');
				jQuery(div).append(item.svg);
				var tmpSvg  = jQuery(div).find('svg');
				tmpSvg[0].setAttribute('width', item.width);
				tmpSvg[0].setAttribute('height', item.height);
				tmpSvg.find('image').attr('width', item.width);
				tmpSvg.find('image').attr('height', item.height);
				item.svg = jQuery(div).html();
			}
			span.style.width 	= item.width+'px';
			span.style.height 	= item.height+'px';
			
			jQuery(span).data('id', item.id);
			jQuery(span).data('type', item.type);
			jQuery(span).data('file', item.file);
			jQuery(span).data('width', item.width);
			jQuery(span).data('height', item.height);
			
			design.zIndex  	= parseInt(design.zIndex) + 5;
			span.style.zIndex = design.zIndex;
			span.style.width = item.width;
			span.style.height = item.height;
			
			jQuery(document).triggerHandler( "before.create.item.design", span);
			jQuery(span).append(item.svg);			
			
			if(item.change_color == 1)
			{
				jQuery('#clipart-colors').css('display', 'block');
				jQuery('.btn-action-colors').css('display', 'block');
			}
			else
			{
				jQuery('#clipart-colors').css('display', 'none');
				jQuery('.btn-action-colors').css('display', 'none');
			}
			
			if(item.remove == true)
			{
				var remove = document.createElement('div');
				remove.className = 'item-remove-on glyphicons bin';
				remove.setAttribute('title', lang.text.remove);
				remove.setAttribute('onclick', 'design.item.remove(this)');
				jQuery(span).append(remove);				
			}
			
			if(item.edit == true)
			{
				var edit = document.createElement('div');
				edit.className = 'item-edit-on glyphicons pencil';
				edit.setAttribute('title', lang.text.edit);
				edit.setAttribute('onclick', 'design.item.edit(this)');
				jQuery(span).append(edit);
			}	
			
			e.append(span);
					
			this.move($jd(span));
			this.resize($jd(span));	
			if(item.rotate == true)
				this.rotate($jd(span));
			design.layers.add(item);
			this.setup(item);
			jQuery('.btn-action-edit').css('display', 'none');
			if (print_type == 'screen' || print_type == 'embroidery')
			{
				if (item.confirmColor == true)
				{
					this.setupColorprint(span);
					jQuery('.btn-action-edit').css('display', 'block');
				}				
			}
			jQuery(document).triggerHandler( "after.create.item.design", span);
			this.select(span);
			design.print.colors();			
			design.print.size();
			design.ajax.getPrice();
		},
		setupColorprint: function(o){			
			var item = o.item;
			
			jQuery('#screen_colors_images').html('<img class="img-thumbnail img-responsive" src="'+item.thumb+'">');
			if (item.colors != 'undefined')
			{
				jQuery('#screen_colors_list span').each(function(){
					var color = jQuery(this).data('color');
					if (jQuery.inArray(color, item.colors) == -1)
						jQuery(this).removeClass('active');
					else
						jQuery(this).addClass('active');
				});
			}
			var id = jQuery(o).attr('id');
			if (typeof id != 'undefined')
				jQuery('#screen_colors_body').data('id', id);
			
			jQuery('#screen_colors_body').show();			
		},
		setColor: function(){
			var colors = [], i = 0;
			jQuery('#screen_colors_list .bg-colors').each(function(){
				if (jQuery(this).hasClass('active') == true)
				{
					colors.push(jQuery(this).data('color'));
					i++;
				}
			});
			if (i==0)
			{
				alert_text(lang.designer.chooseColor);
			}
			else
			{
				var o = this.get();
				if (typeof o == 'undefined' || o.attr('id') != 'undefined')
				{
					var id = jQuery('#screen_colors_body').data('id');
					if (typeof id != 'undefined')
					{
						document.getElementById(id).click();
						var o = jQuery('#'+id);
					}
				}
				if (o != 'undefined')
				{
					var e = document.getElementById(o.attr('id'));
					if (typeof e.item != 'undefined')
						e.item.colors = colors;
					this.printColor(e);
				}
				jQuery('#screen_colors_body').hide();
			}
			design.print.colors();
			design.ajax.getPrice();
		},
		printColor: function(o){
			var box = jQuery('#item-print-colors');
			jQuery('.btn-action-edit').css('display', 'none');
			var printing_setting = {};
			printing_setting.confirmColor = false;
			if (print_type == 'screen' || print_type == 'embroidery')
			{
				printing_setting.confirmColor = true;
			}
			
			jQuery(document).triggerHandler( "confirm_printing.item.design", printing_setting);			
			
			if (printing_setting.confirmColor == true)
			{				
				box.html('').css('display', 'none');
				if(o.item.confirmColor == true)
				{
					if (typeof o.item.colors != 'undefined')
					{
						var item = o.item;
						jQuery('#item-print-colors').html('<div class="col-xs-6 col-md-6"><img class="img-thumbnail img-responsive" src="'+item.thumb+'"></div><div class="col-xs-6 col-md-6"><div id="print-color-added" class="list-colors"></div><br/><span id="print-color-edit">'+lang.text.ink_colors+'</span></div>');
						
						jQuery('#print-color-edit').click(function(){
							design.item.setupColorprint(o);
						});
						var div = jQuery('#print-color-added');
						jQuery.each(item.colors, function(i, color){
							var span = document.createElement('span');
								span.className = 'bg-colors';
								span.style.backgroundColor = '#'+color;
							div.append(span);
						});
						box.css('display', 'block');
						jQuery('.btn-action-edit').css('display', 'block');
					}
					else{
						this.setupColorprint(o);
					}
				}				
			}
			else
			{
				box.html('').css('display', 'none');				
			}
		},
		imports: function(item){
			this.unselect();
			jQuery('.labView.active .design-area').css('overflow', 'visible');
			var e = $jd('#app-wrap .active .content-inner'),				
				span = document.createElement('span');
			var n = -1;
			jQuery('#app-wrap .drag-item').each(function(){
				var index 	= jQuery(this).attr('id').replace('item-', '');
				if (index > n) n = parseInt(index);
			});			
			var n = n + 1;
			if (item.type == 'team')
			{
				if ( typeof item.isNumber != 'underline' && item.isNumber == 1)
					span.className = 'drag-item drag-item-number';
				else
					span.className = 'drag-item drag-item-name';
			}
			else
			{			
				span.className = 'drag-item';
			}
			span.id 		= 'item-'+n;
			span.item 		= item;
			item.id 		= n;
			jQuery(span).bind('click', function(e){design.item.select(this); e.stopPropagation();});			

			span.style.left 	= item.left;
			span.style.top 		= item.top;
			span.style.width 	= item.width;
			span.style.height 	= item.height;
			
			jQuery(span).data('id', item.id);
			jQuery(span).data('type', item.type);
			if (typeof item.file != 'undefined')
			{
				jQuery(span).data('file', item.file);
			}
			else
			{
				item.file = {};
				jQuery(span).data('file', item.file);
			}
			jQuery(span).data('width', item.width);
			jQuery(span).data('height', item.height);
			
			span.style.zIndex = item.zIndex;
			design.zIndex = parseInt(item.zIndex);
			
			jQuery(document).triggerHandler( "before.imports.item.design", [span, item]);
			if(item.svg.indexOf('svg') == -1) return;
			jQuery(span).append(item.svg);
			var svg = jQuery(span).children('svg')[0];
			if(svg.getAttribute('viewBox') == '')
			{
				svg.removeAttribute('viewBox');
			}
			if(item.change_color == 1)
			{
				jQuery('#clipart-colors').css('display', 'block');
				jQuery('.btn-action-colors').css('display', 'block');
			}
			else
			{
				jQuery('#clipart-colors').css('display', 'none');
				jQuery('.btn-action-colors').css('display', 'none');
			}
			
			if (item.type != 'team')
			{
				var remove = document.createElement('div');
				remove.className = 'item-remove-on glyphicons bin';
				remove.setAttribute('title', lang.text.remove);
				remove.setAttribute('onclick', 'design.item.remove(this)');
				jQuery(span).append(remove);
			}
			e.append(span);
						
			this.move($jd(span));
			this.resize($jd(span));
			if (item.type != 'team')
			if (item.rotate != 0)
			{				
				this.rotate($jd(span), item.rotate * 0.0174532925);
			}
			else
			{
				this.rotate($jd(span));
			}			
			design.layers.add(item);
			if (item.type == 'clipart' && typeof item.file != 'undefined' && typeof item.file.type != 'undefined' && item.file.type == 'svg')
			{
				var svg = jQuery(span).find('svg');
				var c      = design.svg.getColors(jQuery(svg[0]));
				var colors = [];
				for(var color in c) {
					color = color.replace('#', '');
					colors.push(color);
				}
			}
			else
			{
				if (typeof item.colors == 'undefined')
				{
					var colors = [];
					if (typeof span.item.color != 'undefined')
						colors[0] = span.item.color;
					else
						colors[0] = 'none';
					
					if (typeof span.item.outlineC != 'undefined')
						colors[1] = span.item.outlineC;
				}
				else
				{
					var colors = item.colors;
				}
			}
			span.item.colors = colors;
			
			this.setup(item);
			jQuery(document).triggerHandler( "after.imports.item.design", [span, item]);
			design.print.colors();
			design.print.size();
		},
		align:{
			left: function(){
			},
			right: function(){
			},
			top: function(){
			},
			bottom: function(){
			},
			center: function(item){
				var align 	= {},
				area 		= jQuery('.labView.active .content-inner');
				align.left 	= (jQuery(area).width() - parseInt(item.width))/2; // fixed add clipart to center;
				align.left 	= parseInt(align.left);
				align.top 	= (jQuery(area).height() - parseInt(item.height))/2; // fixed add clipart to center;
				align.top	= parseInt(align.top);
				return align;
			}
		},
		move: function(e){
			if(!e) e = $jd('.drag-item-selected');
			e.draggable({
				scroll: false,				
				drag:function(event, ui){
					var e = ui.helper;
					
					var o = e.parent().parent();
					var	left = o.css('left');
						left = parseInt(left.replace('px', ''));
						
					var	top = o.css('top');
						top = parseInt(top.replace('px', ''));
					var	width = o.css('width');
						width = parseInt(width.replace('px', ''));
					
					var	height = o.css('height');
						height = parseInt(height.replace('px', ''));
												
					var $left = ui.position.left,
						$top = ui.position.top,
						$width = e.width(),
						$height = e.height();
					if($left < 0 || $top < 0 || ($left+$width) > width || ($top+$height) > height){
						e.data('block', true);
						e.css('border', '1px solid #FF0000');						
					}else{
						e.data('block', false);
						e.css('border', '1px dashed #444444');
					}
				},
				stop: function( event, ui ) {
					jQuery(document).triggerHandler( "move.item.design", ui);
					design.ajax.getPrice();
				}
			});						
		},
		resize: function(e, handles){
			if(typeof handles == 'undefined') handles = 'se';
			
			if(handles == 'se') {var auto = true; e = e;}
			else {var auto = false;}
			if(!e) e = $jd('.drag-item-selected');
						
			var oldwidth = 0, oldsize=0;		
			e.resizable({minHeight: 10, minWidth: 10,				
				aspectRatio: auto,
				handles: handles,
				start: function( event, ui ){
					oldwidth = ui.size.width;
					oldsize = $jd('#dg-font-size').text();
				},
				stop: function( event, ui ) {
					jQuery(document).triggerHandler( "resize.item.design", ui);
					design.print.size();
					design.ajax.getPrice();
				},
				resize: function(event,ui){
					var e = ui.element;
					var o = e.parent().parent();
					var	left = o.css('left');
						left = parseInt(left.replace('px', ''));
						
					var	top = o.css('top');
						top = parseInt(top.replace('px', ''));
					var	width = o.css('width');
						width = parseInt(width.replace('px', ''));
					
					var	height = o.css('height');
						height = parseInt(height.replace('px', ''));
																		
					var $left = parseInt(ui.position.left),
						$top = parseInt(ui.position.top),
						$width = parseInt(ui.size.width),
						$height = parseInt(ui.size.height);
					if(($left + $width) > width || ($top + $height)>height){
						e.data('block', true);
						e.css('border', '1px solid #FF0000');
						if(parseInt(left + $left + $width) > 490 || parseInt(top + $top + $height) > 490){
							//$jd(this).resizable('widget').trigger('mouseup');
						}
					}else{
						e.data('block', false);
						e.css('border', '1px dashed #444444');
					}
					var svg = e.find('svg');									
					
					svg[0].setAttributeNS(null, 'width', $width);
					svg[0].setAttributeNS(null, 'height', $height);		
					svg[0].setAttributeNS(null, 'preserveAspectRatio', 'none');					
					
					if(e.data('type') == 'clipart')
					{
						var file = e.data('file');
						if(file.type == 'image')
						{	
							var img = e.find('image');
							img[0].setAttributeNS(null, 'width', $width);
							img[0].setAttributeNS(null, 'height', $height);
						}
					}
					
					if(e.data('type') == 'text')
					{						
						//var text = e.find('text');
						//text[0].setAttributeNS(null, 'y', 20);						
					}
					
					jQuery('#'+e.data('type')+'-width').val(parseInt($width));
					jQuery('#'+e.data('type')+'-height').val(parseInt($height));
				}				
			});
		},
		rotate: function(e, angle){
			if( typeof angle == 'undefined') deg = 0;
			else deg = angle;
			if( typeof e != Object ) var o = jQuery(e);
			else var o = e;
			o.rotatable({angle: deg, 
				rotate: function(event, angle){
					var deg = Math.round(angle.r);
					if(deg < 0) deg = 360 + deg;
					
					jQuery('#' + e.data('type') + '-rotate-value').val(deg);
					o.data('rotate', deg);
					jQuery(document).triggerHandler( "rotate.item.design", deg);
				}
			});
			design.print.size();
		},
		select: function(e){
			if (jQuery(e).hasClass('drag-item-selected') == true) return false;
			this.unselect();
			jQuery('.labView.active .design-area').css('overflow', 'visible');
			$jd(e).addClass('drag-item-selected');
			$jd(e).css('border', '1px dashed #444444');
			
			if ($jd(e).resizable('option', 'disabled') == true)
				$jd(e).resizable({ disabled: false, handles: 'e' });
			
			if ($jd(e).draggable('option', 'disabled') == true)
				$jd(e).draggable({ disabled: false });
			
			design.popover('add_item_'+jQuery(e).data('type'));
			jQuery('.add_item_'+jQuery(e).data('type')).addClass('active');
			design.menu(jQuery(e).data('type'));
			this.update(e);
			this.printColor(e);
			design.layers.select(jQuery(e).attr('id').replace('item-', ''));
			jQuery(document).triggerHandler( "select.item.design", e);
		},
		unselect: function(e){
			$jd('#app-wrap .drag-item-selected').each(function(){
				$jd(this).removeClass('drag-item-selected');
				$jd(this).css('border', 0);	
				
				if ($jd(this).resizable('option', 'disabled') == false)
					$jd(this).resizable({ disabled: true, handles: 'e' });
				
				if ($jd(this).draggable('option', 'disabled') == false)
					$jd(this).draggable({ disabled: true });
			});
			jQuery('.labView.active .design-area').css('overflow', 'hidden');
			jQuery( ".popover" ).hide();
			jQuery('#layers li').removeClass('active');
			jQuery('#dg-popover .dg-options-toolbar button').removeClass('active');
			jQuery('#dg-popover .dg-options-content').removeClass('active');
			jQuery('#dg-popover .dg-options-content').children('.row').removeClass('active');
			jQuery(document).triggerHandler( "unselect.item.design", e);
		},
		remove: function(e){
			if (typeof e == 'undefined') return;
			e.parentNode.parentNode.removeChild(e.parentNode);
			var id = jQuery(e.parentNode).data('id');
			if($jd('#layer-'+id)) $jd('#layer-'+id).remove();
			jQuery( "#dg-popover" ).hide('slow');
			jQuery(document).triggerHandler( "remove.item.design", e);
			design.print.colors();
			design.print.size();
			design.ajax.getPrice();
			return;
		},
		setup: function(item){
			if(item.type == 'clipart')
			{
				jQuery('.popover-title').children('span').html(lang.text.clipart);
				
				/* color of clipart */
				var e = this.get();
				if(item.upload == 1)
				{
					e.addClass('drag-item-upload');
				}
				if (item.change_color == 1)
				{
					var colors = design.svg.getColors(e.children('svg'));				
				}
				if(typeof colors != 'undefined' && item.change_color == 1)
				{
					jQuery('#'+item.type+'-colors').css('display', 'block');
					jQuery('.btn-action-colors').css('display', 'block');
					var div = jQuery('#list-clipart-colors');
					div.html('');
					var c = [];
					for(var color in colors)
					{					
						if (color == 'none') continue;
						c.push(color);
						var a = document.createElement('a');
							a.setAttribute('class', 'dropdown-color');
							a.setAttribute('data-placement', 'top');
							a.setAttribute('data-original-title', lang.text.color);
							a.setAttribute('href', 'javascript:void(0)');
							a.setAttribute('data-color', color);
							a.setAttribute('style', 'background-color:'+color);
							jQuery.data(a, 'colors', colors[color]);
							a.innerHTML = '<span class="ui-accordion-header-icon ui-icon ui-icon-triangle-1-s"></span>';
							div.append(a);
					}
					item.colors = c;
				}
				else{
					jQuery('#'+item.type+'-colors').css('display', 'none');
					jQuery('.btn-action-colors').css('display', 'none');
				}
			}
			
			if(item.type == 'text'){
				jQuery('.popover-title').children('span').html(lang.text.text);
			}
			document.getElementById(item.type + '-rotate-value').value = 0;		
		
			jQuery('.dropdown-color').popover({
				html:true,				
				placement:'bottom',
				title:lang.text.color+' <a class="close" href="#">&times;</a>',
				content:function(){
					jQuery('.dropdown-color').removeClass('active');
					var html = jQuery('.other-colors').html();
					jQuery(this).addClass('active');					
					return '<div data-color="'+jQuery(this).data('color')+'" class="list-colors">' + html + '</div>';
				}				
			});
			
			jQuery('.dropdown-color').on('show.bs.popover', function () {
				var elm = this;
				jQuery('.dropdown-color').each(function(){
					if (elm != this)
					{
						jQuery(this).popover('hide');
					}
				});
			});
			jQuery('.dropdown-color').click(function (e) {				
				e.stopPropagation();
			});
			jQuery(document).click(function (e) {				
				jQuery('.dropdown-color').popover('hide');				
			});			
			jQuery('.dg-tooltip').tooltip();
			design.popover('add_item_'+item.type);
		},
		get: function(){
			var e = $jd('#app-wrap .drag-item-selected');
			return e;
		},
		refresh: function(name){
			var e = this.get();
			switch(name)
			{
				case 'rotate':				
					e.rotatable("setValue", 0);				
					break;
			}
		},		
		changeColor: function(e){
			
			var o 		= this.get(),
				color 	= jQuery(e).data('color'),
				a 		= jQuery('.dropdown-color.active');
			if (color == 'none')
			{
				jQuery(a).addClass('bg-none');
			}
			else
			{
				jQuery(a).removeClass('bg-none');
				jQuery(a).css('background-color', '#'+color);
			}
			jQuery(a).data('value', color);			
				
			if(o.data('type') == 'clipart'){
				var a = jQuery('#list-clipart-colors .dropdown-color.active');				
				design.art.changeColor(a, color);
				
				if (color == 'none')
					var hex = color;
				else
					var hex = '#' + color;
				design.svg.changeColor(o[0], a.data('index'), hex);
			}
			else if(o.data('type') == 'text'){
				design.text.update(a.data('label'), color);
			}
			else if(o.data('type') == 'team'){
				design.text.update(a.data('label'), '#'+color);
			}
			jQuery('.dropdown-color').popover('hide');
			design.print.colors();
			design.ajax.getPrice();			
			jQuery(document).triggerHandler( "after.item.changecolor", [o.data('type'), color]);
		},
		update: function(e){			
			var o = $jd(e),
				type = o.data('type'),
				css = e.style;
			
			/* rotate */
			if (typeof css == 'undefined')
				css = document.getElementById(jQuery(e).attr('id')).style;
			if( typeof jQuery(e).data('rotate') == 'undefined')
			{
				var deg = 0
			}
			else
			{
				var deg = jQuery(e).data('rotate');
			}
			
			/* width and height */
			$jd('#'+type+'-width').val(design.convert.px(css.width));
			$jd('#'+type+'-height').val(design.convert.px(css.height));
			
			switch(type){
				case 'clipart':
					design.art.update(e);
					break;
				case 'text':
					design.text.updateBack(e);
					break;
				case 'team':
					design.team.updateBack(e);
					break;
			}
			$jd('.rotate-value').val(deg);
		},
		updateSize: function(w, h){
			var e = design.item.get();
			if(e.length == 0) return false;
			var	svg = e.find('svg'),
				view = svg[0].getAttributeNS(null, 'viewBox'),
				width = svg[0].getAttributeNS(null, 'width'),
				height = svg[0].getAttributeNS(null, 'height');
			view = view.split(' ');				
			svg[0].setAttributeNS(null, 'width', w);
			svg[0].setAttributeNS(null, 'height', h);
			svg[0].setAttributeNS(null, 'viewBox', '0 0 '+ (w * view[2])/width +' '+ ((h * view[3])/height));
			
			jQuery(document).triggerHandler( "size.update.text.design", [w, h]);
			
			jQuery(e).css({'width':w+'px', 'height':h+'px'});
			design.print.size();
		}
	},
	layers:{
		select: function(index)
		{
			jQuery('#layers li').removeClass('active');
			jQuery('#layer-'+index).addClass('active');
			var o = jQuery('#item-'+index);
			if (o.hasClass('drag-item-selected') == false)
			{
				if (document.getElementById('item-'+index) != null)
				design.item.select(document.getElementById('item-'+index));
			}
		},
		setup: function(){
			jQuery('#layers').html('');
			jQuery('.labView.active .drag-item').each(function(){
				design.layers.add(this.item);
			});
			design.item.unselect();
		},
		add: function(item){
			var li 			= document.createElement('li');
				li.className 	= 'layer';
				li.id 		= 'layer-' + item.id;
			jQuery(li).bind('click', function(){
				design.layers.select(item.id);
			});
			if(item.type == 'text')
			{
				var name = item.text;
				if (name.length > 10)
					name = name.substring(0, 10);				
				var html = '<i class="glyphicons text_bigger glyphicons-12"></i> ';
				html = html + ' <span title="'+item.text+'">'+name+'</span>';
			}
			else if(item.type == 'team')
			{
				var name = item.text;
				if (name.length > 10)
					name = name.substring(0, 10);
				var html = '<i class="glyphicons soccer_ball glyphicons-small"></i> ';
				html = html + ' <span title="'+item.text+'">'+name+'</span>';
			}
			else
			{
				var name = item.title;
				if (name.length > 10)
					name = name.substring(0, 10);
				var html = '<img alt="" src="'+item.thumb+'">';
				html = html + ' <span title="'+item.title+'">'+name+'</span>';
			}
			
			
			html = html + '<div class="layer-action pull-right">'
						+ '<a class="dg-tooltip" title="" data-placement="top" data-toggle="tooltip" href="javascript:void(0)" data-original-title="'+lang.text.sort+'">'
						+ '<i class="glyphicons move glyphicons-small"></i>'
						+ '</a>';
			if (item.type != 'team')
			{
				html = html + '<a class="remove-layer" title="" onclick="design.layers.remove('+item.id+')" data-placement="top" data-toggle="tooltip" href="javascript:void(0)" data-original-title="'+lang.text.layer+'">'
						+ '<i class="glyphicons bin glyphicons-small"></i></a></div>';
			}
			
			li.innerHTML = html;
			jQuery('#layers').prepend(li);
			design.layers.select(item.id);
			jQuery(document).triggerHandler( "add.layers.design", [li, item]);
		},
		remove: function(id){
			var e = $jd('#item-'+id).children('.item-remove-on');
			$jd('#layer-'+id).remove();
			if (typeof e[0] != 'undefined')
			{
				design.item.remove(e[0]);
			}
			else
			{
				design.print.colors();
				design.print.size();
				design.ajax.getPrice();
			}
		},
		sort: function(){
			var zIndex = $jd('#layers .layer').length;
			$jd('#layers .layer').each(function(){
				var id = $jd(this).attr('id').replace('layer-', '');
				$jd('#item-'+id).css('z-index', zIndex);
				zIndex--;
			});
		}
	},
	tabs:{
		toolbar: function(e){
			$jd('ul.dg-panel li.panel').hide('slow');
			$jd('#'+e).show('slow');			
		}
	},
	menu: function(type){
		jQuery('.menu-left a').removeClass('active');		
		jQuery('.add_item_' + type ).addClass('active');
	},
	popover: function(e){
		jQuery('.dg-options').css('display', 'none');
		jQuery('#options-'+e).css('display', 'block');
		jQuery('.popover').css({'top': '40px', 'display':'block'});	
		
		var elm = jQuery('.menu-left .'+e);
		
		var index = jQuery('.menu-left li').index(jQuery('.menu-left .'+e).parent());
		var position = elm.position();
		if(typeof position != 'undefined')
		{
			var top = position.top - 20;
			jQuery('.popover .arrow').css('top', top + 'px');
		}
	},
	convert:{
		radDeg: function(rad){
			if(rad.indexOf('rotate') != -1)
			{
				var v = rad.replace('rotate(', '');
					v = v.replace('rad)', '');					
			}else{
				var v = parseFloat(rad);
			}
			
			var deg = ( v * 180 ) / Math.PI;
			
			if (deg < 0) deg = 360 + deg;
			return Math.round(deg);
		},
		px: function(value){
			if(typeof value == 'number') return value;
			if(typeof value == 'undefined') return 0;
			var px = value.replace('px', '');
			var px = parseFloat(value);
			return Math.round(px);
		}
	},
	upload:{
		computer: function()
		{
			if ( jQuery('#upload-copyright').length > 0 && jQuery('#upload-copyright').is(':checked') == false )
			{
				alert_text(lang.upload.terms);
				return false;
			}
			
			if (jQuery('#files-upload').val() == '')
			{
				alert_text(lang.upload.chooseFile);
				return false;
			}
			
			return true;
		}
	},
	svg:{
		iniColors: function(o){
			var i=0, colors = [], seft = this;
	
			var tags = ['defs', 'style', 'metadata', 'tspan'];
			var tags_default = ['path', 'polygon', 'circle', 'ellipse', 'polygon', 'polyline', 'text', 'text'];
			
			if (jQuery(o).find('style').length > 0)
			{
				var is_css = true;
				var style = jQuery(o).find('style');
				var css = style[0].innerHTML;
				if (typeof css != 'undefined')
					css = css.replace(' ', '');
				else
					css = '';
			}
			else
			{
				var is_css = false;
			}
			
			jQuery(o).find('*').each(function(){
				var tag = this.nodeName;
				if ( tags.indexOf(tag) == -1)
				{					
					var fill_added = false;
					var fill = jQuery(this).css('fill');
					if (fill != 'undefined')
					{
						var check = true;
						if (this.style.fill == '' && tags_default.indexOf(tag) == -1)
						{					
							check = is_css;
							if (is_css == true && typeof css != 'undefined')
							{
								var string = jQuery(this).attr('id');
								if (typeof string == 'undefined')
								{
									check = false;
								}
								else
								{
									if ( css.indexOf('#'+string+'{') == -1 )
									{
										check = false;
									}
								}
								
								var string = jQuery(this).attr('class');
								if (typeof string == 'undefined')
								{
									check = false;
								}
								else
								{
									var classs = string.split(' ');
									var check_css = false;
									for(j=0; j<classs.length; j++)
									{
										if ( css.indexOf('.'+classs[j]+'{') != -1 )
										{									
											check_css = true;
										}
									}
									check = check_css;
								}
							}
						}				
						
						if (check == true)
						{
							var color = parseColor(fill);
							var hex 	= color.hex;
							if (hex == 'none' || hex == 'NONE')
								hex = 'none';
							else
								hex 		= hex.toUpperCase();
							var n 		= colors.indexOf(hex);
							if (n == -1)
							{					
								seft.addClass(this, 'fill', i);
								colors[i] = hex;
								i++;
							}
							else
							{
								seft.addClass(this, 'fill', n);
							}
							fill_added = true;
						}			
					}
					
					if (fill_added == false)
					{
						var fill = jQuery(this).attr('fill');
						if (typeof fill != 'undefined' && fill != '')
						{			
							var color = parseColor(fill);
							var hex 	= color.hex;
							if (hex == 'none' || hex == 'NONE')
								hex = 'none';
							else
								hex 		= hex.toUpperCase();
							var n 		= colors.indexOf(hex);
							if (n == -1)
							{
								seft.addClass(this, 'fill', i);
								colors[i] = hex;
								i++;
							}
							else
							{
								seft.addClass(this, 'fill', n);
							}
						}
					}
					jQuery(this).removeAttr('fill');
					
					var stroke_added = false;
					
					var stroke = jQuery(this).css('stroke');
					if (typeof stroke != 'undefined' && stroke != 'none' && stroke != 'NONE' && stroke != '')
					{			
						var color = parseColor(stroke);
						var hex 	= color.hex;
						if (hex == 'none' || hex == 'NONE')
								hex = 'none';
							else
								hex 		= hex.toUpperCase();
						var n 		= colors.indexOf(hex);
						if (n == -1)
						{					
							seft.addClass(this, 'stroke', i);
							colors[i] = hex;
							i++;
						}
						else
						{
							seft.addClass(this, 'stroke', n);
						}
						stroke_added = true;
					}	
					
					if (stroke_added == false)
					{
						var stroke = jQuery(this).attr('stroke');
						if (typeof stroke != 'undefined' && stroke != 'none' && stroke != 'NONE' && stroke != '')
						{
							var color = parseColor(stroke);
							var hex 	= color.hex;
							if (hex == 'none' || hex == 'NONE')
								hex = 'none';
							else
								hex 		= hex.toUpperCase();
							var n 		= colors.indexOf(hex);
							if (n == -1)
							{
								seft.addClass(this, 'stroke', i);
								colors[i] = hex;
								i++;
							}
							else
							{
								seft.addClass(this, 'stroke', n);
							}
						}
					}
					jQuery(this).removeAttr('stroke');
					 
					if (jQuery(this).attr('style') != 'undefined')
					{
						jQuery(this).css('fill', '');
						jQuery(this).css('stroke', '');
					}
				}
			});
			
			this.addCss(o, colors);
			this.addFill(o, colors);			
			return colors;
		},
		addClass: function(o, txt, index){
			var id = jQuery(o).parents('.drag-item').attr('id');
			if (typeof id != 'undefined')
				txt = id +'-'+ txt;
			
			var str = jQuery(o).attr('class');
			if (typeof str != 'undefined')
			{
				jQuery(o).attr('class', str +' '+ txt + index);
			}
			else
			{
				jQuery(o).attr('class', txt + index);
			}
		},
		addCss: function(o, colors){
			var id = jQuery(o).parents('.drag-item').attr('id');
			if (typeof id != 'undefined')
				var txt = id +'-';
			else
				var txt = '';
			
			var style = jQuery(o).find('style'), newCss = '';
	
			jQuery.each(colors, function(i, color){
				newCss = newCss + '.'+txt+'fill'+i + '{fill:'+color+';}';
				newCss = newCss + '.'+txt+'stroke'+i + '{stroke:'+color+';}';
			});
			
			if (typeof style[0] != 'undefined')
			{				
				var css = '';
				style[0].textContent = css + newCss;
			}
			else
			{
				var svgNS 	= "http://www.w3.org/2000/svg",
					style 		= document.createElementNS(svgNS, 'style');
					style.setAttributeNS(null, 'type', 'text/css');
					
				var content 	= document.createTextNode(newCss);
					style.appendChild(content);
				o.appendChild(style);
			}
		},
		addFill: function(o, colors){
			var id = jQuery(o).parents('.drag-item').attr('id');
			if (typeof id != 'undefined')
				var txt = id+'-';
			else
				var txt = '';
	
			jQuery.each(colors, function(i, color){
				jQuery(o).parents('.drag-item').find('.'+txt+'fill'+i).each(function(){
					this.setAttribute('fill', color);
				});
				jQuery(o).parents('.drag-item').find('.'+txt+'stroke'+i).each(function(){
					this.setAttribute('stroke', color);
				});				
			});			
		},
		changeColor: function(e, index, color){
			var colors = e.item.colors;
			if (typeof colors == 'undefined') return false;		
			if (typeof colors[index] == 'undefined') return false;
				
			e.item.colors = colors;
			
			var id = jQuery(e).attr('id');
			if (typeof id != 'undefined')
				var txt = id +'-';
			else
				var txt = '';
			
			jQuery(e).find('.'+txt+'fill'+index).attr('fill', color);
			jQuery(e).find('.'+txt+'stroke'+index).attr('stroke', color);
			
			var style = jQuery(e).find('style');
			
			if (typeof style[0] != 'undefined')
			{
				var css = jQuery('<div>').append(jQuery(style[0]).clone()).text();
				
				var oldCss = '.'+txt+'fill'+index + '{fill:'+colors[index]+';}';
					oldCss = oldCss + '.'+txt+'stroke'+index + '{stroke:'+colors[index]+';}';
				
				var newCss = '.'+txt+'fill'+index + '{fill:'+color+';}';
				newCss = newCss + '.'+txt+'stroke'+index + '{stroke:'+color+';}';
				
				if (css.indexOf(oldCss) == -1)
				{
					css = css + newCss;
				}
				else
				{
					css = css.replace(oldCss, newCss);
				}
				
				style[0].textContent = css;
			}
			colors[index] = color;
		},
		getColors: function(e){
			var color = {};
			var colors = this.find(e, 'fill', color);
			colors	= this.find(e, 'FILL', colors);
			colors	= this.find(e, 'stroke', colors);
			colors	= this.find(e, 'STROKE', colors);
			return colors;
		},
		find: function(e, attribute, colors){
			e.find('*').each(function() {
				var color = jQuery(this).attr('fill');
				if(color == undefined && this.nodeName == 'path' && jQuery(this).parent()[0].nodeName != 'defs' && jQuery(this).parent()[0].nodeName != 'pattern')
				{
					jQuery(this).attr('fill', '#000000');
				}
			});
			e.find('['+attribute+']').each(function(){
				if(jQuery(this).attr('pattEle') == undefined)
				{
					var color = jQuery(this).attr(attribute);
					if(typeof colors[color] != 'undefined')
					{
						var n = colors[color].length;
						colors[color][n] = this;
						jQuery(this).attr('pattClass', color.replace('#', ''));
					}
					else{
						colors[color] = [];
						colors[color][0] = this;
						jQuery(this).attr('pattClass', color.replace('#', ''));
					}
					colors[color].type = attribute;
				}
			});
			return colors;
		},
		style: function(e){
			find('[style]').each(function(){
				var style = this.getAttributeNS(null, 'style');
				style = style.replace(' ', '');
				var attrs = style.split(';');
				for(i=0; i<attrs.length; i++)
				{
					var attribute = attrs[i].split(':');
					a[attribute[0]] = attribute[1];
				}
			});
		},
		items: function(postion, callback)
		{
			jQuery(document).triggerHandler( "start.canvas.design", postion);

			var function_name = '';
			if(typeof callback == 'function')
			{
				function_name = callback.name;
			}
			if(design.isIE() && function_name != 'thumb' && function_name != 'load_design_area')
			{
				design.createSvgthumb(postion, callback);
				return false;
			}
			if (jQuery('#view-'+postion+' .product-design img').length == 0)
			{
				if (typeof callback === "function"){
					callback();
				}
				return true;
			}
			var area 	= eval ("(" + items['area'][postion] + ")");
			var idActi  = jQuery('.labView.active').attr('id');
			jQuery('.labView').removeClass('active');
			jQuery('#view-' + postion).addClass('active');
			var desRect = jQuery('.labView.active .design-area .content-inner')[0].getBoundingClientRect();
			var tmpRect = {};
			var obj 	= [], i = 0;
			jQuery('#view-' +postion+ ' .design-area .drag-item').each(function(){
				obj[i] 			= {};
				obj[i].top 		= design.convert.px(jQuery(this).css('top'));
				obj[i].left 	= design.convert.px(jQuery(this).css('left'));
				obj[i].width 	= design.convert.px(jQuery(this).css('width'));
				obj[i].height 	= design.convert.px(jQuery(this).css('height'));
				obj[i].id    	= jQuery(this).attr('id');
				
				obj[i].type 	= jQuery(this).data('type');
				
				jQuery(document).triggerHandler( "item.canvas.design", [obj[i], this]);
								
				if(typeof jQuery(this).data('rotate') != 'undefined')
					obj[i].rotate = jQuery(this).data('rotate');
				else 
					obj[i].rotate = 0;
					
				var svg 		= jQuery(this).find('svg');				
				obj[i].svg 		= jQuery('<div></div>').html(jQuery(svg).clone()).html();
				var image 		= jQuery(svg).find('image');
				if (typeof image[0] == 'undefined')
				{
					obj[i].img 	= false;
				}
				else
				{
					obj[i].img 		= true;
					obj[i].flipX    = jQuery(this).data('flipX');
					var src 		= jQuery(image).attr('xlink:href');
					obj[i].src 		= src;				
				}
				obj[i].zIndex	= this.style.zIndex;
				i++;
				var itemRct = this.getBoundingClientRect();
				var itemT   = itemRct.top - desRect.top;
				var itemL   = itemRct.left - desRect.left;
				var itemB   = itemT + itemRct.height;
				if(itemB > (desRect.top + desRect.height))
				{
					itemB   = desRect.top + desRect.height;
				}
				var itemR   = itemL + itemRct.width;
				if(itemR > (desRect.left + desRect.width))
				{
					itemR   = desRect.left + desRect.width
				}
				if(i == 1)
				{
					tmpRect.top  = itemT;
					tmpRect.left = itemL;
					tmpRect.bott = itemB;
					tmpRect.rght = itemR;
				}
				else
				{
					if(itemT < tmpRect.top)
					{
						tmpRect.top  = itemT;
					}
					if(itemL < tmpRect.left)
					{
						tmpRect.left = itemL;
					}
					if(itemB > tmpRect.bott)
					{
						tmpRect.bott = itemB;
					}
					if(itemR > tmpRect.rght)
					{
						tmpRect.rght = itemR;
					}
				}
				tmpRect.area_w = area.width;
				tmpRect.area_h = area.height;
			});
			jQuery('#view-' + idActi).addClass('active');
			obj.sort(function(obj1, obj2) {	
				return obj1.zIndex - obj2.zIndex;
			});
			
			var canvas 			= document.createElement('canvas');
				canvas.width 	= area.width;
				canvas.height 	= area.height;
			var context = canvas.getContext('2d');
			
			var count = Object.keys(obj).length;
			
			if (area.radius == '50%')
			{
				var areaHight = parseInt(area.height);				
				var radius = areaHight / 2;				
			}
			else
			{
				var radius = design.convert.px(area.radius);
			}
			canvasLoad(obj, 0);
			function canvasLoad(obj, i)
			{
				if (typeof obj[i] != 'undefined')
				{
					var IE = /msie/.test(navigator.userAgent.toLowerCase());
					var IE11 = /trident/.test(navigator.userAgent.toLowerCase());
					var item = obj[i];
					i++;
					if (IE === true || IE11 == true)
					{
						item.svg = item.svg.replace(' xmlns:NS1=""', '');
						item.svg = item.svg.replace(' NS1:xmlns:xlink="http://www.w3.org/1999/xlink"', '');
						if (item.svg.split(' xmlns="').length > 2)
							item.svg = item.svg.replace(' xmlns="http://www.w3.org/2000/svg"', '');
					}				
					if (radius > 0)
					{
						context.save();
						var x = 0, 
							y = 0;
						var w = area.width;
						var h = area.height;
						var r = x + w;
						var b = y + h;
						context.beginPath();
						
						if (area.radius == '50%') 
						{
							if (w == h)
							{
								context.arc(radius, radius, radius, 0, 2 * Math.PI, false);
							}
							else
							{
								context.scale(w/h, 1);
								context.arc(radius, radius, radius, 0, 2 * Math.PI, false);
								context.scale(1/(w/h), 1);
							}
						}
						else
						{
							context.moveTo(x+radius, y);
							context.lineTo(r-radius, y);
							context.quadraticCurveTo(r, y, r, y+radius);
							context.lineTo(r, y+h-radius);
							context.quadraticCurveTo(r, b, r-radius, b);				
							context.lineTo(x+radius, b);
							context.quadraticCurveTo(x, b, x, b-radius);				
							context.lineTo(x, y+radius);
							context.quadraticCurveTo(x, y, x+radius, y);
						}
						
						
						context.closePath();
						context.clip();						
					}						
					if (item.rotate != 0)
					{
						context.save();
						context.translate(item.left, item.top);
						context.translate(item.width/2, item.height/2);
						context.rotate(item.rotate * Math.PI/180);
						item.left = (item.width/2) * -1;
						item.top = (item.height/2) * -1;
					}
					try {						
						if (item.img == true)
						{
							/*
							var flipFlg = '0';
							var images 	= new Image();
							jQuery(document).triggerHandler( "clipimage.canvas.design", [item, context]);
							if(item.flipX == false && item.src.indexOf('data:image/svg+xml') == -1)
							{
								context.save();
								context.translate(item.width, 0);
								context.scale(-1, 1);
								item.left = item.left * -1;
								flipFlg = '1';
							}
							images.onload = function() {
								context.drawImage(images, item.left, item.top, item.width, item.height);								
								context.restore();
								if(flipFlg == '1')
								{
									context.restore();
								}
								canvasLoad(obj, i);
							};
							var src = item.src;
							src = src.replace(siteURL, '');
							if(src.indexOf('http') == 0){
								src = siteURL +'image-tool/index.php?src='+ src;
							}
							else{
								src = item.src;
							}
							images.src = src;
							*/
							var src 	= item.src;
							src 		= src.replace(siteURL, '');
							if(src.indexOf('http') == 0){
								src = siteURL +'image-tool/index.php?src='+ src;
							}
							else{
								src = item.src;
							}
							var new_svg = item.svg;
							new_svg = new_svg.replace(item.src, src);
							var canvas_tem = document.createElement('canvas');
							canvas_tem.width = item.width;
							canvas_tem.height = item.height;
							canvg(canvas_tem, new_svg, {
								log: true,
								renderCallback: function(){
									context.drawImage(canvas_tem, item.left, item.top);
									context.restore();
									canvasLoad(obj, i);
								}
							});
						}
						else
						{
							var mySrc = 'data:image/svg+xml,'+encodeURIComponent(item.svg);
							var images 	= new Image();
							images.onload = function() {
								context.drawImage(images, item.left, item.top);
								context.restore();
								canvasLoad(obj, i);
							};
							images.src = mySrc;
						}
						
					}
					catch (e) 
					{
						if (e.name == "NS_ERROR_NOT_AVAILABLE") {}
					}					
				}
				else
				{		
					if(tmpRect.top < 0) tmpRect.top = 0;
					if(tmpRect.left < 0) tmpRect.left = 0;
					tmpRect.width  = tmpRect.rght - tmpRect.left;
					tmpRect.height = tmpRect.bott - tmpRect.top;
					design.tmpRect = tmpRect;
					design.svg.canvas(postion, canvas, callback);
				}
			}
			return canvas;
		},		
		canvas: function(postion, canvas1, callback){
			var area 	= eval ("(" + items['area'][postion] + ")");
			var color_active = jQuery('#product-list-colors span.active');
			var index	= jQuery('#product-list-colors span').index(color_active);
			var is_color_picker = 0;
			if(color_active.hasClass('bg-more-colors'))
			{
				index = 0;
				is_color_picker = 1;
			}
			var hex_color = design.exports.productColor();
			
			var canvas 			= document.createElement('canvas');
				canvas.width 	= max_box_width;
				canvas.height 	= max_box_height;
			var context = canvas.getContext('2d');
						
			design.output[postion] = canvas;
			
			var layers 	= eval ("(" + items["design"][index][postion] + ")");			
			var count = Object.keys(layers).length;
				count = parseInt(count) - 1;
			var z = layers[1].zIndex;
			var obj = [], j = 0;
			for (i= count; i> -1; i--)
			{
				obj[j] = layers[i];
				j++;
			}
			canvasLoad(obj, 0);
			function canvasLoad(obj, i)
			{
				if (typeof obj[i] != 'undefined')
				{
					var product_color = design.exports.productColor();

					var layer = obj[i];
					i++;
					
					if (layer.id != 'area-design')
					{
						var imageObj = new Image();
						var left 	= design.convert.px(layer.left);
						var top 	= design.convert.px(layer.top);
						var width 	= design.convert.px(layer.width);
						var height 	= design.convert.px(layer.height);
						if(is_color_picker == 1)
						{
							layer.is_change_color = 1;
						}
						imageObj.onload = function(){
							context.save();
							if(typeof layer.is_change_color != 'undefined' && layer.is_change_color == 1 && change_bg_product == 'img')
							{
								var temp_canvas = document.createElement('canvas');
								temp_canvas.width = imageObj.width;
								temp_canvas.height = imageObj.height;
								var temp_context = temp_canvas.getContext('2d');
								temp_context.rect(0, 0, imageObj.width, imageObj.height);
							      temp_context.fillStyle = '#'+product_color;
							      temp_context.fill();
							      temp_context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height);

							      context.drawImage(temp_canvas, left, top, width, height);
							}
							else
							{
								context.drawImage(imageObj, left, top, width, height);
							}
							context.restore();
							canvasLoad(obj, i);
						}
						imageObj.onerror = function(){
							canvasLoad(obj, i);
						}
						if (jQuery('#'+postion+'-img-'+layer.id).length > 0)
						{
							var thumb = jQuery('#'+postion+'-img-'+layer.id).attr('src');
						}
						else
						{
							var thumb = layer.img;
						}
						thumb = thumb.replace(siteURL, '');
						thumb = thumb.replace('//uploaded', '/uploaded');
						if (thumb.indexOf('http') != -1)
						{
							thumb = thumb.replace('http://', '');
							thumb = thumb.replace('https://', '');
							imageObj.src = siteURL +'image-tool/index.php?src='+ thumb +'&w='+width+'&h='+height;
						}
						else if (thumb.indexOf('data:image') != -1)
						{
							imageObj.src = thumb;
						}
						else
						{
							imageObj.src = siteURL+thumb;
						}							
					}
					else
					{
						var tmpRect 	= design.tmpRect;
						var left 		= design.convert.px(area.left);
						var top 		= design.convert.px(area.top);
						var can 		= document.createElement('canvas');
						var ctx1 		= can.getContext('2d');
						if(change_bg_product == 'area' && jQuery('#view-'+postion+' .content-inner').hasClass('is_change_color'))
						{
							var temp_canvas = document.createElement('canvas');
							temp_canvas.width = canvas1.width;
							temp_canvas.height = canvas1.height;
							var temp_context = temp_canvas.getContext('2d');
							temp_context.rect(0, 0, canvas1.width, canvas1.height);
							temp_context.fillStyle = '#'+product_color;
							temp_context.fill();
							context.drawImage(temp_canvas, left, top, canvas1.width, canvas1.height);
						}

						var options 	= {};
						jQuery(document).triggerHandler( "canvas_area.design", [postion, options, canvas1]);

						if(typeof options.effect != 'undefined' && typeof tmpRect.width != 'undefined' && tmpRect.width > 0)
						{
							var img_effect 	= canvas1.toDataURL();
							var ajax_url 	= siteURL + 'ajax.php?type=addon&task=effect&fn='+options.effect;
							jQuery.ajax({
								url: ajax_url,
								type: 'POST',
								data: {content: img_effect},
							})
							.done(function(htm_img) {
								var new_img = new Image();
								new_img.onload = function(){
									context.drawImage(new_img, left, top);

									if(tmpRect != undefined)
									{
										if(tmpRect.width > tmpRect.area_w)
										{
											tmpRect.width = tmpRect.area_w;
										}
										if(tmpRect.height > tmpRect.area_h)
										{
											tmpRect.height = tmpRect.area_h;
										}
										can.width  = tmpRect.width;
										can.height = tmpRect.height;					
										ctx1.drawImage(new_img, tmpRect.left, tmpRect.top, tmpRect.width, tmpRect.height, 0, 0, tmpRect.width, tmpRect.height);
										design.output[postion + 'nobg'] = can;
									}
									canvasLoad(obj, i);
								};
								new_img.onerror = function(){
									canvas_design();
								}
								new_img.src = 'data:image/png;base64,'+htm_img;
							})
							.fail(function() {
								canvas_design();
							});
						}
						else
						{
							canvas_design();
						}

						function canvas_design()
						{
							context.drawImage(canvas1, left, top);
							if(tmpRect != undefined)
							{
								if(tmpRect.width > tmpRect.area_w)
								{
									tmpRect.width = tmpRect.area_w;
								}
								if(tmpRect.height > tmpRect.area_h)
								{
									tmpRect.height = tmpRect.area_h;
								}
								can.width  = tmpRect.width;
								can.height = tmpRect.height;					
								ctx1.drawImage(canvas1, tmpRect.left, tmpRect.top, tmpRect.width, tmpRect.height, 0, 0, tmpRect.width, tmpRect.height);
								design.output[postion + 'nobg'] = can;
							}
							canvasLoad(obj, i);
						}
					}
				}
				else
				{
					jQuery(document).triggerHandler( "end.canvas.design", postion);
					if (typeof callback === "function") {
						callback(postion);
					}					
				}
			}
		}
	},
	saveDesign: function(){		
		if (design.view != 'done')
		{
			if (jQuery('#view-'+design.view+' .product-design').html() != '')
			{
				if (design.view == 'back')
				{
					design.view = 'left';
					design.svg.items('back', design.saveDesign);
					return false;
				}
				else if (design.view == 'left')
				{
					design.view = 'right';
					design.svg.items('left', design.saveDesign);
					return false;
				}
				else if (design.view == 'right')
				{
					design.view = 'done';
					design.svg.items('right', design.saveDesign);
					return false;
				}
			}
		}
		else
		{
			var leftViewFlg = true, rightViewFlg = true;
			if(jQuery('#view-left .product-design').html() == '')
			{
				leftViewFlg  = false;
			}
			if(jQuery('#view-right .product-design').html() == '')
			{
				rightViewFlg = false;
			}
			if(design.view == 'back')
			{
				if(leftViewFlg)
				{
					design.view = 'right';
					design.svg.items('left', design.saveDesign);
					return false;
				}
				else
				{
					if(rightViewFlg)
					{
						design.view = 'done';
						design.svg.items('right', design.saveDesign);
						return false;
					}
				}
			}
			else if(design.view == 'left')
			{
				if(rightViewFlg)
				{
					design.view = 'done';
					design.svg.items('right', design.saveDesign);
					return false;
				}
			}
		}
		var data = design.ajax.form();
		data.images = {};
		
		if (jQuery('#view-front .product-design').html() != '')
		{
			if(design.isIE())
			{
				data.images.front = design.front.svgThum;
			}
			else
			{
				data.images.front = design.output.front.toDataURL();
			}
		}
		else
		{
			data.images.front = '';
		}
		
		if (jQuery('#view-back .product-design').html() != '')
		{
			if(design.isIE())
			{
				data.images.back = design.back.svgThum;
			}
			else
			{
				data.images.back = design.output.back.toDataURL();
			}
		}
		else
		{
			data.images.back = '';
		}
		
		if (jQuery('#view-left .product-design').html() != '')
		{
			if(design.isIE())
			{
				data.images.left = design.left.svgThum;
			}
			else
			{
				data.images.left = design.output.left.toDataURL();
			}
		}
		else
		{
			data.images.left = '';
		}
		
		if (jQuery('#view-right .product-design').html() != '')
		{
			if(design.isIE())
			{
				data.images.right = design.right.svgThum;
			}
			else
			{
				data.images.right = design.output.right.toDataURL();
			}
		}
		else
		{
			data.images.right = '';
		}
		
		var vectors	= JSON.stringify(design.exports.vector());
		var teams = JSON.stringify(design.teams);
		var productColor = design.exports.productColor();
		
		var thumb = '';	
		if (data.images.front != '')
		{
			thumb = data.images.front;
		}
		else if(data.images.back != '')
		{
			thumb = data.images.back;
		}
		else if(data.images.left != '')
		{
			thumb = data.images.left;
		}
		else if(data.images.right != '')
		{
			thumb = data.images.right;
		}

		data.image			= thumb;
		data.vectors		= vectors;
		data.teams			= teams;
		data.fonts			= design.fonts;
		data.product_id		= product_id;
		data.parent_id		= parent_id;
		data.design_id		= design.design_id;
		data.design_file	= design.design_file;
		data.designer_id	= design.designer_id;
		data.design_key		= design.design_key;
		data.product_color	= productColor;	
		data.isIE			= design.isIE();
		data.title			= jQuery('#design-save-title').val();		
		data.description	= jQuery('#design-save-description').val();		
		
		jQuery(document).triggerHandler( "before.save.design", data);
		
		jQuery.ajax({
			url: siteURL + "ajax.php?type=saveDesign",
			type: "POST",
			contentType: 'application/json',
			data: JSON.stringify(data),
		}).done(function( msg ) {
			var results = eval ("(" + msg + ")");
			
			if (results.error == 1)
			{
				alert_text(results.msg);
			}
			else
			{
				design.design_id = results.content.design_id;
				design.design_file = results.content.design_file;
				design.designer_id = results.content.designer_id;
				design.design_key = results.content.design_key;
				design.productColor = productColor;
				design.product_id = product_id;
				
				results.content.productColor	= productColor;
				results.content.product_id		= product_id;
				var a = jQuery('#product-thumbs a');
				design.products.changeView(a[0], 'front');
				jQuery(document).triggerHandler( "done.save.design", results.content);
				if(typeof product_url == 'undefined')
				{
					var linkEdit 	= siteURL + 'sharing.php/'+results.content.user_id+':'+results.content.design_key+':'+product_id+':'+productColor+':'+parent_id;	
				}
				else
				{
					var linkEdit 	= product_url + results.content.user_id+':'+results.content.design_key+':'+product_id+':'+productColor+':'+parent_id;			
				}
				jQuery('#link-design-saved').val(linkEdit);
				jQuery('#dg-share').modal();					
			}
			
			jQuery('#dg-mask').css('display', 'none');
			jQuery('#dg-designer').css('opacity', '1');
		});		
	},
	save: function(check){
		if (design.ajax.isBlank() == false) return false;
		
		if (user_id == 0)
		{
			is_save = 1;
			jQuery('#f-login').modal();			
		}
		else
		{
			var view = 'front';
			jQuery('.labView').each(function() {
				if(jQuery(this).find('.product-design').html() != '')
				{
					view = jQuery(this).attr('id').replace('view-', '');
					return false;
				}
			});
			if (jQuery('.labView.active .design-area').hasClass('zoom'))
			{
				design.tools.zoom();
			}
			
			if (user_id == design.designer_id)
			{
				if(typeof admin_design_idea != 'undefined' && admin_design_idea == 1 && design.design_id != 0)
				{
					jQuery('#save-design-info').modal('hide');
					design.svg.items(view, design.saveDesign);
					return false;
				}
			
				if (typeof check != 'undefined' && check == 1)
				{
					jQuery('#save-design-info').modal('hide');
				}
				else
				{
					jQuery('#save-design-info').modal('show');
					return false;
				}
				
				jQuery( "#save-confirm" ).dialog({
					resizable: false,			  
					height: 200,
					width: 350,
					closeText: 'X',
					modal: true,
					buttons: [
						{
							text: lang.text.save_new,
							icons: {
								primary: "ui-icon-heart"
							},
							click: function() {
								jQuery( this ).dialog( "close" );
								design.design_id = 0;								
								design.design_key = '';
								design.design_file = '';
								
								jQuery('#dg-mask').css('display', 'block');
								jQuery('#dg-designer').css('opacity', '0.3');
								design.svg.items(view, design.saveDesign);							
							}
						},
						{
							text: lang.text.update,
							icons: {
								primary: "ui-icon-heart"
							},
							click: function() {
								jQuery( this ).dialog( "close" );
								jQuery('#dg-mask').css('display', 'block');
								jQuery('#dg-designer').css('opacity', '0.3');
								design.svg.items(view, design.saveDesign);
								
							}
						}
					]
				});
			}
			else
			{
				if (typeof check != 'undefined' && check == 1)
				{
					jQuery('#save-design-info').modal('hide');
					jQuery('#dg-mask').css('display', 'block');
					jQuery('#dg-designer').css('opacity', '0.3');
					design.svg.items(view, design.saveDesign);
				}
				else
				{
					jQuery('#save-design-info').modal('show');
				}
			}
		}
	},
	saveInfo: function(e){
		var email = jQuery('#login-email').val();
		var password = jQuery('#login-password').val();
		if (email == '')
		{
			alert_text(lang.text.email);
			return false;
		}
		
		if (password == '')
		{
			alert_text(lang.text.designid);
			return false;
		}
		
		
		var $btn = jQuery(e).button('loading');
		jQuery.ajax({
			url: siteURL + "ajax.php?type=user",
			type: "POST",			
			data: {email: email, password:password}
		}).done(function( msg ) {
			user_id = msg;
			jQuery('#f-login').modal('hide');
			$btn.button('reset');
			design.save();
		});
	},
	mask: function(load){
		if (load == true){
			jQuery('#dg-mask').css('display', 'block');
			jQuery('#dg-designer').css('opacity', '0.3');
		}
		else{
			jQuery('#dg-mask').css('display', 'none');
			jQuery('#dg-designer').css('opacity', '1');
		}
	},
	exports:{
		productColor: function(){
			var spans = jQuery('#product-list-colors span.bg-colors');
			var span_active  = jQuery('#product-list-colors span.active');
			if(span_active != undefined)
			{
				var color = span_active.data('color');
			}
			else if(spans[0] != undefined)
			{
				var color = jQuery(spans[0]).data('color');
			}
			else
			{
				var color = 'FFFFFF';
			}
			return color;
		},
		cliparts: function(){
			var arts = {};
			jQuery.each(['front', 'back', 'left', 'right'], function(i, view){
				var list = [];
				if (jQuery('#view-'+view +' .product-design').html().length > 10)
				{
					if (jQuery('#view-'+view+' .content-inner').html() != '')
					{
						jQuery('#view-'+view+' .drag-item').each(function(){
							if (typeof this.item.clipart_id != 'undefined')
								list.push(this.item.clipart_id);
						});
					}
					arts[view] = list;
				}
			});
			return arts;
		},
		vector: function(){
			var vectors = {};
			var postions = ['front', 'back', 'left', 'right'];
			jQuery.each(postions, function(i, postion){
				if (jQuery('#view-'+postion +' .product-design').html().length > 10)
				{					
					vectors[postion]	= design.exports.items('view-'+postion);
				}
			});
			
			return vectors;
		},
		items: function(postion){
			var i 	= 0;
			var vectors = {};
			jQuery('#'+ postion).find('.drag-item').each(function(){
				vectors[i] 		= {};
				var item 		= this.item;
				item.type		= this.item.type;
				item.width		= jQuery(this).css('width');
				item.height		= jQuery(this).css('height');
				item.top		= jQuery(this).css('top');
				item.left		= jQuery(this).css('left');
				item.zIndex		= jQuery(this).css('z-index');
				var svg 		= jQuery(this).find('svg').clone();
				jQuery(document).triggerHandler( "beforexports.item.design", [item, svg]);
				item.svg		= jQuery('<div></div>').html(jQuery(svg)).html();
				if (design.isIE())
				{
					var div     = document.createElement('div');
					var clone   = jQuery(svg).clone();
					clone.find('*').each(function() {
						if(this.nodeName == 'sodipodi:namedview')
						{
							jQuery(this).remove();
						}
						var attributeElement = this;
						var attLst = this.attributes;
						var removeArr = [];
						for(j = 0; j < attLst.length; j++) {
							var attr = attLst[j];
							if(attr.name.toLowerCase().indexOf('inkscape:') != -1 
								|| attr.name.toLowerCase().indexOf('xmlns:ns') != -1
								|| attr.name.toLowerCase().indexOf('ns1:') != -1
								|| attr.name.toLowerCase().indexOf('ns2:') != -1
								|| attr.name.toLowerCase().indexOf('ns3:') != -1
								|| attr.name.toLowerCase().indexOf('ns4:') != -1
								|| attr.name.toLowerCase().indexOf('ns5:') != -1
								|| attr.name.toLowerCase().indexOf('ns6:') != -1
								|| attr.name.toLowerCase().indexOf('ns7:') != -1
								|| attr.name.toLowerCase().indexOf('sodipodi:') != -1)
							{
								removeArr.push(attr.name);
							}
						}
						jQuery(removeArr).each(function() {
							attributeElement.removeAttribute(this);
						});
					});
					var w       = jQuery(svg[0]).attr('width');
					var h       = jQuery(svg[0]).attr('height');
					var viewB   = clone[0].getAttributeNS(null, 'viewBox');
					if(viewB == undefined)
					{
						viewB = '';
					}
					else
					{
						viewB = 'viewBox="' + viewB + '"';
					}
					var pA = clone[0].getAttributeNS(null, 'preserveAspectRatio');
					if(pA == undefined)
					{
						pA = 'none';
					}
					var svgHtml = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" preserveAspectRatio="'+pA+'" '+viewB+' width="'+w+'" height="'+h+'">';
					clone.children().each(function() {
						jQuery(div).append(this);
					});
					svgHtml += jQuery(div).html();
					svgHtml += '</svg>';
					item.svg = svgHtml;
				}
				if (jQuery(this).data('rotate') != 'undefined')
					item.rotate	= jQuery(this).data('rotate');
				else
					item.rotate	= 0;
									
				if (item.type == 'text' || item.type == 'team')
				{
					item.text					= this.item.text;
					item.color					= this.item.color;
					item.fontFamily				= this.item.fontFamily;
					item.align					= this.item.align;
					item.outlineC				= this.item.outlineC;
					item.outlineW				= this.item.outlineW;
					if (typeof this.item.weight != 'undefined')
						item.weight 			= this.item.weight;
					
					if (typeof this.item.Istyle != 'undefined')
						item.Istyle 			= this.item.Istyle;
						
					if (typeof this.item.decoration != 'undefined')
						item.decoration 		= this.item.decoration;
				}
				else if(item.type == 'clipart')
				{
					item.change_color	= this.item.change_color;
					item.title			= this.item.title;
					item.file_name		= this.item.file_name;
					item.file			= this.item.file;
					item.thumb			= this.item.thumb;
					item.url			= this.item.url;							
					
					if (typeof this.item.colors != 'undefined')
						item.colors			= this.item.colors;
					
					if (typeof this.item.confirmColor != 'undefined')
						item.confirmColor	= this.item.confirmColor;
					else
						item.confirmColor = 0;
					
					if(typeof this.item.clipart_id != 'undefined'){item.clipart_id = this.item.clipart_id;}
				}
				jQuery(document).triggerHandler( "exports.item.design", [item, this]);
				
				vectors[i] = item;
				i++;
			});
			return vectors;
		}
	},
	imports:{
		vector: function(str){
			if (str == '') return false;
			
			var postions = {front:0, back:1, left:2, right:3};
			var a 		 = document.getElementById('product-thumbs').getElementsByTagName('a');
			if(typeof str == 'string')
			{
				str = str.replace('{ front":{', '{"front":{');
				try{
					var vectors = eval('('+str+')');
				}
				catch (e){
					var vectors = jQuery.parseJSON(str);
				}
			}
			else
			{
				var new_str = JSON.stringify(str);
				var str = new_str.replace(/\\\\/g, "");
				var vectors = eval('('+str+')');
			}
			jQuery.each(vectors, function(postion, view){
				if ( Object.keys(view).length > 0 && jQuery('#view-'+postion+' .product-design').html() != '' )
				{
					var items = [];
					jQuery.each(view, function(i, item){
						items[i] = item;
					});
					items.sort(function(obj1, obj2) {
						return obj1.zIndex - obj2.zIndex;
					});
					design.products.changeView( a[postions[postion]], postion );			
					jQuery.each(items, function(i, item){
						design.item.imports(item);						
					});
				}
			});
			design.team.changeView();
			design.item.unselect();
			setTimeout(function(){
				var markAll = jQuery('.labView.active .mask-items-view .mask-all-item');
				if(markAll.length == 0)
				{
					var a = jQuery('#product-thumbs a');
					if(design.importIdeaFlg != 1)
					{
						a[0].click();
					}
				}
				jQuery('.drag-item').removeClass('add-by-import');
				design.importIdeaFlg = 0;
			}, 1000);
		},
		productColor: function(color){
			design.mask(true);
			var i = 0;
			jQuery('#product-list-colors .bg-colors').each(function(){
				if(jQuery(this).data('color') == color)
				{
					design.products.changeColor(this, i);
					design.mask(false);
				}
				i++;
			});
			design.mask(false);
		},
		loadDesign: function(key, user_id){
			design.mask(true);
			var self = this;
			
			jQuery.ajax({
				dataType: "json",
				url: siteURL + "ajax.php?type=loadDesign&user_id="+user_id+"&design_id="+key		
			}).done(function( data ) {
				if (data.error == 1)
				{
					alert_text(data.msg);
				}
				else
				{
					design.design_id 	= data.design.id;
					design.design_file 	= data.design.image;
					design.designer_id 	= data.design.user_id;
					design.design_key 	= data.design.design_id;
					design.fonts 		= data.design.fonts;
					jQuery('#design-save-title').val(data.design.title);
					jQuery('#design-save-description').val(data.design.description);
					if (design.fonts != '')
					{
						jQuery('head').append(design.fonts);
					}
					if (typeof data.design.vectors != 'undefined')
						self.vector(data.design.vectors);
					if (typeof data.design.vector != 'undefined')
						self.vector(data.design.vector);
					if (typeof data.design.teams != 'undefined' && data.design.teams != '')
					{
						design.teams = eval ("(" + data.design.teams + ")");
						design.team.load(design.teams);
					}
					
					jQuery(document).triggerHandler( "after.load.design", data);
					
					design.ajax.getPrice();
				}
			}).always(function(){
				design.mask(false);
			});
		}
	},
	share:{
		ini: function(type)
		{
			jQuery(document).on('before.save.design', function(event, data){
				data.is_share = 1;
			});
			design.mask(true);
			jQuery(document).triggerHandler( "start.save.design");
			design.svg.items('front', design.saveDesign);
		},		
		facebook: function(){
			var link = jQuery('#link-design-saved').val();			
			link = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURI(link);
			window.open(link, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
		},
		twitter: function(){
			var link = jQuery('#link-design-saved').val();
			if (link != '')
			{
				link = 'https://twitter.com/home?status='+lang.share.title+' '+encodeURI(link);
			}
			window.open(link, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
		},
		pinterest: function(){
			var link = jQuery('#link-design-saved').val();
			if (link != '')
			{				
				link = 'https://pinterest.com/pin/create/button/?url='+link+'&media='+siteURL + design.design_file +'&description='+lang.share.title;
			}
			window.open(link, "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
		},
		copyURL: function(){
			var input = jQuery('#link-design-saved');
			input[0].select();
			document.execCommand("Copy");
  			jQuery('.copy-status').show();
  			setTimeout(function(){
  				jQuery('.copy-status').hide();
  			}, 2000);
		}
	}
}

$jd(document).ready(function(){
	design.ini();
	
	$jd('#design-area').click(function(e){
		var topCurso=!document.all ? e.clientY: event.clientY;
		var leftCurso=!document.all ? e.clientX: event.clientX;
		var mouseDownAt = document.elementFromPoint(leftCurso,topCurso);
		if( mouseDownAt.parentNode.className == 'product-design'
			|| mouseDownAt.parentNode.className == 'div-design-area'			
			|| mouseDownAt.parentNode.className == 'labView active'
			|| mouseDownAt.parentNode.className == 'content-inner' )
		{
			jQuery('.drag-item').removeClass('add-by-import');
			if(typeof design.mobile != 'undefined')
			{
				design.mobile.unselectItemDesign();
			}
			else
			{
				design.item.unselect();
			}
			e.preventDefault();
			$jd('.drag-item').click(function(){design.item.select(this)});
		}
	});
});

function alert_text(msg){
	var text = msg.replace(/&#39;/g, "\'");
	alert(text);
}
function confirm_text(msg){
	var text = msg.replace(/&#39;/g, "\'");
	var check = confirm(text);
	return check;
}

function b64EncodeUnicode(str) {	
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

// setCookie('name', 'value', days)
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function parseColor(color) {
	var arr = [];
	
	if (color == 'none')
	{
		arr.hex = 'none';
		return arr;
	}
	
	var Obj = new RGBColor(color);
	if (Obj.ok)
	{
		arr.hex = Obj.toHex();
	}
	else
	{
		arr.hex = 'none';
	}
	return arr;
}

(function($){
    $.fn.serializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);

function scrollQuantity(){
	var pos = jQuery('#tool_cart').find('.p-color-sizes').position();
	if(typeof pos != 'undefined')
	{
		jQuery('#tool_cart .p-color-sizes').find('input').css('border', '1px solid #ff0000');
		jQuery('#product-details').animate({ scrollTop: 0}, 0);
		pos = jQuery('#tool_cart').find('.p-color-sizes').position();
		jQuery('#product-details').animate({ scrollTop: pos.top}, 1000);
	}else
	{
		pos = jQuery('#tool_cart').find('.product-quantity').position();
		if(typeof pos != 'undefined')
		{
			jQuery('#quantity').css('border', '1px solid #ff0000');
			jQuery('#product-details').animate({ scrollTop: 0}, 0);
			pos = jQuery('#tool_cart').find('.product-quantity').position();
			jQuery('#product-details').animate({ scrollTop: pos.top}, 1000);
		}
	}
};

function appMinify()
{
	setTimeout(function(){
		getFilesCSS();
	}, 2000);
	setTimeout(function(){
		getFilesJS();
	}, 4000);
}
function createCache(files, is_admin, type)
{
	var posts = {admin: is_admin, type: type};
	if(files.length > 0)
	{
		posts.files = files;
	}
	if(typeof design.mobile != 'undefined')
	{
		posts.extra = 'mobile';
	}
	else if(typeof is_admin_editor != 'undefined' && type == 'js')
	{
		posts.extra = 'admin';
	}
	jQuery.post(siteURL+'admin/index.php?/cache/create', posts, function(data, textStatus, xhr) {
		if(data === 'load')
		{
			createCache([], is_admin, type);
		}
	});
}
function getFilesJS()
{
	var files = [], i=0;
	jQuery('head script.minify-file').each(function(){
		var url 	= jQuery(this).attr('src');
		if(url != undefined)
		{
			if(url.indexOf('/tshirtecommerce/') > 0)
			{
				var option = url.split('/tshirtecommerce/');
				files[i] = option[1];
				i++;
			}
		}
	});
	if(files.length > 0)
	{
		createCache(files, 0, 'js');
	}
}
function getFilesCSS()
{
	var files = [], i=0;
	jQuery('head link.minify-file').each(function(){
		var url 	= jQuery(this).attr('href');
		if(url.indexOf('/tshirtecommerce/') > 0)
		{
			var option = url.split('/tshirtecommerce/');
			files[i] = option[1];
			i++;
		}
	});
	if(files.length > 0)
	{
		createCache(files, 0, 'css');
	}
}

jQuery(function() {
	appMinify();
    jQuery(".arrow-mobile").click(function() {
        var e = jQuery(this).attr("data");
        var t = jQuery("#dg-" + e).css("display");
        if (e == "right") {
            if (t == "none") {                
                jQuery("#dg-right").show();
                jQuery(this).addClass('active').css({
                    left: "-28px",
                    right: "auto"
                });
				jQuery(this).parent().css({
					'bottom': 'auto',
					'top': '60px'
				});
                jQuery(".accordion").accordion("refresh")
            } else {              
                jQuery("#dg-right").hide();
                jQuery(this).removeClass('active').css({
                    left: "auto",
                    right: "4px"
                });
				jQuery(this).parent().css({
					'bottom': '60px',
					'top': 'auto'
				});
            }
        }
        if (e == "left") {
            if (t == "none") {
                jQuery(this).children("i").attr("class", "glyphicons chevron-left");
                jQuery("#dg-left").show();
                jQuery(this).css({
                    left: "auto",
                    right: "-32px"
                });
                jQuery(".accordion").accordion("refresh")
            } else {
                jQuery(this).children("i").attr("class", "glyphicons chevron-right");
                jQuery("#dg-left").hide();
                jQuery(this).css({
                    left: "0",
                    right: "auto"
                })
            }
        }
    })
});

function gridArt(elem)
{
	var e = jQuery(elem);
	e.isotope({
		itemSelector: '.box-art',
		percentPosition: true,
		masonry: {
			columnWidth: '.box-art'
		}
	});

	e.find('img').on('load', function(){
		var e = jQuery(elem);
		e.isotope( 'reloadItems' ).isotope();
	});
}