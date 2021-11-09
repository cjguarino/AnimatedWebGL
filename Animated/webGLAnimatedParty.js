/* Title: webGLAnimatedParty
 * Section: JS file
 * Developer: CJ Guarino
 * Date: 04/03/2020
 * Version: 1.1
 */
 
"use strict";

var canvas;
var gl;
var program;

var projectionMatrix;
var modelViewMatrix;
var instanceMatrix;
var modelViewMatrixLoc;

var vertices = [
    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5,  0.5,  0.5, 1.0 ),
    vec4(  0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5,  0.5, -0.5, 1.0 ),
    vec4(  0.5, -0.5, -0.5, 1.0 )
];

var lightPosition = vec4(-1.0, -0.1, 3.0, 0.0 );
var lightAmbient = vec4(0.9, 0.9, 0.9, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 0.0, 1.0 );

//Ruby
var materialAmbient = vec4( 0.025, 0.025, 0.025, 1.0 );
var materialDiffuse = vec4( 0.35164, 0.30648, 0.12648, 1.0);
var materialSpecular = vec4( 0.628281, 0.555802, 0.366065, 1.0 );
var materialShininess = .3;

//Variables for Human
var torsoId = 0;
var headId  = 1;
var head1Id = 1;
var head2Id = 10;
var leftUpperArmId = 2;
var leftLowerArmId = 3;
var rightUpperArmId = 4;
var rightLowerArmId = 5;
var leftUpperLegId = 6;
var leftLowerLegId = 7;
var rightUpperLegId = 8;
var rightLowerLegId = 9;

//Variables for baby
var torsoId2 = 11;
var headId2  = 12;
var head1Id2 = 12;
var head2Id2 = 21;
var leftUpperArmId2 = 13;
var leftLowerArmId2 = 14;
var rightUpperArmId2 = 15;
var rightLowerArmId2 = 16;
var leftUpperLegId2 = 17;
var leftLowerLegId2 = 18;
var rightUpperLegId2 = 19;
var rightLowerLegId2 = 20;

//Variables for Dog
var torsoId3 = 22;
var headId3  = 23;
var head1Id3 = 23;
var head2Id3 = 32;
var leftUpperArmId3 = 24;
var leftLowerArmId3 = 25;
var rightUpperArmId3 = 26;
var rightLowerArmId3 = 27;
var leftUpperLegId3 = 28;
var leftLowerLegId3 = 29;
var rightUpperLegId3 = 30;
var rightLowerLegId3 = 31;

//Variables for ground
var torsoId4 = 33;
var headId4  = 34;
var head1Id4 = 34;
var head2Id4 = 43;
var leftUpperArmId4 = 35;
var leftLowerArmId4 = 36;
var rightUpperArmId4 = 37;
var rightLowerArmId4 = 38;
var leftUpperLegId4 = 39;
var leftLowerLegId4 = 40;
var rightUpperLegId4 = 41;
var rightLowerLegId4 = 42;

var torsoHeight = 5.0;
var torsoWidth  = 2.0;
var upperArmHeight = 2.0;
var lowerArmHeight = 2.0;
var upperArmWidth  = 0.7;
var lowerArmWidth  = 0.5;
var upperLegWidth  = 0.7;
var lowerLegWidth  = 0.5;
var lowerLegHeight = 2.0;
var upperLegHeight = 3.0;
var headHeight = 1.5;
var headWidth  = 1.0;

//Dimension Variables for Dog
var torsoHeight2 = 3.0;
var torsoWidth2  = 4.0;
var upperArmHeight2 = 3.0;
var lowerArmHeight2 = 2.0;
var upperArmWidth2  = 0.63;
var lowerArmWidth2  = 0.5;
var upperLegWidth2  = 0.63;
var lowerLegWidth2  = 0.5;
var lowerLegHeight2 = 2.0;
var upperLegHeight2 = 3.0;
var headHeight2 = 1.5;
var headWidth2  = 1.0;

var numNodes = 11;
var numNodes2 = 22;
var numNodes3 = 33;
var numNodes4 = 44;

var theta = [30, 170, 180, 0, 180, 0, 180, 0, 180, 0, 0];
var theta2 = [0,0,0,0,0,0,0,0,0,0,0, 30, 170, 180, 0, 180, 0, 180, 0, 180, 0, 0];
var theta3 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 30, 170, 180, 0, 180, 0, 180, 0, 180, 0, 0];
var theta4 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, 30, 170, 180, 0, 180, 0, 180, 0, 180, 0, 0];

var stack = [];
var figure = [];

var stack2 = [];
var figure2 = [];

var stack3 = [];
var figure3 = [];

var stack4 = [];
var figure4 = [];

for( var i=0; i<numNodes; i++) figure[i] = createNode(null, null, null, null);

var vBuffer, nBuffer;

var pointsArray = [];
var colorsArray = [];
var normalsArray = [];
var groundArray = [];

var flag1 = true;
var flag2 = true;
var flag3 = false;
var flag4 = false;
var flag5 = false;
var flag6 = false;
var flag7 = false;
var flag8 = false;
var flag9 = false;
var flag10 = false;
var flag11 = false;
var flag12 = false;
var flag13 = false;
var flag14 = false;
var flag15 = false;
var flag16 = false;
var flag17 = false;
var flag18 = false;
var flag19 = false;
var flag20 = false;
var flag21 = false;
var flag22 = false;
var flag23 = true;
var flag24 = false;
var flag25 = false;
var flag26 = false;
var flag27 = false;
var flag28 = false;
var flag29 = false;
var flag30 = false;
var flag31 = false;

