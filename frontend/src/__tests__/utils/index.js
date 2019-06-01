import { normalize, normalizeInputs } from '../../utils';

describe('Normalization', () => {
  it('Normalize', () => {
    const norm = normalize('Ingeniería de Sistemas');
    expect(norm).toBe('ingenieria-de-sistemas');
  });
  it('Normalization Inputs', () => {
    let norm = normalizeInputs('secretaryGeneralName');
    expect(norm).toBe('name');
    norm = normalizeInputs('aNytHIngeLSe');
    expect(norm).toBe('anythingelse');
  });
});
