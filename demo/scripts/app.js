var count = 1;

function onCacheError(evt) {

  var fileInfo = evt.data;
  var log = document.getElementById('log');

  log.textContent += (count++) + ": " + evt.data.src + " is not cacheable:\n" +
    fileInfo.warnings.join("\n") + "\n\n";

  // hack to scroll the warning pane
  log.scrollTop = 1000000;
}

function onClick(evt) {
  this.load();
}

function showClear() {
  var clearButton = document.getElementById('clear');
  clearButton.addEventListener('click', function() {
    RAL.FileSystem.removeDir('slowimageserver.appspot.com', function() {
      console.log("All clear");
    });
  });
}

if(RAL.FileSystem.isReady()) {
  showClear();
} else {
  RAL.FileSystem.registerOnReady(showClear);
}
