document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".filter-button");
    const articles = document.querySelectorAll(".article-card");

    // 初期状態
    document.querySelector('.filter-button[data-filter="all"]').classList.add("active");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            buttons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            articles.forEach(article => {
                const tags = article.getAttribute("data-tags").split(",");
                if (filter === "all" || tags.includes(filter)) {
                    article.classList.remove("hidden");
                } else {
                    article.classList.add("hidden");
                }
            });
        });
    });

    // ハンバーガーメニューの動作
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", function () {
        navLinks.classList.toggle("open");
    });
});
document.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const background = document.querySelector('.background');
  background.style.transform = `translateY(${scrollPosition * 0.3}px)`; 
});
document.addEventListener('DOMContentLoaded', () => {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const prices = document.querySelectorAll('.price');

  toggleSwitch.addEventListener('change', () => {
    const isYearly = toggleSwitch.checked;

    prices.forEach(price => {
      const monthly = price.dataset.monthly;
      const yearly = price.dataset.yearly;

      price.textContent = isYearly ? `¥${yearly}/年` : `¥${monthly}/月`;
    });
  });
});