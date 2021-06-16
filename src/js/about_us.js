const refs = {
    openModal:document.querySelector('[data-modal-open="openBtn"]'),
    backdropOverlay: document.querySelector('[data-modal="backdropOverlay"]'),
    modalOverlay: document.querySelector('[data-modal="aboutUsModal"]'),
    closeBtn: document.querySelector('[data-modal-close="closeBtn"]'),
    
};

refs.openModal.addEventListener('click', onOpenModal);
refs.backdropOverlay.addEventListener('click', onCloseModalByOverlay);
refs.closeBtn.addEventListener('click', onCloseModalByBtn);

// Scroll
function onAddScroll() {
  document.body.classList.add('stop-scrolling');
}
function onStopScroll() {
  document.body.classList.remove('stop-scrolling');
}

function onOpenModal(e) {
    if (e.target === refs.openModal) {
      onAddScroll()
      refs.backdropOverlay.classList.remove('is-hidden');
  }  
};

function onCloseModalByOverlay(e) {
    // console.log(e.currentTarget) //это на что мы назначили
    // console.log(e.target) // это на чем произошло событие
    // console.log(e.target.nodeName)
    
    if (e.target === refs.modalOverlay || e.target === refs.backdropOverlay) {
    onStopScroll()
    refs.backdropOverlay.classList.add('is-hidden');
    }
};

function onCloseModalByBtn(e) {
        console.log(e.currentTarget) //это на что мы назначили
    if (e.currentTarget === refs.closeBtn) {
        onStopScroll()
        refs.backdropOverlay.classList.add('is-hidden');
    }    
};