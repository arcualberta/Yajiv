$(function(){
	var yajiv = {};
	(function(){
		var gallery = [];
		var galleryTitle = "";
		var isZoom = false;
		var thumbWidth = 0;
		var thumbStripWidth = 0;
		var scrollOffset = 0;
		yajiv.setup = function(_gallery, _galleryTitle) {	
			gallery = _gallery;
			galleryTitle = _galleryTitle
			// insert modal html
			var modalString = '<div class="modal fade" id="galleryModal">'+
												' <div class="modal-dialog">'+
												'   <div class="modal-content">'+
												'     <div class="modal-header">'+
												'     	<div id="close-container"><button id="close-button" class="btn btn-danger" data-dismiss="modal"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div>'+
												'     	<div id="zoom-container"><button id="zoom-button" class="btn btn-success"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span></button></div>'+
												'     	<div id="download-container"><a download id="download-button" href="" class="btn btn-info"><span class="glyphicon glyphicon-download" aria-hidden="true"></span></a></div>'+

												// '       <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
												'       <h4 class="modal-title">'+galleryTitle+'</h4>'+
												'     </div>'+
												'     <div class="modal-body">'+												
												'     	<div id="left-container"><button id="left-button" href="" class="btn btn-primary"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button></div>'+
												'     	<div id="right-container"><button id="right-button" href="" class="btn btn-primary"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button></div>'+
												'			<div id="gallery-viewport">'+
												'				<img src="" id="gallery-image" />'+
												'			</div>'+
												'			<div id="gallery-thumbnail-strip">'+
												'				<ul id="gallery-strip">';
			$.each(gallery, function(i, v){
				modalString += '<li><img class="gallery-thumbnail unselected-thumbnail" src="'+v.thumbnail+'" /></li>';
			});

			modalString +=		'			</div>'+
												'   </div>'+
												' </div>'+
												'</div>';

			
			$("body").append($(modalString));

			$(".gallery-thumbnail").click(function() {
				// `this` is the DOM element that was clicked
				var index = $(".gallery-thumbnail").index( this );
				setImage(index);
			});

			$('#gallery-viewport').click(function(){
				isZoom = ! isZoom;
				setZoom();
			});

			$("#zoom-button").click(function(){
				isZoom = ! isZoom;
				setZoom();
			});

			$('#left-button').click(function() {
				scrollOffset = $("#gallery-thumbnail-strip").scrollLeft();
				// var newScroll = (Math.floor((scrollOffset-thumbStripWidth) / thumbWidth)) * thumbWidth;
				var newScroll =  scrollOffset - Math.floor(thumbStripWidth/thumbWidth) * thumbWidth;
				newScroll = Math.floor(newScroll/thumbWidth) * thumbWidth;
				// $("#gallery-thumbnail-strip").scrollLeft(newScroll);
				$( "#gallery-thumbnail-strip" ).animate({
					scrollLeft: newScroll,
					}, 700, function() {
					// Animation complete.
				});
			});

			$('#right-button').click(function() {
				scrollOffset = $("#gallery-thumbnail-strip").scrollLeft();
				var newScroll = (Math.floor((scrollOffset+thumbStripWidth) / thumbWidth)) * thumbWidth;
				// $("#gallery-thumbnail-strip").scrollLeft(newScroll);
				$( "#gallery-thumbnail-strip" ).animate({
					scrollLeft: newScroll,
					}, 700, function() {
					// Animation complete.
				});
			});

		}

		var setZoom = function() {
			if (isZoom) {
				// $("#gallery-image").addClass("zoom-in");
				// $("#gallery-image").parent().addClass("dummy-class").removeClass('dummy-class');
				$("#gallery-image").css('max-height', $('#gallery-image')[0].naturalHeight);
				$("#gallery-image").css('max-width', $('#gallery-image')[0].naturalWidth);
				
				$("#zoom-button span").removeClass("glyphicon-zoom-in");
				$("#zoom-button span").addClass("glyphicon-zoom-out");
			} else {
				// $("#gallery-image").removeClass("zoom-in");
				// $("#gallery-image").parent().addClass("dummy-class").removeClass('dummy-class');
				$("#gallery-image").css('max-height', Math.floor($('.modal-content').height() * 0.80 -60) + 'px');
				$("#gallery-image").css('max-width', Math.floor($('.modal-content').width() * 0.80) + 'px');	
				
				$("#zoom-button span").removeClass("glyphicon-zoom-out");
				$("#zoom-button span").addClass("glyphicon-zoom-in");
			}

			// $("#gallery-viewport").css('max-height', Math.floor($('.modal-content').height() * 0.80 -60) + 'px');	

		}

		var calculatePages = function() {

			thumbStripWidth = $("#gallery-thumbnail-strip").width();
			// scrollOffset = $("#gallery-thumbnail-strip").scrollLeft();
			thumbWidth = $("#gallery-strip li:first").width();
	
		}

		var resizeModal = function() {
			$('.modal-dialog').css('width', '95%')
			$('.modal-content').css('height', Math.floor($(window).height() * 0.90) + 'px')
			setZoom();
			$(".gallery-thumbnail").css('max-height', Math.floor($('.modal-content').height() * 0.23 -60)	+ 'px');
			calculatePages();
			$("#gallery-viewport").css('max-height', Math.floor($('.modal-content').height() * 0.80 -60) + 'px');	
			// $("#gallery-viewport").parent().addClass('dummy-class').removeClass('dummy-class');
		}

		var setImage = function(index) {
			isZoom = false;
			setZoom();
			$("#gallery-strip li img").removeClass('selected-thumbnail');
			$("#gallery-strip li img").addClass('unselected-thumbnail');
			$("#gallery-strip li:eq("+index+") img").addClass('selected-thumbnail');
			$("#gallery-image").attr("src", gallery[index].image);
			$('#download-button').attr('href', gallery[index].image)
		}

		yajiv.showGallery = function() {
			
			$('#galleryModal').modal('show');
			resizeModal(); 
			setImage(0);
			$('#galleryModal').on('shown.bs.modal', function() {
    		setImage(0);	
    		calculatePages();				
			});	
		}

		$(window).resize(function() {
			resizeModal();
		});

	})();

	$("#show-gallery").click(function(){
		yajiv.showGallery();
	});


	yajiv.setup(gallery, galleryTitle);
});