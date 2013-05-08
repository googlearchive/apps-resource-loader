## Chrome Packaged Apps Resource Loader

You can request external images using XMLHttpRequest and transform them into ObjectURLs. Then set the src attribute in the `<img>` tag to each ObjectURL and it should work.

Since this is a very common use case, we created this library to simplify it. Just drop the apps-resource-loader [ral.min.js](https://github.com/GoogleChrome/apps-resource-loader/blob/master/lib/ral.min.js) to your project and then:

    var remoteImage, 
        container = document.querySelector('.imageContainer'),
        toLoad = { 'images': [ 
           'http://myserver.com/image1.png', 
           'http://myserver.com/image2.png' ] }; // list of image URLs

    toLoad.images.forEach(function(imageToLoad) {
          remoteImage = new RAL.RemoteImage(imageToLoad);
          container.appendChild(remoteImage.element);
          RAL.Queue.add(remoteImage);
    });
    RAL.Queue.setMaxConnections(4);
    RAL.Queue.start();

Remember that you need permission in the `manifest.json` to all domains you will be XHR'ing to. If you don't know beforehand where those images will be hosted, you can ask permission for any url:

        permissions: ['<all_urls>'],

For other usages, please see the simple demo at:
https://github.com/GoogleChrome/apps-resource-loader/tree/master/demo
