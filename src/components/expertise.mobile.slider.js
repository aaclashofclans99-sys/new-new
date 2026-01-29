/**
 * Expertise Mobile Slider - Professional Edition
 * Production-ready slider with proper state management, error handling, and performance optimizations
 */

export class ExpertiseSlider {
  constructor() {
    this.track = null;
    this.section = null;
    this.slides = [];
    this.currentIndex = 0;
    this.realSlideCount = 0;
    this.isTransitioning = false;
    this.isAnimating = false;
    this.autoSlideInterval = null;
    this.touchStartX = 0;
    this.touchStartTime = 0;
    this.touchEndX = 0;
    this.swipeThreshold = 50;
    this.swipeVelocityThreshold = 0.3;
    this.autoSlideDelay = 7000;
    this.transitionDuration = 400;
    
    // Performance optimizations
    this.rafId = null;
    this.lastUpdateTime = 0;
    this.animationFrameRate = 60;
    
    // State machine
    this.state = {
      IDLE: 'idle',
      TRANSITIONING: 'transitioning',
      AUTO_SLIDING: 'auto_sliding',
      MANUAL_SLIDING: 'manual_sliding'
    };
    this.currentState = this.state.IDLE;
    
    // Bind methods
    this.nextSlide = this.nextSlide.bind(this);
    this.prevSlide = this.prevSlide.bind(this);
    this.goToSlide = this.goToSlide.bind(this);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
    
    // Throttled methods
    this.updateSlider = this.throttle(this.updateSlider.bind(this), 16);
  }

  // Throttle utility for performance
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Initialize slider
  init() {
    if (window.innerWidth > 768) return null;
    
    try {
      this.section = document.querySelector('.mission-expertise-section');
      this.track = document.querySelector('.mission-expertise-grid');
      
      if (!this.section || !this.track) {
        console.warn('Slider elements not found');
        return null;
      }

      // Get original slides
      this.slides = Array.from(this.track.children);
      this.realSlideCount = this.slides.length;
      
      if (this.realSlideCount < 1) {
        console.warn('No slides found for slider');
        return null;
      }

      // Setup DOM
      this.setupDOM();
      
      // Setup event listeners
      this.setupEventListeners();
      
      // Start auto-slide
      this.startAutoSlide();
      
      // Initial update
      this.updateSlider();
      
      // Log initialization
      console.log(`ExpertiseSlider initialized with ${this.realSlideCount} slides`);
      
      return this;
    } catch (error) {
      console.error('Failed to initialize ExpertiseSlider:', error);
      return null;
    }
  }

