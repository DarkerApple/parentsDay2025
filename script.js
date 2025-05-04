document.addEventListener('DOMContentLoaded', function() {
  // Start the gallery animation effects
  initGalleryAnimations();
  
  // Make sure the heart button still works
  const animationButton = document.getElementById('animation');
  if (animationButton) {
    animationButton.addEventListener('click', animation);
  }
});

function initGalleryAnimations() {
  // Get all images in the gallery
  const galleryImages = document.querySelectorAll('.gallery img');
  
  // Set up individual timers for each image
  galleryImages.forEach(img => {
    // Create a wrapper div for each image if not already wrapped
    if (!img.parentElement.classList.contains('image-container')) {
      const wrapper = document.createElement('div');
      wrapper.classList.add('image-container');
      // Copy the same dimensions as the image
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    }
    
    // Set position to relative on wrapper for absolute positioning of effects
    img.parentElement.style.position = 'relative';
    
    // Start the animation cycle with a SEPARATE interval for EACH image
    setInterval(() => {
      // Add some sparkles to THIS SPECIFIC image
      for (let i = 0; i < 5; i++) {
        createSparkle(img);
      }
      
      // Add some hearts to THIS SPECIFIC image
      for (let i = 0; i < 3; i++) {
        createImageHeart(img);
      }
      
      console.log(`Added effects to image ${img.alt || 'gallery image'}`);
    }, 10000); // Run every 10 seconds for EACH image independently
    
    // Also add initial animations for each image on page load
    for (let i = 0; i < 5; i++) {
      createSparkle(img);
    }
    for (let i = 0; i < 3; i++) {
      createImageHeart(img);
    }
  });
}

function createSparkle(img) {
  const sparkle = document.createElement('div');
  sparkle.classList.add('sparkle');
  
  // Get image position and dimensions
  const rect = img.getBoundingClientRect();
  
  // Position sparkle randomly within the image
  const left = Math.random() * rect.width;
  const top = Math.random() * rect.height;
  
  // Random sparkle size
  const size = 4 + Math.random() * 8; // 4-12px
  sparkle.style.width = `${size}px`;
  sparkle.style.height = `${size}px`;
  
  // Random rotation
  const rotation = Math.random() * 360;
  sparkle.style.transform = `rotate(${rotation}deg)`;
  
  // Add the sparkle directly to the image's parent container (wrapper)
  const container = img.parentElement;
  container.appendChild(sparkle);
  
  // Set proper positioning (absolute within the relative container)
  sparkle.style.position = 'absolute';
  sparkle.style.left = `${left}px`;
  sparkle.style.top = `${top}px`;
  sparkle.style.zIndex = '10'; // Make sure it appears above the image
  
  // Random sparkle color (gold, silver, white with variations)
  const sparkleColors = [
    'gold', 'white', '#fffacd', '#ffd700', '#f0e68c', 
    '#ffec8b', '#ffffe0', '#f5f5dc'
  ];
  const sparkleColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
  sparkle.style.backgroundColor = sparkleColor;
  sparkle.style.boxShadow = `0 0 10px 2px ${sparkleColor}, 0 0 20px 4px rgba(255, 215, 0, 0.6)`;
  
  // Animation duration
  const duration = 1 + Math.random() * 2; // 1-3 seconds
  sparkle.style.animation = `sparkleAnimation ${duration}s ease-out forwards`;
  
  // Remove sparkle after animation
  setTimeout(() => {
    sparkle.remove();
  }, duration * 1000);
}

function createImageHeart(img) {
  const heart = document.createElement('div');
  heart.classList.add('image-heart');
  
  // Get image position and dimensions
  const rect = img.getBoundingClientRect();
  
  // Position heart randomly within the image
  const left = Math.random() * rect.width;
  const top = Math.random() * rect.height;
  
  // Random heart size
  const size = 10 + Math.random() * 15; // 10-25px
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  
  // Random heart color
  const colors = [
    '#ff0000', '#ff4444', '#ff6666', '#ff8888', 
    '#ff66aa', '#ff44cc', '#ff88dd', '#ffaaee'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  heart.style.backgroundColor = color;
  
  // Add the heart directly to the image's container
  const container = img.parentElement;
  container.appendChild(heart);
  
  // Set proper positioning
  heart.style.position = 'absolute';
  heart.style.left = `${left}px`;
  heart.style.top = `${top}px`;
  heart.style.zIndex = '10'; // Make sure it appears above the image
  
  // Animation duration
  const duration = 2 + Math.random() * 3; // 2-5 seconds
  heart.style.animation = `imageHeartAnimation ${duration}s ease-out forwards`;
  
  // Add inline styles for heart pseudo-elements to inherit color
  const style = document.createElement('style');
  style.textContent = `
    .image-heart[style*="background-color: ${color}"]::before,
    .image-heart[style*="background-color: ${color}"]::after {
      background-color: ${color};
    }
  `;
  document.head.appendChild(style);
  
  // Remove heart and style after animation
  setTimeout(() => {
    heart.remove();
    style.remove();
  }, duration * 1000);
}