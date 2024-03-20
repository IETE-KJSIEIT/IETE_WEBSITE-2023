var renderer, scene, camera, composer, circle, skelet, particle;

window.onload = function () {
    init();
    animate();
}

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);
    document.getElementById('canvas').appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 400;
    scene.add(camera);

    circle = new THREE.Object3D();
    skelet = new THREE.Object3D();
    particle = new THREE.Object3D();

    scene.add(circle);
    scene.add(skelet);
    scene.add(particle);

    var geometry = new THREE.TetrahedronGeometry(2, 0);
    var geom = new THREE.IcosahedronGeometry(7, 1);
    var geom2 = new THREE.IcosahedronGeometry(15, 1);

    var material = new THREE.MeshPhongMaterial({
        color: 0xffffff, // particle color
        shading: THREE.FlatShading
    });

    for (var i = 0; i < 1000; i++) {
        var mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        mesh.position.multiplyScalar(90 + (Math.random() * 700));
        mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);
        particle.add(mesh);
    }

    var geometrySphere = new THREE.SphereGeometry(130, 32, 32);

    var mat = new THREE.MeshPhongMaterial({
        color: 0xffffff, // sphere color
        shading: THREE.SmoothShading
    });

    var sphere = new THREE.Mesh(geometrySphere, mat);
    circle.add(sphere);

    var geometryInsideSphere = new THREE.SphereGeometry(10, 32, 32);

    var insideSphereMat = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shading: THREE.SmoothShading
    });

    var insideSphere = new THREE.Mesh(geometryInsideSphere, insideSphereMat);
    circle.add(insideSphere);

    var planeGeometry = new THREE.PlaneGeometry(180, 180); // Size

    var textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load('/assets/index/CutPaste_2024-03-08_15-51-23-481.png');

    var mat2 = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1, // Opacity
        alphaTest: 0.5 // Alpha test threshold
    });

    var imagePlane = new THREE.Mesh(planeGeometry, mat2);

    imagePlane.position.set(0, -5, 130); // Z position
    circle.add(imagePlane);

    var mat3 = new THREE.MeshPhongMaterial({
        color: 0xffffff, // skelet color
        wireframe: true,
        side: THREE.DoubleSide
    });

    var planet2 = new THREE.Mesh(geom2, mat3);
    planet2.scale.x = planet2.scale.y = planet2.scale.z = 12; //
    skelet.add(planet2);

    var ambientLight = new THREE.AmbientLight(0x999999);
    scene.add(ambientLight);

    var lights = [];
    lights[0] = new THREE.DirectionalLight(0xffffff, 1);
    lights[0].position.set(1, 0, 0);
    lights[1] = new THREE.DirectionalLight(0x11E8BB, 1);
    lights[1].position.set(0.75, 1, 0.5);
    lights[2] = new THREE.DirectionalLight(0x8200C9, 1);
    lights[2].position.set(-0.75, -1, 0.5);
    scene.add(lights[0]);
    scene.add(lights[1]);
    scene.add(lights[2]);

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    particle.rotation.x += 0.0000;
    particle.rotation.y -= 0.0040;
    // circle.rotation.x -= 0.0020;
    // circle.rotation.y -= 0.0030;
    skelet.rotation.x -= 0.0010;
    skelet.rotation.y += 0.0020;

    // Adjustments for responsiveness
    var aspect = window.innerWidth / window.innerHeight;
    var sizeMultiplier = aspect > 1 ? 1 : aspect; // Limit size when aspect ratio is small

    circle.scale.set(sizeMultiplier, sizeMultiplier, sizeMultiplier);
    skelet.scale.set(sizeMultiplier, sizeMultiplier, sizeMultiplier);
    particle.scale.set(sizeMultiplier, sizeMultiplier, sizeMultiplier);

    renderer.clear();
    renderer.render(scene, camera);
}
