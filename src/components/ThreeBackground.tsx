// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck 
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Theme } from '../types';

interface ThreeBackgroundProps {
  theme: Theme;
}

export default function ThreeBackground({ theme }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationFrameId = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Noise texture (still needed for wireframe plane displacement)
    const noiseTexture = generateNoiseTexture();

    // Wireframe plane
    const wireframePlane = createWireframePlane(noiseTexture, theme);
    scene.add(wireframePlane);

    // Particles
    const particles = createParticles(theme);
    scene.add(particles);

    // Animation variables
    let opacity = 0;
    const fadeInSpeed = 0.02;
    let frame = 0;
    const mouse = { x: 0, y: 0 };

    // Event listeners
    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX - window.innerWidth / 2) / 500;
      mouse.y = (event.clientY - window.innerHeight / 2) / 500;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = () => {
      if (!containerRef.current) return;
      
      animationFrameId.current = requestAnimationFrame(animate);
      frame += 0.002;

      if (opacity < 1) {
        opacity = Math.min(opacity + fadeInSpeed, 1);
        updateOpacities(wireframePlane.material, particles.material, opacity, theme);
        if (containerRef.current) {
          const blur = Math.max(0, 10 * (1 - opacity));
          containerRef.current.style.filter = `blur(${blur}px)`;
        }
        if (opacity === 1 && !isLoaded) setIsLoaded(true);
      }

      wireframePlane.rotation.z = Math.sin(frame) * 0.05;
      particles.rotation.x += mouse.y * 0.01 + 0.0005;
      particles.rotation.y += mouse.x * 0.01 + 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    // Helper functions
    function generateNoiseTexture(): HTMLCanvasElement {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const ctx = canvas.getContext('2d')!;
      const imageData = ctx.createImageData(256, 256);
      
      for (let i = 0; i < imageData.data.length; i += 4) {
        const value = Math.random() * 255;
        imageData.data[i] = value;
        imageData.data[i + 1] = value;
        imageData.data[i + 2] = value;
        imageData.data[i + 3] = 255;
      }
      
      ctx.putImageData(imageData, 0, 0);
      ctx.filter = 'blur(8px)';
      ctx.drawImage(canvas, 0, 0);
      return canvas;
    }

    function createWireframePlane(noiseTexture: HTMLCanvasElement, theme: Theme): THREE.Mesh {
      const geometry = new THREE.PlaneGeometry(50, 50, 128, 128);
      const material = new THREE.MeshBasicMaterial({
        color: theme === 'dark' ? 0x111111 : 0xf0f0f0,
        wireframe: true,
        transparent: true,
        opacity: theme === 'dark' ? 0.8 : 0.2
      });

      const count = geometry.attributes.position.count;
      const damping = 2.5;
      for (let i = 0; i < count; i++) {
        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);
        const xNorm = (x + 25) / 50;
        const yNorm = (y + 25) / 50;
        const color = noiseTexture.getContext('2d')!.getImageData(
          Math.floor(xNorm * 256),
          Math.floor(yNorm * 256),
          1, 1
        ).data[0] / 255;
        geometry.attributes.position.setZ(i, (color - 0.5) * damping);
      }
      geometry.computeVertexNormals();

      const mesh = new THREE.Mesh(geometry, material);
      mesh.rotation.x = -Math.PI / 3;
      return mesh;
    }

    function createParticles(theme: Theme): THREE.Points {
      const geometry = new THREE.BufferGeometry();
      const count = 800;
      const positions = new Float32Array(count * 3);
      
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 50;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({
        size: 0.06,
        sizeAttenuation: true,
        color: theme === 'dark' ? 0xffffff : 0x000000,
        transparent: true,
        opacity: 0.5
      });
      
      return new THREE.Points(geometry, material);
    }

    function updateOpacities(wireframeMat: THREE.Material, particleMat: THREE.Material, opacity: number, theme: Theme) {
      wireframeMat.opacity = (theme === 'dark' ? 0.8 : 0.2) * opacity;
      particleMat.opacity = 0.5 * opacity;
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}