var runInc = 0.1;
var jumpInc = 0.1;

var runInc2 = 0.1;
var jumpInc2 = 0.1;

var runInc3 = 0.1;
var jumpInc3 = 0.1;

var runInc4 = 0.1;
var jumpInc4 = 0.1;

var legDance = 0.0;

var songs = [new Audio('September.mp3'), new Audio('Disco Inferno.mp3'), new Audio('Good Vibrations.mp3')];

var music = songs[0];

//End Varibles, Start init()

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.7, 1.0, 1.0, 1.0 );

	gl.enable(gl.DEPTH_TEST);
    
    program = initShaders( gl, "vertex-shader", "fragment-shader");

    gl.useProgram( program);

    instanceMatrix = mat4();

    projectionMatrix = ortho(-20.0,20.0,-20.0, 10.0,-10.0,10.0);
    modelViewMatrix = mat4();
    
    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( gl.getUniformLocation( program, "projectionMatrix"), false, flatten(projectionMatrix) );

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    
    cube();

	nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW );

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal );
	
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

	theta3[torsoId3] = -30;
    
	document.getElementById("slider0").onchange = function(event) {
        theta[torsoId] = event.target.value;
        initNodes(torsoId);
    };
    document.getElementById("slider1").onchange = function(event) {
        theta2[torsoId2] = event.target.value;
        initNodes2(torsoId2);
    };
    document.getElementById("slider2").onchange = function(event) {
        theta3[torsoId3] = event.target.value;
        initNodes3(torsoId3);
    };
	
	document.getElementById("Button1").onclick = function(){
        if (theta[leftUpperLegId] != 180){
            theta[leftUpperLegId] = 180;
            initNodes(leftUpperLegId);
            legDance = 0;
            initNodes(torsoId);
    }
        if (flag5 == true){
            flag5 = false;
        }
        flag6 = !flag6;
	};
	
	document.getElementById("Button2").onclick = function(){
        if (flag6 == true){
            flag6 = false;
        }
        flag5 = !flag5;
	};
	
	document.getElementById("Button3").onclick = function(){
        flag7 = !flag7;
	};
	
	document.getElementById("Button4").onclick = function(){
	    reset();
        location.reload();
	};
    
    document.getElementById("Button5").onclick = function(){
        flag5 = false;
        flag6 = false;
        flag18 = false;
        flag19 = false;
        flag24 = false;
        flag25 = false;
	    flag9 = !flag9;
        music.pause();
	};
    
     document.getElementById("Button6").onclick = function(){
        changeSong();
	};
    
    document.getElementById("Button7").onclick = function(){
        if (flag19 == true){
            flag19 = false;
        }
	    flag18 = !flag18;
	};
    
    document.getElementById("Button8").onclick = function(){
        if (flag18 == true){
            flag18 = false;
        }
	    flag19 = !flag19;
	};
    
    document.getElementById("Button9").onclick = function(){
	    flag20 = !flag20;
	};
    
    document.getElementById("Button10").onclick = function(){
        if (flag25 == true){
            flag25 = false;
        }
	    flag24 = !flag24;
	};
    
    document.getElementById("Button11").onclick = function(){
        if (flag24 == true){
            flag24 = false;
        }
	    flag25 = !flag25;
	};
    
    document.getElementById("Button12").onclick = function(){
	    flag26 = !flag26;
	}; 

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),flatten(lightPosition));
    gl.uniform1f(gl.getUniformLocation(program, "shininess"),materialShininess);	
	
    for(i=0; i<numNodes; i++) initNodes(i);
    for(i=11; i<numNodes2; i++) initNodes2(i);
    for(i=22; i<numNodes3; i++) initNodes3(i);
    for(i=33; i<numNodes4; i++) initNodes4(i);

	render();
}

//End Init(), Start Button Functions

//Buttons for Human

function walkForward1() {
    theta[leftLowerLegId] = 30;
    theta[rightLowerLegId] = 30;
    initNodes(leftLowerLegId);
    initNodes(rightLowerLegId);
    runInc = runInc + 0.05;
    initNodes(torsoId);
    
    if (flag1 == true && theta[leftUpperLegId] < 220 && theta[rightUpperLegId] > 140) {
        theta[leftUpperLegId] = theta[leftUpperLegId] + 3; 
        theta[rightUpperLegId] = theta[rightUpperLegId] - 3; 
        initNodes(leftUpperLegId);
        initNodes(rightUpperLegId);
    } else {
        flag1 = false;
    }
    if (flag1 == false && theta[leftUpperLegId] > 140 && theta[rightUpperLegId] < 220) {
        theta[leftUpperLegId] = theta[leftUpperLegId] - 3;
        theta[rightUpperLegId] = theta[rightUpperLegId] + 3; 
        initNodes(leftUpperLegId);
        initNodes(rightUpperLegId);
    }
    else {
        flag1 = true;
    }
}

function walkBackward1() {
    theta[leftLowerLegId] = 30;
    theta[rightLowerLegId] = 30;
    initNodes(leftLowerLegId);
    initNodes(rightLowerLegId);
    runInc = runInc - 0.05;
    initNodes(torsoId);
    
    if (flag1 == true && theta[leftUpperLegId] < 220 && theta[rightUpperLegId] > 140) {
        theta[leftUpperLegId] = theta[leftUpperLegId] + 3; 
        theta[rightUpperLegId] = theta[rightUpperLegId] - 3; 
        initNodes(leftUpperLegId);
        initNodes(rightUpperLegId);
    } else {
        flag1 = false;
    }
    if (flag1 == false && theta[leftUpperLegId] > 140 && theta[rightUpperLegId] < 220) {
        theta[leftUpperLegId] = theta[leftUpperLegId] - 3;
        theta[rightUpperLegId] = theta[rightUpperLegId] + 3; 
        initNodes(leftUpperLegId);
        initNodes(rightUpperLegId);
    }
    else {
        flag1 = true;
    }
}

