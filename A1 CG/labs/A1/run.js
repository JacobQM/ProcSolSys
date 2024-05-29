// Set up the scene and add shapes
setScene();
addShapes();

// Resize scene listener
window.addEventListener('resize', resizeScene);

updateSpeed();

// Start animation loops
//animate_earth();
//animate_moon();
animate_sun();
animate_planets();
