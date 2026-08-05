import { ref, shallowRef, watch } from 'vue'

const DB_NAME = 'diet-plan-file-sync'
const STORE_NAME = 'handles'
const HANDLE_KEY = 'meal-plan-file'
const WRITE_DEBOUNCE_MS = 500

export type FileSyncStatus = 'unsupported' | 'disconnected' | 'connected' | 'error'

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1)
    request.onupgradeneeded = () => {
      request.result.createObjectStore(STORE_NAME)
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

async function idbGet<T>(key: string): Promise<T | undefined> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly')
    const req = tx.objectStore(STORE_NAME).get(key)
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function idbSet(key: string, value: unknown): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).put(value, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

async function idbDelete(key: string): Promise<void> {
  const db = await openDb()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite')
    tx.objectStore(STORE_NAME).delete(key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
}

export function useFileSync(getSnapshot: () => unknown) {
  const isSupported = typeof window !== 'undefined' && typeof window.showSaveFilePicker === 'function'

  const status = ref<FileSyncStatus>(isSupported ? 'disconnected' : 'unsupported')
  const fileName = ref('')
  const errorMessage = ref('')
  const handle = shallowRef<FileSystemFileHandle | null>(null)

  let writeTimer: ReturnType<typeof setTimeout> | null = null

  async function writeToFile() {
    if (!handle.value) return
    try {
      const permission = await handle.value.queryPermission({ mode: 'readwrite' })
      if (permission !== 'granted') {
        status.value = 'disconnected'
        handle.value = null
        fileName.value = ''
        return
      }

      const writable = await handle.value.createWritable()
      await writable.write(JSON.stringify(getSnapshot(), null, 2))
      await writable.close()
      status.value = 'connected'
      errorMessage.value = ''
    } catch (err) {
      status.value = 'error'
      errorMessage.value = err instanceof Error ? err.message : 'Falha ao gravar o arquivo.'
    }
  }

  function scheduleWrite() {
    if (!handle.value) return
    if (writeTimer) clearTimeout(writeTimer)
    writeTimer = setTimeout(writeToFile, WRITE_DEBOUNCE_MS)
  }

  async function connect() {
    if (!isSupported) return
    try {
      const selectedHandle = await window.showSaveFilePicker({
        suggestedName: 'diet-plan.json',
        types: [{ description: 'JSON', accept: { 'application/json': ['.json'] } }]
      })
      handle.value = selectedHandle
      fileName.value = selectedHandle.name
      await idbSet(HANDLE_KEY, selectedHandle)
      await writeToFile()
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      status.value = 'error'
      errorMessage.value = err instanceof Error ? err.message : 'Falha ao conectar o arquivo.'
    }
  }

  async function disconnect() {
    handle.value = null
    fileName.value = ''
    errorMessage.value = ''
    status.value = isSupported ? 'disconnected' : 'unsupported'
    await idbDelete(HANDLE_KEY)
  }

  async function restore() {
    if (!isSupported) return
    try {
      const storedHandle = await idbGet<FileSystemFileHandle>(HANDLE_KEY)
      if (!storedHandle) return

      const permission = await storedHandle.queryPermission({ mode: 'readwrite' })
      if (permission === 'granted') {
        handle.value = storedHandle
        fileName.value = storedHandle.name
        status.value = 'connected'
      }
    } catch {
      // sem handle valido salvo; usuario precisa conectar novamente
    }
  }

  if (isSupported) {
    restore()
  }

  watch(getSnapshot, () => scheduleWrite(), { deep: true })

  return {
    isSupported,
    status,
    fileName,
    errorMessage,
    connect,
    disconnect
  }
}