function jump1() {
    
        if(flag12 == true && jumpInc < 4){
            jumpInc = jumpInc +0.2;
            initNodes(torsoId);
        }
        else {
            flag12 = false;
        }
        if (flag12 == false && jumpInc > 0){
            jumpInc = jumpInc -0.2;
            initNodes(torsoId);
        }
        else {
            flag12 = true;
        }
}

//Buttons for Baby

function walkForward2() {
    theta2[leftLowerLegId2] = 30;
    theta2[rightLowerLegId2] = 30;
    initNodes2(leftLowerLegId2);
    initNodes2(rightLowerLegId2);
    runInc2 = runInc2 + 0.05;
    initNodes2(torsoId2);
    
    if (flag15 == true && theta2[leftUpperLegId2] < 220 && theta2[rightUpperLegId2] > 140) {
        theta2[leftUpperLegId2] = theta2[leftUpperLegId2] + 3; 
        theta2[rightUpperLegId2] = theta2[rightUpperLegId2] - 3; 
        initNodes2(leftUpperLegId2);
        initNodes2(rightUpperLegId2);
    } else {
        flag15 = false;
    }
    if (flag15 == false && theta2[leftUpperLegId2] > 140 && theta2[rightUpperLegId2] < 220) {
        theta2[leftUpperLegId2] = theta2[leftUpperLegId2] - 3;
        theta2[rightUpperLegId2] = theta2[rightUpperLegId2] + 3; 
        initNodes2(leftUpperLegId2);
        initNodes2(rightUpperLegId2);
    }
    else {
        flag15 = true;
    } 
}

function walkBackward2() {
    theta2[leftLowerLegId2] = 30;
    theta2[rightLowerLegId2] = 30;
    initNodes2(leftLowerLegId2);
    initNodes2(rightLowerLegId2);
    runInc2 = runInc2 - 0.05;
    initNodes2(torsoId2);
    
    if (flag16 == true && theta2[leftUpperLegId2] < 220 && theta2[rightUpperLegId2] > 140) {
        theta2[leftUpperLegId2] = theta2[leftUpperLegId2] + 3; 
        theta2[rightUpperLegId2] = theta2[rightUpperLegId2] - 3; 
        initNodes2(leftUpperLegId2);
        initNodes2(rightUpperLegId2);
    } else {
        flag16 = false;
    }
    if (flag16 == false && theta2[leftUpperLegId2] > 140 && theta2[rightUpperLegId2] < 220) {
        theta2[leftUpperLegId2] = theta2[leftUpperLegId2] - 3;
        theta2[rightUpperLegId2] = theta2[rightUpperLegId2] + 3; 
        initNodes2(leftUpperLegId2);
        initNodes2(rightUpperLegId2);
    }
    else {
        flag16 = true;
    }
}

function jump2() {
    
        if(flag17 == true && jumpInc2 < 4){
            jumpInc2 = jumpInc2 +0.2;
            initNodes2(torsoId2);
        }
        else {
            flag17 = false;
        }
        if (flag17 == false && jumpInc2 > 0){
            jumpInc2 = jumpInc2 -0.2;
            initNodes2(torsoId2);
        }
        else {
            flag17 = true;
        }
}

//Buttons for Dog

function walkForward3() {
    if (flag31 == true){
        flag31 = false;
        theta3[rightUpperArmId3] = 180;
        theta3[leftUpperArmId3] = 180;
        initNodes3(rightUpperArmId3);
        initNodes3(leftUpperArmId3);
    }
    theta3[leftLowerLegId3] = 30;
    theta3[rightLowerLegId3] = 30;
    theta3[leftLowerArmId3] = 30;
    theta3[rightLowerArmId3] = 30;
    initNodes3(leftLowerArmId3);
    initNodes3(rightLowerArmId3);
    initNodes3(leftLowerLegId3);
    initNodes3(rightLowerLegId3);
    runInc3 = runInc3 - 0.05;
    initNodes3(torsoId3);
    
    if (flag23 == true && theta3[leftUpperLegId3] < 220 && theta3[rightUpperLegId3] > 140 && theta3[leftUpperArmId3] > 160 && theta3[rightUpperArmId3] < 200) {
        theta3[leftUpperLegId3] = theta3[leftUpperLegId3] + 3; 
        theta3[rightUpperLegId3] = theta3[rightUpperLegId3] - 3;
        theta3[leftUpperArmId3] = theta3[leftUpperArmId3] - 3;
        theta3[rightUpperArmId3] = theta3[rightUpperArmId3] + 3; 
        initNodes3(leftUpperLegId3);
        initNodes3(rightUpperLegId3);
        initNodes3(leftUpperArmId3);
        initNodes3(rightUpperArmId3);
    } else {
        flag23 = false;
    }
    if (flag23 == false && theta3[leftUpperLegId3] > 140 && theta3[rightUpperLegId3] < 220  && theta3[leftUpperArmId3] < 190 && theta3[rightUpperArmId3] > 170) {
        theta3[leftUpperLegId3] = theta3[leftUpperLegId3] - 3;
        theta3[rightUpperLegId3] = theta3[rightUpperLegId3] + 3; 
        theta3[leftUpperArmId3] = theta3[leftUpperArmId3] + 3;
        theta3[rightUpperArmId3] = theta3[rightUpperArmId3] - 3; 
        initNodes3(leftUpperLegId3);
        initNodes3(rightUpperLegId3);
        initNodes3(leftUpperArmId3);
        initNodes3(rightUpperArmId3);
    }
    else {
        flag23 = true;
    } 
}

