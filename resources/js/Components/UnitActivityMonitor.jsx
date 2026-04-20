import React from 'react';

export default function UnitActivityMonitor({ activities }) {
    if (!activities) return null;

    return (
        <div className="stat-card bg-white p-6 rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-pens-500 rounded-full" />
                Monitoring Keaktifan Pengisian Indikator per Unit
            </h3>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="text-gray-400 border-b border-gray-50 uppercase text-[10px] tracking-widest font-bold">
                            <th className="pb-3 pl-2">Nama Unit Kerja</th>
                            <th className="pb-3 text-center">Status</th>
                            <th className="pb-3 text-right pr-2">Jumlah Capaian</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {activities.map((unit) => (
                            <tr key={unit.id} className="hover:bg-gray-50/50 transition">
                                <td className="py-3 pl-2 font-semibold text-gray-700">{unit.name}</td>
                                <td className="py-3 text-center">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                        unit.status === 'Sudah Isi' 
                                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                                        : 'bg-red-50 text-red-500 border border-red-100'
                                    }`}>
                                        {unit.status === 'Sudah Isi' ? '● Aktif' : '○ Pasif'}
                                    </span>
                                </td>
                                <td className="py-3 text-right pr-2 font-mono text-gray-500">
                                    {unit.count} Data
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-50 text-[11px] text-gray-400 italic">
                * Data keaktifan dihitung berdasarkan penginputan indikator pada tahun yang dipilih.
            </div>
        </div>
    );
}
