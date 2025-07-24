interface Field {
  name: string;
  error: string;
}

export class ValidationError extends Error {
  constructor(public fields: Field[]) {
    super(fields.map(({ error }) => error).join(", "));
  }
}