function walkBackward3() {
     if (flag31 == true){
        flag31 = false;
        theta3[rightUpperArmId3] = 180;
        theta3[leftUpperArmId3] = 180;
        initNodes3(rightUpperArmId3);
        initNodes3(leftUpperArmId3);
    }
    theta3[leftLowerLegId3] = 30;
    theta3[rightLowerLegId3] = 30;
    theta3[leftLowerArmId3] = 30;
    theta3[rightLowerArmId3] = 30;
    initNodes3(leftLowerLegId3);
    initNodes3(rightLowerLegId3);
    initNodes3(leftLowerArmId3);
    initNodes3(rightLowerArmId3);
    runInc3 = runInc3 + 0.05;
    initNodes3(torsoId3);
    
      if (flag23 == true && theta3[leftUpperLegId3] < 220 && theta3[rightUpperLegId3] > 140 && theta3[leftUpperArmId3] > 160 && theta3[rightUpperArmId3] < 200) {
        theta3[leftUpperLegId3] = theta3[leftUpperLegId3] + 3; 
        theta3[rightUpperLegId3] = theta3[rightUpperLegId3] - 3;
        theta3[leftUpperArmId3] = theta3[leftUpperArmId3] - 3;
        theta3[rightUpperArmId3] = theta3[rightUpperArmId3] + 3; 
        initNodes3(leftUpperLegId3);
        initNodes3(rightUpperLegId3);
        initNodes3(leftUpperArmId3);
        initNodes3(rightUpperArmId3);
    } else {
        flag23 = false;
    }
    if (flag23 == false && theta3[leftUpperLegId3] > 140 && theta3[rightUpperLegId3] < 220  && theta3[leftUpperArmId3] < 190 && theta3[rightUpperArmId3] > 170) {
        theta3[leftUpperLegId3] = theta3[leftUpperLegId3] - 3;
        theta3[rightUpperLegId3] = theta3[rightUpperLegId3] + 3; 
        theta3[leftUpperArmId3] = theta3[leftUpperArmId3] + 3;
        theta3[rightUpperArmId3] = theta3[rightUpperArmId3] - 3; 
        initNodes3(leftUpperLegId3);
        initNodes3(rightUpperLegId3);
        initNodes3(leftUpperArmId3);
        initNodes3(rightUpperArmId3);
    }
    else {
        flag23 = true;
    }   
}

function jump3() {
    
        if(flag27 == true && jumpInc3 < 4){
            jumpInc3 = jumpInc3 +0.2;
            initNodes3(torsoId3);
        }
        else {
            flag27 = false;
        }
        if (flag27 == false && jumpInc3 > 0){
            jumpInc3 = jumpInc3 -0.2;
            initNodes3(torsoId3);
        }
        else {
            flag27 = true;
        }
}

function dance(){
    music.play();
    
    //Human Dance
    if (flag13 == false && theta[rightUpperArmId] < 320){ //Arm not raised
        theta[rightUpperArmId] = theta[rightUpperArmId] + 0.3;
        initNodes(rightUpperArmId);
    }
    else {
        flag13 = true;
    }//Arm Raised
    
    if (flag21 == false && theta[leftUpperLegId] < 230 && theta[leftLowerLegId] > -50) {
        flag22 = true;
        legDance = legDance - 0.1;
        theta[leftUpperLegId] = theta[leftUpperLegId] + 5;
        theta[leftLowerLegId] = theta[leftLowerLegId] - 5;
        initNodes(leftUpperLegId);
        initNodes(leftLowerLegId);
        initNodes(torsoId);
    }
    else {
        flag21 = true;
    }
        
    if (flag13 == true && flag21 == true){ //Arm and leg done
        if (flag14 == false && theta[rightLowerArmId] < 60 && theta[headId] < 230){
            theta[rightLowerArmId] = theta[rightLowerArmId] + 4;
            theta[headId] = theta[headId] + 4;
            initNodes(rightLowerArmId);
            initNodes(headId);
        } else {
            flag14 = true;
        }
        if (flag14 == true && theta[rightLowerArmId] > 0 && theta[headId] > 170){
            theta[rightLowerArmId] = theta[rightLowerArmId] - 4;
            theta[headId] = theta[headId] - 4;
            initNodes(rightLowerArmId);
            initNodes(headId);
        } else {
            flag14 = false;
        }  
    }
    
    //Baby Dance
    theta2[rightLowerLegId2] = 0;
    theta2[rightUpperLegId2] = 180;
    theta2[leftUpperLegId2] = 180;
    initNodes2(rightLowerLegId2);
    initNodes2(rightUpperLegId2);
    initNodes2(leftUpperLegId2);
    theta2[torsoId2] = theta2[torsoId2] - 1;
    initNodes2(torsoId2);
    
        if (flag10 == false && theta2[leftUpperArmId2] < 220 & theta2[rightUpperArmId2] < 220 && theta2[leftLowerLegId2] < 80 ){
            theta2[leftUpperArmId2] = theta2[leftUpperArmId2] + 5; 
            theta2[rightUpperArmId2] = theta2[rightUpperArmId2] + 5;
            theta2[leftLowerLegId2] = theta2[leftLowerLegId2] + 5;
            initNodes2(leftUpperArmId2);
            initNodes2(rightUpperArmId2);
            initNodes2(leftLowerLegId2);
        }
        else {
            flag10 = true;
        }
    
        if (flag10 == true && theta2[leftUpperArmId2] > 140 && theta2[rightUpperArmId2] > 140 && theta2[leftLowerLegId2] > -20){
            theta2[leftUpperArmId2] = theta2[leftUpperArmId2] - 5; 
            theta2[rightUpperArmId2] = theta2[rightUpperArmId2] - 5; 
            theta2[leftLowerLegId2] = theta2[leftLowerLegId2] - 5;
            initNodes2(leftUpperArmId2);
            initNodes2(rightUpperArmId2);
            initNodes2(leftLowerLegId2);
        }
        else {
            flag10 = false;
        } 
        
        //Dog Dance
        theta3[rightUpperArmId3] = 150;
        theta3[leftUpperArmId3] = 150;
        initNodes3(rightUpperArmId3);
        initNodes3(leftUpperArmId3);
        initNodes3(rightUpperLegId3);
        initNodes3(leftUpperLegId3);
        flag31 = true;

        if (flag30 == false && theta3[torsoId3] < 10){
            theta3[torsoId3] = theta3[torsoId3] + 1.5;
            initNodes3(torsoId3);
        }else{
            flag30 = true;
        }
        
        if (flag30 == true && theta3[torsoId3] > -10){
            theta3[torsoId3] = theta3[torsoId3] - 1.5;
            initNodes3(torsoId3);
        }else {
            flag30 = false;
        }
    
        if(flag28 == true && jumpInc3 < 2){
            jumpInc3 = jumpInc3 +0.2;
            initNodes3(torsoId3);
        }
        else {
            flag28 = false;
        }
        if (flag28 == false && jumpInc3 > 0){
            jumpInc3 = jumpInc3 -0.2;
            initNodes3(torsoId3);
        }
        else {
            flag28 = true;
        }
}

