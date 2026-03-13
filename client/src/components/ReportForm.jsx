import { useState, useRef } from 'react';
import { HiOutlineX, HiOutlinePhotograph, HiOutlineTrash, HiOutlineCloudUpload, HiOutlineCheckCircle } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { submitReport } from '../api';
import { compressImage } from '../utils/compressImage';
import { useLanguage } from '../i18n/LanguageContext';

export default function ReportForm({ crops, mandis, onClose, onSuccess }) {
  const { t } = useLanguage();
  const [form, setForm] = useState({ crop_id: '', mandi_id: '', reported_price: '', quantity: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef();

  const handleFile = async (f) => {
    if (!f) return;
    if (!f.type.match(/image\/(jpeg|jpg|png|webp)/)) {
      toast.error('Only JPG, PNG, or WebP images allowed');
      return;
    }
    // Compress image to <500KB before storing
    const compressed = await compressImage(f, 500);
    setFile(compressed);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(compressed);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.crop_id || !form.mandi_id || !form.reported_price || !form.quantity) {
      toast.error(t('fillAllFields'));
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('crop_id', form.crop_id);
      formData.append('mandi_id', form.mandi_id);
      formData.append('reported_price', form.reported_price);
      formData.append('quantity', form.quantity);
      if (file) formData.append('receipt_image', file);

      await submitReport(formData);

      toast.success(
        <div className="flex items-center gap-2">
          <HiOutlineCheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
          <span>{t('successMsg')}</span>
        </div>,
        { duration: 4000, style: { padding: '12px 16px' } }
      );
      onSuccess();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to submit report';
      toast.error(msg, { duration: 5000 });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 modal-backdrop" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg glass-strong rounded-3xl shadow-2xl modal-content max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-white/80 backdrop-blur-xl rounded-t-3xl border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t('formTitle')}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{t('formSubtitle')}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-all cursor-pointer"
          >
            <HiOutlineX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-5 space-y-5">
          {/* Crop & Mandi */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('crop')} *</label>
              <select
                value={form.crop_id}
                onChange={(e) => setForm({ ...form, crop_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all cursor-pointer"
                required
              >
                <option value="">{t('selectCrop')}</option>
                {crops.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('mandi')} *</label>
              <select
                value={form.mandi_id}
                onChange={(e) => setForm({ ...form, mandi_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all cursor-pointer"
                required
              >
                <option value="">{t('selectMandi')}</option>
                {mandis.map(m => <option key={m._id} value={m._id}>{m.name}, {m.district}</option>)}
              </select>
            </div>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('price')} ({t('priceUnit')}) *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">₹</span>
                <input
                  type="number"
                  min="1"
                  value={form.reported_price}
                  onChange={(e) => setForm({ ...form, reported_price: e.target.value })}
                  placeholder="2400"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{t('quantity')} ({t('quantityUnit')}) *</label>
              <input
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                placeholder="25"
                className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {/* Baseline hint */}
          {form.crop_id && (
            <div className="fade-in flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50/80 border border-blue-100">
              <span className="text-xs">💡</span>
              <span className="text-xs text-blue-600 font-medium">
                {t('baselineHint')} ₹{crops.find(c => c._id === form.crop_id)?.baseline_price?.toLocaleString()}/{t('quantityUnit')} {t('acceptedRange')}
              </span>
            </div>
          )}

          {/* Receipt upload */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              {t('receiptPhoto')} <span className="text-gray-300 font-normal normal-case">{t('receiptOptional')}</span>
            </label>
            {!preview ? (
              <div
                className={`drop-zone rounded-2xl p-6 text-center cursor-pointer transition-all ${dragOver ? 'drag-over' : ''}`}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
              >
                <HiOutlineCloudUpload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500 font-medium">
                  {t('dropReceipt')} <span className="text-primary font-semibold">{t('browse')}</span>
                </p>
                <p className="text-xs text-gray-300 mt-1">{t('fileTypes')}</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden border border-gray-200 scale-in">
                <img src={preview} alt="Receipt preview" className="w-full h-40 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <button
                  type="button"
                  onClick={() => { setFile(null); setPreview(null); }}
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 backdrop-blur text-xs font-semibold text-red-500 hover:bg-white transition-all cursor-pointer"
                >
                  <HiOutlineTrash className="w-3.5 h-3.5" />
                  {t('remove')}
                </button>
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/90 backdrop-blur">
                  <HiOutlinePhotograph className="w-3.5 h-3.5 text-white" />
                  <span className="text-[10px] font-bold text-white uppercase">{t('receiptAttached')}</span>
                </div>
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="btn-press w-full py-3.5 bg-gradient-to-r from-primary to-emerald-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {t('submitting')}
              </span>
            ) : (
              t('submitReport')
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