  setupDOM() {
    // Add transition class
    this.track.classList.add('transition-enabled');
    
    // Create navigation buttons
    this.createNavigationButtons();
    
    // Create dots
    this.createDots();
    
    // Add loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'slider-loading';
    loadingIndicator.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner-circle"></div>
      </div>
    `;
    this.section.appendChild(loadingIndicator);
    this.loadingIndicator = loadingIndicator;
  }

  createNavigationButtons() {
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-nav-button prev';
    prevButton.setAttribute('aria-label', 'Previous slide');
    prevButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    `;
    prevButton.addEventListener('click', this.prevSlide);
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.className = 'slider-nav-button next';
    nextButton.setAttribute('aria-label', 'Next slide');
    nextButton.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    `;
    nextButton.addEventListener('click', this.nextSlide);
    
    this.section.appendChild(prevButton);
    this.section.appendChild(nextButton);
    
    this.prevButton = prevButton;
    this.nextButton = nextButton;
  }

  createDots() {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'expertise-dots';
    
    for (let i = 0; i < this.realSlideCount; i++) {
      const dot = document.createElement('button');
      dot.className = 'expertise-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.setAttribute('data-index', i);
      
      // Progress bar for active dot
      const progressBar = document.createElement('div');
      progressBar.className = 'progress-bar';
      dot.appendChild(progressBar);
      
      dot.addEventListener('click', () => this.goToSlide(i));
      dotsContainer.appendChild(dot);
    }
    
    this.section.appendChild(dotsContainer);
    this.dotsContainer = dotsContainer;
    this.dots = Array.from(dotsContainer.children);
  }

  setupEventListeners() {
    // Touch events
    this.section.addEventListener('touchstart', this.handleTouchStart, { passive: true });
    this.section.addEventListener('touchmove', this.handleTouchMove, { passive: true });
    this.section.addEventListener('touchend', this.handleTouchEnd, { passive: true });
    
    // Mouse events for desktop touch
    this.section.addEventListener('mousedown', this.handleTouchStart);
    this.section.addEventListener('mousemove', this.handleTouchMove);
    this.section.addEventListener('mouseup', this.handleTouchEnd);
    this.section.addEventListener('mouseleave', this.handleTouchEnd);
    
    // Transition end
    this.track.addEventListener('transitionend', this.handleTransitionEnd);
    
    // Visibility change for performance
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Resize handling
    window.addEventListener('resize', this.handleResize);
    
    // Prevent context menu on slider
    this.section.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  handleTouchStart(e) {
    this.stopAutoSlide();
    
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    this.touchStartX = clientX;
    this.touchStartTime = Date.now();
    
    // Reset velocity tracking
    this.velocity = 0;
    this.lastTouchX = clientX;
    this.lastTouchTime = Date.now();
    
    // Prevent track transition during swipe
    this.track.classList.remove('transition-enabled');
    this.track.classList.add('transition-disabled');
  }

  handleTouchMove(e) {
    if (!this.touchStartX || this.isTransitioning) return;
    
    e.preventDefault();
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    const currentTime = Date.now();
    const deltaTime = currentTime - this.lastTouchTime;
    
    if (deltaTime > 0) {
      const deltaX = clientX - this.lastTouchX;
      this.velocity = deltaX / deltaTime;
      this.lastTouchX = clientX;
      this.lastTouchTime = currentTime;
    }
    
    const deltaX = clientX - this.touchStartX;
    const transformValue = -this.currentIndex * 100 + (deltaX / window.innerWidth) * 100;
    
    // Use requestAnimationFrame for smooth updates
    if (!this.rafId) {
      this.rafId = requestAnimationFrame(() => {
        this.track.style.transform = `translate3d(${transformValue}%, 0, 0)`;
        this.rafId = null;
      });
    }
  }

  handleTouchEnd(e) {
    if (!this.touchStartX) return;
    
    const clientX = e.type.includes('mouse') ? e.clientX : (e.changedTouches ? e.changedTouches[0].clientX : 0);
    this.touchEndX = clientX;
    const deltaTime = Date.now() - this.touchStartTime;
    
    // Calculate final delta and velocity
    const deltaX = this.touchEndX - this.touchStartX;
    const velocity = Math.abs(deltaX) / deltaTime;
    
    // Determine swipe direction with velocity consideration
    const isFastSwipe = velocity > this.swipeVelocityThreshold;
    const isSignificantSwipe = Math.abs(deltaX) > this.swipeThreshold;
    
    if (isFastSwipe || isSignificantSwipe) {
      if (deltaX > 0) {
        this.prevSlide();
      } else {
        this.nextSlide();
      }
    } else {
      // Return to current position
      this.updateSlider();
    }
    
    // Clean up
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartTime = 0;
    
    // Re-enable transitions
    this.track.classList.remove('transition-disabled');
    this.track.classList.add('transition-enabled');
    
    // Restart auto-slide
    this.startAutoSlide();
  }

  nextSlide() {
    if (this.isTransitioning || this.currentState === this.state.TRANSITIONING) {
      return;
    }
    
    this.setState(this.state.TRANSITIONING);
    this.currentIndex = (this.currentIndex + 1) % this.realSlideCount;
    this.updateSlider(true);
  }

  prevSlide() {
    if (this.isTransitioning || this.currentState === this.state.TRANSITIONING) {
      return;
    }
    
    this.setState(this.state.TRANSITIONING);
    this.currentIndex = (this.currentIndex - 1 + this.realSlideCount) % this.realSlideCount;
    this.updateSlider(true);
  }

  goToSlide(index) {
    if (this.isTransitioning || this.currentState === this.state.TRANSITIONING || index === this.currentIndex) {
      return;
    }
    
    this.setState(this.state.TRANSITIONING);
    this.currentIndex = index;
    this.updateSlider(true);
  }

  updateSlider(animate = false) {
    if (!this.track) return;
    
    // Cancel any pending animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    // Update track position with 3D transform for hardware acceleration
    this.track.style.transform = `translate3d(-${this.currentIndex * 100}%, 0, 0)`;
    
    // Update dots
    this.updateDots();
    
    // Log current position for debugging
    console.debug(`Slider moved to position: ${this.currentIndex}`);
  }

  updateDots() {
    if (!this.dots) return;
    
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
      
      // Reset and restart progress animation
      const progressBar = dot.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.animation = 'none';
        void progressBar.offsetWidth; // Trigger reflow
        if (index === this.currentIndex) {
          progressBar.style.animation = `slideProgress ${this.autoSlideDelay}ms linear forwards`;
        }
      }
    });
  }

  handleTransitionEnd(e) {
    if (e.target !== this.track) return;
    
    // Reset state
    this.setState(this.state.IDLE);
    this.isTransitioning = false;
  }

  startAutoSlide() {
    this.stopAutoSlide();
    
    this.autoSlideInterval = setInterval(() => {
      if (this.currentState === this.state.IDLE && !this.isTransitioning) {
        this.setState(this.state.AUTO_SLIDING);
        this.nextSlide();
      }
    }, this.autoSlideDelay);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }

  setState(newState) {
    const oldState = this.currentState;
    this.currentState = newState;
    
    // Handle state changes
    switch (newState) {
      case this.state.TRANSITIONING:
        this.isTransitioning = true;
        this.stopAutoSlide();
        break;
      case this.state.IDLE:
        this.isTransitioning = false;
        break;
    }
    
    // Log state changes in development
    if (process.env.NODE_ENV === 'development') {
      console.debug(`Slider state: ${oldState} -> ${newState}`);
    }
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.stopAutoSlide();
      this.setState(this.state.IDLE);
    } else {
      this.startAutoSlide();
    }
  }

  handleResize() {
    // Debounce resize handling
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      if (window.innerWidth > 768) {
        this.destroy();
      } else if (!this.track) {
        this.init();
      } else {
        this.updateSlider();
      }
    }, 150);
  }

  destroy() {
    // Clean up everything
    this.stopAutoSlide();
    
    // Remove event listeners
    if (this.section) {
      this.section.removeEventListener('touchstart', this.handleTouchStart);
      this.section.removeEventListener('touchmove', this.handleTouchMove);
      this.section.removeEventListener('touchend', this.handleTouchEnd);
      this.section.removeEventListener('mousedown', this.handleTouchStart);
      this.section.removeEventListener('mousemove', this.handleTouchMove);
      this.section.removeEventListener('mouseup', this.handleTouchEnd);
      this.section.removeEventListener('mouseleave', this.handleTouchEnd);
    }
    
    if (this.track) {
      this.track.removeEventListener('transitionend', this.handleTransitionEnd);
    }
    
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    window.removeEventListener('resize', this.handleResize);
    
    // Remove navigation buttons
    if (this.prevButton) this.prevButton.remove();
    if (this.nextButton) this.nextButton.remove();
    
    // Remove dots
    if (this.dotsContainer) this.dotsContainer.remove();
    
    // Remove loading indicator
    if (this.loadingIndicator) this.loadingIndicator.remove();
    
    // Cancel animation frame
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    
    // Clear all timeouts
    clearTimeout(this.resizeTimeout);
    
    // Reset properties
    this.track = null;
    this.section = null;
    this.slides = [];
    this.currentIndex = 0;
    this.isTransitioning = false;
    this.currentState = this.state.IDLE;
    
    console.log('ExpertiseSlider destroyed');
  }
}

// Factory function for backward compatibility
export function initExpertiseSlider() {
  // Check if already initialized
  if (window.__expertiseSlider) {
    console.warn('ExpertiseSlider already initialized');
    return () => window.__expertiseSlider?.destroy();
  }
  
  // Initialize only on mobile
  if (window.innerWidth > 768) {
    return () => {};
  }
  
  try {
    const slider = new ExpertiseSlider();
    const instance = slider.init();
    
    if (instance) {
      window.__expertiseSlider = instance;
      return () => {
        if (window.__expertiseSlider) {
          window.__expertiseSlider.destroy();
          delete window.__expertiseSlider;
        }
      };
    }
  } catch (error) {
    console.error('Failed to initialize slider:', error);
  }
  
  return () => {};
}