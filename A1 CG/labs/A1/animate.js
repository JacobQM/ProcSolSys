const speed = 0.005;
const earthOrbitRadius = 80;
var earthAlpha = 0;
var earthDeltaAlpha = 2 * Math.PI / 1000;
var globalSpeed = 1;
const moonOrbitRadius = 10;
var moonAlpha = 0;
var moonDeltaAlpha = 2 * Math.PI / 1000;

// Update the speed of the scene animation based on the value of the speed slider
function updateSpeed() {
    var speedSlider = document.getElementById("speedSlider");
    var speedFactor = parseFloat(speedSlider.value) / 100;
    globalSpeed = speedFactor;
}

// Animate Earth's rotation
function animate_earth() {
    requestAnimationFrame(animate_earth);
    earthAlpha += earthDeltaAlpha;
    earth.position.x = earthOrbitRadius * Math.cos(earthAlpha);
    earth.position.z = earthOrbitRadius * Math.sin(earthAlpha);
    renderer.render(scene, camera);
}

// Animate Moon's orbit around Earth
function animate_moon() {
    requestAnimationFrame(animate_moon);

    moonAlpha += moonDeltaAlpha * globalSpeed;
    earthMoon.position.x = moonOrbitRadius * Math.cos(moonAlpha);
    earthMoon.position.z = moonOrbitRadius * Math.sin(moonAlpha);
    renderer.render(scene, camera);
}
// Animate Sun's rotation
function animate_sun() {
    requestAnimationFrame(animate_sun);
    sun.rotation.y += speed * globalSpeed;
    renderer.render(scene, camera);
}

function animate_planets() {
    requestAnimationFrame(animate_planets);

    if (planets.length > 0) {
        planets.forEach(function (planet) {
            // Update rotation around Sun
            planet.userData.angle += (planet.userData.orbitVelocity * 0.5) * globalSpeed;
            var x = Math.cos(planet.userData.angle) * (planet.position.length() - sun.position.length());
            var z = Math.sin(planet.userData.angle) * (planet.position.length() - sun.position.length());
            planet.position.set(x, 0, z);

            // Rotate planet around its axis
            var rotationSpeed = (speed * globalSpeed) * 0.000001;
            planet.rotation.y += rotationSpeed;

            // Apply tilt with adjusted speed
            planet.rotateOnAxis(planet.userData.tiltAxis, planet.userData.tiltAngle * globalSpeed);
        });
    }

    renderer.render(scene, camera);
}

