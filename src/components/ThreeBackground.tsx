import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Theme } from '../types';

interface ThreeBackgroundProps {
  theme: Theme;
}

export default function ThreeBackground({ theme }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    const noiseTexture = generateNoiseTexture();
    // eslint-disable-next-line 
    const textureLoader = new THREE.TextureLoader();
    const texture = new THREE.Texture(noiseTexture);
    texture.needsUpdate = true;
    
    const planeGeometry = new THREE.PlaneGeometry(50, 50, 128, 128);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x111111 : 0xf0f0f0,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });
    
    const count = planeGeometry.attributes.position.count;
    const damping = 2.5;
    
    for (let i = 0; i < count; i++) {
      const x = planeGeometry.attributes.position.getX(i);
      const y = planeGeometry.attributes.position.getY(i);
      
      const xNorm = (x + 25) / 50;
      const yNorm = (y + 25) / 50;
      const color = noiseTexture.getContext('2d')!.getImageData(
        Math.floor(xNorm * noiseTexture.width),
        Math.floor(yNorm * noiseTexture.height),
        1, 1
      ).data[0] / 255;
      
      planeGeometry.attributes.position.setZ(i, (color - 0.5) * damping);
    }
    
    planeGeometry.computeVertexNormals();
    
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 3;
    scene.add(plane);
    
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 300;
    
    const positions = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 40;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.07,
      sizeAttenuation: true,
      color: theme === 'dark' ? 0xffffff : 0x000000,
      transparent: true,
      opacity: 0.4
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    let mouseX = 0;
    let mouseY = 0;
    
    function onDocumentMouseMove(event: MouseEvent): void {
      mouseX = (event.clientX - window.innerWidth / 2) / 500;
      mouseY = (event.clientY - window.innerHeight / 2) / 500;
    }
    
    document.addEventListener('mousemove', onDocumentMouseMove);
    
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', onWindowResize);
    
    let opacity = 0;
    const fadeInSpeed = 0.01;
    
    let frame = 0;
    let animationId: number;
    const animate = () => {
      if (!containerRef.current) return;
      animationId = requestAnimationFrame(animate);
      frame += 0.002;
      
      if (opacity < 1) {
        opacity += fadeInSpeed;
        planeMaterial.opacity = 0.2 * opacity;
        particlesMaterial.opacity = 0.4 * opacity;
        
        if (containerRef.current) {
          const blur = Math.max(0, 10 * (1 - opacity));
          containerRef.current.style.filter = `blur(${blur}px)`;
        }
      } else if (!isLoaded) {
        setIsLoaded(true);
      }
      
      plane.rotation.z = Math.sin(frame) * 0.05;
      particles.rotation.x += 0.0005;
      particles.rotation.y += 0.0003;
      particles.rotation.x += mouseY * 0.01;
      particles.rotation.y += mouseX * 0.01;
      
      renderer.render(scene, camera);
      
      return animationId;
    };
    // @ts-expect-error okay
    animationId = animate();
    
    function generateNoiseTexture(): HTMLCanvasElement {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      
      const context = canvas.getContext('2d')!;
      const imageData = context.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.floor(Math.random() * 256);
        data[i] = value;
        data[i + 1] = value;
        data[i + 2] = value;
        data[i + 3] = 255;
      }
      
      context.putImageData(imageData, 0, 0);
      context.filter = 'blur(8px)';
      context.drawImage(canvas, 0, 0);
      
      return canvas;
    }
    
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [theme]);
  
  return (
    <div 
      ref={containerRef} 
      className={`w-full h-full transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
    />
  );
}