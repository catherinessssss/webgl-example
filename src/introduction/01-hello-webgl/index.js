(function(){
  const canvas = document.getElementById('webgl');

  const gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Unable to initialize WebGL. your browser or machine may not support it.");
    return;
  }

  // set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

})();