function changeSong(){
    if (music == songs[0]){
        music.pause();
        music = songs[1];
    }
    else if (music == songs[1]){
        music.pause();
        music = songs[2];
    }
    else{
        music.pause();
        music = songs[0];
    }
}

function reset() {
   music.pause();
   flag5 = false;
   flag6 = false;
   flag7 = false;
   flag9 = false;
   flag13 = false;
    
   theta[leftUpperLegId] = 180;
   theta[rightUpperLegId] = 180;
   theta[leftLowerLegId] = 0;
   theta[rightLowerLegId] = 0;
   theta[leftUpperArmId] = 180;
   theta[rightUpperArmId] =180;
   theta[leftLowerArmId] = 0;
   theta[rightLowerArmId] = 0;
   theta[torsoId] = 30;
    
   runInc = 0.1;
   jumpInc = 0.1;
    
   initNodes(leftUpperLegId);
   initNodes(rightUpperLegId);
   initNodes(leftLowerLegId);
   initNodes(rightLowerLegId);
   initNodes(leftUpperArmId);
   initNodes(rightUpperArmId);
   initNodes(leftLowerArmId);
   initNodes(rightLowerArmId);
   initNodes(torsoId);
    
}

function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}

//End Button Functions, Start Design For human

function createNode(transform, render, sibling, child){
    var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}

function initNodes(Id) {

    var m = mat4();
    switch(Id) {
            
    case torsoId:
		m = rotate(theta[torsoId], 0, 1, 0 );
        if (flag22 == true){
            m = mult(m, translate(0,legDance,0));
        }
        m = mult(m, translate(-8,-11,0));
        m = mult(m, translate(runInc,0,0));
        m = mult(m, translate(0,jumpInc,0));
        figure[torsoId] = createNode( m, torso, null, headId );
    break;

    case headId:
    case head1Id:
    case head2Id:
		m = translate(0.0, torsoHeight+0.5*headHeight, 0.0);
		m = mult(m, rotate(theta[head1Id], 1, 0, 0))
		m = mult(m, rotate(theta[head2Id], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure[headId] = createNode( m, head, leftUpperArmId, null);
    break;

    case leftUpperArmId:
		m = translate(-(torsoWidth/1.75), 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta[leftUpperArmId], 0, 0, 1));
		figure[leftUpperArmId] = createNode( m, leftUpperArm, rightUpperArmId, leftLowerArmId );
    break;

    case rightUpperArmId:
		m = translate(torsoWidth/1.75, 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta[rightUpperArmId], 0, 0, 1));
		figure[rightUpperArmId] = createNode( m, rightUpperArm, leftUpperLegId, rightLowerArmId );
    break;

    case leftUpperLegId:
		m = translate(-(torsoWidth/2.0), 0.1*upperLegHeight, 0.0);
		m = mult(m , rotate(theta[leftUpperLegId], 1, 0, 0));
		figure[leftUpperLegId] = createNode( m, leftUpperLeg, rightUpperLegId, leftLowerLegId );
    break;

    case rightUpperLegId:
		m = translate(torsoWidth/2.0, 0.1*upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightUpperLegId], 1, 0, 0));
		figure[rightUpperLegId] = createNode( m, rightUpperLeg, null, rightLowerLegId );
    break;

    case leftLowerArmId:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta[leftLowerArmId], 1, 0, 0));
		figure[leftLowerArmId] = createNode( m, leftLowerArm, null, null );
    break;

    case rightLowerArmId:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta[rightLowerArmId], 1, 0, 0));
		figure[rightLowerArmId] = createNode( m, rightLowerArm, null, null );
    break;

    case leftLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[leftLowerLegId], 1, 0, 0));
		figure[leftLowerLegId] = createNode( m, leftLowerLeg, null, null );
    break;

    case rightLowerLegId:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta[rightLowerLegId], 1, 0, 0));
		figure[rightLowerLegId] = createNode( m, rightLowerLeg, null, null );
    break;

    }
}

