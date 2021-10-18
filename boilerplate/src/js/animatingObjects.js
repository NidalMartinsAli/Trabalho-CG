function animatingObjects(rotationObj){
    if(rotationObj <= 10){
      config.rotateX = rotationObj;
    }
    else if(rotationObj <= 20){
      config.rotateX = rotationObj;
      config.rotateY = rotationObj;
      config.rotateZ = rotationObj;
    }
    else if(rotationObj <= 50){
      config.translateX = rotationObj-20;
      config.rotateX = rotationObj;
      config.rotateY = rotationObj;
      config.translateY = rotationObj;
    }
    else if(rotationObj <= 70){
      config.scaleY = (rotationObj-40)/ 10;
      config.scaleX = (rotationObj-40)/ 10;
    }
    else{
      anime = false;
      rotationObj = degToRad(40);
    }

  }