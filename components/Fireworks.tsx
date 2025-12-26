import React, { useEffect, useRef } from 'react';

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const resize = () => {
      // Use offsetWidth/Height to match the container size perfectly
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 1;
        // Luxury Gold/White palette
        const colors = [
            `hsl(45, 100%, 50%)`, // Gold
            `hsl(50, 100%, 70%)`, // Light Gold
            `hsl(0, 0%, 100%)`,   // White
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)]; 
        this.velocity = {
          x: (Math.random() - 0.5) * 6,
          y: (Math.random() - 0.5) * 6 - 2 
        };
        this.alpha = 1;
      }

      draw() {
        if(!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.velocity.y += 0.05; // Gravity
        this.velocity.x *= 0.98; // Drag
        this.velocity.y *= 0.98;
        this.alpha -= 0.015; // Fade out speed
      }
    }

    const createExplosion = (x: number, y: number) => {
      for (let i = 0; i < 40; i++) {
        particles.push(new Particle(x, y));
      }
    };

    let timer = 0;
    const animate = () => {
      if(!ctx) return;
      animationFrameId = requestAnimationFrame(animate);
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Infinite Loop Logic
      if (timer % 50 === 0 || Math.random() < 0.03) { 
         const x = Math.random() * canvas.width;
         const y = Math.random() * (canvas.height * 0.6); 
         createExplosion(x, y);
      }

      timer++;

      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.alpha <= 0) {
          particles.splice(index, 1);
        }
      });
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        style={{ pointerEvents: 'none' }}
    />
  );
};

export default Fireworks;