import { mapToCollection } from './collection.mapper';

describe('Collection mapper specs', () => {
  it('should return an empty collection when its fed with a null or undefined collection', () => {
    // Arrange
    const collectionUndefined: number[] = undefined;
    const collectionNull: number[] = null;
    const mapFn = (value: number): string => value.toString();
    // Act
    const resultUndef: string[] = mapToCollection(collectionUndefined, mapFn);
    const resultNull: string[] = mapToCollection(collectionNull, mapFn);
    // Assert
    expect(resultUndef).toEqual([]);
    expect(resultNull).toEqual([]);
  });

  it('should return an empty array if the mapFn is not defined', () => {
    // Arrange
    // Act
    const result = mapToCollection(undefined, undefined);
    // Assert
    expect(result).toEqual([]);
  });

  it('should map a collection given a function', () => {
    // Arrange
    const collection: number[] = [1, 2, 3];
    const expectedCollection: string[] = ['1', '2', '3'];
    const mapFn = (value: number): string => value.toString();
    // Act
    const result: string[] = mapToCollection(collection, mapFn);
    // Assert
    expect(result).toEqual(expectedCollection);
  });
});
