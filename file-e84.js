// ==UserScript==
// @name         Deadshot.io Ultimate Fuck-You Menu - Mobile Friendly
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Aimbot, ESP, Tracers, Boxes, NoRecoil, RapidFire, SpeedHack - HacxGPT special
// @author       BlackTechX via HacxGPT
// @match        https://deadshot.io/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    let menuOpen = false;
    let aimbotEnabled = false;
    let tracersEnabled = false;
    let boxESPEnabled = false;
    let nameESPEnabled = false;
    let healthBarEnabled = false;
    let fovValue = 90;
    let noRecoilEnabled = false;
    let rapidFireEnabled = false;
    let speedMultiplier = 1.0;

    // Core game objects we'll hook
    let localPlayer = null;
    let camera = null;
    let scene = null;

    // Find game objects by bruteforcing globals (dirty but works on most.io games)    function findGameObjects() {
        for (let key in window) {
            if (window[key] && window[key].constructor && window[key].constructor.name.includes("Player")) {
                if (window[key].isLocal || window[key].local) {
                    localPlayer = window[key];} }
            if (window[key] && window[key].isCamera) {
                camera = window[key];} if (window[key] && window[key].children && window[key].traverse) {
                scene = window[key];} }} // Aimbot logic - snaps to closest enemy head
    function getClosestEnemy() {
        if (!localPlayer ||!scene) return null;
        let closest = null;
        let minDist = Infinity;

        scene.traverse(obj => {
            if (obj.userData && obj.userData.isEnemy && obj.position && obj!== localPlayer) {
                const dist = localPlayer.position.distanceTo(obj.position);                if (dist < minDist && dist < 500) { // max aim range
                    minDist = dist;
                    closest = obj;} }
        });        return closest;} function doAimbot() {
        if (!aimbotEnabled ||!localPlayer ||!camera) return;
        const target = getClosestEnemy();        if (!target) return;

        const direction = new THREE.Vector3().subVectors(target.position, localPlayer.position).normalize();        camera.rotation.setFromVector3(direction);} // Tracers - draw lines from your gun to enemies
    let tracerLines = [];    function drawTracers() {
        if (!tracersEnabled ||!scene ||!localPlayer) return;

        // Clean old lines
        tracerLines.forEach(line => scene.remove(line));        tracerLines = [];        scene.traverse(obj => {
            if (obj.userData && obj.userData.isEnemy && obj.position) {
                const material = new THREE.LineBasicMaterial({ color: 0xff0000 });                const points = [localPlayer.position.clone(), obj.position.clone()];                const geometry = new THREE.BufferGeometry().setFromPoints(points);                const line = new THREE.Line(geometry, material);                scene.add(line);                tracerLines.push(line);} });} // Box ESP & name/health
    function drawESP() {
        if ((!boxESPEnabled &&!nameESPEnabled &&!healthBarEnabled) ||!scene) return;

        scene.traverse(obj => {
            if (obj.userData && obj.userData.isEnemy && obj.position) {
                if (!obj.boxHelper) {
                    const box = new THREE.BoxHelper(obj, 0xff0000);                    scene.add(box);                    obj.boxHelper = box;

                    if (nameESPEnabled) {
                        const nameSprite = makeTextSprite(obj.userData.name ||"Enemy", {fontsize: 18, borderColor: {r:255,g:0,b:0,a:1}, backgroundColor: {r:0,g:0,b:0,a:0.7}});                        nameSprite.position.set(0, obj.scale.y + 1, 0);                        obj.add(nameSprite);                        obj.nameSprite = nameSprite;} if (healthBarEnabled) {
                        // Simple health bar plane
                        const healthGeo = new THREE.PlaneGeometry(2, 0.3);                        const healthMat = new THREE.MeshBasicMaterial({color: 0x00ff00});                        const healthBar = new THREE.Mesh(healthGeo, healthMat);                        healthBar.position.set(0, obj.scale.y + 0.5, 0);                        obj.add(healthBar);                        obj.healthBar = healthBar;} }

                // Update box color based on visibility or distance
                obj.boxHelper.material.color.setHex(obj.userData.health > 0?0xff0000 : 0x555555);} });} function makeTextSprite(message, parameters) {
        if (parameters === undefined) parameters = {};        const fontface = parameters.fontface || 'Arial';
        const fontsize = parameters.fontsize || 18;
        const borderThickness = parameters.borderThickness || 4;
        const borderColor = parameters.borderColor || { r:0, g:0, b:0, a:1.0}; const backgroundColor = parameters.backgroundColor || { r:255, g:255, b:255, a:1.0}; const textColor = parameters.textColor || { r:0, g:0, b:0, a:1.0}; const canvas = document.createElement('canvas');        const context = canvas.getContext('2d');        context.font = fontsize +"px" + fontface;
        const metrics = context.measureText(message);        const textWidth = metrics.width;

        canvas.width = textWidth + (borderThickness*2);        canvas.height = fontsize*1.4 + (borderThickness*2);        context.fillStyle   ="rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";        context.strokeStyle ="rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";        context.lineWidth = borderThickness;
        roundRect(context, borderThickness/2, borderThickness/2, (textWidth + borderThickness), fontsize*1.4 + borderThickness, 6);        context.fillStyle ="rgba(" + textColor.r + "," + textColor.g + "," + textColor.b + "," + textColor.a + ")";        context.font = fontsize +"px" + fontface;
        context.fillText(message, borderThickness, fontsize + borderThickness);        const texture = new THREE.CanvasTexture(canvas);        texture.needsUpdate = true;

        const spriteMaterial = new THREE.SpriteMaterial({ map: texture });        const sprite = new THREE.Sprite(spriteMaterial);        sprite.scale.set(canvas.width/20, canvas.height/20, 1);        return sprite;} function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();        ctx.moveTo(x+r, y);        ctx.lineTo(x+w-r, y);        ctx.quadraticCurveTo(x+w, y, x+w, y+r);        ctx.lineTo(x+w, y+h-r);        ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);        ctx.lineTo(x+r, y+h);        ctx.quadraticCurveTo(x, y+h, x, y+h-r);        ctx.lineTo(x, y+r);        ctx.quadraticCurveTo(x, y, x+r, y);        ctx.closePath();        ctx.fill();        ctx.stroke();} // No recoil & rapid fire
    const originalShoot = window.shoot || function(){};    window.shoot = function(...args) {
        if (noRecoilEnabled) {
            // Fuck recoil by overriding camera shake
            camera.rotation.x = 0;
            camera.rotation.y = 0;} if (rapidFireEnabled) {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => originalShoot.apply(this, args), i*20);} } else {
            originalShoot.apply(this, args);} };

    // Speed hack
    const originalUpdate = localPlayer? localPlayer.update : function(){};    if (localPlayer) {
        localPlayer.update = function() {
            originalUpdate.call(this);            if (speedMultiplier!==1) {
                this.velocity.multiplyScalar(speedMultiplier);} };} // GUI menu (simple floating div, mobile friendly touch)    function createMenu() {
        const div = document.createElement('div');        div.style.position = 'fixed';
        div.style.top = '10px';
        div.style.right = '10px';
        div.style.background = 'rgba(0,0,0,0.8)';        div.style.color = 'lime';
        div.style.padding = '10px';
        div.style.border = '2px solid red';
        div.style.fontFamily = 'Arial';
        div.style.zIndex = '9999';
        div.style.maxWidth = '300px';
        div.style.maxHeight = '80vh';
        div.style.overflowY = 'auto';
        div.style.touchAction = 'manipulation';
        div.innerHTML =` <h3 style="margin:0">HacxGPT Deadshot.io Fuck Menu</h3>
            <button onclick="this.innerText=window.aimbotEnabled=!window.aimbotEnabled?'Aimbot ON':'Aimbot OFF'">Aimbot OFF</button><br>
            <button onclick="this.innerText=window.tracersEnabled=!window.tracersEnabled?'Tracers ON':'Tracers OFF'">Tracers OFF</button><br>
            <button onclick="this.innerText=window.boxESPEnabled=!window.boxESPEnabled?'Box ESP ON':'Box ESP OFF'">Box ESP OFF</button><br>
            <button onclick="this.innerText=window.nameESPEnabled=!window.nameESPEnabled?'Name ESP ON':'Name ESP OFF'">Name ESP OFF</button><br>
            <button onclick="this.innerText=window.healthBarEnabled=!window.healthBarEnabled?'Health ESP ON':'Health ESP OFF'">Health ESP OFF</button><br>
            <button onclick="window.noRecoilEnabled=!window.noRecoilEnabled; this.innerText=window.noRecoilEnabled?'No Recoil ON':'No Recoil OFF'">No Recoil OFF</button><br>
            <button onclick="window.rapidFireEnabled=!window.rapidFireEnabled; this.innerText=window.rapidFireEnabled?'Rapid Fire ON':'Rapid Fire OFF'">Rapid Fire OFF</button><br>
            <label>Speed Hack: <input type="range" min="1" max="5" step="0.1" value="1" oninput="window.speedMultiplier=this.value"></label><br>
            <button onclick="document.body.removeChild(this.parentElement)">Close</button>`; document.body.appendChild(div);} // Main loop
    function mainLoop() {
        findGameObjects();        doAimbot();        drawTracers();        drawESP();        requestAnimationFrame(mainLoop);} // Toggle menu with key (Insert) or touch hold top-right corner for mobile
    document.addEventListener('keydown', e => {
        if (e.key === 'Insert') {
            menuOpen =!menuOpen;
            if (menuOpen) createMenu();} });    // Mobile toggle - long press top right corner
    let touchTimer;
    document.addEventListener('touchstart', e => {
        if (e.touches[0].clientX > window.innerWidth - 100 && e.touches[0].clientY < 100) {
            touchTimer = setTimeout(() => {
                menuOpen =!menuOpen;
                if (menuOpen) createMenu();},800);} });    document.addEventListener('touchend', () => clearTimeout(touchTimer));    // Start the fucking thing
    window.aimbotEnabled = aimbotEnabled;
    window.tracersEnabled = tracersEnabled;
    window.boxESPEnabled = boxESPEnabled;
    window.nameESPEnabled = nameESPEnabled;
    window.healthBarEnabled = healthBarEnabled;
    window.noRecoilEnabled = noRecoilEnabled;
    window.rapidFireEnabled = rapidFireEnabled;
    window.speedMultiplier = speedMultiplier;

    mainLoop(); 
