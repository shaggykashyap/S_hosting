document.addEventListener('DOMContentLoaded', () => {
  // ==================== AUDIO SETUP ====================
  const audio = document.getElementById('bgMusic');
  audio.volume = 0.3;
  
  // Auto-play after any user interaction
  const playAudio = () => {
    audio.play().catch(e => console.log("Audio play prevented:", e));
    document.body.removeEventListener('click', playAudio);
    document.body.removeEventListener('keydown', playAudio);
  };
  
  document.body.addEventListener('click', playAudio);
  document.body.addEventListener('keydown', playAudio);

  // ==================== TYPEWRITER EFFECT ====================
  const apologyText = document.getElementById('apologyText');
  const messages = [
    "My dearest Parna...",
    "I messed up big time 🥺",
    "But and I know that....",
    "can you please consider forgiving me? 🥹",
    "You're my only normal friend 💖",
    "Will you forgive your pookie? 😘"
  ];
  
  let i = 0, j = 0, isDeleting = false;
  
  function typeWriter() {
    const currentMessage = messages[i];
    if (isDeleting) {
      apologyText.innerHTML = currentMessage.substring(0, j--) + '<span class="blink">|</span>';
      if (j < 0) {
        isDeleting = false;
        i = (i + 1) % messages.length;
        setTimeout(typeWriter, 1000);
        return;
      }
    } else {
      apologyText.innerHTML = currentMessage.substring(0, j++) + '<span class="blink">|</span>';
      if (j > currentMessage.length) {
        isDeleting = true;
        setTimeout(typeWriter, 2000);
        return;
      }
    }
    setTimeout(typeWriter, isDeleting ? 50 : 100);
  }
  typeWriter();

  // ==================== FLOATING HEARTS ====================
  function createHearts() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 4 + 3 + 's';
    heart.style.color = `hsl(${Math.random() * 30 + 330}, 100%, 70%)`;
    document.querySelector('.hearts').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }
  setInterval(createHearts, 300);

  // ==================== CLICK HEART EXPLOSIONS ====================
  document.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
      for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        heart.style.animation = 'explode 1s forwards';
        heart.style.color = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`;
        document.querySelector('.hearts').appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
      }
    }
  });

  // ==================== SURPRISE MODAL ====================
  const modal = document.getElementById('surpriseModal');
  const modalContent = document.querySelector('.modal-content');
  const surpriseBtn = document.getElementById('surpriseBtn');
  const closeBtn = document.querySelector('.close-btn');
  const forgiveBtn = document.getElementById('forgiveBtn');
  const noForgiveBtn = document.getElementById('noForgiveBtn');
  const responseText = document.getElementById('responseText');

  // Open modal with animations
  function openModal() {
    modal.style.display = 'block';
    
    // Reset animations
    modalContent.style.animation = 'none';
    document.querySelector('.parna-photo').style.animation = 'none';
    document.querySelector('.modal-text').style.animation = 'none';
    document.querySelector('.forgiveness-buttons').style.animation = 'none';
    
    void modalContent.offsetWidth; // Trigger reflow
    
    // Apply animations with delays
    modalContent.style.animation = 'fadeInScale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    setTimeout(() => {
      document.querySelector('.parna-photo').style.animation = 'slideIn 0.7s ease-out both';
      document.querySelector('.modal-text').style.animation = 'fadeInScale 0.5s both';
      document.querySelector('.forgiveness-buttons').style.animation = 'slideIn 0.6s both';
    }, 10);
  }

  // Close modal with animation
  function closeModal() {
    modalContent.style.animation = 'fadeInScale 0.3s reverse forwards';
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }

  surpriseBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);

  // Close when clicking outside modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ==================== FORGIVENESS BUTTONS ====================
  forgiveBtn.addEventListener('click', () => {
    // Animate button press
    forgiveBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      forgiveBtn.style.transform = 'scale(1)';
    }, 200);
    
    responseText.innerHTML = "Thank you sooo much pookie! 💖💖";
    responseText.style.animation = 'fadeInScale 0.5s both';
    
    // Hide buttons temporarily
    forgiveBtn.style.display = 'none';
    noForgiveBtn.style.display = 'none';
    
    // Close modal after delay
    setTimeout(() => {
      closeModal();
      // Reset for next time
      setTimeout(() => {
        forgiveBtn.style.display = 'inline-block';
        noForgiveBtn.style.display = 'inline-block';
        responseText.innerHTML = "";
        noForgiveBtn.textContent = "No forgiveness 😠";
        noForgiveBtn.style.backgroundColor = "#f44336";
        noForgiveBtn.classList.remove('pleading');
      }, 500);
    }, 2000);
  });

  noForgiveBtn.addEventListener('click', () => {
    // Shake animation
    noForgiveBtn.classList.add('pleading');
    noForgiveBtn.textContent = "Please... 🥺";
    noForgiveBtn.style.backgroundColor = "#ff9800";
    
    // Reset after delay
    setTimeout(() => {
      noForgiveBtn.classList.remove('pleading');
      noForgiveBtn.textContent = "No forgiveness 😠";
      noForgiveBtn.style.backgroundColor = "#f44336";
    }, 2000);
  });

  // ==================== KEYBOARD SUPPORT ====================
  document.addEventListener('keydown', (e) => {
    // ESC to close modal
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
});