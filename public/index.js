let productLink = "";
getProductDetails = async (link) => {
  try {
    const response = await fetch(
      "/api/v1/getProductData",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ link: link }),
      }
    );
    const result = await response.json();
    return result;

  } catch (error) {
    console.error(error);
    return {
      status: false,
      name: "No product found",
      currentPrice: null,
    };
  }
};

const continueBtn = document.querySelector("#continueBtn");
continueBtn.addEventListener("click", async () => {
  if (document.querySelector("#productLink").value === "") {
    alert("Please enter the link");
  } else {
    continueBtn.disabled = true;
    continueBtn.innerHTML = "Searching";
    continueBtn.style.opacity = "0.7";
    const loadingAnimation = setInterval(loading, 2000);
    productLink = document.querySelector("#productLink").value;

    productDetails = await getProductDetails(productLink);

    // console.log(document.querySelector('#productLink').value);
    // console.log(productDetails);

    if (productDetails.status == false) {
      document.querySelector(
        ".productDetailsSection"
      ).innerHTML = `<div class="invalidProduct"> We're sorry, but we couldn't find the product.</div>`;
    } else {
      document.querySelector(
        ".productDetailsSection"
      ).innerHTML = `<div class="productDetails">
            Product Name &nbsp;: &nbsp; ${productDetails.name}
          </div>
          <div class="productDetails" >
           Currernt Price &nbsp; : &nbsp; <span id = "currentPrice">${productDetails.currentPrice} </span>
          </div>
          <div class="productDetails">
            <span>Target Price &nbsp;&nbsp; : &nbsp;&nbsp; </span>
            <input type="number" name="targetPrice" class="inputField" id="targetPrice" placeholder="Enter your target price"/>
          </div>
          <button class="btn" id="notifyBtn" onclick = 'setUpNotifier()'>Notify Me</button>
          <p>To get the notification,give permission to send the notification forever.</p>`;
    }
    clearInterval(loadingAnimation);

    setTimeout(() => {
      continueBtn.innerHTML = "Continue";
      continueBtn.disabled = false;
      continueBtn.style.opacity = "1";
    }, 1500);
  }
});

//loading animation
const loading = () => {
  continueBtn.innerHTML = "Searching";
  setTimeout(() => {
    continueBtn.innerHTML = "Searching .";
  }, 500);
  setTimeout(() => {
    continueBtn.innerHTML = "Searching . .";
  }, 1000);
  setTimeout(() => {
    continueBtn.innerHTML = "Searching . . .";
  }, 1500);
};

//for push notification
const send = async () => {
  try {
    let subscription;
    const register = await navigator.serviceWorker
      .register("/worker.js", {
        scope: "/",
      })
        // } catch (error) {
        //   console.error(error)
        // }
        // console.log("Registered service worker.");

        // try { 

        if ("PushManager" in window) {
            const serviceWorkerRegistration = await navigator.serviceWorker.ready; // Wait for service worker activation
        
            subscription = await serviceWorkerRegistration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey:
              "BORcIsTPjn_CHcIHKuOIx7IypYpB8_6ndqAGG4hvNwzrSgbcjw-WTV4rTWe6mYkV0cgrslFDNl2qaPLrMrxhpsU"});
            }

    await fetch("/api/v1/setProductsToNotify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productLink: productLink,
        targetPrice: document.querySelector("#targetPrice").value,
        subscription: subscription,
      }),
    });
    document.querySelector("#notifyBtn").innerHTML = "Done";
  } catch (error) {
    console.error(error);
  }
};

const setUpNotifier = () => {
  const  userTargetPrice  = document.querySelector("#targetPrice").value
  if ( userTargetPrice !== "" && userTargetPrice<= parseInt(document.querySelector("#currentPrice").innerText) ) {

    
    if (!("Notification" in window)) {
      alert("Sorry, your browser does not support notification");
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          if ("serviceWorker" in navigator) {
            
            document.querySelector("#notifyBtn").disabled = true;
            document.querySelector("#notifyBtn").style.opacity = "0.7";
            send().catch((e) => console.error(e));
          }
        } else if (permission === "denied") {
          alert("Please allow us to send notification");

          Notification.requestPermission();
        }
      });
    }
  } else {
    alert("Please enter valid target price.");
  }
};
