"use client"
import React, { useEffect, useMemo, useState } from 'react'
import { useDebounce, debounceFn } from '@/hooks/useDebounce'

type Props = {}

function Debouncer({}: Props) {
    const [inputVal, setInputVal] = useState<string>('')

    
    const debouncedValue = useDebounce(inputVal, 500)

    // Example: Debounce a function (e.g., API search)
    const debouncedSearch = useMemo(() => debounceFn((q: string) => {
        // Simulate API call or heavy work
        console.log('Searching for:', q)
    }, 500), [])

    useEffect(() => {
        if (debouncedValue.trim().length) {
            console.log('Debounced value changed:', debouncedValue)
        }
    }, [debouncedValue])

  return (
    <div className="min-h-screen pt-24 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold">Debounce Demo</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">Type below. Logs update only after 500ms of inactivity.</p>
            <input 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded"
                placeholder="Start typing..."
                value={inputVal} 
                onChange={(e) => {
                    const v = e.target.value
                    setInputVal(v)
                    debouncedSearch(v)
                }} 
            />
            <div className="text-sm">
                <div><span className="font-semibold">Immediate:</span> {inputVal || '—'}</div>
                <div><span className="font-semibold">Debounced:</span> {debouncedValue || '—'}</div>
            </div>
        </div>
    </div>
  )
}

export default Debouncer