function traverse(Id) {

   if(Id == null) return;
   stack.push(modelViewMatrix);
   modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
   figure[Id].render();
   if(figure[Id].child != null) traverse(figure[Id].child);
   modelViewMatrix = stack.pop();
   if(figure[Id].sibling != null) traverse(figure[Id].sibling);
}

function torso() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*torsoHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4( torsoWidth, torsoHeight, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight, 0.0 ));
	instanceMatrix = mult(instanceMatrix, scale4(headWidth, headHeight, headWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftUpperArm() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerArm() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperArm() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerArm() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function  leftUpperLeg() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerLeg() {

    instanceMatrix = mult(modelViewMatrix, translate( 0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperLeg() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerLeg() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) )
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//End Design for Human, Start Baby Design

function createNode2(transform, render, sibling, child){
    var node2 = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node2;
}

function traverse2(Id) {

   if(Id == null) return;
   stack2.push(modelViewMatrix);
   modelViewMatrix = mult(modelViewMatrix, figure2[Id].transform);
   figure2[Id].render();
   if(figure2[Id].child != null) traverse2(figure2[Id].child);
   modelViewMatrix = stack2.pop();
   if(figure2[Id].sibling != null) traverse2(figure2[Id].sibling);
}

function initNodes2(Id) {

    var m = mat4();
    switch(Id) {
            
    case torsoId2:
		m = rotate(theta2[torsoId2], 0, 1, 0 );
        m = mult(m, translate(0,-13,0));
        m = mult(m, translate(runInc2,0,0));
        m = mult(m, translate(0,jumpInc2,0));
        m = mult(m, scalem(1.0,0.5,0.5));
        figure2[torsoId2] = createNode2( m, torso2, null, headId2 );
    break;

    case headId2:
    case head1Id2:
    case head2Id2:
		m = translate(0.0, torsoHeight+0.5*headHeight, 0.0);
		m = mult(m, rotate(theta2[head1Id2], 1, 0, 0))
		m = mult(m, rotate(theta2[head2Id2], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure2[headId2] = createNode2( m, head2, leftUpperArmId2, null);
    break;

    case leftUpperArmId2:
		m = translate(-(torsoWidth/1.75), 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta2[leftUpperArmId2], 0, 0, 1));
		figure2[leftUpperArmId2] = createNode2( m, leftUpperArm2, rightUpperArmId2, leftLowerArmId2 );
    break;

    case rightUpperArmId2:
		m = translate(torsoWidth/1.75, 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta2[rightUpperArmId2], 0, 0, 1));
		figure2[rightUpperArmId2] = createNode2( m, rightUpperArm2, leftUpperLegId2, rightLowerArmId2 );
    break;

    case leftUpperLegId2:
		m = translate(-(torsoWidth/2.0), 0.1*upperLegHeight, 0.0);
		m = mult(m , rotate(theta2[leftUpperLegId2], 1, 0, 0));
		figure2[leftUpperLegId2] = createNode2( m, leftUpperLeg2, rightUpperLegId2, leftLowerLegId2 );
    break;

    case rightUpperLegId2:
		m = translate(torsoWidth/2.0, 0.1*upperLegHeight, 0.0);
		m = mult(m, rotate(theta2[rightUpperLegId2], 1, 0, 0));
		figure2[rightUpperLegId2] = createNode2( m, rightUpperLeg2, null, rightLowerLegId2 );
    break;

    case leftLowerArmId2:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta2[leftLowerArmId2], 1, 0, 0));
		figure2[leftLowerArmId2] = createNode2( m, leftLowerArm2, null, null );
    break;

    case rightLowerArmId2:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta2[rightLowerArmId2], 1, 0, 0));
		figure2[rightLowerArmId2] = createNode2( m, rightLowerArm2, null, null );
    break;

    case leftLowerLegId2:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta2[leftLowerLegId2], 1, 0, 0));
		figure2[leftLowerLegId2] = createNode2( m, leftLowerLeg2, null, null );
    break;

    case rightLowerLegId2:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta2[rightLowerLegId2], 1, 0, 0));
		figure2[rightLowerLegId2] = createNode2( m, rightLowerLeg2, null, null );
    break;

    }
}

