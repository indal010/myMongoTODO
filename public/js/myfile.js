$(document).ready(function() {
  $(document).on("click","#home1",function()
    {
      $.ajax({
         url: "/logout",
         type: "GET",
          //dataType: 'JSON',
         success: function(response) {
            if(response.status==true)
                homepage();
          //if(document.cookie===undefined)
          },
        error: function(error) {
          console.log("page was not loaded ", error);
        }
      });
    });

  function homepage()
  {
  $.ajax(
        {
          url:"../index.html",
            async:false,
            type:"GET",
              dataType:'html',
              success: function(data,textStatus,jqXHR)
                 {
                        $("body").html(data);
                          }
                    });
  }


  $("#home").click(function() {
    $.ajax({

      url: "/logout",
      type: "POST",
      //dataType: 'JSON',
      success: function(response)
      {
        if(response.status==true)
            homepage();
      },
      error: function(error) {
        console.log("page was not loaded ", error);
      }
  });

});

$.ajax({
   url: "/checkpage",
   type: "POST",
    //dataType: 'JSON',
   success: function(response) {
    console.log("page was loaded ",response);
     if(response.status==true)
        setResult();
    },
  error: function(error) {
    console.log("page was not loaded ", error);
  },
  complete: function(xhr,status)
  {
    console.log("request is completed");
  }
});




  $("#submit").click(function()
  {
    var name = $("#name").val();
    var email_id = $("#email_id").val();
    var password1 = $("#Password").val();
    var password2 = $("#rPassword").val();
    $(".validation").remove();
    var name_regx = /^[a-zA-Z ]{2,30}$/;
    var email_regx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!name_regx.test(name))
       {
         $("#name").after("<p class='validation' style='color:red;'>Enter  valid name</p>");

       }
    else if(!email_regx.test(email_id))
    $("#email_id").after("<p class='validation' style='color:red;'>Enter a valid email address</p>");
    else if(password1.length<3||password2.length<3||password1!==password2)
    {
      $("#Password").after("<p class='validation' style='color:red;'>Enter a valid password</p>");
      $("#rPassword").after("<p class='validation' style='color:red;'>Enter a valid password</p>");
    }
    else {

    var signUp={
             name:name,
             email:email_id,
             password1:password1,
             password2:password2
        };
      ajaxsignUpCall(signUp);
    }
  });

  $("#login1").click(function() {
    var userEmail = $("#email_id").val();
    var userPassword = $("#password").val();
    var login={
      email:userEmail,
      password:userPassword
    };
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     $(".validation").remove();
     if(!re.test(userEmail))
      $("#email_id").after("<p class='validation' style='color:red;'>Enter a valid email address</p>");
    else  if(userPassword.length<1)
        $("#password").after("<p class='validation' style='color:red;'>Enter atleast 8 digit password</p>");
        else
         ajaxloginCall(login,"login");
  });
});


function setResult()
{

  $.ajax({
          url:"../template/homek.html",
            //async:false,
            //type:"GET",
              dataType:'html',
              success: function(data,textStatus,jqXHR)
                   {
                     console.log("printed");
                       $("body").empty();
                        $("body").html(data);
                        //window.location.hash="#homePage";
                          }
                    });
}

function ajaxloginCall(userPassedObject)
{
  $.ajax({

    url: "/login",
    type: "POST",
    dataType: 'JSON',
    data:userPassedObject,
    success: function(response)
     {
      //console.log(response.keys);
      m=response.msg;
      console.log('page was loaded', response);
      $(".validation").remove();
      if(response.status==true)
      {
         setResult();
      }
      else if(response.status==false&&response.msg=="unauthorized user")
      $("#password").after("<p class='validation' style='color:red;'>authentication fail</p>");
      else if(response[0].param=="email")
     $("#email_id").after("<p class='validation' style='color:red;'>Enter a valid email address</p>");
      else if(response[0].param=="")
      $("#password").after("<p class='validation' style='color:red;'>Enter atleast 8 digit password</p>");

    },
    error: function(error) {
      console.log("page was not loaded ", error);
    }
});
};


function ajaxsignUpCall(userPassedObject)
{
  $.ajax({
    url: "http://localhost:8086/signup",//http://localhost:8086/signup
    type: "POST",
    dataType: 'JSON',
    data:userPassedObject,
    success: function(response)
     {
       console.log(response.status);
       if(response.status===true)
        {
          console.log("successfully registered");
            alert("Registered successfully");
        }
        else {
          alert("already exist")
        }
    },
    error: function(error) {
      console.log("page was not loaded ", error);
    }
});
};




  function homepage()
  {
    $.ajax(
          {
            url:"../index.html",
              //async:false,
              type:"GET",
                dataType:'html',
                success: function(response)
                   {
                          $("body").html(response);
                        },
                error:function(error)
                {
                  console.log("page was not loaded ",error);
                },
                complete:function(xhr,status)
                {
                  console.log("the request is completed");
                }
                      });
  }
