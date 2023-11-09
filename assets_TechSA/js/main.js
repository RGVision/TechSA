jQuery(function($) {
    'use strict';

    // Mean Menu
    $('.mean-menu').meanmenu({
        meanScreenWidth: '991',
    });

    // Sticky Nav
    $(window).on('scroll', function() {
        $(window).scrollTop() >= 100 ?
        $('.navbar-area').addClass('stickyadd') :
        $('.navbar-area').removeClass('stickyadd');
    });

    // Smooth Scrolling
    $('a.nav-link').on('click', function(e) {
        var $this = $(this);
        $('html, body')
        .stop()
        .animate({
            scrollTop: $($this.attr('href')).offset().top - 60,
        }, 1000 );
        e.preventDefault();
    });

    // Search Popup
    $('.search-btn').on('click', function() {
        $('.search-popup').toggle(300);
    });

    // Popup Video
    $('.youtube-popup').magnificPopup({
        disableOn: 320,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

    // Hero Slider
    $('.الرئيسية-slider').owlCarousel({
        loop: true,
        margin: 0,
        rtl: true,
        items: 1,
        smartSpeed: 950,
    });

    // Team Slider
    $('.team-slider').owlCarousel({
        loop: false,
        margin: 15,
        rtl: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 2,
            },
            1000: {
                items: 3,
            },
            1400: {
                items: 4
            }
        },
    });

    // Gallery Slider
    $('.gallery-slider').owlCarousel({
        loop: false,
        margin: 20,
        rtl: true,
        autoplay: true,
        autoplayHoverPause: true,
        autoplayTimeout: 8500,
        smartSpeed: 450,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1000: {
                items: 3,
            },
        },
    });

    // Testimonial Slider
    let testimonialSlider = $('.testimonial-slider').owlCarousel({
        items: 1,
        dots: true,
        margin: 10,
        rtl: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 1,
            },
            768: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
    });
    $('.dot').on('click', function() {
        testimonialSlider.trigger('to.owl.carousel', [$(this).index(), 300]);
        $('.dot').removeClass('active');
        $(this).addClass('active');
    });

    // Client Slider
    $('.client-slider').owlCarousel({
        loop: true,
        margin: 20,
        rtl: true,
        items: 1,
        smartSpeed: 950,
    });

    // Partner Slider
    $('.partner-slider').owlCarousel({
        loop: true,
        rtl: true,
        nav: false,
        dots: false,
        smartSpeed: 2000,
        margin: 30,
        autoplayHoverPause: true,
        autoplay: true,
        responsive: {
            0: {
                items: 2,
            },
            768: {
                items: 3,
            },
            1024: {
                items: 4,
            },
            1200: {
                items: 5,
            },
        },
    });

    // Back To Top
    $('body').append(`<div class='go-top'><i class='envy envy-angle-up'></i></div>`);
    $(window).on('scroll', function() {
        var scrolled = $(window).scrollTop();
        if (scrolled > 600) $('.go-top').addClass('active');
        if (scrolled < 600) $('.go-top').removeClass('active');
    });
    $('.go-top').on('click', function() {
        $('html, body').animate({
            scrollTop: '0',
        }, 500 );
    });

    // Count Time 
    function makeTimer() {
        var endTime = new Date('September 20, 2021 17:00:00 PDT');
        var endTime = (Date.parse(endTime)) / 1000;
        var now = new Date();
        var now = (Date.parse(now) / 1000);
        var timeLeft = endTime - now;
        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));
        if (hours < '10') {
            hours = '0' + hours;
        }
        if (minutes < '10') {
            minutes = '0' + minutes;
        }
        if (seconds < '10') {
            seconds = '0' + seconds;
        }
        $('#days').html(days + '<span>Days</span>');
        $('#hours').html(hours + '<span>Hours</span>');
        $('#minutes').html(minutes + '<span>Minutes</span>');
        $('#seconds').html(seconds + '<span>Seconds</span>');
    }
    setInterval(function() {
        makeTimer();
    }, 0);

    // Subscribe Form
    $('.newsletter-form').validator().on('submit', function(event) {
        if (event.isDefaultPrevented()) {
            // Handle The Invalid Form...
            formErrorSub();
            submitMSGSub(false, 'Please enter your email correctly.');
        } else {
            // Everything Looks Good!
            event.preventDefault();
        }
    });

    function callbackFunction(resp) {
        if (resp.result === 'success') {
            formSuccessSub();
        } else {
            formErrorSub();
        }
    }

    function formSuccessSub() {
        $('.newsletter-form')[0].reset();
        submitMSGSub(true, 'Thank you for subscribing!');
        setTimeout(function() {
            $('#validator-newsletter').addClass('hide');
        }, 4000)
    }

    function formErrorSub() {
        $('.newsletter-form').addClass('animated shake');
        setTimeout(function() {
            $('.newsletter-form').removeClass('animated shake');
        }, 1000)
    }

    function submitMSGSub(valid, msg) {
        if (valid) {
            var msgClasses = 'validation-success';
        } else {
            var msgClasses = 'validation-danger';
        }
        $('#validator-newsletter').removeClass().addClass(msgClasses).text(msg);
    }

    // AJAX MailChimp
    $('.newsletter-form').ajaxChimp({
        url: 'https://hibootstrap.us20.list-manage.com/subscribe/post?u=60e1ffe2e8a68ce1204cd39a5&amp;id=42d6d188d9', // Your url MailChimp
        callback: callbackFunction
    });

    // Preloader
    $(window).on('load', function(e) {
        $('.preloader-main')
        .delay(2000)
        .queue(function() {
            $(this).remove();
        });
    });

	// Switch Btn
	$('body').append("<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>");
}(jQuery));


// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('solit_rtl_theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('solit_rtl_theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('solit_rtl_theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-light');
      document.getElementById('slider').checked = true;
    }
})();
//Employee-Signup
$("#can_register").click(function () {
    debugger;
   check = $("#can_tac").is(':checked');
    var formid = $(this).parent().parent("form").attr("id");
    $(this).parent().parent("form").addClass("form-submited");
 
    if ($("#can_name").val() != "" && $("#can_mobile").val() != "" && $("#can_email").val() != "" && $("#can_pass").val() != "" && $("#can_Nationalid").val !="") {


        if (isValidEmailAddress($("#can_email").val()) && check) {
            if (validator.checkAllReg($("#" + formid)))
            {

            $("#can_register").css("pointer-events", "none");
            var employee = {
                Name: $("#can_name").val(),
                MobilePhone: $("#can_mobile").val(),
                Email: $("#can_email").val(),
                Password: $("#can_pass").val(),
                NationalId: $("#can_Nationalid").val(),
                FamilyName: $("#can_familyname").val(),
                MentionTrainings: $("#can_mentionthetraining").val(),
                HowManyYears: $("#can_howmanyyears").val(),
                Experience: $("#can_tac2").val(),
                Specialization: $("#can_specialization").val(),
                Education: $("#can_education").val(),
                
                PlaceofResidence: $("#can_placeofresidence").val(),
              

            };

            var jdata = JSON.stringify(employee);


            $.ajax({
                type: 'POST',
                url: "https://techsa.azurewebsites.net/api/RegisterEmployee?_Employee=" + jdata,
                // data: { _Employee: jdata },

                success: function (data, textStatus, xhr) {
             
                    //if(data.status)
               
                    if (data.status == true) {
                        debugger;
                        var data1 = new FormData();
                      
                        var files = $("#can_cvfile").get(0).files;
                        var field = data.RecId;
                        if (files.length > 0) {
                            data1.append("Uploadfile", files[0]);
                            data1.append("CandidateID", field);

                            $.ajax({
                                type: "POST",
                                url: "/FileUse/UploadCandidateCv1",
                                traditional: true,
                                contentType: "multipart/mixed",
                                contentType: false,
                                processData: false,
                                data: data1,
                                success: successFunc2,
                                error: errorFunc2
                            });

                            function successFunc2(data2, Status) {
                                debugger;
                                $("#user_loginm").val(data.UserName);
                                $("#user_passm").val(data.PassWord);

                                $("#loginEmployee").click();
                            }
                            function errorFunc2(data, Status) {
                                alert('error');
                            }

                        }
                        else {
                            $("#user_loginm").val(data.UserName);
                            $("#user_passm").val(data.PassWord);
                            $("#loginEmployee").click();
                        }

                    }
                    else {
                        swal(data.msg);
                    }
                    $("#can_register").css("pointer-events", "initial");

                },
                error: function (data, textStatus, xhr) {


                    swal("InValid Credential!","","error")
                    $("#can_register").css("pointer-events", "initial");

                },
            });
        }
        }
        else {

            if (!isValidEmailAddress($("#can_email").val())) {
                // $("#can_email").parent().addClass('form-required');
                swal("Please Enter Valid Email!","","warning")
            }
            else {
                 swal("Please Check terms and conditions!","","warning")
                // $("#can_tac").parent().addClass('form-required');

            }


        }
    }
    else {

        $("#" + formid + " .login-textbox").each(function () {
         
            var thisinput = $(this).children("input.input");
            if (thisinput.length > 0) {
                //  alert(thisinput.attr("id"));
                var value = thisinput.val();
                if (value.length < 1) {
                    //    alert(value);
                    thisinput.parent().addClass('form-required');

                }
            }

        });

          swal("Please Fill Fields!","","warning")
    }

  


});
//Employee-Signin
$("#loginEmployee").click(function () {
    debugger;
    var formid = $(this).parent().parent("form").attr("id");
    $(this).parent().parent("form").addClass("form-submitted");

    var JobId = $("#selectdjobid").val();
    var loginurl = "https://techsa.azurewebsites.net/Account/LoginByType?log=" + $("#user_loginm").val() + "&pwd=" + $("#user_passm").val() + "&Utype=" + 5;
    
    if (JobId && JobId.length > 0) {
        loginurl = "https://techsa.azurewebsites.net/Account/LoginByType?log=" + $("#user_loginm").val() + "&pwd=" + $("#user_passm").val() + "&Utype=" + 5 + "&JobId=" + JobId;
    }

    if ($("#user_loginm").val() != "" && $("#user_passm").val() != "") {
        $("#loginEmployee").css("pointer-events", "none");

        $.ajax({
            type: 'POST',
            // headers: {
            //     'Access-Control-Allow-Origin': '*',
            //     'Content-Type':'application/json'
            // },
            url: loginurl,
            //mode: 'cors',
            success: function (data, textStatus, xhr) {
                $("#loginEmployee").css("pointer-events", "initial");
                if (data.status == true) {
                    window.location.replace("https://techsa.azurewebsites.net/"+data.GotoUrl);
                } else {
                    if (data.msg) {
                        $("#show-employee-data").html(data.msg);
                    } else {
                        swal("InValid Credential!","","error")
                        $("#show-employee-data").html("Invalid Credential!");
                    }
                    $("#alert-employee-data").show();
                    setTimeout(function () { $('#alert-employee-data').hide(); }, 4000);
                }
            },
            error: function (data, textStatus, xhr) {
                $("#loginEmployee").css("pointer-events", "initial");
                swal("InValid Credential!","","error")
                $("#show-employee-data").html("Invalid Credential!");
                $("#alert-employee-data").show();
                setTimeout(function () { $('#alert-employee-data').hide(); }, 4000);
            },
        });
    } else {
        $("#" + formid + " .login-textbox").each(function () {
            var thisinput = $(this).children("input.input");
            if (thisinput.length > 0) {
                var value = thisinput.val();
                if (value.length < 1) {
                    thisinput.parent().addClass('form-required');
                }
            }
        });
        swal("Please Fill Fields!","","warning")
    }
});
//Company-Signin
$("#loginCustomer").click(function () {
    if ($("#user_login").val() != "" && $("#user_pass").val() != "") {
        $("#loginCustomer").css("pointer-events", "none");
        $.ajax({
            type: 'POST',
            url: "https://techsa.azurewebsites.net/Account/LoginByType?log=" + $("#user_login").val() + "&pwd=" + $("#user_pass").val() + "&Utype=" + 4,
            // data: { log: $("#user_login").val(), pwd: $("#user_pass").val() },

            success: function (data, textStatus, xhr) {
                $("#loginCustomer").css("pointer-events", "initial");
                debugger;
                if (data.status == true) {
                    window.location.replace("https://techsa.azurewebsites.net/"+data.GotoUrl);
                }
                else {
                    swal("InValid Credential!","","error")
                }
            },
            error: function (data, textStatus, xhr) {

                $("#loginCustomer").css("pointer-events", "initial");
                swal("InValid Credential!","","error")

            },
        });
    }
    else {
        swal("Please Fill Fields!","","warning")
    }
});
//Company-Signup
$("#emp_register").click(function () {
    debugger;
    check = $("#emp_tac").is(':checked');

    var formid = $(this).parent().parent("form").attr("id");
    $(this).parent().parent("form").addClass("form-submited");

    if ($("#emp_name").val() != "" && $("#emp_mobile").val() != "" && $("#emp_email").val() != "" && $("#emp_copname").val() != "" && $("#emp_pass").val() != "") {


        if (isValidEmailAddress($("#emp_email").val()) && check) {
            $("#emp_register").css("pointer-events", "none");
            var customer = {
                Name: $("#emp_name").val(),
                MobilePhone: $("#emp_mobile").val(),
                Email: $("#emp_email").val(),
                CompanyName: $("#emp_copname").val(),
                Website: "",
                Password: $("#emp_pass").val(),
            };

            var jdata = JSON.stringify(customer);

            $.ajax({
                type: 'POST',
                url: "https://techsa.azurewebsites.net/api/RegisterCustomer?_Customer=" + jdata,
                //data: { _Customer: jdata },

                success: function (data, textStatus, xhr) {
                    debugger;
                    //if(data.status)
                    swal(data.msg);
                    $("#emp_register").css("pointer-events", "initial");

                },
                error: function (data, textStatus, xhr) {

                    $("#emp_register").css("pointer-events", "initial");
                    swal("InValid Credential!","","error")

                },
            });
        }
        else {

            if (!isValidEmailAddress($("#emp_email").val())) {
               swal("Please Enter Valid Email!","","warning")
                // $("#emp_email").parent().addClass('form-required');
            }
            else {
                // $("#emp_tac").parent().addClass('form-required');
                 swal("Please Check terms and conditions!","","warning")
            }


        }
    }
    else {
        $("#" + formid + " .login-textbox").each(function () {
            debugger;
            var thisinput = $(this).children("input.input");
            if (thisinput.length > 0) {
              //  alert(thisinput.attr("id"));
                var value = thisinput.val();
                if (value.length < 1) {
                //    alert(value);
                    thisinput.parent().addClass('form-required');

                }
            }

        });

        swal("Please Fill Fields!","","warning")
    }
});


function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    // alert( pattern.test(emailAddress) );
    return pattern.test(emailAddress);
};


