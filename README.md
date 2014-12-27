## Chrome Packaged Apps Resource Loader

You can request external images using XMLHttpRequest and transform them into ObjectURLs. Then set the src attribute in the `<img>` tag to each ObjectURL and it should work.

Since this is a very common use case, we created this library to simplify it. Just drop the apps-resource-loader [ral.min.js](https://github.com/GoogleChrome/apps-resource-loader/blob/master/lib/ral.min.js) to your project and then:

    var remoteImage, 
        container = document.querySelector('.imageContainer'),
        toLoad = { 'images': [ 
            {src: 'http://myserver.com/image1.png'}, 
            {src: 'http://myserver.com/image2.png'}
            ]}; // list of image URLs

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

## LICENSE

Copyright 2013 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
