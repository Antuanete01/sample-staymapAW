import jsonData from '@/assets/db.json'; // ✅ Importa el JSON como módulo
import { Concert } from '@/concerts/model/concert.entity';

export class ConcertService {
  async getAll() {
    try {
      if (!jsonData.concerts || !Array.isArray(jsonData.concerts.data)) {
        console.error('Error: El JSON no tiene una propiedad "concerts.data" válida');
        return [];
      }

      return jsonData.concerts.data.map(c => new Concert(c));
    } catch (error) {
      console.error('Error al cargar conciertos:', error);
      return [];
    }
  }

  async getById(id) {
    const concerts = await this.getAll();
    return concerts.find(c => c.id === id);
  }

  async getByName(name) {
    const concerts = await this.getAll();
    return concerts.filter(c =>
      c.artist?.[0]?.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  create() {
    console.warn('⚠️ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }

  update() {
    console.warn('⚠️ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }

  delete() {
    console.warn('⚠️ Método no implementado para archivo JSON local.');
    return Promise.reject('Método no implementado.');
  }
}
