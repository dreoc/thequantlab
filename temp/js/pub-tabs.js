// Publication tabs functionality
(function() {
	document.addEventListener('DOMContentLoaded', function() {
		const tabButtons = document.querySelectorAll('.pub-tab-btn');
		const tabPanels = document.querySelectorAll('.pub-tab-panel');
		
		tabButtons.forEach(button => {
			button.addEventListener('click', function() {
				const targetTab = this.getAttribute('data-tab');
				
				// Remove active class from all buttons
				tabButtons.forEach(btn => btn.classList.remove('active'));
				
				// Add active class to clicked button
				this.classList.add('active');
				
				// Hide all panels
				tabPanels.forEach(panel => panel.classList.remove('active'));
				
				// Show target panel
				const targetPanel = document.getElementById('tab-' + targetTab);
				if (targetPanel) {
					targetPanel.classList.add('active');
					
					// Reinitialize owl carousel for the active panel
					const carousel = targetPanel.querySelector('.owl-carousel');
					if (carousel && typeof $(carousel).owlCarousel === 'function') {
						$(carousel).trigger('refresh.owl.carousel');
					}
				}
			});
		});
	});
})();
