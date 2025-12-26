document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger)

  function wrapWordsForReveal (selector) {
    document.querySelectorAll(selector).forEach(word => {
      if (word.querySelector('.text-inner3')) return

      const text = word.innerHTML.trim()
      word.innerHTML = `
        <span class="text-mask3">
          <span class="text-inner3">${text}</span>
        </span>
      `
    })
  }

  // Wrap the words
  wrapWordsForReveal('.heading .word3')

  // Animate
  gsap.fromTo(
    '.heading .text-inner3',
    { y: '100%', autoAlpha: 0 },
    {
      y: '0%',
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.06,
      scrollTrigger: {
        trigger: '.heading',
        start: 'top 75%',
        once: true,
        markers: false // for debugging
      }
    }
  )
})

// discription animation

document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger)

  // Wrap each word in a selector
  function wrapWordsForReveal (selector) {
    document.querySelectorAll(selector).forEach(el => {
      if (el.querySelector('.text-inner3')) return

      const words = el.textContent.trim().split(' ') // split text into words
      el.innerHTML = words
        .map(
          word => `
          <span class="text-mask3">
            <span class="text-inner3">${word}</span>
          </span>
        `
        )
        .join(' ') // preserve spaces
    })
  }

  // Apply to description and role
  wrapWordsForReveal('.description')
  wrapWordsForReveal('.role')
  wrapWordsForReveal('.company')
  wrapWordsForReveal('.period')

  // Animate all .text-inner3
  gsap.fromTo(
    '.text-inner3',
    { y: '100%', autoAlpha: 0 },
    {
      y: '0%',
      autoAlpha: 1,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.05,
      scrollTrigger: {
        trigger: '.layout', // trigger once when layout scrolls into view
        start: 'top 80%',
        once: true,
        markers: false // set to true to debug
      }
    }
  )

  gsap.from('.exp-item', {
    borderBottomWidth: 0,
    borderBottomColor: '#ddd',
    autoAlpha: 0,
    duration: 1.6,
    ease: 'power2.out',
    stagger: 0.1
  })
})
