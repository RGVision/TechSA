/*==============================================================*/
// Contact Form  JS
/*==============================================================*/
(function ($) {
    "use strict"; // Start of use strict
    $("#contactForm").validator().on("submit", function (event) {
        if (event.isDefaultPrevented()) {
            formError();
            submitMSG(false, "Did you fill in the form properly?");
        }
        else {
            event.preventDefault();
            submitForm();
        }
    });

    function submitForm(){
        // Initiate Variables With Form Content
        var name = $("#name").val();
        var email = $("#email").val();
        var msg_subject = $("#msg_subject").val();
        var phone_number = $("#phone_number").val();
        var message = $("#message").val();
        var gridCheck = $("#gridCheck").val();

        var Erpsystem = "https://erp.arco.sa/SystemApi/";
       
        var data = {
            "EntityTypeId": 10486,
            "Name": name,
            "Email": email,
            "PhoneNumber": phone_number,
            "Subject": msg_subject,
            "Messages": message,
        };
        var Entity =  {
            "EntityData" : JSON.stringify(data)
        }
        var ContactURL = Erpsystem+"/api/v1/entitytype/dynamic/insert"
         $.ajax({
            type: 'POST',
            "headers": {
                "ClientUserId": "System",
                "ClientSecretId": "E4A793E4-DC3E-46AB-A01E-AD12BADCA5BD",
                "Authorization": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdGF0dXMiOiJUcnVlIiwibXNnIjoiTG9naW4gU3VjY2Vzc0Z1bGx5IiwiVXNlck5hbWUiOiJTeXN0ZW0iLCJOYW1lIjoiU3lzdGVtIiwiQXJlYSI6IlBsYXRmb3JtIiwiVXNlclR5cGUiOiIxIiwiRW1wbG95ZWVJZCI6IlN5c3RlbSIsImV4cCI6MTcyNDgyNzA5NSwiaXNzIjoiY2VudGVycG9pbnQuZGlnaXRhbCIsImF1ZCI6ImNlbnRlcnBvaW50LmRpZ2l0YWwifQ.mQSrTIxS2wnanefuiBBZ21YTYVvzITicyK37SWZx9J8"
            },
            url: ContactURL,
            data: Entity,
            success: function (resultData) {
                formSuccess();               
                swal("Thank You For Contacting Us","","success");
            },
            error :function (err) { 
                formError();
                    submitMSG(false,err?.responseText);
                    swal("Error",err?.responseText,"error");             }
        });
    }
    function formSuccess(){
        $("#contactForm")[0].reset();
        submitMSG(true, "Message Submitted!")
    }
    function formError(){
        $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass();
        });
    }
    function submitMSG(valid, msg){
        if(valid){
            var msgClasses = "h4 tada animated text-success";
        }
        else {
            var msgClasses = "h4 text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    }

}(jQuery)); // End of use strict