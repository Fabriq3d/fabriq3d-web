import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useNavigate } from 'react-router-dom';
import '../styles/CustomizerView.css';

interface CustomizerViewProps {
  design: any;
  onDesignUpdate: (design: any) => void;
}

const CustomizerView: React.FC<CustomizerViewProps> = ({ design, onDesignUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Configuration Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    
    // Ajout des lumières
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Position de la caméra
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Nettoyage
    return () => {
      renderer.dispose();
    };
  }, []);

  const handleCustomization = (param: string, value: any) => {
    const newDesign = { ...design, [param]: value };
    onDesignUpdate(newDesign);
  };

  const handleOrder = () => {
    navigate('/order');
  };

  return (
    <div className="customizer-container">
      <div className="controls-panel">
        <h2>Personnalisez votre porte-clés</h2>
        <div className="control-group">
          <label>Texte</label>
          <input 
            type="text" 
            onChange={(e) => handleCustomization('text', e.target.value)}
            placeholder="Votre texte"
          />
        </div>
        <div className="control-group">
          <label>Couleur</label>
          <input 
            type="color" 
            onChange={(e) => handleCustomization('color', e.target.value)}
          />
        </div>
        <button 
          className="order-button"
          onClick={handleOrder}
        >
          Commander
        </button>
      </div>
      <canvas ref={canvasRef} className="preview-canvas" />
    </div>
  );
};

export default CustomizerView;
