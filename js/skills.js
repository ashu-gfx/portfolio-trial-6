document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger)

  function wrapWordsForReveal(selector) {
    document.querySelectorAll(selector).forEach(el => {
      if (el.querySelector('.text-inner3')) return

      const words = el.textContent.trim().split(' ')
      el.innerHTML = words
        .map(
          word => `
          <span class="text-mask3">
            <span class="text-inner3">${word}</span>
          </span>
        `
        )
        .join(' ')
    })
  }

  wrapWordsForReveal('.sub-title')
  wrapWordsForReveal('.main-title')

  gsap.fromTo(
    '.skills-wrapper .text-inner3',
    { y: '100%', autoAlpha: 0 },
    {
      y: '0%',
      autoAlpha: 1,
      duration: 0.7,      // ⬅ much faster
      ease: 'power2.out',  // ⬅ snappier
      stagger: 0.1,       // ⬅ tighter stagger
      scrollTrigger: {
        trigger: '.skills-wrapper',
        start: 'top 70%',  // ⬅ triggers earlier
        once: true,
        markers: false
      }
    }
  )
})
