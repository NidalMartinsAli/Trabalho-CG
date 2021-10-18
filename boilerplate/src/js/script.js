function main() {
  const { gl, meshProgramInfo } = initializeWorld();

  var position = Math.floor(Math.random() * (100 - 40)) + 40;
  const cubeTranslation = [-position, 0,0];
  const sphereTranslation = [position, -20, -position];
  const coneTranslation   = [0,0,0];
  
  var cubeList = [];
  var sphereList = [];
  var coneList = [];
  
  const sphereBufferInfo = flattenedPrimitives.createSphereBufferInfo(gl, 10, 12, 6);
  const cubeBufferInfo   = flattenedPrimitives.createCubeBufferInfo(gl, 15);
  const coneBufferInfo   = flattenedPrimitives.createTruncatedConeBufferInfo(gl, 10, 0, 20, 12, 1, true, false);

  const cubeVAO = twgl.createVAOFromBufferInfo( gl,meshProgramInfo,cubeBufferInfo);
  const sphereVAO = twgl.createVAOFromBufferInfo(gl, meshProgramInfo, sphereBufferInfo);
  const coneVAO   = twgl.createVAOFromBufferInfo(gl, meshProgramInfo, coneBufferInfo);
  
  var fieldOfViewRadians = degToRad(60);
  
  const cubeUniforms = {
    u_colorMult: [Math.random(), Math.random(), Math.random(), 1,],
    u_matrix: m4.identity(),
  }; 

  const sphereUniforms = {
    u_colorMult: [Math.random(), Math.random(), Math.random(), 1,],
    u_matrix: m4.identity(),
  }; 
  
  const coneUniforms = {
    u_colorMult: [Math.random(), Math.random(), Math.random(), 1,],
    u_matrix: m4.identity(),
  };

  loadGUI();

  var rotationObj  = degToRad(190);  
  console.log('rotation: ' + rotationObj);
  config.camX = 0; 
  config.camY = 0;
  config.camZ = 100;
  
  function render(time) {
    time = time * 0.0003;
    var deltaTime = time - then;
    then = time;
    rotationObj += config.rotationSpeed * deltaTime;
    console.log('rotation: ' + rotationObj);
    
    twgl.resizeCanvasToDisplaySize(gl.canvas);
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);

    var aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    var projectionMatrix = m4.perspective(fieldOfViewRadians, aspect, 1, 2000);
    var cameraPosition = [config.camX,config.camY,config.camZ];
    var target = [config.camXRotation,config.camYRotation,config.camZRotation];
    var up = [0, 1, 0];
    var cameraMatrix = m4.lookAt(cameraPosition, target, up);
    
    cameraMatrix = m4.scale(cameraMatrix,
      config.zoom,
      config.zoom,
      1);
    
    var viewMatrix = m4.inverse(cameraMatrix);
    var viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);
    gl.useProgram(meshProgramInfo.program);
    
    if (drawObject == 1) {
      cubeList.push(cubeUniforms);
      drawObject = 0;
    }
    else if (drawObject == 2) {
      sphereList.push(sphereUniforms);
      drawObject = 0;
    }
    else if (drawObject == 3) {
      coneList.push(coneUniforms);
      drawObject = 0;
    }
    
