export interface TemplateElement {
  id: string;
  type: 'text' | 'image';
  content?: string;
  x: number;
  y: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  width?: number;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
}

export interface TemplateSlide {
  bgColor: string;
  elements: TemplateElement[];
}

export interface Template {
  id: string;
  name: string;
  category: string;
  isPremium: boolean;
  thumbnail: string;
  description: string;
  slides: TemplateSlide[];
}

export const templates: Template[] = [
  // TEMPLATES GRATUITOS
  {
    id: 'minimal-white',
    name: 'Blanco Minimalista',
    category: 'Básico',
    isPremium: false,
    thumbnail: '/templates/minimal-white.png', // Agregá luego
    description: 'Template simple y limpio',
    slides: [
      {
        bgColor: '#ffffff',
        elements: [
          {
            id: 'title-1',
            type: 'text',
            content: '[Tu título aquí]',
            x: 50,
            y: 250,
            fontSize: 48,
            fontFamily: 'Geist',
            color: '#18181b',
            align: 'center',
            width: 500,
            bold: true,
            italic: false,
            underline: false
          }
        ]
      }
    ]
  },
  {
    id: 'minimal-black',
    name: 'Negro Minimalista',
    category: 'Básico',
    isPremium: false,
    thumbnail: '/templates/minimal-black.png',
    description: 'Elegante fondo oscuro',
    slides: [
      {
        bgColor: '#18181b',
        elements: [
          {
            id: 'title-1',
            type: 'text',
            content: '[Tu título aquí]',
            x: 50,
            y: 250,
            fontSize: 48,
            fontFamily: 'Geist',
            color: '#ffffff',
            align: 'center',
            width: 500,
            bold: true,
            italic: false,
            underline: false
          }
        ]
      }
    ]
  },
  
  // TEMPLATES PREMIUM
  {
  id: 'sunset-gradient',
  name: 'Atardecer',
  category: 'Premium',
  isPremium: true,
  thumbnail: '/templates/sunset.png',
  description: 'Gradiente cálido inspirador',
  slides: [
    {
      bgColor: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      elements: [
        {
          id: 'title-1',
          type: 'text',
          content: '[Tu mensaje aquí]',
          x: 50,
          y: 220,
          fontSize: 48,
          fontFamily: 'Geist',
          color: '#ffffff',
          align: 'center',
          width: 500,
          bold: true,
          italic: false,
          underline: false
        }
      ]
    }
  ]
},
{
  id: 'ocean-gradient',
  name: 'Océano',
  category: 'Premium',
  isPremium: true,
  thumbnail: '/templates/ocean.png',
  description: 'Azul profesional y confiable',
  slides: [
    {
      bgColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      elements: [
        {
          id: 'title-1',
          type: 'text',
          content: '[Título aquí]',
          x: 50,
          y: 180,
          fontSize: 52,
          fontFamily: 'Geist',
          color: '#ffffff',
          align: 'left',
          width: 500,
          bold: true,
          italic: false,
          underline: false
        },
        {
          id: 'subtitle-1',
          type: 'text',
          content: '[Subtítulo]',
          x: 50,
          y: 260,
          fontSize: 20,
          fontFamily: 'Geist',
          color: '#e0e7ff',
          align: 'left',
          width: 500,
          bold: false,
          italic: false,
          underline: false
        }
      ]
    }
  ]
},
{
  id: 'neon-dark',
  name: 'Neón Oscuro',
  category: 'Premium',
  isPremium: true,
  thumbnail: '/templates/neon.png',
  description: 'Moderno y llamativo',
  slides: [
    {
      bgColor: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      elements: [
        {
          id: 'title-1',
          type: 'text',
          content: '[Impacta con tu mensaje]',
          x: 50,
          y: 200,
          fontSize: 46,
          fontFamily: 'Geist',
          color: '#00f5ff',
          align: 'center',
          width: 500,
          bold: true,
          italic: false,
          underline: false
        }
      ]
    }
  ]
}
    
];