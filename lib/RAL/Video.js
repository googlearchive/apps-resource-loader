/**
 * Represents a remote video.
 * @param {object} options the configuration options.
 */
RAL.RemoteVideo = function(options) {

    // override the prototype refs with this obj
    RAL.RemoteFile.call(this);

    options = options || {};

    this.element = options.element || document.createElement('video');
    this.src = this.element.dataset.src || options.src;
    this.width = this.element.width || options.width || null;
    this.height = this.element.height || options.height || null;
    this.placeholder = this.element.dataset.placeholder || null;
    this.priority = options.priority || 0;

    // attach on specific events for videos
    this.addEventListener('loaded', this.showVideo.bind(this));

    if(typeof options.autoLoad !== "undefined") {
        this.autoLoad = options.autoLoad;
    }

    if(typeof options.ignoreCacheHeaders !== "undefined") {
        this.ignoreCacheHeaders = options.ignoreCacheHeaders;
    }

    // if there is a TTL use that instead of the default
    if(this.ignoreCacheHeaders && typeof this.timeToLive !== "undefined") {
        this.timeToLive = options.timeToLive;
    }

    if(this.autoLoad) {
        this.load();
    }
};

RemoteVideo.prototype = new RAL.RemoteFile();


/**
 * Shows the video.
 * @param {event} evt The loaded event for the asset.
 */
RemoteVideo.prototype.showVideo = function(evt) {

  var videoSrc = evt.data;
  var video = new RemoteVideo();
  var revoke = (function(videoSrc) {
    this.wURL.revokeObjectURL(videoSrc);
  }).bind(this, videoSrc);

  var videoLoaded = function() {

    // infer the size from the image
    var width = this.width || video.naturalWidth;
    var height = this.height || video.naturalHeight;

    this.element.style.width = width + 'px';
    this.element.style.height = height + 'px';
    this.element.style.backgroundImage = 'url(' + videoSrc + ')';
    this.element.style.backgroundSize = width + 'px ' + height + 'px';

    // if it's a blob make sure we go ahead
    // and revoke it properly after a short timeout
    if(/blob:/.test(videoSrc)) {
      setTimeout(revoke, 100);
    }
  };

  video.onload = videoLoaded.bind(this);
  video.src = videoSrc;
};
