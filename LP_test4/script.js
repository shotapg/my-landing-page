// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// スクロール時のヘッダー背景変更
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// 要素のフェードインアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素の初期設定
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.business-card, .achievement-item, .company-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// 数字カウントアップアニメーション
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const text = element.textContent;
    const isPercentage = text.includes('%');
    const hasPlus = text.includes('+');
    const isText = isNaN(parseInt(text.replace(/[^\d]/g, ''))) || text.includes('多数');
    
    if (isText) {
        // テキストの場合はそのまま表示
        return;
    }
    
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            let finalText = target.toString();
            if (isPercentage) finalText += '%';
            if (hasPlus) finalText += '+';
            element.textContent = finalText;
            clearInterval(timer);
        } else {
            let currentText = Math.floor(start).toString();
            if (isPercentage) currentText += '%';
            if (hasPlus) currentText += '+';
            element.textContent = currentText;
        }
    }, 16);
}

// 実績セクションが表示されたときにカウントアップを実行
const achievementsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.achievement-number');
            numbers.forEach(num => {
                const text = num.textContent;
                const value = parseInt(text.replace(/[^\d]/g, ''));
                animateCounter(num, value);
            });
            achievementsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const achievementsSection = document.querySelector('.achievements');
    if (achievementsSection) {
        achievementsObserver.observe(achievementsSection);
    }
});

// パララックス効果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-element');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// ページロード時のアニメーション
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        heroTitle.style.animation = 'slideInUp 1s ease-out';
        heroSubtitle.style.animation = 'slideInUp 1s ease-out 0.3s both';
    }
});

// CSSアニメーションの追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);