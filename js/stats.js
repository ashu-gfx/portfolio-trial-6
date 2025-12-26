gsap.registerPlugin(ScrollTrigger)

function wrapTextForReveal (selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.querySelector('.text-inner1')) return

    const text = el.innerHTML
    el.innerHTML = `
      <span class="text-mask1">
        <span class="text-inner1">${text}</span>
      </span>
    `
  })
}

// Wrap text
wrapTextForReveal(`
  .stat-label,
  .stats-description p,
  .card h3,
  .card p
`)

// GSAP animation

gsap.registerPlugin(ScrollTrigger)

// const statsTL = gsap.timeline({
//   scrollTrigger: {
//     trigger: '.stats-section',
//     start: 'top 75%',
//     once: true
//   },
//   defaults: {
//     duration: 0.9,
//     ease: 'power3.out'
//   }
// })

// // Text reveal
// statsTL
//   .from('.stats-description .text-inner1', {
//     y: 100,
//     autoAlpha: 0
//   })
//   .from(
//     '.stat-label .text-inner1',
//     {
//       y: 100,
//       autoAlpha: 0,
//       stagger: 0.12
//     },
//     '-=0.4'
//   )

// Number increment

gsap.registerPlugin(ScrollTrigger)

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.stats-section',
      start: 'top 75%'
    },
    defaults: {
      duration: 0.9,
      ease: 'power3.out'
    }
  })
  .from('.stats-description .text-inner1', {
    y: 100,
    autoAlpha: 0
  })
  .from(
    '.stat-label .text-inner1',
    {
      y: 100,
      autoAlpha: 0,
      stagger: 0.12
    },
    '-=0.4'
  )


  .from(
    '.card h3 .text-inner1',
    {
      y: 100,
      autoAlpha: 0,
      stagger: 0.12
    },
    '-=0.4'
  )

  .from(
    '.card p .text-inner1',
    {
      y: 100,
      autoAlpha: 0,
      stagger: 0.12
    },
    '-=0.4'
  )


  
gsap.from('.stat-value', {
  scrollTrigger: {
    trigger: '.stats-section',
    start: 'top 75%',
    once: true
  },
  duration: 1.2,
  ease: 'power1.out',
  stagger: 0.2,
  onStart () {
    this.targets().forEach(el => {
      const value = el.dataset.value

      // Extract number & suffix
      const number = parseInt(value.replace(/\D/g, ''), 10)
      const suffix = value.replace(/\d/g, '')

      el._endValue = number
      el._suffix = suffix
      el._hasLeadingZero = /^0\d/.test(value)

      el.textContent = '0' + suffix
    })
  },
  onUpdate () {
    this.targets().forEach(el => {
      const progress = this.progress()
      let current = Math.round(el._endValue * progress)

      // Preserve leading zero (04 → 01,02,03...)
      if (el._hasLeadingZero && current < 10) {
        current = '0' + current
      }

      el.textContent = current + el._suffix
    })
  }
})
