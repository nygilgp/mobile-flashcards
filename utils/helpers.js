export const DECK_STORAGE_KEY = 'MobileFlashcards:Decks'
export function slugify(text) {
    return text.toString().toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}
