$(document).ready(function() {
	//  affichage des annonces
	$.ajax({
		type : "GET",
		url : "/api/advertisements/allwcompany",
		success: function(result){
			$.each(result, function(i, advertisements){

				var advertisementsRow = 	"<div class='advert' id="+ advertisements.id +">\
												<h3>" +advertisements.title.toUpperCase() + "</h3>\
												<h5>" +advertisements.name +"</h5>\
												<h5>Description:</h5>\
												<div class='content'>\
													<p id=shortDesc>" +advertisements.description.slice(0,10) + "...</p>\
												</div>\
												<button class='btn-learn button_slide slide_down'>Learn more</button>\
												<button class='btn-apply button_slide slide_right' onclick=\"window.location.href = window.location + 'form?id='+$(this).parent().attr('id')\">Apply</button>\
											</div>";
											
				$('#div-contain-advert').append(advertisementsRow);
			});
		},
		error : function(e) {
			console.log("ERROR: ", e);
		}
	});	
})