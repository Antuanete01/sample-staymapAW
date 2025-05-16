import { Concert } from '@/concerts/model/concert.entity';

export class ConcertService {
  resourceEndpoint = import.meta.env.VITE_CONCERTS_ENDPOINT_PATH || '/db.json';

  /**
   * Recupera todos los conciertos desde el archivo db.json en /public
   * @returns {Promise<Array<Concert>>}
   */
  async getAll() {
    try {
      const response = await fetch(this.resourceEndpoint);
      const json = await response.json();

      if (!json.concerts || !Array.isArray(json.concerts.data)) {
        console.error(' Error: El JSON no tiene una propiedad "concerts.data" válida');
        return [];
      }

      return json.concerts.data.map(c => new Concert(c));
    } catch (error) {
      console.error(' Error al cargar conciertos:', error);
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
