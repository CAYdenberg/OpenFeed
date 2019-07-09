import reconcileDocs from '../reconcileDocs'

describe('reconcileDocs', () => {
  const initial = [
    {_id: 'afeed', type: 'feed', title: 'Old title'},
    {_id: 'adeletedfeed', type: 'feed'},
  ]
  const changes = [
    {type: 'post', _id: 'apost'},
    {type: 'feed', _id: 'afeed', title: 'Updated Title'},
    {type: 'feed', _id: 'anewfeed'},
  ]
  const deletions = [
    {type: 'feed', _id: 'adeletedfeed'},
  ]

  it('should reconcile a change event', () => {
    const reconciler = reconcileDocs('feed', true)

    const initial = [
      {_id: 'afeed', type: 'feed', title: 'Old title'},
      {_id: 'adeletedfeed', type: 'feed'},
    ]
    const changes = [
      {type: 'post', _id: 'apost'},
      {type: 'feed', _id: 'afeed', title: 'Updated Title'},
      {type: 'feed', _id: 'anewfeed'},
    ]
    const deletions = [
      {type: 'feed', _id: 'adeletedfeed'},
    ]
    const final = reconciler(initial, changes, deletions)
    expect(final).toHaveLength(2)
    expect(final[0]).toHaveProperty('_id', 'afeed')
    expect(final[0]).toHaveProperty('title', 'Updated Title')
    expect(final[1]).toHaveProperty('_id', 'anewfeed')
  })

  it('should not add new docs when the second argument is false', () => {
    const reconciler = reconcileDocs('feed', false)
    const final = reconciler(initial, changes, deletions)
    expect(final).toHaveLength(1)
    expect(final[0]).toHaveProperty('_id', 'afeed')
    expect(final[0]).toHaveProperty('title', 'Updated Title')
  })
})
