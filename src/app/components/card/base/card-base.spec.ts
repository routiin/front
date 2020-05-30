import { CardBase } from './card-base';

describe('getClosestNumber', () => {
  it('should find closest number in array', () => {
    const arr = [-130, -120, 0, 120, 130];
    const tests = [
      [0, 0],
      [1, 0],
      [59, 0],
      [60, 120],
      [121, 120],
      [125, 130],
      [131, 130],
      [-131, -130],
      [-130, -130],
      [-129, -130],
      [-125, -130],
      [-1000, -130],
      [-1, 0],
      [-124, -120],
      [-60, -120],
    ];

    tests.forEach(([num, answer]) => {
      const result = CardBase.getClosestPoint(arr, num);
      expect(result).toBe(answer);
    });
  });
});
