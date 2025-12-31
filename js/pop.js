const heroText = document.querySelector('.hero-big-name');

const throttleFunction = (func, delay) => {
  let prev = 0;
  return (...args) => {
    let now = new Date().getTime();
    if (now - prev > delay) {
      prev = now;
      return func(...args);
    }
  };
};

const images5 = [
  'https://images.pexels.com/photos/12083597/pexels-photo-12083597.png',
  'https://images.pexels.com/photos/5912284/pexels-photo-5912284.jpeg',
  'https://cdn.dribbble.com/userupload/5607483/file/original-2a33f3937f840611ff458735ffb5fabd.png',
  'https://cdn.dribbble.com/userupload/3652845/file/still-a13770c912d4bcc5c0e417fe91202482.png',
  'https://framerusercontent.com/images/qUKmWu2rfHU1P1cBo6RUOtvehc.jpg'
];

const handleImageCreation = (clientX, clientY) => {
  // 1. Check if screen is large enough (Desktop/Tablet landscape)
  if (window.innerWidth <= 768) return;

  const rect5 = heroText.getBoundingClientRect();
  const threshold5 = rect5.top + rect5.height * 0.5;

  // 2. Only trigger if the cursor is in the bottom half of the element
  if (clientY > threshold5) {
    const div5 = document.createElement('div');
    div5.classList.add('imagediv6');
    
    // Position using a transform for better performance than 'left/top'
    div5.style.position = 'fixed';
    div5.style.left = clientX + 'px';
    div5.style.top = clientY + 'px';
    div5.style.pointerEvents = 'none'; // Ensure images don't block the cursor

    const img5 = document.createElement('img');
    const randomIndex5 = Math.floor(Math.random() * images5.length);
    img5.setAttribute('src', images5[randomIndex5]);
    img5.style.width = '100%'; // Ensure image fills the container

    div5.appendChild(img5);
    document.body.appendChild(div5);

    const randomRotation5 = Math.floor(Math.random() * 40) - 20;
    gsap.set(div5, { rotate: randomRotation5, xPercent: -50, yPercent: -50 });

    const tl5 = gsap.timeline();
    tl5
      .to(img5, {
        y: '0%',
        duration: 0.5,
        ease: 'power2.out'
      })
      .to(img5, {
        y: '120%',
        duration: 0.6,
        ease: 'power2.in',
        delay: 0.2,
        onComplete: () => div5.remove()
      });
  }
};

// Listen for both Mouse and Touch
const throttledHandler = throttleFunction((e) => {
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;
  handleImageCreation(x, y);
}, 100); // Reduced delay for more responsiveness on fast moves

heroText.addEventListener('mousemove', throttledHandler);
heroText.addEventListener('touchmove', throttledHandler, { passive: true });