// Function to update the active state of sidebar links based on scroll position
const observerOptions = {
  root: null,
  rootMargin: '-100px 0px -70% 0px', // Matches the 100px Offset Y
  threshold: 0
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id')
    const sidebarLink = document.querySelector(
      `.sidebar-service-title[href="#${id}"]`
    )

    if (entry.isIntersecting) {
      // Remove active class from all and add to the current one
      document.querySelectorAll('.sidebar-service-title').forEach(link => {
        link.classList.remove('active')
      })
      sidebarLink.classList.add('active')
    }
  })
}, observerOptions)

// Observe each service card
document.querySelectorAll('.service-card').forEach(card => {
  observer.observe(card)
})

// view JS

// view Data (converted from your constants)
const viewItems = document.querySelectorAll('.view-item')

viewItems.forEach(item => {
  const button = item.querySelector('.view-button')

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('open')

    // Close all
    viewItems.forEach(i => i.classList.remove('open'))

    // Open clicked item if it was closed
    if (!isOpen) item.classList.add('open')
  })
})
