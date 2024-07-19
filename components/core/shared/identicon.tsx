import React, { useEffect, useRef } from 'react';

interface IdenticonProps {
  seed: string;
  size?: number;
  scale?: number;
  color?: string;
  bgColor?: string;
  spotColor?: string;
  borderRadius?: number;
}

const Identicon: React.FC<IdenticonProps> = ({
  seed,
  size = 8,
  scale = 4,
  color,
  bgColor,
  spotColor,
  borderRadius = 0
}) => {
  const identiconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = generateIdenticon({ seed, size, scale, color, bgColor, spotColor });
    if (identiconRef.current && canvas) {
      identiconRef.current.appendChild(canvas);
    }

    return () => {
      if (identiconRef.current) {
        identiconRef.current.innerHTML = ''; // Clear canvas on unmount
      }
    };
  }, [seed, size, scale, color, bgColor, spotColor]);

  const generateIdenticon = ({ seed, size, scale, color, bgColor, spotColor }: IdenticonProps) => {
    const randseed = new Array<number>(4);

    const seedrand = (seed: string) => {
      for (let i = 0; i < randseed.length; i++) {
        randseed[i] = 0;
      }
      for (let i = 0; i < seed.length; i++) {
        randseed[i % 4] = ((randseed[i % 4] << 5) - randseed[i % 4]) + seed.charCodeAt(i);
      }
    };

    const rand = () => {
      const t = randseed[0] ^ (randseed[0] << 11);
      randseed[0] = randseed[1];
      randseed[1] = randseed[2];
      randseed[2] = randseed[3];
      randseed[3] = (randseed[3] ^ (randseed[3] >> 19) ^ t ^ (t >> 8));
      return (randseed[3] >>> 0) / ((1 << 31) >>> 0);
    };

    const createColor = () => {
      const h = Math.floor(rand() * 360);
      const s = ((rand() * 60) + 40) + "%";
      const l = ((rand() + rand() + rand() + rand()) * 25) + "%";
      return `hsl(${h},${s},${l})`;
    };

    const createImageData = (size: number) => {
      const width = size;
      const height = size;

      const dataWidth = Math.ceil(width / 2);
      const mirrorWidth = width - dataWidth;

      const data: number[] = [];
      for (let y = 0; y < height; y++) {
        let row: number[] = [];
        for (let x = 0; x < dataWidth; x++) {
          row[x] = Math.floor(rand() * 3);
        }
        const r = row.slice(0, mirrorWidth);
        r.reverse();
        row = row.concat(r);

        for (let i = 0; i < row.length; i++) {
          data.push(row[i]);
        }
      }

      return data;
    };

    const setCanvas = (identicon: HTMLCanvasElement, imageData: number[], color: string, scale: number, bgcolor: string, spotcolor: string) => {
      const width = Math.sqrt(imageData.length);
      const cc = identicon.getContext("2d") as CanvasRenderingContext2D;

      identicon.width = width * scale;
      identicon.height = width * scale;
      identicon.style.width = `${identicon.width}px`;
      identicon.style.height = `${identicon.height}px`;
      identicon.style.borderRadius = `${borderRadius}px`;

      cc.fillStyle = bgcolor;
      cc.fillRect(0, 0, identicon.width, identicon.height);
      cc.fillStyle = color;

      for (let i = 0; i < imageData.length; i++) {
        cc.fillStyle = (imageData[i] === 1) ? color : spotcolor;
        if (imageData[i]) {
          const row = Math.floor(i / width);
          const col = i % width;
          cc.fillRect(col * scale, row * scale, scale, scale);
        }
      }

      return identicon;
    };

    seedrand(seed);
    const colorValue = color || createColor();
    const bgColorValue = bgColor || createColor();
    const spotColorValue = spotColor || createColor();
    const imageData = createImageData(size as number);
    const canvas = setCanvas(document.createElement('canvas'), imageData, colorValue, scale as number, bgColorValue, spotColorValue);

    return canvas;
  };

  return (
    <div ref={identiconRef} className="identicon" />
  );
};

export default Identicon;
