import { LowercaseDatePipe } from './lowercase-date.pipe';

describe('LowercaseDatePipe', () => {
  it('create an instance', () => {
    const pipe = new LowercaseDatePipe();
    expect(pipe).toBeTruthy();
  });
});