function torso2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*torsoHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4( torsoWidth, torsoHeight, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight, 0.0 ));
	instanceMatrix = mult(instanceMatrix, scale4(headWidth, headHeight, headWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftUpperArm2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerArm2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperArm2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerArm2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function  leftUpperLeg2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerLeg2() {

    instanceMatrix = mult(modelViewMatrix, translate( 0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperLeg2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerLeg2() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) )
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//End Baby Design, Start Dog Design

function createNode3(transform, render, sibling, child){
    var node3 = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node3;
}

function traverse3(Id) {

   if(Id == null) return;
   stack3.push(modelViewMatrix);
   modelViewMatrix = mult(modelViewMatrix, figure3[Id].transform);
   figure3[Id].render();
   if(figure3[Id].child != null) traverse3(figure3[Id].child);
   modelViewMatrix = stack3.pop();
   if(figure3[Id].sibling != null) traverse3(figure3[Id].sibling);
}

function initNodes3(Id) {

    var m = mat4();
    switch(Id) {
            
    case torsoId3:
		m = rotate(theta3[torsoId3], 0, 1, 0 );
        m = mult(m, translate(10,-11,0));
        m = mult(m, translate(runInc3,0,0));
        m = mult(m, translate(0,jumpInc3,0));
        
        figure3[torsoId3] = createNode3( m, torso3, null, headId3 );
    break;

    case headId3:
    case head1Id3:
    case head2Id3:
		m = translate(0.0, torsoHeight2+0.5*headHeight2, 0.0);
		m = mult(m, rotate(theta3[head1Id3], 1, 0, 0))
		m = mult(m, rotate(theta3[head2Id3], 0, 1, 0));
        m = mult(m, translate(0, 0.5, -2));
		m = mult(m, translate(0.0, -0.5*headHeight2, 0.0));
		figure3[headId3] = createNode3( m, head3, leftUpperArmId3, null);
    break;

    case leftUpperArmId3:
		m = translate(-(torsoWidth2/1.75), 0.95*torsoHeight2, 0.0);
		m = mult(m, rotate(theta3[leftUpperArmId3], 1, 0, 0));
        m = mult(m, translate(1, 2, -1.5));
		figure3[leftUpperArmId3] = createNode3( m, leftUpperArm3, rightUpperArmId3, leftLowerArmId3 );
    break;

    case rightUpperArmId3:
		m = translate(torsoWidth2/1.75, 0.95*torsoHeight2, 0.0);
		m = mult(m, rotate(theta3[rightUpperArmId3], 1, 0, 0));
        m = mult(m, translate(-1, 2, -1.5));
		figure3[rightUpperArmId3] = createNode3( m, rightUpperArm3, leftUpperLegId3, rightLowerArmId3 );
    break;

    case leftUpperLegId3:
		m = translate(-(torsoWidth2/2.0), 0.1*upperLegHeight2, 0.0);
		m = mult(m , rotate(theta3[leftUpperLegId3], 1, 0, 0));
        m = mult(m, translate(1, 0, 2));
		figure3[leftUpperLegId3] = createNode3( m, leftUpperLeg3, rightUpperLegId3, leftLowerLegId3 );
    break;

    case rightUpperLegId3:
		m = translate(torsoWidth2/2.0, 0.1*upperLegHeight2, 0.0);
		m = mult(m, rotate(theta3[rightUpperLegId3], 1, 0, 0));
        m = mult(m, translate(-1, 0, 2));
		figure3[rightUpperLegId3] = createNode3( m, rightUpperLeg3, null, rightLowerLegId3 );
    break;

    case leftLowerArmId3:
		m = translate(0.0, upperArmHeight2, 0.0);
		m = mult(m, rotate(theta3[leftLowerArmId3], 1, 0, 0));
		figure3[leftLowerArmId3] = createNode3( m, leftLowerArm3, null, null );
    break;

    case rightLowerArmId3:
		m = translate(0.0, upperArmHeight2, 0.0);
		m = mult(m, rotate(theta3[rightLowerArmId3], 1, 0, 0));
		figure3[rightLowerArmId3] = createNode3( m, rightLowerArm3, null, null );
    break;

    case leftLowerLegId3:
		m = translate(0.0, upperLegHeight2, 0.0);
		m = mult(m, rotate(theta3[leftLowerLegId3], 1, 0, 0));
		figure3[leftLowerLegId3] = createNode3( m, leftLowerLeg3, null, null );
    break;

    case rightLowerLegId3:
		m = translate(0.0, upperLegHeight2, 0.0);
		m = mult(m, rotate(theta3[rightLowerLegId3], 1, 0, 0));
		figure3[rightLowerLegId3] = createNode3( m, rightLowerLeg3, null, null );
    break;

    }
}

function torso3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*torsoHeight2-1, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4( torsoWidth2, torsoHeight2, torsoWidth2+2));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight2+1, 0.0 ));
	instanceMatrix = mult(instanceMatrix, scale4(headWidth2, headHeight2, headWidth2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftUpperArm3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight2, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth2, upperArmHeight2, upperArmWidth2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerArm3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight2, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth2, lowerArmHeight2, lowerArmWidth2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperArm3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight2, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth2, upperArmHeight2, upperArmWidth2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerArm3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function  leftUpperLeg3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight2, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth2, upperLegHeight2, upperLegWidth2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerLeg3() {

    instanceMatrix = mult(modelViewMatrix, translate( 0.0, 0.5 * lowerLegHeight2, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth2, lowerLegHeight2, lowerLegWidth2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperLeg3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight2, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth2, upperLegHeight2, upperLegWidth2) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerLeg3() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight2, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth2, lowerLegHeight2, lowerLegWidth2) )
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//End Dog Design, Start Ground Design

function createNode4(transform, render, sibling, child){
    var node4 = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node4;
}

function traverse4(Id) {

   if(Id == null) return;
   stack4.push(modelViewMatrix);
   modelViewMatrix = mult(modelViewMatrix, figure4[Id].transform);
   figure4[Id].render();
   if(figure4[Id].child != null) traverse4(figure4[Id].child);
   modelViewMatrix = stack4.pop();
   if(figure4[Id].sibling != null) traverse4(figure4[Id].sibling);
}

function initNodes4(Id) {

    var m = mat4();
    switch(Id) {
            
    case torsoId4:
		m = rotate(theta4[torsoId4], 0, 1, 0 );
        m = mult(m, translate(-5,-20.3,0));
        m = mult(m, translate(runInc4,0,0));
        m = mult(m, translate(0,jumpInc4,0));
        m = mult(m, scalem(25.0,1.0,5.0));
        figure4[torsoId4] = createNode4( m, torso4, null, headId4 );
    break;

    case headId4:
    case head1Id4:
    case head2Id4:
		m = translate(0.0, torsoHeight+0.5*headHeight, 0.0);
		m = mult(m, rotate(theta4[head1Id4], 1, 0, 0))
		m = mult(m, rotate(theta4[head2Id4], 0, 1, 0));
		m = mult(m, translate(0.0, -0.5*headHeight, 0.0));
		figure4[headId4] = createNode4( m, head4, leftUpperArmId4, null);
    break;

    case leftUpperArmId4:
		m = translate(-(torsoWidth/1.75), 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta4[leftUpperArmId4], 0, 0, 1));
		figure4[leftUpperArmId4] = createNode4( m, leftUpperArm4, rightUpperArmId4, leftLowerArmId4 );
    break;

    case rightUpperArmId4:
		m = translate(torsoWidth/1.75, 0.95*torsoHeight, 0.0);
		m = mult(m, rotate(theta4[rightUpperArmId4], 0, 0, 1));
		figure4[rightUpperArmId4] = createNode4( m, rightUpperArm4, leftUpperLegId4, rightLowerArmId4 );
    break;

    case leftUpperLegId4:
		m = translate(-(torsoWidth/2.0), 0.1*upperLegHeight, 0.0);
		m = mult(m , rotate(theta4[leftUpperLegId4], 1, 0, 0));
		figure4[leftUpperLegId4] = createNode4( m, leftUpperLeg4, rightUpperLegId4, leftLowerLegId4 );
    break;

    case rightUpperLegId4:
		m = translate(torsoWidth/2.0, 0.1*upperLegHeight, 0.0);
		m = mult(m, rotate(theta4[rightUpperLegId4], 1, 0, 0));
		figure4[rightUpperLegId4] = createNode4( m, rightUpperLeg4, null, rightLowerLegId4 );
    break;

    case leftLowerArmId4:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta4[leftLowerArmId4], 1, 0, 0));
		figure4[leftLowerArmId4] = createNode4( m, leftLowerArm4, null, null );
    break;

    case rightLowerArmId4:
		m = translate(0.0, upperArmHeight, 0.0);
		m = mult(m, rotate(theta4[rightLowerArmId4], 1, 0, 0));
		figure4[rightLowerArmId4] = createNode4( m, rightLowerArm4, null, null );
    break;

    case leftLowerLegId4:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta4[leftLowerLegId4], 1, 0, 0));
		figure4[leftLowerLegId4] = createNode4( m, leftLowerLeg4, null, null );
    break;

    case rightLowerLegId4:
		m = translate(0.0, upperLegHeight, 0.0);
		m = mult(m, rotate(theta4[rightLowerLegId4], 1, 0, 0));
		figure4[rightLowerLegId4] = createNode4( m, rightLowerLeg4, null, null );
    break;

    }
}

