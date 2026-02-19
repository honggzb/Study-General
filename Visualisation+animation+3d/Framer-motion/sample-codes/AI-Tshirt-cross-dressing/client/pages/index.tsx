/**
 * Build and Deploy an AI-Powered 3D Website Using React | 2024 Three JS Course Tutorial for Beginners
 * https://www.youtube.com/watch?v=ZqEa8fTxypQ
 * https://github.com/adrianhajdin/project_threejs_ai
 *
 * prompt samples:
 * "create a blue circle logo"
 * "create a gradient pattern that goes from blue to red"
 * "design a simple modern logo icon using geometry shapes and a minimalistic color scheme, without any text or lettering"
 * "Create a smooth gradient pattern that transitions from a vibrant blue to a rich red, with soft blending and no harsh lines, suitable for a modern website background"
 * "Create a unique t-shirt texture that has a vintage and distressed look. The texture should be designed to cove the entire front."
 *
 * npm i three @react-three/drei @react-three/fiber @types/three
 * npm i motion maath
 * npm i valtio react-color
 *
 * reference for speech API:
 * https://github.com/theringsofsaturn/3D-ai-school-threejs/
 * Build a 3D AI School with Three.js, React Three Fiber, Blender & OpenAI | Beginner-Friendly Tutorial
 * https://www.youtube.com/watch?v=AllROojlixE
 * ✅ Integrating the OpenAI API to generate AI responses
 * ✅ Adding chat history functionality for an enhanced user experience
 */

import { Geist, Geist_Mono } from "next/font/google";
import HomePage from "@/pages/components/Home";
import Customizer from "./components/customizer";
import CanvasModel from "./components/canvas/CanvasModel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="app transition-all ease-in">
      <HomePage />
      <CanvasModel />
      <Customizer />
    </main>
  );
}
