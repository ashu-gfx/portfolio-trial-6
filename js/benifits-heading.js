gsap.registerPlugin(ScrollTrigger)

function wrapWordsForReveal(selector) {
  document.querySelectorAll(selector).forEach(word => {
    if (word.querySelector(".text-inner1")) return;

    const text = word.innerHTML;
    word.innerHTML = `
      <span class="text-mask1">
        <span class="text-inner1">${text}</span>
      </span>
    `;
  });
}

// Apply to title1 words
wrapWordsForReveal(".title1 .word");

gsap.from(".title1 .text-inner1", {
  y: 100,
  autoAlpha: 0,
  duration: 0.9,
  ease: "power3.out",
  stagger: 0.06,
  scrollTrigger: {
    trigger: ".title1",
    start: "top 75%"
  }
});
