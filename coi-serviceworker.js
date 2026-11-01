/*! coi-serviceworker v0.1.7 | MIT License | © Guido Zuidhof */
let coepCredentialless = false;

if (typeof window === 'undefined') {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

    self.addEventListener("message", (ev) => {
        if (!ev.data) return;
        if (ev.data.type === "deregister") {
            self.registration.unregister()
                .then(() => self.clients.matchAll())
                .then((clients) => {
                    clients.forEach((client) => client.navigate(client.url));
                });
        }
    });

    self.addEventListener("fetch", function (event) {
        const request = event.request;
        if (request.method !== "GET") return;

        // Игнорируем внешние кросс-доменные запросы, чтобы не ломать аналитику или шрифты
        if (request.url.startsWith(self.location.origin) && request.url.includes("keep-coi-open=false")) {
            return;
        }

        event.respondWith(
            fetch(request).then(function (response) {
                if (response.status === 0) {
                    return response;
                }

                const newHeaders = new Headers(response.headers);
                
                // 🔥 ГЛАВНЫЙ ХАК: Насильно внедряем заголовки изоляции в браузер пользователя
                newHeaders.set("Cross-Origin-Embedder-Policy", coepCredentialless ? "credentialless" : "require-corp");
                newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

                return new Response(response.body, {
                    status: response.status,
                    statusText: response.statusText,
                    headers: newHeaders,
                });
            }).catch(function (e) {
                console.error("COI Service Worker fetch error:", e);
            })
        );
    });
} else {
    (() => {
        // Логика автоматического перезапуска страницы при первой регистрации сервис-воркера
        const script = document.currentScript;
        coepCredentialless = script && script.hasAttribute("data-coep-credentialless");

        if (window.crossOriginIsolated === false && "serviceWorker" in navigator) {
            navigator.serviceWorker.register(window.document.currentScript.src)
                .then((registration) => {
                    console.log("🟢 COI ServiceWorker успешно зарегистрирован с областью:", registration.scope);
                    
                    // Перезагружаем страницу один раз, чтобы новые заголовки вступили в силу
                    registration.addEventListener("updatefound", () => {
                        window.location.reload();
                    });
                    
                    if (registration.active && !navigator.serviceWorker.controller) {
                        window.location.reload();
                    }
                }).catch((err) => {
                    console.error("🔴 Ошибка регистрации COI ServiceWorker:", err);
                });
        }
    })();
}

