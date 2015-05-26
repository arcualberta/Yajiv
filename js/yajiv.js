$(function(){
	var yajiv = {};
	(function(){
		var gallery = [];
		var galleryTitle = "";
		var isZoom = false;
		var thumbWidth = 0;
		var thumbStripWidth = 0;
		var scrollOffset = 0;
		var selectedIndex = 0;
		var scrollAnimationTime = 700;

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
												'     	<div id="left-container">'+
												'					<button id="left-page-button" href="" class="btn btn-primary"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button> '+
												'					<button id="left-button" href="" class="btn btn-primary"><span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span></button> '+
												'				</div>'+
												'     	<div id="right-container">'+
												'					<button id="right-button" href="" class="btn btn-primary"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button> '+
												'					<button id="right-page-button" href="" class="btn btn-primary"><span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span></button> '+
												'				</div>'+
												'			<div id="gallery-viewport">'+
												'				<img src="" id="gallery-image" />'+
												'			</div>'+
												'			<div id="gallery-thumbnail-strip">'+
												'				<div id="gallery-strip">';
			$.each(gallery, function(i, v){
				modalString += '<div> <img class="gallery-thumbnail unselected-thumbnail" src="'+v.thumbnail+'" />  </div>';
			});

			modalString +=		'			</div></div>'+
												'   </div>'+
												' </div>'+
												'</div>';

			
			$("body").append($(modalString));

			$(".gallery-thumbnail").click(function() {
				// `this` is the DOM element that was clicked
				selectedIndex = $(".gallery-thumbnail").index( this );
				setImageToSelected();
			});

			$('#gallery-viewport').click(function(){
				isZoom = ! isZoom;
				setZoom();
			});

			$("#zoom-button").click(function(){
				isZoom = ! isZoom;
				setZoom();
			});

			$('#left-button').click(function(){
				if (--selectedIndex < 0) {
					selectedIndex = 0;
				}
				setImageToSelected();
			});

			$('#right-button').click(function(){
				if (++selectedIndex >= gallery.length) {
					selectedIndex = gallery.length-1;
				}
				setImageToSelected();
			});



			var scrollPageLeft = function() {
				scrollOffset = $("#gallery-thumbnail-strip").scrollLeft();
				var newScroll =  scrollOffset - Math.floor(thumbStripWidth/thumbWidth) * thumbWidth;
				newScroll = Math.floor(newScroll/thumbWidth) * thumbWidth;
				performScroll(newScroll);
			}

			var scrollPageRight = function() {
				scrollOffset = $("#gallery-thumbnail-strip").scrollLeft();
				var newScroll = (Math.floor((scrollOffset+thumbStripWidth) / thumbWidth)) * thumbWidth;
				performScroll(newScroll);
			}

			var performScroll = function(newScroll) {
				$( "#gallery-thumbnail-strip" ).animate({
					scrollLeft: newScroll,
					}, scrollAnimationTime, function() {
					// Animation complete.
				});
			}

			$('#left-page-button').click(function() {
				scrollPageLeft()				
			});

			$('#right-page-button').click(function() {
				scrollPageRight();
			});

		}

		var setZoom = function() {
			if (isZoom) {
				$("#gallery-image").css('max-height', $('#gallery-image')[0].naturalHeight);
				$("#gallery-image").css('max-width', $('#gallery-image')[0].naturalWidth);				
				$("#zoom-button span").removeClass("glyphicon-zoom-in");
				$("#zoom-button span").addClass("glyphicon-zoom-out");
			} else {

				$("#gallery-image").css('max-height', Math.floor($('.modal-content').height() * 0.80 -60) + 'px');
				$("#gallery-image").css('max-width', Math.floor($('.modal-content').width() * 0.80) + 'px');					
				$("#zoom-button span").removeClass("glyphicon-zoom-out");
				$("#zoom-button span").addClass("glyphicon-zoom-in");
			}


		}

		var calculatePages = function() {

			thumbStripWidth = Math.floor($('.modal-content').width() - 200);

			$("#gallery-thumbnail-strip").width(thumbStripWidth + 'px');
			thumbWidth = $("#gallery-strip div:first").width();	
		}

		var resizeModal = function() {
			$('.modal-dialog').css('width', '95%')
			$('.modal-content').css('height', Math.floor($(window).height() * 0.90) + 'px')
			setZoom();
			var thumbnailSize = Math.floor($('.modal-content').height() * 0.23 -60)	+ 'px';
			$(".gallery-thumbnail").css('height', thumbnailSize);
			$(".gallery-thumbnail").css('width', thumbnailSize);
			calculatePages();
			$("#gallery-viewport").css('max-height', Math.floor($('.modal-content').height() * 0.80 -60) + 'px');	
		}

		var setImageToSelected = function() {
			isZoom = false;
			setZoom();
			$("#gallery-strip div img").removeClass('selected-thumbnail');
			$("#gallery-strip div img").addClass('unselected-thumbnail');
			$("#gallery-strip div:eq("+selectedIndex+") img").addClass('selected-thumbnail');
			$("#gallery-image").attr("src", gallery[selectedIndex].image);
			$('#download-button').attr('href', gallery[selectedIndex].image)
		}

		yajiv.showGallery = function() {
			
			$('#galleryModal').modal('show');
			resizeModal(); 
			selectedIndex = 0;
			setImageToSelected();
			$('#galleryModal').on('shown.bs.modal', function() {
				selectedIndex = 0;
    		setImageToSelected();	
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