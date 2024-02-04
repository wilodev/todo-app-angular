import { ApiService } from './api.service';

interface Identifiable {
  id: number;
  name: string;
}

describe('ApiService', () => {
  let service: ApiService;
  let store: { [key: string]: string } = {};

  beforeEach(() => {
    service = new ApiService();

    // Limpiar el store antes de cada prueba
    store = {};

    // Utilizar jest.fn() para crear mocks simples
    localStorage.getItem = jest.fn((key: string) => store[key] || null);
    localStorage.setItem = jest.fn((key: string, value: string) => {
      store[key] = value;
    });
  });

  afterEach(() => {
    // Restaurar todas las implementaciones originales
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item', () => {
    const testItem = { id: 1, name: 'Test' };
    service.addItem('testKey', testItem).subscribe((item) => {
      expect(item).toEqual(testItem);
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'testKey',
        JSON.stringify([testItem])
      );
    });
  });

  it('should retrieve items', () => {
    const testItems = [{ id: 1, name: 'Test' }];
    store['testKey'] = JSON.stringify(testItems);

    service.getItems('testKey').subscribe((items) => {
      expect(items).toEqual(testItems);
      expect(localStorage.getItem).toHaveBeenCalledWith('testKey');
    });
  });

  it('should delete an item by id', () => {
    const testItems: Identifiable[] = [
      { id: 1, name: 'Test' },
      { id: 2, name: 'Delete Me' },
    ];
    store['testKey'] = JSON.stringify(testItems);

    service.deleteItem('testKey', 2).subscribe(() => {
      const updatedItems: Identifiable[] = JSON.parse(store['testKey']);
      expect(updatedItems.some((item) => item.id === 2)).toBeFalsy();
    });
  });

  it('should update an item', () => {
    const testItems: Identifiable[] = [
      { id: 1, name: 'Test' },
      { id: 2, name: 'Update Me' },
    ];
    const updatedItem: Identifiable = { id: 2, name: 'Updated' };
    store['testKey'] = JSON.stringify(testItems);

    service.updateItem('testKey', updatedItem).subscribe((item) => {
      const updatedItems: Identifiable[] = JSON.parse(store['testKey']);
      expect(updatedItems.find((i) => i.id === updatedItem.id)).toEqual(
        updatedItem
      );
    });
  });
});
