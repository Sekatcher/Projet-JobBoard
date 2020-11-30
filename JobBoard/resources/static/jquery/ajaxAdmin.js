
$(document).ready(function(){
    $("select option:first-child").prop("selected", true)
    //  affichage des annonces
    $("select").on("change", function() {        
        displayRows(0, $(this).val(), 2)
    });

    // affichage page précedente
    $("#btn-pre").on("click", function(){
        if($("#btn-pre").val() != "-10"){
            displayRows($(this).val(), $("select").val(), 0)
        }
    });

    // affichage page suivante
    $("#btn-nxt").on("click", function(){
        displayRows($(this).val(), $("select").val(), 1)
    });

    // insert une ligne en base
    $(document).on("click","#btn-insert", function () {
        var dataHeader = []
        for (i = 1 ; i < $(this).parent().parent().parent().parent().find("thead th").length ; i++) {
            dataHeader.push($(this).parent().parent().parent().parent().find("thead th:nth-child("+ i +")").text())
        }
        insertRow(dataHeader, $(this).parent().parent(), $("select").val())
    })

    // change les données d'une ligne
    $(document).on("click","#btn-change", function () {
        var dataHeader = []
        for (i = 1 ; i < $(this).parent().parent().parent().parent().find("thead th").length -1 ; i++) {
            dataHeader.push($(this).parent().parent().parent().parent().find("thead th:nth-child("+ i +")").text())
        }
        updateRow(dataHeader, $(this).parent().parent(), $("select").val())
    })

    // supprime une ligne et ses données
    $(document).on("click", "#btn-delete" ,function () {

        deleteRow($(this).parent().parent().find("input"), $("select").val())
    })
})

function insertRow (dataHeader, tr, table) {
    var data = {}
    for (var i = 2; i < dataHeader.length + 1; i++) {
        var name = dataHeader[i-1];
        var toaddstr = tr.find("td:nth-child("+i+") input").val()
        data[name] = toaddstr;
    }
    console.log(data)
    $.ajax({
        type : "POST",
        url : "/api/"+ table + "/post",
        data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
        success: function(result){
            displayRows(0, $("select").val())
        }
    })
}

function updateRow ( dataHeader,tr, table) {
    var data = {}
    for (var i = 1; i < dataHeader.length + 1 ; i++) {
        var name = dataHeader[i-1];
        var toaddstr = tr.find("td:nth-child("+i+") input").val()
        data[name] = toaddstr;
    }
    console.log(data)
    $.ajax({
        type : "PUT",
        url : "/api/"+ table + "/update",
        data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
        success: function(result){
            //toast "ligne modifiée"
        }
    })
}


function deleteRow (id, table) {
    var data = {
        "id": id.val() ,
    }
    console.log(data)
    $.ajax({
        type : "DELETE",
        url : "/api/"+ table + "/delete",
        data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
        success: function(result){
            id.parent().parent().remove()
            //toast "ligne supprimée"
        }
    })
}



function displayRows(offset, table, btnIsNext) {
    console.log(btnIsNext)
    if(table != "chose"){
        $.ajax({
            type : "GET",
            url : "/api/"+ table + "/rows/" + offset,
            success: function(result){
                if (result.length > 0){

                    //création header
                    $('#main-table thead tr').html("");
                    $('#insert-table thead tr').html("");
                    var entries = Object.entries(result[0])
                    var emptyLine = "";

                    $.each(entries, function (i) {
                        var tableRow = 	"<th>"+ entries[i][0] +"</td>";
                        emptyLine = emptyLine + "<td><input type=text></td>"

                        $("#main-table thead tr").append(tableRow);
                        $("#insert-table thead tr").append(tableRow);
                    })
                    $('#main-table thead tr').append("\
                                        <th>Apply Changes</th>\
                                        <th>Delete</th>");
                    $('#insert-table thead tr').append("\
                                        <th>Add Row</th>");
                    //création lignes
                    $('#main-table tbody').html("");

                    $.each(result, function(i, res){
                        var values = Object.values(res)
                        var tableRow = "";
                        $.each(values, function(i){

                            tableRow = tableRow +  "<td><input type=text value='"+ values[i] +"' /></td>";
                            
                        })
                        tableRow = tableRow +   "<td><button id='btn-change'>&#10003</button></td>\
                                                <td><button id='btn-delete'>X</button></td>"
                        tableRow = $("<tr>", {html:tableRow })

                        $('#main-table tbody').append(tableRow);
                        $('#main-table tbody tr:last-child td:nth-child(1) input').prop("disabled", true);


                    });
                    emptyLine = emptyLine + "<td><button id='btn-insert'>+</button></td>"
                    emptyLine = $("<tr>", {html: emptyLine})
                    $('#insert-table tbody').html("");
                    $('#insert-table tbody').append(emptyLine);
                    $('#insert-table tbody tr td:nth-child(1) input').prop("disabled", true);
                    console.log(btnIsNext)
                    if(btnIsNext != 2) {

                        if(btnIsNext == 1) {
                            $("#btn-nxt").val(parseInt($("#btn-nxt").val())+10)
                            $("#btn-pre").val(parseInt($("#btn-pre").val())+10)
                        }
                        else{                            
                            $("#btn-nxt").val(parseInt($("#btn-nxt").val())-10)
                            $("#btn-pre").val(parseInt($("#btn-pre").val())-10)
                            
                        }
                    }
                }
                else {
                    var data = {
                        "id" : null
                    }
                    $.ajax({
                        type : "POST",
                        url : "/api/"+ table + "/post",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        success: function(result){
                            displayRows(offset, table, btnIsNext)

                        },
                        error : function(e) {
                            console.log("ERROR: ", e);
                        }
                    })
                }
            },
            error : function(e) {
                console.log("ERROR: ", e);
            }
        });	

    }
}