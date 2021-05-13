'use strict';

// sticky navbar anim
const navbar = document.querySelector('.navbar');
const homeSec = document.querySelector('#home');

const stickyNav = function (event) {
	const [entry] = event;
	// console.log('entry', entry);
	if (!entry.isIntersecting) {
		// if not intersecting
		navbar.style.transform = 'translateY(0)';
		navbar.style.borderRadius = '0 0 10px 10px';
	} else {
		navbar.style.transform = 'translateY(18px)';
		navbar.style.borderRadius = '10px';
	}
};

const navbarObs = new IntersectionObserver(stickyNav, { threshold: 0.8 });
navbarObs.observe(homeSec);

// RESERVE MODAL
const closeModalBtn = document.querySelector('.close-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const modal = document.querySelector('.modal');

// show modal
const showModal = function () {
	modal.style.zIndex = '9999';
	modal.classList.add('open');

	modalOverlay.style.visibility = 'visible';
	modalOverlay.style.opacity = '1';

	modalContent.style.visibility = 'visible';
	modalContent.style.opacity = '1';
	modalContent.style.transform = 'scale(1)';
};

document.addEventListener('click', event => {
	if (!event.target.classList.contains('btn-reserve')) return;
	showModal();
});

// hide modal
const hideModal = function () {
	if (!modal.classList.contains('open')) return;

	modalOverlay.style.opacity = '0';

	modalContent.style.opacity = '0';
	modalContent.style.transform = 'scale(.9)';

	setTimeout(() => {
		modalContent.style.visibility = 'hidden';
		modalOverlay.style.visibility = 'hidden';
		modal.style.zIndex = '-1';
		modal.classList.remove('open');
	}, 1000);
};

modalOverlay.addEventListener('click', hideModal);
closeModalBtn.addEventListener('click', hideModal);
document.addEventListener('keydown', event => {
	if (event.key === 'Escape') hideModal();
});
