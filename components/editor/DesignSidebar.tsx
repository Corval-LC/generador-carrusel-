"use client";

import type { Block } from "@/lib/editor-types";

export function DesignSidebar({
  bgColor,
  setBgColor,
  showBorders,
  setShowBorders,
  showNumbers,
  setShowNumbers,
  isPro,
  selectedBlock,
  onUpdateBlock,
}: {
  bgColor: string;
  setBgColor: (v: string) => void;
  showBorders: boolean;
  setShowBorders: (v: boolean) => void;
  showNumbers: boolean;
  setShowNumbers: (v: boolean) => void;
  isPro: boolean;
  selectedBlock: Block | null;
  onUpdateBlock: (id: string, data: Partial<Block>) => void;
}) {
  return (
    <div className="bg-white rounded-2xl border p-6 space-y-6">
      <h3 className="font-semibold text-lg">Personalización</h3>

      {/* FONDO */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Fondo</label>
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
          className="w-full h-10 rounded-md border"
        />
      </div>

      {/* BLOQUE SELECCIONADO */}
      {selectedBlock && (
        <div className="border-t pt-4 space-y-2">
          <label className="text-sm font-medium">
            Color del texto seleccionado
          </label>
          <input
            type="color"
            value={selectedBlock.color ?? "#000000"}
            onChange={(e) =>
              onUpdateBlock(selectedBlock.id, {
                color: e.target.value,
              })
            }
            className="w-full h-10 rounded-md border"
          />
        </div>
      )}

      {/* OPCIONES */}
      <div className="border-t pt-4 space-y-3">
        <label className="flex items-center justify-between text-sm">
          Mostrar bordes
          <input
            type="checkbox"
            checked={showBorders}
            onChange={(e) => setShowBorders(e.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between text-sm">
          Mostrar numeración
          <input
            type="checkbox"
            checked={showNumbers}
            onChange={(e) => setShowNumbers(e.target.checked)}
          />
        </label>
      </div>

      {!isPro && (
        <button className="w-full rounded-xl py-3 text-sm font-bold bg-black text-white">
          Desbloquear PRO
        </button>
      )}
    </div>
  );
}
