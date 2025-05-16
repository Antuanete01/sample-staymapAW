import jsonData from '@/assets/db.json'; // ✅ Importar el JSON directamente
import { Concert } from '@/concerts/model/concert.entity.js';

export class ConcertService {
  /**
   * Obtiene todos los conciertos desde el JSON importado
   * @returns {Promise<Array<Concert>>}
   */
  async getAll() {
    try {
      if (!jsonData.concerts || !Array.isArray(jsonData.concerts.data)) {
        console.error('❌ Error: El JSON no tiene una propiedad "concerts.data" válida');
        return [];
      }
      return jsonData.concerts.data.map(c => new Concert(c));
    } catch (error) {
      console.error('❌ Error al cargar conciertos:', error);
      return [];
    }
  }

  /**
   * Busca un concierto por ID
   * @param {string} id
   * @returns {Promise<Concert | undefined>}
   */
  async getById(id) {
    const concerts = await this.getAll();
    return concerts.find(c => c.id === id);
  }

  /**
   * Busca conciertos por nombre de artista
   * @param {string} name
   * @returns {Promise<Array<Concert>>}
   */
  async getByName(name) {
    const concerts = await this.getAll();
    return concerts.filter(c =>
      c.artist?.[0]?.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  /**
   * Métodos no implementados por ser solo lectura
   */
  create() {
    console.warn('⚠️ Método no implementado: Solo lectura desde JSON local.');
    return Promise.reject('Método no implementado.');
  }

  update() {
    console.warn('⚠️ Método no implementado: Solo lectura desde JSON local.');
    return Promise.reject('Método no implementado.');
  }

  delete() {
    console.warn('⚠️ Método no implementado: Solo lectura desde JSON local.');
    return Promise.reject('Método no implementado.');
  }
}
