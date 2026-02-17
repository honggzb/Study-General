"use client";

import { Point, Points } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

const particleColors = [
  "#673ab7",
  "#f4b677",
  "orange",
  "blue",
  "#8bc34a",
  "purple",
];

const Particles = ({ size = 5000 }: { size?: number }) => {
  const { width, height } = useThree((state) => state.viewport);
  return (
    <Points limit={size}>
      {/* // limit is used to limit the number of points in the scene => performance optimization */}
      <pointsMaterial size={0.05} vertexColors />
      {/* // pointsMaterial is used to define the material of the points; size is the size of the points; vertexColors is used to color the points */}
      {Array.from({ length: size }).map(
        (
          currentElement,
          i // Array.from is used to create an array with a length of size; map is used to iterate over the array and create a point for each element; currentElement is a placeholder for the current element, i is the index of the current element
        ) => (
          <Point
            key={i}
            position={[
              // position is an array of 3 numbers that represent the x, y, and z coordinates of the point
              (0.5 - Math.random()) * width * 3, // Math.random() generates a random number between 0 and 1; 0.5 is subtracted from the random number to make the points go to the left and right of the viewport; width is the width of the viewport multiplied by 2 to make the points go beyond the viewport
              0.5 * height + Math.random() ** 0.35 * height * -4, // ** is the exponentiation operator; 0.25 is the exponent, the higher the exponent, the more the points will be concentrated in the center; height is the height of the viewport multiplied by -3 to make the points go below the viewport
              (0.5 - Math.random()) * 25, // 0.5 minus a random number multiplied by 25 to make the points go up and down
            ]}
            color={
              particleColors[
                Math.floor(Math.random() * (particleColors.length - 1))
              ]
            }
          />
        )
      )}
    </Points>
  );
};

export default Particles;