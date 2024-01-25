
import stc from "string-to-color";




function rgbToHsl(r: number, g: number, b: number) {
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h = 0,
      s,
      l = (max + min) / 2;
  
    if (max === min) {
      h = s = 0; 
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
  
    return [h * 360, s * 100, l * 100];
  }
  
  function getContrastColor(hex: string) {
    // 如果是简写形式的 hex，则将其展开
    if (hex.length === 4) {
      hex = hex
        .split("")
        .map(function (hex) {
          return hex + hex;
        })
        .join("");
    }
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const [h, s, l] = rgbToHsl(r, g, b);
    return l >= 60 ? "black" : "white";
  }
  
  
  export function generateColor(str: string) {
    const backgroundColor = stc(str);
    return {
      backgroundColor,
      color: getContrastColor(backgroundColor),
    };
  }