'use strict';

if (module.hot) {
	module.hot.accept();
}

/**
 * SWIPER SLIDER
 */

// core version + navigation, pagination modules:
import Swiper from 'swiper/bundle';
// import Swiper styles
import 'swiper/swiper-bundle.css';

/**
 * LIGHTBOX
 */

import fslightbox from '../../node_modules/fslightbox/index';

const mainFoods = document.querySelector('[data-target="main"]');
const sidesFoods = document.querySelector('[data-target="sides"]');
const drinksFoods = document.querySelector('[data-target="drinks"]');
const desertsFoods = document.querySelector('[data-target="deserts"]');

const menuBtns = document.querySelector('.menu__section--btns');
const mainDishesBtn = document.querySelector('[data-id="main"]');
const sidesBtn = document.querySelector('[data-id="sides"]');
const drinksBtn = document.querySelector('[data-id="drinks"]');
const desertsBtn = document.querySelector('[data-id="deserts"]');

const sliderNavBtns = document.querySelector('.slider__nav--btns');
const reviewsContent = document.querySelector('.reviews__content');

const closeModalBtn = document.querySelector('.close-modal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalContent = document.querySelector('.modal-content');
const modal = document.querySelector('.modal');

const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

const quoteIcon = document.querySelector('.quote-icon');

const heroSliderNavBullets = document.querySelector('.hero__slider-nav--dots');
const pauseHeroSliderBtn = document.querySelector('.btn-pause-slider');

let isHeroSliderPaused = false;

/**
 * Init
 */
window.onload = function () {
	// prepare menu section
	sidesFoods.style.transform = 'translateY(-100%) scale(0.95)';
	drinksFoods.style.transform = 'translateY(-100%) scale(0.95)';
	desertsFoods.style.transform = 'translateY(-100%) scale(0.95)';

	// init hero slider
	setInterval(() => {
		if (isHeroSliderPaused) return;
		animHeroSlideText();
		animBgImages();
	}, 5000);

	// init review slider quote icon anim
	document.querySelector('.quote-icon').style.transition = '500ms cubic-bezier(0.25, 0.8, 0.25, 1)';
	document.querySelector('.quote-icon').style.transitionProperty = 'opacity, transform';
};

// sticky navbar anim
const navbar = document.querySelector('.navbar');
const homeSec = document.querySelector('#home');

const stickyNav = function (event) {
	const [entry] = event;
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

/**
 * RESERVE TABLE MODAL
 */

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
 * MENU ANIMATION
 */

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
 * REVIEW SECTION SLIDER
 */

// options for review slider
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
	spaceBetween: 10, // px
	loop: true,
	slidesPerView: 1,
	centeredSlides: true,
	slideActiveClass: 'active-test',
	speed: 750,
	//breakpoints
	breakpoints: {
		992: {
			slidesPerView: 3,
			spaceBetween: 30, // px
		},
	},
};

// init review slider
const swiper = new Swiper('.reviews__content', swiperOptions);
reviewsContent.swiper;

// review slider nav btns
sliderNavBtns.addEventListener('click', event => {
	const navTo = event.target.dataset.to;

	if (navTo === 'left') swiper.slidePrev();
	else swiper.slideNext();
});

// animate quote icon
swiper.on('slideChangeTransitionStart', () => {
	quoteIcon.style.transform = 'translateY(-25%)';
	quoteIcon.style.opacity = '0';
});

swiper.on('slideChangeTransitionEnd', () => {
	quoteIcon.style.transform = 'translateY(0)';
	quoteIcon.style.opacity = '1';
});

/**
 * MOBILE MENU
 */

const closeMobileMenu = function () {
	navLinks.style.opacity = 0;
	navLinks.style.transform = 'translate(-50%, 40px)';
	navLinks.style.pointerEvents = 'none';

	mobileToggle.classList.remove('open');
	mobileToggle.classList.add('closed');
};

const openMobileMenu = function () {
	navLinks.style.opacity = 1;
	navLinks.style.transform = 'translate(-50%, 0)';
	navLinks.style.pointerEvents = 'auto';

	mobileToggle.classList.add('open');
	mobileToggle.classList.remove('closed');
};

// toggle mobile menu
const toggleMobileMenu = function () {
	if (mobileToggle.classList.contains('open')) {
		// close menu
		closeMobileMenu();
	} else {
		// open menu
		openMobileMenu();
	}
};

mobileToggle.addEventListener('click', toggleMobileMenu);

// close mobile menu on link click
document.querySelector('.nav-links').addEventListener('click', () => {
	if (mobileToggle.classList.contains('open')) closeMobileMenu();
});

/**
 * HERO SECTION ANIM
 */

const imgOne = document.querySelector('.img-1');
const imgTwo = document.querySelector('.img-2');
const imgThree = document.querySelector('.img-3');

// make BG image active
const removeActiveImg = htmlEl => {
	htmlEl.classList.remove('active-bg-img');
	htmlEl.classList.add('not-active-bg-img');
};

// make BG image not active
const addActiveImg = htmlEl => {
	htmlEl.classList.add('active-bg-img');
};

// image anim
const animBgImages = function () {
	if (imgTwo.classList.contains('active-bg-img')) {
		removeActiveImg(imgTwo);
		addActiveImg(imgThree);
	} else if (imgOne.classList.contains('active-bg-img')) {
		removeActiveImg(imgOne);
		addActiveImg(imgTwo);
	} else if (imgThree.classList.contains('active-bg-img')) {
		removeActiveImg(imgThree);
		addActiveImg(imgOne);
	}
};

// text anim
const heroSlideOne = document.querySelector('.slide-one');
const heroSlideTwo = document.querySelector('.slide-two');
const heroSlideThree = document.querySelector('.slide-three');

const updateSliderBullet = function (slide) {
	document.querySelector('.hero-nav-dot-active').classList.remove('hero-nav-dot-active');
	document.querySelector(`[data-slide-to=${slide}]`).classList.add('hero-nav-dot-active');
};

// pause/resume hero slider
const pauseHeroSlider = () => {
	isHeroSliderPaused = !isHeroSliderPaused;

	// update icon
	if (isHeroSliderPaused) {
		pauseHeroSliderBtn.textContent = '';
		pauseHeroSliderBtn.insertAdjacentHTML('afterbegin', '<i class="fas fa-play pause-slider"></i>');
		return;
	}

	pauseHeroSliderBtn.textContent = '';
	pauseHeroSliderBtn.insertAdjacentHTML('afterbegin', '<i class="fas fa-pause pause-slider"></i>');
};
pauseHeroSliderBtn.addEventListener('click', pauseHeroSlider);

/**
 * Animate text slides for hero (home section)
 *
 * @param {} slide the slide to make active
 * @param {boolean} isFirstSlide if true, slide === the initial starting slide when the site first loads
 * in this case we want to add a different class to maintain slide position
 */
const makeTextSlideNotActive = (slide, isFirstSlide = false) => {
	slide.classList.remove(`${isFirstSlide ? 'slide-active' : 'slide-active-pos'}`);
	slide.classList.add(`${isFirstSlide ? 'slide-not-active' : 'slide-not-active-pos'}`);
};

const makeTextSlideActive = (slide, isFirstSlide = false) => {
	slide.classList.add(`${isFirstSlide ? 'slide-active' : 'slide-active-pos'}`);
	slide.classList.remove(`${isFirstSlide ? 'slide-not-active' : 'slide-not-active-pos'}`);
};

const animHeroSlideText = function () {
	if (heroSlideOne.classList.contains('slide-active')) {
		// change from slide one to slide two
		makeTextSlideActive(heroSlideTwo);
		makeTextSlideNotActive(heroSlideOne, true);
		updateSliderBullet('slide-two');
	} else if (heroSlideTwo.classList.contains('slide-active-pos')) {
		// change from slide two to slide three
		makeTextSlideActive(heroSlideThree);
		makeTextSlideNotActive(heroSlideTwo);
		updateSliderBullet('slide-three');
	} else {
		// change from slide three back to slide one
		makeTextSlideActive(heroSlideOne, true);
		makeTextSlideNotActive(heroSlideThree);
		updateSliderBullet('slide-one');
	}
};

// Hero Slider nav bullets
heroSliderNavBullets.addEventListener('click', event => {
	if (!event.target.dataset.slideTo) return;

	const slide = event.target.dataset.slideTo;

	switch (slide) {
		case 'slide-one': {
			// if slide-one is current slide, don't switch slides
			if (heroSlideOne.classList.contains('slide-active')) return;

			// make hero slide-one active
			makeTextSlideActive(heroSlideOne, true);
			makeTextSlideNotActive(document.querySelector('.slide-active-pos'));

			// make img-1 active
			removeActiveImg(document.querySelector('.active-bg-img'));
			addActiveImg(imgOne);

			updateSliderBullet('slide-one');
			break;
		}
		case 'slide-two': {
			if (heroSlideTwo.classList.contains('slide-active-pos')) return;

			// make hero slide-2 active
			makeTextSlideActive(heroSlideTwo);

			// if slide-one was previous slide
			if (heroSlideOne.classList.contains('slide-active')) {
				makeTextSlideNotActive(heroSlideOne, true);
			} else {
				makeTextSlideNotActive(heroSlideThree);
			}

			// make img-2 active
			removeActiveImg(document.querySelector('.active-bg-img'));
			addActiveImg(imgTwo);

			updateSliderBullet('slide-two');
			break;
		}
		case 'slide-three': {
			if (heroSlideThree.classList.contains('slide-active-pos')) return;

			makeTextSlideActive(heroSlideThree);

			if (heroSlideOne.classList.contains('slide-active')) {
				makeTextSlideNotActive(heroSlideOne, true);
			} else {
				makeTextSlideNotActive(heroSlideTwo);
			}

			removeActiveImg(document.querySelector('.active-bg-img'));
			addActiveImg(imgThree);

			updateSliderBullet('slide-three');
			break;
		}
		default: {
			break;
		}
	}
});

/**
 * MODAL RESERVE BUTTON ANIM
 */

const modalBtn = document.querySelector('.reserve-table');
const modalForm = document.querySelector('.modal-content--form');

// fake table reservation
modalForm.onsubmit = event => {
	event.preventDefault();
	modalBtn.textContent = 'Reserving Table...';
	modalBtn.style.pointerEvents = 'none';

	setTimeout(() => {
		modalBtn.textContent = 'Your table has been reserved :)';
		modalBtn.style.pointerEvents = 'none';
	}, 2000);

	setTimeout(() => {
		modalBtn.textContent = 'reserve a table';
		modalBtn.style.pointerEvents = 'auto';
	}, 6000);
};

/**
 * LIGHTBOX
 */

// lightbox video player
