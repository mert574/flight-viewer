/*
  Searches array of objects with a keyValue object.
  Returns only the matching ones.

  Ex.
    list: [
      { a: 'test', b: 'example' },
      { a: 'wrong', b: 'example' },
    ],
    keywordsObject: { a: 'te' }

    with these inputs, only returns the first one.
*/
export function searchKeywords(list, keywordObject) {
  if (!list) return [];
  if (!keywordObject) return list;

  const keyWordObjectKeys = Object.keys(keywordObject);
  if (!keyWordObjectKeys.length) return list;

  return list.filter(item => {
    if (typeof item !== 'object') return true;

    const notMatchingItems = keyWordObjectKeys.filter(filterKey => {
      const fieldValue = String(item[filterKey]).toLowerCase();
      const filterValue = String(keywordObject[filterKey])
        .toLowerCase()
        .trim();

      return !fieldValue.includes(filterValue);
    });

    return notMatchingItems.length === 0;
  });
}

export function renameObjectKeys(object, newNames) {
  const entries = Object.entries(object).map(([key, value]) => [
    newNames[key] || key,
    value,
  ]);

  return Object.fromEntries(entries);
}
