"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Type, Image as ImageIcon, Download, Plus, Trash2, ChevronLeft, ChevronRight, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Copy, Sparkles, Crown, Check, X } from 'lucide-react';
import { templates, Template } from '@/lib/templates';

interface Slide {
  id: number;
  title: string;
  content: string;
  elements: SlideElement[];
  bgColor: string;
}

interface SlideElement {
  id: string;
  type: 'text' | 'image';
  content?: string;
  src?: string;
  x: number;
  y: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  width?: number;
  height?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  originalWidth?: number;
  originalHeight?: number;
}

interface EditorProps {
  videoUrl: string;
  slides: Array<{ title: string; content: string }>;
}

interface SnapLine {
  type: 'vertical' | 'horizontal';
  position: number;
}

function UpgradeModal({ onClose, templateName }: { onClose: () => void; templateName: string }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4">
            <Crown size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Upgrade a Premium</h2>
          <p className="text-sm text-zinc-500 mb-2">
            Para usar <span className="font-semibold text-zinc-700">"{templateName}"</span>
          </p>
        </div>

        <div className="space-y-3 mb-8">
          {['Templates Premium exclusivos', 'Sin marca de agua', 'Exportación HD', 'Soporte prioritario'].map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={14} className="text-green-600" />
              </div>
              <p className="font-medium text-sm">{feature}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => window.location.href = '/pricing'}
          className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg"
        >
          Upgrade por $9.99/mes
        </button>
      </div>
    </div>
  );
}

