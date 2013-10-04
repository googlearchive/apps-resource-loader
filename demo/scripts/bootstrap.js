window.addEventListener('load', function() {

  /**
   * Fires off a request to get a remote manifest file
   */
  function init() {

    // get the local resources
    parseLocalImages();

    // start by loading the remote asset list
    RAL.Loader.load("remote_images.json",
      'text', // xhr response type
      onSuccessfulRMGet,
      onFailedRMGet);
  }

  function onSuccessfulRMGet(data) {
    var toLoad = JSON.parse(data);
    var imageToLoad = null;
    var remoteImage = null;
    var container = document.getElementById('mid');

    for(var i = 0; i < toLoad.images.length; i++) {

      imageToLoad = toLoad.images[i];

      // next add in an image directly from the script
      // with the highest queue priority
      remoteImage = new RAL.RemoteImage(imageToLoad);

      // attach the new image element to the DOM
      // (we could've passed in an image to the RemoteImage call
      // but since we didn't it created an image element)
      container.appendChild(remoteImage.element);

      // listen for the image being loaded
      // and spit out a console message
      remoteImage.addEventListener('loaded',
        onRemoteImageLoaded.bind(remoteImage));

      // also listen for cache problems like 'no-cache'
      remoteImage.addEventListener('cacheerror',
        onCacheError);

      // add it to the queue
      RAL.Queue.add(remoteImage);
    }

    go();
  }

  function onRemoteImageLoaded() {
    console.log("I have loaded the image from remote: " + this.src);
  }

  function onFailedRMGet() {
    console.warn("Could not load remote manifest");

    // just go get what we have queued
    go();
  }

  /**
   * Gets the images that are embedded in the page itself
   * and creates an additional image asset directly
   */
  function parseLocalImages() {

    // grab all images in the page
    var images = document.querySelectorAll('img');

    for (var i = 0; i < images.length; i++) {

      // wrap the image in a remote image
      // object and pass it to the queue
      // - set the image priority to the reverse
      //   of the querySelectorAll order
      var remoteImage = new RAL.RemoteImage({
        element: images[i],
        priority: i
      });

      // declared in app.js - lets us know if we
      // hit cache errors, e.g. no-cache
      remoteImage.addEventListener('cacheerror', onCacheError);

      RAL.Queue.add(remoteImage);
    }

    // next add in an image (sample-5.png) directly from the script
    // with the highest queue priority
    var finalImage = new RAL.RemoteImage({
      src: "images/sample-5.png",
      priority: RAL.Queue.getNextHighestPriority(),
      width: 376,
      height: 201
    });

    // just listen for the image being loaded
    // and add it into the document
    finalImage.addEventListener('loaded', function() {
      var img = finalImage.element;
      document.getElementById('mid').appendChild(img);
    });

    // add it to the queue
    RAL.Queue.add(finalImage);
  }

  function go() {

    // start the queue, maxed out
    // to 4 connections
    RAL.Queue.setMaxConnections(4);
    RAL.Queue.start();
  }

  // wait for the file manifest to be loaded
  // before attempting anything
  if(RAL.FileManifest.isReady()) {
    init();
  } else {
    RAL.FileManifest.registerOnReady(init);
  }

});
