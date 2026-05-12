import { ref, watch } from 'vue';
export function useLocalStorage(key, initialValue) {
    const storageValue = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
    const data = ref(storageValue ? JSON.parse(storageValue) : initialValue);
    watch(data, (value) => {
        if (typeof window === 'undefined')
            return;
        window.localStorage.setItem(key, JSON.stringify(value));
    }, { deep: true });
    return data;
}
//# sourceMappingURL=useLocalStorage.js.map