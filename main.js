// main.js

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D u_image;
    uniform sampler2D u_imagehover;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_resRatio;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
        vec2 uv = vUv;
        
        // Correct mouse aspect ratio
        vec2 mouse = u_mouse;
        
        // Gooey logic
        float noise = snoise(uv * 10.0 + u_time * 0.5) * 0.05;
        float dist = distance(uv, mouse);
        float strength = smoothstep(0.5, 0.0, dist + noise);

        vec4 tex1 = texture2D(u_image, uv);
        vec4 tex2 = texture2D(u_imagehover, uv);

        gl_FragColor = mix(tex1, tex2, strength);
    }
`;

class GooeyScene {
    constructor() {
        this.container = document.getElementById('stage');
        this.imgElement = document.querySelector('.tile__image');
        
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ canvas: this.container, alpha: true, antialias: true });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.initCamera();
        this.initLoader();
    }

    initCamera() {
        const perspective = 800;
        const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
        this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 0, perspective);
    }

    initLoader() {
        const loader = new THREE.TextureLoader();
        this.textures = {
            main: loader.load(this.imgElement.src),
            hover: loader.load(this.imgElement.dataset.hover)
        };
        this.createMesh();
    }

    createMesh() {
        const rect = this.imgElement.getBoundingClientRect();
        
        this.uniforms = {
            u_image: { value: this.textures.main },
            u_imagehover: { value: this.textures.hover },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_time: { value: 0 },
            u_resRatio: { value: window.innerWidth / window.innerHeight }
        };

        const geometry = new THREE.PlaneBufferGeometry(1, 1, 1, 1);
        const material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true
        });

        this.mesh = new THREE.Mesh(geometry, material);
        
        // Sync WebGL size/pos with DOM element
        this.mesh.scale.set(rect.width, rect.height, 1);
        this.mesh.position.set(
            rect.left - window.innerWidth / 2 + rect.width / 2,
            -rect.top + window.innerHeight / 2 - rect.height / 2,
            0
        );

        this.scene.add(this.mesh);
        this.setupEvents();
        this.render();
    }

    setupEvents() {
        window.addEventListener('mousemove', (e) => {
            const rect = this.imgElement.getBoundingClientRect();
            
            // Normalize mouse relative to the image element (0 to 1)
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1 - (e.clientY - rect.top) / rect.height;

            gsap.to(this.uniforms.u_mouse.value, {
                x: x,
                y: y,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            // Re-sync mesh scale/pos here if needed
        });
    }

    render() {
        this.uniforms.u_time.value += 0.05;
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.render());
    }
}

new GooeyScene();