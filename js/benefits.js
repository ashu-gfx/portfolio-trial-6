const slider = document.querySelector('.card1s-container')

let isDown = false
let startX
let scrollLeft

slider.addEventListener('mousedown', e => {
  if (window.innerWidth > 550) return
  isDown = true
  startX = e.pageX
  scrollLeft = slider.scrollLeft
  slider.style.cursor = 'grabbing'
})

slider.addEventListener('mouseleave', () => {
  isDown = false
  slider.style.cursor = 'grab'
})

slider.addEventListener('mouseup', () => {
  isDown = false
  slider.style.cursor = 'grab'
})

slider.addEventListener('mousemove', e => {
  if (!isDown || window.innerWidth > 550) return
  e.preventDefault()
  const x = e.pageX
  const walk = (x - startX) * 1.5
  slider.scrollLeft = scrollLeft - walk
})

/* Touch support */
let touchStartX = 0

slider.addEventListener('touchstart', e => {
  if (window.innerWidth > 550) return
  touchStartX = e.touches[0].clientX
})

slider.addEventListener('touchmove', e => {
  if (window.innerWidth > 550) return
  const touchX = e.touches[0].clientX
  slider.scrollLeft += touchStartX - touchX
  touchStartX = touchX
})
