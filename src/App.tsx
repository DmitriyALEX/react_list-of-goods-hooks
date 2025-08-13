import { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import { goodsFromServer } from './api/goodsFromServer';
import { SortField } from './types/enams';

export const App: React.FC = () => {
  const [sortField, setSortField] = useState<SortField | ''>('');
  const [isReversed, setIsReversed] = useState<boolean>(false);

  const getGoods = () => {
    const sortedGoods: string[] = [...goodsFromServer];

    if (sortField === SortField.ALPHA) {
      sortedGoods.sort((a, b) =>
        // eslint-disable-next-line prettier/prettier
        a.toLowerCase().localeCompare(b.toLowerCase()),
      );
    }

    if (sortField === SortField.LENGTH) {
      sortedGoods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      sortedGoods.reverse();
    }

    return sortedGoods;
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            sortField === 'alpha' ? 'button is-info' : 'button is-info is-light'
          }
          onClick={() => {
            setSortField(SortField.ALPHA);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            sortField === 'length'
              ? 'button is-success'
              : 'button is-success is-light'
          }
          onClick={() => {
            setSortField(SortField.LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            isReversed ? 'button is-warning' : 'button is-warning is-light'
          }
          onClick={() => setIsReversed(prev => !prev)}
        >
          Reverse
        </button>

        {(sortField || isReversed) && (
          <button
            type="button"
            className={
              sortField || isReversed
                ? 'button is-danger'
                : 'button is-danger is-light'
            }
            onClick={() => {
              setSortField('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {getGoods().map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
