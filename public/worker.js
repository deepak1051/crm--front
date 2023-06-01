console.log("Service Worker Loaded...");
self.addEventListener("push", function (e) {
  console.log("inside windows");
  const data = e.data.json();
  if (self.clients && self.clients.matchAll) {
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clients) => {
        console.log(data);
        console.log(clients);
        clients.map((client) => {
          if (client.visibilityState === "visible") {
            // Do not show notification if page is visible
            return;
          }
        });
        console.log("helo");
        // Show notification if page is not visible

        self.registration.showNotification(data.title, {
          body: data.message,
          icon: "https://pacifencesolutions.com/wp-content/uploads/2022/08/pacifence-solutions-logo.webp",
          // tag: data.tag,
          // data: data.url,
        });
      });
    console.log("working2");
  } else {
    // Show notification if unable to determine page visibility
    console.log("working3");

    self.registration.showNotification(data.title, {
      body: data.message,
      icon: "https://pacifencesolutions.com/wp-content/uploads/2022/08/pacifence-solutions-logo.webp",
    });
  }
});

self.addEventListener("notificationclick", (event) => {
  // Handle notification click event
  // For example, you can open a specific URL when the notification is clicked
  event.notification.close();
  // const notification = event.notification;
  // const action = event.action;

  // console.log(event);

  // if (action === "open-url") {
  //   // Open a specific URL when the notification is clicked
  //   const url = notification.data.url;
  clients.openWindow("/employee/chat");
});

self.addEventListener("notificationclose", (event) => {
  // Handle notification close event
  // This event is triggered when the user dismisses the notification without clicking it
});

// Other service worker lifecycle events can be implemented here, such as 'install' and 'activate'
