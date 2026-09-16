import React, { useRef, useState } from 'react';
import {
  Upload,
  Trash2,
  RotateCw,
  Plus,
  Minus,
  Layers,
  RotateCcw,
  Loader2,
  ArrowLeft,
  ArrowRight,
  ArrowUpDown,
  ArrowDownAZ,
} from 'lucide-react';
import { PhotoItem, GridCell } from '../types';

interface PhotoListProps {
  photos: PhotoItem[];
  gridCells: GridCell[];
  onAddFiles: (files: FileList | File[]) => void;
  onAddSingleCopy: (photo: PhotoItem) => void;
  onRemovePhoto: (id: string) => void;
  onRotatePhoto: (id: string) => void;
  onResetPhoto: (id: string) => void;
  onUpdateCopies: (id: string, delta: number) => void;
  onFillGridWithPhoto: (photo: PhotoItem) => void;
  onClearAll: () => void;
  cellsPerPage: number;
  isUploading?: boolean;
  onMovePhoto?: (photoId: string, targetPosition: number) => void;
  onSortByName?: () => void;
  onReverseOrder?: () => void;
}

export const PhotoList: React.FC<PhotoListProps> = ({
  photos,
  gridCells,
  onAddFiles,
  onAddSingleCopy,
  onRemovePhoto,
  onRotatePhoto,
  onResetPhoto,
  onUpdateCopies,
  onFillGridWithPhoto,
  onClearAll,
  isUploading,
  onMovePhoto,
  onSortByName,
  onReverseOrder,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onAddFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(e.target.files);
      e.target.value = '';
    }
  };

  return (
    <div className="bg-white border-t border-slate-200 p-2.5 sm:p-3 shrink-0">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,.jpg,.jpeg,.png,.webp,.gif,.bmp,.svg,.avif,.heic,.heif"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* When no photos are uploaded: Only the single big upload zone is shown */}
      {photos.length === 0 ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl py-10 px-4 text-center transition-all ${
            isUploading ? 'cursor-wait opacity-75 border-slate-400 bg-slate-50' : 'cursor-pointer'
          } ${
            isDragging
              ? 'border-slate-800 bg-slate-100/80 scale-[0.99]'
              : 'border-slate-300 hover:border-slate-500 bg-slate-50/50 hover:bg-slate-50'
          }`}
        >
          <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 shadow-2xs">
            {isUploading ? <Loader2 className="w-6 h-6 animate-spin text-indigo-600" /> : <Upload className="w-6 h-6" />}
          </div>
          <p className="text-sm font-semibold text-slate-800 mb-1">
            {isUploading ? 'Subiendo fotos, por favor espera...' : 'Arrastra tus fotos aquí o haz clic para seleccionarlas'}
          </p>
          <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
            {isUploading ? 'Procesando imágenes de alta calidad...' : 'Compatible con JPG, PNG con fondo blanco automático, WebP y fotos de iPhone (HEIC / HEIF).'}
          </p>
          <div className="flex justify-center">
            <button
              type="button"
              disabled={isUploading}
              onClick={(e) => {
                e.stopPropagation();
                if (!isUploading) fileInputRef.current?.click();
              }}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-colors active:scale-95"
            >
              Seleccionar fotos
            </button>
          </div>
        </div>
      ) : (
        /* Horizontal Carousel with comfortable thumbnails, reordering, and non-clipping hover overlay */
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs px-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">
                Fotos ({photos.length})
              </span>
              <span className="text-slate-300 hidden sm:inline">|</span>
              <span className="text-[11px] text-slate-500 hidden md:inline">
                Cambia el número en <span className="font-semibold text-slate-700">#Pos</span> para reordenar
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isUploading && (
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Subiendo...
                </span>
              )}

              {onSortByName && photos.length > 1 && (
                <button
                  type="button"
                  onClick={onSortByName}
                  title="Ordenar fotos por nombre alfabéticamente (A-Z)"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  <ArrowDownAZ className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">A-Z</span>
                </button>
              )}

              {onReverseOrder && photos.length > 1 && (
                <button
                  type="button"
                  onClick={onReverseOrder}
                  title="Invertir el orden de las fotos"
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors cursor-pointer"
                >
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Invertir</span>
                </button>
              )}

              <button
                type="button"
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded transition-colors disabled:opacity-50 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Añadir</span>
              </button>

              <button
                type="button"
                onClick={onClearAll}
                className="text-[11px] text-slate-400 hover:text-red-600 transition-colors cursor-pointer px-1"
              >
                Limpiar todo
              </button>
            </div>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`flex items-center gap-3 overflow-x-auto py-2.5 px-1 scrollbar-thin scrollbar-thumb-slate-300 ${
              isDragging ? 'ring-2 ring-slate-400 bg-slate-50 rounded-lg' : ''
            }`}
          >
            {/* Quick Add Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="h-28 w-20 rounded-lg border border-dashed border-slate-300 hover:border-slate-500 hover:bg-slate-50 flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-slate-700 transition-all shrink-0 cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[11px] font-medium">Subir</span>
            </button>

            {/* Photo Cards */}
            {photos.map((photo, index) => {
              const cellCount = gridCells.filter(c => c.photoId === photo.id).length;

              return (
                <div
                  key={photo.id}
                  className="group relative h-28 w-40 sm:w-44 bg-white border border-slate-200 rounded-lg shadow-xs hover:shadow-sm overflow-hidden flex flex-col shrink-0 hover:border-slate-400 transition-all"
                >
                  {/* Image Container with pure white background */}
                  <div className="relative flex-1 bg-white flex items-center justify-center overflow-hidden">
                    <img
                      src={photo.url}
                      alt={photo.name}
                      className="max-h-full max-w-full object-contain select-none pointer-events-none"
                      style={{
                        transform: `scale(${photo.zoom || 1}) rotate(${photo.rotation}deg)`,
                        objectPosition: `${50 + (photo.offsetX || 0)}% ${50 + (photo.offsetY || 0)}%`,
                      }}
                    />

                    {/* Static Position Badge (top-left) */}
                    <span className="absolute top-1.5 left-1.5 bg-slate-900/85 text-white text-[10px] font-mono font-bold px-1.5 py-0.5 rounded shadow-xs z-10 pointer-events-none">
                      #{index + 1}
                    </span>

                    {/* Copies indicator badge (top-right) */}
                    <span
                      className={`absolute top-1.5 right-1.5 text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-2xs z-10 pointer-events-none ${
                        cellCount > 0
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {cellCount} {cellCount === 1 ? 'copia' : 'copias'}
                    </span>

                    {/* Hover Overlay with Action Buttons - structured in two rows so nothing is clipped */}
                    <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity z-20 flex flex-col justify-between p-1.5 text-white">
                      {/* Top row: Reordering arrows, Position Picker & Delete */}
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => onMovePhoto?.(photo.id, index)}
                            title="Mover foto a la izquierda"
                            className="p-1 rounded bg-white/15 hover:bg-white/30 disabled:opacity-20 text-white cursor-pointer transition-colors"
                          >
                            <ArrowLeft className="w-3 h-3" />
                          </button>

                          {/* Direct position changer select */}
                          <div className="flex items-center gap-0.5 bg-white/20 px-1 py-0.5 rounded text-[10px]" title="Elegir posición">
                            <span className="text-[9px] text-slate-300 font-mono">#</span>
                            <select
                              value={index + 1}
                              onChange={(e) => onMovePhoto?.(photo.id, parseInt(e.target.value, 10))}
                              className="bg-white text-slate-900 font-bold rounded px-1 py-0.5 text-[10px] cursor-pointer focus:outline-none"
                            >
                              {photos.map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                          </div>

                          <button
                            type="button"
                            disabled={index === photos.length - 1}
                            onClick={() => onMovePhoto?.(photo.id, index + 2)}
                            title="Mover foto a la derecha"
                            className="p-1 rounded bg-white/15 hover:bg-white/30 disabled:opacity-20 text-white cursor-pointer transition-colors"
                          >
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Delete photo button */}
                        <button
                          type="button"
                          onClick={() => onRemovePhoto(photo.id)}
                          title="Eliminar foto de la lista"
                          className="p-1 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer transition-colors shadow-xs"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Bottom action buttons: +Copia, Llenar, Girar, Centrar */}
                      <div className="grid grid-cols-4 gap-1 pt-1">
                        <button
                          type="button"
                          onClick={() => onAddSingleCopy(photo)}
                          title="Agregar una copia a la hoja"
                          className="flex flex-col items-center justify-center p-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-medium mt-0.5">+Copia</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onFillGridWithPhoto(photo)}
                          title="Llenar toda la hoja con esta foto"
                          className="flex flex-col items-center justify-center p-1 rounded bg-amber-600 hover:bg-amber-500 text-white transition-colors cursor-pointer shadow-xs"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-medium mt-0.5">Llenar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onRotatePhoto(photo.id)}
                          title="Girar 90°"
                          className="flex flex-col items-center justify-center p-1 rounded bg-slate-700 hover:bg-slate-600 text-white transition-colors cursor-pointer shadow-xs"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-medium mt-0.5">Girar</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onResetPhoto(photo.id)}
                          title="Restablecer posición centrada"
                          className="flex flex-col items-center justify-center p-1 rounded bg-sky-700 hover:bg-sky-600 text-white transition-colors cursor-pointer shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span className="text-[8px] font-medium mt-0.5">Centrar</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Normal Bottom Footer: Position Selector + Copies Controls */}
                  <div className="px-1.5 py-1 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[10px]">
                    {/* Position selector */}
                    <div className="flex items-center gap-1" title="Cambiar número de posición de la foto">
                      <span className="text-slate-400 font-mono text-[9px]">Pos:</span>
                      <select
                        value={index + 1}
                        onChange={(e) => onMovePhoto?.(photo.id, parseInt(e.target.value, 10))}
                        className="bg-white border border-slate-300 rounded px-1 py-0.5 text-[10px] font-bold text-slate-800 cursor-pointer hover:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-500"
                      >
                        {photos.map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            #{i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Copies stepper */}
                    <div className="flex items-center gap-0.5 bg-white border border-slate-200 rounded px-1 py-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateCopies(photo.id, -1)}
                        disabled={cellCount <= 0}
                        title="Quitar una copia"
                        className="text-slate-400 hover:text-slate-700 disabled:opacity-20 cursor-pointer p-0.5"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="font-semibold text-slate-700 min-w-[12px] text-center text-[10px]">
                        {cellCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateCopies(photo.id, 1)}
                        title="Agregar una copia"
                        className="text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

