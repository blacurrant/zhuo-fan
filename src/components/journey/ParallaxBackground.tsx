'use client';
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ParallaxBackgroundProps {
  backgroundNumber: number;
  sectionStartX: number;
  scrollX: number;
}

// Assign depth based on layer name and position - sky first (low depth), foreground last (high depth)
const getDepthForLayer = (layerName: string, position: number, totalLayers: number): number => {
  if (layerName.includes('sky')) return 0.05;
  if (layerName.includes('cloud')) return 0.15 + (position * 0.1);
  if (layerName.includes('bird')) return 0.4;
  if (layerName.includes('pine')) return 0.55;
  if (layerName.includes('plant')) return 0.6;
  if (layerName.includes('ground')) return 0.7 + (position * 0.08);
  if (layerName.includes('rock')) return 0.75 + (position * 0.1);
  // Default: spread remaining layers evenly from mid to far
  return 0.3 + (position / totalLayers) * 0.5;
};

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  backgroundNumber,
  sectionStartX,
  scrollX,
}) => {
  // Layer list - hardcoded for each background since they vary
  const layers = useMemo(() => {
    const layerMap: { [key: number]: string[] } = {
      1: ['sky', 'clouds_1', 'clouds_2', 'clouds_3', 'clouds_4', 'rocks_1', 'rocks_2'],
      2: ['sky', 'clouds_1', 'clouds_2', 'clouds_3', 'birds', 'pines', 'rocks_1', 'rocks_2', 'rocks_3'],
      3: ['sky', 'clouds_1', 'clouds_2', 'ground_1', 'ground_2', 'ground_3', 'plant', 'rocks'],
      4: ['sky', 'clouds_1', 'clouds_2', 'ground', 'rocks'],
    };
    return layerMap[backgroundNumber] || [];
  }, [backgroundNumber]);

  // Calculate parallax offset relative to section scroll position
  const scrollWithinSection = Math.max(0, scrollX - sectionStartX);

  return (
    <div className="absolute inset-0 bg-replicate-canvas overflow-hidden">
      {/* Fixed 1920x1080 viewport for parallax - doesn't stretch with section width */}
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
        {layers.map((layer, idx) => {
          const depth = getDepthForLayer(layer, idx, layers.length);
          const parallaxOffset = scrollWithinSection * depth;

          return (
            <motion.div
              key={`${backgroundNumber}-${layer}`}
              className="absolute top-0 left-0 w-screen h-screen"
              animate={{
                x: -parallaxOffset,
              }}
              transition={{ type: 'tween', duration: 0.01 }}
            >
              <img
                src={`/parallax-backgrounds/game_background_${backgroundNumber}/layers/${layer}.png`}
                alt={`${layer} parallax layer`}
                className="w-screen h-screen object-cover"
                draggable="false"
              />
            </motion.div>
          );
        })}

        {/* Vignette overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-replicate-canvas/5 pointer-events-none" />
      </div>
    </div>
  );
};

export default ParallaxBackground;
