'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

interface CreatePostFormProps {
  onPostCreated: () => void
}

export default function CreatePostForm({ onPostCreated }: CreatePostFormProps) {
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!content.trim()) {
      setError('El post no puede estar vacío')
      return
    }

    setLoading(true)

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        throw new Error('No hay sesión activa')
      }

      const { error: insertError } = await supabase.from('posts').insert([
        {
          user_id: session.user.id,
          content: content.trim(),
          me_paso_igual_count: 0,
          claridad_count: 0,
        },
      ])

      if (insertError) throw insertError

      setContent('')
      onPostCreated()
    } catch (err: any) {
      setError(err.message || 'Error al crear el post')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark-gray p-8 rounded-lg border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">¿Qué dolor de CEO tienes hoy?</h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Comparte tu desafío, frustración o pregunta sin filtros..."
        rows={5}
        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg focus:border-gold focus:outline-none transition text-white placeholder-gray-500 resize-none"
      />

      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}

      <div className="flex justify-end mt-4">
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="px-8 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Publicando...' : 'Publicar'}
        </button>
      </div>
    </form>
  )
}
