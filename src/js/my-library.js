import headerHomeTemplate from '../templates/headerHomeTemplate.hbs';
import headerLibraryTemplate from '../templates/headerLibraryTemplate.hbs';
import { renderMarkup, clearMarkup } from './functions';
import listenInput from './getFilms';
import {
//   headerRef,
  logoRef,
  navListRef,
  mainHeaderRef,
  libraryButtonRef,
  headerContainerRef,
  listFilmsRef,
} from './refs/refs';

renderMarkup(headerContainerRef, headerHomeTemplate()); // Рендер разметки домашней страницы по-умолчанию
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
    (target.closest('a') === logoRef && mainHeaderRef === currentButton)
  ) {
    return;
  }

  // Рендер разметки домашней страницы при клике на кнопку home или логотип
  if (target === mainHeaderRef || target.closest('a') === logoRef) {
    const home = headerHomeTemplate();

    changePage(home);
    listenInput();
  }

  // Рендер разметки библиотеки при клике на кнопку my library
  if (target === libraryButtonRef) {
    const library = headerLibraryTemplate();

    changePage(library);
    clearMarkup(listFilmsRef);
  }

  // Смена класса активной кнопки
  changeCurrentButtonClass();
}

function changePage(markup) {
  clearMarkup(headerContainerRef);
  renderMarkup(headerContainerRef, markup);

  changePageHeaderClass();
}

function changeCurrentButtonClass() {
  mainHeaderRef.classList.toggle('site-nav__button--current');
  libraryButtonRef.classList.toggle('site-nav__button--current');
}

function changePageHeaderClass() {
  headerRef.classList.toggle('page-header--home');
  headerRef.classList.toggle('page-header--library');
}

headerRef.addEventListener('click', onPageChange);
renderMarkup(headerContainerRef, headerHomeTemplate()); // Рендер разметки домашней страницы по-умолчанию
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
    (target.closest('a') === logoRef && mainHeaderRef === currentButton)
  ) {
    return;
  }

  // Рендер разметки домашней страницы при клике на кнопку home или логотип
  if (target === mainHeaderRef || target.closest('a') === logoRef) {
    const home = headerHomeTemplate();

    changePage(home);
    listenInput();
  }

  // Рендер разметки библиотеки при клике на кнопку my library
  if (target === libraryButtonRef) {
    const library = headerLibraryTemplate();

    changePage(library);
    clearMarkup(listFilmsRef);
  }

  // Смена класса активной кнопки
  changeCurrentButtonClass();
}

function changePage(markup) {
  clearMarkup(headerContainerRef);
  renderMarkup(headerContainerRef, markup);

  changePageHeaderClass();
}

function changeCurrentButtonClass() {
  mainHeaderRef.classList.toggle('site-nav__button--current');
  libraryButtonRef.classList.toggle('site-nav__button--current');
}

function changePageHeaderClass() {
  headerRef.classList.toggle('page-header--home');
  headerRef.classList.toggle('page-header--library');
}

headerRef.addEventListener('click', onPageChange);
