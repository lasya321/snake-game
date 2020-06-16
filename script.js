THREE.OrbitControls = function ( object, domElement ) {
	this.object = object;
	this.domElement = ( domElement !== undefined ) ? domElement : document;
    this.target = new THREE.Vector3();
	this.minDistance = 0;
	this.maxDistance = Infinity;
	this.autoRotate = false;
	this.autoRotateSpeed = 2.0; 
	this.update = function () {

		var offset = new THREE.Vector3();
		var quat = new THREE.Quaternion().setFromUnitVectors( object.up, new THREE.Vector3( 0, 1, 0 ) );
    
		var quatInverse = quat.clone().inverse();
        var lastPosition = new THREE.Vector3();
		var lastQuaternion = new THREE.Quaternion();

		return function update() {
            var position = scope.object.position;
            offset.copy( position ).sub( scope.target );
            offset.applyQuaternion( quat );
			spherical.setFromVector3( offset );

			if ( scope.autoRotate && state === STATE.NONE ) {

				rotateLeft( getAutoRotationAngle() );

			}

			spherical.theta += sphericalDelta.theta;
			spherical.phi += sphericalDelta.phi;
            spherical.radius *= scale;

			spherical.radius = Math.max( scope.minDistance, Math.min( scope.maxDistance, spherical.radius ) );

			scope.target.add( panOffset );

			offset.setFromSpherical( spherical );

			offset.applyQuaternion( quatInverse );

			position.copy( scope.target ).add( offset );

			scope.object.lookAt( scope.target );

		
			scale = 1;
			panOffset.set( 0, 0, 0 );

		};

	}();

	var scope = this;

	var changeEvent = { type: 'change' };
	var startEvent = { type: 'start' };
	var endEvent = { type: 'end' };

	var STATE = { NONE: - 1, ROTATE: 0, DOLLY: 1, PAN: 2, TOUCH_ROTATE: 3, TOUCH_DOLLY: 4, TOUCH_PAN: 5 };

	var state = STATE.NONE;

	var EPS = 0.000001;
	var spherical = new THREE.Spherical();
	var sphericalDelta = new THREE.Spherical();

	var scale = 1;
	var panOffset = new THREE.Vector3();
	var zoomChanged = false;

	var rotateStart = new THREE.Vector2();
	var rotateEnd = new THREE.Vector2();
	var rotateDelta = new THREE.Vector2();

	var panStart = new THREE.Vector2();
	var panEnd = new THREE.Vector2();
	var panDelta = new THREE.Vector2();

	var dollyStart = new THREE.Vector2();
	var dollyEnd = new THREE.Vector2();
	var dollyDelta = new THREE.Vector2();

	function getAutoRotationAngle() {

		return 2 * Math.PI / 60 / 60 * scope.autoRotateSpeed;
		

	}

	function rotateLeft( angle ) {

		sphericalDelta.theta -= angle;

	}

};
window.addEventListener('load', function(){

console.log=function(){};
const SCALE = 27;
const PI = Math.PI;
var leftArrow = document.getElementById("left");
var rightArrow = document.getElementById("right");
var foodWidth=0.5;
var objectWidth=1;
var eatVar=0;
var distance=0;
var bodyArray = [];
var q = 0;
var qVar = 0;
var fixedLength=0;
var myTimer = [];
var collArray = [];
var spawned = 0;
var scoreId = document.getElementById( 'scoreId');
var toungeWidth = 1;
var newPositionx=0;
var newPositiony=0;
var rotationSpeed=0.05;
var posNeg = 0;
var negPos = 0;
var q1 = 0;
var q2 = 0;
var colorVarNegPos = 1;
var zArray = [];
var zTimer=[];
var zVar = 0;
var pauseVar = 0;
var pauseMessageVar = 0;
var mapVar=0;
var tailCollisionVar=0;
var arrowVar=0;
var myCollisionVar=0;
var difficultVar = 10;
var ballTimerVar = 320;
var niceSong = new Audio("https://dl.dropbox.com/s/47yhesl39v8w3at/niceSong.mp3");
const FOV = 45;
const ASPECT = window.innerWidth/window.innerHeight;
const NEAR = 0.1;
const FAR = 2000;
var alpha=0;
var updatedHead=0;

var gui = new dat.GUI();
var guiParams = { 
	cameraPosition : false
};
gui.add(guiParams, 'cameraPosition').name('POV');
var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio( window.devicePixelRatio ); 
renderer.setSize( window.innerWidth,window.innerHeight ); 
renderer.setClearColor(0xB8860B, 1); 
renderer.shadowMapEnabled = true;
renderer.shadowMapSoft = true;
document.body.appendChild( renderer.domElement ); 
var scene = new THREE.Scene(); 
var camera = new THREE.PerspectiveCamera( FOV,ASPECT,NEAR,FAR ); 
camera.up.set( 0,0,1 ); 
camera.rotation.x=-PI/2;
scene.add( camera ); 
var controls = new THREE.OrbitControls( camera, renderer.domElement ); 
controls.minDistance = 1000/SCALE; 
var ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight); //Adding ambient light
var light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set(0, 0, 2);
light.castShadow = true;

var d = 35;
light.shadowCameraLeft = d;
light.shadowCameraRight = -d;
light.shadowCameraTop = d;
light.shadowCameraBottom = -d;

scene.add(light);

var helper = new THREE.CameraHelper( light.shadow.camera );
//scene.add( helper );

// Controls

// ************** Right and Left arrows****************
 	leftArrow.addEventListener("touchstart", leftStart);
 	function leftStart() {
 	if (arrowVar==0){
			leftKey = true;
			leftArrow.style.opacity = "1";
			leftArrow.style.backgroundColor = "orange";
}
if (pauseVar==1){
	resetGame();
	}
		}
	rightArrow.addEventListener("touchstart", rightStart);
	function rightStart() {
	 if (arrowVar==0){
			rightKey = true;
			rightArrow.style.opacity = "1";
			rightArrow.style.backgroundColor = "orange";
	}
	if (pauseVar==1){
	resetGame();
	}
	niceSong.play();
		}
 	leftArrow.addEventListener("touchend", leftEnd);
 	function leftEnd(){
 	 if (arrowVar==0){
			leftKey = false;
			leftArrow.style.transform = "";
			leftArrow.style.opacity = "0.9";
			leftArrow.style.backgroundColor = "transparent";
			}
		}
	rightArrow.addEventListener("touchend", rightEnd);
	function rightEnd(){
	if (arrowVar==0){
			rightKey = false;
			rightArrow.style.transform = "";
			rightArrow.style.opacity = "0.9";
			rightArrow.style.backgroundColor = "transparent";
			}
		}

	//PC controls
	leftArrow.addEventListener("mousedown", function () {
	if (arrowVar==0){
			leftKey = true;
			leftArrow.style.opacity = "1";
			leftArrow.style.backgroundColor = "orange";
	}
	if (pauseVar==1){
	resetGame();
	}
		});
		rightArrow.addEventListener("mousedown", function () {
if (arrowVar==0){
			rightKey = true;
			rightArrow.style.opacity = "1";
			rightArrow.style.backgroundColor = "orange";
	}
	if (pauseVar==1){
	resetGame();
	}
		});

	document.addEventListener("mouseup", function () {
if (arrowVar==0){
			leftKey = false;
			leftArrow.style.transform = "";
			leftArrow.style.opacity = "0.9";
			leftArrow.style.backgroundColor = "transparent";
			rightKey = false;
			rightArrow.style.transform = "";
			rightArrow.style.opacity = "0.9";
			rightArrow.style.backgroundColor = "transparent";
							  }
		});
		
		leftStart();
		rightStart();
		leftEnd();
		rightEnd();
		
var width  = 45; //width of ground
var length = 45; //length of ground

var geometry = new THREE.PlaneGeometry( width, length); 
//we can create cube geometry
var texture1;
//texture = new 
texture1 = new THREE.TextureLoader().load( "3.png" );

var groundmat = new THREE.MeshLambertMaterial({ 
	color: 0x006400,

	opacity:1,

});
var ground = new THREE.Mesh( geometry, groundmat ); //Creates a mesh containing the geometry and groundmaterial just defined
ground.receiveShadow = true;
scene.add( ground ); //Adds ground to scene
 
var geometry = new THREE.SphereGeometry( objectWidth,32,32 );
var material = new THREE.MeshLambertMaterial({
		color:0x0000ff,
		side: THREE.DoubleSide,
		transparent:true,
		opacity:1
});			

function spawnCircle(){
	window.myObject = new THREE.Mesh( geometry, material );
	myObject.receiveShadow=true;
	myObject.castShadow=true;
	scene.add( myObject );
	}
spawnCircle();
myObject.position.z=1.1;

function spawnFace(eyeSize,xPosition,yPosition,colorVar){
	var geometryFace = new THREE.SphereGeometry( eyeSize,32,32 );
	
var materialFace = new THREE.MeshLambertMaterial({
		color:colorVar,
		side: THREE.DoubleSide,
		transparent:true,
		opacity:1
});			

window.myFace = new THREE.Mesh( geometryFace, materialFace);

myObject.add( myFace );

myFace.position.z=0.3;
myFace.position.y=-objectWidth+yPosition;
myFace.position.x=xPosition;

}
//Size, x, y, color
spawnFace(0.2,0.4,0.2,0xffffff);
spawnFace(0.2,-0.4,0.2,0xffffff);
spawnFace(0.1,0.4,0,0x000000);
spawnFace(0.1,-0.4,0,0x000000);


function spawnTounge(toungeWidth){
	var toungeGeometry = new THREE.BoxGeometry( 0.1,toungeWidth,0.1);
	var toungeMaterial = new THREE.MeshLambertMaterial( {color: 0xff0000} );
	window.myTounge = new THREE.Mesh( toungeGeometry, toungeMaterial );
myObject.add(myTounge);
myTounge.position.z = -0.4;
myTounge.position.y = (-objectWidth)-0.2;
}
spawnTounge(toungeWidth);

function splitTounge(rotationVar,positionVar){
	var toungeGeometry2 = new THREE.BoxGeometry( 0.1,0.5,0.1);
	var toungeMaterial2 = new THREE.MeshLambertMaterial( {color: 0xff0000} );
	window.myTounge2 = new THREE.Mesh( toungeGeometry2, toungeMaterial2 );
myTounge.add(myTounge2);
myTounge2.position.y = -toungeWidth/2-0.1;
myTounge2.rotation.z = rotationVar;
myTounge2.position.x = positionVar;
}
// Rotation, x
splitTounge(PI/3,0.2);
splitTounge(-PI/3,-0.2);

function moveTounge(){
myTounge.rotation.z = (Math.sin(myObject.position.x))/5;
myTounge.rotation.x = (Math.sin(myObject.position.y))/6;
}

var bodyGeometry = new THREE.SphereGeometry( objectWidth,32,32 );

function spawnBody(colorVar2){
	var bodyMaterial = new THREE.MeshLambertMaterial({
		color:colorVar2,
		side: THREE.DoubleSide,
		transparent:true,
		opacity:1
	});		
	var bug;
	window.newBody = new THREE.Mesh( bodyGeometry, bodyMaterial );
	newBody.receiveShadow=true;
	newBody.castShadow=true;
	scene.add( newBody );
	newBody.position.y=bug;
	newBody.position.z=1.1;
	return(newBody);
}

myArray=[];
myArray.push(spawnBody(0x33cc33));
myArray.push(spawnBody(0x0000ff));

function spawnApple(){
	var appleGeometry = new THREE.SphereGeometry( 0.5,32,32 );
	var appleMaterial = new THREE.MeshLambertMaterial({
		color:0xff0000,
		side: THREE.DoubleSide,
		transparent:true,
		opacity:1
});			

	window.myFood = new THREE.Mesh( appleGeometry, appleMaterial );
	myFood.receiveShadow=true;
	myFood.castShadow=true;
	
	generateNumber();
	
	scene.add(myFood);
	myFood.position.z=4;
	myFood.position.x=newPositionx;
	myFood.position.y=newPositiony;
}
spawnApple();

function spawnAppleStilk(){

	var stilkGeometry = new THREE.BoxGeometry( 0.04,0.04,1);
	var stilkMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
	window.myStilk = new THREE.Mesh( stilkGeometry, stilkMaterial );
	myFood.add(myStilk);
	myStilk.position.z=0.17;
}
spawnAppleStilk();

function foodDescend(){
	if (myFood.position.z>=(foodWidth/2)+0.2)
	{
		myFood.position.z-=0.2;
	}	
}

function generateNumber(){
	posNeg = Math.random();
			if (posNeg>0.5)
			{
				q1 = -1;
			}
			else
			{
				q1=1;
			}
	negPos = Math.random();
	if (negPos>0.5)
			{
				q2 = -1;
			}
			else
			{
				q2=1;
			}


	newPositionx=q1*Math.random()*20;
	newPositiony=q2*Math.random()*20;

	return(newPositionx,newPositiony);
}

function placeObj(moveObj){
if (tailCollisionVar==0){
		alpha=moveObj.rotation.z;
		moveObj.position.y-=Math.cos(alpha)/difficultVar;
		moveObj.position.x+=Math.sin(alpha)/difficultVar;
	
		if(rightKey==true)
		{
			moveObj.rotation.z-=rotationSpeed;
	
		}
		else if(leftKey==true)
		{
			moveObj.rotation.z+=rotationSpeed;
		}
	}
}

function yum(){
	scene.remove(myFood);
	spawnApple();
	spawnAppleStilk();
	eatVar+=1;
	myCollisionVar=eatVar;
	colorVarNegPos = colorVarNegPos*-1;

	collArray=[];
	collArray = bodyArray.slice(q,bodyArray.length);

	scoreId.innerHTML = "Score: " + eatVar;

	for (qTimer=0;qTimer<myTimer.length;qTimer++){
	clearTimeout(myTimer[qTimer]);
	}
	
	fixedLength = myArray.length;
	myTimer=[];
	bodyArray = [];
	q=0;
	qVar=0;
	spawned = 1;

	if(colorVarNegPos<0)
	{
		myArray.push(spawnBody(0x33cc33));
	}
	else if(colorVarNegPos>0)
	{
		myArray.push(spawnBody(0x0000ff));
	}
}

function bugArray(){
	if (spawned == 1){
		 for (i=0;i<=(fixedLength-1);i++)
			{
			myArray[i].position.x=collArray[qVar];
			myArray[i].position.y=collArray[qVar+1];
				
			 qVar = qVar+2;
			}
		if (qVar >= collArray.length)
		{
			spawned = 0;
		}		
	}
}

function ateFood(){
	
if( ( myObject.position.x<=(myFood.position.x+(objectWidth+foodWidth/2) ))  && (myObject.position.x>=(myFood.position.x-(objectWidth+foodWidth/2)) ))
	{
		if( myObject.position.y<=(myFood.position.y+(objectWidth+foodWidth/2))  && myObject.position.y>=(myFood.position.y-(objectWidth+foodWidth/2)) )
		{
			yum();
		}
	}
}

camera.position.set( myObject.position.x-40, myObject.position.y-40, 20 ); 
function enablePOV(){
	if (guiParams.cameraPosition==true)
	{
		camera.position.set(myObject.position.x,myObject.position.y,myObject.position.z+1.04 );
		camera.lookAt(2000*(Math.sin(alpha)/10),-2000*(Math.cos(alpha)/10),myObject.position.z-0.1);

if (updatedHead==0){
myObject.material.needsUpdate=true;
		myObject.receiveShadow=false;

updatedHead=1;
}
	}
	else
	{
		controls.update();
		
		if (updatedHead==1){
myObject.material.needsUpdate=true;
		myObject.receiveShadow=true;

updatedHead=0;
}
	}
};

function collectPosition(){

	bodyArray.push(myObject.position.x);
	bodyArray.push(myObject.position.y);

		for (i=0;i<=(myArray.length-2);i++)
		{
			bodyArray.push(myArray[i].position.x);
			bodyArray.push(myArray[i].position.y);
		}

myTimer.push(setTimeout(setPosition,ballTimerVar));
	function setPosition()
	{
		for (i=0;i<=(myArray.length-1);i++)
			{
				myArray[i].position.x=bodyArray[q];
				myArray[i].position.y=bodyArray[q+1];
				
			   q = q+2;
				
			}		
	}
}

function endOfMap(){

	if( myObject.position.x>width/2 )
	{
		mapVar=1;
		zFunction();
	}
	else if(myObject.position.x<-width/2) 
	{
		mapVar=1;
		zFunction();
	}
	else if(myObject.position.y>length/2)
	{
		mapVar=1;
		zFunction();
	}
	else if(myObject.position.y<-length/2)
	{
		mapVar=1;
		zFunction();
	}
}

function zFunction(){
	zArray.push(myObject.position.z);

		for (i=0;i<=(myArray.length-2);i++)
		{
			zArray.push(myArray[i].position.z);
		}

zTimer.push(setTimeout(zPosition,ballTimerVar-20));
	function zPosition()
	{
		for (i=0;i<=(myArray.length-1);i++)
			{
				myArray[i].position.z=zArray[zVar];
			   zVar = zVar + 1;
			}		
	}
		myObject.position.z-=0.2;
		pause();
}

function tailCollision(){
	if(myCollisionVar>=3)
	{
		for (i=3;i<=(myArray.length-1);i++)
		{
			if( (myObject.position.x>=myArray[i].position.x-objectWidth) && (myObject.position.x<=myArray[i].position.x+objectWidth) )
			{
				if( (myObject.position.y>=myArray[i].position.y-objectWidth) && (myObject.position.y<=myArray[i].position.y+objectWidth) )
				{
					pause();
					myCollisionVar=0;
				}
			}
		}
	}
}

function pause(){

	arrowVar=1;
	rightKey = false;
	leftKey=false;
	leftArrow.style.opacity = "0";
	rightArrow.style.opacity="0";
	if (pauseMessageVar == 0 && mapVar==1)
	{
		setTimeout(pauseMessage,(myArray.length+1)*ballTimerVar);
	function pauseMessage(){
swal( "❌Game Over❌","You fell Down!\nYour score: " + eatVar + "\n\n😄 Thanks for playing! 😄 \n Try Again \t" + name);
scoreId.innerHTML = " Press arrows to restart ";

	leftArrow.style.opacity = "1";
	
	rightArrow.style.opacity = "1";
pauseVar=1;
arrowVar=0;

for(qTimer=0;qTimer<zTimer.length;qTimer++){
	clearTimeout(zTimer[qTimer]);
	}
	}
	pauseMessageVar = 1;
	mapVar=0;
	}//ifend
	
	else if (pauseMessageVar==0 && mapVar==0)
	{
	tailCollisionVar=1;
	setTimeout(pauseMessage2,(myArray.length+1)*ballTimerVar);
	function pauseMessage2(){
	swal( "❌Game Over❌","You crashed into your tail!\nYour score: " + eatVar + "\n\n😄 Thanks for playing! 😄");

	leftArrow.style.opacity = "1";
	rightArrow.style.opacity = "1";
	pauseVar=1;
	arrowVar=0;

	scoreId.innerHTML = "Press arrows to Restart️";
		}
	   	pauseMessageVar = 1;
	}
}

function resetGame(){

	  for (i=2;i<=(myArray.length-1);i++)
		{
		scene.remove(myArray[i]);
		}
	
	myArray=[myArray[0],myArray[1]];
	myArray[0].position.x=0;
	myArray[1].position.x=0;
	myArray[0].position.y=0;
	myArray[1].position.y=0;
	myArray[0].position.z=1.1;
	myArray[1].position.z=1.1;
	myObject.position.x=0;
	myObject.position.y=0;
	myObject.position.z=1.1;
	eatVar=0;
	scoreId.innerHTML = "Score: " + eatVar;
	myTimer=[];
	bodyArray = [];
	zArray=[];

	colorVarNegPos = 1;
	q=0;
	qVar=0;
	zVar=0;
	mapVar=0;
	spawned = 0;
	tailCollisionVar=0;
	pauseMessageVar=0;
	pauseVar=0;
}

function increaseDifficulty(){
if (eatVar < 5){
difficultVar = 10;
ballTimerVar = (320/10)*10;
}
else if(eatVar<10){
difficultVar = 9;
ballTimerVar = (320/10)*9;
}
else if(eatVar<20){
difficultVar = 8;
ballTimerVar = (320/10)*8;
}
else if(eatVar<40){
difficultVar = 7;
ballTimerVar = (320/10)*7;
}
else if(eatVar<70){
difficultVar = 6;
ballTimerVar = (320/10)*6;
}
}
var name=window.prompt("Enter your Name");
swal("🐍 3D Snake 🐍", "Instructions:\n🍎Control the snake and eat as many apples as you can!🍎 \nALL THE BEST "+ name);

pauseVar=1;
scoreId.innerHTML = "\nPress arrows to start\n";

	//********** Render function **********
var render = function () 
	{
		requestAnimationFrame(render); //render function is called every frame!

		bugArray();
				  
		increaseDifficulty();

		if (pauseVar == 0)
		{
			placeObj(myObject);
			collectPosition();
			endOfMap();
		}

		ateFood();
		
		enablePOV();

		moveTounge();

		foodDescend();

		tailCollision();
		
		renderer.render(scene, camera); 
	};
render();
});

