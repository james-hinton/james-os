export const retrieveFossilsForBoundingBox = async (boundingBox) => {
  if (!checkBoundingBoxSize(boundingBox)) {
    return {
      status: 401,
      message: "Bounding box too large",
    };
  }

  const url = `https://paleobiodb.org/data1.2/occs/list.json?lngmin=${boundingBox.lngmin}&lngmax=${boundingBox.lngmax}&latmin=${boundingBox.latmin}&latmax=${boundingBox.latmax}&show=full`;
  const response = await fetch(url);
  const data = await response.json();
  return {
    status: 200,
    data: data.records,
  };
};

const checkBoundingBoxSize = (boundingBox) => {
  const lngDiff = boundingBox.lngmax - boundingBox.lngmin;
  const latDiff = boundingBox.latmax - boundingBox.latmin;
  if (lngDiff > 1.5 || latDiff > 1.5) {
    console.log("Bounding box too large, returning");
    return false;
  }
  return true;
};
