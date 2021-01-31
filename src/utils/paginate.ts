/* eslint-disable @typescript-eslint/ban-ts-comment */

// @ts-nocheck
export class Paginate<T> {
  constructor(private items: T[] = [], private total: number = 0) { }
}
