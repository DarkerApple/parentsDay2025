WebFont.load({
    google: {
        families: ['Black Han Sans', 'Do Hyeon', 'Jua', 'Gowun Dodum', 'Montserrat', 'Oswald']
    }
    });
function animation() {
  // Create multiple hearts with each click
  for (let i = 0; i < 5; i++) {
    createHeart();
  }
}

// JavaScript function for creating hearts
function animation() {
  // Create multiple hearts with each click
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createHeart();
    }, i * 100); // Stagger creation slightly
  }
}

function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  
  // Randomize the size between 15px and 30px
  const size = Math.floor(Math.random() * 15) + 15;
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;
  
  // Set random position along the width of the container
  const containerWidth = document.getElementById('heart-container').offsetWidth;
  const leftPos = Math.floor(Math.random() * (containerWidth - size));
  heart.style.left = `${leftPos}px`;
  
  // Always start from the button's position
  heart.style.top = '60vh';
  
  // Randomize color
  const colors = ['#ff0000', '#ff4444', '#ff6666', '#ff8888', '#ffaaaa'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  heart.style.backgroundColor = randomColor;
  
  // Add to container
  document.getElementById('heart-container').appendChild(heart);
  
  // Set a random duration between 3-6 seconds
  const duration = 3 + Math.random() * 3;
  heart.style.animation = `floatHeart ${duration}s ease-out forwards`;
  
  // Add inline styles for pseudo-elements (to inherit the background color)
  const style = document.createElement('style');
  style.textContent = `
    .heart[style*="background-color: ${randomColor}"]::before,
    .heart[style*="background-color: ${randomColor}"]::after {
      background-color: ${randomColor};
    }
  `;
  document.head.appendChild(style);
  
  // Remove heart after animation ends
  setTimeout(() => {
    heart.remove();
    style.remove();
  }, duration * 1000 + 100);
}

// Add this to your HTML file, just before the closing </body> tag
document.addEventListener('DOMContentLoaded', function() {
  // Make sure the button has the correct event listener
  const animationButton = document.getElementById('animation');
  if (animationButton) {
    animationButton.addEventListener('click', animation);
  }
});