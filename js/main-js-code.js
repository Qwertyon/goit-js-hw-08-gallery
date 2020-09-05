import gallery from "./gallery-items.js";
import galleryItems from "./gallery-items.js";

// объявление элементов в доме

const galleryRef = document.querySelector(".js-gallery");
const lightboxRef = document.querySelector(".js-lightbox");
const lightboxImageRef = document.querySelector(".lightbox__image");
const lightboxCloseBtnRef = document.querySelector(".lightbox__button");
const lightboxOverlayRef = document.querySelector(".lightbox__overlay");
const lightboxContentRef = document.querySelector(".lightbox__content");

// СДЕЛАЛ РенДЕР, некликабельную ссылку.

gallery.forEach((galleryItem, ind) => {
  const galleryListItem = document.createElement("li");
  galleryListItem.setAttribute("class", "gallery__item");
  const galleryLink = document.createElement("a");
  galleryLink.setAttribute("class", "gallery__link");
  galleryLink.setAttribute("href", galleryItems[ind].original);
  galleryLink.setAttribute("onclick", "return false");
  galleryLink.setAttribute("target", "blank");
  galleryListItem.appendChild(galleryLink);
  const galleryImage = document.createElement("img");
  galleryImage.setAttribute("class", "gallery__image");
  galleryImage.setAttribute("src", galleryItems[ind].preview);
  galleryImage.setAttribute("data-source", galleryItems[ind].original);
  galleryImage.setAttribute("alt", galleryItems[ind].description);
  galleryLink.appendChild(galleryImage);
  galleryRef.appendChild(galleryListItem);
});

// Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.

galleryRef.addEventListener("click", onLinkClick);

function onLinkClick(event) {
  if (event.target.nodeName === "IMG") {
    console.log(event.target.getAttribute("data-source"));
    lightboxRef.classList.add("is-open");
    lightboxImageRef.setAttribute(
      "src",
      event.target.getAttribute("data-source")
    );
    lightboxImageRef.setAttribute("alt", event.target.getAttribute("alt"));
    // в этом методе дальше костыли для дополнительного задания
    findObject = galleryItems.find(
      (num) => num.description === lightboxImageRef.getAttribute("alt")
    );
    indexOfFindObject = galleryItems.indexOf(findObject);
  }
}

// Закрытие модального окна по клику на кнопку button[data - action= "close-modal"].
// Очистка значения атрибута src элемента img.lightbox__image.Это необходимо для того,
//   чтобы при следующем открытии модального окна, пока грузится изображение,
//     мы не видели предыдущее

lightboxRef.addEventListener("click", onCloseClick);

function onCloseClick(event) {
  if (
    event.target === lightboxOverlayRef ||
    event.target === lightboxCloseBtnRef
  ) {
    lightboxRef.classList.remove("is-open");
    lightboxImageRef.setAttribute("src", " ");
    lightboxImageRef.setAttribute("alt", " ");
  }
}

// + Дополнительно

let findObject;
let indexOfFindObject;

galleryRef.addEventListener("keydown", keyDownEvent);

function keyDownEvent(event) {
  if (event.code === "Escape") {
    lightboxRef.classList.remove("is-open");
    lightboxImageRef.setAttribute("src", " ");
    lightboxImageRef.setAttribute("alt", " ");
  }

  if (lightboxRef.classList.contains("is-open")) {
    if (event.code === "ArrowLeft" && indexOfFindObject > 0) {
      indexOfFindObject -= 1;
      lightboxImageRef.setAttribute(
        "src",
        galleryItems[indexOfFindObject].original
      );
    }
    if (
      event.code === "ArrowRight" &&
      indexOfFindObject < galleryItems.length - 1
    ) {
      indexOfFindObject += 1;
      lightboxImageRef.setAttribute(
        "src",
        galleryItems[indexOfFindObject].original
      );
    }
  }
}
