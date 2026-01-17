"use client";

import { Crown, X, Check } from 'lucide-react';

interface UpgradeModalProps {
  onClose: () => void;
}

export function UpgradeModal({ onClose }: UpgradeModalProps) {
  const handleUpgrade = async () => {
    // TODO: Integrar con Lemon Squeezy
    // Por ahora redirige a la página de checkout
    window.location.href = '/pricing'; // Creá esta página después
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full mb-4">
            <Crown size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Upgrade a Premium</h2>
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