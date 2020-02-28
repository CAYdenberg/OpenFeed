import React, { useCallback } from 'react';

import Icon, { valid, invalid } from '../../../Icons';
import { LoadState } from '../../../../types';

interface Props {
  loadState: LoadState;
  value: string;
  onChange: (value: string) => void;
}

const AddFeedField: React.FC<Props> = ({ loadState, value, onChange }) => {
  const handleChange = useCallback(e => onChange(e.target.value), [onChange]);

  const inputClassName =
    loadState === 2 ? 'is-success' : loadState === -1 ? 'is-danger' : '';

  const icon =
    loadState === 1 ? (
      <i className="loader" />
    ) : loadState === 2 ? (
      <Icon icon={valid} />
    ) : loadState === -1 ? (
      <Icon icon={invalid} />
    ) : null;

  return (
    <div className="control has-icons-right is-expanded">
      <input
        className={`input ${inputClassName}`}
        type="url"
        placeholder="http://example.com/atom.xml"
        value={value}
        onChange={handleChange}
      />

      <span className="icon is-right">{icon}</span>
    </div>
  );
};

export default AddFeedField;
