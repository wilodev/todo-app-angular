import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
interface Identifiable {
  id: number;
}
/**
 * Generic API service for CRUD operations.
 * This service is used to interact with local storage and simulate API calls.
 */
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //private apiUrl = 'http://localhost:3000/todos'; //  Mock Server

  //constructor(private http: HttpClient) {}

  constructor() {}

  /**
   * Gets a list of items from local storage.
   * @param key Local storage key to get the data.
   * @returns Observable of the list of elements.
   */
  getItems<T>(key: string): Observable<T[]> {
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    return of(items);
  }

  /**
   * Adds a new item to local storage.
   * @param key Key of the local storage where the data will be added.
   * @param item Element to add.
   * @returns Observable of the added element.
   */
  addItem<T>(key: string, item: T): Observable<T> {
    const items = JSON.parse(localStorage.getItem(key) || '[]');
    items.push(item);
    localStorage.setItem(key, JSON.stringify(items));
    return of(item);
  }

  /**
   * Delete an item from local storage by its ID.
   * @param key Key of the local storage where the element is located.
   * @param id ID of the element to delete.
   * @returns Observable of the updated list.
   */
  deleteItem<T extends Identifiable>(key: string, id: number): Observable<T[]> {
    let items: T[] = JSON.parse(localStorage.getItem(key) || '[]');
    items = items.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(items));
    return of(items);
  }

  /**
   * Actualiza un elemento en el almacenamiento local.
   * @param key Clave del almacenamiento local donde se encuentra el elemento.
   * @param updatedItem Elemento con los datos actualizados.
   * @returns Observable del elemento actualizado.
   */
  updateItem<T extends Identifiable>(
    key: string,
    updatedItem: T
  ): Observable<T> {
    let items: T[] = JSON.parse(localStorage.getItem(key) || '[]');
    const index = items.findIndex((item: any) => item.id === updatedItem.id);
    if (index !== -1) {
      items[index] = updatedItem;
      localStorage.setItem(key, JSON.stringify(items));
    }
    return of(updatedItem);
  }
}
