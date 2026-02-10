// Основной JavaScript для сайта Московского метрополитена

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт Московского метрополитена загружен');
    
    // Плавная прокрутка для внутренних ссылок
    initSmoothScrolling();
    
    // Добавление интерактивности для карты метро
    initMetroMap();
    
    // Добавление анимации для карточек линий
    initLineCardsAnimation();
});

// Функция для плавной прокрутки
function initSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем якоря на другие страницы
            if (href === '#' || href.startsWith('#!')) return;
            
            // Игнорируем ссылки на другие страницы
            if (href.includes('.html')) return;
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Обновляем URL без перезагрузки страницы
                history.pushState(null, null, href);
            }
        });
    });
}

// Функция для инициализации интерактивной карты метро
function initMetroMap() {
    const radialLines = document.querySelectorAll('.map-radial-line');
    
    if (radialLines.length === 0) return;
    
    // Цвета для линий метро (соответствуют цветам на главной странице)
    const lineColors = [
        '#e31e24', '#4fb04f', '#0078bf', '#1ebff0', '#915133',
        '#f58632', '#9932cc', '#f9d423', '#a1a2a3', '#b3d445',
        '#8f4d94', '#bcebdd', '#00a88f', '#e26b99', '#fed535'
    ];
    
    // Названия линий метро
    const lineNames = [
        'Сокольническая', 'Замоскворецкая', 'Арбатско-Покровская',
        'Филевская', 'Кольцевая', 'Калужско-Рижская',
        'Таганско-Краснопресненская', 'Калининская', 'Серпуховско-Тимирязевская',
        'Люблинско-Дмитровская', 'Большая кольцевая', 'Бутовская',
        'Монорельс', 'Некрасовская', 'Солнцевская'
    ];
    
    // Ссылки на страницы линий
    const lineLinks = [
        'pages/sokolnicheskaya.html', 'pages/zamoskvoretskaya.html',
        'pages/arbatsko-pokrovskaya.html', 'pages/filevskaya.html',
        'pages/kolcevaya.html', 'pages/kaluzhsko-rizhskaya.html',
        'pages/tagansko-krasnopresnenskaya.html', 'pages/kalininskaya.html',
        'pages/serpuhovsko-timiryazevskaya.html', 'pages/lyublinsko-dmitrovskaya.html',
        'pages/bolshaya-kolcevaya.html', 'pages/butovskaya.html',
        'pages/monorels.html', 'pages/nekrasovskaya.html', 'pages/solncevskaya.html'
    ];
    
    // Добавляем обработчики событий для каждой линии на карте
    radialLines.forEach((line, index) => {
        // Устанавливаем цвет линии
        line.style.backgroundColor = lineColors[index];
        
        // Добавляем подсказку с названием линии
        line.title = lineNames[index];
        
        // Добавляем обработчик клика
        line.addEventListener('click', function() {
            // Перенаправляем на страницу линии
            window.location.href = lineLinks[index];
        });
        
        // Добавляем эффект при наведении
        line.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace(')', ') scale(1.2)');
            this.style.cursor = 'pointer';
        });
        
        line.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(' scale(1.2)', '');
        });
    });
    
    // Также делаем кликабельным центр карты
    const mapCenter = document.querySelector('.map-center');
    if (mapCenter) {
        mapCenter.addEventListener('click', function() {
            alert('Центр московского метрополитена. Здесь сходятся все линии!');
        });
        
        mapCenter.style.cursor = 'pointer';
    }
}

// Функция для анимации карточек линий
function initLineCardsAnimation() {
    const lineCards = document.querySelectorAll('.line-card');
    
    // Добавляем небольшую задержку появления для каждой карточки
    lineCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 50);
    });
}

// Функция для изменения активного пункта меню при прокрутке
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}

// Добавляем обработчик прокрутки для обновления активного пункта меню
window.addEventListener('scroll', updateActiveNavOnScroll);