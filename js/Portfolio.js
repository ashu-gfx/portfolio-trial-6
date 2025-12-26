const portfolioItems = [
  {
    id: 'p1',
    title: 'HEED',
    category: 'UI UX Case Study',
    imageUrl: 'https://picsum.photos/seed/bus/800/600',
    tags: ['Figma', 'Photoshop', 'Illustrator']
  },
  {
    id: 'p2',
    title: 'Fly way',
    category: 'Travel Agency Website Design',
    imageUrl: 'https://picsum.photos/seed/uiux/800/600',
    tags: ['Figma']
  },
  {
    id: 'p3',
    title: 'HEED',
    category: 'UI UX Case Study',
    imageUrl: 'https://picsum.photos/seed/phones/800/600',
    tags: ['Figma', 'Photoshop', 'Illustrator']
  },
  {
    id: 'p4',
    title: 'Fly way',
    category: 'Travel Agency Website Design',
    imageUrl: 'https://picsum.photos/seed/darkapp/800/600',
    tags: ['Figma']
  },
  {
    id: 'p5',
    title: 'HEED',
    category: 'UI UX Case Study',
    imageUrl: 'https://picsum.photos/seed/bottle/800/600',
    tags: ['Figma', 'Photoshop', 'Illustrator']
  },
  {
    id: 'p6',
    title: 'Fly way',
    category: 'Travel Agency Website Design',
    imageUrl: 'https://picsum.photos/seed/magazine/800/600',
    tags: ['Figma']
  },
  {
    id: 'p7',
    title: 'HEED',
    category: 'UI UX Case Study',
    imageUrl: 'https://picsum.photos/seed/food/800/600',
    tags: ['Figma', 'Photoshop', 'Illustrator']
  },
  {
    id: 'p8',
    title: 'Fly way',
    category: 'Travel Agency Website Design',
    imageUrl: 'https://picsum.photos/seed/3dchar/800/600',
    tags: ['Figma']
  }
]

const grid = document.getElementById('portfolioGrid')

portfolioItems.forEach(item => {
  const div = document.createElement('div')
  div.className = 'portfolio-item'

  div.innerHTML = `
      <div class="portfolio-image-box">
        <img src="${item.imageUrl}" alt="${item.title}" />

        <div class="tag-container">
          ${item.tags.map(tag => `<span class="badge2">${tag}</span>`).join('')}
        </div>
      </div>

      <div class="portfolio-info">
        <div>
          <h3 class="item-title">${item.title}</h3>
          <p class="item-category">${item.category}</p>
        </div>

        <div class="arrow-btn">
          <svg class="arrow-icon" fill="none" stroke="currentColor" stroke-width="2" 
              viewBox="0 0 24 24">
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    `

  grid.appendChild(div)
})
