'use client'

import { useState } from 'react'

interface RegistrationFormProps {
  onSubmit: (data: { name: string; cargo: string; age: number }) => void
  loading: boolean
  onBack: () => void
}

const CARGOS = [
  'CEO',
  'Empresario',
  'Director Ejecutivo',
  'Director General',
  'Gerente General',
  'Director Comercial',
  'Director Financiero',
  'Director de Operaciones',
  'Otro',
]

export default function RegistrationForm({
  onSubmit,
  loading,
  onBack,
}: RegistrationFormProps) {
  const [name, setName] = useState('')
  const [cargo, setCargo] = useState('')
  const [age, setAge] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!name.trim()) {
      setError('Por favor, ingresa tu nombre')
      return
    }

    if (!cargo) {
      setError('Por favor, selecciona tu cargo')
      return
    }

    if (!age || parseInt(age) < 18 || parseInt(age) > 120) {
      setError('Por favor, ingresa una edad válida')
      return
    }

    onSubmit({
      name: name.trim(),
      cargo,
      age: parseInt(age),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-yellow-500 mb-2">Registro Confidencial</h3>
        <p className="text-gray-400 text-sm">
          Nos gustaría conocerte. Tus datos se guardan de forma segura y confidencial.
        </p>
      </div>

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Nombre completo
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full px-4 py-2 bg-black bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-20"
          disabled={loading}
        />
      </div>

      {/* Cargo */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Cargo / Posición
        </label>
        <select
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full px-4 py-2 bg-black bg-opacity-50 border border-gray-700 rounded-lg text-white focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-20"
          disabled={loading}
        >
          <option value="">Selecciona tu cargo...</option>
          {CARGOS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Age */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Edad
        </label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Tu edad"
          min="18"
          max="120"
          className="w-full px-4 py-2 bg-black bg-opacity-50 border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-20"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900 bg-opacity-50 border border-red-700 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="flex gap-4 pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex-1 py-3 border border-gray-700 text-gray-300 font-semibold rounded-lg hover:text-yellow-500 hover:border-yellow-500 transition disabled:opacity-50"
        >
          Atrás
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {loading ? 'Guardando...' : 'Registrarse'}
        </button>
      </div>
    </form>
  )
}
