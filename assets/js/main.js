function splitText() {
  const el = $('.eachText');
  el.each(function() {
    const text = $(this).text();
    let textBox = '';
    text.split('').forEach(function(t, i) {
      if (t != ' ') {
        if (i < 10) {
          textBox += '<span style="animation-delay:.' + i  + 's;">' + t + '</span>';
        } else {
          const n = i / 10;
          textBox += '<span style="animation-delay:' + n  + 's;">' + t + '</span>';
        }
      } else {
        textBox += t;
      }
    });
    $(this).html(textBox);
  });
}

function eachTextAnime() {
  $('.eachText').each(function() {
    const elTop = $('main').offset().top;
    const scroll = $(window).scrollTop();
    if (scroll >= elTop) {
      $(this).removeClass('appearText');
    } else {
      $(this).addClass('appearText');
    }
  });
}

function vegasChange() {
  const elTop = $('main').offset().top;
  const scroll = $(window).scrollTop();
  if (scroll >= elTop) {
    $('.hero__slider').vegas('pause');
  } else {
    $('.hero__slider').vegas('play');
  }
}

function vegasInit() {
  const image = [
    { src: 'assets/images/hero01.jpg' },
    { src: 'assets/images/hero02.jpg' },
    { src: 'assets/images/hero03.jpg' },
  ];

  $('.hero__slider').vegas({
    overlay: false,
    transition: 'fade2',
    transitionDuration: 1500,
    delay: 10000,
    animationDuration: 20000,
    animation: 'kenburns',
    slides: image,
    timer: false,
  });
}

function fadeAnime() {
  $('.fadeUpTrigger').each(function() {
    const elTop = $(this).offset().top - 50;
    const scroll = $(window).scrollTop();
    const winH = $(window).height();
    if (scroll >= elTop - winH) {
      $(this).addClass('fadeUp');
    } else {
      $(this).removeClass('fadeUp');
    }
  });
  $('.bgSlideTrigger').each(function() {
    const elTop = $(this).offset().top - 50;
    const scroll = $(window).scrollTop();
    const winH = $(window).height();
    if (scroll >= elTop - winH) {
      $(this).addClass('bgSlide');
    } else {
      $(this).removeClass('bgSlide');
    }
  });
  $('.bgAppearTrigger').each(function() {
    const elTop = $(this).offset().top - 50;
    const scroll = $(window).scrollTop();
    const winH = $(window).height();
    if (scroll >= elTop - winH) {
      $(this).addClass('bgAppear');
    } else {
      $(this).removeClass('bgAppear');
    }
  });
}

function navAnime() {
  const elTop = $('main').offset().top;
  const scroll = $(window).scrollTop();
  const headerH = $('.header').outerHeight();
  if (scroll >= elTop - headerH) {
    $('.header').removeClass('non');
  } else {
    $('.header').addClass('non');
  }
}

function pageTop() {
  const pageTop = $('.global__page-top');
  const scroll = $(window).scrollTop();
  const winH = $(window).height();
  const elTop = $('.about').offset().top;
  if (scroll >= elTop - winH) {
    pageTop.addClass('UpMove');
    pageTop.removeClass('DownMove');
  } else {
    pageTop.addClass('DownMove');
    pageTop.removeClass('UpMove');
  }

  const wIH = window.innerHeight;
  const footerPos = $('.footer').offset().top;
  if (scroll + wIH >= footerPos + 20) {
    const pos = scroll + wIH - footerPos + 20;
    pageTop.css('bottom', pos);
  } else {
    pageTop.css('bottom', '20px');
  }
}

$('.global__btn').click(function() {
  $('body').toggleClass('active');
});

$('.global__link, .global__top').click(function() {
  $('body').removeClass('active');
});

$('.global__page-top, .header__top, .global__top').click(function() {
  $('body, html').animate({
    scrollTop: 0,
  }, 500);
  return false;
});

$('.global__link, .header__link, .menu-hero__link').click(function() {
  const elHash = $(this).attr('href');
  const headerH = $('.header').outerHeight(true);
  const pos = Math.round($(elHash).offset().top - headerH);
  $('body, html').animate({
    scrollTop: pos,
  }, 500);
  return false;
});

$('.menu__btn').click(function() {
  const close = $('.menu__close');
  const hidden = $('.menu__hidden');
  if (close.hasClass('DownMove')) {
    close.removeClass('DownMove');
    close.addClass('UpMove');
    hidden.slideDown(500);
    $(this).html('Back');
  } else {
    close.removeClass('UpMove');
    close.addClass('DownMove');
    hidden.slideUp(500);
    $(this).html('More');
  }
});

$(window).ready(function() {
  splitText();
  $(window).on('load', function() {
    $('.loader__logo').delay(1000).fadeOut('slow');
    $('.loader').delay(1500).fadeOut('slow', function() {
      $('body').addClass('appear');
      vegasInit();
    });
    $('.loader__slide').on('animationend', function() {
      pageTop();
      fadeAnime();
      navAnime();
      eachTextAnime();
      vegasChange();
  
      $(window).resize(function() {
        pageTop();
        fadeAnime();
        navAnime();
        eachTextAnime();
        vegasChange();
      })
      
      $(window).scroll(function() {
        pageTop();
        fadeAnime();
        navAnime();
        eachTextAnime();
        vegasChange();
      });
    });
  });
});