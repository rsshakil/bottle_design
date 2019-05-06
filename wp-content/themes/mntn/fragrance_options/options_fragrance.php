<?php
global $fr_mainTabs, $fr_themename, $fr_shortname, $fr_options, $fr_add_google_fonts, $fr_list_texture_urls, $fr_header_layout, $fr_service_count;

$fr_textdomain = 'mntn';

$fr_mainTabs = array('general', 'head', 'home-slider', 'home-video', 'footer', 'tools');

$cats_array = get_categories('hide_empty=0');
$pages_array = get_pages('hide_empty=0');
$pages_number = count($pages_array);

$site_pages = array();
$site_cats = array();
$pages_ids = array();
$cats_ids = array();

foreach ($pages_array as $pagg) {
	$site_pages[$pagg->ID] = htmlspecialchars($pagg->post_title);
	$pages_ids[] = $pagg->ID;
}

foreach ($cats_array as $categs) {
	$site_cats[$categs->cat_ID] = $categs->cat_name;
	$cats_ids[] = $categs->cat_ID;
}

$fr_add_google_fonts = apply_filters( 'fr_add_google_fonts', array('Colaborate Thin', 'Kreon','Droid Sans','Droid Serif','Lobster','Yanone Kaffeesatz','Nobile','Crimson Text','Arvo','Tangerine','Cuprum','Cantarell','Philosopher','Josefin Sans','Dancing Script','Raleway','Bentham','Goudy Bookletter 1911','Quattrocento','Ubuntu','PT Sans','Arimo','Bevan','Bigshot One','Yeseva One' ,'Abel', 'Oswald', 'Open Sans', 'Dosis', 'Dorsa', 'Bree Serif', 'Pacifico', 'PT Sans Narrow','Lato' ,'Molengo', 'Trocchi', 'Lusitana', 'Brawler', 'Patua One' ,'Alegreya SC' ,'Alike', 'Gentium Basic','Rokkitt' ,'Ovo', 'Georgia', 'Museo Slab', 'Brandon', 'Muli') );
sort($fr_add_google_fonts);

$fr_header_layout = array(esc_html__('Fullscreen Image','mntn'), esc_html__('Fullscreen Slider','mntn'), esc_html__('Video Background','mntn'));

$fr_service_count = array(esc_html__('3','mntn'), esc_html__('6','mntn'));

