const selector = document.querySelector('.language-selector');
const currentLangBtn = document.getElementById('current-lang');
const langOptions = document.getElementById('lang-options');

currentLangBtn.addEventListener('click', () => {
  selector.classList.toggle('show');
});

langOptions.querySelectorAll('li').forEach(item => {
  item.addEventListener('click', () => {
    const imgSrc = item.querySelector('img').src;
    const langName = item.textContent.trim();

    currentLangBtn.querySelector('img').src = imgSrc;
    currentLangBtn.querySelector('span').textContent = langName;

    selector.classList.remove('show');
    console.log(`Language changed to: ${item.dataset.lang}`);
  });
});

document.addEventListener('click', (e) => {
  if (!selector.contains(e.target)) {
    selector.classList.remove('show');
  }
});
document.querySelectorAll(".footer-block").forEach(block => {
  block.addEventListener("click", () => {
    block.classList.toggle("active");
  });
});

