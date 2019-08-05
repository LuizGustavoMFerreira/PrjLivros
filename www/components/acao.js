// This is a JavaScript file
$(document).on("click","#btnSalvar",function(){
  var parametros = {
    "titulo":$("#titulo").val(),
    "autor":$("#autor").val(),
    "ano":$("#ano").val(),
  }

  $.ajax({
    type:"post", //como enviar
    url:"https://teoriaonline.000webhostapp.com/cadastro.php",//para onde ira os dados
    data:parametros,//o que enviar
    //se der certo
    success: function(data){
        navigator.notification.alert(data);
      $("#titulo").val(""),
      $("#autor").val(""),
      $("#ano").val(""),
      desabilita()
    },
    //se der errado
    error: function(data){
        navigator.notification.alert(data);
    }
  });
});

function preencherLista(){
  var itemlista = "";
   $.ajax({
        type:"post", //como enviar
        url:"https://teoriaonline.000webhostapp.com/lista.php",//para onde enviar
        dataType:"json",
        //se der certo
        success: function(data){
            var itemlista = "";
            $.each(data.livro,function(i,dados){
              itemlista += "<option value='"+dados.codigo+"'>"+dados.titulo+"</option>"; 
            });
        $("#listaLivro").html(itemlista);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
};

$(document).on("change","#listaLivro", function(){
   var codigoescolhido = $("option:selected", ("#listaLivro")).val();
    $.ajax({
        type:"post", //como enviar
        url:"https://teoriaonline.000webhostapp.com/lista_um.php",//para onde enviar
        data: "codigo="+codigoescolhido,
        dataType:"json",
          //se der certo
        success: function(data){
          $("#codigo").val(data.livro.codigo);
          $("#titulo").val(data.celular.titulo);
          $("#autor").val(data.celular.autor)
          $("#ano").val(data.celular.ano);     
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
});
$(document).on("click", "#btnAlterar", function(){
    var parametros = {
      "livro":$("#titulo").val(),
      "autor":$("#autor").val(),
      "ano":$("#ano").val()
};

 $.ajax({
        type:"post", //como enviar
        url:"https://teoriaonline.000webhostapp.com/alterar.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});

function habilita(){
  $("#titulo").prop("readonly",false);
  $("#autor").prop("readonly",false);
  $("#ano").prop("readonly",false);
}

function desabilita(){
  $("#titulo").prop("readonly",true);
  $("#autor").prop("readonly",true);
  $("#ano").prop("readonly",true);
}

$(document).on("click", "#btnEditar", function(){
  habilita();
});

$(document).on("click", "#btnCancelar", function(){
   $("#titulo").val(""),
   $("#autor").val(""),
   $("#ano").val(""),
   desabilita()
});

$(document).on("click","#listarLivro",function(){
    $(location).attr("href", "lista.html");
});

$(document).on("click","#btnVoltar",function(){
    $(location).attr("href", "index.html");
});