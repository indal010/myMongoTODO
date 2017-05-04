// var Packery = require('packery');
  var a=0;
  $(document).ready(function()
    {
       if(!localStorage.getItem("view"))
         {
           localStorage.setItem("view", "grid");
         }

        $("#msgbox").hide();

        $.ajax({
           url: "/checkNotes",
           type: "POST",
            dataType: 'JSON',
            //data:note,
           success: function(response) {
              console.log(localStorage.getItem("view"));
              if(localStorage.getItem("view")=="list")
              {
                 for(var i=0;i<response.msg.length;i++)
                   {
                     var note1="<h4>"+response.msg[i].title+"</h4><br>"+response.msg[i].content+"<br>";
                     var newDiv = $('<div style="margin-left:100px;"> <div class="notesDiv  col-md-9" style="background-color:#ffffff;margin:8px;font-weight:bold;word-wrap:break-word;">'+note1+'</div></div>');
                     $('#content').prepend(newDiv);
                  }

            }
            else {
                for(var i=0;i<response.msg.length;i++)
                   {
              // var note1="<div><h4>"+response.msg[i].title+"</h4></div><div>"+response.msg[i].content+"</div>";

              var note1="<h4>"+response.msg[i].title+"</h4><br>"+response.msg[i].content+"<br>";
              var newDiv = $('<div class="notesDiv  col-md-3" style="word-wrap:break-word;margin-left:100px;background-color:#ffffff;margin:8px;font-weight:bold;word-wrap:break-word;">'+note1+'</div>');
              $('#content').prepend(newDiv);
              }
            }
                 arrangeDiv();
            },
          error: function(error) {
            console.log("some error occured");
          },
          complete: function(xhr,status)
          {
            console.log("request is completed");
          }
        });

      $("body").click(function(event){
        if(event.target.id=="i2"||event.target.id=="i3")
        {
          return;
        }
        else {
          $("#clickHere").show();
          $("#msgbox").hide();
          var title=$("#i2").html();
          var content=$("#i3").html();
          if(title==""&&content=="")
           {
              return;
           }
           else {
             $('#i2').html('');
             $('#i3').html('');
             var note={title:title,content:content};
             var note1="<h4>"+title+"</h4><br>"+content+"<br>";
            if(localStorage.getItem("view")=="grid")
            {
           var newDiv = $('<div style="margin-left:100px;word-wrap:break-word;"><div class="notesDiv col-md-3" style="background-color:#ffffff;margin:8px;font-weight:bold;">'+note1+'</div></div>');
          }
         else
            {
           var newDiv = $('<div style="margin-left:100px;word-wrap:break-word;"><div class="notesDiv col-md-9" style="background-color:#ffffff;margin:8px;font-weight:bold;">'+note1+'</div></div>');
           }
           $('#content').prepend(newDiv);
           arrangeDiv();
            saveData(note);
          }
        }
      })

      $('#refresh').click(function()
       {
       location.reload();
       });

       $("#icon").click(function(){
         if(a%2==0)
         {
           $("#mySidenav").css("width",250);
           $("#main").css("margin-left",250);
            $("#content").css("margin-left",250);
            // $(".notesDiv").css("margin-left",250);
         }
         else {

             $("#mySidenav").css("width",0);
              $("#main").css("margin-left",0);
              $("#content").css("margin-left",100);
         }
         a++;
      });


    $(document).on("click","#clickHere",function(e)
    {
    $("#clickHere").hide();
    $("#msgbox").show();
     })

     $("#done").click(function(){
         var title=$("#i2").html();
         var content=$("#i3").html();
         $('#i2').html('');
         $('#i3').html('');
         if(title==""&&content=="")
          {
             return;
          }
          else {
            var newDiv;
         var note1="<h4>"+title+"</h4><br>"+content+"<br>"+" ";
         var note={title:title,content:content};
         if(localStorage.getItem("view")=="grid")
          {
            newDiv = $('<div class="notesDiv col-md-3" style="background-color:#ffffff;font-weight:bold;margin:8px;">'+note1+'</div>');
          }
         else
          {
         newDiv = $('<div class="notesDiv col-md-9" style="background-color:#ffffff;margin:8px;font-weight:bold;">'+note1+'</div>');
         }
          $('#content').prepend(newDiv);
           arrangeDiv();
          saveData(note);
         }

     })
});




    function saveData(note)
    {
      $.ajax({
         url: "/writeNotes",
         type: "POST",
          dataType: 'JSON',
          data:note,
         success: function(response) {
          console.log(response);
           if(response.status==true)
             console.log("successfully stored in the database");
          },
          error: function(error) {
          console.log("some error occured");
        },
        complete: function(xhr,status)
        {
          console.log("request is completed");
        }
      });
    }

    function changer()
    {
      $.ajax({
         url: "/checkNotes",
         type: "POST",
          dataType: 'JSON',
          //data:note,
         success: function(response) {
            if(localStorage.getItem("view")=="grid")
            {
              $('#content').html("");
            for(var i=0;i<response.msg.length;i++)
            {
              var note1="<h4>"+response.msg[i].title+"</h4><br>"+response.msg[i].content+"<br>";
              var newDiv = $('<div style="margin-left:100px;"><div class="notesDiv  col-md-9" style="background-color:#ffffff;margin:8px;font-weight:bold;">'+note1+'</div></div>');
              $('#content').prepend(newDiv);
              arrangeDiv();
            }
              localStorage.setItem("view","list");
          }
            else {
                $('#content').html("");
              for(var i=0;i<response.msg.length;i++)
              {
                var note1="<h4>"+response.msg[i].title+"</h4><br>"+response.msg[i].content+"<br>";
                var newDiv = $('<div class="notesDiv  col-md-3" style="background-color:#ffffff;margin:8px;font-weight:bold;">'+note1+'</div>');
                $('#content').prepend(newDiv);
                arrangeDiv();
              }
              localStorage.setItem("view", "grid");
            }
          },
        error: function(error) {
          console.log("some error occured");
        },
        complete: function(xhr,status)
        {
          console.log("request is completed");
        }
      });
    }

    function arrangeDiv()
    {
      var elem = document.querySelector('#content');
     var pckry = new Packery( elem, {
     itemSelector: '.notesDiv',
     gutter: 10
       });

    }
