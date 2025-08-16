$(document).ready(function () {
  $('#detail-gallery-1').slick({
    arrows: true,
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 6,
  });
  $('#detail-gallery-2').slick({
    arrows: true,
    dots: false,
    slidesToShow: 6,
    slidesToScroll: 6,
  });
});

// Detail Pictures Selector
const picturesSelectorItems = document.querySelectorAll(".detail-overview-color-selector-item")
const picturesTabContents = document.querySelectorAll(".detail-pictures")
picturesSelectorItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault()

    // remove active in selector
    picturesSelectorItems.forEach(i => i.classList.remove("active"))
    item.classList.add("active")

    // hide all tab contents
    picturesTabContents.forEach(c => c.classList.remove("active"))

    // show the target one
    const targetId = item.getAttribute("data-target")
    document.getElementById(targetId).classList.add("active")
  })
})

// Detail Description Selector
const selectorItems = document.querySelectorAll(".detail-description-selector-item")
const tabContents = document.querySelectorAll(".detail-description-content-item")
selectorItems.forEach(item => {
  item.addEventListener("click", (e) => {
    e.preventDefault()

    // remove active in selector
    selectorItems.forEach(i => i.classList.remove("active"))
    item.classList.add("active")

    // hide all tab contents
    tabContents.forEach(c => c.classList.remove("active"))

    // show the target one
    const targetId = item.getAttribute("data-target")
    document.getElementById(targetId).classList.add("active")
  })
})