$fr_options = array (

	array( "name" => "wrap-general",
		   "type" => "contenttab-wrapstart",),

		array( "type" => "subnavtab-start",),

			array( "name" => "general-1", "type" => "subnav-tab", "desc" => esc_html__("General Options",'mntn')),

		array( "type" => "subnavtab-end",),

		array( "name" => "general-1",
			   "type" => "subcontent-start",),
			   			
			array( "name" => esc_html__("Small Logo", "mntn"),
				   "id" => "FR_SITE_LOGO_SMALL",
				   "type" => "upload",
				   "std" => "",
				   "desc" => esc_html__("Upload here your logo image which will be displayed in the menu when scrolling. Size is not more 70x27", "mntn")
			),

			array( "name" => esc_html__("Favicon", "mntn"),
				   "id" => "FR_FAVICON",
				   "type" => "upload",
				   "std" => "",
				   "desc" => esc_html__("Upload the image size of 16x16 that will be used as favicon.", "mntn")
			),
										   
			array( "name" => esc_html__("Header Font", "mntn"),
				   "id" => $fr_shortname."_HEADER_FONT",
				   "type" => "select",
				   "std" => "Lato",
				   "options" => $fr_add_google_fonts,
				   "desc" => ""
			),
				   
			array( "name" => esc_html__("Body Font", "mntn"),
				   "id" => $fr_shortname."_BODY_FONT",
				   "type" => "select",
				   "std" => "Lato",
				   "options" => $fr_add_google_fonts,
				   "desc" => ""
			),

			array( "type" => "clearfix",),

		array( "name" => "general-1",
			   "type" => "subcontent-end",),


	array(  "name" => "wrap-general",
			"type" => "contenttab-wrapend",),

//-------------------------------------------------------------------------------------//

array( "name" => "wrap-head",
		   "type" => "contenttab-wrapstart",),
		   
	array( "type" => "subnavtab-start",),

			array( "name" => "head",
				   "type" => "subnav-tab",
				   "desc" => esc_html__("Header", "mntn")
			),
		
		array( "name" => esc_html__("Display Header Section", "mntn"),
			   "id" => "FR_HEADER_SECTION",
			   "type" => "checkbox",
			   "std" => "on",
			   "desc" => ""
			),
		
		array( "name" => esc_html__("Choose header layout", "mntn"),
			   "id" => "FR_HEADER_LAYOUT",
			   "std" => "Fullscreen Image",
			   "type" => "select",
			   "options" => $fr_header_layout,
				"desc" => "The default layout is the 'Fullscreen Image' setting for it below. For other layout settings in the appropriate sections 'Header with Slider' and 'Header with Video'"
			),
		
		array( "name" => esc_html__("Name of 'Header' Section", "mntn"),
			   "id" => "FR_HEADER_SECTION_NAME_MENU",
			   "std" => 'Home',
			   "type" => "text",
			   "desc" => esc_html__("Here you can specify the name for the section", "mntn")
		),
		
		array( "name" => esc_html__("Slogan in Header", "mntn"),
		   "id" => "FR_HEADER_SECTION_SLOGAN",
		   "std" => 'Responsive Flat HTML5/CSS3 WP Theme',
		   "type" => "text",
		   "desc" => esc_html__("Here you can enter your slogan or whatever you want", "mntn")
		),
		
		array( "name" => esc_html__("Description in Header", "mntn"),
		   "id" => "FR_HEADER_SECTION_DESC",
		   "std" => 'Be in style',
		   "type" => "textarea",
		   "desc" => esc_html__("", "mntn")
		),
		
		array( "name" => esc_html__("Text of link", "mntn"),
		   "id" => "FR_HEADER_SECTION_LINK_TEXT",
		   "std" => 'Purchase now',
		   "type" => "text",
		   "desc" => esc_html__("If you leave this field blank, the button will not be shown", "mntn")
		),
		
		array( "name" => esc_html__("Link address", "mntn"),
		   "id" => "FR_HEADER_SECTION_LINK_ADDRESS",
		   "std" => 'http://www.google.com',
		   "type" => "text",
		   "desc" => esc_html__("", "mntn")
		),
		
			
		array( "name" => esc_html__("Background Image", "mntn"),
			   "id" => "FR_HEADER_BG_IMAGE",
			   "type" => "upload",
			   "std" => "",
			   "desc" => esc_html__("Here you can upload your own image for the section", "mntn")
		),
		
		array( "name" => esc_html__("Background Color", "mntn"),
			   "id" => "FR_HEADER_BG_COLOR",
			   "type" => "textcolorpopup",
			   "std" => "",
			   "desc" => esc_html__("Here you can set the background color using the palette", "mntn")
		 ),
		 
		 array( "name" => esc_html__("Font Color", "mntn"),
			   "id" => "FR_HEADER_FONT_COLOR",
			   "type" => "textcolorpopup",
			   "std" => "",
			   "desc" => esc_html__("Here you can set the background color using the palette", "mntn")
		 ),

		array( "type" => "subnavtab-end",),
		
		array( "name" => "head",
			   "type" => "subcontent-start",),
			   
		array( "name" => "head",
			   "type" => "subcontent-end",),
	
	array( "name" => "wrap-head",
		   "type" => "contenttab-wrapend",),

//-------------------------------------------------------------------------------------//
array( "name" => "wrap-home-slider",
		   "type" => "contenttab-wrapstart",),
		   
	array( "type" => "subnavtab-start",),

			array( "name" => "home-slider",
				   "type" => "subnav-tab",
				   "desc" => esc_html__("Header with Slider", "mntn")
			),

		array( "type" => "subnavtab-end",),
		
		array( "name" => "home-slider",
			   "type" => "subcontent-start",),

			array( "type" => "clearfix",),

			array( "name" => esc_html__("Slider Category", "mntn"),
                   "id" => "HOME_SLIDER_CATEGORY",
                   "type" => "select",
			       "options" => $site_cats,
				   "desc" => esc_html__("Here you can choose which category to be used for the Slider on the homepage.", "mntn")
			),

			array( "name" => esc_html__("Number of Slides", "mntn"),
                   "id" => "HOME_SLIDES_COUNT",
                   "std" => "4",
                   "type" => "text",
				    "desc" => ""
			),

			array( "type" => "clearfix",),
				   				   
			array( "name" => esc_html__("Automatic Slider Animation", "mntn"),
                   "id" => "FR_SLIDER_AUTO",
                   "type" => "checkbox",
                   "std" => "false",
                   "desc" => esc_html__("Enable auto flipping slides", "mntn")
			),
				   				   
			array( "type" => "clearfix",),

			array( "name" => esc_html__("Automatic Animation Speed", "mntn"),
                   "id" => "FR_SLIDER_AUTOSPEED",
                   "type" => "text",
			       "std" => "7000",
				   "desc" => esc_html__("Speed of slides transitions, set in milliseconds", "mntn")
			),
			   
		array( "name" => "home-slider",
			   "type" => "subcontent-end",),
			   
			   

	array( "name" => "wrap-home-slider",
		   "type" => "contenttab-wrapend",),
//-------------------------------------------------------------------------------------//

array( "name" => "wrap-video",
		   "type" => "contenttab-wrapstart",),
		   
	array( "type" => "subnavtab-start",),

			array( "name" => "home-video",
				   "type" => "subnav-tab",
				   "desc" => esc_html__("Header with Video Background", "mntn")
			),

		array( "type" => "subnavtab-end",),
		
		array( "name" => "home-video",
			   "type" => "subcontent-start",),

			array( "type" => "clearfix",),
			
			array( "name" => esc_html__("YouTube Video URL", 'mntn'),
			   "id" => "FR_HEADER_VIDEO_URL",
			   "std" => 'http://www.youtube.com/watch?v=tDvBwPzJ7dY',
			   "type" => "text",
			   "desc" => esc_html__("", "mntn")
			),

			array( "name" => esc_html__("Slider Category", "mntn"),
                   "id" => "VIDEO_SLIDER_CATEGORY",
                   "type" => "select",
			       "options" => $site_cats,
				   "desc" => esc_html__("Here you can choose which category to be used for the Slider on the homepage.", "mntn")
			),

			array( "name" => esc_html__("Number of Slides", "mntn"),
                   "id" => "VIDEO_SLIDES_COUNT",
                   "std" => "4",
                   "type" => "text",
				    "desc" => ""
			),

			   
		array( "name" => "home-video",
			   "type" => "subcontent-end",),
			   
			   

	array( "name" => "wrap-video",
		   "type" => "contenttab-wrapend",),
//-------------------------------------------------------------------------------------//

array( "name" => "wrap-footer",
		   "type" => "contenttab-wrapstart",),
		   
	array( "type" => "subnavtab-start",),

			array( "name" => "footer",
				  "type" => "subnav-tab",
				  "desc" => esc_html__("'Call to Action' Area and Footer", "mntn")
			),
			
		array( "type" => "hint",
			"desc" => esc_html__("'Call to Action' Area Section Settings", "mntn")
		),
				
		array( "name" => esc_html__("Display 'Call to Action' Area Section", "mntn"),
		   "id" => "FR_CALL_TO_ACTION",
		   "type" => "checkbox",
		   "std" => "on",
		   "desc" => esc_html__("", "mntn")
		),
		
		array( "name" => esc_html__("Background Color of 'Call to Action' Area", "mntn"),
			   "id" => "FR_CALL_TO_ACTION_COLOR",
			   "type" => "textcolorpopup",
			   "std" => "",
			   "desc" => esc_html__("Here you can set the background color using the palette", "mntn")
		 ),
		 
		 array( "name" => esc_html__("Font Color", "mntn"),
			   "id" => "FR_CALL_TO_ACTION_FONT_COLOR",
			   "type" => "textcolorpopup",
			   "std" => "",
			   "desc" => esc_html__("Here you can set the font color using the palette", "mntn")
		 ),
		
		array( "name" => esc_html__("'Call to Action' Area Name", "mntn"),
		   "id" => "FR_CALL_TO_ACTION_TEXT",
		   "std" => 'Call to action area',
		   "type" => "text",
		   "desc" => esc_html__("", "mntn")
		),
		
		array( "name" => esc_html__("'Call to Action' Area Text", "mntn"),
		   "id" => "FR_CALL_TO_ACTION_TEXT_SMALL",
		   "std" => 'Like it?',
		   "type" => "text",
		   "desc" => esc_html__("", "mntn")
		),
		
		array( "name" => esc_html__("'Call to Action' Button Name", "mntn"),
		   "id" => "FR_CALL_TO_ACTION_BUTTON_NAME",
		   "std" => 'Purchase now',
		   "type" => "text",
		   "desc" => esc_html__("", "mntn")
		),
		
		array( "name" => esc_html__("'Call to Action' Button Link address", "mntn"),
		   "id" => "FR_CALL_TO_ACTION_LINK_ADDRESS",
		   "std" => 'https://www.google.com',
		   "type" => "text",
		   "desc" => esc_html__("", "mntn")
		),
		
		array( "type" => "hint",
			"desc" => esc_html__("Footer Settings", "mntn")
		),
		
		array( "name" => esc_html__("Background Color of Footer", "mntn"),
			   "id" => "FR_FOOTER_BG_COLOR",
			   "type" => "textcolorpopup",
			   "std" => "",
			   "desc" => esc_html__("Here you can set the background color using the palette", "mntn")
		 ),
		 
		 array( "name" => esc_html__("Footer Font Color", "mntn"),
			   "id" => "FR_FOOTER_FONT_COLOR",
			   "type" => "textcolorpopup",
			   "std" => "",
			   "desc" => esc_html__("Here you can set the font color using the palette", "mntn")
		 ),
		 
		 array( "name" => esc_html__("Text of Footer", "mntn"),
		   "id" => "FR_FOOTER_TEXT",
		   "std" => 'Designed by Fragrance Design © 2014',
		   "type" => "text",
		   "desc" => esc_html__("", "mntn")
		),

		array( "type" => "subnavtab-end",),
		
		array( "name" => "footer",
			   "type" => "subcontent-start",),
			   
		array( "name" => "footer",
			   "type" => "subcontent-end",),
	
	array( "name" => "wrap-footer",
		   "type" => "contenttab-wrapend",),

//-------------------------------------------------------------------------------------//

array( "name" => "wrap-tools",
		   "type" => "contenttab-wrapstart",),
		   
	array( "type" => "subnavtab-start",),

			array( "name" => "tools",
				   "type" => "subnav-tab",
				   "desc" => esc_html__("Advanced Tools", "mntn")
			),

		array( "type" => "subnavtab-end",),
		
		array( "name" => "tools",
			   "type" => "subcontent-start",),
			   
			    array( "name" => esc_html__("Add meta keywords", "mntn"),
				   "id" => "FR_META_KEYWORDS",
				   "type" => "textarea",
				   "std" => "",
				   "desc" => esc_html__("You can add your custom keywords here. Keywords should be separated by comas.", "mntn")
			),
			   
			   array( "name" => esc_html__("Add Google Analytics code", "mntn"),
				   "id" => "FR_GOOGLE_ANALYTICS",
				   "type" => "textarea",
				   "std" => "",
				   "desc" => esc_html__("", "mntn")
			),
			   
		array( "name" => "tools",
			   "type" => "subcontent-end",),
	
	array( "name" => "wrap-tools",
		   "type" => "contenttab-wrapend",),

//-------------------------------------------------------------------------------------//


); 