export default (docType, addNew) => (initial, changes, deletions) => {
  const initialIds = initial.map(doc => doc._id);

  const deletionIds = deletions.map(doc => doc._id);
  const releventAdditions = addNew
    ? changes.filter(
        doc => doc.type === docType && !initialIds.includes(doc._id)
      )
    : [];

  return initial
    .filter(doc => !deletionIds.includes(doc._id))
    .map(doc => {
      const changeDoc = changes.find(changeDoc => changeDoc._id === doc._id);
      if (!changeDoc) return doc;
      return changeDoc;
    })
    .concat(releventAdditions);
};
