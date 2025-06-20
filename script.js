document.addEventListener('DOMContentLoaded', () => {
  try {
    // ==================== AUDIO SETUP ====================
    const audio = document.getElementById('bgMusic');
    if (audio) {
      audio.volume = 0.3;
      
      let audioPlayed = false;
      const playAudio = () => {
        if (!audioPlayed) {
          audio.play()
            .then(() => {
              audioPlayed = true;
              document.body.removeEventListener('click', playAudio);
              document.body.removeEventListener('keydown', playAudio);
              document.body.removeEventListener('touchstart', playAudio);
            })
            .catch(e => {
              console.log("Audio play prevented:", e);
              // Show play button if audio is blocked
              const playButton = document.createElement('button');
              playButton.textContent = '▶ Click to enable music';
              playButton.style.position = 'fixed';
              playButton.style.bottom = '20px';
              playButton.style.right = '20px';
              playButton.style.zIndex = '1000';
              playButton.style.padding = '10px 15px';
              playButton.style.borderRadius = '20px';
              playButton.style.backgroundColor = '#ff69b4';
              playButton.style.color = 'white';
              playButton.style.border = 'none';
              playButton.style.cursor = 'pointer';
              playButton.addEventListener('click', () => {
                audio.play().then(() => playButton.remove());
              });
              document.body.appendChild(playButton);
            });
        }
      };

      // Add event listeners for user interaction
      document.body.addEventListener('click', playAudio);
      document.body.addEventListener('keydown', playAudio);
      document.body.addEventListener('touchstart', playAudio);
    }

    // ==================== TYPEWRITER EFFECT ====================
    const apologyText = document.getElementById('apologyText');
    if (apologyText) {
      const messages = [
        "My dearest Parna...",
        "I messed up big time 🥺",
        "But I know that...",
        "can you please consider forgiving me? 🥹",
        "You're my only normal friend 💖",
        "Will you forgive your pookie? 😘"
      ];
      
      let i = 0, j = 0, isDeleting = false;
      let typeTimeout;
      
      function typeWriter() {
        const currentMessage = messages[i];
        if (isDeleting) {
          apologyText.innerHTML = currentMessage.substring(0, j--) + '<span class="blink">|</span>';
          if (j < 0) {
            isDeleting = false;
            i = (i + 1) % messages.length;
            typeTimeout = setTimeout(typeWriter, 1000);
            return;
          }
        } else {
          apologyText.innerHTML = currentMessage.substring(0, j++) + '<span class="blink">|</span>';
          if (j > currentMessage.length) {
            isDeleting = true;
            typeTimeout = setTimeout(typeWriter, 2000);
            return;
          }
        }
        typeTimeout = setTimeout(typeWriter, isDeleting ? 50 : 100);
      }
      
      typeWriter();
      
      // Clean up timeout when leaving page
      window.addEventListener('beforeunload', () => {
        if (typeTimeout) clearTimeout(typeTimeout);
      });
    }

    // ==================== FLOATING HEARTS ====================
    function createHearts() {
      const heartsContainer = document.querySelector('.hearts');
      if (!heartsContainer) return;
      
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.innerHTML = '❤️';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 4 + 3 + 's';
      heart.style.color = `hsl(${Math.random() * 30 + 330}, 100%, 70%)`;
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }
    
    const heartInterval = setInterval(createHearts, 300);
    
    // Clean up interval when leaving page
    window.addEventListener('beforeunload', () => {
      clearInterval(heartInterval);
    });

    // ==================== CLICK HEART EXPLOSIONS ====================
    document.addEventListener('click', (e) => {
      if (!e.target.closest('button')) {
        const heartsContainer = document.querySelector('.hearts');
        if (!heartsContainer) return;
        
        for (let i = 0; i < 15; i++) {
          const heart = document.createElement('div');
          heart.classList.add('heart');
          heart.innerHTML = '❤️';
          heart.style.left = e.clientX + 'px';
          heart.style.top = e.clientY + 'px';
          heart.style.animation = 'explode 1s forwards';
          heart.style.color = `hsl(${Math.random() * 60 + 330}, 100%, 70%)`;
          heartsContainer.appendChild(heart);
          setTimeout(() => heart.remove(), 1000);
        }
      }
    });

    // ==================== MODAL HANDLING ====================
    const modal = document.getElementById('surpriseModal');
    if (modal) {
      const modalContent = modal.querySelector('.modal-content');
      const surpriseBtn = document.getElementById('surpriseBtn');
      const closeBtn = modal.querySelector('.close-btn');
      const forgiveBtn = modal.querySelector('#forgiveBtn');
      const noForgiveBtn = modal.querySelector('#noForgiveBtn');
      const responseText = modal.querySelector('#responseText');

      // Open modal with animations
      function openModal() {
        modal.style.display = 'block';
        
        // Reset animations
        modalContent.style.animation = 'none';
        const photo = modal.querySelector('.parna-photo');
        const text = modal.querySelector('.modal-text');
        const buttons = modal.querySelector('.forgiveness-buttons');
        
        void modalContent.offsetWidth; // Trigger reflow
        
        // Apply animations with delays
        modalContent.style.animation = 'fadeInScale 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        if (photo) photo.style.animation = 'slideIn 0.7s ease-out both';
        if (text) text.style.animation = 'fadeInScale 0.5s both';
        if (buttons) buttons.style.animation = 'slideIn 0.6s both';
      }

      // Close modal with animation
      function closeModal() {
        modalContent.style.animation = 'fadeInScale 0.3s reverse forwards';
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }

      if (surpriseBtn) surpriseBtn.addEventListener('click', openModal);
      if (closeBtn) closeBtn.addEventListener('click', closeModal);

      // Close when clicking outside modal
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal();
        }
      });

      // ==================== FORGIVENESS BUTTONS ====================
      if (forgiveBtn) {
        forgiveBtn.addEventListener('click', () => {
          forgiveBtn.style.transform = 'scale(0.95)';
          setTimeout(() => {
            forgiveBtn.style.transform = 'scale(1)';
          }, 200);
          
          if (responseText) {
            responseText.innerHTML = "Thank you sooo much pookie! 💖💖";
            responseText.style.animation = 'fadeInScale 0.5s both';
          }
          
          if (forgiveBtn) forgiveBtn.style.display = 'none';
          if (noForgiveBtn) noForgiveBtn.style.display = 'none';
          
          setTimeout(() => {
            closeModal();
            setTimeout(() => {
              if (forgiveBtn) forgiveBtn.style.display = 'inline-block';
              if (noForgiveBtn) {
                noForgiveBtn.style.display = 'inline-block';
                noForgiveBtn.textContent = "No forgiveness 😠";
                noForgiveBtn.style.backgroundColor = "#f44336";
                noForgiveBtn.classList.remove('pleading');
              }
              if (responseText) responseText.innerHTML = "";
            }, 500);
          }, 2000);
        });
      }

      if (noForgiveBtn) {
        noForgiveBtn.addEventListener('click', () => {
          noForgiveBtn.classList.add('pleading');
          noForgiveBtn.textContent = "Please... 🥺";
          noForgiveBtn.style.backgroundColor = "#ff9800";
          
          setTimeout(() => {
            noForgiveBtn.classList.remove('pleading');
            noForgiveBtn.textContent = "No forgiveness 😠";
            noForgiveBtn.style.backgroundColor = "#f44336";
          }, 2000);
        });
      }
    }

    // ==================== KEYBOARD SUPPORT ====================
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal && modal.style.display === 'block') {
        closeModal();
      }
    });

  } catch (error) {
    console.error('Initialization error:', error);
    // Display user-friendly error message
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.top = '0';
    errorDiv.style.left = '0';
    errorDiv.style.right = '0';
    errorDiv.style.padding = '20px';
    errorDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.8)';
    errorDiv.style.color = 'white';
    errorDiv.style.textAlign = 'center';
    errorDiv.style.zIndex = '9999';
    errorDiv.textContent = 'Oops! Something went wrong. Please refresh the page.';
    document.body.appendChild(errorDiv);
  }
});