//////////////////////////////////////////////////////////////////////////////////////////////////////
    //RENDERIZANDO O CUBO.
    cubeList.forEach(function(cube){
      gl.bindVertexArray(cubeVAO);
      if (aux != config.bez){ //translação bezier
        aux = config.bez;
        var pos = Bezier(config.bez,p1,p2,p3,p4);
        config.translateX = pos[0];
        config.translateY = pos[1];
        }

      if (aux2 != config.camBezier) { //camera bezier
        var positions = Bezier(config.camBezier,p1,p2,p3,p4);
        cameraPosition[camSelect] = [
          positions[0],
          positions[1],
          config.camZ];
        camBezier = config.camBezier;
        config.camX = positions[0];
        config.camY = positions[1];
        console.log("bezier: " + config.camY);
      }
      if(anime){
        animatingObjects(rotationObj);
      } 
      
      if (remover) {
          if (cubeList.length== 0) {
              remover = false;
          }
          else {
              cubeList.splice(0, 1);
              cubeTranslation.splice(0, 1);
              remover = false;
          }
      }
      cube.u_matrix = computeMatrix(viewProjectionMatrix, cubeTranslation, 
      config.rotateX, config.rotateY, config.rotateZ, 
      config.scaleX, config.scaleY, config.scaleZ,
      config.translateX,config.translateY,config.translateZ);
      console.log(cube.u_matrix);
      
      twgl.setUniforms(meshProgramInfo, cube); 
      twgl.drawBufferInfo(gl, cubeBufferInfo);
  });

 //////////////////////////////////////////////////////////////////////////////////////////////////////
    
 //RENDERIZANDO A ESFERA.   
    sphereList.forEach(function(sphere){
      gl.bindVertexArray(sphereVAO);
     
      if (aux != config.bez){ //translação bezier
        aux = config.bez;
        var pos = Bezier(config.bez,p1,p2,p3,p4);
        config.translateX = pos[0];
        config.translateY = pos[1];
      }

      if (aux2 != config.camBezier) { //camera bezier
        var positions = Bezier(config.camBezier,p1,p2,p3,p4);
        cameraPosition[camSelect] = [
          positions[0],
          positions[1],
          config.camZ];
        camBezier = config.camBezier;
        config.camX = positions[0];
        config.camY = positions[1];
      }

      if(anime){
        animatingObjects(rotationObj);
      } 

      if (remover) {
        if (sphereList.length == 0) {
          remover = false;
        }
        else {
          sphereList.splice(0, 3);
          sphereTranslation.splice(0, 3);
          remover = false;
        }
      }
      sphere.u_matrix = computeMatrix(viewProjectionMatrix, sphereTranslation, 
        config.rotateX, config.rotateY, config.rotateZ, 
        config.scaleX, config.scaleY, config.scaleZ,
        config.translateX, config.translateY, config.translateZ);
      twgl.setUniforms(meshProgramInfo, sphere); 
      twgl.drawBufferInfo(gl, sphereBufferInfo);
    });


 //////////////////////////////////////////////////////////////////////////////////////////////////////   
    //RENDERIZANDO O CONE.
    coneList.forEach(function(cone){
      gl.bindVertexArray(coneVAO);
      if (aux != config.bez){ //translação bezier
        aux = config.bez;
        var pos = Bezier(config.bez,p1,p2,p3,p4);
        config.translateX = pos[0];
        config.translateY = pos[1];
      }
      
      if (aux2 != config.camBezier) { //camera bezier
        var positions = Bezier(config.camBezier,p1,p2,p3,p4);
        cameraPosition[camSelect] = [
          positions[0],
          positions[1],
          config.camZ];
        camBezier = config.camBezier;
        config.camX = positions[0];
        config.camY = positions[1];
        console.log("bezier: " + config.camY);
      }

      if(anime){
        animatingObjects(rotationObj);
      } 
      if (remover) {
        console.log(coneList.length);
        if (coneList.length == 0) {
          remover = false;
        }
        else {
          coneList.splice(0, 1);
          coneTranslation.splice(0, 1);
          remover = false;
        }
      }
      cone.u_matrix = computeMatrix(viewProjectionMatrix, coneTranslation, 
        config.rotateX, config.rotateY, config.rotateZ, 
        config.scaleX, config.scaleY, config.scaleZ,
        config.translateX, config.translateY, config.translateZ);
      twgl.setUniforms(meshProgramInfo, cone); 
      twgl.drawBufferInfo(gl, coneBufferInfo);
    });
///////////////////////////////////////////////////////////////////////////////////////////////////////    
    requestAnimationFrame(render);
  }  
  
  requestAnimationFrame(render);
}

main();

