var config = { rotateX: degToRad(0), rotateY: degToRad(0), rotateZ: degToRad(0),
  translateX: degToRad(0), translateY: degToRad(0),translateZ: degToRad(0),
  scaleX: degToRad(50), scaleY: degToRad(50), scaleZ: degToRad(50), bez: degToRad(0),
  rotationSpeed: degToRad(0),objDelta: degToRad(40),  camX: degToRad(360), camY: degToRad(360),
  camZ: degToRad(360), camXRotation: degToRad(0),camYRotation: degToRad(0),camZRotation: degToRad(0),
  zoom: degToRad(0),camBezier: degToRad(0),
  animaObjeto: function () { 
    anime = true; 
  },
}

//var addModel = {
 // model: function(){
 //   randomModel = true;
 // }
//};
  
 var remove = { 
   remove_obj: function () { 
     remover = true; 
    } 
  };
  
  var drawCube = {
    cube: function (){
    drawObject = 1;
    }
  };
  var drawSphere = {
    sphere: function (){
      drawObject = 2;
    }
  };
  
  var drawCone = {
    cone: function (){
      drawObject = 3;
    }
  };

  const loadGUI = () => {
    const gui = new dat.GUI();
  
   // gui.add(addModel,'model').name("Adicionar Modelo");
    gui.add(drawCube,'cube').name("Adicionar Cubo");
    gui.add(drawSphere,'sphere').name("Adicionar Esfera");
    gui.add(drawCone,'cone').name("Adicionar Cone");
    gui.add(remove, 'remove_obj').name('Remover Objeto');
    const rotation = gui.addFolder('Rotação');
    rotation.add(config,"rotateX", 0, 20, 0.5).name('x');
    rotation.add(config,"rotateY", 0, 20, 0.5).name('y');
    rotation.add(config,"rotateZ", 0, 20, 0.5).name('z');
  
    const transl = gui.addFolder('Translação');
    transl.add(config,"translateX", -100, 100, 0.5).name('x');
    transl.add(config,"translateY", -100, 100, 0.5).name('y');
    transl.add(config,"translateZ", -100, 100, 0.5).name('z');
    transl.add(config, "bez", 0,1,0.001).name("Bezier");
  
    const scale = gui.addFolder('Escala Objeto');
    scale.add(config, "scaleX", 0, 20, 0.5).name('x');
    scale.add(config, "scaleY", 0, 20, 0.5).name('y');
    scale.add(config, "scaleZ", 0, 20, 0.5).name('z');
    
    
    const camera = gui.addFolder("Camera Translation");
    camera.add(config, "camX", -360, 360, 0.5).name('Translação X');
    camera.add(config, "camY", -360, 360, 0.5).name('Translação Y');
    camera.add(config, "camZ", -360, 360, 0.5).name('Translação Z');
    camera.add(config, "camBezier", 0, 1, 0.001).name('Camera Bezier');
  
    const camera_rotation = gui.addFolder("Camera Rotation");
    camera_rotation.add(config, "camXRotation", -360, 360, 0.5).name('Rotação X');
    camera_rotation.add(config, "camYRotation", -360, 360, 0.5).name('Rotação Y');
    camera_rotation.add(config, "camZRotation", -360, 360, 0.5).name('Rotação Z');
    config.zoom = 1
    camera_rotation.add(config, "zoom", 0.0001, 5, 0.0001).name('Zoom');
  
    const animaObjeto= gui.addFolder('Animação Objeto');
    animaObjeto.add(config, "rotationSpeed", 1, 10, 0.005).name('Delta');
    animaObjeto.add(config, 'animaObjeto').name('Animação');
  };
  