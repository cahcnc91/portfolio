var TxtType = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};

(function() {
  function uncheckNav() {
      document.getElementById("navi-toggle").checked = false;
  }

  function setNavOnclick() {
      Array.from(
          document.getElementsByClassName("navigation__link")
      )
      .map(navLink => navLink.addEventListener("click", uncheckNav));
  }

  function main() {
      setNavOnclick();
  }

  main();
})()

// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  

  $(document).ready(function() {

    var form = $('#form'),
        email = $('#email'),
        subject = $('#subject'),
        message = $('#message'),
        info = $('#info'),
        submit = $("#submit");
    
    form.on('input', '#email, #subject, #message', function() {
      $(this).css('border-color', '');
      info.html('').slideUp();
    });
    
    submit.on('click', function(e) {
      e.preventDefault();
      if(validate()) {
        $.ajax({
          type: "POST",
          url: "mailer.php",
          crossDomain: true,
          data: form.serialize(),
          dataType: "json"
        }).done(function(data) {
          if(data.success) {
            email.val('');
            subject.val('');
            message.val('');
            info.html('Message sent!').css('color', 'green').slideDown();
          } else {
            info.html('Could not send mail! Sorry!').css('color', 'red').slideDown();
          }
        });
      }
    });
    
    function validate() {
      var valid = true;
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      
      if(!regex.test(email.val())) {
        email.css('border-color', 'red');
        valid = false;
      }
      if($.trim(subject.val()) === "") {
        subject.css('border-color', 'red');
        valid = false;
      }
      if($.trim(message.val()) === "") {
        message.css('border-color', 'red');
        valid = false;
      }
      
      return valid;
    }
  
  });