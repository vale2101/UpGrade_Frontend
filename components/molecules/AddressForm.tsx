"use client";

import { useEffect, useState } from "react";

interface Address {
  fullName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

const STORAGE_KEY = "upgrade-address";

export default function AddressForm() {
  const [address, setAddress] = useState<Address>({
    fullName: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    zip: ""
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    if (savedValue) {
      try { setAddress(JSON.parse(savedValue)); } catch {}
    }
  }, []);

  const update = (key: keyof Address, value: string) => {
    setAddress(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(address));
    setSaved(true);
  };

  return (
    <form onSubmit={onSave} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm text-gray-600 mb-1">Nombre completo</label>
        <input value={address.fullName} onChange={e => update("fullName", e.target.value)} className="w-full border rounded-md px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Teléfono</label>
        <input value={address.phone} onChange={e => update("phone", e.target.value)} className="w-full border rounded-md px-3 py-2" required />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm text-gray-600 mb-1">Dirección</label>
        <input value={address.line1} onChange={e => update("line1", e.target.value)} className="w-full border rounded-md px-3 py-2" required />
      </div>
      <div className="sm:col-span-2">
        <label className="block text-sm text-gray-600 mb-1">Complemento</label>
        <input value={address.line2} onChange={e => update("line2", e.target.value)} className="w-full border rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Ciudad</label>
        <input value={address.city} onChange={e => update("city", e.target.value)} className="w-full border rounded-md px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Departamento/Estado</label>
        <input value={address.state} onChange={e => update("state", e.target.value)} className="w-full border rounded-md px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm text-gray-600 mb-1">Código Postal</label>
        <input value={address.zip} onChange={e => update("zip", e.target.value)} className="w-full border rounded-md px-3 py-2" required />
      </div>
      <div className="sm:col-span-2 flex items-center gap-4 pt-2">
        <button type="submit" className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-gray-800">Guardar dirección</button>
        {saved && <span className="text-green-600 text-sm">Guardado ✓</span>}
      </div>
    </form>
  );
}


