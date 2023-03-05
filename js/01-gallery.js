import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = crateImageCardsMarkup(galleryItems);
let modal;

function crateImageCardsMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`;
    })
    .join('');
}

galleryContainer.insertAdjacentHTML('beforeend', cardsMarkup);
galleryContainer.addEventListener('click', handleGalleryClick);

function handleGalleryClick(event) {
  event.preventDefault();

  const isGalleryImgEl = event.target.classList.contains('gallery__image');

  if (!isGalleryImgEl) {
    return;
  }

  const ImgEl = event.target;
  const modalImg = ImgEl.dataset.source;

  modal = basicLightbox.create(`<img src="${modalImg}" width="800" height="600">`);
  modal.show();

  galleryContainer.addEventListener('keydown', handleModalEsc);
}

function handleModalEsc(event) {
  const ESC_KEY_CODE = 'Escape';

  if (event.code === ESC_KEY_CODE && modal.visible()) {
    modal.close();
    galleryContainer.removeEventListener('keydown', handleModalEsc);
  }
}
