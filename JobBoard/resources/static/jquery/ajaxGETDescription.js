// affichage des descriptions
$(document).on("click",".btn-learn", function (){
	var parent = $(this).parent();
	if($(this).html() === "Learn more"){
		$(this).html("Show less");
		$.ajax({
			type : "GET",
			url : "/api/advertisements/description?id="+$(parent).attr("id"),
			success: function(result){
				$.each(result, function(i, advertisements){		
					var advertisementsRow = 	"<p id=fullDesc>" +advertisements.description + "</p>\
												<h5>Location: " +advertisements.location +"</h5>\
												<h5>Wages: " +advertisements.wages +"</h5>\
												<h5>Working Time (per week)	:" +advertisements.workingTime +"</h5>";
					$(parent).find(".content").append(advertisementsRow);
					$(parent).find("#shortDesc").toggle();

				});
			},
			error : function(e) {
				console.log($(this))
				console.log("ERROR: ", e);
			}
		});	
	}
	else{
		$(this).parent().find(".content").find("h5").remove();
		$(this).parent().find("#fullDesc").remove();
		$(this).parent().find("#shortDesc").toggle();
		$(this).html("Learn more")
	}
})	