function torso4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5*torsoHeight, 0.0) );
    instanceMatrix = mult(instanceMatrix, scale4( torsoWidth, torsoHeight, torsoWidth));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function head4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * headHeight, 0.0 ));
	instanceMatrix = mult(instanceMatrix, scale4(headWidth, headHeight, headWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftUpperArm4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerArm4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperArm4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperArmWidth, upperArmHeight, upperArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerArm4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerArmHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerArmWidth, lowerArmHeight, lowerArmWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function  leftUpperLeg4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function leftLowerLeg4() {

    instanceMatrix = mult(modelViewMatrix, translate( 0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightUpperLeg4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

function rightLowerLeg4() {

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) )
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
}

//End Dog Design, Start Cube Design

function quad(a, b, c, d) {
     var t1 = subtract(vertices[b], vertices[a]);
     var t2 = subtract(vertices[c], vertices[b]);
     var normal = cross(t1, t2);
     var normal = vec3(normal);
	 
     pointsArray.push(vertices[a]);
     normalsArray.push(normal);
     
	 pointsArray.push(vertices[b]);
     normalsArray.push(normal);
     
	 pointsArray.push(vertices[c]);
     normalsArray.push(normal);
     
	 pointsArray.push(vertices[d]);
     normalsArray.push(normal);
}

function cube()
{
    quad( 1, 0, 3, 2 );
    quad( 2, 3, 7, 6 );
    quad( 3, 0, 4, 7 );
    quad( 6, 5, 1, 2 );
    quad( 4, 5, 6, 7 );
    quad( 5, 4, 0, 1 );
}

function picture(){ 
    var pic = "ball.gif"
    document.getElementById('discoBall').src = pic.replace('40x40', '60x60');
}

/////////////////////Render////////////////////////

var render = function() {

        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        traverse(torsoId);
        traverse2(torsoId2);
        traverse3(torsoId3);
        traverse4(torsoId4);
        requestAnimFrame(render);
    
        //Human:
        if (flag5 == true){
            walkBackward1();
        }
        if (flag6 == true){
            walkForward1();
        }
        if (flag7 == true){
            jump1();
        }  
        if (flag7 == false){
            jumpInc = 0;
            initNodes(torsoId);
        }
        
        //Baby:
        if (flag18 == true){
            walkBackward2();
        }
        if (flag19 == true){
            walkForward2();
        }
        if (flag20 == true){
            jump2();
        }
        if (flag20 == false){
            jumpInc2 = 0;
            initNodes2(torsoId2);
        }
    
        //Dog:
         if (flag24 == true){
            walkForward3();
        }
        if (flag25 == true){
            walkBackward3();
        }
        if (flag26 == true){
            jump3();
        }
        if (flag26 == false){
            jumpInc3 = 0;
            initNodes3(torsoId3);
        }
    
        //All:
        if (flag9 == true){
            dance();
        }
    
}
