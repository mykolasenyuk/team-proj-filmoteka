import {
  headerRef,
  logoRef,
  navListRef,
  homeButtonRef,
  libraryButtonRef,
  headerDynamicContainerRef,
  listFilmsRef,
} from './refs/refs';
import apiService from './services/apiService';




renderMarkup(headerDynamicContainerRef, pageHeaderHomeTpl()); // Рендер разметки домашней страницы по-умолчанию
listenInput();

// Меняет интерфейс хэдэра при выборе страницы
function onPageChange(e) {
  const target = e.target; // Кликнутый элемент
  const currentButton = navListRef.querySelector('.site-nav__button--current'); // Кнопка текущей страницы

  // Выход из функции, если...
  if (
    // Клик по текущей кнопке
    target === currentButton ||
    // Клик не по кнопкам навигации
    (target.closest('a') !== logoRef && target.className !== 'site-nav__button') ||
    // Клик по лого на домашней странице
    (target.closest('a') === logoRef && homeButtonRef === currentButton)
  ) {
    return;
  }

  // Рендер разметки домашней страницы при клике на кнопку home или логотип
  if (target === homeButtonRef || target.closest('a') === logoRef) {
    const home = pageHeaderHomeTpl();

    changePage(home);
    listenInput();
  }

  // Рендер разметки библиотеки при клике на кнопку my library
  if (target === libraryButtonRef) {
    const library = pageHeaderLibraryTpl();

    changePage(library);
    clearMarkup(listFilmsRef);
  }

  // Смена класса активной кнопки
  changeCurrentButtonClass();
}

function changePage(markup) {
  clearMarkup(headerDynamicContainerRef);
  renderMarkup(headerDynamicContainerRef, markup);

  changePageHeaderClass();
}

function changeCurrentButtonClass() {
  homeButtonRef.classList.toggle('site-nav__button--current');
  libraryButtonRef.classList.toggle('site-nav__button--current');
}

function changePageHeaderClass() {
  headerRef.classList.toggle('page-header--home');
  headerRef.classList.toggle('page-header--library');
}

headerRef.addEventListener('click', onPageChange);
renderMarkup(headerDynamicContainerRef, pageHeaderHomeTpl()); // Рендер разметки домашней страницы по-умолчанию
listenInput();

// Меняет интерфейс хэдэра при выборе страницы
function onPageChange(e) {
  const target = e.target; // Кликнутый элемент
  const currentButton = navListRef.querySelector('.site-nav__button--current'); // Кнопка текущей страницы

  // Выход из функции, если...
  if (
    // Клик по текущей кнопке
    target === currentButton ||
    // Клик не по кнопкам навигации
    (target.closest('a') !== logoRef && target.className !== 'site-nav__button') ||
    // Клик по лого на домашней странице
    (target.closest('a') === logoRef && homeButtonRef === currentButton)
  ) {
    return;
  }

  // Рендер разметки домашней страницы при клике на кнопку home или логотип
  if (target === homeButtonRef || target.closest('a') === logoRef) {
    const home = pageHeaderHomeTpl();

    changePage(home);
    listenInput();
  }

  // Рендер разметки библиотеки при клике на кнопку my library
  if (target === libraryButtonRef) {
    const library = pageHeaderLibraryTpl();

    changePage(library);
    clearMarkup(listFilmsRef);
  }

  // Смена класса активной кнопки
  changeCurrentButtonClass();
}

function changePage(markup) {
  clearMarkup(headerDynamicContainerRef);
  renderMarkup(headerDynamicContainerRef, markup);

  changePageHeaderClass();
}

function changeCurrentButtonClass() {
  homeButtonRef.classList.toggle('site-nav__button--current');
  libraryButtonRef.classList.toggle('site-nav__button--current');
}

function changePageHeaderClass() {
  headerRef.classList.toggle('page-header--home');
  headerRef.classList.toggle('page-header--library');
}

headerRef.addEventListener('click', onPageChange);
