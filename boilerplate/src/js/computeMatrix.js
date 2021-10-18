function computeMatrix(viewProjectionMatrix, translation,xRotation,yRotation,zRotation,xScale,yScale,zScale,
    translation_x,translation_y,translation_z){
    var matrix = m4.translate(
      viewProjectionMatrix,
      translation[0],
      translation[1],
      translation[2],
    );
    matrix = m4.xRotate(matrix,xRotation);
    matrix = m4.yRotate(matrix,yRotation);
    matrix = m4.zRotate(matrix,zRotation);
    matrix = m4.scale(matrix, xScale, yScale, zScale);
    matrix = m4.translate(matrix, translation_x,translation_y,translation_z);
    return matrix; 
  }          