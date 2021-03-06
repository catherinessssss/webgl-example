(function () {
  const webglUtils = {

    // Initialize a shader program, so WebGL knows how to draw our data
    initShaderProgram(gl, vsSource, fsSource) {
      const vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vsSource);
      const fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

      // Create the shader program

      const shaderProgram = gl.createProgram();
      gl.attachShader(shaderProgram, vertexShader);
      gl.attachShader(shaderProgram, fragmentShader);
      gl.linkProgram(shaderProgram);

      // If creating the shader program failed, alert

      if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
        return null;
      }

      return shaderProgram;
    },
    // creates a shader of the given type, uploads the source and
    // compiles it.
    loadShader(gl, type, source) {
      const shader = gl.createShader(type);

      // Send the source to the shader object

      gl.shaderSource(shader, source);

      // Compile the shader program

      gl.compileShader(shader);

      // See if it compiled successfully

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }
  };

  const canvas = document.getElementById('webgl');

  const gl = canvas.getContext("webgl");

  if (!gl) {
    console.log("Unable to initialize WebGL. your browser or machine may not support it.");
    return;
  }

  // Vertex shader program
  const VSHADER_SOURCE = `
    void main() {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0); // set position
      gl_PointSize = 10.0;
    }
  `;

  // Fragment shader program
  const FSHADER_SOURCE = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // set color
    }
  `;


  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = webglUtils.initShaderProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE)
  if (!shaderProgram) {
    console.log("Failed to initialize shaders.");
    return;
  }

  // Tell WebGL to use our program when drawing
  gl.useProgram(shaderProgram);

  // set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);

})();
