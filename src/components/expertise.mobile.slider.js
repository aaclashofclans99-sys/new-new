/**
 * Expertise Mobile Slider
 * Handles infinite loop, auto-slide, and swipe gestures for the Expertise section.
 * Targeted at mobile devices only.
 */

export function initExpertiseSlider() {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) return;

  const track = document.querySelector('.mission-expertise-grid');
  const section = document.querySelector('.mission-expertise-section');
  if (!track || !section) return;

  // Cleanup existing clones and dots if re-initializing
  const existingClones = track.querySelectorAll('.clone');
  existingClones.forEach(c => c.remove());
  const existingDots = section.querySelector('.expertise-dots');
  if (existingDots) existingDots.remove();

  const originalSlides = Array.from(track.children);
  const slideCount = originalSlides.length;
  if (slideCount === 0) return;

  // Create dots container
  const dotsContainer = document.createElement('div');
  dotsContainer.className = 'expertise-dots';
  section.appendChild(dotsContainer);

  // Setup dots
  originalSlides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = `expertise-dot ${i === 0 ? 'active' : ''}`;
    dotsContainer.appendChild(dot);
  });

  // Infinite Loop setup: Clone first and last
  const firstClone = originalSlides[0].cloneNode(true);
  const lastClone = originalSlides[slideCount - 1].cloneNode(true);
  
  firstClone.classList.add('clone');
  lastClone.classList.add('clone');

  // Add clones to DOM
  track.appendChild(firstClone);
  track.insertBefore(lastClone, track.firstChild);

  const allSlides = Array.from(track.children);
  let currentIndex = 1; // Start at the first original slide
  let isTransitioning = false;
  let autoSlideInterval;

  // Position the track initially without animation
  const updatePosition = (animate = true) => {
    if (!animate) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)';
    }
    
    // Using percentages based on index. Since items are flex: 0 0 100%, 
    // each item is exactly the width of the container. 
    // Moving by 100% * index correctly positions the track.
    track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
    
    // Update dots
    const dots = section.querySelectorAll('.expertise-dot');
    let dotIndex = currentIndex - 1;
    if (currentIndex === 0) dotIndex = slideCount - 1;
    if (currentIndex === slideCount + 1) dotIndex = 0;
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === dotIndex);
    });
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updatePosition(true);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updatePosition(true);
  };

  // Handle the seamless loop "teleportation"
  const handleTransitionEnd = () => {
    isTransitioning = false;
    if (currentIndex === 0) {
      currentIndex = slideCount;
      updatePosition(false);
    } else if (currentIndex === slideCount + 1) {
      currentIndex = 1;
      updatePosition(false);
    }
  };

  track.addEventListener('transitionend', handleTransitionEnd);

  // Auto-slide logic (7 seconds)
  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval = setInterval(nextSlide, 7000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  };

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoSlide();
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) nextSlide();
    else if (touchEndX - touchStartX > swipeThreshold) prevSlide();
    startAutoSlide();
  };

  section.addEventListener('touchstart', handleTouchStart, { passive: true });
  section.addEventListener('touchend', handleTouchEnd, { passive: true });

  // Set initial position
  updatePosition(false);
  startAutoSlide();

  // Cleanup function for React component unmount
  return () => {
    stopAutoSlide();
    track.removeEventListener('transitionend', handleTransitionEnd);
    section.removeEventListener('touchstart', handleTouchStart);
    section.removeEventListener('touchend', handleTouchEnd);
  };
}
