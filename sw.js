//Referred source 'https://matthewcranford.com/restaurant-reviews-app-walkthrough-part-4-service-workers/' for below section

//Listing files to be stored in cache for offline access
const filesToCache = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
  ];

//This function adds all files to cache storage 
self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open('rest-reviews-v1').then(function(cache){
            return cache.addAll(filesToCache);
        })

    );
});

//Checks if content is found in cache and returns to user
//If content is not found in cache, fetches using 'Fetch' event and also adds that to cache storage
self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if(response){
                return response;
            }else{
                return fetch(event.request).then(function(response){
                    const clonedResponse = response.clone();
                    caches.open('rest-reviews-v1').then(function(cache) {
                        cache.put(event.request, clonedResponse);
                    })
                    return response;
                })
            }
        })
    );
});