function ColorPicker({ value, onChange, onClose }: { value: string; onChange: (color: string) => void; onClose: () => void }) {
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100);
  const [brightness, setBrightness] = useState(50);
  const [hexInput, setHexInput] = useState(value);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hueRef = useRef<HTMLDivElement>(null);
  
  const presetColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2',
    '#1a1a1a', '#3a3a3a', '#5a5a5a', '#7a7a7a', '#9a9a9a', '#bababa', '#dadada', '#fafafa'
  ];

  useEffect(() => {
    const hex = value.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0;
    if (delta !== 0) {
      if (max === r) h = ((g - b) / delta) % 6;
      else if (max === g) h = (b - r) / delta + 2;
      else h = (r - g) / delta + 4;
      h = Math.round(h * 60);
      if (h < 0) h += 360;
    }
    
    const s = max === 0 ? 0 : (delta / max) * 100;
    const v = max * 100;
    
    setHue(h);
    setSaturation(s);
    setBrightness(v);
    setHexInput(value);
  }, [value]);

  const hsvToRgb = (h: number, s: number, v: number) => {
    s /= 100;
    v /= 100;
    const c = v * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = v - c;
    
    let r = 0, g = 0, b = 0;
    if (h >= 0 && h < 60) { r = c; g = x; b = 0; }
    else if (h >= 60 && h < 120) { r = x; g = c; b = 0; }
    else if (h >= 120 && h < 180) { r = 0; g = c; b = x; }
    else if (h >= 180 && h < 240) { r = 0; g = x; b = c; }
    else if (h >= 240 && h < 300) { r = x; g = 0; b = c; }
    else { r = c; g = 0; b = x; }
    
    const toHex = (n: number) => {
      const hex = Math.round((n + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  };

  const handleSaturationBrightnessChange = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSaturation = (x / rect.width) * 100;
    const newBrightness = 100 - (y / rect.height) * 100;
    
    setSaturation(Math.max(0, Math.min(100, newSaturation)));
    setBrightness(Math.max(0, Math.min(100, newBrightness)));
    
    const color = hsvToRgb(hue, newSaturation, newBrightness);
    onChange(color);
    setHexInput(color);
  };

  const handleHueChange = (e: React.MouseEvent<HTMLDivElement>) => {
    const div = hueRef.current;
    if (!div) return;
    
    const rect = div.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const newHue = (y / rect.height) * 360;
    
    setHue(Math.max(0, Math.min(360, newHue)));
    
    const color = hsvToRgb(newHue, saturation, brightness);
    onChange(color);
    setHexInput(color);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    setHexInput(hex);
    
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const baseColor = hsvToRgb(hue, 100, 100);
    
    const gradientWhite = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradientWhite.addColorStop(0, '#ffffff');
    gradientWhite.addColorStop(1, baseColor);
    ctx.fillStyle = gradientWhite;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const gradientBlack = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradientBlack.addColorStop(0, 'rgba(0,0,0,0)');
    gradientBlack.addColorStop(1, '#000000');
    ctx.fillStyle = gradientBlack;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [hue]);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-80 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Elegir color</h3>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {/* Selector principal */}
          <div className="flex gap-3">
            <canvas
              ref={canvasRef}
              width={200}
              height={200}
              className="rounded-lg cursor-crosshair border shadow-sm"
              onMouseDown={(e) => {
                handleSaturationBrightnessChange(e);
                const handleMove = (moveE: MouseEvent) => {
                  handleSaturationBrightnessChange(moveE as any);
                };
                const handleUp = () => {
                  document.removeEventListener('mousemove', handleMove);
                  document.removeEventListener('mouseup', handleUp);
                };
                document.addEventListener('mousemove', handleMove);
                document.addEventListener('mouseup', handleUp);
              }}
            />
            
            {/* Selector de Hue */}
            <div
              ref={hueRef}
              className="w-6 rounded-lg cursor-pointer shadow-sm"
              style={{
                background: 'linear-gradient(to bottom, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
              }}
              onMouseDown={(e) => {
                handleHueChange(e);
                const handleMove = (moveE: MouseEvent) => {
                  handleHueChange(moveE as any);
                };
                const handleUp = () => {
                  document.removeEventListener('mousemove', handleMove);
                  document.removeEventListener('mouseup', handleUp);
                };
                document.addEventListener('mousemove', handleMove);
                document.addEventListener('mouseup', handleUp);
              }}
            >
              <div 
                className="w-full h-1 bg-white border-2 border-zinc-800 rounded-full"
                style={{ marginTop: `${(hue / 360) * 100}%` }}
              />
            </div>
          </div>

          {/* Input Hex */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-1">Hexadecimal</label>
            <input
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              className="w-full px-3 py-2 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="#000000"
            />
          </div>

          {/* Colores predefinidos */}
          <div>
            <label className="block text-xs font-medium text-zinc-600 mb-2">Colores rápidos</label>
            <div className="grid grid-cols-8 gap-1.5">
              {presetColors.map(color => (
                <button
                  key={color}
                  onClick={() => {
                    onChange(color);
                    onClose();
                  }}
                  className="w-7 h-7 rounded-md border-2 border-zinc-200 hover:border-zinc-900 transition-colors shadow-sm"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>

          {/* Preview y botones */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex-1">
              <label className="block text-xs font-medium text-zinc-600 mb-1">Preview</label>
              <div 
                className="w-full h-10 rounded-lg border shadow-sm"
                style={{ backgroundColor: value }}
              />
            </div>
            <button
              onClick={onClose}
              className="mt-5 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium"
            >
              Listo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Editor({ videoUrl, slides: initialSlides }: EditorProps) {
  const [slides, setSlides] = useState<Slide[]>(
    initialSlides.map((slide, index) => ({
      id: index + 1,
      title: slide.title,
      content: slide.content,
      elements: [
        {
          id: `title-${index}`,
          type: 'text' as const,
          content: slide.title,
          x: 50,
          y: index === 0 ? 100 : 150,
          fontSize: index === 0 ? 48 : 32,
          fontFamily: 'Geist',
          color: '#18181b',
          align: index === 0 ? 'center' : 'left',
          width: 500,
          bold: true,
          italic: false,
          underline: false
        },
        ...(slide.content ? [{
          id: `content-${index}`,
          type: 'text' as const,
          content: slide.content,
          x: 50,
          y: index === 0 ? 250 : 250,
          fontSize: 20,
          fontFamily: 'Geist',
          color: '#52525b',
          align: 'left' as const,
          width: 500,
          bold: false,
          italic: false,
          underline: false
        }] : [])
      ],
      bgColor: '#ffffff'
    }))
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [editingElement, setEditingElement] = useState<string | null>(null);
  const [snapLines, setSnapLines] = useState<SnapLine[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [upgradingTemplate, setUpgradingTemplate] = useState('');
  const [userPlan] = useState<'free' | 'premium'>('free');
  const [showColorPicker, setShowColorPicker] = useState<'text' | 'background' | null>(null);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  const fonts = ['Geist', 'Arial', 'Georgia', 'Courier New', 'Verdana', 'Helvetica'];
  const SNAP_THRESHOLD = 5;
  const CANVAS_WIDTH = 600;
  const CANVAS_HEIGHT = 600;

  useEffect(() => {
    if (editingElement && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [editingElement]);

  const applyTemplate = (template: Template) => {
    if (template.isPremium && userPlan === 'free') {
      setUpgradingTemplate(template.name);
      setShowUpgrade(true);
      return;
    }

    const slidesWithTemplate = slides.map((slide, index) => {
      const templateSlide = template.slides[0];
      return {
        ...slide,
        elements: templateSlide.elements.map(el => ({
          ...el,
          content: index === 0 ? slide.title : slide.content,
          id: `${el.type}-${Date.now()}-${Math.random()}`
        })),
        bgColor: templateSlide.bgColor
      };
    });

    setSlides(slidesWithTemplate);
    setShowTemplates(false);
  };

  const addTextElement = () => {
    const newElement: SlideElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: 'Nuevo texto',
      x: 100,
      y: 100,
      fontSize: 24,
      fontFamily: 'Geist',
      color: '#18181b',
      align: 'left',
      width: 400,
      bold: false,
      italic: false,
      underline: false
    };

    const updatedSlides = [...slides];
    updatedSlides[currentSlide].elements.push(newElement);
    setSlides(updatedSlides);
    setSelectedElement(newElement.id);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const newElement: SlideElement = {
          id: `image-${Date.now()}`,
          type: 'image',
          src: event.target?.result as string,
          x: 50,
          y: 50,
          width: 150,
          height: 150,
          originalWidth: img.width,
          originalHeight: img.height
        };

        const updatedSlides = [...slides];
        updatedSlides[currentSlide].elements.push(newElement);
        setSlides(updatedSlides);
        setSelectedElement(newElement.id);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const deleteElement = () => {
    if (!selectedElement) return;
    const updatedSlides = [...slides];
    updatedSlides[currentSlide].elements = updatedSlides[currentSlide].elements.filter(
      el => el.id !== selectedElement
    );
    setSlides(updatedSlides);
    setSelectedElement(null);
  };

  const updateElement = (property: string, value: any) => {
    if (!selectedElement) return;
    const updatedSlides = [...slides];
    const element = updatedSlides[currentSlide].elements.find(el => el.id === selectedElement);
    if (element) {
      (element as any)[property] = value;
      setSlides(updatedSlides);
    }
  };

  const toggleStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (!selectedElement) return;
    const element = slides[currentSlide].elements.find(el => el.id === selectedElement);
    if (element && element.type === 'text') {
      updateElement(style, !element[style]);
    }
  };

  const handleDoubleClick = (elementId: string) => {
    const element = slides[currentSlide].elements.find(el => el.id === elementId);
    if (element && element.type === 'text') {
      setEditingElement(elementId);
      setSelectedElement(elementId);
    }
  };

  const calculateSnapLines = (element: SlideElement, x: number, y: number): { x: number; y: number; lines: SnapLine[] } => {
    const lines: SnapLine[] = [];
    let snappedX = x;
    let snappedY = y;

    const centerX = CANVAS_WIDTH / 2;
    const centerY = CANVAS_HEIGHT / 2;
    const elementWidth = element.width || 100;
    const elementHeight = element.height || 50;
    const elementCenterX = x + elementWidth / 2;
    const elementCenterY = y + elementHeight / 2;
    const elementRight = x + elementWidth;
    const elementBottom = y + elementHeight;

    if (Math.abs(elementCenterX - centerX) < SNAP_THRESHOLD) {
      snappedX = centerX - elementWidth / 2;
      lines.push({ type: 'vertical', position: centerX });
    }
    if (Math.abs(elementCenterY - centerY) < SNAP_THRESHOLD) {
      snappedY = centerY - elementHeight / 2;
      lines.push({ type: 'horizontal', position: centerY });
    }
    if (Math.abs(x) < SNAP_THRESHOLD) {
      snappedX = 0;
      lines.push({ type: 'vertical', position: 0 });
    }
    if (Math.abs(elementRight - CANVAS_WIDTH) < SNAP_THRESHOLD) {
      snappedX = CANVAS_WIDTH - elementWidth;
      lines.push({ type: 'vertical', position: CANVAS_WIDTH });
    }
    if (Math.abs(y) < SNAP_THRESHOLD) {
      snappedY = 0;
      lines.push({ type: 'horizontal', position: 0 });
    }
    if (Math.abs(elementBottom - CANVAS_HEIGHT) < SNAP_THRESHOLD) {
      snappedY = CANVAS_HEIGHT - elementHeight;
      lines.push({ type: 'horizontal', position: CANVAS_HEIGHT });
    }

    return { x: snappedX, y: snappedY, lines };
  };

  const handleMouseDown = (e: React.MouseEvent, elementId: string) => {
    if (editingElement) return;
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const element = slides[currentSlide].elements.find(el => el.id === elementId);
    if (!element) return;

    setSelectedElement(elementId);
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - rect.left - element.x,
      y: e.clientY - rect.top - element.y
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const rawX = e.clientX - rect.left - dragOffset.x;
    const rawY = e.clientY - rect.top - dragOffset.y;
    const element = slides[currentSlide].elements.find(el => el.id === selectedElement);
    if (!element) return;

    const { x: snappedX, y: snappedY, lines } = calculateSnapLines(element, rawX, rawY);
    updateElement('x', Math.max(0, Math.min(550, snappedX)));
    updateElement('y', Math.max(0, Math.min(550, snappedY)));
    setSnapLines(lines);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setSnapLines([]);
  };

  const addSlide = () => {
    const newSlide: Slide = {
      id: slides.length + 1,
      title: 'Nueva diapositiva',
      content: '',
      elements: [{
        id: `text-${Date.now()}`,
        type: 'text',
        content: 'Nueva diapositiva',
        x: 50,
        y: 150,
        fontSize: 32,
        fontFamily: 'Geist',
        color: '#18181b',
        align: 'left',
        width: 500,
        bold: false,
        italic: false,
        underline: false
      }],
      bgColor: '#ffffff'
    };
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
  };

  const duplicateSlide = () => {
    const currentSlideData = slides[currentSlide];
    const duplicatedSlide: Slide = {
      ...currentSlideData,
      id: slides.length + 1,
      elements: currentSlideData.elements.map(el => ({
        ...el,
        id: `${el.type}-${Date.now()}-${Math.random()}`
      }))
    };
    const newSlides = [...slides];
    newSlides.splice(currentSlide + 1, 0, duplicatedSlide);
    setSlides(newSlides);
    setCurrentSlide(currentSlide + 1);
  };

  const deleteSlide = () => {
    if (slides.length === 1) return;
    const newSlides = slides.filter((_, idx) => idx !== currentSlide);
    setSlides(newSlides);
    setCurrentSlide(Math.max(0, currentSlide - 1));
  };

  const exportCarousel = async () => {
    const exportSlides = [];
    for (let i = 0; i < slides.length; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 600;
      const ctx = canvas.getContext('2d');
      if (!ctx) continue;

      ctx.fillStyle = slides[i].bgColor;
      ctx.fillRect(0, 0, 600, 600);

      const imagePromises = slides[i].elements
        .filter(el => el.type === 'image')
        .map(element => new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            ctx.drawImage(img, element.x, element.y, element.width!, element.height!);
            resolve();
          };
          img.src = element.src!;
        }));

      await Promise.all(imagePromises);

      slides[i].elements.forEach(element => {
        if (element.type === 'text') {
          ctx.fillStyle = element.color!;
          let fontStyle = '';
          if (element.italic) fontStyle = 'italic ';
          if (element.bold) fontStyle += 'bold ';
          ctx.font = `${fontStyle}${element.fontSize}px ${element.fontFamily}`;
          ctx.textAlign = element.align!;

          const words = element.content!.split(' ');
          const lines = [];
          let currentLine = words[0];
          for (let j = 1; j < words.length; j++) {
            const testLine = currentLine + " " + words[j];
            if (ctx.measureText(testLine).width < element.width!) {
              currentLine = testLine;
            } else {
              lines.push(currentLine);
              currentLine = words[j];
            }
          }
          lines.push(currentLine);

          let yPos = element.y;
          lines.forEach(line => {
            let xPos = element.x;
            if (element.align === 'center') xPos = element.x + element.width! / 2;
            if (element.align === 'right') xPos = element.x + element.width!;
            ctx.fillText(line, xPos, yPos);
            if (element.underline) {
              const metrics = ctx.measureText(line);
              let underlineX = xPos;
              if (element.align === 'center') underlineX = xPos - metrics.width / 2;
              if (element.align === 'right') underlineX = xPos - metrics.width;
              ctx.beginPath();
              ctx.strokeStyle = element.color!;
              ctx.lineWidth = Math.max(1, element.fontSize! / 20);
              ctx.moveTo(underlineX, yPos + 5);
              ctx.lineTo(underlineX + metrics.width, yPos + 5);
              ctx.stroke();
            }
            yPos += element.fontSize! * 1.2;
          });
        }
      });

      exportSlides.push(canvas.toDataURL('image/png'));
    }

    exportSlides.forEach((dataUrl, index) => {
      const link = document.createElement('a');
      link.download = `slide-${index + 1}.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  const selectedElementData = selectedElement
    ? slides[currentSlide].elements.find(el => el.id === selectedElement)
    : null;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="sticky top-14 z-40 border-b bg-white">
        <div className="flex items-center justify-between h-14 px-6">
          <h1 className="font-bold text-lg">Editor de Carrusel</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={duplicateSlide}
              className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg hover:bg-zinc-50 transition-colors text-sm"
            >
              <Copy size={14} />
              Duplicar
            </button>
            <button
              onClick={deleteSlide}
              disabled={slides.length === 1}
              className="flex items-center gap-1.5 px-3 py-1.5 border rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={14} />
              Eliminar
            </button>
            <div className="w-px h-6 bg-zinc-200 mx-1"></div>
            <button
              onClick={exportCarousel}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-zinc-800 transition-colors text-sm font-medium"
            >
              <Download size={16} />
              Exportar
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Panel izquierdo */}
        <div className="w-80 border-r bg-white overflow-y-auto">
          <div className="p-6">
            <h2 className="font-semibold mb-4">Propiedades</h2>

            {!showTemplates ? (
              <>
                <div className="space-y-2 mb-6">
                  <button onClick={addTextElement} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg hover:bg-zinc-50 transition-colors text-sm">
                    <Type size={16} />
                    Agregar Texto
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border rounded-lg hover:bg-zinc-50 transition-colors text-sm">
                    <ImageIcon size={16} />
                    Agregar Imagen
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>

                {selectedElementData && selectedElementData.type === 'text' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Contenido</label>
                      <textarea value={selectedElementData.content} onChange={(e) => updateElement('content', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900" rows={3} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tipografía</label>
                      <select value={selectedElementData.fontFamily} onChange={(e) => updateElement('fontFamily', e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900">
                        {fonts.map(font => <option key={font} value={font}>{font}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Estilo</label>
                      <div className="flex gap-2">
                        {(['bold', 'italic', 'underline'] as const).map(style => (
                          <button key={style} onClick={() => toggleStyle(style)} className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${selectedElementData[style] ? 'bg-black text-white' : 'border hover:bg-zinc-50'}`}>
                            {style === 'bold' && <Bold size={16} className="mx-auto" />}
                            {style === 'italic' && <Italic size={16} className="mx-auto" />}
                            {style === 'underline' && <Underline size={16} className="mx-auto" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Tamaño: {selectedElementData.fontSize}px</label>
                      <input type="range" min="12" max="72" value={selectedElementData.fontSize} onChange={(e) => updateElement('fontSize', parseInt(e.target.value))} className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Color</label>
                      <button
                        onClick={() => setShowColorPicker('text')}
                        className="w-full h-10 rounded-lg border flex items-center justify-between px-3 cursor-pointer hover:border-zinc-400 transition-colors"
                        style={{ backgroundColor: selectedElementData.color }}
                      >
                        <span className="text-xs font-mono" style={{ 
                          color: parseInt(selectedElementData.color.replace('#', ''), 16) > 0xffffff/2 ? '#000' : '#fff',
                          textShadow: parseInt(selectedElementData.color.replace('#', ''), 16) > 0xffffff/2 ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
                        }}>
                          {selectedElementData.color.toUpperCase()}
                        </span>
                        <div className="w-4 h-4 rounded border-2 border-white shadow-sm" style={{ backgroundColor: selectedElementData.color }} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Alineación</label>
                      <div className="flex gap-2">
                        {(['left', 'center', 'right'] as const).map(align => (
                          <button key={align} onClick={() => updateElement('align', align)} className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${selectedElementData.align === align ? 'bg-black text-white' : 'border hover:bg-zinc-50'}`}>
                            {align === 'left' && <AlignLeft size={16} className="mx-auto" />}
                            {align === 'center' && <AlignCenter size={16} className="mx-auto" />}
                            {align === 'right' && <AlignRight size={16} className="mx-auto" />}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button onClick={deleteElement} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                )}

                {selectedElementData && selectedElementData.type === 'image' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ancho: {selectedElementData.width}px</label>
                      <input type="range" min="50" max="500" value={selectedElementData.width} onChange={(e) => {
                        const newWidth = parseInt(e.target.value);
                        const aspectRatio = selectedElementData.originalHeight! / selectedElementData.originalWidth!;
                        updateElement('width', newWidth);
                        updateElement('height', Math.round(newWidth * aspectRatio));
                      }} className="w-full" />
                    </div>
                    <button onClick={deleteElement} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                      <Trash2 size={16} />
                      Eliminar
                    </button>
                  </div>
                )}

                {!selectedElementData && <p className="text-sm text-zinc-500">Seleccioná un elemento para editar</p>}

                <div className="mt-6 pt-6 border-t space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Color de fondo</label>
                    <button
                      onClick={() => setShowColorPicker('background')}
                      className="w-full h-10 rounded-lg border flex items-center justify-between px-3 cursor-pointer hover:border-zinc-400 transition-colors"
                      style={{ backgroundColor: slides[currentSlide].bgColor }}
                    >
                      <span className="text-xs font-mono" style={{ 
                        color: parseInt(slides[currentSlide].bgColor.replace('#', ''), 16) > 0xffffff/2 ? '#000' : '#fff',
                        textShadow: parseInt(slides[currentSlide].bgColor.replace('#', ''), 16) > 0xffffff/2 ? 'none' : '0 1px 2px rgba(0,0,0,0.5)'
                      }}>
                        {slides[currentSlide].bgColor.toUpperCase()}
                      </span>
                      <div className="w-4 h-4 rounded border-2 border-white shadow-sm" style={{ backgroundColor: slides[currentSlide].bgColor }} />
                    </button>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <label className="block text-sm font-medium">Templates</label>
                      <button
                        onClick={() => setShowTemplates(!showTemplates)}
                        className={`text-xs px-2 py-1 rounded transition-colors ${
                          showTemplates ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                        }`}
                      >
                        {showTemplates ? 'Ocultar' : 'Ver todo'}
                      </button>
                    </div>
                    
                    {showTemplates ? (
                      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                        {templates.map(template => (
                          <button
                            key={template.id}
                            onClick={() => applyTemplate(template)}
                            className="w-full group relative border-2 rounded-lg overflow-hidden hover:border-zinc-400 transition-all hover:shadow-md"
                          >
                            <div className="h-24 flex items-center justify-center p-3 relative" style={{
                              background: template.slides[0].bgColor.startsWith('linear-gradient')
                                ? template.slides[0].bgColor
                                : template.slides[0].bgColor
                            }}>
                              <div className="text-center">
                                {template.slides[0].elements.slice(0, 1).map((el, idx) => (
                                  <div key={idx} style={{
                                    fontSize: `${Math.min(el.fontSize! / 4, 14)}px`,
                                    fontWeight: el.bold ? 'bold' : 'normal',
                                    color: el.color,
                                    fontFamily: el.fontFamily
                                  }}>
                                    {el.content}
                                  </div>
                                ))}
                              </div>
                              {template.isPremium && (
                                <div className="absolute top-1.5 right-1.5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-0.5">
                                  <Crown size={8} />
                                  PRO
                                </div>
                              )}
                            </div>
                            <div className="p-2 bg-white border-t text-left">
                              <h3 className="font-semibold text-xs">{template.name}</h3>
                              <p className="text-xs text-zinc-500 truncate">{template.description}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {templates.slice(0, 4).map(template => (
                          <button
                            key={template.id}
                            onClick={() => applyTemplate(template)}
                            className="relative border-2 rounded-lg overflow-hidden hover:border-zinc-400 transition-all aspect-square"
                          >
                            <div className="w-full h-full flex items-center justify-center p-2 text-xs font-semibold" style={{
                              background: template.slides[0].bgColor.startsWith('linear-gradient')
                                ? template.slides[0].bgColor
                                : template.slides[0].bgColor,
                              color: template.slides[0].elements[0]?.color || '#000'
                            }}>
                              {template.name.split(' ')[0]}
                            </div>
                            {template.isPremium && (
                              <div className="absolute top-1 right-1 bg-yellow-500 text-white p-0.5 rounded">
                                <Crown size={8} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Canvas central */}
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-50">
          <div
            ref={canvasRef}
            className="relative bg-white border shadow-2xl"
            style={{
              width: '600px',
              height: '600px',
              backgroundColor: slides[currentSlide].bgColor
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {snapLines.map((line, idx) => (
              <div key={idx} className="absolute pointer-events-none" style={{
                ...(line.type === 'vertical' 
                  ? { left: `${line.position}px`, top: 0, width: '1px', height: '100%', background: 'rgba(99, 102, 241, 0.8)' }
                  : { top: `${line.position}px`, left: 0, height: '1px', width: '100%', background: 'rgba(99, 102, 241, 0.8)' }
                )
              }} />
            ))}

            {slides[currentSlide].elements.map(element => (
              element.type === 'text' ? (
                editingElement === element.id ? (
                  <textarea
                    key={element.id}
                    ref={editInputRef}
                    value={element.content}
                    onChange={(e) => updateElement('content', e.target.value)}
                    onBlur={() => setEditingElement(null)}
                    className="absolute border-2 border-blue-500 rounded px-1 outline-none resize-none bg-transparent"
                    style={{
                      left: `${element.x}px`,
                      top: `${element.y}px`,
                      fontSize: `${element.fontSize}px`,
                      fontFamily: element.fontFamily,
                      fontWeight: element.bold ? 'bold' : 'normal',
                      fontStyle: element.italic ? 'italic' : 'normal',
                      textDecoration: element.underline ? 'underline' : 'none',
                      color: element.color,
                      textAlign: element.align,
                      width: `${element.width}px`,
                      minHeight: `${element.fontSize! * 1.2}px`,
                    }}
                  />
                ) : (
                  <div
                    key={element.id}
                    onMouseDown={(e) => handleMouseDown(e, element.id)}
                    onDoubleClick={() => handleDoubleClick(element.id)}
                    className={`absolute cursor-move ${selectedElement === element.id ? 'ring-2 ring-black' : ''}`}
                    style={{
                      left: `${element.x}px`,
                      top: `${element.y}px`,
                      fontSize: `${element.fontSize}px`,
                      fontFamily: element.fontFamily,
                      fontWeight: element.bold ? 'bold' : 'normal',
                      fontStyle: element.italic ? 'italic' : 'normal',
                      textDecoration: element.underline ? 'underline' : 'none',
                      color: element.color,
                      textAlign: element.align,
                      width: `${element.width}px`,
                      userSelect: 'none',
                      padding: '4px'
                    }}
                  >
                    {element.content}
                  </div>
                )
              ) : (
                <img
                  key={element.id}
                  src={element.src}
                  onMouseDown={(e) => handleMouseDown(e, element.id)}
                  className={`absolute cursor-move ${selectedElement === element.id ? 'ring-2 ring-black' : ''}`}
                  style={{
                    left: `${element.x}px`,
                    top: `${element.y}px`,
                    width: `${element.width}px`,
                    height: `${element.height}px`,
                    userSelect: 'none'
                  }}
                  draggable={false}
                  alt="Element"
                />
              )
            ))}
          </div>

          {/* Navegación slides */}
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="p-2 border rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-14 h-14 rounded-lg border-2 transition-all text-xs font-medium shadow ${
                    currentSlide === index
                      ? 'border-black shadow-lg scale-110'
                      : 'border-zinc-200 hover:border-zinc-400 bg-white'
                  }`}
                  style={{ backgroundColor: slide.bgColor }}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={addSlide}
                className="w-14 h-14 rounded-lg border-2 border-dashed border-zinc-400 hover:border-black hover:bg-white bg-white flex items-center justify-center transition-all shadow"
              >
                <Plus size={20} />
              </button>
            </div>

            <button
              onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
              disabled={currentSlide === slides.length - 1}
              className="p-2 border rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white shadow"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {showColorPicker === 'text' && selectedElement && (
        <ColorPicker
          value={slides[currentSlide].elements.find(el => el.id === selectedElement)?.color || '#000000'}
          onChange={(color) => updateElement('color', color)}
          onClose={() => setShowColorPicker(null)}
        />
      )}

      {showColorPicker === 'background' && (
        <ColorPicker
          value={slides[currentSlide].bgColor}
          onChange={(color) => {
            const updatedSlides = [...slides];
            updatedSlides[currentSlide].bgColor = color;
            setSlides(updatedSlides);
          }}
          onClose={() => setShowColorPicker(null)}
        />
      )}

      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} templateName={upgradingTemplate} />}
    </div>
  );
}