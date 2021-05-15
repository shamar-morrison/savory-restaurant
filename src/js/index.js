'use strict';

if (module.hot) {
	module.hot.accept();
}

/**
 * Swiper Slider
 */

// core version + navigation, pagination modules:
import Swiper from '../../node_modules/swiper/bundle';

// import Swiper styles
import '../../node_modules/swiper/swiper-bundle.css';

// configure Swiper to use modules
// SwiperCore.use([Navigation, Pagination]);

/**
 * Init menu navigation
 */
window.onload = function () {
	// prepare menu section
	const sidesFoods = document.querySelector('[data-target="sides"]');
	const drinksFoods = document.querySelector('[data-target="drinks"]');
	const desertsFoods = document.querySelector('[data-target="deserts"]');

	sidesFoods.style.transform = 'translateY(-100%) scale(0.95)';
	drinksFoods.style.transform = 'translateY(-100%) scale(0.95)';
	desertsFoods.style.transform = 'translateY(-100%) scale(0.95)';
};

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

// RESERVE TABLE MODAL
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

/**
 * Menu Animation
 */
const mainFoods = document.querySelector('[data-target="main"]');
const sidesFoods = document.querySelector('[data-target="sides"]');
const drinksFoods = document.querySelector('[data-target="drinks"]');
const desertsFoods = document.querySelector('[data-target="deserts"]');

const menuBtns = document.querySelector('.menu__section--btns');
const mainDishesBtn = document.querySelector('[data-id="main"]');
const sidesBtn = document.querySelector('[data-id="sides"]');
const drinksBtn = document.querySelector('[data-id="drinks"]');
const desertsBtn = document.querySelector('[data-id="deserts"]');

// hide active food list
const hideActiveList = foodList => {
	foodList.classList.remove('active-food');
	foodList.classList.add('hidden-food');

	// if foodList !== 'main dishes' => translateY(-100%)
	// to keep original position and prevent the food list
	// from breaking position on page
	foodList.style.transform = `${foodList !== mainFoods ? 'translateY(-100%)' : ''} scale(.95)`;
};

// make food list active
const makeActiveList = foodList => {
	foodList.classList.remove('hidden-food');
	foodList.classList.add('active-food');
	foodList.style.transform = `${foodList !== mainFoods ? 'translateY(-100%)' : ''} scale(1)`;
};

const updateBtn = btn => {
	document.querySelector('.selected').classList.remove('selected');
	btn.classList.add('selected');
};

/**
 * Update the menu to display 'foodList'
 * and update the selected menu btn
 */
const updateMenu = (foodList, foodBtn) => {
	if (foodList.classList.contains('active-food')) return;

	// hide previously active food list
	const activeFood = document.querySelector('.active-food');
	hideActiveList(activeFood);

	// make active food list
	makeActiveList(foodList);

	// update selected btn
	updateBtn(foodBtn);
};

// menu animation
menuBtns.addEventListener('click', event => {
	const foodId = event.target.dataset.id;

	switch (foodId) {
		// main dishes
		case 'main': {
			updateMenu(mainFoods, mainDishesBtn);
			break;
		}

		// sides
		case 'sides': {
			updateMenu(sidesFoods, sidesBtn);
			break;
		}

		// deserts
		case 'deserts': {
			updateMenu(desertsFoods, desertsBtn);
			break;
		}

		//drinks
		case 'drinks': {
			updateMenu(drinksFoods, drinksBtn);
			break;
		}

		default:
			break;
	}
});

/**
 * REVIEW SLIDER
 */
const sliderNavBtns = document.querySelector('.slider__nav--btns');
const reviewsContent = document.querySelector('.reviews__content');

// options for slider
const swiperOptions = {
	direction: 'horizontal',
	pagination: {
		el: '.reviews__dots',
		type: 'bullets',
		bulletElement: 'li',
		bulletClass: 'dot',
		bulletActiveClass: 'active-dot',
		clickable: true,
	},
	navigationArrows: {
		nextEl: '.slider__nav-next',
		prevEl: '.slider__nav-prev',
	},
	spaceBetween: 30, // px
	loop: true,
	slidesPerView: 3,
	centeredSlides: true,
	slideActiveClass: 'active-test',
	speed: 750,
};

// init slider
const swiper = new Swiper('.reviews__content', swiperOptions);
reviewsContent.swiper;

// slider nav btns
sliderNavBtns.addEventListener('click', event => {
	const navTo = event.target.dataset.to;

	if (navTo === 'left') swiper.slidePrev();
	else swiper.slideNext();
});
