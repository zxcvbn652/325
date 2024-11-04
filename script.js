// 图片数据 - 王的图片（只包含小奶狗）
const wangImages = [
    {
        id: 1,
        src: './imgs/3a8b8a55a19c56f74fe700d642d27e1.jpg',
        description: '小奶狗'
    },
    {
        id: 3,
        src: './imgs/15b88da145be573bc4d839f28003282.jpg',
        description: '小奶狗'
    },
    {
        id: 5,
        src: './imgs/e9449c78fb16802a07b1f8f045ae044.jpg',
        description: '小奶狗'
    }
];

// 朱的图片数据（只包含男同）
const zhuImages = [
    {
        id: 2,
        src: './imgs/7fc35252eccf67e5a186d0ca0e3ca50.jpg',
        description: '男同'
    },
    {
        id: 4,
        src: './imgs/72352991cfc6a64b116fa16b2f08b08.jpg',
        description: '男同'
    }
];

// 加载图片
function loadImages(images) {
    const imageGrid = document.querySelector('.image-grid');
    imageGrid.innerHTML = images.map(image => `
        <div class="image-item">
            <img src="${image.src}" alt="${image.description}">
        </div>
    `).join('');
}

// 轮播相关变量
let currentSlide = 0;
let autoPlayInterval;

// 初始化轮播
function initializeCarousel() {
    const track = document.querySelector('.carousel-track');
    
    track.innerHTML = zhuImages.map(image => `
        <div class="carousel-slide">
            <img src="${image.src}" alt="${image.description}">
        </div>
    `).join('');
}

// 移动轮播
function moveSlide() {
    currentSlide = (currentSlide + 1) % zhuImages.length;
    const track = document.querySelector('.carousel-track');
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// 启动自动播放
function startAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
    autoPlayInterval = setInterval(moveSlide, 2000);
}

// 停止自动播放
function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
    }
}

// 修改处理导航点击的函数
function handleNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const imageGrid = document.querySelector('.image-grid');
    const carouselContainer = document.querySelector('.carousel-container');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            if (link.textContent === '王') {
                imageGrid.style.display = 'grid';
                carouselContainer.style.display = 'none';
                stopAutoPlay();
                loadImages(wangImages);
            } else if (link.textContent === '朱') {
                imageGrid.style.display = 'none';
                carouselContainer.style.display = 'block';
                initializeCarousel();
                startAutoPlay();
            }
        });
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadImages(wangImages);  // 默认加载王的图片
    handleNavigation();
}); 