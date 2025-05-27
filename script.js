// script.js
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.menu');
const searchInput = document.querySelector('.search-input');
const menuItems = document.querySelectorAll('.menu-item');
const cityPage = document.querySelector('.city-page');
const backButton = document.querySelector('.back-button');
const cityWeather = document.querySelector('.city-weather');
const weatherInfo = cityWeather.querySelector('.weather-info h2');
const mainContent = document.querySelector('.main-content');
const curentWeather = document.querySelector('.current-weather');
const weatherInfo1 = curentWeather.querySelector('.weather-info h2');
const installButton = document.getElementById('installButton');
// Показ/скрытие меню
menuButton.addEventListener('click', () => {
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});

// Фильтрация городов по поиску
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    menuItems.forEach(item => {
        const cityName = item.dataset.city.toLowerCase();
        if (cityName.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
});

// Открытие страницы города при клике на элемент меню
// Assuming menuItems is a collection of menu item elements
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Get city data from the clicked item's dataset
        const cityName = item.dataset.city;  // "Город 2"
        const cityImage = item.dataset.image;  // "img/city_2.webp"
        
        // Update the UI
        weatherInfo1.textContent = cityName;  // Display city name
        console.log(cityImage);
        curentWeather.style.backgroundImage = `url('${cityImage}')`;  // Set background image
        menu.style.display = 'none';  // Hide menu
        cityPage.style.display = 'none';  // Show city page
    });
});

// Возврат к меню при нажатии на кнопку "назад"
backButton.addEventListener('click', () => {
    menu.style.display = 'none';
    
});


// Обновленный код в script.js
// Регистрация Service Worker
const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

// …

registerServiceWorker();

// sw.js
self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim()); // Немедленный контроль
  console.log('[SW] Активирован и контролирует страницу');
});
// Обработчик установки
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  console.log('[PWA] beforeinstallprompt сработал');
  const installButton = document.getElementById('installButton');
  installButton.style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', async () => {
  if (!deferredPrompt) {
    console.error('[PWA] Prompt недоступен. Проверьте условия PWA');
    return;
  }

  try {
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] Пользователь ${outcome === 'accepted' ? 'принял' : 'отклонил'} установку`);
  } catch (error) {
    console.error('[PWA] Ошибка:', error);
  } finally {
    deferredPrompt = null;
  }
});

// Проверка установки
window.addEventListener('appinstalled', () => {
  console.log('Приложение успешно установлено!');
});

// Скрываем кнопку если приложение уже установлено
window.addEventListener('appinstalled', () => {
    const installButton = document.getElementById('installButton');
    installButton.style.display = 'none';
});


