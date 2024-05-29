var moons = [];
var planets = [];

function createSphere(radius, hlines, vlines, hex) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(hex);
    material.wireframe = true;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sphere = new THREE.Mesh(geometry_sphere, material);
    return sphere;
}

function createSun(radius, hlines, vlines, hex) {
    var material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(hex);
    material.wireframe = true;
    var geometry_sphere = new THREE.SphereGeometry(radius, hlines, vlines);
    var sun = new THREE.Mesh(geometry_sphere, material);
    return sun;
}

function createRandomPlanet() {
    var radius = Math.random() * 5 + 1;
    var hlines = Math.floor(Math.random() * 20) + 20;
    var vlines = Math.floor(Math.random() * 20) + 20;
    var color = "#" + ((1 << 24) * Math.random() | 0).toString(16); // Random hex color

    var planet = createSphere(radius, hlines, vlines, color);

    // Set position further from the origin than Earth's axis
    var angle = Math.random() * Math.PI * 2; // Random angle around the Sun
    var distance = Math.random() * 100 + 250; // Random distance from the Sun between 250 and 350
    var x = Math.cos(angle) * distance;
    var z = Math.sin(angle) * distance;

    // Adjust x position to ensure significant difference between planets
    var xRange = 500;
    x += (Math.random() * xRange - xRange / 2);

    planet.position.set(x, 0, z);

    // Assign random orbit velocity
    var orbitVelocity = Math.random() * 0.01 + 0.005; // Random velocity between 0.005 and 0.015 radians per frame
    planet.userData = {
        angle: Math.random() * Math.PI * 2,
        orbitVelocity: orbitVelocity,
        tiltAngle: Math.random() * Math.PI, // Random tilt angle
        tiltAxis: new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize() // Random tilt axis
    };

    //randomly generate rings around planet
    if (Math.random() < 0.4) {
        var ringGeometry = new THREE.RingGeometry(radius * 1.5, radius * 2, 64);
        var ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
        var ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2; // Rotate the ring to align with the planet's equator

        planet.add(ring);
    }

    return planet;
}

function createStarField() {
    var geometry = new THREE.Geometry();
    var range = 1000;
    var count = 2500;

    for (var i = 0; i < count; i++) {
        var star = new THREE.Vector3();
        star.x = Math.random() * range - range / 2;
        star.y = Math.random() * range - range / 2;
        star.z = Math.random() * range - range / 2;
        geometry.vertices.push(star);
    }

    var material = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
    var stars = new THREE.Points(geometry, material);

    return stars;
}

function createRandomMoon(planet) {
    var radius = Math.random() * 1 + 0.5;
    var hlines = Math.floor(Math.random() * 10) + 10;
    var vlines = Math.floor(Math.random() * 10) + 10;
    var color = "#" + ((1 << 24) * Math.random() | 0).toString(16); // Random hex color

    var moon = createSphere(radius, hlines, vlines, color);

    // Set position around the planet
    var angle = Math.random() * Math.PI * 2; // Random angle around the planet
    var distance = Math.random() * 10 + 15;
    var x = Math.cos(angle) * distance; // Calculate x position
    var z = Math.sin(angle) * distance; // Calculate z position

    moon.position.set(x, 0, z);

    return moon;
}

earth = createSphere(3, 32, 32, "#3cb371");
earth.position.set(80, 0, 0);
earthMoon = createSphere(1, 28, 28, "#C0C0C0");
earthMoon.position.set(20, 0, 0);
earth.add(earthMoon);
sun = createSun(20, 64, 64, "#FFFF00");
starField = createStarField();

function addShapes() {
    //scene.add(earth);
    scene.add(starField);
    scene.add(sun);
    planets.forEach(function (planet) {
        scene.add(planet);
    });
}