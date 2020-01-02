import React, { useCallback } from 'react';
import Field from './Field';
import { useSelector, useDispatch } from 'react-redux';
import { previewActions } from '../../../../store/actions';
import { previewForm } from '../../../../store/selectors';

const AddFeed: React.FC = () => {
  const { url, loadState, isAddable, jsonFeed } = useSelector(previewForm);
  const dispatch = useDispatch();

  const onChange = useCallback(
    value => dispatch(previewActions.changeUrl(value)),
    []
  );

  const onAdd = useCallback(
    e => {
      e.preventDefault();
      if (!isAddable || !jsonFeed) return;
      dispatch(previewActions.addFeed(url, jsonFeed));
    },
    [jsonFeed, url, isAddable]
  );

  return (
    <form onSubmit={onAdd} className="panel-block">
      <label className="label sr-only" htmlFor="addFeed">
        Add Feed
      </label>

      <div className="field has-addons is-expanded">
        <Field value={url} loadState={loadState} onChange={onChange} />

        <div className="control">
          <button
            className="button is-success"
            type="submit"
            disabled={!isAddable}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddFeed;
