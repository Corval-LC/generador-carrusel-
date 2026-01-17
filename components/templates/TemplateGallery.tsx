"use client";

import { useState } from 'react';
import { Lock, Crown, Check, Sparkles, Palette } from 'lucide-react';
import { templates, Template } from '@/lib/templates';

interface UpgradeModalProps {
  onClose: () => void;
  templateName?: string;
}

function UpgradeModal({ onClose, templateName }: UpgradeModalProps) {
  const handleUpgrade = async () => {
    window.location.href = '/pricing';
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4">
            <Crown size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Upgrade a Premium</h2>
          {templateName && (
            <p className="text-sm text-zinc-500 mb-2">
              Para usar <span className="font-semibold text-zinc-700">"{templateName}"</span>
            </p>
          )}
          <p className="text-zinc-600">
            Desbloquea templates profesionales y funciones avanzadas
          </p>
        </div>

        <div className="space-y-3 mb-8">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={14} className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">+20 Templates Premium</p>
              <p className="text-sm text-zinc-500">Diseños profesionales exclusivos</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={14} className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">Sin marca de agua</p>
              <p className="text-sm text-zinc-500">Exporta con calidad profesional</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={14} className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">Actualizaciones mensuales</p>
              <p className="text-sm text-zinc-500">Nuevos templates cada mes</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
              <Check size={14} className="text-green-600" />
            </div>
            <div>
              <p className="font-medium">Soporte prioritario</p>
              <p className="text-sm text-zinc-500">Respuestas en menos de 24h</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleUpgrade}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-4 rounded-xl font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl"
          >
            Upgrade por $9.99/mes
          </button>

          <button
            onClick={onClose}
            className="w-full py-3 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
          >
            Tal vez después
          </button>
        </div>
      </div>
    </div>
  );
}

interface TemplatePreviewProps {
  template: Template;
  onClose: () => void;
  onUse: () => void;
  isPremium: boolean;
  userPlan: 'free' | 'premium';
}

function TemplatePreview({ template, onClose, onUse, isPremium, userPlan }: TemplatePreviewProps) {
  const canUse = !isPremium || userPlan === 'premium';

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">{template.name}</h3>
              {isPremium && (
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1">
                  <Crown size={10} />
                  PREMIUM
                </span>
              )}
            </div>
            <p className="text-sm text-zinc-500">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-600"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            {template.slides.map((slide, idx) => (
              <div
                key={idx}
                className="border rounded-lg overflow-hidden shadow-lg"
                style={{ aspectRatio: '1/1' }}
              >
                <div
                  className="w-full h-full flex items-center justify-center p-8 relative"
                  style={{
                    background: slide.bgColor.startsWith('linear-gradient')
                      ? slide.bgColor
                      : slide.bgColor
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    {slide.elements.map((el, elIdx) => (
                      <div
                        key={elIdx}
                        style={{
                          fontSize: `${Math.min(el.fontSize! / 3, 24)}px`,
                          fontWeight: el.bold ? 'bold' : 'normal',
                          fontStyle: el.italic ? 'italic' : 'normal',
                          color: el.color,
                          fontFamily: el.fontFamily,
                          textAlign: el.align,
                          width: '80%',
                          marginBottom: '8px'
                        }}
                      >
                        {el.content}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border rounded-lg hover:bg-zinc-50 transition-colors font-medium"
            >
              Volver
            </button>
            <button
              onClick={onUse}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                canUse
                  ? 'bg-black text-white hover:bg-zinc-800'
                  : 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700 shadow-lg'
              }`}
            >
              {canUse ? 'Usar este template' : 'Upgrade para usar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TemplateGalleryProps {
  userPlan: 'free' | 'premium';
  onSelectTemplate: (template: Template) => void;
  onSkip: () => void;
}

export default function TemplateGallery({ userPlan, onSelectTemplate, onSkip }: TemplateGalleryProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [templateToUpgrade, setTemplateToUpgrade] = useState<string>('');

  const handleTemplateClick = (template: Template) => {
    setPreviewTemplate(template);
  };

  const handleUseTemplate = (template: Template) => {
    if (template.isPremium && userPlan === 'free') {
      setTemplateToUpgrade(template.name);
      setShowUpgradeModal(true);
      setPreviewTemplate(null);
      return;
    }

    setPreviewTemplate(null);
    onSelectTemplate(template);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3">Elige un template</h2>
        <p className="text-zinc-600">
          Aplicá un diseño profesional o empezá desde cero
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Opción: Sin template (Modo libre) */}
        <button
          onClick={onSkip}
          className="relative group border-2 border-dashed rounded-xl overflow-hidden hover:shadow-xl transition-all hover:border-zinc-400 hover:bg-zinc-50"
        >
          <div className="w-full h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center">
                <Palette size={32} className="text-zinc-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Modo Libre</h3>
              <p className="text-sm text-zinc-500 px-4">
                Empezá desde cero y diseñá como quieras
              </p>
            </div>
          </div>

          <div className="p-4 bg-white border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm">Sin template</h3>
                <p className="text-xs text-zinc-500">Máxima libertad creativa</p>
              </div>
              <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-medium flex items-center gap-1">
                <Sparkles size={12} />
                Recomendado
              </div>
            </div>
          </div>
        </button>

        {/* Templates */}
        {templates.map(template => (
          <button
            key={template.id}
            onClick={() => handleTemplateClick(template)}
            className="relative group border-2 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:border-zinc-300"
          >
            {/* Preview del template */}
            <div
              className="w-full h-64 flex items-center justify-center p-8 relative overflow-hidden"
              style={{
                background: template.slides[0].bgColor.startsWith('linear-gradient')
                  ? template.slides[0].bgColor
                  : template.slides[0].bgColor
              }}
            >
              <div className="text-center relative z-10">
                {template.slides[0].elements.slice(0, 2).map((el, idx) => (
                  <div
                    key={idx}
                    style={{
                      fontSize: `${Math.min(el.fontSize! / 2, 32)}px`,
                      fontWeight: el.bold ? 'bold' : 'normal',
                      fontStyle: el.italic ? 'italic' : 'normal',
                      color: el.color,
                      fontFamily: el.fontFamily,
                      marginBottom: '8px'
                    }}
                  >
                    {el.content}
                  </div>
                ))}
              </div>

              {/* Overlay sutil para ver mejor el preview */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-lg">
                  <p className="text-sm font-medium text-zinc-900">Click para previsualizar</p>
                </div>
              </div>
            </div>

            {/* Badge Premium */}
            {template.isPremium && (
              <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <Crown size={12} />
                PREMIUM
              </div>
            )}

            {/* Info del template */}
            <div className="p-4 bg-white border-t">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="font-semibold text-sm">{template.name}</h3>
                  <p className="text-xs text-zinc-500">{template.description}</p>
                </div>
                {!template.isPremium && (
                  <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium">
                    Gratis
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <TemplatePreview
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUse={() => handleUseTemplate(previewTemplate)}
          isPremium={previewTemplate.isPremium}
          userPlan={userPlan}
        />
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <UpgradeModal
          onClose={() => setShowUpgradeModal(false)}
          templateName={templateToUpgrade}
        />
      )}
    </div>
  );
}