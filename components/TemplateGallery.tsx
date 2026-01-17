'use client';

import { useState } from 'react';
import { Lock, Crown } from 'lucide-react';
import { templates } from '@/lib/templates';

export default function TemplateGallery({ 
  userPlan, 
  onSelectTemplate 
}: { 
  userPlan: 'free' | 'premium'; 
  onSelectTemplate: (template: Template) => void;
}) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleTemplateClick = (template: Template) => {
    if (template.isPremium && userPlan === 'free') {
      setShowUpgradeModal(true);
      return;
    }
    onSelectTemplate(template);
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-6">
      {templates.map(template => (
        <button
          key={template.id}
          onClick={() => handleTemplateClick(template)}
          className="relative group border rounded-lg overflow-hidden hover:shadow-lg transition-all"
        >
          <img 
            src={template.thumbnail} 
            alt={template.name}
            className="w-full h-48 object-cover"
          />
          
          {template.isPremium && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
              <Crown size={12} />
              PREMIUM
            </div>
          )}
          
          {template.isPremium && userPlan === 'free' && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white text-center">
                <Lock size={32} className="mx-auto mb-2" />
                <p className="font-medium">Upgrade para desbloquear</p>
              </div>
            </div>
          )}
          
          <div className="p-3 bg-white">
            <h3 className="font-medium text-sm">{template.name}</h3>
            <p className="text-xs text-zinc-500">{template.category}</p>
          </div>
        </button>
      ))}
      
      {showUpgradeModal && (
        <UpgradeModal onClose={() => setShowUpgradeModal(false)} />
      )}
    </div>
  );
}