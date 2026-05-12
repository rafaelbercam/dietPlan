import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storageValue = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null
  const data = ref<T>(storageValue ? JSON.parse(storageValue) : initialValue)

  watch(
    data,
    (value) => {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(key, JSON.stringify(value))
    },
    { deep: true }
  )

  return data
}
