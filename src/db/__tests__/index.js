let CustomPouchError = new Error();
CustomPouchError.status = 404;

const db = {
  put: jest.fn(() => Promise.resolve({ ok: true })),
  remove: jest.fn(() => Promise.resolve({ ok: true })),
  get: jest.fn(id =>
    id === 'existingdoc'
      ? Promise.resolve({
          _id: id,
          _rev: 'revision',
        })
      : Promise.reject(CustomPouchError)
  ),
};
