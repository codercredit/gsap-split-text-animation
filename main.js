gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

function tg_title_animation() {
  var tg_var = jQuery(".title-anime");
  if (!tg_var.length) {
    return;
  }
  const quotes = document.querySelectorAll(
    ".title-anime .sec-title,.title-anime .newsletter-title,.title-anime .sec-subtitle"
  );

  quotes.forEach((quote) => {
    // Reset if needed
    if (quote.animation) {
      quote.animation.progress(1).kill();
      quote.split.revert();
    }

    var getclass = quote.closest(".title-anime").className;
    var animation = getclass.split("animation-");
    if (animation[1] == "style4") return;

    quote.split = new SplitText(quote, {
      type: "lines,words,chars",
      linesClass: "split-line",
    });
    gsap.set(quote, { perspective: 1000 });

    // Animation style 1: Vertical drop with rotation
    if (animation[1] == "style1") {
      gsap.set(quote.split.chars, {
        opacity: 0,
        y: "90%",
        rotateX: "-40deg",
      });
    }
    // Animation style 2: Horizontal slide-in
    if (animation[1] == "style2") {
      gsap.set(quote.split.chars, {
        opacity: 0,
        x: "50",
      });
    }
    // Animation style 3: Fade-in
    if (animation[1] == "style3") {
      gsap.set(quote.split.chars, {
        opacity: 0,
      });
    }
    // Animation style 4: Skew-in effect
    if (animation[1] == "style4") {
      gsap.set(quote.split.chars, {
        opacity: 0,
        skewX: "-30deg",
        scale: 0.8,
      });
    }
    // Animation style 5: Scale-up effect
    if (animation[1] == "style5") {
      gsap.set(quote.split.chars, {
        opacity: 0,
        scale: 0.5,
      });
    }
    // Animation style 6: Rotation and fade-in from the top
    if (animation[1] == "style6") {
      gsap.set(quote.split.chars, {
        opacity: 0,
        y: "-100%",
        rotate: "45deg",
      });
    }

    quote.animation = gsap.to(quote.split.chars, {
      scrollTrigger: {
        trigger: quote,
        start: "top 90%",
      },
      x: "0",
      y: "0",
      rotateX: "0",
      rotate: "0",
      opacity: 1,
      skewX: "0",
      scale: 1,
      duration: 1,
      ease: Back.easeOut,
      stagger: 0.02,
    });
  });
}

ScrollTrigger.addEventListener("refresh", tg_title_animation);
