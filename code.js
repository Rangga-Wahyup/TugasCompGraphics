const canvas = document.getElementById('webglCanvas');
const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

if (!gl) {
    alert('Unable to initialize WebGL. Your browser may not support it.');
} else {
   
    const vertexShaderSource = `
        attribute vec2 a_position;

        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fragmentShaderSource = `
        precision mediump float;
        uniform vec4 u_color;

        void main() {
            gl_FragColor = u_color;
        }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    // Buffer untuk posisi vertex lingkaran
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    const positions = [
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    gl.useProgram(program);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const u_colorLocation = gl.getUniformLocation(program, 'u_color');


    function changeColor(color) {
        gl.uniform4fv(u_colorLocation, color);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    // Tombol-tombol warna
    const redButton = document.getElementById('redButton');
    redButton.addEventListener('click', () => changeColor([1.0, 0.0, 0.0, 1.0]));

    const greenButton = document.getElementById('greenButton');
    greenButton.addEventListener('click', () => changeColor([0.0, 1.0, 0.0, 1.0]));

    const blueButton = document.getElementById('blueButton');
    blueButton.addEventListener('click', () => changeColor([0.0, 0.0, 1.0, 1.0]));

    const resetButton = document.getElementById('Reset');
    resetButton.addEventListener('click', () => changeColor([1.0, 1.0, 0.0, 1.0]));
    
    changeColor([1.0, 1.0, 0.0, 1.0]); 
}